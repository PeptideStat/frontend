# 2026-05-15 — Homepage redesign (peptide-db.com pattern) + dark theme

**Status:** Implemented and pushed
**Reference:** [peptide-db.com](https://peptide-db.com)

## Goal

Adopt peptide-db.com's structural vocabulary for the PeptideStat homepage —
scannable sections, credibility signals up top — while keeping the blog
content model intact and ship our own dark visual identity rather than
copying their light palette. The reference site is a **database / tool
suite**; PeptideStat is an **affiliate blog**. The redesign copies the
*structural grammar* and adapts the *layout* to fit blog content; the
color system is original.

## Color system — dark, cool, vivid green

Original palette (not from the reference). Cool near-black canvas with
stepped elevation, near-white cool text scale, and a vivid emerald accent
that pops against the dark.

| Token | Hex | Use |
|---|---|---|
| `--color-canvas` | `#0b0f14` | Page background (darkest) |
| `--color-surface` | `#11161d` | Section bg accent |
| `--color-surface-2` | `#18202a` | Cards / elevated panels |
| `--color-line` | `#1f2937` | Subtle borders |
| `--color-line-strong` | `#2e3a4d` | Strong borders / focus |
| `--color-ink` | `#e6edf3` | Primary text |
| `--color-ink-soft` | `#b9c4d0` | Secondary text |
| `--color-muted` | `#7d8a99` | Tertiary text |
| `--color-muted-soft` | `#586374` | Quaternary / hints |
| `--color-accent-bright` | `#34d399` | Hover / active accent |
| `--color-accent` | `#10b981` | Default accent |
| `--color-accent-dark` | `#047857` | Strong borders / logo chip end |
| `--color-accent-soft` | `#062a1d` | Tinted bg (badges, gradients) |

Plus six paired category tints (emerald / sky / amber / violet / rose /
slate) — each token has a dark bg + bright ink variant.

**Effects:**
- `bg-hero-glow` — radial emerald glow behind the hero headline
- `bg-grid` — light 32px grid pattern (1px white at 4% opacity)
- `shadow-card` / `shadow-card-hover` — dark drop + faint inner highlight,
  with a hint of accent glow on hover

`color-scheme: dark` is set on `<html>` so native form controls and
scrollbars match.

## What changed

### Visual system (`app/globals.css`)

- Dark token palette (see "Color system" above) + paired category tints
- Custom utilities: `shadow-card`, `shadow-card-hover`, `bg-grid`,
  `bg-hero-glow`
- `--section-pad-y` rhythm token, `color-scheme: dark` on `<html>`

### Homepage (`app/page.tsx`) — section-by-section

Each section is its own component for swap/reorder:

| Section | Component | Source pattern |
|---|---|---|
| Hero — eyebrow, big H1, sub, search-shaped CTA, "Browse" button, popular-question chips | `HeroSection` | peptide-db hero + example-query prompts |
| Stats row — 4 headline figures | `StatsRow` | peptide-db stat row |
| Trusted sources — wordmark row | `TrustedSources` | peptide-db citation logos (text-only — we don't host third-party marks) |
| Category grid — 8 cards w/ tinted icon + title + summary | `CategoryGrid` | peptide-db "Explore by Category" |
| Featured guides — 3 large pillar cards | `FeaturedGuides` | peptide-db "Tools" grid, adapted to blog content |
| Disclaimer banner — full-width band | `DisclaimerBanner` | peptide-db disclaimer notice |

### Header (`components/Header.tsx`) — desktop + mobile

- Logo (gradient chip) + primary nav + **⌘K search button** + "Browse peptides"
  CTA. Mobile collapses search to an icon and hides the CTA.

### Search (`components/SearchTrigger.tsx`, `HeroSearchButton.tsx`)

- Client component listens for `Cmd/Ctrl-K` and a custom DOM event
  (`peptidestat:open-search`) so the hero's search-bar-shaped button can open
  the same dialog as the header button.
- Dialog: input + filtered results list (case-insensitive includes over title
  + description + cluster), arrow-key navigation, Enter to open, Esc to close,
  body-scroll-lock while open.
- Article list is fetched on the server and passed in as plain JSON — no MDX
  bodies in the client bundle.

### Footer (`components/Footer.tsx`)

- 4-column layout: brand block + Browse / About / Legal nav columns + bottom
  bar with copyright and affiliate notice.

### Other pages

- `/peptides` index — got the new hero-style header band and the disclaimer
  banner above the footer. Cards unchanged.
- `/about` — unchanged this pass.
- Article pages (`/peptides/[slug]`) — unchanged this pass; the MDX typography
  already fits the new system.

## Files added

```
components/HeroSection.tsx
components/HeroSearchButton.tsx     (client)
components/StatsRow.tsx
components/CategoryGrid.tsx
components/FeaturedGuides.tsx
components/TrustedSources.tsx
components/DisclaimerBanner.tsx
components/SearchTrigger.tsx        (client)
components/icons.tsx                (inline SVG icon set)
lib/data.ts                         (categories, popular questions, stats, sources)
```

## Files modified

```
app/globals.css                     (token + utility refresh)
app/page.tsx                        (composes the new sections)
app/peptides/page.tsx               (new header band)
components/Header.tsx               (search button + refined nav)
components/Footer.tsx               (multi-column)
site.config.ts                      (tagline tweak)
package.json                        (dev/start scripts → port 3002)
```

## Decisions worth flagging

1. **Adapted, not cloned.** A literal database homepage doesn't fit a blog —
   no auth, no Browse/Tools/Compounds/Calculators, no AI Assistant. We took
   the *grammar* (hero → stats → sources → categories → guides → disclaimer)
   and filled it with blog content.
2. **Dark theme, original palette.** The reference site is light; per user
   direction we shipped a dark theme with an original cool-dark + emerald
   palette rather than copying their colors.
3. **No third-party logos.** peptide-db.com puts university/partner logos in
   its credibility row. We use plain text wordmarks (NEJM, PubMed Central, …)
   to avoid hosting third-party marks without permission.
4. **No fake features.** Skipped Sign In / Register, "Browse Compounds",
   tools that don't exist (calculators, AI assistant, stack builder). Will
   come back when those features actually exist.
5. **Dev port.** Scripts default to `3002` — `3000` is privage-app, `3001` is
   cryptostat/frontend. Both confirmed running on this machine.

## Future work (not in this pass)

- Article page hero treatment (subtle header band like the index).
- Categories currently all link to `/peptides` — wire to filtered views once
  there are enough articles per category.
- Featured-guides selection is hand-curated in `lib/data.ts`; could be derived
  from `pillar: true` frontmatter once more pillars exist.
- Add affiliate components (CTA box, comparison table) referenced by the
  content plan — required before launching the buying-cluster pages.
