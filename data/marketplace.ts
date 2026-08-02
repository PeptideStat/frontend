import {
  ascensionCouponCode,
  ascensionDiscountPercent,
  getAscensionBuyUrl,
  getAscensionShopUrl,
} from "@/data/ascensionLinks";
import { getNovaReferralUrl } from "@/data/novaLinks";
import {
  partnerPrograms,
  type PartnerStatus,
  type VendorId,
} from "@/data/partnerPrograms";
import {
  expandedCompoundProfiles,
  expandedMarketListings,
} from "@/data/marketplaceExpanded";

export interface Vendor {
  id: VendorId;
  name: string;
  shortName: string;
  url: string;
  location: string;
  shipsTo: string;
  coaLabel: string;
  testingNote: string;
  code?: string;
  discountPercent?: number;
  partner: boolean;
  partnerStatus: PartnerStatus;
  market: MarketRegion;
  countryServed: string;
  currency: MarketCurrency;
  documentationUrl: string;
  profileSummary: string;
  lastReviewedAt: string;
  color: string;
  logoPath: string;
  logoShape: "mark" | "wordmark";
  logoBackground: string;
}

export interface MarketListing {
  id: string;
  compound: string;
  compoundSlug: string;
  vendorId: VendorId;
  productLabel: string;
  amount: number;
  unit: "mg" | "IU";
  listPrice: number;
  href: string;
  stock: "in-stock" | "low-stock" | "unknown";
  coa: "batch-specific" | "product-level" | "public-library";
  checkedAt: string;
  currency?: MarketCurrency;
}

export type MarketRegion = "us" | "uae-gcc";
export type MarketCurrency = "USD" | "AED";

export type PriceSourceStatus =
  | "direct-product-page"
  | "catalog-snapshot"
  | "needs-deep-link";

export type DocumentStatus =
  | "linked-batch-report"
  | "product-page-coa"
  | "library-only"
  | "vendor-claim";

export interface ListingEvidence {
  listingId: string;
  sourceUrl: string;
  priceSourceStatus: PriceSourceStatus;
  documentStatus: DocumentStatus;
  sourceNote: string;
}

export interface CoaRecord {
  id: string;
  listingId: string;
  vendorId: VendorId;
  compoundSlug: string;
  productLabel: string;
  lab: string;
  batch: string;
  reportDate: string;
  reportUrl: string;
  match: "exact-listing" | "product-family";
  reviewedAt: string;
  note: string;
}

export interface CompoundProfile {
  slug: string;
  name: string;
  comparisonNote: string;
  researchHref: string;
}

