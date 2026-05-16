import type { PeptideCategory } from "@/data/peptides";

export interface PeptideCategoryHubFaq {
  question: string;
  answer: string;
}

export interface PeptideCategoryHubNote {
  bestFor: string;
  researchStatus: string;
}

export interface PeptideCategoryHub {
  slug: string;
  category: PeptideCategory;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  compareIntro: string;
  decisionPoints: string[];
  peptideNotes: Record<string, PeptideCategoryHubNote>;
  faqs: PeptideCategoryHubFaq[];
}

export const peptideCategoryHubs: PeptideCategoryHub[] = [
  {
    slug: "weight-loss-peptides",
    category: "weight-loss",
    eyebrow: "Weight management",
    title: "Weight Loss Peptides",
    metaTitle: "Weight Loss Peptides: Evidence, Status & Comparisons",
    description:
      "Compare weight loss peptides including GLP-1, GIP, amylin and triple-agonist compounds by approval status, mechanism, half-life and evidence score.",
    intro:
      "Weight loss peptides are not one bucket. Approved GLP-1 medicines, dual agonists, amylin analogs and investigational triple agonists sit at very different evidence levels.",
    compareIntro:
      "Use this page to compare the main weight loss peptides by mechanism, route, regulatory status and evidence quality before going deeper into the database entry or guide.",
    decisionPoints: [
      "Prioritize approval status first: approved medications have regulated labels and larger safety datasets.",
      "Treat investigational compounds as clinical-trial research, even when the early weight-loss numbers are strong.",
      "Compare targets, not just pounds lost: GLP-1, GIP, glucagon and amylin pathways can produce different tolerability profiles.",
    ],
    peptideNotes: {
      retatrutide: {
        bestFor: "Research comparison against GLP-1 and dual agonist drugs",
        researchStatus: "Phase 2 human evidence; not approved",
      },
      tirzepatide: {
        bestFor: "Approved dual-incretin weight management reference",
        researchStatus: "Approved medication with large clinical trials",
      },
      semaglutide: {
        bestFor: "Approved GLP-1 benchmark for weight loss and metabolic outcomes",
        researchStatus: "Approved medication with large clinical trials",
      },
      liraglutide: {
        bestFor: "Daily GLP-1 comparison and older approved option",
        researchStatus: "Approved medication with human RCTs",
      },
      cagrilintide: {
        bestFor: "Amylin-pathway research and CagriSema context",
        researchStatus: "Phase 2 human evidence; not approved",
      },
      survodutide: {
        bestFor: "GLP-1/glucagon research and MASH-adjacent context",
        researchStatus: "Human RCT evidence; not approved",
      },
    },
    faqs: [
      {
        question: "What are the best-studied weight loss peptides?",
        answer:
          "Semaglutide, liraglutide and tirzepatide have the strongest human evidence because they are approved medications with large randomized trials and regulated labels.",
      },
      {
        question: "Are retatrutide and cagrilintide approved for weight loss?",
        answer:
          "No. Retatrutide and cagrilintide have human trial evidence, but they remain investigational and should be treated as research compounds until regulators approve a label.",
      },
      {
        question: "How should weight loss peptides be compared?",
        answer:
          "Compare approval status, trial evidence, mechanism, adverse-effect profile, dosing schedule and contraindications. Weight-loss percentage alone is not enough context.",
      },
    ],
  },
  {
    slug: "healing-peptides",
    category: "healing-recovery",
    eyebrow: "Repair and recovery",
    title: "Healing Peptides",
    metaTitle: "Healing Peptides: BPC-157, TB-500 & Evidence Review",
    description:
      "Compare healing peptides such as BPC-157 and TB-500 by evidence quality, mechanism, research status and practical limitations.",
    intro:
      "Healing peptides are popular in recovery circles, but most claims sit far ahead of the human clinical evidence. The key SEO and research distinction is preclinical promise versus proven outcomes.",
    compareIntro:
      "This comparison separates mechanism and animal repair models from established human efficacy. Use it as a conservative map before reading the individual database pages.",
    decisionPoints: [
      "Do not treat animal tendon, gut or wound-healing models as proof of human outcomes.",
      "Look for direct human trials on the exact compound, not only related thymosin or repair biology.",
      "Give extra weight to safety and sourcing because research-only peptides do not have approved consumer dosing.",
    ],
    peptideNotes: {
      "bpc-157": {
        bestFor: "Preclinical tendon, gut and tissue-repair research context",
        researchStatus: "Mostly animal and mechanistic evidence",
      },
      "tb-500": {
        bestFor: "Thymosin beta-4 repair-biology comparison",
        researchStatus: "Indirect preclinical evidence; weak direct human evidence",
      },
    },
    faqs: [
      {
        question: "Which healing peptides are most commonly discussed?",
        answer:
          "BPC-157 and TB-500 are the two most common healing peptides in consumer discussions, but both have limited direct human outcome evidence.",
      },
      {
        question: "Is BPC-157 proven for injury recovery in humans?",
        answer:
          "No. BPC-157 has preclinical and animal injury-model evidence, but robust human clinical efficacy and dosing are not established.",
      },
      {
        question: "Is TB-500 the same as thymosin beta-4?",
        answer:
          "TB-500 is marketed as a thymosin beta-4 fragment or related peptide. Many claims rely on thymosin beta-4 biology rather than direct TB-500 human trials.",
      },
    ],
  },
  {
    slug: "growth-hormone-peptides",
    category: "growth-hormone",
    eyebrow: "GH axis",
    title: "Growth Hormone Peptides",
    metaTitle: "Growth Hormone Peptides: Ipamorelin, CJC-1295 & Tesamorelin",
    description:
      "Compare growth hormone peptides including ipamorelin, CJC-1295 and tesamorelin by GH-axis mechanism, approval status, half-life and evidence score.",
    intro:
      "Growth hormone peptides work through the GH axis, but approval status varies sharply. Tesamorelin has a regulated indication; ipamorelin and CJC-1295 are research-only in this context.",
    compareIntro:
      "The useful comparison is not just whether a peptide raises GH or IGF-1. Half-life, receptor pathway, regulatory status and human outcome data matter more.",
    decisionPoints: [
      "Separate approved GHRH analogs from research-only secretagogues.",
      "Compare the mechanism: GHRH analogs and ghrelin-receptor secretagogues are not interchangeable.",
      "Watch the difference between short pharmacology studies and long-term outcome trials.",
    ],
    peptideNotes: {
      ipamorelin: {
        bestFor: "Selective GH secretagogue pharmacology comparison",
        researchStatus: "Limited human pharmacology; no approved indication",
      },
      "cjc-1295": {
        bestFor: "Long-acting GHRH analog and IGF-1 stimulation context",
        researchStatus: "Limited human pharmacology; no approved indication",
      },
      tesamorelin: {
        bestFor: "Approved GHRH analog benchmark",
        researchStatus: "Approved medication with human trials",
      },
    },
    faqs: [
      {
        question: "What are growth hormone peptides?",
        answer:
          "Growth hormone peptides are compounds that influence the GH axis, usually through GHRH signaling or ghrelin-receptor mediated GH release.",
      },
      {
        question: "Which growth hormone peptide has the strongest evidence?",
        answer:
          "Tesamorelin has the strongest evidence in this database because it has an approved indication and human randomized trial data.",
      },
      {
        question: "Are ipamorelin and CJC-1295 approved medications?",
        answer:
          "No. Ipamorelin and CJC-1295 are research-only in this database and do not have approved consumer indications.",
      },
    ],
  },
  {
    slug: "cognitive-peptides",
    category: "cognitive",
    eyebrow: "Brain and focus",
    title: "Cognitive Peptides",
    metaTitle: "Cognitive Peptides: Selank, Semax & Evidence Quality",
    description:
      "Compare cognitive peptides such as Selank and Semax by mechanism, route, regional clinical history, evidence score and research limitations.",
    intro:
      "Cognitive peptides are often marketed for focus, mood or neuroprotection, but the evidence base is uneven and often regional. The strongest claims need careful source checking.",
    compareIntro:
      "Use this category hub to compare Selank and Semax by route, evidence score, mechanism and the gap between regional use and broadly validated human data.",
    decisionPoints: [
      "Distinguish regional clinical history from large independent randomized trials.",
      "Check whether the outcome is anxiety, neuroprotection, cognition or a broader marketing claim.",
      "Be careful with nootropic claims when the evidence is mainly mechanistic or preclinical.",
    ],
    peptideNotes: {
      selank: {
        bestFor: "Anxiolytic and stress-response research context",
        researchStatus: "Limited human and mechanistic evidence",
      },
      semax: {
        bestFor: "Neuroprotection and ACTH-fragment research context",
        researchStatus: "Mostly preclinical evidence for broad consumer claims",
      },
    },
    faqs: [
      {
        question: "What are cognitive peptides?",
        answer:
          "Cognitive peptides are neuropeptides or peptide analogs discussed for mood, focus, anxiety or neuroprotection. Evidence quality varies by compound and claim.",
      },
      {
        question: "Is Selank better studied than Semax?",
        answer:
          "In this database, Selank has a slightly higher evidence score because it has small clinical comparison literature plus mechanistic work, while Semax claims rely more heavily on preclinical neuroprotection evidence.",
      },
      {
        question: "Are cognitive peptides approved in the United States?",
        answer:
          "The cognitive peptides listed here are treated as research-only for US consumer purposes and do not have approved US indications.",
      },
    ],
  },
  {
    slug: "longevity-peptides",
    category: "longevity",
    eyebrow: "Skin, hair and healthspan",
    title: "Longevity Peptides",
    metaTitle: "Longevity Peptides: GHK-Cu, Evidence & Research Status",
    description:
      "Compare longevity peptides by evidence quality, mechanism and practical research limits, starting with GHK-Cu and copper peptide data.",
    intro:
      "Longevity peptides are a broad marketing category. For now, this database keeps the category narrow and evidence-first, starting with GHK-Cu and its skin, hair and tissue-remodeling literature.",
    compareIntro:
      "Use this page to separate cosmetic ingredient evidence, ex vivo hair-follicle findings and broader anti-aging claims.",
    decisionPoints: [
      "Separate topical cosmetic evidence from systemic anti-aging claims.",
      "Look for finished-product human outcomes, not only ingredient-level mechanisms.",
      "Treat broad longevity language as a hypothesis unless the endpoint was actually studied.",
    ],
    peptideNotes: {
      "ghk-cu": {
        bestFor: "Copper peptide skin and hair research context",
        researchStatus: "Ingredient-level and ex vivo evidence; limited finished-product human trials",
      },
    },
    faqs: [
      {
        question: "What is the main longevity peptide in this database?",
        answer:
          "GHK-Cu is the main longevity-category peptide currently covered, mostly for skin remodeling, hair-related research and copper peptide biology.",
      },
      {
        question: "Does GHK-Cu prove anti-aging effects in humans?",
        answer:
          "No. GHK-Cu has interesting ingredient-level and mechanistic evidence, but broad human anti-aging claims need stronger finished-product clinical data.",
      },
      {
        question: "Why is the longevity peptide category narrow?",
        answer:
          "The category is intentionally narrow to avoid mixing marketing claims with evidence. More compounds should be added only when there is enough research context to compare them fairly.",
      },
    ],
  },
];

export function getPeptideCategoryHub(slug: string): PeptideCategoryHub | null {
  return peptideCategoryHubs.find((hub) => hub.slug === slug) ?? null;
}

export function getPeptideCategoryHubByCategory(
  category: PeptideCategory,
): PeptideCategoryHub | null {
  return peptideCategoryHubs.find((hub) => hub.category === category) ?? null;
}
