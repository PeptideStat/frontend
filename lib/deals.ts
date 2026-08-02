import { vendors } from "@/data/marketplace";
import {
  partnerPrograms,
  type VendorId,
} from "@/data/partnerPrograms";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import { absoluteUrl } from "@/lib/seo";

export type VendorDealStatus =
  | "code-active"
  | "referral-active"
  | "pending"
  | "watching";

export interface VendorDealRecord {
  vendorId: VendorId;
  vendorName: string;
  vendorWebsiteUrl: string;
  vendorProfileUrl: string;
  market: string;
  countryServed: string;
  status: VendorDealStatus;
  statusLabel: string;
  code: string | null;
  discountPercent: number | null;
  lastCheckedAt: string;
  offerUrl: string;
  affiliate: boolean;
  note: string;
}

function getDealStatus(
  code: string | null,
  partnerStatus: "active" | "pending" | "none",
): Pick<VendorDealRecord, "status" | "statusLabel"> {
  if (code) {
    return {
      status: "code-active",
      statusLabel: "Active discount code",
    };
  }

  if (partnerStatus === "active") {
    return {
      status: "referral-active",
      statusLabel: "Active referral; no public discount code",
    };
  }

  if (partnerStatus === "pending") {
    return {
      status: "pending",
      statusLabel: "Partner application pending; no public discount code",
    };
  }

  return {
    status: "watching",
    statusLabel: "No public discount code",
  };
}

export const vendorDeals: readonly VendorDealRecord[] = vendors.map((vendor) => {
  const program = partnerPrograms[vendor.id];
  const code = vendor.code ?? program.code ?? null;
  const discountPercent =
    vendor.discountPercent ?? program.discountPercent ?? null;
  const status = getDealStatus(code, program.status);

  return {
    vendorId: vendor.id,
    vendorName: vendor.name,
    vendorWebsiteUrl: new URL(program.landingUrl).origin,
    vendorProfileUrl: absoluteUrl(`/vendors/${vendor.id}`),
    market: vendor.market,
    countryServed: vendor.countryServed,
    status: status.status,
    statusLabel: status.statusLabel,
    code,
    discountPercent,
    lastCheckedAt: program.verifiedAt ?? vendor.lastReviewedAt,
    offerUrl: program.landingUrl,
    affiliate: vendor.partner,
    note: program.note,
  };
});

export const dealsFeed = {
  schemaVersion: 1,
  name: "PeptideStat vendor discount code directory",
  description:
    "Current discount-code, referral and application status for every vendor tracked by PeptideStat.",
  url: absoluteUrl("/deals"),
  dataUrl: absoluteUrl("/deals/data"),
  dateModified: marketplaceUpdatedAt,
  vendors: vendorDeals,
} as const;

export function dealsOfferCatalogJsonLd() {
  const activeCodeDeals = vendorDeals.filter((deal) => deal.code);

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Current peptide vendor discount codes",
    description:
      "Verified public discount codes currently listed by PeptideStat.",
    url: absoluteUrl("/deals"),
    numberOfItems: activeCodeDeals.length,
    itemListElement: activeCodeDeals.map((deal, index) => {
      const discountText =
        deal.discountPercent === null
          ? "Current discount"
          : `${deal.discountPercent}% off`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          identifier: deal.code,
          name: `${discountText} ${deal.vendorName} with code ${deal.code}`,
          description: `${discountText} at ${deal.vendorName} with discount code ${deal.code}. Last checked ${deal.lastCheckedAt}; verify the final saving at checkout.`,
          category: "Discount code",
          url: deal.offerUrl,
          seller: {
            "@type": "Organization",
            name: deal.vendorName,
            url: deal.vendorWebsiteUrl,
          },
          itemOffered: {
            "@type": "Product",
            name: `${deal.vendorName} research-use catalog`,
            category: "Research-use peptide catalog",
          },
        },
      };
    }),
  };
}