export const vendors: readonly Vendor[] = [
  {
    id: "ascension",
    name: "Ascension Peptides",
    shortName: "AP",
    url: getAscensionShopUrl("vendor_directory"),
    location: "United States",
    shipsTo: "US",
    coaLabel: "Batch COAs",
    testingNote: "Vendor publishes third-party reports with batch and test dates.",
    code: ascensionCouponCode,
    discountPercent: ascensionDiscountPercent,
    partner: true,
    partnerStatus: partnerPrograms.ascension.status,
    market: "us",
    countryServed: "United States",
    currency: "USD",
    documentationUrl: "https://ascensionpeptides.com/certificates-of-analysis/",
    profileSummary:
      "Tracked at product level with source-linked price snapshots and vendor-hosted batch report details.",
    lastReviewedAt: "2026-08-02",
    color: "#d9f36a",
    logoPath: "/images/vendors/ascension.webp",
    logoShape: "wordmark",
    logoBackground: "#ffffff",
  },
  {
    id: "ion",
    name: "Ion Peptide",
    shortName: "IP",
    url: "https://ionpeptide.com",
    location: "United States",
    shipsTo: "US",
    coaLabel: "Product COAs",
    testingNote: "Vendor states that third-party testing is published by product.",
    partner: false,
    partnerStatus: partnerPrograms.ion.status,
    market: "us",
    countryServed: "United States",
    currency: "USD",
    documentationUrl: "https://ionpeptide.com/lab_result/",
    profileSummary:
      "Product pages and the public lab-result archive are tracked separately from PeptideStat verification.",
    lastReviewedAt: "2026-08-02",
    color: "#b8c8ff",
    logoPath: "/images/vendors/ion.png",
    logoShape: "mark",
    logoBackground: "#ffffff",
  },
  {
    id: "ez",
    name: "EZ Peptides",
    shortName: "EZ",
    url: "https://ezpeptides.com",
    location: "United States",
    shipsTo: "US",
    coaLabel: "Public COAs",
    testingNote: "Vendor provides public product documentation; match it to the lot.",
    partner: false,
    partnerStatus: partnerPrograms.ez.status,
    market: "us",
    countryServed: "United States",
    currency: "USD",
    documentationUrl: "https://ezpeptides.com/",
    profileSummary:
      "Catalog pricing is visible; individual report-to-listing matches still need to be recorded.",
    lastReviewedAt: "2026-08-02",
    color: "#ffc5ac",
    logoPath: "/images/vendors/ez.webp",
    logoShape: "wordmark",
    logoBackground: "#111827",
  },
  {
    id: "glacier",
    name: "Glacier Aminos",
    shortName: "GA",
    url: "https://glacieraminos.shop",
    location: "United States",
    shipsTo: "US",
    coaLabel: "Batch COAs",
    testingNote: "Vendor publishes batch references and analytical test dates.",
    partner: false,
    partnerStatus: partnerPrograms.glacier.status,
    market: "us",
    countryServed: "United States",
    currency: "USD",
    documentationUrl: "https://glacieraminos.shop/",
    profileSummary:
      "Several vendor-hosted laboratory PDFs are public, but every strength must be matched independently.",
    lastReviewedAt: "2026-08-02",
    color: "#b8e8df",
    logoPath: "/images/vendors/glacier.png",
    logoShape: "mark",
    logoBackground: "#ffffff",
  },
  {
    id: "nura",
    name: "Nura Peptide",
    shortName: "NP",
    url: "https://nurapeptide.com",
    location: "United States",
    shipsTo: "US",
    coaLabel: "COA library",
    testingNote: "Vendor links to a catalog-level certificate library.",
    partner: false,
    partnerStatus: partnerPrograms.nura.status,
    market: "us",
    countryServed: "United States",
    currency: "USD",
    documentationUrl: "https://nurapeptide.com/coa-library/",
    profileSummary:
      "Product pages link to a COA library; PeptideStat records a batch match only when the report is identifiable.",
    lastReviewedAt: "2026-08-02",
    color: "#ead8ff",
    logoPath: "/images/vendors/nura.png",
    logoShape: "wordmark",
    logoBackground: "#ffffff",
  },
  {
    id: "nova",
    name: "NOVA Labs",
    shortName: "NV",
    url: getNovaReferralUrl(),
    location: "Dubai, United Arab Emirates",
    shipsTo: "UAE & GCC",
    coaLabel: "Batch COAs",
    testingNote:
      "Vendor publishes batch identifiers, test dates and product-linked third-party reports.",
    code: partnerPrograms.nova.code,
    partner: true,
    partnerStatus: partnerPrograms.nova.status,
    market: "uae-gcc",
    countryServed: "United Arab Emirates & GCC",
    currency: "AED",
    documentationUrl: "https://www.nova-biolabs.com/lab-results/",
    profileSummary:
      "Dubai-based regional vendor tracked in AED with UAE/GCC delivery and product-linked batch documentation.",
    lastReviewedAt: "2026-08-03",
    color: "#f7d36f",
    logoPath: "/images/vendors/nova.png",
    logoShape: "wordmark",
    logoBackground: "#ffffff",
  },
] as const;

