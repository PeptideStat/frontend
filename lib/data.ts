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
    label: "Peptide shampoo",
    href: "/peptides/peptide-shampoo",
  },
  {
    label: "Peptides for weight loss",
    href: "/peptides/peptides-for-weight-loss",
  },
  {
    label: "Semaglutide vs Tirzepatide",
    href: "/peptides/semaglutide-vs-tirzepatide",
  },
  {
    label: "Zepbound vs Wegovy",
    href: "/peptides/zepbound-vs-wegovy",
  },
  {
    label: "Ozempic vs Wegovy",
    href: "/peptides/ozempic-vs-wegovy",
  },
  {
    label: "Tirzepatide vs Retatrutide",
    href: "/peptides/tirzepatide-vs-retatrutide",
  },
  {
    label: "Semaglutide vs Liraglutide",
    href: "/peptides/semaglutide-vs-liraglutide",
  },
  {
    label: "How to inject peptides safely",
    href: "/peptides/how-to-inject-peptides-safely",
  },
  {
    label: "What are peptides?",
    href: "/peptides/what-are-peptides",
  },
  {
    label: "Peptide chemistry calculator",
    href: "/calculators/peptide-chemistry",
  },
  {
    label: "Peptide reconstitution guide",
    href: "/peptides/peptide-reconstitution-guide",
  },
  {
    label: "Bacteriostatic water guide",
    href: "/peptides/bacteriostatic-water-guide",
  },
  {
    label: "Peptide half-life explained",
    href: "/peptides/peptide-half-life-explained",
  },
  {
    label: "Peptide storage guide",
    href: "/peptides/peptide-storage-guide",
  },
  {
    label: "How does Retatrutide compare to Tirzepatide?",
    href: "/peptides/tirzepatide-vs-retatrutide",
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
  imageSrc: string;
  imageAlt: string;
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
    href: "/peptides/peptides-for-weight-loss",
    imageSrc: "/images/categories/weight-loss-category.jpg",
    imageAlt: "Peptide research visual for weight loss and metabolic agonists",
    tint: "emerald",
    icon: "weight",
  },
  {
    slug: "healing-recovery",
    title: "Healing & recovery",
    description: "Tissue repair, tendon and gut peptides — research vs claims.",
    href: "/database/healing-peptides",
    imageSrc: "/images/categories/healing-recovery-category.jpg",
    imageAlt: "Peptide research visual for tissue healing and recovery",
    tint: "sky",
    icon: "spark",
  },
  {
    slug: "growth-hormone",
    title: "Growth hormone",
    description: "GH secretagogues and analogs — how they actually work.",
    href: "/database/growth-hormone-peptides",
    imageSrc: "/images/categories/growth-hormone-category.jpg",
    imageAlt: "Peptide research visual for growth hormone secretagogues",
    tint: "violet",
    icon: "molecule",
  },
  {
    slug: "longevity",
    title: "Longevity",
    description: "Peptides marketed for healthspan — what the evidence shows.",
    href: "/database/longevity-peptides",
    imageSrc: "/images/categories/longevity-category.jpg",
    imageAlt: "Peptide research visual for longevity and healthspan",
    tint: "amber",
    icon: "pulse",
  },
  {
    slug: "cognitive",
    title: "Cognitive",
    description: "Nootropic peptides and the neuroscience behind them.",
    href: "/database/cognitive-peptides",
    imageSrc: "/images/categories/cognitive-category.jpg",
    imageAlt: "Peptide research visual for cognitive and neuroscience topics",
    tint: "rose",
    icon: "brain",
  },
  {
    slug: "metabolic-health",
    title: "Metabolic health",
    description: "Glucose control, insulin sensitivity, lipid markers.",
    href: "/database",
    imageSrc: "/images/categories/metabolic-health-category.jpg",
    imageAlt: "Peptide research visual for glucose and metabolic health",
    tint: "slate",
    icon: "flame",
  },
  {
    slug: "safety",
    title: "Safety & side effects",
    description: "Common, dose-related and long-term risk profiles.",
    href: "/peptides/how-to-inject-peptides-safely",
    imageSrc: "/images/categories/safety-category.jpg",
    imageAlt: "Peptide research visual for safety and side effects",
    tint: "rose",
    icon: "shield",
  },
  {
    slug: "comparisons",
    title: "Comparisons",
    description: "Peptide-vs-peptide breakdowns — efficacy, side effects, cost.",
    href: "/peptides",
    imageSrc: "/images/categories/comparisons-category.jpg",
    imageAlt: "Peptide research visual comparing two peptide options",
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
    kicker: "Weight loss",
    title: "Peptides for weight loss",
    description:
      "The broad map: GLP-1s, tirzepatide, retatrutide, amylin analogs, evidence status, safety and calculators.",
    href: "/peptides/peptides-for-weight-loss",
  },
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
    kicker: "Peptide basics",
    title: "What are peptides?",
    description:
      "A clear foundation for amino acids, peptide bonds, residues, sequences, molecular weight and peptide calculators.",
    href: "/peptides/what-are-peptides",
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
