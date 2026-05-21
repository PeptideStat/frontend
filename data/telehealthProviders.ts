/**
 * GLP-1 telehealth providers tracked for the "where to get GLP-1 online" guide.
 *
 * Figures mirror what each provider listed publicly; `priceLabel` is the exact
 * displayed price, while `sortPrice` is a monthly-equivalent entry figure used
 * only for sorting (annual and per-visit models are normalised to a monthly
 * number so the column can rank). Medication cost is separate and varies.
 *
 * Update `LAST_VERIFIED` whenever prices are re-checked.
 */

export const LAST_VERIFIED = "May 2026";

export type DrugType = "brand" | "compounded" | "both";
export type InsuranceStatus = "yes" | "some" | "no";

export interface TelehealthProvider {
  name: string;
  stocks: string;
  type: DrugType;
  priceLabel: string;
  /** Monthly-equivalent entry price for sorting only. */
  sortPrice: number;
  insurance: InsuranceStatus;
  notable: string;
}

export const telehealthProviders: TelehealthProvider[] = [
  {
    name: "Eden",
    stocks: "Ozempic, Wegovy, Mounjaro, Zepbound (brand)",
    type: "brand",
    priceLabel: "$129 first month, then $209",
    sortPrice: 129,
    insurance: "no",
    notable: "No consult or membership fees",
  },
  {
    name: "Weight Watchers Clinic",
    stocks: "Wegovy, Zepbound, Mounjaro, Ozempic",
    type: "brand",
    priceLabel: "$839/yr + medication",
    sortPrice: 70,
    insurance: "yes",
    notable: "Behaviour-change program included",
  },
  {
    name: "Medvi",
    stocks: "Wegovy, Zepbound (oral + injectable)",
    type: "brand",
    priceLabel: "$179 first month, $299/mo",
    sortPrice: 179,
    insurance: "no",
    notable: "24/7 clinician chat; HSA/FSA accepted",
  },
  {
    name: "Sprout",
    stocks: "Compounded semaglutide / tirzepatide",
    type: "compounded",
    priceLabel: "~$199–$299/mo",
    sortPrice: 199,
    insurance: "no",
    notable: "Fast intake, narrower drug list",
  },
  {
    name: "Found",
    stocks: "Brand + compounded",
    type: "both",
    priceLabel: "$99 program + Rx",
    sortPrice: 99,
    insurance: "some",
    notable: "Physician-led, behaviour program",
  },
  {
    name: "Sesame",
    stocks: "Brand-name",
    type: "brand",
    priceLabel: "One-off $30–$80 visit + Rx",
    sortPrice: 30,
    insurance: "some",
    notable: "Marketplace of independent clinicians",
  },
  {
    name: "Noom Med",
    stocks: "Brand-name via partner pharmacy",
    type: "brand",
    priceLabel: "$279/mo",
    sortPrice: 279,
    insurance: "some",
    notable: "Psychology-based program bolted on",
  },
  {
    name: "Hims & Hers",
    stocks: "Compounded GLP-1 and brand Zepbound",
    type: "both",
    priceLabel: "$199 (compounded) – $1,899 (Zepbound)",
    sortPrice: 199,
    insurance: "no",
    notable: "Largest DTC brand; recipes + tracking",
  },
  {
    name: "PlushCare",
    stocks: "Brand-name",
    type: "brand",
    priceLabel: "Membership + visit fees",
    sortPrice: 9999,
    insurance: "yes",
    notable: "One of the only insurance-first options",
  },
  {
    name: "Ro",
    stocks: "Brand-name (incl. Zepbound via Lilly)",
    type: "brand",
    priceLabel: "$145/mo program + Rx",
    sortPrice: 145,
    insurance: "yes",
    notable: "Strong onboarding, coaching, follow-ups",
  },
  {
    name: "Nurx",
    stocks: "Brand + compounded",
    type: "both",
    priceLabel: "$80/mo program + Rx",
    sortPrice: 80,
    insurance: "yes",
    notable: "Strong women's-health positioning",
  },
  {
    name: "LifeMD",
    stocks: "Brand-name + compounded",
    type: "both",
    priceLabel: "$129 first month, $179/mo",
    sortPrice: 129,
    insurance: "yes",
    notable: '"Weight-loss guarantee" marketing claim',
  },
];
