/**
 * Structured peptide database.
 *
 * One entry per peptide. Values are sourced from primary clinical
 * literature (NEJM, FDA filings, manufacturer prescribing info, peer-
 * reviewed reviews). Dose/half-life ranges are reference values from
 * trial protocols and approved labels — they are NOT dosing recommendations.
 *
 * `articleSlug` points to our pillar article when one exists, otherwise null.
 * The database page links there for the deep dive.
 */

export type PeptideCategory =
  | "weight-loss"
  | "healing-recovery"
  | "growth-hormone"
  | "longevity"
  | "cognitive"
  | "metabolic-health";

export type PeptideStatus =
  | "approved"
  | "investigational"
  | "research-only";

export interface Peptide {
  slug: string;
  name: string;
  /** Short comma-separated alias list (research codes, brand names). */
  aliases?: string;
  category: PeptideCategory;
  /** e.g. "Triple agonist (GLP-1/GIP/glucagon)". */
  drugClass: string;
  /** Receptor / target labels, e.g. ["GLP-1R", "GIPR"]. */
  targets: string[];
  /** One-sentence mechanism summary. */
  mechanism: string;
  /** Reference dose range from trial protocols / approved labels. */
  typicalDose: string;
  routeOfAdministration: "Subcutaneous" | "Intramuscular" | "Oral" | "Intranasal";
  /** Plasma half-life (rounded), e.g. "~6 days". */
  halfLife: string;
  status: PeptideStatus;
  /** For approved drugs only — indications. */
  approvedFor?: string[];
  developer: string;
  /** Year first reported, approved, or entering major trials. */
  year: number;
  /** Pillar article slug under /peptides if one exists. */
  articleSlug: string | null;
  /** Matching Ascension product URL when the peptide is sold there. */
  productUrl?: string;
  /** Product image from the matching Ascension product page. */
  productImageUrl?: string;
}

/** Human-readable labels for category filters. */
export const CATEGORY_LABELS: Record<PeptideCategory, string> = {
  "weight-loss": "Weight loss",
  "healing-recovery": "Healing & recovery",
  "growth-hormone": "Growth hormone",
  longevity: "Longevity",
  cognitive: "Cognitive",
  "metabolic-health": "Metabolic health",
};

export const STATUS_LABELS: Record<PeptideStatus, string> = {
  approved: "Approved",
  investigational: "Investigational",
  "research-only": "Research only",
};

