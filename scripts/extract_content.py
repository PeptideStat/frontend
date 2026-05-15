"""
Fetch and extract main-article text from the URLs in glp1_serps.json.

For each article slug, picks up to MAX_PER_ARTICLE unique URLs (Bing
results preferred, then DDG fill), fetches them in parallel with a
realistic browser User-Agent, and extracts main content via trafilatura.

Skips:
  - paywalls / hard 403s
  - non-article URLs (PDFs by default, social/forums)
  - duplicate URLs across engines

Output: glp1_extracted.json with shape:
    {
      "<slug>": {
        "keyword": "<keyword>",
        "sources": [
          {"url": "...", "title": "...", "text": "..."},
          ...
        ]
      }
    }

Usage:
    python extract_content.py <serps.json> <output.json>
"""
import json
import re
import sys
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

import trafilatura
import urllib.request

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
MAX_PER_ARTICLE = 6
TIMEOUT = 20
MAX_TEXT_LEN = 12000  # truncate extracted text per page to control size

SKIP_HOSTS = {
    "reddit.com", "www.reddit.com", "old.reddit.com",
    "twitter.com", "x.com",
    "facebook.com", "www.facebook.com",
    "instagram.com", "www.instagram.com",
    "youtube.com", "www.youtube.com", "youtu.be",
    "tiktok.com",
    "linkedin.com", "www.linkedin.com",
    "quora.com",
    "pinterest.com",
}


def host(url: str) -> str:
    try:
        return urllib.parse.urlparse(url).netloc.lower()
    except Exception:
        return ""


def is_useful_url(url: str) -> bool:
    if not url:
        return False
    h = host(url)
    if h in SKIP_HOSTS:
        return False
    if url.lower().endswith((".pdf", ".doc", ".docx")):
        return False
    return True


def fetch_html(url: str) -> str | None:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            data = resp.read()
        if resp.headers.get("Content-Encoding") == "gzip":
            import gzip
            data = gzip.decompress(data)
        elif resp.headers.get("Content-Encoding") == "br":
            try:
                import brotli  # type: ignore
                data = brotli.decompress(data)
            except Exception:
                pass
        return data.decode("utf-8", errors="replace")
    except Exception as exc:
        return None


def extract_one(url: str):
    html = fetch_html(url)
    if not html:
        return {"url": url, "error": "fetch-failed", "text": ""}
    text = trafilatura.extract(
        html,
        favor_recall=True,
        include_comments=False,
        include_tables=True,
        no_fallback=False,
    )
    if not text:
        return {"url": url, "error": "extract-failed", "text": ""}
    text = re.sub(r"\n{3,}", "\n\n", text.strip())
    if len(text) > MAX_TEXT_LEN:
        text = text[:MAX_TEXT_LEN] + "\n\n[...truncated...]"
    # Try to also pull a title.
    title = None
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    if m:
        title = re.sub(r"\s+", " ", m.group(1)).strip()[:160]
    return {"url": url, "title": title, "text": text}


def pick_urls(article_data: dict) -> list[str]:
    seen = set()
    chosen = []
    for engine in ("bing", "ddg"):
        for r in article_data.get(engine) or []:
            url = r.get("url")
            if not is_useful_url(url) or url in seen:
                continue
            seen.add(url)
            chosen.append(url)
            if len(chosen) >= MAX_PER_ARTICLE:
                return chosen
    return chosen


def main():
    if len(sys.argv) != 3:
        print("usage: extract_content.py <serps.json> <output.json>",
              file=sys.stderr)
        sys.exit(2)

    with open(sys.argv[1], "r", encoding="utf-8") as fh:
        serps = json.load(fh)

    output = {}

    # Build a (slug, url) work list, deduplicated across articles so we
    # don't fetch the same URL twice (saves bandwidth — many keywords
    # share top results).
    by_url: dict[str, list[str]] = {}
    article_urls: dict[str, list[str]] = {}
    for slug, data in serps.items():
        urls = pick_urls(data)
        article_urls[slug] = urls
        for url in urls:
            by_url.setdefault(url, []).append(slug)

    print(f"Fetching {len(by_url)} unique URLs across {len(serps)} articles…",
          file=sys.stderr)

    fetched = {}
    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = {pool.submit(extract_one, url): url for url in by_url}
        for i, future in enumerate(as_completed(futures), 1):
            url = futures[future]
            try:
                fetched[url] = future.result()
            except Exception as exc:
                fetched[url] = {"url": url, "error": str(exc), "text": ""}
            if i % 10 == 0:
                print(f"  {i}/{len(by_url)} done", file=sys.stderr)

    # Stitch back per-article.
    success_total = 0
    for slug, data in serps.items():
        keyword = data.get("keyword")
        sources = []
        for url in article_urls.get(slug, []):
            src = fetched.get(url, {"url": url, "error": "missing", "text": ""})
            if src.get("text"):
                success_total += 1
            sources.append(src)
        ok = sum(1 for s in sources if s.get("text"))
        print(f"  {slug}: {ok}/{len(sources)} sources OK", file=sys.stderr)
        output[slug] = {"keyword": keyword, "sources": sources}

    with open(sys.argv[2], "w", encoding="utf-8") as fh:
        json.dump(output, fh, indent=2)
    print(f"wrote {sys.argv[2]} ({success_total} extractions OK)",
          file=sys.stderr)


if __name__ == "__main__":
    main()
