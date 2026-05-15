"""
Apply a staggered publish schedule to the GLP-1 cluster MDX files.

Each entry in SCHEDULE maps an article slug to its planned publish date.
The script rewrites the `date:` frontmatter line in the corresponding
`content/peptides/<slug>.mdx` file. Combined with the `includeFuture`
filter in `lib/content.ts`, future-dated articles are hidden from listings,
sitemap and static-param generation until their date arrives.

Run after editing the schedule below:
    python scripts/schedule_publish.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content" / "peptides"

# Drip-publishing plan for the GLP-1 cluster.
# Week 1 (already published): pillar + sub-pillar + 1 high-value buyer + 1 safety + 1 access
# Weeks 2-8: 4 articles per week, paired Mon/Thu cadence
SCHEDULE = {
    # ---- Week 1 — LIVE on launch (2026-05-15) ----
    "what-is-glp-1": "2026-05-15",
    "glp-1-for-weight-loss": "2026-05-15",
    "best-glp-1-for-weight-loss": "2026-05-15",
    "where-to-get-glp-1-online": "2026-05-15",
    "glp-1-side-effects": "2026-05-15",

    # ---- Week 2 ----
    "cheapest-glp-1-for-weight-loss": "2026-05-19",
    "ro-glp-1-review": "2026-05-19",
    "glp-1-cost": "2026-05-22",
    "glp-1-coupon": "2026-05-22",

    # ---- Week 3 ----
    "glp-1-drugs-list": "2026-05-26",
    "glp-1-dosage-for-weight-loss": "2026-05-26",
    "mounjaro-tirzepatide-glp-1": "2026-05-29",
    "semaglutide-as-glp-1": "2026-05-29",

    # ---- Week 4 ----
    "glp-1-receptor-agonists": "2026-06-02",
    "compounded-glp-1": "2026-06-02",
    "glp-1-vs-sglt2-inhibitors": "2026-06-05",
    "glp-1-on-amazon": "2026-06-05",

    # ---- Week 5 ----
    "glp-1-weight-loss-near-me": "2026-06-09",
    "fda-approved-glp-1-for-weight-loss": "2026-06-09",
    "eli-lilly-glp-1": "2026-06-12",
    "novo-nordisk-glp-1": "2026-06-12",

    # ---- Week 6 ----
    "retatrutide-vs-glp-1": "2026-06-16",
    "glp-1-weight-loss-before-and-after": "2026-06-16",
    "glp-1-microdosing": "2026-06-19",
    "glp-1-and-alcohol": "2026-06-19",

    # ---- Week 7 ----
    "glp-1-treatment-guide": "2026-06-23",
    "glp-1-hormone-explained": "2026-06-23",
    "saxenda-liraglutide-glp-1": "2026-06-26",
    "sermorelin-complete-guide": "2026-06-26",

    # ---- Week 8 ----
    "amgen-sanofi-glp-1-pipeline": "2026-06-30",
    "glp-1-reddit-insights": "2026-06-30",
    "glp-1-glossary": "2026-07-03",
}


def update_frontmatter_date(path: Path, new_date: str) -> bool:
    """Rewrite the `date:` line in the file's frontmatter. Returns True on change."""
    text = path.read_text(encoding="utf-8")
    # Match the date line inside the leading frontmatter block.
    pattern = re.compile(r'^(date:\s*)"[^"]*"', re.MULTILINE)
    replacement = rf'\1"{new_date}"'
    new_text, count = pattern.subn(replacement, text, count=1)
    if count == 0:
        print(f"  [skip] no date line found in {path.name}")
        return False
    if new_text == text:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main():
    if not CONTENT_DIR.is_dir():
        raise SystemExit(f"content directory not found: {CONTENT_DIR}")

    by_date: dict[str, list[str]] = {}
    for slug, date in SCHEDULE.items():
        by_date.setdefault(date, []).append(slug)

    updated = 0
    missing = []
    for date in sorted(by_date.keys()):
        print(f"\n{date}:")
        for slug in sorted(by_date[date]):
            path = CONTENT_DIR / f"{slug}.mdx"
            if not path.exists():
                missing.append(slug)
                print(f"  [MISSING] {slug}")
                continue
            if update_frontmatter_date(path, date):
                print(f"  {slug}")
                updated += 1

    print(f"\nUpdated {updated} files.")
    if missing:
        print(f"Missing files (not in repo): {missing}")


if __name__ == "__main__":
    main()
