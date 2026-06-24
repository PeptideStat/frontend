const ASCENSION_ORIGIN = "https://ascensionpeptides.com";

export const ascensionReferralCode = "PEPTIDESDEFINED";
export const ascensionCouponCode = "PEPTIDESDE";
export const ascensionShopUrl = `${ASCENSION_ORIGIN}/shop/ref/${ascensionReferralCode}/`;
export const ascensionReferralUrl = ascensionShopUrl;

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

const ascensionProductPaths: Record<string, string> = {
  "bpc-157": "/product/bpc-157-10mg/",
  "tb-500": "/product/tb-500-5mg/",
  "ghk-cu": "/product/ghk-cu-100mg/",
  "cjc-1295": "/product/cjc-1295-5mg/",
  ipamorelin: "/product/ipamorelin-5mg/",
  sermorelin: "/product/sermorelin-10mg/",
  semaglutide: "/product/s-5/",
  tirzepatide: "/product/t-10/",
  retatrutide: "/product/r-10/",
  cagrilintide: "/product/c-10/",
  tesamorelin: "/product/tesamorelin-5mg/",
  "mots-c": "/product/mots-c-10mg/",
  "aod-9604": "/product/aod-9604-5mg/",
  dsip: "/product/dsip-10mg/",
  selank: "/product/selank-10mg/",
  semax: "/product/semax-10mg/",
  "thymosin-alpha-1": "/product/thymosin-alpha-1-10mg/",
  kpv: "/product/kpv-10mg/",
  "ll-37": "/product/ll37-10mg/",
  "melanotan-ii": "/product/melanotan-ii-10mg/",
  bremelanotide: "/product/pt-141-10mg/",
  kisspeptin: "/product/kisspeptin-10mg/",
  "ss-31": "/product/ss-31-10mg/",
  epitalon: "/product/epithalon-10mg/",
};

export const getAscensionBuyUrl = (peptideSlug: string, campaign?: string) => {
  const productPath = ascensionProductPaths[peptideSlug];
  const buyUrl = productPath
    ? `${ASCENSION_ORIGIN}${productPath}ref/${ascensionReferralCode}/`
    : ascensionShopUrl;

  return withCampaign(buyUrl, campaign);
};