const baselineMarketListings: readonly MarketListing[] = [
  {
    id: "bpc-ascension-10",
    compound: "BPC-157",
    compoundSlug: "bpc-157",
    vendorId: "ascension",
    productLabel: "BPC-157 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 49,
    href: getAscensionBuyUrl("bpc-157", "compare_bpc_157"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "bpc-ion-20",
    compound: "BPC-157",
    compoundSlug: "bpc-157",
    vendorId: "ion",
    productLabel: "BPC-157 20mg",
    amount: 20,
    unit: "mg",
    listPrice: 85,
    href: "https://ionpeptide.com",
    stock: "unknown",
    coa: "product-level",
    checkedAt: "2026-08-02",
  },
  {
    id: "bpc-ez-10",
    compound: "BPC-157",
    compoundSlug: "bpc-157",
    vendorId: "ez",
    productLabel: "BPC-157 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 44,
    href: "https://ezpeptides.com",
    stock: "unknown",
    coa: "public-library",
    checkedAt: "2026-08-02",
  },
  {
    id: "bpc-glacier-20",
    compound: "BPC-157",
    compoundSlug: "bpc-157",
    vendorId: "glacier",
    productLabel: "BPC-157 20mg",
    amount: 20,
    unit: "mg",
    listPrice: 79.99,
    href: "https://glacieraminos.shop",
    stock: "unknown",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "ghk-ascension-100",
    compound: "GHK-Cu",
    compoundSlug: "ghk-cu",
    vendorId: "ascension",
    productLabel: "GHK-Cu 100mg",
    amount: 100,
    unit: "mg",
    listPrice: 65,
    href: getAscensionBuyUrl("ghk-cu", "compare_ghk_cu"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "ghk-glacier-100",
    compound: "GHK-Cu",
    compoundSlug: "ghk-cu",
    vendorId: "glacier",
    productLabel: "GHK-Cu 100mg",
    amount: 100,
    unit: "mg",
    listPrice: 57.94,
    href: "https://glacieraminos.shop/product/ghk-cu/",
    stock: "unknown",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "ghk-ion-100",
    compound: "GHK-Cu",
    compoundSlug: "ghk-cu",
    vendorId: "ion",
    productLabel: "GHK-Cu 100mg",
    amount: 100,
    unit: "mg",
    listPrice: 45,
    href: "https://ionpeptide.com",
    stock: "unknown",
    coa: "product-level",
    checkedAt: "2026-08-02",
  },
  {
    id: "ghk-ez-100",
    compound: "GHK-Cu",
    compoundSlug: "ghk-cu",
    vendorId: "ez",
    productLabel: "GHK-Cu 100mg",
    amount: 100,
    unit: "mg",
    listPrice: 53,
    href: "https://ezpeptides.com",
    stock: "unknown",
    coa: "public-library",
    checkedAt: "2026-08-02",
  },
  {
    id: "ghk-nura-100",
    compound: "GHK-Cu",
    compoundSlug: "ghk-cu",
    vendorId: "nura",
    productLabel: "GHK-Cu 100mg",
    amount: 100,
    unit: "mg",
    listPrice: 55,
    href: "https://nurapeptide.com",
    stock: "unknown",
    coa: "public-library",
    checkedAt: "2026-08-02",
  },
  {
    id: "ipa-ascension-5",
    compound: "Ipamorelin",
    compoundSlug: "ipamorelin",
    vendorId: "ascension",
    productLabel: "Ipamorelin 5mg",
    amount: 5,
    unit: "mg",
    listPrice: 44,
    href: getAscensionBuyUrl("ipamorelin", "compare_ipamorelin"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "ipa-ion-10",
    compound: "Ipamorelin",
    compoundSlug: "ipamorelin",
    vendorId: "ion",
    productLabel: "Ipamorelin 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 42,
    href: "https://ionpeptide.com",
    stock: "unknown",
    coa: "product-level",
    checkedAt: "2026-08-02",
  },
  {
    id: "ipa-glacier-10",
    compound: "Ipamorelin",
    compoundSlug: "ipamorelin",
    vendorId: "glacier",
    productLabel: "Ipamorelin 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 49.99,
    href: "https://glacieraminos.shop",
    stock: "unknown",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "reta-ascension-10",
    compound: "Retatrutide",
    compoundSlug: "retatrutide",
    vendorId: "ascension",
    productLabel: "R-10 research listing",
    amount: 10,
    unit: "mg",
    listPrice: 90,
    href: getAscensionBuyUrl("retatrutide", "compare_retatrutide"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "reta-nura-12",
    compound: "Retatrutide",
    compoundSlug: "retatrutide",
    vendorId: "nura",
    productLabel: "GLP-3R 12mg",
    amount: 12,
    unit: "mg",
    listPrice: 83,
    href: "https://nurapeptide.com/product/glp-3r/",
    stock: "unknown",
    coa: "public-library",
    checkedAt: "2026-08-02",
  },
  {
    id: "reta-ez-240",
    compound: "Retatrutide",
    compoundSlug: "retatrutide",
    vendorId: "ez",
    productLabel: "Retatrutide 240mg kit",
    amount: 240,
    unit: "mg",
    listPrice: 738,
    href: "https://ezpeptides.com",
    stock: "unknown",
    coa: "public-library",
    checkedAt: "2026-08-02",
  },
  {
    id: "cjc-ascension-10",
    compound: "CJC-1295",
    compoundSlug: "cjc-1295",
    vendorId: "ascension",
    productLabel: "CJC-1295 no DAC 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 73,
    href: getAscensionBuyUrl("cjc-1295", "compare_cjc_1295"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "cjc-ion-10",
    compound: "CJC-1295",
    compoundSlug: "cjc-1295",
    vendorId: "ion",
    productLabel: "CJC-1295 no DAC 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 49,
    href: "https://ionpeptide.com",
    stock: "unknown",
    coa: "product-level",
    checkedAt: "2026-08-02",
  },
  {
    id: "cjc-glacier-10",
    compound: "CJC-1295",
    compoundSlug: "cjc-1295",
    vendorId: "glacier",
    productLabel: "CJC-1295 no DAC 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 65.99,
    href: "https://glacieraminos.shop",
    stock: "unknown",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "bpc-nova-10",
    compound: "BPC-157",
    compoundSlug: "bpc-157",
    vendorId: "nova",
    productLabel: "BPC-157 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 240,
    currency: "AED",
    href: getNovaReferralUrl("/shop/peptide-vials/bpc-157/"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "ghk-nova-50",
    compound: "GHK-Cu",
    compoundSlug: "ghk-cu",
    vendorId: "nova",
    productLabel: "GHK-Cu 50mg",
    amount: 50,
    unit: "mg",
    listPrice: 190,
    currency: "AED",
    href: getNovaReferralUrl("/shop/peptide-vials/ghk-cu/"),
    stock: "unknown",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "ipa-nova-10",
    compound: "Ipamorelin",
    compoundSlug: "ipamorelin",
    vendorId: "nova",
    productLabel: "Ipamorelin 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 250,
    currency: "AED",
    href: getNovaReferralUrl("/shop/peptide-vials/ipamorelin/"),
    stock: "unknown",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "reta-nova-10",
    compound: "Retatrutide",
    compoundSlug: "retatrutide",
    vendorId: "nova",
    productLabel: "GLP-3 (RT) 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 390,
    currency: "AED",
    href: getNovaReferralUrl("/shop/peptide-vials/glp-3-reta/"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
  {
    id: "cjc-nova-10",
    compound: "CJC-1295",
    compoundSlug: "cjc-1295",
    vendorId: "nova",
    productLabel: "CJC-1295 no DAC 10mg",
    amount: 10,
    unit: "mg",
    listPrice: 270,
    currency: "AED",
    href: getNovaReferralUrl("/shop/peptide-vials/cjc-1295-no-dac/"),
    stock: "in-stock",
    coa: "batch-specific",
    checkedAt: "2026-08-02",
  },
] as const;

export const marketListings: readonly MarketListing[] = [
  ...baselineMarketListings,
  ...expandedMarketListings,
];

const curatedListingEvidence: Readonly<Record<string, ListingEvidence>> = {
  "bpc-ascension-10": {
    listingId: "bpc-ascension-10",
    sourceUrl: "https://ascensionpeptides.com/product/bpc-157-10mg/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "Single-vial price and batch details are visible on the product page.",
  },
  "bpc-ion-20": {
    listingId: "bpc-ion-20",
    sourceUrl: "https://ionpeptide.com/product/bpc-157-2/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "product-page-coa",
    sourceNote: "Variant price range and product-level COA area are visible on the product page.",
  },
  "bpc-ez-10": {
    listingId: "bpc-ez-10",
    sourceUrl: "https://ezpeptides.com/quantity/single/",
    priceSourceStatus: "catalog-snapshot",
    documentStatus: "vendor-claim",
    sourceNote: "The vendor catalog shows the single-vial price and states batch COAs are available.",
  },
  "bpc-glacier-20": {
    listingId: "bpc-glacier-20",
    sourceUrl: "https://glacieraminos.shop/",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "library-only",
    sourceNote: "Price snapshot needs a direct product-page recheck before publication.",
  },
  "ghk-ascension-100": {
    listingId: "ghk-ascension-100",
    sourceUrl: "https://ascensionpeptides.com/product/ghk-cu-100mg-3ml/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "Single-vial price and batch details are visible on the product page.",
  },
  "ghk-glacier-100": {
    listingId: "ghk-glacier-100",
    sourceUrl: "https://glacieraminos.shop/product/ghk-cu/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "product-page-coa",
    sourceNote: "Variant pricing is visible on the product page; report matching remains product-level.",
  },
  "ghk-ion-100": {
    listingId: "ghk-ion-100",
    sourceUrl: "https://ionpeptide.com",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "library-only",
    sourceNote: "Price snapshot needs a direct product-page recheck before publication.",
  },
  "ghk-ez-100": {
    listingId: "ghk-ez-100",
    sourceUrl: "https://ezpeptides.com/",
    priceSourceStatus: "catalog-snapshot",
    documentStatus: "vendor-claim",
    sourceNote: "The vendor homepage shows the product and price; a batch report is not yet matched.",
  },
  "ghk-nura-100": {
    listingId: "ghk-nura-100",
    sourceUrl: "https://nurapeptide.com",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "library-only",
    sourceNote: "Price snapshot needs a direct product-page recheck before publication.",
  },
  "ipa-ascension-5": {
    listingId: "ipa-ascension-5",
    sourceUrl: "https://ascensionpeptides.com/product/ipamorelin-5mg/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "Single-vial price and batch details are visible on the product page.",
  },
  "ipa-ion-10": {
    listingId: "ipa-ion-10",
    sourceUrl: "https://ionpeptide.com",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "library-only",
    sourceNote: "Price snapshot needs a direct product-page recheck before publication.",
  },
  "ipa-glacier-10": {
    listingId: "ipa-glacier-10",
    sourceUrl: "https://glacieraminos.shop",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "linked-batch-report",
    sourceNote: "A strength-matched lab PDF is linked; the price still needs a direct product-page source.",
  },
  "reta-ascension-10": {
    listingId: "reta-ascension-10",
    sourceUrl: "https://ascensionpeptides.com/product/r-10/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "Single-vial price and batch details are visible on the product page.",
  },
  "reta-nura-12": {
    listingId: "reta-nura-12",
    sourceUrl: "https://nurapeptide.com/product/glp-3r/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "library-only",
    sourceNote: "Product-page price is visible and the page links to a COA library.",
  },
  "reta-ez-240": {
    listingId: "reta-ez-240",
    sourceUrl: "https://ezpeptides.com",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "vendor-claim",
    sourceNote: "Kit price and exact configuration need a direct product-page recheck.",
  },
  "cjc-ascension-10": {
    listingId: "cjc-ascension-10",
    sourceUrl: "https://ascensionpeptides.com/product/cjc-1295-no-dac-10mg/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "Single-vial price and batch details are visible on the product page.",
  },
  "cjc-ion-10": {
    listingId: "cjc-ion-10",
    sourceUrl: "https://ionpeptide.com",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "library-only",
    sourceNote: "Price snapshot needs a direct product-page recheck before publication.",
  },
  "cjc-glacier-10": {
    listingId: "cjc-glacier-10",
    sourceUrl: "https://glacieraminos.shop",
    priceSourceStatus: "needs-deep-link",
    documentStatus: "library-only",
    sourceNote: "Price snapshot and matching strength report both need direct links.",
  },
  "bpc-nova-10": {
    listingId: "bpc-nova-10",
    sourceUrl: "https://www.nova-biolabs.com/shop/peptide-vials/bpc-157/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "AED single-vial price, batch identifier and report date are visible on the product page.",
  },
  "ghk-nova-50": {
    listingId: "ghk-nova-50",
    sourceUrl: "https://www.nova-biolabs.com/shop/peptide-vials/ghk-cu/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "AED single-vial price, batch identifier and report date are visible on the product page.",
  },
  "ipa-nova-10": {
    listingId: "ipa-nova-10",
    sourceUrl: "https://www.nova-biolabs.com/shop/peptide-vials/ipamorelin/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "AED single-vial price, batch identifier and report date are visible on the product page.",
  },
  "reta-nova-10": {
    listingId: "reta-nova-10",
    sourceUrl: "https://www.nova-biolabs.com/shop/peptide-vials/glp-3-reta/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "AED 10mg price, current batch and multiple report types are visible on the product page.",
  },
  "cjc-nova-10": {
    listingId: "cjc-nova-10",
    sourceUrl: "https://www.nova-biolabs.com/shop/peptide-vials/cjc-1295-no-dac/",
    priceSourceStatus: "direct-product-page",
    documentStatus: "linked-batch-report",
    sourceNote: "AED single-vial price, batch identifier and report date are visible on the product page.",
  },
};

const expandedEvidenceDefaults: Readonly<
  Record<
    VendorId,
    Pick<ListingEvidence, "documentStatus" | "sourceNote">
  >
> = {
  ascension: {
    documentStatus: "product-page-coa",
    sourceNote:
      "Current single-vial price and product-level certificate area were checked on the direct product page.",
  },
  ion: {
    documentStatus: "product-page-coa",
    sourceNote:
      "Current single-vial price and product-level testing area were checked on the direct product page.",
  },
  ez: {
    documentStatus: "library-only",
    sourceNote:
      "Current single-vial price was checked on the direct product page; documentation remains library-level.",
  },
  glacier: {
    documentStatus: "product-page-coa",
    sourceNote:
      "Current single-vial price was checked on the direct product page; report matching remains product-level.",
  },
  nura: {
    documentStatus: "library-only",
    sourceNote:
      "Current single-vial price was checked on the direct product page; the vendor links a separate COA library.",
  },
  nova: {
    documentStatus: "linked-batch-report",
    sourceNote:
      "AED single-vial price, current batch identifier and linked laboratory report are visible on the direct product page.",
  },
};

const removeTrackingParameters = (href: string) =>
  href
    .replace(/ref\/PEPTIDESDEFINED\/?/, "")
    .replace(/[?].*$/, "");

const expandedListingEvidence = Object.fromEntries(
  expandedMarketListings.map((listing) => {
    const defaults = expandedEvidenceDefaults[listing.vendorId];

    return [
      listing.id,
      {
        listingId: listing.id,
        sourceUrl: removeTrackingParameters(listing.href),
        priceSourceStatus: "direct-product-page",
        documentStatus: defaults.documentStatus,
        sourceNote: defaults.sourceNote,
      } satisfies ListingEvidence,
    ];
  }),
) as Record<string, ListingEvidence>;

export const listingEvidence: Readonly<Record<string, ListingEvidence>> = {
  ...curatedListingEvidence,
  ...expandedListingEvidence,
};

export const coaRecords: readonly CoaRecord[] = [
  {
    id: "asc-bpc-12-05260628",
    listingId: "bpc-ascension-10",
    vendorId: "ascension",
    compoundSlug: "bpc-157",
    productLabel: "BPC-157 10mg",
    lab: "Kovera Labs",
    batch: "12-05260628",
    reportDate: "2026-07-10",
    reportUrl: "https://ascensionpeptides.com/product/bpc-157-10mg/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-bpc-12-01260229",
    listingId: "bpc-ascension-10",
    vendorId: "ascension",
    compoundSlug: "bpc-157",
    productLabel: "BPC-157 10mg",
    lab: "MZ Biolabs",
    batch: "12-01260229",
    reportDate: "2026-03-06",
    reportUrl: "https://ascensionpeptides.com/product/bpc-157-10mg/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-ghk-16-05260628",
    listingId: "ghk-ascension-100",
    vendorId: "ascension",
    compoundSlug: "ghk-cu",
    productLabel: "GHK-Cu 100mg",
    lab: "Kovera Labs",
    batch: "16-05260628",
    reportDate: "2026-06-26",
    reportUrl: "https://ascensionpeptides.com/product/ghk-cu-100mg-3ml/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-ghk-16-01260229",
    listingId: "ghk-ascension-100",
    vendorId: "ascension",
    compoundSlug: "ghk-cu",
    productLabel: "GHK-Cu 100mg",
    lab: "MZ Biolabs",
    batch: "16-01260229",
    reportDate: "2026-02-06",
    reportUrl: "https://ascensionpeptides.com/product/ghk-cu-100mg-3ml/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-ipa-18-05260628",
    listingId: "ipa-ascension-5",
    vendorId: "ascension",
    compoundSlug: "ipamorelin",
    productLabel: "Ipamorelin 5mg",
    lab: "Kovera Labs",
    batch: "18-05260628",
    reportDate: "2026-05-26",
    reportUrl: "https://ascensionpeptides.com/product/ipamorelin-5mg/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-ipa-18-01260229",
    listingId: "ipa-ascension-5",
    vendorId: "ascension",
    compoundSlug: "ipamorelin",
    productLabel: "Ipamorelin 5mg",
    lab: "MZ Biolabs",
    batch: "18-01260229",
    reportDate: "2026-04-10",
    reportUrl: "https://ascensionpeptides.com/product/ipamorelin-5mg/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "glacier-ipa-2602110044",
    listingId: "ipa-glacier-10",
    vendorId: "glacier",
    compoundSlug: "ipamorelin",
    productLabel: "Ipamorelin 10mg",
    lab: "Freedom Diagnostics",
    batch: "IPA10GA-01",
    reportDate: "2026-02-12",
    reportUrl: "https://glacieraminos.shop/wp-content/uploads/2026/02/Glac2602110044.pdf",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted PDF reviewed for product name, lot, lab and report date only.",
  },
  {
    id: "asc-reta-03-05260628",
    listingId: "reta-ascension-10",
    vendorId: "ascension",
    compoundSlug: "retatrutide",
    productLabel: "R-10 10mg",
    lab: "Kovera Labs",
    batch: "03-05260628",
    reportDate: "2026-05-26",
    reportUrl: "https://ascensionpeptides.com/product/r-10/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-reta-03-01260229",
    listingId: "reta-ascension-10",
    vendorId: "ascension",
    compoundSlug: "retatrutide",
    productLabel: "R-10 10mg",
    lab: "MZ Biolabs",
    batch: "03-01260229",
    reportDate: "2026-02-06",
    reportUrl: "https://ascensionpeptides.com/product/r-10/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-cjc-60-05260628",
    listingId: "cjc-ascension-10",
    vendorId: "ascension",
    compoundSlug: "cjc-1295",
    productLabel: "CJC-1295 no DAC 10mg",
    lab: "Kovera Labs",
    batch: "60-05260628",
    reportDate: "2026-06-26",
    reportUrl: "https://ascensionpeptides.com/product/cjc-1295-no-dac-10mg/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "asc-cjc-60-03260429",
    listingId: "cjc-ascension-10",
    vendorId: "ascension",
    compoundSlug: "cjc-1295",
    productLabel: "CJC-1295 no DAC 10mg",
    lab: "MZ Biolabs",
    batch: "60-03260429",
    reportDate: "2026-03-24",
    reportUrl: "https://ascensionpeptides.com/product/cjc-1295-no-dac-10mg/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Vendor-hosted batch entry; chain of custody was not independently established by PeptideStat.",
  },
  {
    id: "nova-bpc-nvbp10-01042026",
    listingId: "bpc-nova-10",
    vendorId: "nova",
    compoundSlug: "bpc-157",
    productLabel: "BPC-157 10mg",
    lab: "Janoshik Analytical",
    batch: "NVBP10-01042026",
    reportDate: "2026-04-13",
    reportUrl: "https://www.nova-biolabs.com/shop/peptide-vials/bpc-157/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Product page links to the laboratory verification record; PeptideStat did not establish chain of custody.",
  },
  {
    id: "nova-ghk-nvcu50-01052026",
    listingId: "ghk-nova-50",
    vendorId: "nova",
    compoundSlug: "ghk-cu",
    productLabel: "GHK-Cu 50mg",
    lab: "Uzorak",
    batch: "NVCU50-01052026",
    reportDate: "2026-05-28",
    reportUrl: "https://www.nova-biolabs.com/shop/peptide-vials/ghk-cu/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Product page links to the laboratory verification record; PeptideStat did not establish chain of custody.",
  },
  {
    id: "nova-ipa-nvip10-01042026",
    listingId: "ipa-nova-10",
    vendorId: "nova",
    compoundSlug: "ipamorelin",
    productLabel: "Ipamorelin 10mg",
    lab: "Vendor-linked third-party lab",
    batch: "NVIP10-01042026",
    reportDate: "2026-04-13",
    reportUrl: "https://www.nova-biolabs.com/shop/peptide-vials/ipamorelin/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Product page links to a third-party report; PeptideStat did not establish chain of custody.",
  },
  {
    id: "nova-reta-nvrt10-01072026-lp06",
    listingId: "reta-nova-10",
    vendorId: "nova",
    compoundSlug: "retatrutide",
    productLabel: "GLP-3 (RT) 10mg",
    lab: "Janoshik Analytical",
    batch: "NVRT10-01072026-LP06",
    reportDate: "2026-07-08",
    reportUrl: "https://www.nova-biolabs.com/shop/peptide-vials/glp-3-reta/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Product page links purity, heavy-metals, endotoxin and sterility reports; PeptideStat did not establish chain of custody.",
  },
  {
    id: "nova-cjc-nvcjnd10-01042026",
    listingId: "cjc-nova-10",
    vendorId: "nova",
    compoundSlug: "cjc-1295",
    productLabel: "CJC-1295 no DAC 10mg",
    lab: "Vendor-linked third-party lab",
    batch: "NVCJND10-01042026",
    reportDate: "2026-04-13",
    reportUrl: "https://www.nova-biolabs.com/shop/peptide-vials/cjc-1295-no-dac/",
    match: "exact-listing",
    reviewedAt: "2026-08-02",
    note: "Product page links to a third-party report; PeptideStat did not establish chain of custody.",
  },
] as const;

const baselineCompoundProfiles: readonly CompoundProfile[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    comparisonNote: "Single-vial research listings normalized by stated milligrams.",
    researchHref: "/peptides/bpc-157",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    comparisonNote: "Copper-peptide listings compared by stated milligrams, not solution volume.",
    researchHref: "/peptides/ghk-cu-for-hair-growth",
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    comparisonNote: "Single-vial listings normalized by stated milligrams.",
    researchHref: "/peptides/ipamorelin-peptide",
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    comparisonNote: "Vendor naming differs; only clearly labeled triple-agonist research listings are grouped.",
    researchHref: "/peptides/retatrutide",
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    comparisonNote: "The current table is restricted to no-DAC listings.",
    researchHref: "/database/cjc-1295",
  },
] as const;

export const compoundProfiles: readonly CompoundProfile[] = [
  ...baselineCompoundProfiles,
  ...expandedCompoundProfiles,
];

export const vendorById = new Map(vendors.map((vendor) => [vendor.id, vendor]));

export const compoundOptions = compoundProfiles.map(({ slug, name }) => ({
  slug,
  name,
}));

export const compoundBySlug = new Map(
  compoundProfiles.map((compound) => [compound.slug, compound]),
);

export const marketRegions: readonly {
  id: MarketRegion;
  label: string;
  shortLabel: string;
  currency: MarketCurrency;
}[] = [
  {
    id: "us",
    label: "United States",
    shortLabel: "US",
    currency: "USD",
  },
  {
    id: "uae-gcc",
    label: "UAE & GCC",
    shortLabel: "UAE",
    currency: "AED",
  },
] as const;

export const documentStatusLabels: Readonly<Record<DocumentStatus, string>> = {
  "linked-batch-report": "Batch report linked",
  "product-page-coa": "Product-page COA",
  "library-only": "COA library only",
  "vendor-claim": "Vendor testing claim",
};

export const priceSourceStatusLabels: Readonly<
  Record<PriceSourceStatus, string>
> = {
  "direct-product-page": "Direct price source",
  "catalog-snapshot": "Catalog price source",
  "needs-deep-link": "Needs source recheck",
};

export function getListingEvidence(listing: MarketListing) {
  return listingEvidence[listing.id];
}

export function getCoasForListing(listingId: string) {
  return coaRecords.filter((record) => record.listingId === listingId);
}

export function getCoasForVendor(vendorId: VendorId) {
  return coaRecords.filter((record) => record.vendorId === vendorId);
}

export function getListingsForVendor(vendorId: VendorId) {
  return marketListings.filter((listing) => listing.vendorId === vendorId);
}

export function getListingsForCompound(compoundSlug: string) {
  return marketListings.filter(
    (listing) => listing.compoundSlug === compoundSlug,
  );
}

export function getEffectivePrice(listing: MarketListing) {
  const vendor = vendorById.get(listing.vendorId);
  const discount = vendor?.discountPercent ?? 0;
  return listing.listPrice * (1 - discount / 100);
}

export function getUnitPrice(listing: MarketListing) {
  return getEffectivePrice(listing) / listing.amount;
}

export function formatUsd(value: number) {
  return formatMoney(value, "USD");
}

export function formatMoney(value: number, currency: MarketCurrency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: value < 10 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getListingCurrency(listing: MarketListing) {
  return listing.currency ?? vendorById.get(listing.vendorId)?.currency ?? "USD";
}
