# Design: Two Researched GLP-1 Articles — Muscle Loss & Hair Loss

Date: 2026-05-25
Status: Approved (pending spec review)

## Goal

Write two well-researched, citation-backed, SEO-optimized articles for the
PeptideStat content library. Both target real, high-demand search queries that
currently have **zero coverage** among the existing 54 articles. Both are full
pillar deep-dives (~1,500–2,000 words, 8–12 citations each), use the standard
frontmatter and the `<References>` MDX component, and match the existing
"honest about evidence gaps, not hype" editorial voice.

All figures and citation URLs are **verified via live web research** (PubMed,
NEJM, JAMA, FDA labels, trial publications) before writing. No invented
statistics or citations.

## Conventions (from existing articles)

Frontmatter fields: `title`, `description`, `excerpt`, `coverImage`,
`coverImageAlt`, `date`, `author` ("PeptideStat Editorial Team"), `tags`,
`cluster`, `pillar`. Disclaimer blockquote near the top. Citations in a
`## References` section using the `<References>` component with
`<a target="_blank" rel="noopener noreferrer">` links and `<em>` journal names.

---

## Article 1 — Muscle Loss on GLP-1

- **Slug:** `glp-1-muscle-loss`
- **File:** `content/peptides/glp-1-muscle-loss.mdx`
- **Cluster:** `glp-1` · **Pillar:** `true`
- **Working title:** "Muscle Loss on GLP-1 Drugs: How Much Is Lean Mass, and How to Protect It"
- **Search intent:** Worry that Ozempic/Wegovy/Mounjaro is "burning muscle" —
  how real is it, how much, and what to do about it.

### Section outline
1. Intro + disclaimer.
2. Why weight loss *always* includes lean mass — the rough ~25% of weight lost
   as fat-free mass in any caloric deficit (verify figure during research).
3. What the trials measured — STEP 1 DXA body-composition substudy
   (semaglutide), SURMOUNT-1 body-composition data (tirzepatide). Fat vs.
   lean-mass loss comparison table.
4. Is GLP-1 muscle loss worse than diet alone? Honest, evidence-limited answer.
5. Why it matters — strength, resting metabolic rate, older adults / sarcopenia.
6. How to protect muscle — protein intake targets, resistance training
   (citable), pace of weight loss.
7. The drug pipeline targeting muscle preservation — bimagrumab, trevogrumab,
   enobosarm (clearly flagged investigational / not approved).
8. Bottom line + `<References>` (8–12 citations).

### Internal links
`glp-1-side-effects`, `semaglutide-vs-tirzepatide`,
`glp-1-dosage-for-weight-loss`, `peptides-for-weight-loss`.

### Citation targets (to verify)
STEP 1 (Wilding et al., NEJM 2021) + body-composition substudy; SURMOUNT-1
(Jastreboff et al., NEJM 2022); lean-mass-with-weight-loss reviews; protein +
resistance-training literature; bimagrumab/trevogrumab/enobosarm trial reports.

---

## Article 2 — GLP-1 / Ozempic Hair Loss

- **Slug:** `glp-1-hair-loss`
- **File:** `content/peptides/glp-1-hair-loss.mdx`
- **Cluster:** `glp-1` · **Pillar:** `true`
- **Working title:** "Does Ozempic Cause Hair Loss? What the Evidence Actually Shows"
- **Search intent:** "Ozempic hair loss" / "does Wegovy cause hair loss" — is it
  the drug, will it stop, what to do.

### Section outline
1. Intro + disclaimer.
2. Short answer: almost always **telogen effluvium** triggered by rapid weight
   loss, not direct drug toxicity.
3. What the trials reported — alopecia rates in STEP (semaglutide vs placebo)
   and SURMOUNT (tirzepatide). Rates table (verify exact percentages).
4. The mechanism — rapid weight loss, caloric/nutrient deficit, physiologic
   stress shocking follicles into telogen.
5. Is it permanent? Telogen effluvium is typically reversible; timeline.
6. What to do — protein/iron/nutrition, pace of loss, when to see a
   dermatologist. Cross-link to hair cluster.
7. Bottom line + `<References>` (6–10 citations).

### Internal links
`glp-1-side-effects`, `best-peptides-for-hair-growth`,
`ghk-cu-for-hair-growth`, `semaglutide-vs-tirzepatide`.

### Citation targets (to verify)
STEP trial alopecia adverse-event data; SURMOUNT alopecia data; telogen
effluvium / rapid-weight-loss dermatology references; nutrient-deficiency hair
loss reviews.

---

## Out of scope (YAGNI)
- No new MDX components — reuse `<References>` and existing markdown/table styles.
- No cover image creation — reference an existing/representative image path,
  consistent with current articles; flag if a new asset is needed.
- No changes to sitemap/registration logic (articles are auto-discovered from
  `content/peptides/`).

## Success criteria
- Both `.mdx` files build cleanly (`npm run build` / lint passes).
- Every statistic traces to a verifiable, linked source.
- Frontmatter complete and valid; articles appear in listings and sitemap.
- Internal links resolve to existing slugs.
- Titles/descriptions/intros vary in phrasing (per prior "vary templated
  titles" work) rather than reusing boilerplate.
