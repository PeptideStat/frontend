"""
Fetch Bing + DuckDuckGo SERPs for a batch of (slug, keyword) pairs via
SERPAPI and write the consolidated URL list to a JSON file.

Usage:
    python fetch_serps.py <batch_file.json> <output_file.json>

batch_file.json shape:
    [{"slug": "where-to-get-glp-1-online", "keyword": "get glp 1 online"}, ...]

output_file.json shape:
    {
      "<slug>": {
        "keyword": "<keyword>",
        "bing":    [{"title": ..., "url": ..., "snippet": ...}, ...],
        "ddg":     [{"title": ..., "url": ..., "snippet": ...}, ...]
      }
    }

Keys are passed via env vars SERPAPI_KEY_1 and SERPAPI_KEY_2.
We split engines across keys to balance load and quota.
"""
import json
import os
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

KEY_BING = os.environ.get("SERPAPI_KEY_1", "").strip()
KEY_DDG = os.environ.get("SERPAPI_KEY_2", "").strip()


def fetch(engine: str, query: str, api_key: str, num: int = 10):
    params = {
        "engine": engine,
        "q": query,
        "num": str(num),
        "api_key": api_key,
    }
    url = "https://serpapi.com/search?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url, timeout=30) as resp:
        data = json.loads(resp.read())
    if "error" in data:
        return {"error": data["error"], "results": []}
    results = []
    for item in (data.get("organic_results") or [])[:num]:
        results.append({
            "title": item.get("title"),
            "url": item.get("link"),
            "snippet": item.get("snippet"),
        })
    return {"results": results}


def fetch_one(item):
    slug = item["slug"]
    keyword = item["keyword"]
    out = {"keyword": keyword, "bing": [], "ddg": []}
    try:
        out["bing"] = fetch("bing", keyword, KEY_BING)["results"]
    except Exception as exc:
        out["bing_error"] = str(exc)
    try:
        out["ddg"] = fetch("duckduckgo", keyword, KEY_DDG)["results"]
    except Exception as exc:
        out["ddg_error"] = str(exc)
    return slug, out


def main():
    if len(sys.argv) != 3:
        print("usage: fetch_serps.py <batch_file.json> <output_file.json>",
              file=sys.stderr)
        sys.exit(2)
    if not KEY_BING or not KEY_DDG:
        print("Set SERPAPI_KEY_1 and SERPAPI_KEY_2 env vars", file=sys.stderr)
        sys.exit(2)

    with open(sys.argv[1], "r", encoding="utf-8") as fh:
        batch = json.load(fh)

    output = {}
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch_one, item) for item in batch]
        for future in as_completed(futures):
            slug, data = future.result()
            output[slug] = data
            bing_n = len(data.get("bing") or [])
            ddg_n = len(data.get("ddg") or [])
            print(f"  {slug}: bing={bing_n} ddg={ddg_n}", file=sys.stderr)

    with open(sys.argv[2], "w", encoding="utf-8") as fh:
        json.dump(output, fh, indent=2)
    print(f"wrote {sys.argv[2]}", file=sys.stderr)


if __name__ == "__main__":
    main()
