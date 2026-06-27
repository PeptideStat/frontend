export type EvidenceScore = 1 | 2 | 3 | 4 | 5;

export interface EvidenceReference {
  title: string;
  url: string;
  /** Source label, e.g. "PubMed", "DailyMed", "FDA", "PMC", or a journal name. */
  source: string;
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

  "ghrp-2": {
    score: 3,
    label: "Validated GH-deficiency diagnostic; no established therapeutic use",
    summary:
      "GHRP-2 has solid primary-source human evidence as a single-bolus growth hormone secretagogue used to diagnose GH deficiency, including a regulatory approval in Japan. Evidence for any chronic therapeutic, body-composition or anti-aging use is absent, and off-target ACTH, cortisol, prolactin and appetite effects are documented.",
    basis: ["Approved in Japan as a single-dose pralmorelin diagnostic for GH deficiency; validated GH cut-offs in adults (~15 ug/L) and children","Randomized human studies show GHRP-2 raises food intake like ghrelin in lean and obese subjects","Documented direct ACTH-releasing activity and cortisol/prolactin elevation in human pituitary testing","No FDA approval and no validated therapeutic indication; development for GHD/short-stature treatment did not reach market","Long-term, repeated-dose human safety data are lacking because approved use is a one-time provocative test"],
    references: [
      {
        title: "General pharmacology of KP-102 (GHRP-2), a potent growth hormone-releasing peptide",
        url: "https://pubmed.ncbi.nlm.nih.gov/15646371/",
        source: "PubMed",
      },
      {
        title: "Clinical Usefulness of the Growth Hormone-Releasing Peptide-2 Test for Hypothalamic-Pituitary Disorder",
        url: "https://academic.oup.com/jes/article/6/8/bvac088/6602336",
        source: "Journal of the Endocrine Society",
      },
      {
        title: "Concordant and discordant ACTH responses induced by GHRP-2, CRH and insulin-induced hypoglycemia: direct ACTH releasing activity of GHRP-2",
        url: "https://pubmed.ncbi.nlm.nih.gov/20431231/",
        source: "PubMed",
      },
      {
        title: "Growth hormone releasing peptide-2 (GHRP-2), like ghrelin, increases food intake in healthy men",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2824650/",
        source: "PMC / J Clin Endocrinol Metab",
      },
      {
        title: "The growth hormone-releasing activity of a synthetic hexapeptide in normal men and short statured children after oral administration",
        url: "https://pubmed.ncbi.nlm.nih.gov/1730807/",
        source: "PubMed",
      },
    ],
  },
  "humanin": {
    score: 2,
    label: "Preclinical and observational only; no human therapeutic trials",
    summary:
      "Humanin has substantial mechanistic and preclinical evidence for cytoprotection, anti-apoptosis, neuroprotection and metabolic effects in cell and animal models, plus observational human biomarker associations linking endogenous levels to aging and longevity. However, there are no published randomized controlled human trials of humanin or its HNG analog as a therapy, and it has no regulatory approval, so therapeutic human evidence is essentially absent.",
    basis: ["Original 2001 PNAS discovery showing rescue of neuronal death from familial Alzheimer's mutations and amyloid-beta","Mechanistic studies identifying FPR2/FPRL1 and CNTFR/WSX-1/gp130 receptor signaling and IGFBP-3/BAX interactions","Structural (Nat Commun 2022) and review evidence (J Mol Endocrinol 2013; Front Cell Dev Biol 2022)","Rodent and primate data plus human observational associations (centenarian offspring, cognitive aging) indicating circulating humanin declines with age and correlates with longevity","Absence of any registered/published human RCT and no FDA or other regulatory approval"],
    references: [
      {
        title: "A rescue factor abolishing neuronal cell death by a wide spectrum of familial Alzheimer's disease genes and Abeta (PNAS, 2001)",
        url: "https://pubmed.ncbi.nlm.nih.gov/11371646/",
        source: "PubMed",
      },
      {
        title: "Structural basis of FPR2 in recognition of Abeta42 and neuroprotection by humanin (Nat Commun, 2022)",
        url: "https://www.nature.com/articles/s41467-022-29361-x",
        source: "Nature Communications",
      },
      {
        title: "The emerging role of the mitochondrial-derived peptide humanin in stress resistance (J Mol Endocrinol, 2013)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3705736/",
        source: "PMC",
      },
      {
        title: "The mitochondrial derived peptide humanin is a regulator of lifespan and healthspan (Aging, 2020)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7343442/",
        source: "PMC",
      },
    ],
  },
  "dulaglutide": {
    score: 5,
    label: "Strong",
    summary:
      "Dulaglutide has robust, peer-reviewed primary evidence: the AWARD phase 3 program established dose-related glycemic efficacy, the REWIND randomized outcomes trial (9,901 participants, ~5.4 year median follow-up) demonstrated a reduction in major adverse cardiovascular events (HR 0.88), and an FDA label backs both diabetes and cardiovascular indications.",
    basis: ["REWIND double-blind randomized placebo-controlled cardiovascular outcomes trial in The Lancet (2019), n=9,901","AWARD-11 randomized controlled trial supporting expanded 3.0 mg and 4.5 mg doses in Diabetes Care (2021)","FDA Trulicity prescribing information and DailyMed label with approved indications and pharmacokinetics"],
    references: [
      {
        title: "Dulaglutide and cardiovascular outcomes in type 2 diabetes (REWIND): a double-blind, randomised placebo-controlled trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/31189511/",
        source: "The Lancet / PubMed",
      },
      {
        title: "Efficacy and Safety of Dulaglutide 3.0 mg and 4.5 mg Versus Dulaglutide 1.5 mg (AWARD-11)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7896253/",
        source: "Diabetes Care / PMC",
      },
      {
        title: "Trulicity (dulaglutide) injection prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=463050bd-2b1c-40f5-b3c3-0a04bb433309",
        source: "DailyMed",
      },
    ],
  },
  "exenatide": {
    score: 5,
    label: "Approved drug, strong clinical evidence",
    summary:
      "Exenatide is the first FDA-approved GLP-1 receptor agonist, supported by phase 3 glycemic trials in type 2 diabetes and the large EXSCEL cardiovascular outcomes trial, which showed cardiovascular safety (noninferiority) but not statistically significant superiority. It is approved for glycemic control, not as a weight-loss drug, though weight reduction is a commonly observed secondary effect.",
    basis: ["FDA-approved prescribing information for Byetta (immediate-release, approved 2005) and Bydureon BCise (extended-release, weekly)","EXSCEL randomized controlled trial of 14,752 patients (NEJM 2017): MACE 11.4% exenatide vs 12.2% placebo, noninferior, p=0.06 for superiority","Original exendin-4 isolation and characterization from Heloderma suspectum venom (Eng et al., J Biol Chem 1992)","Approved indication is type 2 diabetes glycemic control; weight loss is not an approved indication"],
    references: [
      {
        title: "Byetta (exenatide) FDA prescribing information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/021773s9s11s18s22s25lbl.pdf",
        source: "FDA",
      },
      {
        title: "Bydureon BCise (exenatide extended-release) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2d18cfc4-e0de-4814-a712-c1b7c504bff5",
        source: "DailyMed",
      },
      {
        title: "Effects of Once-Weekly Exenatide on Cardiovascular Outcomes in Type 2 Diabetes (EXSCEL)",
        url: "https://pubmed.ncbi.nlm.nih.gov/28910237/",
        source: "PubMed / NEJM",
      },
      {
        title: "Isolation and characterization of exendin-4 from Heloderma suspectum venom",
        url: "https://pubmed.ncbi.nlm.nih.gov/1313797/",
        source: "PubMed / J Biol Chem",
      },
    ],
  },
  "lixisenatide": {
    score: 4,
    label: "Approved drug with neutral cardiovascular outcomes; modest glycemic, not weight-loss, indication",
    summary:
      "Lixisenatide is FDA- and EMA-approved for type 2 diabetes based on the GetGoal phase 3 program, with the ELIXA cardiovascular outcomes trial establishing cardiovascular safety (non-inferiority) but not benefit. It was not approved as a weight-loss drug, and the standalone US product was discontinued in 2023.",
    basis: ["FDA Adlyxin prescribing information (initial U.S. approval July 27, 2016)","ELIXA randomized trial of 6,068 patients (NEJM 2015;373:2247-2257): primary CV composite 13.4% lixisenatide vs 13.2% placebo, non-inferior, not superior, heart-failure neutral","GetGoal phase 3 program: modest HbA1c reduction with predominant postprandial glucose effect","Pharmacology: exendin-4-derived 44-amino-acid peptide, ~3 hour half-life, once-daily prandial dosing"],
    references: [
      {
        title: "Adlyxin (lixisenatide) FDA prescribing information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/208471orig1s000lbl.pdf",
        source: "FDA",
      },
      {
        title: "Lixisenatide in Patients with Type 2 Diabetes and Acute Coronary Syndrome (ELIXA), N Engl J Med 2015",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1509225",
        source: "New England Journal of Medicine",
      },
      {
        title: "Evaluation of Cardiovascular Outcomes... AVE0010 (Lixisenatide) (ELIXA)",
        url: "https://clinicaltrials.gov/study/NCT01147250",
        source: "ClinicalTrials.gov",
      },
      {
        title: "The Clinical Development Program of Lixisenatide",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4269639/",
        source: "PMC / Diabetes Therapy",
      },
    ],
  },
  "albiglutide": {
    score: 4,
    label: "Approved (later withdrawn); strong outcomes evidence",
    summary:
      "Albiglutide was FDA- and EMA-approved for type 2 diabetes glycemic control based on the eight-trial Phase 3 HARMONY program and demonstrated a 22% reduction in major adverse cardiovascular events in the 9,463-patient HARMONY Outcomes trial, but it was voluntarily withdrawn from the worldwide market in 2018 for commercial reasons.",
    basis: ["FDA prescribing information (Tanzeum) documenting approval, dosing, and boxed warning","HARMONY Outcomes randomized placebo-controlled cardiovascular trial published in The Lancet (2018), NCT02465515","Phase 3 HARMONY program of eight trials supporting approval","Manufacturer and FDA records of 2014 approval and 2017-2018 market withdrawal"],
    references: [
      {
        title: "Tanzeum (albiglutide) prescribing information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/125431s019lbl.pdf",
        source: "FDA",
      },
      {
        title: "Albiglutide and cardiovascular outcomes (Harmony Outcomes), The Lancet 2018",
        url: "https://pubmed.ncbi.nlm.nih.gov/30291013/",
        source: "PubMed",
      },
      {
        title: "Harmony Outcomes trial record, NCT02465515",
        url: "https://clinicaltrials.gov/study/NCT02465515",
        source: "ClinicalTrials.gov",
      },
      {
        title: "Albiglutide, LiverTox",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK548054/",
        source: "NCBI Bookshelf",
      },
    ],
  },
  "efpeglenatide": {
    score: 4,
    label: "Strong trial evidence but investigational",
    summary:
      "Efpeglenatide has genuine phase 3 outcomes evidence: the AMPLITUDE-O trial (NEJM 2021, n=4076) showed weekly subcutaneous dosing reduced major adverse cardiovascular events (7.0% vs 9.2% placebo) and a composite kidney outcome (13.0% vs 18.4%) in high-risk type 2 diabetes, with supporting glycemic and weight data from the broader AMPLITUDE program. However, development was halted by the original sponsor and the agent has no marketing approval.",
    basis: ["Randomized, double-blind, placebo-controlled cardiovascular outcomes trial (AMPLITUDE-O, 4076 patients, 28 countries)","Multiple phase 2/3 randomized controlled trials in the AMPLITUDE program (M, D, L, S) and a phase 2 study in adults without diabetes","Published pharmacokinetic and dose-finding studies","Limitation: single-sponsor program halted for business reasons; no regulatory approval and no real-world post-marketing data"],
    references: [
      {
        title: "Cardiovascular and Renal Outcomes with Efpeglenatide in Type 2 Diabetes",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2108269",
        source: "New England Journal of Medicine",
      },
      {
        title: "Effect of Efpeglenatide on Cardiovascular Outcomes (AMPLITUDE-O), NCT03496298",
        url: "https://clinicaltrials.gov/study/NCT03496298",
        source: "ClinicalTrials.gov",
      },
      {
        title: "Efficacy and Safety of Once-Weekly Efpeglenatide Monotherapy Versus Placebo in Type 2 Diabetes: The AMPLITUDE-M Randomized Controlled Trial",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9274225/",
        source: "Diabetes Care / PMC",
      },
    ],
  },
  "amylin": {
    score: 3,
    label: "Mixed: strong physiology, analog-only human evidence",
    summary:
      "Amylin's physiology (satiation, slowed gastric emptying, glucagon suppression) and RAMP-based receptor pharmacology are well established in primary literature, but human therapeutic evidence comes from engineered analogs such as pramlintide, not native amylin, which aggregates into cytotoxic islet amyloid and has a ~13-minute half-life.",
    basis: ["Physiological Reviews and PMC mechanistic reviews document satiation, gastric emptying, and glucagon effects","IUPHAR classification and RAMP studies map amylin receptors as calcitonin receptor + RAMP1/2/3","FDA Symlin label establishes human evidence for the analog pramlintide, not native amylin","Nature and PMC sources document amylin aggregation and beta-cell cytotoxicity"],
    references: [
      {
        title: "Islet Amyloid Polypeptide, Islet Amyloid, and Diabetes Mellitus",
        url: "https://journals.physiology.org/doi/full/10.1152/physrev.00042.2009",
        source: "Physiological Reviews",
      },
      {
        title: "International Union of Pharmacology XXXII: calcitonin, amylin, CGRP, adrenomedullin receptors",
        url: "https://pubmed.ncbi.nlm.nih.gov/12037140/",
        source: "PubMed",
      },
      {
        title: "SYMLIN (pramlintide acetate) Prescribing Information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/021332s023lbl.pdf",
        source: "FDA",
      },
      {
        title: "Pancreatic islet cell toxicity of amylin associated with type-2 diabetes mellitus",
        url: "https://www.nature.com/articles/368756a0",
        source: "Nature",
      },
    ],
  },
  "glucagon": {
    score: 5,
    label: "Strong",
    summary:
      "Glucagon is an FDA-approved rescue therapy for severe hypoglycemia with decades of label-backed clinical and pharmacokinetic evidence across injectable and intranasal forms.",
    basis: ["FDA-approved prescribing information for GlucaGen, Gvoke and Baqsimi documents indication, dosing and safety","Pharmacokinetic studies establish short half-life and rapid glucose response across IN/IM/IV routes","Registration trials for Baqsimi and Gvoke demonstrated reliable reversal of insulin-induced hypoglycemia"],
    references: [
      {
        title: "Baqsimi (glucagon) nasal powder full prescribing information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210134s000lbl.pdf",
        source: "FDA",
      },
      {
        title: "Gvoke (glucagon) injection prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=92385737-dbad-98c5-e053-2995a90a2805",
        source: "DailyMed",
      },
      {
        title: "Pharmacokinetics of intranasal, intramuscular and intravenous glucagon in healthy subjects and diabetic patients",
        url: "https://pubmed.ncbi.nlm.nih.gov/8157042/",
        source: "PubMed",
      },
    ],
  },
  "thymalin": {
    score: 2,
    label: "Limited / low-quality human evidence dominated by a single research lineage",
    summary:
      "Thymalin has a large but narrow evidence base: plausible laboratory immune-modulation data and some controlled human studies, but the major aging and mortality claims come from observational, mostly Russian-language work by the compound's own developers and lack independent large blinded Western replication.",
    basis: ["1997 Int J Immunopharmacol review (Morozov & Khavinson): thymic peptides isolated from calf thymus activate T-cell differentiation and alter lymphocyte cytokine output","2020 Bull Exp Biol Med study: Thymalin shifted human hematopoietic stem cell markers (lower CD44/CD117, higher CD28) toward mature T cells in culture","2003 Neuro Endocrinol Lett / 2002 Adv Gerontol: 266 elderly, open observational program, reported ~2.0-2.1-fold (up to 4.1-fold in a subgroup) mortality reduction, not blinded or randomized","2021 Adv Gerontol randomized single-blind COVID-19 trial (n=36 vs 44): faster lymphocyte recovery, larger IL-6 drop, lower in-hospital mortality (19.4% vs 40.9%); single-center, small, authors flag limits","No independent large multi-center blinded Western RCTs; not FDA-approved; extract of undefined exact composition"],
    references: [
      {
        title: "Natural and synthetic thymic peptides as therapeutics for immune dysfunction",
        url: "https://pubmed.ncbi.nlm.nih.gov/9637345/",
        source: "PubMed / Int J Immunopharmacol 1997",
      },
      {
        title: "Peptides of pineal gland and thymus prolong human life",
        url: "https://pubmed.ncbi.nlm.nih.gov/14523363/",
        source: "PubMed / Neuro Endocrinol Lett 2003",
      },
      {
        title: "Peptide Drug Thymalin Regulates Immune Status in Severe COVID-19 Older Patients",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8654498/",
        source: "PMC / Advances in Gerontology 2021",
      },
      {
        title: "Thymalin: Activation of Differentiation of Human Hematopoietic Stem Cells",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7686446/",
        source: "PMC / Bull Exp Biol Med 2020",
      },
    ],
  },
  "thymogen": {
    score: 2,
    label: "Limited / preliminary",
    summary:
      "Thymogen has a coherent proposed immunomodulatory mechanism plus rodent and Russian clinical support, but lacks an independent, controlled human RCT base; its closest Western-studied analog (SCV-07) had largely halted or unconvincing trials.",
    basis: ["Mechanistic studies (Morozov & Khavinson 1997) describing T-cell differentiation, peptide-MHC recognition, IL-2/IFN modulation and neutrophil activation","Single rodent lifespan/carcinogenesis study (Anisimov et al., Biogerontology 2000) using subcutaneous 5 mcg/rat dosing","Decades of Russian clinical use for secondary immunodeficiency, predating modern RCT reporting standards","Trials of the related but chemically distinct analog SCV-07/golotimod (HCV, TB, HSV-2, oral mucositis), including a phase 2b mucositis program (NCT01247246) discontinued for lack of efficacy","No robust independent placebo-controlled human RCT data and no reliable published human pharmacokinetics for Thymogen itself"],
    references: [
      {
        title: "Natural and synthetic thymic peptides as therapeutics for immune dysfunction (Morozov & Khavinson, 1997)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9637345/",
        source: "PubMed",
      },
      {
        title: "Immunomodulatory synthetic dipeptide L-Glu-L-Trp slows down aging and inhibits spontaneous carcinogenesis in rats (Anisimov et al., 2000)",
        url: "https://pubmed.ncbi.nlm.nih.gov/11707921/",
        source: "PubMed",
      },
      {
        title: "An immunomodulating dipeptide, SCV-07, is a potential therapeutic for recurrent genital HSV-2 (2008)",
        url: "https://pubmed.ncbi.nlm.nih.gov/18619817/",
        source: "PubMed",
      },
      {
        title: "SCV-07 oral mucositis phase 2b study (NCT01247246)",
        url: "https://clinicaltrials.gov/study/NCT01247246",
        source: "ClinicalTrials.gov",
      },
    ],
  },
  "vesugen": {
    score: 2,
    label: "Preclinical with very limited human evidence",
    summary:
      "Vesugen (KED) has reproducible in vitro and rodent gene-expression signals from the Khavinson research network, but human data are minimal, uncontrolled, single-network, and unreplicated, with no regulatory approval and no robust pharmacokinetic dataset.",
    basis: ["In vitro studies report KED alters senescence (p16, p21) and neurogenesis (NES, GAP43) gene expression and restores neuronal spine counts in Alzheimer's-disease cell models","A 2021 Khavinson-group systematic review aggregates cardiovascular, neuroprotective and geroprotective claims, all mechanistic rather than outcome-based","Human evidence is limited to a reported improvement in memory and attention in elderly subjects, without transparent randomized controlled trial design","No FDA/EMA review, no independent Western trial, and no published human pharmacokinetic profile"],
    references: [
      {
        title: "Peptide Regulation of Gene Expression: A Systematic Review (Molecules, 2021)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8619776/",
        source: "PMC / Molecules",
      },
      {
        title: "Peptide KED: Molecular-Genetic Aspects of Neurogenesis Regulation in Alzheimer's Disease (Bull Exp Biol Med, 2021)",
        url: "https://pubmed.ncbi.nlm.nih.gov/34173097/",
        source: "PubMed",
      },
      {
        title: "Tripeptides Restore the Number of Neuronal Spines under Conditions of In Vitro Modeled Alzheimer's Disease (Bull Exp Biol Med, 2017)",
        url: "https://pubmed.ncbi.nlm.nih.gov/28853087/",
        source: "PubMed",
      },
      {
        title: "Expression of Signal Molecules in Culture of Human Endothelial Cells in Atherosclerosis and Restenosis (Bull Exp Biol Med, 2017)",
        url: "https://pubmed.ncbi.nlm.nih.gov/28853081/",
        source: "PubMed",
      },
    ],
  },
  "vilon": {
    score: 2,
    label: "Preclinical / early",
    summary:
      "Vilon has coherent peer-reviewed mechanistic and rodent data (reduced spontaneous tumor incidence, modest mean life-span extension in mice, chromatin reactivation in elderly-donor lymphocytes, mild anti-inflammatory macrophage signaling), but no large controlled human trials, no approved indication, and limited independent replication.",
    basis: ["Mouse studies report inhibition of spontaneous tumors and increased mean life span (Dokl Biol Sci 2000; Mech Ageing Dev 2001)","Cell-culture work shows chromatin deheterochromatinization in elderly-donor lymphocytes (Biogerontology 2004)","Modest, receptor-independent immune signaling effects in THP-1 macrophages (Int J Mol Sci 2022)","Proposed DNA-binding/epigenetic mechanism is model-based (molecular docking), not clinically confirmed","Evidence dominated by a single research program with little independent replication and essentially no robust human RCTs"],
    references: [
      {
        title: "A synthetic dipeptide vilon (L-Lys-L-Glu) inhibits growth of spontaneous tumors and increases life span of mice. Dokl Biol Sci. 2000",
        url: "https://pubmed.ncbi.nlm.nih.gov/10944717/",
        source: "PubMed",
      },
      {
        title: "Effect of synthetic thymic and pineal peptides on biomarkers of ageing, survival and spontaneous tumour incidence in female CBA mice. Mech Ageing Dev. 2001",
        url: "https://pubmed.ncbi.nlm.nih.gov/11163623/",
        source: "PubMed",
      },
      {
        title: "Bioregulator Vilon-induced reactivation of chromatin in cultured lymphocytes from old people. Biogerontology. 2004",
        url: "https://pubmed.ncbi.nlm.nih.gov/15105581/",
        source: "PubMed",
      },
      {
        title: "Peptides Regulating Proliferative Activity and Inflammatory Pathways in the Monocyte/Macrophage THP-1 Cell Line. Int J Mol Sci. 2022",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8999041/",
        source: "PMC",
      },
    ],
  },
  "pinealon": {
    score: 2,
    label: "Preliminary / Limited",
    summary:
      "Pinealon (EDR) has credible peer-reviewed in vitro and rodent neuroprotection and antioxidant signals, but human evidence is limited to small uncontrolled reports from a single research lineage, and there are no large randomized controlled trials or regulatory approval.",
    basis: ["In vitro studies showing dose-dependent ROS suppression and reduced cell death in neuronal and other cell models (Khavinson 2011)","Rodent models: protection of offspring from prenatal hyperhomocysteinemia (2012) and prevention of dendritic spine loss in 5xFAD Alzheimer's mice (2021)","Proposed gene-regulation mechanism supported by a systematic review of short-peptide DNA/chromatin interactions","Human evidence limited to a small uncontrolled clinical report (72 TBI/cerebrasthenia patients); no large RCTs and no FDA approval"],
    references: [
      {
        title: "Pinealon increases cell viability by suppression of free radical levels and activating proliferative processes (Rejuvenation Research, 2011)",
        url: "https://pubmed.ncbi.nlm.nih.gov/21978084/",
        source: "PubMed",
      },
      {
        title: "Neuroprotective Effects of Tripeptides-Epigenetic Regulators in Mouse Model of Alzheimer's Disease (Pharmaceuticals, 2021)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8227791/",
        source: "PMC",
      },
      {
        title: "EDR Peptide: Possible Mechanism of Gene Expression and Protein Synthesis Regulation in Alzheimer's Disease (Pharmaceuticals, 2021)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7795577/",
        source: "PMC",
      },
      {
        title: "Peptide Regulation of Gene Expression: A Systematic Review (Molecules, 2021)",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8619776/",
        source: "PMC",
      },
    ],
  },
  "cortexin": {
    score: 2,
    label: "low certainty (mostly Russian-language evidence, high risk of bias)",
    summary:
      "Cortexin has extensive domestic Russian clinical use for stroke, encephalopathy and cognition plus a coherent multi-target neuroprotective mechanism, but independent evidence is weak. A peer-reviewed systematic review found essentially one eligible Cortexin cognitive trial (~80 patients) rated high risk of bias, and Cochrane assessment of the brain-peptide class urged caution without clear functional benefit in stroke.",
    basis: ["Systematic review and meta-analysis of animal-derived nootropics found one eligible high-risk-of-bias Cortexin trial; data precluded meta-analysis (PMC9616232)","Cochrane review of Cerebrolysin/Cerebrolysin-like agents (incl. Cortexin) in acute ischaemic stroke found no clear benefit and possible increase in serious non-fatal adverse events (PMC10565895)","Mechanistic in vitro/proteomic work supports receptor modulation, caspase-8 inhibition and protein binding partners but is preclinical (PubMed 30499504, 26356623)","Animal models show neuroprotective and behavioral signals, including dose-dependent hyperactivity/arousal (PLOS ONE; Open Neuropsychopharmacology Journal)"],
    references: [
      {
        title: "Molecular mechanisms of brain peptide-containing drugs: cortexin",
        url: "https://pubmed.ncbi.nlm.nih.gov/30499504/",
        source: "PubMed",
      },
      {
        title: "The efficacy and safety of animal-derived nootropics in cognitive disorders: Systematic review and meta-analysis",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9616232/",
        source: "PubMed Central",
      },
      {
        title: "Cerebrolysin for acute ischaemic stroke (Cochrane Review)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10565895/",
        source: "PubMed Central / Cochrane",
      },
      {
        title: "Neuroprotective action of Cortexin, Cerebrolysin and Actovegin in acute or chronic brain ischemia in rats",
        url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0254493",
        source: "PLOS ONE",
      },
    ],
  },
  "n-acetyl-semax": {
    score: 2,
    label: "Weak (analog-specific evidence essentially absent)",
    summary:
      "The acetylated/amidated analog has no dedicated peer-reviewed human or animal studies; supporting science comes from parent Semax, which has solid rodent neurotrophin/gene-expression data but only small, often non-randomized, largely Russian-language human trials and no approval outside Russia and neighboring states.",
    basis: ["Preclinical rat studies document specific brain binding (KD ~2.4 nM) and BDNF/neurotrophin upregulation for parent Semax","Genome-wide and protein-expression studies show modulation of ischemia-related inflammatory and neurotransmitter genes in rat MCAO models","Human data limited to small non-randomized Russian stroke studies and resting-state fMRI studies in healthy volunteers; no Phase 3 trials outside post-Soviet states","No published pharmacokinetics, toxicology, or human safety data for the N-acetylated/amidated analog specifically; popular half-life/bioavailability figures are not traceable to controlled studies"],
    references: [
      {
        title: "Semax binds specifically and increases BDNF protein in rat basal forebrain",
        url: "https://onlinelibrary.wiley.com/doi/10.1111/j.1471-4159.2006.03658.x",
        source: "Journal of Neurochemistry (2006)",
      },
      {
        title: "Semax and Pro-Gly-Pro Activate Transcription of Neurotrophins and Their Receptor Genes after Cerebral Ischemia",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11498467/",
        source: "Cellular and Molecular Neurobiology / PMC",
      },
      {
        title: "Brain Protein Expression Profile Confirms the Protective Effect of ACTH(4-7)PGP (Semax) in Rat Cerebral Ischemia-Reperfusion",
        url: "https://pubmed.ncbi.nlm.nih.gov/34201112/",
        source: "International Journal of Molecular Sciences (2021)",
      },
      {
        title: "The efficacy of semax in the treatment of patients at different stages of ischemic stroke",
        url: "https://pubmed.ncbi.nlm.nih.gov/29798983/",
        source: "Zhurnal Nevrologii i Psikhiatrii (2018)",
      },
    ],
  },
  "n-acetyl-selank": {
    score: 2,
    label: "Preclinical / limited clinical for parent compound; research-only analog",
    summary:
      "There is no published human or animal study of the N-Acetyl Selank analog itself. The evidence cited for it actually describes the parent peptide Selank: a small Russian clinical trial in generalized anxiety disorder/neurasthenia plus rodent and cell-culture mechanistic work on GABAergic gene expression, enkephalinase inhibition, and BDNF. None of it has been independently replicated in Western trials, and applying it to the acetylated analog is untested extrapolation.",
    basis: ["No direct human or animal data on the N-Acetyl Selank analog","Parent Selank clinical evidence limited to small Russian trials (e.g., 62-patient GAD/neurasthenia comparison vs medazepam)","Mechanistic data are mostly rodent and cell-culture studies from a small set of affiliated groups","Not FDA-approved; parent Selank registered only in Russia"],
    references: [
      {
        title: "Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders and neurasthenia (PMID 18454096)",
        url: "https://pubmed.ncbi.nlm.nih.gov/18454096/",
        source: "PubMed",
      },
      {
        title: "Selank Administration Affects the Expression of Some Genes Involved in GABAergic Neurotransmission",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4757669/",
        source: "PMC",
      },
      {
        title: "The inhibitory effect of Selank on enkephalin-degrading enzymes as a possible mechanism of its anxiolytic activity (PMID 11550013)",
        url: "https://pubmed.ncbi.nlm.nih.gov/11550013/",
        source: "PubMed",
      },
      {
        title: "Intranasal administration of the peptide Selank regulates BDNF expression in the rat hippocampus in vivo (Doklady Biological Sciences, 2008)",
        url: "https://link.springer.com/article/10.1134/S0012496608040066",
        source: "Springer",
      },
    ],
  },
  "p21": {
    score: 2,
    label: "Preclinical only (animal evidence, no human trials)",
    summary:
      "P21 (P021) has a coherent and internally consistent preclinical record in rodent Alzheimer's and aging models, including increased BDNF, hippocampal neurogenesis, reduced tau pathology and improved cognition. However, the evidence is almost entirely from one research lineage, there are no completed human clinical trials, no approvals and no validated human dose, so confidence for human use is low.",
    basis: ["2010 FEBS Letters (Li et al.) introducing adamantane-modified CNTF peptides showing improved learning, neurogenesis and synaptic plasticity in mice","2014 Neurobiology of Disease (Kazim et al.) chronic oral P021 reducing tau pathology and improving cognition in 3xTg-AD mice","2017 Alzheimer's Research & Therapy (Baazaoui & Iqbal) rescuing dendritic/synaptic deficits in transgenic AD mice","Absence of any registered or completed human clinical trial and no regulatory approval"],
    references: [
      {
        title: "Neurotrophic peptides incorporating adamantane improve learning and memory, promote neurogenesis and synaptic plasticity in mice (FEBS Lett. 2010)",
        url: "https://pubmed.ncbi.nlm.nih.gov/20600002/",
        source: "PubMed",
      },
      {
        title: "Disease modifying effect of chronic oral treatment with a neurotrophic peptidergic compound in a triple transgenic mouse model of Alzheimer's disease (Neurobiol Dis. 2014)",
        url: "https://pubmed.ncbi.nlm.nih.gov/25046994/",
        source: "PubMed",
      },
      {
        title: "Prevention of dendritic and synaptic deficits and cognitive impairment with a neurotrophic compound (Alzheimers Res Ther. 2017)",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5488423/",
        source: "PMC",
      },
    ],
  },
  "davunetide": {
    score: 2,
    label: "Weak / negative pivotal evidence",
    summary:
      "Davunetide has well-characterized preclinical microtubule and tau biology, but its largest human trial failed and no study has established clinical efficacy in any indication.",
    basis: ["313-patient randomized, double-blind, placebo-controlled phase 2/3 PSP trial (Boxer et al., Lancet Neurology 2014) showed no benefit on co-primary endpoints (PSPRS p=0.72)","Phase 2 schizophrenia trial: cognition (MCCB) not significant vs placebo; only a functional-capacity (UPSA) signal","Mechanistic 3R vs 4R tau isoform preference may explain PSP failure","No FDA approval; investigational repositioning as CP201 for ADNP syndrome lacks a completed pivotal efficacy trial"],
    references: [
      {
        title: "Davunetide in patients with progressive supranuclear palsy: a randomised, double-blind, placebo-controlled phase 2/3 trial",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4129545/",
        source: "Lancet Neurology / PMC",
      },
      {
        title: "Effect of the neuroprotective peptide davunetide (AL-108) on cognition and functional capacity in schizophrenia",
        url: "https://pubmed.ncbi.nlm.nih.gov/22169248/",
        source: "PubMed",
      },
      {
        title: "NAP (davunetide) preferential interaction with dynamic 3-repeat tau explains differential protection in selected tauopathies",
        url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0213666",
        source: "PLOS ONE",
      },
      {
        title: "The ADNP syndrome and CP201 (NAP): potential and hope",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7732499/",
        source: "Frontiers in Neurology / PMC",
      },
    ],
  },
  "triptorelin": {
    score: 5,
    label: "Approved, label-backed efficacy",
    summary:
      "Triptorelin is an FDA- and EU-approved long-acting GnRH agonist with prescribing-label evidence for advanced prostate cancer and central precocious puberty, plus randomized trial support in endometriosis. Efficacy in reversible sex-steroid suppression is well established; the main caveats are the early flare phase and class safety risks.",
    basis: ["US FDA prescribing information for Trelstar (advanced prostate cancer) and Triptodur (central precocious puberty), both via DailyMed","Placebo-controlled randomized trial showing triptorelin reduces endometriosis pain symptoms (PubMed 9548161)","Pediatric CPP studies and depot pharmacology/pharmacokinetic literature (PMC3356708, PMC4428800, PMC3154964)"],
    references: [
      {
        title: "Trelstar (triptorelin pamoate) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b1b84d62-a369-a4b7-5c41-dd1f553a18f3",
        source: "DailyMed",
      },
      {
        title: "Triptodur (triptorelin) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f41380e7-b830-432d-a5f5-a872932f107e",
        source: "DailyMed",
      },
      {
        title: "Effects of triptorelin versus placebo on the symptoms of endometriosis",
        url: "https://pubmed.ncbi.nlm.nih.gov/9548161/",
        source: "PubMed",
      },
      {
        title: "Central precocious puberty: treatment with triptorelin 11.25 mg",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3356708/",
        source: "PMC",
      },
    ],
  },
  "goserelin": {
    score: 5,
    label: "Approved, strong primary evidence",
    summary:
      "Goserelin (Zoladex) is FDA-approved with decades of label-backed and randomized-trial evidence for hormone suppression in prostate cancer, breast cancer and endometriosis.",
    basis: ["FDA/DailyMed Zoladex prescribing information defining indications, dosing and safety","ZIPP randomized trial (~2,710 patients) showing event-free and overall survival benefit in premenopausal breast cancer","Twenty-year randomized trial of adjuvant goserelin plus tamoxifen published in Journal of Clinical Oncology","Prospective randomized endometriosis trial of goserelin plus anastrozole"],
    references: [
      {
        title: "Zoladex (goserelin implant) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=294b168b-6e5f-4db9-bf70-d599271458b3",
        source: "DailyMed",
      },
      {
        title: "Adjuvant goserelin in pre-menopausal patients with early breast cancer: results from the ZIPP study",
        url: "https://pubmed.ncbi.nlm.nih.gov/16545560/",
        source: "PubMed",
      },
      {
        title: "Twenty-Year Benefit From Adjuvant Goserelin and Tamoxifen in Premenopausal Patients With Breast Cancer",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9746735/",
        source: "PMC / Journal of Clinical Oncology",
      },
    ],
  },
  "buserelin": {
    score: 4,
    label: "Approved GnRH agonist with label and trial support",
    summary:
      "Buserelin is an approved GnRH agonist (Suprefact) in Canada and parts of Europe for hormone-dependent advanced prostate cancer and endometriosis, with a substantial randomized/comparative trial record for IVF down-regulation; it is not FDA-approved in the US.",
    basis: ["Health Canada Suprefact product monograph documents approved prostate cancer and endometriosis indications, dosing and safety","Multiple PubMed-indexed randomized and comparative trials evaluate buserelin for IVF down-regulation and GnRH-agonist ovulation triggering","Pharmacovigilance and pharmacology literature characterize class mechanism, ~72-80 min half-life and adverse-event profile"],
    references: [
      {
        title: "Suprefact (buserelin acetate) Product Monograph",
        url: "https://pdf.hres.ca/dpd_pm/00031538.PDF",
        source: "Health Canada",
      },
      {
        title: "Buserelin Drug Monograph",
        url: "https://www.bccancer.bc.ca/drug-database-site/Drug%20Index/Buserelin_monograph_1March2012.pdf",
        source: "BC Cancer",
      },
      {
        title: "GnRH agonist (buserelin) or hCG for ovulation induction in GnRH antagonist IVF/ICSI cycles: a prospective randomized study",
        url: "https://pubmed.ncbi.nlm.nih.gov/16246862/",
        source: "PubMed",
      },
      {
        title: "The use of the GnRH analogue buserelin for IVF -- does it improve fertility?",
        url: "https://pubmed.ncbi.nlm.nih.gov/1908314/",
        source: "PubMed",
      },
      {
        title: "Adverse event profile differences among long-acting GnRH analogs: a real-world pharmacovigilance study",
        url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0327842",
        source: "PLOS One",
      },
    ],
  },
  "nafarelin": {
    score: 4,
    label: "Approved with controlled-trial evidence",
    summary:
      "Nafarelin (Synarel) is FDA-approved with randomized controlled-trial evidence for endometriosis (comparable to danazol for symptom control) and effective LH suppression in central precocious puberty, though benefits are duration-limited and constrained by hypoestrogenic bone-density loss.",
    basis: ["FDA-approved label (DailyMed) with two indications and defined dosing","NEET large danazol-controlled randomized trial in endometriosis","Multiple double-blind nafarelin-versus-danazol endometriosis trials","Manufacturer clinical pharmacology documenting LH/FSH suppression and prepubertal LH response in CPP","Label-documented ~8.7% trabecular bone-density loss at 6 months limiting duration"],
    references: [
      {
        title: "Synarel (nafarelin acetate) nasal spray prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d0aa57cb-d2f4-46d7-af43-7c8b06aa81a6",
        source: "DailyMed",
      },
      {
        title: "Nafarelin for endometriosis: a large-scale, danazol-controlled trial (NEET)",
        url: "https://pubmed.ncbi.nlm.nih.gov/1531464/",
        source: "PubMed",
      },
      {
        title: "Synarel (nafarelin acetate) Clinical Pharmacology",
        url: "https://www.pfizermedical.com/synarel/clinical-pharmacology",
        source: "Pfizer Medical",
      },
      {
        title: "Absorption and metabolism of nafarelin, a potent agonist of gonadotropin-releasing hormone",
        url: "https://pubmed.ncbi.nlm.nih.gov/2970910/",
        source: "PubMed",
      },
    ],
  },
  "histrelin": {
    score: 4,
    label: "Approved with phase 3 label-backed evidence",
    summary:
      "Histrelin is FDA approved as a 12-month subcutaneous implant, with phase 3 trial and prescribing-information support for central precocious puberty (Supprelin LA) and, historically, advanced prostate cancer (Vantas, discontinued in 2021).",
    basis: ["Phase 3 multicenter trial in children with CPP showed rapid, sustained LH and sex-steroid suppression over 12 months (Eugster, JCEM 2007)","Phase 3 prostate cancer trial showed ~100% castrate testosterone by week 4 maintained through 52 weeks with PSA decline (Schlegel, J Urol 2006)","FDA/DailyMed labels for Supprelin LA and Vantas establish mechanism, dosing and safety","Pharmacokinetic data (terminal half-life ~3.9 h, clearance ~179 mL/min) from FDA labels"],
    references: [
      {
        title: "Supprelin LA (histrelin acetate) implant prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d8fb000e-3cc9-4803-b71d-2cc597661977",
        source: "DailyMed",
      },
      {
        title: "Vantas (histrelin implant) prescribing information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/021732s013lbl.pdf",
        source: "FDA",
      },
      {
        title: "Efficacy and safety of histrelin subdermal implant in children with central precocious puberty: a multicenter trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/17327379/",
        source: "PubMed",
      },
      {
        title: "Efficacy and safety of histrelin subdermal implant in patients with advanced prostate cancer",
        url: "https://pubmed.ncbi.nlm.nih.gov/16515997/",
        source: "PubMed",
      },
    ],
  },
  "cetrorelix": {
    score: 4,
    label: "Strong",
    summary:
      "Cetrorelix is FDA-approved (2000) with a clear labeled indication, well-characterized pharmacology, and supporting IVF literature; evidence is strong but narrow to controlled ovarian stimulation.",
    basis: ["FDA-approved Cetrotide prescribing information defines indication, dosing, pharmacokinetics and safety","Peer-reviewed reviews and pharmacodynamic studies characterize GnRH antagonist mechanism and LH/FSH suppression","Multiple IVF clinical studies evaluate antagonist protocols using cetrorelix"],
    references: [
      {
        title: "Cetrotide (cetrorelix acetate) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aca7768e-28a7-4027-b1d8-e66247665f79",
        source: "DailyMed",
      },
      {
        title: "Cetrotide (cetrorelix acetate for injection) FDA label",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2008/021197s010lbl.pdf",
        source: "FDA",
      },
      {
        title: "The LHRH antagonist cetrorelix: a review",
        url: "https://pubmed.ncbi.nlm.nih.gov/10972520/",
        source: "PubMed",
      },
      {
        title: "GnRH antagonist, cetrorelix, for pituitary suppression in modern assisted reproductive technology",
        url: "https://www.ncbi.nlm.nih.gov/pubmed/19761413",
        source: "PubMed",
      },
    ],
  },
  "ganirelix": {
    score: 4,
    label: "Approved, strong label and trial evidence within a narrow indication",
    summary:
      "Ganirelix is FDA-approved (1999) with prescribing-information-backed pharmacology and phase III trial evidence supporting GnRH-antagonist protocols for preventing premature LH surges in controlled ovarian stimulation, though evidence is confined to this single IVF-adjunct indication.",
    basis: ["FDA/DailyMed and Organon prescribing information document mechanism, pharmacokinetics (91% bioavailability, ~12.8 h half-life), 0.25 mg SC daily dosing and safety","Phase III Fertility and Sterility trial compared ganirelix vs leuprolide acetate in controlled ovarian hyperstimulation","Oberyé et al. phase I PK/PD studies established dose-proportional, rapidly reversible gonadotropin suppression","ClinicalTrials.gov registered comparative trials (e.g., NCT00298025 vs cetrorelix)"],
    references: [
      {
        title: "Ganirelix Acetate Injection prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fb74ff-993a-49fe-8943-e029372b863e",
        source: "DailyMed",
      },
      {
        title: "Antagon (ganirelix acetate) Injection original approval label, 1999",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/1999/21057lbl.pdf",
        source: "U.S. FDA",
      },
      {
        title: "Pharmacokinetic and pharmacodynamic characteristics of ganirelix, Part II",
        url: "https://pubmed.ncbi.nlm.nih.gov/10593372/",
        source: "PubMed / Fertility and Sterility",
      },
      {
        title: "Efficacy and safety of ganirelix acetate versus leuprolide acetate in controlled ovarian hyperstimulation",
        url: "https://www.fertstert.org/article/S0015-0282(00)01638-1/fulltext",
        source: "Fertility and Sterility",
      },
    ],
  },
  "degarelix": {
    score: 5,
    label: "Approved, strong clinical evidence",
    summary:
      "Degarelix is FDA-approved (2008) for advanced prostate cancer, supported by the randomized phase 3 CS21 trial (610 patients) showing castrate testosterone suppression (<50 ng/dL) in over 96% of patients from day 28-364 with no initial testosterone surge, plus a detailed FDA label.",
    basis: ["FDA prescribing information / DailyMed label for FIRMAGON","Phase 3 randomized trial CS21 (Klotz et al., BJU Int 2008, n=610)","Phase 3 leuprolide-to-degarelix crossover extension (J Urol 2011)","Documented pharmacokinetics and post-marketing safety data"],
    references: [
      {
        title: "FIRMAGON (degarelix) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab11dd8a-0fd9-4013-89ab-e114557c7e4b",
        source: "DailyMed",
      },
      {
        title: "The efficacy and safety of degarelix: a 12-month phase III study in prostate cancer (CS21)",
        url: "https://pubmed.ncbi.nlm.nih.gov/19035858/",
        source: "PubMed / BJU International",
      },
      {
        title: "FIRMAGON Highlights of Prescribing Information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/022201s016lbl.pdf",
        source: "FDA",
      },
    ],
  },
  "argireline": {
    score: 2,
    label: "Limited, mixed cosmetic-grade evidence",
    summary:
      "Argireline has a plausible, well-described in-vitro SNARE-inhibition mechanism and small cosmetic clinical studies showing modest reductions in fine periorbital wrinkles, but the strongest efficacy figures are manufacturer-linked, comparator and independent trials are smaller and mixed, and a major skin-permeation barrier limits how much peptide reaches living tissue. It is a cosmetic ingredient, not an approved drug, and not equivalent to injected botulinum toxin.",
    basis: ["Blanes-Mira 2002 in-vitro work showed SNARE-mediated inhibition of neurotransmitter release and a 10% emulsion reduced wrinkle depth up to ~30% over 30 days","Wang 2013 randomized placebo-controlled study reported ~49% subjective anti-wrinkle efficacy vs 0% placebo for periorbital lines over 4 weeks, but was small and industry-linked","Aruan 2023 comparator trial found only small crow's-feet changes with acetyl hexapeptide-3, performing no better than palmitoyl pentapeptide-4","Permeation studies show ~889 Da, LogP ~-6.3, zwitterionic peptide with <0.2% stratum corneum penetration and ~0.01% reaching epidermis","Lungu 2013 blepharospasm pilot did not meet its primary endpoint"],
    references: [
      {
        title: "A synthetic hexapeptide (Argireline) with antiwrinkle activity",
        url: "https://onlinelibrary.wiley.com/doi/abs/10.1046/j.1467-2494.2002.00153.x",
        source: "International Journal of Cosmetic Science (Blanes-Mira 2002)",
      },
      {
        title: "The anti-wrinkle efficacy of argireline in Chinese subjects: a randomized, placebo-controlled study",
        url: "https://pubmed.ncbi.nlm.nih.gov/23607739/",
        source: "American Journal of Clinical Dermatology (Wang 2013)",
      },
      {
        title: "Double-blind, randomized trial of acetylhexapeptide-3 cream and palmitoyl pentapeptide-4 cream for crow's feet",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10005804/",
        source: "Journal of Clinical and Aesthetic Dermatology (Aruan 2023)",
      },
      {
        title: "Enhanced skin permeation of anti-wrinkle peptides via molecular modification",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5785486/",
        source: "Scientific Reports (Kraeling 2018)",
      },
      {
        title: "Pilot study of topical acetyl hexapeptide-8 in blepharospasm patients receiving botulinum toxin therapy",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4747634/",
        source: "European Journal of Neurology (Lungu 2013)",
      },
      {
        title: "Acetyl hexapeptide-8 in cosmeceuticals: a review of skin permeability and efficacy",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12193160/",
        source: "International Journal of Molecular Sciences (Lum 2025)",
      },
    ],
  },
  "matrixyl": {
    score: 2,
    label: "Limited cosmetic-grade human evidence",
    summary:
      "Palmitoyl pentapeptide-4 (pal-KTTKS) has a clear in vitro mechanism and small, mostly industry-associated, placebo-controlled topical studies showing modest, statistically significant reductions in fine lines and wrinkles with good tolerability. Evidence is cosmetic-grade, not drug-level: small samples, appearance-based endpoints, and very low concentrations.",
    basis: ["1993 J Biol Chem study identifying KTTKS as the minimal active fragment of type I procollagen that stimulates fibroblast matrix production","2005 Int J Cosmet Sci 12-week double-blind split-face study (n=93) showing significant wrinkle/fine-line improvement vs placebo at 3 ppm","JAAD report and a 2023 randomized crow's-feet trial supporting modest appearance benefits","No large drug-style clinical trials; effects described as significant but visually subtle"],
    references: [
      {
        title: "A pentapeptide from type I procollagen promotes extracellular matrix production (J Biol Chem, 1993)",
        url: "https://pubmed.ncbi.nlm.nih.gov/8486721/",
        source: "PubMed",
      },
      {
        title: "Topical palmitoyl pentapeptide provides improvement in photoaged human facial skin (Int J Cosmet Sci, 2005)",
        url: "https://pubmed.ncbi.nlm.nih.gov/18492182/",
        source: "PubMed",
      },
      {
        title: "Double-blind randomized trial of acetyl hexapeptide-3 and palmitoyl pentapeptide-4 creams for crow's feet",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10005804/",
        source: "PubMed Central",
      },
    ],
  },
  "snap-8": {
    score: 2,
    label: "In vitro mechanism supported; independent human efficacy limited; cosmetic-grade only",
    summary:
      "SNAP-8's SNAP-25-mimic mechanism is supported by in vitro SNARE and chromaffin-cell assays and by peer-reviewed work on the parent hexapeptide Argireline, but the strongest wrinkle-reduction figures come from manufacturer technical data rather than independent randomized trials, and poor skin penetration is a documented limitation. It is regulated as a cosmetic, not a drug.",
    basis: ["Peer-reviewed foundational study of the parent peptide Argireline (Blanes-Mira et al., Int J Cosmet Sci 2002) demonstrating the SNAP-25-mimic antiwrinkle concept","In vitro chromaffin-cell catecholamine-release inhibition data (largely manufacturer-sourced)","2025 peer-reviewed review documenting poor stratum-corneum penetration of the closely related acetyl hexapeptide-8","CIR safety assessments treating the acetyl-peptide class as safe only at very low cosmetic concentrations","Headline SNAP-8 efficacy percentages trace to Lipotec/Lubrizol technical literature, not independent trials"],
    references: [
      {
        title: "A synthetic hexapeptide (Argireline) with antiwrinkle activity (Int J Cosmet Sci, 2002)",
        url: "https://pubmed.ncbi.nlm.nih.gov/18494888/",
        source: "PubMed",
      },
      {
        title: "Acetyl Hexapeptide-8 in Cosmeceuticals: A Review of Skin Permeability and Efficacy (2025)",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12193160/",
        source: "PMC / Int J Mol Sci",
      },
      {
        title: "Acetyl octapeptide-3 (CID 71587832)",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/71587832",
        source: "PubChem",
      },
      {
        title: "Safety Assessment of Acetyl Hexapeptide-8 and Acetyl Hexapeptide-8 Amide as Used in Cosmetics",
        url: "https://www.cir-safety.org/sites/default/files/AcetylHexapeptide-8.pdf",
        source: "Cosmetic Ingredient Review",
      },
    ],
  },
  "thymulin": {
    score: 2,
    label: "preclinical / observational (research-only)",
    summary:
      "Thymulin has a real peer-reviewed literature base, but it is dominated by preclinical animal/in vitro work and observational human biomarker studies. There is no FDA approval, no completed efficacy program, and no established human dosing or safety profile.",
    basis: ["Zinc-dependent nonapeptide structure and mechanism well characterized in vitro (Prasad; Reggiani review)","Anti-inflammatory and analgesic effects shown only in animal/CNS models and with analogs (Dardenne 2006; Lunin 2010)","Human data are largely observational biomarker studies tied to age, malnutrition and zinc status (Wade 1985; Chandra 1988)","Therapeutic strategies remain preclinical gene therapy in animal models (Reggiani; Pardo 2020)","No regulatory approval or human label establishing dose or safety"],
    references: [
      {
        title: "The Thymus-Neuroendocrine Axis: Physiology, Molecular Biology, and Therapeutic Potential of the Thymic Peptide Thymulin",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2688715/",
        source: "PMC",
      },
      {
        title: "Physiology and therapeutic potential of the thymic peptide thymulin",
        url: "https://pubmed.ncbi.nlm.nih.gov/24588820/",
        source: "PubMed",
      },
      {
        title: "Interactions Between Zinc and Thymulin",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2364880/",
        source: "PMC",
      },
      {
        title: "Nanoparticle-based thymulin gene therapy reverses key pathology of experimental allergic asthma",
        url: "https://pubmed.ncbi.nlm.nih.gov/32577505/",
        source: "PubMed",
      },
    ],
  },
  "tuftsin": {
    score: 2,
    label: "Preclinical / mechanistic",
    summary:
      "Tuftsin has a deep mechanistic and preclinical literature, including a defined neuropilin-1/TGF-beta signaling pathway and a recognized deficiency syndrome, but no regulator-approved indication and no large modern controlled human trials establishing a safe, effective dose.",
    basis: ["Receptor and signaling pathway (Nrp1/TGF-beta) characterized in peer-reviewed work","Tuftsin deficiency documented in splenectomized and congenital cases (OMIM)","Antitumor, anti-infective and neuroinflammation effects shown mainly in cell and animal models","No FDA approval, no DailyMed label, no established human dosing","Most developed applications use engineered analogs (e.g., Selank) or fusion proteins rather than the free peptide"],
    references: [
      {
        title: "'Tuftsin': a natural phagocytosis stimulating peptide. Nature (1970)",
        url: "https://www.nature.com/articles/228672a0",
        source: "Nature",
      },
      {
        title: "Tuftsin signals through its receptor neuropilin-1 via the transforming growth factor beta pathway",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3805743/",
        source: "PMC",
      },
      {
        title: "Defective phagocytosis due to tuftsin deficiency in splenectomized subjects",
        url: "https://pubmed.ncbi.nlm.nih.gov/4512464/",
        source: "PubMed",
      },
      {
        title: "Tuftsin Deficiency, OMIM entry 191150",
        url: "https://www.omim.org/entry/191150",
        source: "OMIM",
      },
    ],
  },
  "lanreotide": {
    score: 5,
    label: "Strong, FDA-approved with randomized evidence",
    summary:
      "Lanreotide is an FDA-approved long-acting somatostatin analog with label-backed indications in acromegaly, GEP-NETs and carcinoid syndrome, supported by randomized trial evidence including the phase 3 CLARINET trial showing prolonged progression-free survival.",
    basis: ["FDA prescribing information (Somatuline Depot) with three approved indications since 2007","Phase 3 CLARINET randomized placebo-controlled trial (NEJM 2014, n=204) showing significantly prolonged progression-free survival in metastatic enteropancreatic NETs","Placebo-controlled carcinoid syndrome data (ELECT) and acromegaly registry/dose-response evidence","Well-characterized SSTR2/SSTR5 receptor pharmacology"],
    references: [
      {
        title: "Lanreotide in Metastatic Enteropancreatic Neuroendocrine Tumors (CLARINET), NEJM 2014",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1316158",
        source: "New England Journal of Medicine",
      },
      {
        title: "Somatuline Depot (lanreotide) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6e4a41fd-a753-4362-87ee-8cc56ed3660d",
        source: "DailyMed / FDA",
      },
      {
        title: "CLARINET open-label extension final results",
        url: "https://pubmed.ncbi.nlm.nih.gov/33052555/",
        source: "PubMed",
      },
      {
        title: "Efficacy and Safety Study of Somatuline Depot to Treat Carcinoid Syndrome (ELECT)",
        url: "https://clinicaltrials.gov/study/NCT00774930",
        source: "ClinicalTrials.gov",
      },
    ],
  },
  "teriparatide": {
    score: 4,
    label: "Approved with strong randomized fracture-prevention evidence",
    summary:
      "Teriparatide is FDA-approved and supported by randomized controlled trials showing substantial reductions in vertebral and nonvertebral fractures in high-fracture-risk osteoporosis, tempered by an early-stopped pivotal trial, a 2-year duration caution, and post-treatment bone-mass loss.",
    basis: ["Neer et al. NEJM 2001 Fracture Prevention Trial (n=1,637): ~65% reduction in new vertebral fractures and ~53% reduction in nonvertebral fragility fractures vs placebo","Saag et al. NEJM 2007: teriparatide produced greater BMD gains and fewer new vertebral fractures than alendronate in glucocorticoid-induced osteoporosis","FDA approval of Forteo (2002) and Bonsity (2019) with three labeled high-fracture-risk indications","Gilsenan et al. JBMR 2021 15-year surveillance study found no increased osteosarcoma risk (SIR ~0.72), leading FDA to remove the boxed warning in 2020","Limits: pivotal trial stopped early due to rat carcinogenicity findings; efficacy/safety not evaluated beyond 2 years; gains erode after stopping without a follow-on antiresorptive"],
    references: [
      {
        title: "FORTEO (teriparatide injection) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aae667c5-381f-4f92-93df-2ed6158d07b0",
        source: "DailyMed",
      },
      {
        title: "Effect of Parathyroid Hormone (1-34) on Fractures and Bone Mineral Density in Postmenopausal Women with Osteoporosis",
        url: "https://www.nejm.org/doi/full/10.1056/NEJM200105103441904",
        source: "New England Journal of Medicine (Neer et al. 2001)",
      },
      {
        title: "Teriparatide or Alendronate in Glucocorticoid-Induced Osteoporosis",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa071408",
        source: "New England Journal of Medicine (Saag et al. 2007)",
      },
      {
        title: "Teriparatide Did Not Increase Adult Osteosarcoma Incidence in a 15-Year US Postmarketing Surveillance Study",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7988650/",
        source: "Journal of Bone and Mineral Research (Gilsenan et al. 2021)",
      },
    ],
  },
  "abaloparatide": {
    score: 4,
    label: "Strong approval-grade clinical evidence",
    summary:
      "Abaloparatide is FDA-approved with phase 3 randomized trial support: ACTIVE showed reduced vertebral and nonvertebral fractures versus placebo in postmenopausal women, ACTIVExtend supported sequential maintenance benefit, and ATOM supported the male bone-density indication. Evidence is robust for women's fracture endpoints and solid but density-based for men.",
    basis: ["ACTIVE phase 3 RCT (JAMA 2016, n=2463) showed significant vertebral and nonvertebral fracture reduction vs placebo","ACTIVExtend demonstrated continued benefit with sequential alendronate","ATOM phase 3 RCT (n=228) supported the 2022 male indication via bone mineral density","FDA approvals 2017 (women) and 2022 (men) with DailyMed labeling","Male approval rests on BMD rather than a fracture-endpoint trial, a noted limit"],
    references: [
      {
        title: "Effect of Abaloparatide vs Placebo on New Vertebral Fractures: The ACTIVE Randomized Clinical Trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/27532455/",
        source: "JAMA / PubMed",
      },
      {
        title: "Efficacy and Safety of Abaloparatide in Men With Osteoporosis: The ATOM Trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/35689452/",
        source: "PubMed",
      },
      {
        title: "TYMLOS (abaloparatide) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=712143d9-e21e-4013-bb3b-3426a21060a8",
        source: "DailyMed",
      },
    ],
  },
  "calcitonin": {
    score: 3,
    label: "Moderate, approval-backed but with safety caution",
    summary:
      "Calcitonin is an FDA-approved calcitonin-receptor agonist peptide with label-backed roles in postmenopausal osteoporosis, symptomatic Paget disease and hypercalcemia, but its bone benefit is modest (fracture reduction not demonstrated for the injection) and an FDA meta-analysis identified a malignancy signal that restricted its use.",
    basis: ["FDA/DailyMed Miacalcin injection and calcitonin salmon nasal spray prescribing information establish approved indications, routes and reference dosing","FDA meta-analysis of 21 trials (10,883 patients) found higher overall malignancy rate (4.1% vs 2.9% placebo), prompting label warnings and 2013 advisory-committee rejection for nasal osteoporosis use","PROOF trial provided limited, dropout-affected evidence for nasal spray vertebral fracture reduction; injection label states fracture reduction not demonstrated"],
    references: [
      {
        title: "Miacalcin (calcitonin salmon) injection prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=89cd4f46-b88a-4c10-b25c-47352280dc4e",
        source: "DailyMed/FDA",
      },
      {
        title: "Calcitonin Salmon nasal spray prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c82eb602-12e1-692b-d660-f8d5b5736b54",
        source: "DailyMed/FDA",
      },
      {
        title: "Salmon calcitonin use and associated cancer risk",
        url: "https://pubmed.ncbi.nlm.nih.gov/24259626/",
        source: "PubMed",
      },
      {
        title: "Randomized trial of nasal spray salmon calcitonin in postmenopausal osteoporosis (PROOF Study)",
        url: "https://pubmed.ncbi.nlm.nih.gov/10996575/",
        source: "PubMed",
      },
    ],
  },
  "desmopressin": {
    score: 5,
    label: "Strong, well-established clinical evidence",
    summary:
      "Desmopressin is an FDA-approved peptide with decades of label-backed and trial evidence across antidiuretic and hemostatic indications, supported by primary sources from FDA/DailyMed labels and peer-reviewed journals.",
    basis: ["FDA and DailyMed prescribing information for DDAVP, Nocdurna and desmopressin nasal/tablet formulations establish V2-mediated antidiuresis and approved indications","Landmark Mannucci 1977 Lancet study and 20- and 30-year reviews document hemostatic factor VIII/vWF release in hemophilia A and type 1 von Willebrand disease","Randomized controlled trials and contemporary reviews support low-dose, sex-specific desmopressin for nocturia with serum sodium monitoring to manage hyponatremia"],
    references: [
      {
        title: "Nocdurna (desmopressin acetate) sublingual tablet prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf51914a-55df-4b4a-8ea8-c7af257c1d59",
        source: "DailyMed",
      },
      {
        title: "Desmopressin acetate tablets, full prescribing information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/021795s006lbl.pdf",
        source: "FDA",
      },
      {
        title: "1-Deamino-8-D-arginine vasopressin: a new pharmacological approach to the management of haemophilia and von Willebrands' diseases (Mannucci, Lancet 1977)",
        url: "https://pubmed.ncbi.nlm.nih.gov/67301/",
        source: "PubMed",
      },
      {
        title: "Desmopressin (DDAVP) in the Treatment of Bleeding Disorders: The First 20 Years (Blood 1997)",
        url: "https://ashpublications.org/blood/article/90/7/2515/238641/Desmopressin-DDAVP-in-the-Treatment-of-Bleeding",
        source: "Blood (ASH)",
      },
      {
        title: "Low-dose desmopressin combined with serum sodium monitoring can prevent clinically significant hyponatraemia in patients treated for nocturia (Juul, BJU Int 2017)",
        url: "https://bjui-journals.onlinelibrary.wiley.com/doi/10.1111/bju.13718",
        source: "BJU International",
      },
    ],
  },
  "vasopressin": {
    score: 4,
    label: "Approved drug with strong pharmacologic evidence, modest mortality data",
    summary:
      "Vasopressin (Vasostrict) is FDA-approved as an intravenous vasopressor for vasodilatory shock, backed by a clear FDA label and the randomized VASST trial. The label and pharmacology robustly support its blood-pressure and antidiuretic effects, but VASST did not show a significant overall survival benefit, so hard-outcome evidence is more limited.",
    basis: ["FDA Vasostrict prescribing information defining the vasodilatory shock indication, IV route and dosing ranges","VASST randomized controlled trial (n=778, NEJM 2008) of vasopressin vs norepinephrine in septic shock","Peer-reviewed pharmacology establishing V1a vasoconstriction and V2 antidiuretic mechanisms","Decades of established clinical use including historical central diabetes insipidus treatment"],
    references: [
      {
        title: "Vasostrict (vasopressin injection) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7ae1c8c9-7d75-55a8-e053-2991aa0af05b",
        source: "DailyMed / FDA",
      },
      {
        title: "Vasopressin versus Norepinephrine Infusion in Patients with Septic Shock (VASST)",
        url: "https://www.nejm.org/doi/abs/10.1056/NEJMoa067373",
        source: "New England Journal of Medicine",
      },
      {
        title: "Vasopressin V1a and V1b Receptors: From Molecules to Physiological Systems",
        url: "https://journals.physiology.org/doi/full/10.1152/physrev.00035.2011",
        source: "Physiological Reviews",
      },
    ],
  },
  "terlipressin": {
    score: 4,
    label: "Approved with pivotal RCT support; benefit is partial",
    summary:
      "Terlipressin is FDA approved as Terlivaz (2022) for improving kidney function in adults with hepatorenal syndrome, supported by the phase 3 CONFIRM RCT showing 32% verified HRS reversal vs 17% placebo, but with no mortality benefit and serious respiratory and ischemic risks carrying a boxed warning. It also has a long international evidence base for variceal bleeding.",
    basis: ["FDA Terlivaz approval (2022) and DailyMed prescribing information with boxed warning","CONFIRM phase 3 RCT (NCT02770716, NEJM 2021): 32% vs 17% verified HRS reversal, P=.006, no mortality benefit","Systematic review/meta-analysis of RCTs supporting terlipressin in acute variceal bleeding","Pharmacology reviews establishing V1 selectivity, prodrug mechanism and half-life"],
    references: [
      {
        title: "FDA approves treatment to improve kidney function in adults with hepatorenal syndrome",
        url: "https://www.fda.gov/drugs/news-events-human-drugs/fda-approves-treatment-improve-kidney-function-adults-hepatorenal-syndrome",
        source: "FDA",
      },
      {
        title: "TERLIVAZ (terlipressin) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3a35b86c-f451-4fac-8499-43019e4da354",
        source: "DailyMed",
      },
      {
        title: "Terlipressin plus Albumin for the Treatment of Type 1 Hepatorenal Syndrome (CONFIRM)",
        url: "https://www.nejm.org/doi/abs/10.1056/NEJMoa2008290",
        source: "New England Journal of Medicine",
      },
      {
        title: "Terlipressin for acute variceal bleeding: systematic review and meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/30508958/",
        source: "PubMed",
      },
    ],
  },
  "plecanatide": {
    score: 4,
    label: "Approved with supportive randomized phase 3 evidence",
    summary:
      "Plecanatide is FDA-approved for chronic idiopathic constipation (2017) and IBS-C in adults (2018), supported by multiple randomized, double-blind, placebo-controlled phase 3 trials showing modest but statistically significant symptom improvement at a 3 mg once-daily oral dose.",
    basis: ["FDA Trulance prescribing information establishing approved indications, 3 mg once-daily dosing, boxed dehydration warning, and negligible systemic absorption","Phase 3 CIC trial (n=1,394) showing durable CSBM responder rates of ~21% (3 mg) and ~19.5% (6 mg) vs ~10% placebo","Two identical phase 3 IBS-C trials (Brenner et al., Am J Gastroenterol 2018) showing improved abdominal pain and constipation vs placebo over 12 weeks","Modest absolute benefit and lack of head-to-head superiority data versus linaclotide and standard laxatives temper the strength of evidence"],
    references: [
      {
        title: "A Randomized Phase III Clinical Trial of Plecanatide, a Uroguanylin Analog, in Patients With Chronic Idiopathic Constipation",
        url: "https://pubmed.ncbi.nlm.nih.gov/28169285/",
        source: "PubMed",
      },
      {
        title: "Efficacy, safety, and tolerability of plecanatide in patients with IBS-C: results of two phase 3 randomized clinical trials",
        url: "https://www.ncbi.nlm.nih.gov/pubmed/29545635",
        source: "PubMed",
      },
      {
        title: "TRULANCE (plecanatide) tablets label with boxed warning",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/208745s011lbl.pdf",
        source: "FDA",
      },
    ],
  },
  "bivalirudin": {
    score: 4,
    label: "Approved with supportive randomized trial evidence",
    summary:
      "Bivalirudin is FDA-approved as a procedural anticoagulant for PCI, supported by large randomized trials (BAT, HORIZONS-AMI and later PCI studies) and a detailed prescribing label; its benefit is comparator-dependent and it carries a documented acute stent thrombosis signal in STEMI.",
    basis: ["FDA-approved Angiomax prescribing information defines indication, dosing, mechanism, pharmacokinetics and warnings","BAT trial (>4,000 patients) compared bivalirudin to heparin during angioplasty for unstable/postinfarction angina","HORIZONS-AMI and subsequent PCI trials evaluated bivalirudin versus heparin plus glycoprotein IIb/IIIa inhibitors","Pharmacology reviews characterize the bivalent, reversible direct thrombin inhibition mechanism"],
    references: [
      {
        title: "Angiomax (bivalirudin) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5f133813-f74e-4508-bc64-debbf104ff1e",
        source: "DailyMed",
      },
      {
        title: "Treatment with bivalirudin (Hirulog) as compared with heparin during coronary angioplasty for unstable or postinfarction angina (BAT trial)",
        url: "https://pubmed.ncbi.nlm.nih.gov/7715640/",
        source: "PubMed",
      },
      {
        title: "Bivalirudin during primary PCI in acute myocardial infarction (HORIZONS-AMI)",
        url: "https://pubmed.ncbi.nlm.nih.gov/18499566/",
        source: "PubMed",
      },
      {
        title: "Bivalent direct thrombin inhibitors: hirudin and bivalirudin",
        url: "https://pubmed.ncbi.nlm.nih.gov/15171961/",
        source: "PubMed",
      },
    ],
  },
  "eptifibatide": {
    score: 5,
    label: "Strong",
    summary:
      "Eptifibatide is FDA-approved with a deep randomized-trial base. PURSUIT showed a significant ~1.5% absolute reduction in 30-day death/MI in ACS; ESPRIT established the double-bolus PCI regimen (primary endpoint 10.5% to 6.6%). Benefit is real but modest, comes with increased bleeding, and routine early use was not superior in EARLY-ACS.",
    basis: ["FDA prescribing information (Integrilin/eptifibatide injection, DailyMed)","PURSUIT trial, NEJM 1998 (~10,900 ACS patients)","IMPACT-II trial, Lancet 1997 (~4,010 PCI patients)","ESPRIT trial, Lancet 2000 (coronary stenting, double-bolus regimen)","EARLY-ACS trial, NEJM 2009 (routine early vs provisional use)"],
    references: [
      {
        title: "Inhibition of platelet glycoprotein IIb/IIIa with eptifibatide in patients with acute coronary syndromes (PURSUIT, NEJM 1998)",
        url: "https://www.nejm.org/doi/full/10.1056/NEJM199808133390704",
        source: "New England Journal of Medicine",
      },
      {
        title: "Novel dosing regimen of eptifibatide in planned coronary stent implantation (ESPRIT, Lancet 2000)",
        url: "https://pubmed.ncbi.nlm.nih.gov/11145489/",
        source: "PubMed",
      },
      {
        title: "Randomised placebo-controlled trial of eptifibatide on complications of PCI: IMPACT-II (Lancet 1997)",
        url: "https://pubmed.ncbi.nlm.nih.gov/9164315/",
        source: "PubMed",
      },
      {
        title: "Early versus delayed, provisional eptifibatide in acute coronary syndromes (EARLY-ACS, NEJM 2009)",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0901316",
        source: "New England Journal of Medicine",
      },
      {
        title: "Eptifibatide injection prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c488f1af-a82c-4360-8886-79520635561a",
        source: "DailyMed",
      },
    ],
  },
  "enfuvirtide": {
    score: 4,
    label: "Strong randomized-trial evidence for the approved indication",
    summary:
      "Two pivotal 24-week randomized controlled trials (TORO 1 and TORO 2, ~1,000 treatment-experienced patients) showed adding enfuvirtide to an optimized background regimen roughly doubled the odds of achieving undetectable HIV-1 RNA and improved CD4 gains, supporting its 2003 FDA accelerated approval; evidence is limited to add-on use in treatment-experienced populations over short follow-up, and resistance arises rapidly without a suppressive companion regimen.",
    basis: ["FDA-approved label with defined indication and pharmacokinetics","TORO 1 randomized controlled trial published in NEJM 2003","TORO 2 randomized controlled trial","Peer-reviewed pharmacokinetic study establishing 3.8 h half-life","Independent review articles and NIH resources"],
    references: [
      {
        title: "Enfuvirtide, an HIV-1 Fusion Inhibitor, for Drug-Resistant HIV Infection in North and South America (TORO 1)",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa035026",
        source: "New England Journal of Medicine, 2003",
      },
      {
        title: "Fuzeon (enfuvirtide) for Injection, Highlights of Prescribing Information",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/021481s032lbl.pdf",
        source: "U.S. FDA",
      },
      {
        title: "The safety, plasma pharmacokinetics, and antiviral activity of subcutaneous enfuvirtide (T-20)",
        url: "https://pubmed.ncbi.nlm.nih.gov/12167274/",
        source: "PubMed",
      },
    ],
  },
  "ziconotide": {
    score: 4,
    label: "Approved with randomized controlled trial support (refractory chronic pain)",
    summary:
      "Ziconotide is FDA-approved (December 2004) and EMA-authorized for severe refractory chronic pain via intrathecal infusion, supported by multiple randomized, double-blind, placebo-controlled trials in cancer/AIDS pain and chronic nonmalignant pain, though effect sizes were modest and the program is positioned as later-line due to a narrow safety window.",
    basis: ["FDA-approved Prialt label and DailyMed prescribing information establishing indication, intrathecal-only route, dosing, and boxed warning","Staats 2004 JAMA randomized controlled trial in refractory cancer/AIDS pain","Rauck 2006 and Wallace 2006 randomized double-blind placebo-controlled trials in severe chronic and nonmalignant pain","EMA Prialt EPAR product information and StatPearls pharmacology review"],
    references: [
      {
        title: "PRIALT (ziconotide) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b025d8ed-937d-4597-9ad1-0b2f6e0ee5b1",
        source: "DailyMed",
      },
      {
        title: "Intrathecal ziconotide in the treatment of refractory pain in patients with cancer or AIDS: a randomized controlled trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/14709577/",
        source: "JAMA (PubMed)",
      },
      {
        title: "A randomized, double-blind, placebo-controlled study of intrathecal ziconotide in adults with severe chronic pain",
        url: "https://www.jpsmjournal.com/article/S0885-3924(06)00187-4/fulltext",
        source: "Journal of Pain and Symptom Management",
      },
      {
        title: "Ziconotide",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK459151/",
        source: "StatPearls, NCBI Bookshelf",
      },
    ],
  },
  "carbetocin": {
    score: 4,
    label: "Strong, label-backed clinical evidence",
    summary:
      "Carbetocin is approved in many countries for postpartum hemorrhage prevention and is supported by the large WHO-led CHAMPION randomized trial, a Cochrane network meta-analysis, and WHO essential-medicines listing for the heat-stable formulation; evidence shows non-inferiority to oxytocin rather than clear superiority, and it is not FDA approved in the US.",
    basis: ["CHAMPION trial (NEJM 2018): ~29,600 women, heat-stable carbetocin non-inferior to oxytocin for >=1000 mL blood loss after vaginal birth, but did not meet non-inferiority for the >=500 mL outcome","2018 Cochrane network meta-analysis: carbetocin may reduce need for additional uterotonics versus oxytocin, especially after cesarean, with cautious GRADE certainty","Ferring Duratocin product monograph confirms approved indication, single 100 microgram dose, and oxytocin-receptor mechanism","2021 systematic review/meta-analysis: side-effect burden broadly comparable to oxytocin","Not FDA approved in the US; intranasal carbetocin (LV-101) program for Prader-Willi syndrome did not gain FDA approval"],
    references: [
      {
        title: "Heat-Stable Carbetocin versus Oxytocin to Prevent Hemorrhage after Vaginal Birth (CHAMPION, NEJM 2018)",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1805489",
        source: "New England Journal of Medicine",
      },
      {
        title: "Uterotonic agents for preventing postpartum haemorrhage: a network meta-analysis",
        url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011689.pub3/full",
        source: "Cochrane Database of Systematic Reviews",
      },
      {
        title: "Duratocin (carbetocin injection) Product Monograph",
        url: "https://www.ferring.ca/media/1368/duratocin-vial-pm-control-no-284214-en-22jul2024.pdf",
        source: "Ferring Pharmaceuticals",
      },
      {
        title: "Side-effects of carbetocin to prevent postpartum hemorrhage: systematic review and meta-analysis",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7961157/",
        source: "Pharmacology Research & Perspectives (PMC)",
      },
      {
        title: "WHO recommendations: Uterotonics for the prevention of postpartum haemorrhage - Choice of uterotonic agents",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK535972/",
        source: "World Health Organization",
      },
    ],
  },
  "atosiban": {
    score: 4,
    label: "Approved (EU) with randomized controlled trial evidence",
    summary:
      "Atosiban is EU-approved (Tractocile, 2000) as an intravenous tocolytic, supported by pharmacokinetic studies and randomized controlled trials versus beta-agonists showing comparable delay of preterm birth with better maternal tolerability; however, evidence for improving hard neonatal outcomes is modest and the drug is not FDA-approved.",
    basis: ["EMA Summary of Product Characteristics and EPAR scientific discussion defining indication, dosing and contraindications","Randomized double-blind controlled trial versus salbutamol (Worldwide Atosiban vs Beta-agonists Study Group, 2001)","Pharmacokinetic studies in pregnant women with preterm contractions (Goodwin 1995, 1996)","US placebo-controlled trial (Romero 2000) and subsequent FDA non-approval"],
    references: [
      {
        title: "Tractocile (atosiban) Summary of Product Characteristics",
        url: "https://www.ema.europa.eu/en/documents/product-information/tractocile-epar-product-information_en.pdf",
        source: "European Medicines Agency",
      },
      {
        title: "Treatment of preterm labour with the oxytocin antagonist atosiban: a double-blind, randomized, controlled comparison with salbutamol",
        url: "https://pubmed.ncbi.nlm.nih.gov/11574128/",
        source: "Eur J Obstet Gynecol Reprod Biol (PubMed)",
      },
      {
        title: "An oxytocin receptor antagonist (atosiban) in the treatment of preterm labor: a randomized, double-blind, placebo-controlled trial with tocolytic rescue",
        url: "https://pubmed.ncbi.nlm.nih.gov/11035372/",
        source: "Am J Obstet Gynecol (PubMed)",
      },
    ],
  },
  "pasireotide": {
    score: 4,
    label: "Approved drug with phase 3 RCT evidence",
    summary:
      "Pasireotide is FDA-approved for Cushing's disease (subcutaneous Signifor, 2012) and acromegaly (Signifor LAR), supported by randomized phase 3 trials including a 12-month NEJM Cushing's study and the PAOLA acromegaly trial, with efficacy in defined populations offset by a clear hyperglycemia risk.",
    basis: ["FDA/DailyMed prescribing information for Signifor and Signifor LAR establishing approved indications, dosing and warnings","12-month phase 3 randomized double-blind trial in Cushing's disease (Colao et al., NEJM 2012)","Phase 3 PAOLA trial showing superiority over continued octreotide/lanreotide in inadequately controlled acromegaly","Pharmacology literature documenting pan-somatostatin receptor binding with high sst5 affinity"],
    references: [
      {
        title: "A 12-Month Phase 3 Study of Pasireotide in Cushing's Disease (NEJM 2012)",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1105743",
        source: "New England Journal of Medicine",
      },
      {
        title: "Pasireotide versus continued octreotide or lanreotide in inadequately controlled acromegaly (PAOLA), Lancet Diabetes Endocrinol 2014",
        url: "https://www.thelancet.com/journals/landia/article/PIIS2213-8587(14)70169-X/abstract",
        source: "The Lancet Diabetes & Endocrinology",
      },
      {
        title: "SIGNIFOR LAR (pasireotide) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a0aad470-3f38-af97-e053-2995a90a383a&type=display",
        source: "DailyMed / FDA",
      },
      {
        title: "Differential ligand-mediated pituitary somatostatin receptor subtype signaling",
        url: "https://pubmed.ncbi.nlm.nih.gov/19820006/",
        source: "PubMed",
      },
    ],
  },
  "secretin": {
    score: 4,
    label: "Approved diagnostic agent; therapeutic uses unsupported",
    summary:
      "Secretin (ChiRhoStim, human secretin) is FDA-approved as an intravenous diagnostic peptide for pancreatic exocrine function testing, gastrinoma testing, and ERCP duct identification, with a well-defined secretin-receptor/CFTR mechanism. Its mechanism and diagnostic performance are well established, but attempts to use it therapeutically (notably for autism) failed in randomized trials and a Cochrane review.",
    basis: ["FDA-approved label (NDA 021256) and DailyMed prescribing information define indications, reference doses, and pharmacokinetics","Pancreapedia and pancreatic physiology literature describe the secretin receptor and bicarbonate-secretion mechanism","Radioimmunoassay study (Kolts & McGuigan) and label PK data establish half-life values","NEJM 1999 RCT (Sandler et al.) and Cochrane review of 16 RCTs (>900 children) found no benefit for autism"],
    references: [
      {
        title: "ChiRhoStim (human secretin) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b4dfe70f-0a86-4488-9ba1-dcd8f86cbfcd",
        source: "DailyMed",
      },
      {
        title: "ChiRhoStim approved label, NDA 021256",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/021256s013lbl.pdf",
        source: "US FDA",
      },
      {
        title: "Secretin receptor",
        url: "https://pancreapedia.org/molecules/secretin-receptor",
        source: "Pancreapedia",
      },
      {
        title: "Radioimmunoassay measurement of secretin half-life in man",
        url: "https://pubmed.ncbi.nlm.nih.gov/830238/",
        source: "PubMed",
      },
      {
        title: "Lack of Benefit of a Single Dose of Synthetic Human Secretin in Autism",
        url: "https://www.nejm.org/doi/full/10.1056/NEJM199912093412404",
        source: "New England Journal of Medicine",
      },
      {
        title: "Intravenous secretin for autism spectrum disorders (Cochrane review)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7154585/",
        source: "PMC / Cochrane",
      },
    ],
  },
  "sincalide": {
    score: 4,
    label: "Approved diagnostic with standardized methodology evidence",
    summary:
      "Sincalide (Kinevac) is FDA-approved since 1976 as an intravenous diagnostic agent, with a well-defined mechanism and peer-reviewed methodology trials establishing optimal infusion protocols and gallbladder ejection fraction normal values.",
    basis: ["FDA-approved label (DailyMed/accessdata) defining indications, dosing, pharmacokinetics and warnings","Multicenter Journal of Nuclear Medicine study (Ziessman 2010) establishing a 60-minute infusion protocol and 38% lower limit of normal GBEF","Interdisciplinary consensus recommendations for cholecystokinin-cholescintigraphy","Evidence supports only controlled diagnostic use, not therapeutic or chronic dosing"],
    references: [
      {
        title: "Kinevac (sincalide) prescribing information",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1408aabb-6982-48e5-ae9f-504ec43b0003",
        source: "DailyMed",
      },
      {
        title: "Sincalide-stimulated cholescintigraphy: multicenter investigation of optimal infusion methodology and GBEF normal values",
        url: "https://pubmed.ncbi.nlm.nih.gov/20080900/",
        source: "J Nucl Med (PubMed)",
      },
      {
        title: "Cholecystokinin-cholescintigraphy in adults: consensus recommendations",
        url: "https://www.cghjournal.org/article/S1542-3565(11)00162-5/fulltext",
        source: "Clin Gastroenterol Hepatol",
      },
    ],
  },
  "nesiritide": {
    score: 2,
    label: "Approved on hemodynamics, neutral in pivotal outcome trial, discontinued",
    summary:
      "Nesiritide reliably lowers filling pressures and was FDA-approved in 2001 based on hemodynamic and symptom data (VMAC), but the definitive 7,141-patient ASCEND-HF trial found no benefit on death or 30-day rehospitalization and more hypotension. Earlier pooled analyses raised mortality and renal signals that were debated and not confirmed as net harm. Clinical use collapsed and the product was discontinued.",
    basis: ["Pivotal ASCEND-HF RCT (NEJM 2011, n=7,141) showed no effect on death or rehospitalization and only a small non-significant dyspnea benefit","VMAC RCT (JAMA 2002) demonstrated hemodynamic improvement vs nitroglycerin/placebo, a surrogate endpoint","FDA Natrecor prescribing information documents mechanism, IV dosing and ~18-minute half-life","2005 pooled analyses (JAMA, Circulation) raised contested short-term mortality and renal-function safety signals","Product subsequently discontinued; no current approved supply or labeled use"],
    references: [
      {
        title: "Effect of Nesiritide in Patients with Acute Decompensated Heart Failure (ASCEND-HF). N Engl J Med. 2011;365:32-43",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1100171",
        source: "New England Journal of Medicine",
      },
      {
        title: "Intravenous nesiritide vs nitroglycerin for decompensated congestive heart failure (VMAC). JAMA. 2002;287:1531-40",
        url: "https://pubmed.ncbi.nlm.nih.gov/11911755/",
        source: "JAMA / PubMed",
      },
      {
        title: "Natrecor (nesiritide) for intravenous infusion, FDA prescribing information (2009)",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2009/020920s023lbl.pdf",
        source: "U.S. FDA",
      },
      {
        title: "Risk of worsening renal function with nesiritide. Circulation. 2005;111:1487-1491",
        url: "https://www.ahajournals.org/doi/10.1161/01.cir.0000159340.93220.e4",
        source: "Circulation",
      },
    ],
  },
  "melittin": {
    score: 2,
    label: "Preclinical",
    summary:
      "Melittin shows broad in vitro and animal-model antimicrobial, antiviral and anticancer activity through membrane-pore formation, but there are no human trials demonstrating therapeutic benefit and development is limited by hemolysis and non-selective toxicity.",
    basis: ["In vitro antibacterial activity against drug-resistant pathogens (MIC ~8-32 ug/mL)","Preclinical anticancer mechanisms in cell and animal models","Documented hemolysis and normal-cell cytotoxicity at low concentrations","No approved human indication and no positive human efficacy trials"],
    references: [
      {
        title: "The current landscape of the antimicrobial peptide melittin and its therapeutic potential",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10838977/",
        source: "PMC",
      },
      {
        title: "In vitro and in vivo toxicity and antibacterial efficacy of melittin against clinical extensively drug-resistant bacteria",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8281584/",
        source: "PMC",
      },
      {
        title: "An Updated Review Summarizing the Anticancer Efficacy of Melittin from Bee Venom in Several Models of Human Cancers",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10385528/",
        source: "PMC",
      },
    ],
  },
  "colivelin": {
    score: 2,
    label: "Preclinical only",
    summary:
      "Colivelin shows consistent, potent neuroprotection in cell-culture and rodent models of Alzheimer's disease and ALS, but there is no human clinical or safety evidence and it has never entered registered human trials.",
    basis: ["Femtomolar neuroprotection against amyloid-beta and familial AD mutant toxicity in vitro (Chiba et al., J Neurosci 2005)","Improved memory and reduced hippocampal neuronal loss in Alzheimer's mouse models via ICV, IP and intranasal routes (Chiba 2005; Yamada 2008)","Prolonged survival and improved motor performance in G93A-SOD1 ALS mice (Chiba et al., BBRC 2006)","No human pharmacokinetic, efficacy, or safety data; no registered clinical trials despite ~two decades of preclinical work"],
    references: [
      {
        title: "Development of a femtomolar-acting humanin derivative named colivelin (Chiba et al., J Neurosci 2005)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16267233/",
        source: "PubMed",
      },
      {
        title: "Colivelin prolongs survival of an ALS model mouse (Chiba et al., BBRC 2006)",
        url: "https://pubmed.ncbi.nlm.nih.gov/16564029/",
        source: "PubMed",
      },
      {
        title: "Nasal Colivelin treatment ameliorates memory impairment related to Alzheimer's disease (Yamada et al., Neuropsychopharmacology 2008)",
        url: "https://pubmed.ncbi.nlm.nih.gov/17928813/",
        source: "PubMed",
      },
    ],
  },
  "adipotide": {
    score: 2,
    label: "Preclinical only; human program halted",
    summary:
      "Adipotide showed dramatic targeted fat loss in obese monkeys and rodents via prohibitin-directed vascular apoptosis, but it has no validated human efficacy or safety; its first-in-human Phase 1 oncology trial was halted and development was discontinued, primarily over renal toxicity.",
    basis: ["28-day study in obese rhesus monkeys (Science Translational Medicine, 2011): ~7-15% body weight loss and ~39% total body fat reduction at 0.43 mg/kg/day SC","Original concept and target validation in rodents (Nature Medicine, 2004): prohibitin identified as white-fat vascular marker","Annexin A2-prohibitin receptor system confirmed in adipose vasculature (JCI Insight, 2016)","First-in-human Phase 1 trial NCT01262664 (MD Anderson) in metastatic prostate cancer with obesity; program halted with nephrotoxicity as central concern","Dose-dependent, reversible renal changes observed even in primate studies"],
    references: [
      {
        title: "A peptidomimetic targeting white fat causes weight loss and improved insulin resistance in obese monkeys",
        url: "https://www.science.org/doi/10.1126/scitranslmed.3002621",
        source: "Science Translational Medicine",
      },
      {
        title: "Reversal of obesity by targeted ablation of adipose tissue",
        url: "https://www.nature.com/articles/nm1048",
        source: "Nature Medicine",
      },
      {
        title: "Prohibitin/annexin 2 interaction regulates fatty acid transport in adipose tissue",
        url: "https://insight.jci.org/articles/view/86351",
        source: "JCI Insight",
      },
      {
        title: "Phase I Evaluation of Prohibitin Targeting Peptide 1 in Metastatic Prostate Cancer and Obesity (NCT01262664)",
        url: "https://clinicaltrials.gov/study/NCT01262664",
        source: "ClinicalTrials.gov",
      },
    ],
  },
};

export function getPeptideEvidence(slug: string): PeptideEvidence | null {
  return peptideEvidence[slug] ?? null;
}
