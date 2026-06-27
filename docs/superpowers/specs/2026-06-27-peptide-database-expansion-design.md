# Peptide Database Expansion — Design

**Date:** 2026-06-27
**Status:** Approved (list + architecture)

## Goal

Expand site coverage toward "every known peptide": for each peptide in an
approved ~67-compound list, ship (1) a ≥1,000-word, primary-sourced
`/peptides` MDX article and (2) a structured `/database` entry that links to
it. SEO-optimized; article titles start with **"<Name> Peptide: …"**.

## Architecture decisions

- **Two existing systems, both used.** Long-form prose lives in
  `content/peptides/<slug>.mdx` (rendered at `/peptides/<slug>`). Structured
  reference cards live in `data/peptides.ts` (rendered at `/database/<slug>`)
  and link to the article via `articleSlug`. We add to BOTH per peptide.
- **No cover images this pass.** `coverImage` frontmatter is omitted; the
  article template renders cleanly without it. A checklist of needed covers is
  produced at the end for a later image pass.
- **All articles dated 2026-06-27** (published live immediately).
- **Centralized data merge.** Subagents write only their MDX file and *return*
  their `Peptide` object (and optional `PeptideEvidence` object) as JSON. The
  orchestrator merges these into `data/peptides.ts` and `data/peptideEvidence.ts`
  so the shared data files are never written in parallel.

## Per-peptide deliverable

### 1. MDX article — `content/peptides/<base>-peptide.mdx`

Follows the `leuprolide-peptide.mdx` template exactly:

- Frontmatter: `title` (starts with "<Name> Peptide: …"), `metaTitle`
  (≤60 chars), `description` (~150-160 chars), `excerpt`, `date: "2026-06-27"`,
  `updated: "2026-06-27"`, `author: "PeptideStat Editorial Team"`, `tags`,
  `cluster`, 4 `faqs`. No `coverImage`.
- Body ≥1,000 words: intro, "At a glance" markdown table, mechanism, evidence
  (by indication/use), safety/limits, comparisons, "how to evaluate a claim",
  bottom line.
- **3–6 inline internal links** to natural-fit existing or sibling-new
  articles (full slug list supplied to each subagent).
- **`<References>` block** of PRIMARY sources only (DailyMed, FDA, PubMed,
  PMC, manufacturer labels). No secondary blogs. Label topline figures with
  their source; no false precision.

### 2. Database entry — appended to `data/peptides.ts`

Full `Peptide` interface: `slug` (base, no `-peptide`), `name`, `aliases`,
`category`, `drugClass`, `targets[]`, `mechanism` (1 sentence),
`typicalDose` (reference range from label/trial — NOT a recommendation),
`routeOfAdministration`, `halfLife`, `status`
(`approved` | `investigational` | `research-only`), `approvedFor?`,
`developer`, `year`, `articleSlug: "<base>-peptide"`. `productUrl`/
`productImageUrl` only if an Ascension match is known (else omitted).

### 3. Evidence entry — appended to `data/peptideEvidence.ts` (optional)

Add a real `PeptideEvidence` (score 1–5, label, summary, basis[], references[])
ONLY where sources support it. Omit otherwise — the template handles absence.

## Structural change: category union

`PeptideCategory` currently has 6 values and cannot classify GnRH drugs,
cosmetic, cardio/GI/endocrine clinicals, or antimicrobials. Extend the union
and `CATEGORY_LABELS` in `data/peptides.ts` with:

- `reproductive-hormone` — "Reproductive & hormone"
- `skin-cosmetic` — "Skin & cosmetic"
- `clinical-peptide` — "Clinical / approved drug"
- `antimicrobial` — "Antimicrobial & immune"

Category hubs remain optional (`getPeptideCategoryHubByCategory` returns
undefined safely; the detail page guards on it). No new hubs required.

## Internal linking scope

- This pass: **new → existing** and **new → new** inline links, plus correct
  `cluster`/`tags` so the automatic "Related" blocks surface siblings.
- Deferred follow-up: back-links from the 102 existing articles to new ones.

## Execution plan

- Subagents in **batches of ~8–10**, run in parallel. Each receives: the
  template example, the sourcing standard, the full existing-slug list, the
  target category, and the required return JSON shape.
- **Checkpoint with the user after each batch** before continuing.
- After all batches: merge data files, extend category union, run
  `next build` + lint, and produce the **cover-image checklist**.

## Approved peptide list (~67)

GH / secretagogues: GHRP-2, IGF-1 LR3, IGF-1 DES, MGF, HGH Fragment 176-191, ACE-031
Healing / tissue: Thymosin Beta-4, VIP, Larazotide, Humanin
GLP-1 / metabolic: Dulaglutide, Exenatide, Lixisenatide, Albiglutide, Efpeglenatide, Amylin, Glucagon
Bioregulators / longevity: Thymalin, Thymogen, Vesugen, Vilon, Pinealon, Cortexin
Cognitive: N-Acetyl Semax, N-Acetyl Selank, P21, Davunetide
Reproductive / GnRH: Triptorelin, Goserelin, Buserelin, Nafarelin, Histrelin, Cetrorelix, Ganirelix, Degarelix
Skin / cosmetic: Argireline, Matrixyl, SNAP-8
Immune: Thymulin, Tuftsin
Approved clinical peptides: Lanreotide, Teriparatide, Abaloparatide, Calcitonin, Desmopressin, Vasopressin, Terlipressin, Plecanatide, Bivalirudin, Eptifibatide, Enfuvirtide, Ziconotide, Carbetocin, Atosiban, Pasireotide, Secretin, Sincalide, Nesiritide
Antimicrobial / misc: Melittin, Colivelin, Adipotide

## Success criteria

- Every listed peptide has an MDX article (≥1,000 words, primary sources,
  "<Name> Peptide" title) and a `/database` entry linking to it.
- `next build` and lint pass.
- Category filters work for the new categories.
- Cover-image checklist delivered.

## Quality / safety guardrails

- Educational, not medical advice; every article keeps the disclaimer framing.
- Dose/half-life are reference values from labels/trials, explicitly NOT
  recommendations.
- Research-only compounds clearly labeled; no implied human dosing for
  compounds without human data.
- Primary sources only; topline data labeled; no invented precision.
