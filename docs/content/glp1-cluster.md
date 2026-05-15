# GLP-1 Content Cluster — Plan

**Status:** In production
**Source data:** Google Keyword Planner CSV, Apr 2025 – Mar 2026
**Total articles planned:** 32
**Total keywords covered:** ~95 from the CSV
**Methodology:** For each article, SERPAPI Bing + DuckDuckGo top results are
fetched, content extracted via WebFetch, then synthesized into an original
article. Saved as MDX in `content/peptides/`.

## Intent priority (buyer-intent first, per the brief)

The list is ordered so buyer-intent articles ship first.

| # | Slug | Primary keyword(s) | Secondary keywords (grouped) | Intent | Volume bucket |
|---|------|--------------------|------------------------------|--------|---------------|
| 1 | `where-to-get-glp-1-online` | get glp 1 online · glp 1 online · glp1 online · online glp1 | how to get glp 1, ordering glp 1 | **Buyer** | 5k–10k |
| 2 | `cheapest-glp-1-for-weight-loss` | cheapest glp 1 · cheapest glp1 for weight loss · most affordable glp 1 · least expensive glp 1 · cheapest glp 1 agonist | best price glp 1 | **Buyer** | 50k |
| 3 | `best-glp-1-for-weight-loss` | best glp 1 for weight loss · most effective glp 1 for weight loss · glp 1 with most weight loss · new glp 1 for weight loss | top glp 1 | **Buyer / comparison** | 50k |
| 4 | `glp-1-cost` | glp 1 cost · glp 1 drugs cost · glp 1 price · glp 1 weight loss cost · glp 1 injection cost | how much does glp 1 cost | **Buyer** | 50k |
| 5 | `ro-glp-1-review` | ro glp 1 · glp 1 ro | Ro Roman telehealth glp 1 | **Buyer / brand** | 50k |
| 6 | `glp-1-weight-loss-near-me` | glp 1 weight loss near me · glp1 near me | local glp 1 clinics | **Buyer / local** | 50k |
| 7 | `glp-1-on-amazon` | glp 1 amazon | buying glp 1 amazon disambiguator | **Buyer (disambig.)** | 5k |
| 8 | `glp-1-coupon` | glp 1 coupon | discount, savings card | **Buyer** | 500 |
| 9 | `compounded-glp-1` | compounded glp 1 | compounded semaglutide / tirzepatide | **Buyer / legality** | (not in CSV) |
| 10 | `what-is-glp-1` *(pillar)* | glp 1 · glp1 · gl p1 · gl p 1 · glp 1 hormone · glp 1 hormones · glp1s · glp 1's | glp 1 g lp 1 | Informational | 500k |
| 11 | `glp-1-drugs-list` | glp 1 drugs · glp 1 medications · glp1 meds · glp 1 drugs list · glp1 meds list · glp 1 medication list · glp 1 agonist drugs · glp 1 receptor agonist drugs | full list of glp 1s | Informational | 50k |
| 12 | `glp-1-receptor-agonists` | glp 1 agonist · glp 1 receptor agonist · glp 1 receptor agonists · glp1 agonist · glp 1 receptor · glp 1 agonist list · glp 1 receptor agonist list · glp 1 agonist examples · glp 1 examples · glp 1 analogue · glp 1 peptide · peptide glp 1 · glp 1's | what is a glp 1 agonist | Informational | 50k |
| 13 | `glp-1-for-weight-loss` | glp 1 weight loss · glp 1 drugs for weight loss · glp 1 for weight loss only · glp 1 peptide for weight loss · glp1 agonists for weight loss · glp 1 receptor agonist weight loss · glp 1 agonist weight loss · gop1 weight loss · glp1 weight loss · glp 1 meds for weight loss | weight loss glp 1 | Informational | 50k |
| 14 | `fda-approved-glp-1-for-weight-loss` | glp 1 approved for weight loss · fda approved glp1 for weight loss · glp 1 for weight loss fda approved · glp 1 agonists approved for weight loss | FDA list | Informational | 5k |
| 15 | `glp-1-dosage-for-weight-loss` | glp 1 dosage for weight loss · semaglutide glp 1 dosage | dosing schedules | Informational / health | 5k |
| 16 | `glp-1-weight-loss-before-and-after` | glp 1 weight loss before and after | results timeline | Informational | 5k |
| 17 | `glp-1-side-effects` | (not explicit in CSV but critical for YMYL cluster) | nausea, gi, gastroparesis | Informational / safety | (high) |
| 18 | `glp-1-vs-sglt2-inhibitors` | glp 1 inhibitors · sglt2 inhibitors and glp 1 receptor agonists | comparison; addresses confusion that GLP-1s are "inhibitors" | Informational | 50k |
| 19 | `glp-1-hormone-explained` | glp 1 hormone · glp 1 hormones | biology of GLP-1 | Informational | 5k |
| 20 | `mounjaro-tirzepatide-glp-1` | mounjaro glp 1 · manjaro glp 1 · glp 1 mounjaro · glp 1 drugs mounjaro · glp 1 agonist mounjaro · mounjaro glp 1 agonist · tirzepatide glp 1 | is mounjaro a glp 1 | Brand | 5k–50k |
| 21 | `semaglutide-as-glp-1` | semaglutide glp 1 · semaglutide glp 1 for weight loss · semaglutide glp 1 dosage · semaglutide glp 1 analogue 5mg · glp 1 drugs ozempic | ozempic glp 1 | Brand | 5k |
| 22 | `saxenda-liraglutide-glp-1` | saxenda glp 1 | liraglutide as glp 1 | Brand | 500 |
| 23 | `retatrutide-vs-glp-1` | (links existing /peptides/retatrutide pillar) | triple agonist context | Comparison | (cluster bridge) |
| 24 | `eli-lilly-glp-1` | eli lilly glp 1 · glp 1 eli lilly · lilly glp 1 | Lilly's GLP-1 lineup | Brand / manufacturer | 5k |
| 25 | `novo-nordisk-glp-1` | novo nordisk glp 1 · glp 1 novo nordisk | Novo's GLP-1 lineup | Brand / manufacturer | 5k |
| 26 | `amgen-sanofi-glp-1-pipeline` | amgen glp 1 · sanofi glp 1 | other manufacturer programs | Brand / manufacturer | 500 |
| 27 | `glp-1-treatment-guide` | glp 1 treatment | how treatment works | Informational | 5k |
| 28 | `glp-1-microdosing` | (not in CSV; trending) | low-dose glp 1 | Informational / niche | (rising) |
| 29 | `glp-1-and-alcohol` | (not in CSV; high real-world question) | safety / interactions | Informational / safety | (high real-world) |
| 30 | `glp-1-reddit-insights` | glp 1 reddit | what real users report | Informational | 5k |
| 31 | `sermorelin-complete-guide` | sermorelin | (different peptide — GH secretagogue) | Informational | **500k (own cluster)** |
| 32 | `glp-1-glossary` | glp 1 i · glp1 a · g lp 1 · glp1 i · glp 1's · gl p 1 (and other typo/variant tail) | catch-all term decoder | Informational / catch | tail |

## Methodology notes per article

- **Pull SERPs** via SERPAPI: 1 Bing call + 1 DuckDuckGo call per keyword.
- **Extract content** from top 4–6 organic URLs (excluding social/forums) via WebFetch.
- **Synthesize** an original article structured for the keyword's intent.
- **Frontmatter** sets cluster (`glp-1` or `sermorelin`), pillar where applicable,
  tags, date, author. YMYL disclaimer line in every body.
- **Internal links** between the cluster + back to existing peptide pillars
  (retatrutide, bpc-157) where relevant.

## Risks (recorded for the file)

This cluster is being produced via the scrape-and-synthesize approach
explicitly requested by the user, after I flagged: (a) Google's scaled-
content-abuse policy risk for AI-aggregated content in a YMYL niche on a
new domain, (b) E-E-A-T evaluation risk for medical content, (c) FTC
disclosure requirements for any telehealth/prescription-drug affiliate
links. Mitigations applied: explicit YMYL disclaimers per article,
synthesis from multiple sources (not single-page paraphrase), original
framing and structure, primary-source citations preferred.