export const peptides: Peptide[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    aliases: "LY3437943",
    category: "weight-loss",
    drugClass: "Triple agonist (GLP-1 / GIP / glucagon)",
    targets: ["GLP-1R", "GIPR", "GCGR"],
    mechanism:
      "Activates GLP-1, GIP and glucagon receptors simultaneously to suppress appetite and raise energy expenditure.",
    typicalDose: "1–12 mg once weekly (trial)",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~6 days",
    status: "investigational",
    developer: "Eli Lilly",
    year: 2023,
    articleSlug: "retatrutide",
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    aliases: "LY3298176, Mounjaro, Zepbound",
    category: "weight-loss",
    drugClass: "Dual agonist (GLP-1 / GIP)",
    targets: ["GLP-1R", "GIPR"],
    mechanism:
      "Activates GLP-1 and GIP receptors to improve glycemic control and reduce appetite + body weight.",
    typicalDose: "2.5–15 mg once weekly",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~5 days",
    status: "approved",
    approvedFor: ["Type 2 diabetes", "Chronic weight management"],
    developer: "Eli Lilly",
    year: 2022,
    articleSlug: "mounjaro-tirzepatide-glp-1",
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    aliases: "Ozempic, Wegovy, Rybelsus",
    category: "weight-loss",
    drugClass: "GLP-1 receptor agonist",
    targets: ["GLP-1R"],
    mechanism:
      "Mimics the incretin GLP-1, slowing gastric emptying and reducing appetite while improving insulin secretion.",
    typicalDose: "0.25–2.4 mg once weekly (SC); 3–14 mg daily (oral)",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~7 days",
    status: "approved",
    approvedFor: ["Type 2 diabetes", "Chronic weight management", "Cardiovascular risk reduction"],
    developer: "Novo Nordisk",
    year: 2017,
    articleSlug: "semaglutide-as-glp-1",
  },
  {
    slug: "liraglutide",
    name: "Liraglutide",
    aliases: "Victoza, Saxenda",
    category: "weight-loss",
    drugClass: "GLP-1 receptor agonist",
    targets: ["GLP-1R"],
    mechanism:
      "Daily GLP-1 analog. Reduces appetite and improves glycemic control via the same incretin pathway as semaglutide.",
    typicalDose: "0.6–3.0 mg once daily",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~13 hours",
    status: "approved",
    approvedFor: ["Type 2 diabetes", "Chronic weight management"],
    developer: "Novo Nordisk",
    year: 2010,
    articleSlug: "saxenda-liraglutide-glp-1",
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    aliases: "AM833",
    category: "weight-loss",
    drugClass: "Amylin analog",
    targets: ["Amylin / CTR"],
    mechanism:
      "Long-acting amylin analog that slows gastric emptying and reinforces satiety; studied in combination with semaglutide (CagriSema).",
    typicalDose: "Trial doses up to 4.5 mg weekly",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~7 days",
    status: "investigational",
    developer: "Novo Nordisk",
    year: 2021,
    articleSlug: null,
  },
  {
    slug: "survodutide",
    name: "Survodutide",
    aliases: "BI 456906",
    category: "weight-loss",
    drugClass: "Dual agonist (GLP-1 / glucagon)",
    targets: ["GLP-1R", "GCGR"],
    mechanism:
      "Co-activates GLP-1 and glucagon receptors; in Phase 2 produced substantial weight reduction and improvement in MASH endpoints.",
    typicalDose: "0.6–4.8 mg once weekly (trial)",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~7 days",
    status: "investigational",
    developer: "Boehringer Ingelheim / Zealand Pharma",
    year: 2023,
    articleSlug: null,
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    aliases: "Body Protection Compound-157",
    category: "healing-recovery",
    drugClass: "Synthetic gastric peptide",
    targets: ["Multiple pathways (preclinical)"],
    mechanism:
      "Derived from human gastric juice. Animal models suggest effects on angiogenesis, tendon healing and GI repair; human clinical data is very limited.",
    typicalDose: "No human dosing established",
    routeOfAdministration: "Subcutaneous",
    halfLife: "Not well characterized in humans",
    status: "research-only",
    developer: "Sikiric et al. (academic origin)",
    year: 1991,
    articleSlug: "bpc-157",
    productUrl:
      "https://ascensionpeptides.com/product/bpc-157-10mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/03/Ascension-BPC-157-10mg-1024x1024.jpg",
  },
  {
    slug: "tb-500",
    name: "TB-500",
    aliases: "Thymosin Beta-4 fragment",
    category: "healing-recovery",
    drugClass: "Thymosin β4 derivative",
    targets: ["G-actin"],
    mechanism:
      "Synthetic fragment of thymosin β4 studied in animal models for cell migration, angiogenesis and tissue repair. No approved human indication.",
    typicalDose: "No human dosing established",
    routeOfAdministration: "Subcutaneous",
    halfLife: "Not well characterized",
    status: "research-only",
    developer: "RegeneRx (related TB4 program)",
    year: 1981,
    articleSlug: "bpc-157-vs-tb-500",
    productUrl:
      "https://ascensionpeptides.com/product/tb-500-5mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-TB-500-5mg-1024x1024.webp",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    aliases: "NNC 26-0161",
    category: "growth-hormone",
    drugClass: "Selective GH secretagogue (GHRP)",
    targets: ["GHSR / ghrelin receptor"],
    mechanism:
      "Selectively stimulates pituitary growth hormone release without significant cortisol or prolactin elevation seen with older GHRPs.",
    typicalDose: "100–300 mcg per injection (research)",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~2 hours",
    status: "research-only",
    developer: "Novo Nordisk (original)",
    year: 1998,
    articleSlug: "ipamorelin-vs-sermorelin",
    productUrl:
      "https://ascensionpeptides.com/product/ipamorelin-5mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-Ipamorelin-5mg-1024x1024.jpg",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    aliases: "DAC:GRF",
    category: "growth-hormone",
    drugClass: "GHRH analog (with or without DAC)",
    targets: ["GHRH receptor"],
    mechanism:
      "Long-acting growth-hormone-releasing hormone analog. The DAC variant binds serum albumin to extend half-life and sustain GH/IGF-1 elevation.",
    typicalDose: "1–2 mg weekly (DAC, research)",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~6–8 days (DAC)",
    status: "research-only",
    developer: "ConjuChem (original)",
    year: 2005,
    articleSlug: null,
    productUrl:
      "https://ascensionpeptides.com/product/cjc-1295-5mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-CJC-1295-5mg-1024x1024.jpg",
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    aliases: "Egrifta",
    category: "growth-hormone",
    drugClass: "GHRH analog",
    targets: ["GHRH receptor"],
    mechanism:
      "Stabilized GHRH analog. Approved for reduction of excess visceral abdominal fat in HIV-associated lipodystrophy.",
    typicalDose: "2 mg once daily",
    routeOfAdministration: "Subcutaneous",
    halfLife: "~26 minutes",
    status: "approved",
    approvedFor: ["HIV-associated lipodystrophy"],
    developer: "Theratechnologies",
    year: 2010,
    articleSlug: null,
    productUrl:
      "https://ascensionpeptides.com/product/tesamorelin-5mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-Tesamorelin-5mg-1024x1024.webp",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    aliases: "Copper tripeptide-1",
    category: "longevity",
    drugClass: "Copper peptide complex",
    targets: ["Copper transport / fibroblast signaling"],
    mechanism:
      "Naturally occurring tripeptide bound to copper. Studied for wound healing, skin remodeling and gene-expression effects related to tissue repair.",
    typicalDose: "Topical cosmetic ranges; no systemic dosing established",
    routeOfAdministration: "Subcutaneous",
    halfLife: "Hours",
    status: "research-only",
    developer: "Pickart (discovery)",
    year: 1973,
    articleSlug: "ghk-cu-for-hair-growth",
    productUrl:
      "https://ascensionpeptides.com/product/ghk-cu-100mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-GHK-CU-100mg-1024x1024.jpg",
  },
  {
    slug: "selank",
    name: "Selank",
    aliases: "TP-7",
    category: "cognitive",
    drugClass: "Synthetic tuftsin analog",
    targets: ["GABAergic / serotonergic systems"],
    mechanism:
      "Russian-developed analog of tuftsin marketed (in Russia) as an anxiolytic. Mechanism involves modulation of GABA and stress-response pathways.",
    typicalDose: "150–500 mcg per dose (intranasal, research)",
    routeOfAdministration: "Intranasal",
    halfLife: "Minutes",
    status: "research-only",
    developer: "Russian Academy of Sciences",
    year: 1990,
    articleSlug: null,
    productUrl:
      "https://ascensionpeptides.com/product/selank-10mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-Selank-10mg-1024x1024.webp",
  },
  {
    slug: "semax",
    name: "Semax",
    aliases: "ACTH(4-10) analog",
    category: "cognitive",
    drugClass: "Synthetic ACTH analog",
    targets: ["Melanocortin / BDNF pathways"],
    mechanism:
      "Heptapeptide derived from ACTH(4-10). Russian neuropeptide studied for nootropic and neuroprotective effects, partly via BDNF upregulation.",
    typicalDose: "200–600 mcg per dose (intranasal, research)",
    routeOfAdministration: "Intranasal",
    halfLife: "Minutes",
    status: "research-only",
    developer: "Russian Academy of Sciences",
    year: 1982,
    articleSlug: null,
    productUrl:
      "https://ascensionpeptides.com/product/semax-10mg/?ref=PEPTIDESDEFINED&campaign=nav_shop",
    productImageUrl:
      "https://ascensionpeptides.com/wp-content/uploads/2024/05/Ascension-Semax-10mg-1024x1024.webp",
  },
];
