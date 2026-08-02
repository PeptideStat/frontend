import type { VendorId } from "@/data/partnerPrograms";

export const vendorReviewPaths: Readonly<
  Partial<Record<VendorId, string>>
> = {
  ascension: "/peptides/ascension-peptides-review",
  nova: "/peptides/nova-labs-uae-review",
};

export function getVendorReviewPath(vendorId: VendorId) {
  return vendorReviewPaths[vendorId];
}
