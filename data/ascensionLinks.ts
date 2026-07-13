import availabilitySnapshot from "@/data/ascensionAvailability.json";

const ASCENSION_ORIGIN = "https://ascensionpeptides.com";

export const ascensionReferralCode = "PEPTIDESDEFINED";
export const ascensionCouponCode = "PEPTIDESDE";
export const ascensionShopUrl = `${ASCENSION_ORIGIN}/shop/ref/${ascensionReferralCode}/`;
export const ascensionReferralUrl = ascensionShopUrl;
export const ascensionAvailabilityCheckedAt = availabilitySnapshot.checkedAt;

export interface AscensionCatalogProduct {
  id: string;
  name: string;
  path: `/product/${string}/`;
  catalogPage: 1 | 2 | 3 | 4;
}

/**
 * Direct product paths audited against all four Ascension peptide-category
 * pages. Keep the vendor-facing catalog here so every placement uses the same
 * destination instead of maintaining one-off URLs in individual components.
 */
export const ascensionCatalog: readonly AscensionCatalogProduct[] = [
  { id: "5-amino-1mq", name: "5-Amino-1MQ – 10MG", path: "/product/5-amino-1mq-10-mg/", catalogPage: 1 },
  { id: "aod-9604", name: "AOD-9604 (5MG)", path: "/product/aod-9604-5mg/", catalogPage: 1 },
  { id: "ara-290", name: "ARA-290 10mg", path: "/product/ara-290-10mg/", catalogPage: 1 },
  { id: "bpc-157", name: "BPC-157 (10mg)", path: "/product/bpc-157-10mg/", catalogPage: 1 },
  { id: "wolverine-stack", name: "Wolverine Stack 20mg", path: "/product/wolverine-stack/", catalogPage: 1 },
  { id: "wolverine-stack-kit", name: "Wolverine Stack 20mg Kit", path: "/product/wolverine-stack-kit/", catalogPage: 1 },
  { id: "c-10", name: "C-10", path: "/product/c-10/", catalogPage: 1 },
  { id: "c-10-kit", name: "C-10 Kit", path: "/product/c-10-kit/", catalogPage: 1 },
  { id: "fit-stack-10", name: "FIT Stack 10mg", path: "/product/fit-stack-cjc-1295-ipamorelin/", catalogPage: 1 },
  { id: "dsip", name: "DSIP (10mg)", path: "/product/dsip-10mg/", catalogPage: 1 },
  { id: "epitalon", name: "Epithalon (10mg)", path: "/product/epithalon-10mg/", catalogPage: 1 },
  { id: "foxo4-dri", name: "FOXO4-DRI 10mg", path: "/product/fox04-dri/", catalogPage: 1 },
  { id: "ghk-cu", name: "GHK-CU (100MG) 3mL", path: "/product/ghk-cu-100mg-3ml/", catalogPage: 1 },
  { id: "glow-70", name: "GLOW 70mg", path: "/product/glow-advanced-peptide-blend-for-radiance-recovery/", catalogPage: 1 },
  { id: "klow-80", name: "KLOW 80mg", path: "/product/klow-ghk-cu-bpc-157-thymosin-beta4-kpv/", catalogPage: 1 },
  { id: "hcg", name: "HCG (5000iu)", path: "/product/hcg-5000iu/", catalogPage: 1 },

  { id: "ipamorelin", name: "Ipamorelin (5MG)", path: "/product/ipamorelin-5mg/", catalogPage: 2 },
  { id: "kisspeptin", name: "Kisspeptin (10MG)", path: "/product/kisspeptin-10mg/", catalogPage: 2 },
  { id: "kpv", name: "KPV (10MG)", path: "/product/kpv-10mg/", catalogPage: 2 },
  { id: "ll-37", name: "LL-37 (10MG)", path: "/product/ll37-10mg/", catalogPage: 2 },
  { id: "melanotan-i", name: "Melanotan I (10MG)", path: "/product/melanotan-i-10mg/", catalogPage: 2 },
  { id: "melanotan-ii", name: "Melanotan II (10MG)", path: "/product/melanotan-ii-10mg/", catalogPage: 2 },
  { id: "mots-c", name: "MOTS-C (10MG)", path: "/product/mots-c-10mg/", catalogPage: 2 },
  { id: "nad-1000", name: "NAD+ (1,000mg)", path: "/product/nad-1000mg/", catalogPage: 2 },
  { id: "r-30", name: "R-30", path: "/product/r-30/", catalogPage: 2 },
  { id: "s-5", name: "S-5", path: "/product/s-5/", catalogPage: 2 },
  { id: "selank", name: "Selank (10MG)", path: "/product/selank-10mg/", catalogPage: 2 },
  { id: "semax", name: "Semax (10MG)", path: "/product/semax-10mg/", catalogPage: 2 },
  { id: "sermorelin", name: "Sermorelin (10MG)", path: "/product/sermorelin-10mg/", catalogPage: 2 },
  { id: "ss-31", name: "SS-31 (10MG)", path: "/product/ss-31-10mg/", catalogPage: 2 },
  { id: "t-10", name: "T-10", path: "/product/t-10/", catalogPage: 2 },
  { id: "t-10-kit", name: "T-10 Kit", path: "/product/t-10-kit/", catalogPage: 2 },

  { id: "t-30", name: "T-30", path: "/product/t-30/", catalogPage: 3 },
  { id: "t-30-kit", name: "T-30 Kit", path: "/product/t-30-kit/", catalogPage: 3 },
  { id: "tb-500", name: "TB-500 (5MG)", path: "/product/tb-500-5mg/", catalogPage: 3 },
  { id: "tesamorelin", name: "Tesamorelin (5MG)", path: "/product/tesamorelin-5mg/", catalogPage: 3 },
  { id: "thymosin-alpha-1", name: "Thymosin Alpha 1 (10MG)", path: "/product/thymosin-alpha-1-10mg/", catalogPage: 3 },
  { id: "vip", name: "VIP (10MG)", path: "/product/vip-10mg/", catalogPage: 3 },
  { id: "bpc-157-5", name: "BPC-157 (5mg)", path: "/product/bpc-157-5mg/", catalogPage: 3 },
  { id: "cjc-1295", name: "CJC-1295 no DAC (5MG)", path: "/product/cjc-1295-5mg/", catalogPage: 3 },
  { id: "fit-stack-20", name: "FIT Stack 20mg", path: "/product/cjc-1295-no-dac-10mg-ipamorelin-10mg-20mg/", catalogPage: 3 },
  { id: "glutathione", name: "Glutathione (1,500mg)", path: "/product/glutathione-1200mg/", catalogPage: 3 },
  { id: "nad-500", name: "NAD+ (500mg)", path: "/product/nad-500mg/", catalogPage: 3 },
  { id: "oxytocin", name: "Oxytocin (2MG)", path: "/product/oxytocin-2mg/", catalogPage: 3 },
  { id: "calm-clarity", name: "Calm + Clarity (30mg)", path: "/product/calm-clarity-30mg/", catalogPage: 3 },
  { id: "calm-clarity-copy", name: "Calm + Clarity (30mg) (Copy)", path: "/product/pe-22-28-10mg-pinealon-10mg-selank-10mg-30mg-copy/", catalogPage: 3 },
  { id: "calm-clarity-kit", name: "Calm + Clarity (30mg) Kit", path: "/product/calm-clarity-30mg-kit/", catalogPage: 3 },
  { id: "pinealon", name: "Pinealon (10MG)", path: "/product/pinealon-10mg/", catalogPage: 3 },

  { id: "pt-141", name: "PT-141 (10MG)", path: "/product/pt-141-10mg/", catalogPage: 4 },
  { id: "r-10", name: "R-10", path: "/product/r-10/", catalogPage: 4 },
  { id: "r-10-kit", name: "R-10 Kit", path: "/product/r-10-kit/", catalogPage: 4 },
  { id: "r-30-kit", name: "R-30 Kit", path: "/product/r-30-kit/", catalogPage: 4 },
  { id: "ss-31-kit", name: "SS-31 (10MG) Kit", path: "/product/ss-31-10mg-kit/", catalogPage: 4 },
];

