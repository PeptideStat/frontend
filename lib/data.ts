/**
 * Static marketing/landing data for the homepage.
 *
 * These power the hero "popular questions" chips, the stats row, the
 * category grid, the featured guides grid and the trusted-sources row.
 * Kept hand-curated rather than auto-derived from MDX frontmatter so the
 * homepage doesn't go thin while the article cluster is still being filled
 * out — link targets fall back to `/peptides` until cluster slugs exist.
 */
import { getAllArticles } from "@/lib/content";

/** ------------------------------------------------------------------ */
/* Popular-questions chips in the hero                                  */
/** ------------------------------------------------------------------ */

export interface PopularQuestion {
  /** The chip label. */
  label: string;
  /** Where the chip links to. Use existing slugs first, fallbacks are fine. */
  href: string;
}

export const popularQuestions: PopularQuestion[] = [
  {
    label: "Bryan Johnson hair protocol",
    href: "/peptides/bryan-johnson-hair-protocol",
  },
  {
    label: "Bryan Johnson discount code",
    href: "/bryan-johnson-discount-code",
  },
  {
    label: "BPC-157 vs TB-500",
    href: "/peptides/bpc-157-vs-tb-500",
  },
  {
    label: "GHK-Cu for hair growth",
    href: "/peptides/ghk-cu-for-hair-growth",
  },
  {
    label: "Best peptides for hair growth",
    href: "/peptides/best-peptides-for-hair-growth",
  },
  {
    label: "How does Retatrutide compare to Tirzepatide?",
    href: "/peptides/retatrutide",
  },
  {
    label: "What are BPC-157's side effects?",
    href: "/peptides/bpc-157",
  },
  {
    label: "Retatrutide dosing schedule",
    href: "/peptides/retatrutide-dosage",
  },
  {
    label: "Is Retatrutide FDA approved?",
    href: "/peptides/retatrutide",
  },
  {
    label: "BPC-157 vs TB-500",
    href: "/peptides/bpc-157",
  },
];

/** ------------------------------------------------------------------ */
/* Stats row                                                             */
/** ------------------------------------------------------------------ */

export interface SiteStat {
  value: string;
  label: string;
}

/**
 * Hardcoded "ambition" numbers for the cluster targets, with the live
 * article count appended. Refresh as the cluster fills out.
 */
export function getSiteStats(): SiteStat[] {
  const articleCount = getAllArticles().length;
  return [
    { value: `${articleCount}+`, label: "research-backed guides" },
    { value: "20+", label: "peptides covered" },
    { value: "10+", label: "trusted sources" },
    { value: "100%", label: "evidence-based" },
  ];
}

/** ------------------------------------------------------------------ */
/* Category grid                                                         */
/** ------------------------------------------------------------------ */

export interface Category {
  slug: string;
  title: string;
  description: string;
  href: string;
  /** Inline SVG paint, used for the icon tint. */
  tint: "emerald" | "sky" | "amber" | "violet" | "rose" | "slate";
  /** SVG icon name from `components/icons.tsx`. */
  icon:
    | "weight"
    | "spark"
    | "shield"
    | "molecule"
    | "pulse"
    | "brain"
    | "leaf"
    | "flame";
}

export const categories: Category[] = [
  {
    slug: "weight-loss",
    title: "Weight loss",
    description: "GLP-1, GIP and triple agonists — what works and what's hype.",
    href: "/database?category=weight-loss",
    tint: "emerald",
    icon: "weight",
  },
  {
    slug: "healing-recovery",
    title: "Healing & recovery",
    description: "Tissue repair, tendon and gut peptides — research vs claims.",
    href: "/database?category=healing-recovery",
    tint: "sky",
    icon: "spark",
  },
  {
    slug: "growth-hormone",
    title: "Growth hormone",
    description: "GH secretagogues and analogs — how they actually work.",
    href: "/database?category=growth-hormone",
    tint: "violet",
    icon: "molecule",
  },
  {
    slug: "longevity",
    title: "Longevity",
    description: "Peptides marketed for healthspan — what the evidence shows.",
    href: "/database?category=longevity",
    tint: "amber",
    icon: "pulse",
  },
  {
    slug: "cognitive",
    title: "Cognitive",
    description: "Nootropic peptides and the neuroscience behind them.",
    href: "/database?category=cognitive",
    tint: "rose",
    icon: "brain",
  },
  {
    slug: "metabolic-health",
    title: "Metabolic health",
    description: "Glucose control, insulin sensitivity, lipid markers.",
    href: "/database?category=metabolic-health",
    tint: "slate",
    icon: "flame",
  },
  {
    slug: "safety",
    title: "Safety & side effects",
    description: "Common, dose-related and long-term risk profiles.",
    href: "/peptides",
    tint: "rose",
    icon: "shield",
  },
  {
    slug: "comparisons",
    title: "Comparisons",
    description: "Peptide-vs-peptide breakdowns — efficacy, side effects, cost.",
    href: "/peptides",
    tint: "sky",
    icon: "leaf",
  },
];

/** ------------------------------------------------------------------ */
/* Featured guides — surfaced pillar articles                            */
/** ------------------------------------------------------------------ */

export interface FeaturedGuide {
  title: string;
  description: string;
  href: string;
  /** Short eyebrow above the title. */
  kicker: string;
}

export const featuredGuides: FeaturedGuide[] = [
  {
    kicker: "Hair protocol",
    title: "Best peptides for hair growth",
    description:
      "Evidence-ranked hair-growth options: GHK-Cu, topical peptides, minoxidil baseline, adenosine, caffeine and laser therapy.",
    href: "/peptides/best-peptides-for-hair-growth",
  },
  {
    kicker: "Triple agonist",
    title: "Retatrutide: the complete guide",
    description:
      "What the trials actually show on weight loss, side effects and how it compares to tirzepatide and semaglutide.",
    href: "/peptides/retatrutide",
  },
  {
    kicker: "Recovery",
    title: "BPC-157: hype vs evidence",
    description:
      "Promising preclinical work, almost no human data. Separating what the research shows from what the marketing claims.",
    href: "/peptides/bpc-157",
  },
];

/** ------------------------------------------------------------------ */
/* Trusted sources row                                                   */
/** ------------------------------------------------------------------ */

export interface Source {
  name: string;
  url: string;
}

export const trustedSources: Source[] = [
  { name: "NEJM", url: "https://www.nejm.org/" },
  { name: "PubMed Central", url: "https://pmc.ncbi.nlm.nih.gov/" },
  { name: "ScienceDirect", url: "https://www.sciencedirect.com/" },
  { name: "Eli Lilly", url: "https://www.lilly.com/" },
  { name: "FDA", url: "https://www.fda.gov/" },
  { name: "WHO", url: "https://www.who.int/" },
];
