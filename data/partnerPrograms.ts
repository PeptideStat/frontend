import {
  ascensionCouponCode,
  ascensionDiscountPercent,
  getAscensionShopUrl,
} from "@/data/ascensionLinks";
import {
  novaCouponCode,
  novaDiscountPercent,
  novaReferralUrl,
} from "@/data/novaLinks";

export type VendorId =
  | "ascension"
  | "ion"
  | "ez"
  | "glacier"
  | "nura"
  | "nova";
export type PartnerStatus = "active" | "pending" | "none";

export interface PartnerProgram {
  vendorId: VendorId;
  status: PartnerStatus;
  code?: string;
  discountPercent?: number;
  landingUrl: string;
  verifiedAt?: string;
  note: string;
}

/**
 * Public affiliate settings live here because codes and tracked destinations
 * are not secrets. When a new vendor approves PeptideStat, this is the only
 * file that needs its status, code, percentage and landing URL updated.
 */
export const partnerPrograms: Readonly<Record<VendorId, PartnerProgram>> = {
  ascension: {
    vendorId: "ascension",
    status: "active",
    code: ascensionCouponCode,
    discountPercent: ascensionDiscountPercent,
    landingUrl: getAscensionShopUrl("partner_directory"),
    verifiedAt: "2026-08-02",
    note: "Tracked PeptideStat partner link. Confirm eligibility and final savings at checkout.",
  },
  ion: {
    vendorId: "ion",
    status: "pending",
    landingUrl: "https://ionpeptide.com",
    note: "PeptideStat partner application pending; no site code is published yet.",
  },
  ez: {
    vendorId: "ez",
    status: "pending",
    landingUrl: "https://ezpeptides.com",
    note: "PeptideStat partner application pending; no site code is published yet.",
  },
  glacier: {
    vendorId: "glacier",
    status: "pending",
    landingUrl: "https://glacieraminos.shop",
    note: "PeptideStat partner application pending; no site code is published yet.",
  },
  nura: {
    vendorId: "nura",
    status: "pending",
    landingUrl: "https://nurapeptide.com",
    note: "PeptideStat partner application pending; no site code is published yet.",
  },
  nova: {
    vendorId: "nova",
    status: "active",
    code: novaCouponCode,
    discountPercent: novaDiscountPercent,
    landingUrl: novaReferralUrl,
    verifiedAt: "2026-08-03",
    note: "Vendor-provided PeptideStat coupon code for 10% off with a tracked referral link. Verify eligibility, exclusions and the final saving at checkout.",
  },
};

export const partnerStatusLabels: Readonly<Record<PartnerStatus, string>> = {
  active: "Active referral partner",
  pending: "Partner application pending",
  none: "Independent listing",
};
