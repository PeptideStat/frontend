export type EvidenceScore = 1 | 2 | 3 | 4 | 5;

export interface EvidenceReference {
  title: string;
  url: string;
  source: "PubMed" | "DailyMed" | "FDA" | "PMC";
}

export interface PeptideEvidence {
  score: EvidenceScore;
  label: string;
  summary: string;
  basis: string[];
  references: EvidenceReference[];
}

export const EVIDENCE_SCORE_EXPLAINER: Record<EvidenceScore, string> = {
  5: "Approved medication with substantial human clinical evidence.",
  4: "Investigational compound with human randomized or phase 2/3 evidence.",
  3: "Limited human pharmacology or small clinical evidence.",
  2: "Mostly animal, ex vivo, cell, or indirect evidence.",
  1: "Mechanistic rationale only; no meaningful outcome evidence.",
};

export const peptideEvidence: Record<string, PeptideEvidence> = {
  retatrutide: {
    score: 4,
    label: "Phase 2 human evidence",
    summary:
      "Retatrutide has randomized phase 2 human data in obesity and type 2 diabetes, but it remains investigational and is not an approved drug.",
    basis: ["Human phase 2 obesity trial", "Human type 2 diabetes phase 2 trial", "No approved indication yet"],
    references: [
      {
        title: "Triple-hormone-receptor agonist retatrutide for obesity",
        url: "https://pubmed.ncbi.nlm.nih.gov/37366315/",
        source: "PubMed",
      },
      {
        title: "Retatrutide for people with type 2 diabetes: phase 2 trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/37385280/",
        source: "PubMed",
      },
    ],
  },
  tirzepatide: {
    score: 5,
    label: "Approved with large human trials",
    summary:
      "Tirzepatide has large randomized obesity and diabetes trials plus FDA-regulated labeling for approved indications.",
    basis: ["Large human RCTs", "FDA-regulated labeling", "Approved for type 2 diabetes and chronic weight management"],
    references: [
      {
        title: "Tirzepatide once weekly for the treatment of obesity",
        url: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
        source: "PubMed",
      },
      {
        title: "Zepbound tirzepatide prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=487cd7e7-434c-4925-99fa-aa80b1cc776b",
        source: "DailyMed",
      },
    ],
  },
  semaglutide: {
    score: 5,
    label: "Approved with large human trials",
    summary:
      "Semaglutide has large randomized human trials and FDA-regulated labels across diabetes, obesity, and cardiovascular-risk contexts.",
    basis: ["Large human RCTs", "FDA-regulated labeling", "Approved GLP-1 receptor agonist"],
    references: [
      {
        title: "Once-weekly semaglutide in adults with overweight or obesity",
        url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
        source: "PubMed",
      },
      {
        title: "Wegovy semaglutide prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ee06186f-2aa3-4990-a760-757579d8f77b",
        source: "DailyMed",
      },
    ],
  },
  liraglutide: {
    score: 5,
    label: "Approved with human RCTs",
    summary:
      "Liraglutide has randomized weight-management trial data and FDA-regulated labeling for approved diabetes and obesity indications.",
    basis: ["Human RCTs", "FDA-regulated labeling", "Approved GLP-1 receptor agonist"],
    references: [
      {
        title: "A randomized controlled trial of liraglutide 3.0 mg in weight management",
        url: "https://pubmed.ncbi.nlm.nih.gov/26132939/",
        source: "PubMed",
      },
      {
        title: "Saxenda liraglutide prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7b11f6ac-4c27-4748-9e65-22d4cf3adfb4",
        source: "DailyMed",
      },
    ],
  },
  cagrilintide: {
    score: 4,
    label: "Phase 2 human evidence",
    summary:
      "Cagrilintide has randomized phase 2 human weight-management data and combination evidence with semaglutide, but it remains investigational.",
    basis: ["Human phase 2 obesity trial", "CagriSema clinical development", "No approved indication yet"],
    references: [
      {
        title: "Once-weekly cagrilintide for weight management: phase 2 trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/34798060/",
        source: "PubMed",
      },
      {
        title: "Cagrilintide and CagriSema systematic review and meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/39676787/",
        source: "PubMed",
      },
    ],
  },
  survodutide: {
    score: 4,
    label: "Human RCT evidence, investigational",
    summary:
      "Survodutide has randomized human weight-loss evidence and ongoing phase 3 development, but it is still investigational.",
    basis: ["Human randomized trial evidence", "Phase 3 program rationale", "No approved indication yet"],
    references: [
      {
        title: "Survodutide weight-loss randomized trials meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/39508238/",
        source: "PubMed",
      },
      {
        title: "SYNCHRONIZE cardiovascular outcomes trial rationale and design",
        url: "https://pubmed.ncbi.nlm.nih.gov/39453356/",
        source: "PubMed",
      },
    ],
  },
  "bpc-157": {
    score: 2,
    label: "Mostly preclinical evidence",
    summary:
      "BPC-157 has animal and mechanistic injury-model evidence, but human clinical efficacy and dosing are not established.",
    basis: ["Animal injury models", "Narrative/review literature", "FDA safety-risk concerns for compounding"],
    references: [
      {
        title: "BPC-157 for musculoskeletal healing narrative review",
        url: "https://pubmed.ncbi.nlm.nih.gov/40789979/",
        source: "PubMed",
      },
      {
        title: "BPC-157 and transected rat Achilles tendon healing",
        url: "https://pubmed.ncbi.nlm.nih.gov/14554208/",
        source: "PubMed",
      },
      {
        title: "FDA bulk drug substances that may present significant safety risks",
        url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        source: "FDA",
      },
    ],
  },
  "tb-500": {
    score: 2,
    label: "Indirect preclinical evidence",
    summary:
      "TB-500 claims mostly rely on thymosin beta-4 repair biology and preclinical data rather than direct human TB-500 outcome trials.",
    basis: ["Thymosin beta-4 repair biology", "Preclinical repair literature", "Weak direct human TB-500 evidence"],
    references: [
      {
        title: "Thymosin beta-4 and tissue repair biology",
        url: "https://pubmed.ncbi.nlm.nih.gov/16099219/",
        source: "PubMed",
      },
      {
        title: "Basic and clinical applications of thymosin beta-4",
        url: "https://pubmed.ncbi.nlm.nih.gov/26096726/",
        source: "PubMed",
      },
    ],
  },
  ipamorelin: {
    score: 3,
    label: "Limited human pharmacology",
    summary:
      "Ipamorelin has early pharmacology and human PK/PD evidence for GH release, but no approved indication or robust long-term outcome data.",
    basis: ["Human PK/PD study", "Early GH secretagogue pharmacology", "No approved indication"],
    references: [
      {
        title: "Ipamorelin, the first selective growth hormone secretagogue",
        url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
        source: "PubMed",
      },
      {
        title: "PK/PD modeling of ipamorelin in human volunteers",
        url: "https://pubmed.ncbi.nlm.nih.gov/10496658/",
        source: "PubMed",
      },
    ],
  },
  "cjc-1295": {
    score: 3,
    label: "Limited human pharmacology",
    summary:
      "CJC-1295 has human pharmacology data showing prolonged GH/IGF-1 stimulation, but it is not approved and lacks long-term outcome evidence.",
    basis: ["Human GH/IGF-1 pharmacology", "Long-acting GHRH analog data", "No approved indication"],
    references: [
      {
        title: "Prolonged GH and IGF-1 stimulation by CJC-1295",
        url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
        source: "PubMed",
      },
      {
        title: "Pulsatile GH secretion during continuous CJC-1295 stimulation",
        url: "https://pubmed.ncbi.nlm.nih.gov/17018654/",
        source: "PubMed",
      },
    ],
  },
  tesamorelin: {
    score: 5,
    label: "Approved with human trials",
    summary:
      "Tesamorelin is an approved GHRH analog with randomized human trial data for HIV-associated lipodystrophy.",
    basis: ["Human randomized trials", "FDA-regulated labeling", "Approved indication"],
    references: [
      {
        title: "Tesamorelin in HIV patients with abdominal fat accumulation",
        url: "https://pubmed.ncbi.nlm.nih.gov/20101189/",
        source: "PubMed",
      },
      {
        title: "Egrifta WR tesamorelin prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=839334d3-8c1d-4c26-9036-2ab524a6ea75",
        source: "DailyMed",
      },
    ],
  },
  "ghk-cu": {
    score: 2,
    label: "Ingredient-level hair evidence",
    summary:
      "GHK-Cu has skin-repair, delivery, and ex vivo hair-follicle evidence, but not strong finished-product human hair-regrowth trials.",
    basis: ["Ex vivo hair follicle data", "Skin regeneration reviews", "Topical delivery studies"],
    references: [
      {
        title: "Tripeptide-copper complex and human hair growth in vitro",
        url: "https://pubmed.ncbi.nlm.nih.gov/17703734/",
        source: "PubMed",
      },
      {
        title: "GHK as an anti-aging peptide",
        url: "https://pubmed.ncbi.nlm.nih.gov/35083444/",
        source: "PubMed",
      },
      {
        title: "GHK-Cu topical delivery and hair-loss application paper",
        url: "https://pubmed.ncbi.nlm.nih.gov/38026438/",
        source: "PubMed",
      },
    ],
  },
  selank: {
    score: 3,
    label: "Limited human and mechanistic evidence",
    summary:
      "Selank has small Russian clinical literature and mechanistic/anxiolytic studies, but lacks broad Western regulatory review or large independent trials.",
    basis: ["Small clinical comparison literature", "Mechanistic anxiolytic reviews", "Preclinical stress/anxiety models"],
    references: [
      {
        title: "Selank compared with phenazepam in anxiety disorders",
        url: "https://pubmed.ncbi.nlm.nih.gov/25176261/",
        source: "PubMed",
      },
      {
        title: "Molecular aspects of Selank biological activity",
        url: "https://pubmed.ncbi.nlm.nih.gov/30255741/",
        source: "PubMed",
      },
      {
        title: "Selank and diazepam in chronic mild stress conditions in rats",
        url: "https://pubmed.ncbi.nlm.nih.gov/28280289/",
        source: "PubMed",
      },
    ],
  },
  semax: {
    score: 2,
    label: "Mostly preclinical neuroprotection evidence",
    summary:
      "Semax has preclinical neuroprotection literature and regional clinical history, but limited independently validated human evidence for consumer cognitive use.",
    basis: ["Animal neuroprotection models", "Regional clinical history", "Limited independent human evidence"],
    references: [
      {
        title: "Semax in a rat cerebral ischemia-reperfusion model",
        url: "https://pubmed.ncbi.nlm.nih.gov/34201112/",
        source: "PubMed",
      },
    ],
  },
  "igf-1-lr3": {
    score: 2,
    label: "Preclinical / reagent only",
    summary:
      "IGF-1 LR3 is well characterized as a cell-culture supplement and in animal infusion studies, but there is essentially no controlled human therapeutic data.",
    basis: [
      "Reduced IGFBP affinity with retained IGF-1R binding",
      "Validated potency in serum-free cell culture",
      "Animal infusion studies showing disproportionate organ growth",
      "No published controlled human therapeutic trials",
    ],
    references: [
      {
        title:
          "Novel recombinant fusion protein analogues of IGF-I indicate the importance of IGFBP and receptor binding for potency",
        url: "https://pubmed.ncbi.nlm.nih.gov/1378742/",
        source: "PubMed",
      },
      {
        title:
          "IGF-I and especially IGF-I variants are anabolic in dexamethasone-treated rats",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1130894/",
        source: "PMC",
      },
      {
        title:
          "Long R3 IGF-I infusion stimulates organ growth but reduces plasma IGF-I in the guinea pig",
        url: "https://pubmed.ncbi.nlm.nih.gov/7561636/",
        source: "PubMed",
      },
    ],
  },
  "igf-1-des": {
    score: 2,
    label: "Preclinical only",
    summary:
      "IGF-1 DES has a clear mechanism but evidence is limited to cell-culture and rodent studies, with no human therapeutic approval, validated dose, or human safety data.",
    basis: [
      "Removal of N-terminal tripeptide reduces IGFBP affinity to ~1% of native IGF-1",
      "~10-fold greater mitogenic potency in binding-protein-containing cultures",
      "Rat studies show improved nitrogen retention and muscle protein synthesis",
      "No human trials, approval, or validated dosing",
    ],
    references: [
      {
        title:
          "IGF-binding proteins inhibit the activities of IGF-1 and IGF-2 but not des-(1-3)-IGF-1",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1138350/",
        source: "PMC",
      },
      {
        title:
          "Characterization of somatomedins from human fetal brain: a variant form of IGF-I",
        url: "https://pubmed.ncbi.nlm.nih.gov/3460078/",
        source: "PubMed",
      },
      {
        title:
          "IGF-I and des-(1-3)IGF-I enhance growth in rats after gut resection",
        url: "https://pubmed.ncbi.nlm.nih.gov/1996625/",
        source: "PubMed",
      },
    ],
  },
  mgf: {
    score: 2,
    label: "Preclinical and contested",
    summary:
      "MGF (IGF-1Ec) is a genuine mechano-responsive IGF-1 splice variant linked to muscle repair, but evidence is largely cell/animal work, some conflicting, with no approved human therapeutic.",
    basis: [
      "Load-induced IGF-1Ec splicing associated with satellite-cell activation",
      "Proposed distinct E-domain role in myoblast proliferation",
      "Independent E-peptide activity is contested in the literature",
      "No controlled human hypertrophy or recovery trials",
    ],
    references: [
      {
        title:
          "Different roles of the IGF-I Ec peptide (MGF) and mature IGF-I in myoblast proliferation and differentiation",
        url: "https://pubmed.ncbi.nlm.nih.gov/12095637/",
        source: "PubMed",
      },
      {
        title:
          "IGF gene splicing associated with muscle satellite (stem) cell activation following local tissue damage",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2342958/",
        source: "PMC",
      },
      {
        title:
          "MGF peptide, the COOH terminus of unprocessed IGF-1, has no apparent effect on myoblasts or muscle stem cells",
        url: "https://pubmed.ncbi.nlm.nih.gov/24253050/",
        source: "PubMed",
      },
    ],
  },
  "hgh-fragment-176-191": {
    score: 2,
    label: "Weak",
    summary:
      "Animal and isolated-tissue studies show the hGH 176-191 domain stimulates lipolysis without GH's IGF-1 effects, but there is no convincing controlled human fat-loss evidence; its optimized analog AOD-9604 failed a human obesity trial.",
    basis: [
      "Synthetic hGH 177-191 reduced adipose mass and lipogenesis in obese mice",
      "Stimulated hormone-sensitive lipase without binding the GH receptor",
      "No controlled human fat-loss trial for the unmodified fragment",
      "Optimized analog AOD-9604 failed human obesity development",
    ],
    references: [
      {
        title:
          "Reduction of body weight gain and adipose tissue mass in obese mice: response to synthetic hGH 177-191 peptide",
        url: "https://pubmed.ncbi.nlm.nih.gov/7987248/",
        source: "PubMed",
      },
      {
        title:
          "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone",
        url: "https://pubmed.ncbi.nlm.nih.gov/11146367/",
        source: "PubMed",
      },
    ],
  },
  "ace-031": {
    score: 3,
    label: "Moderate human evidence; discontinued for safety",
    summary:
      "ACE-031 reached phase 1 and phase 2 human trials with clear muscle effects, but development was halted over vascular adverse events and it was never approved.",
    basis: [
      "Phase 1 showed significant increases in lean mass and thigh muscle volume",
      "Randomized phase 2 in Duchenne muscular dystrophy (stopped early)",
      "Halted after vascular adverse events (epistaxis, telangiectasias)",
      "No approved indication or validated human dose",
    ],
    references: [
      {
        title:
          "A single ascending-dose study of muscle regulator ACE-031 in healthy volunteers",
        url: "https://pubmed.ncbi.nlm.nih.gov/23169607/",
        source: "PubMed",
      },
      {
        title:
          "Myostatin inhibitor ACE-031 treatment of ambulatory boys with Duchenne muscular dystrophy",
        url: "https://pubmed.ncbi.nlm.nih.gov/27462804/",
        source: "PubMed",
      },
    ],
  },
  "thymosin-beta-4": {
    score: 3,
    label: "Mechanistically strong, clinically narrow",
    summary:
      "Thymosin beta-4 is a genuine endogenous actin-sequestering peptide with angiogenic and anti-fibrotic biology. Human evidence is strongest for topical/ocular use; systemic injectable use for recovery is unproven.",
    basis: [
      "Phase 3 ophthalmic program (RGN-259) in dry eye and neurotrophic keratopathy",
      "Preclinical dermal wound and cardiac repair data",
      "Phase 1 IV tolerability to 1260 mg with no dose-limiting toxicity",
      "No FDA-approved drug; consumer products often supply the TB-500 fragment",
    ],
    references: [
      {
        title:
          "Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues",
        url: "https://pubmed.ncbi.nlm.nih.gov/16099219/",
        source: "PubMed",
      },
      {
        title:
          "0.1% RGN-259 (Thymosin beta4) Ophthalmic Solution in Neurotrophic Keratopathy: Phase III Trial",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9820614/",
        source: "PMC",
      },
      {
        title:
          "A randomized, placebo-controlled study of intravenous thymosin beta4 in healthy volunteers",
        url: "https://pubmed.ncbi.nlm.nih.gov/20536472/",
        source: "PubMed",
      },
    ],
  },
  vip: {
    score: 2,
    label: "Weak / mixed",
    summary:
      "VIP biology and VPAC receptor pharmacology are well characterized, but synthetic aviptadil failed its flagship COVID-19 respiratory trials and has only small or non-US-approved support elsewhere; popular intranasal use is unproven.",
    basis: [
      "Large randomized TESICO trial of IV aviptadil for COVID-19 was negative",
      "Only a small open-label sarcoidosis study showed a pulmonary signal",
      "Aviptadil-phentolamine (Invicorp) approved for ED in some European countries, not US",
      "Intranasal VIP for CIRS/mold illness has no published RCT",
    ],
    references: [
      {
        title:
          "Intravenous aviptadil and remdesivir for COVID-19-associated hypoxaemic respiratory failure (TESICO)",
        url: "https://pubmed.ncbi.nlm.nih.gov/37348524/",
        source: "PubMed",
      },
      {
        title:
          "Inhaled Vasoactive Intestinal Peptide Exerts Immunoregulatory Effects in Sarcoidosis",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2967653/",
        source: "PMC",
      },
    ],
  },
  larazotide: {
    score: 2,
    label: "Investigational — failed pivotal trial",
    summary:
      "Larazotide showed positive phase 2 symptom data at the low 0.5 mg dose, but the pivotal phase 3 CeDLara trial was discontinued for futility in 2022 and it is not approved.",
    basis: [
      "Phase 2b trial in 342 adults met its primary endpoint only at the 0.5 mg dose",
      "Gluten-challenge trials showed reduced gluten-induced symptoms at low doses",
      "Phase 3 CeDLara halted for futility (2022)",
      "Tolerability comparable to placebo; no regulatory approval",
    ],
    references: [
      {
        title:
          "Larazotide acetate for persistent symptoms of celiac disease despite a gluten-free diet: a randomized controlled trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/25683116/",
        source: "PubMed",
      },
      {
        title:
          "A randomized, double-blind study of larazotide acetate to prevent activation of celiac disease during gluten challenge",
        url: "https://pubmed.ncbi.nlm.nih.gov/22825365/",
        source: "PubMed",
      },
    ],
  },
};

export function getPeptideEvidence(slug: string): PeptideEvidence | null {
  return peptideEvidence[slug] ?? null;
}