const productsById = new Map(
  ascensionCatalog.map((product) => [product.id, product] as const),
);
const outOfStockProductIds = new Set(availabilitySnapshot.outOfStock);

/** Database slugs and article slugs that should deep-link to a catalog item. */
const ascensionProductAliases: Record<string, string> = {
  "ara-290-cibinetide": "ara-290",
  "bpc-157-vs-tb-500": "wolverine-stack",
  bremelanotide: "pt-141",
  cagrilintide: "c-10",
  "dsip-peptide": "dsip",
  "foxo4-dri-peptide": "foxo4-dri",
  "glutathione-peptide": "glutathione",
  "ghk-cu-for-hair-growth": "ghk-cu",
  "ipamorelin-peptide": "ipamorelin",
  "ipamorelin-vs-sermorelin": "ipamorelin",
  "kisspeptin-peptide": "kisspeptin",
  "kpv-peptide": "kpv",
  "ll-37-peptide": "ll-37",
  "afamelanotide-melanotan-i": "melanotan-i",
  "mounjaro-tirzepatide-glp-1": "t-10",
  "oxytocin-peptide": "oxytocin",
  "pinealon-peptide": "pinealon",
  "pt-141-bremelanotide": "pt-141",
  retatrutide: "r-10",
  semaglutide: "s-5",
  "semaglutide-as-glp-1": "s-5",
  "sermorelin-complete-guide": "sermorelin",
  "ss-31-elamipretide": "ss-31",
  "tb-500-peptide": "tb-500",
  "tesamorelin-vs-sermorelin": "tesamorelin",
  tirzepatide: "t-10",
  "vip-peptide": "vip",
};

const normalizeCampaign = (campaign?: string) =>
  campaign
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const withCampaign = (url: string, campaign?: string) => {
  const normalizedCampaign = normalizeCampaign(campaign);

  return normalizedCampaign
    ? `${url}?campaign=${encodeURIComponent(normalizedCampaign)}`
    : url;
};

export const getAscensionShopUrl = (campaign?: string) =>
  withCampaign(ascensionShopUrl, campaign);

export const getAscensionProduct = (slugOrProductId: string) => {
  const productId = ascensionProductAliases[slugOrProductId] ?? slugOrProductId;
  return productsById.get(productId);
};

export const hasAscensionProduct = (slugOrProductId: string) =>
  getAscensionProduct(slugOrProductId) !== undefined;

export const getAscensionAvailability = (slugOrProductId: string) => {
  const product = getAscensionProduct(slugOrProductId);
  if (!product) return "unknown" as const;
  return outOfStockProductIds.has(product.id)
    ? ("out-of-stock" as const)
    : ("in-stock" as const);
};

export const getAscensionBuyUrl = (
  slugOrProductId: string,
  campaign?: string,
) => {
  const product = getAscensionProduct(slugOrProductId);
  const buyUrl = product
    ? `${ASCENSION_ORIGIN}${product.path}ref/${ascensionReferralCode}/`
    : ascensionShopUrl;

  return withCampaign(buyUrl, campaign);
};
