import {
  coaRecords,
  getEffectivePrice,
  getListingCurrency,
  getListingEvidence,
  getUnitPrice,
  marketListings,
  vendorById,
  vendors,
} from "@/data/marketplace";

function maxIsoDate(values: string[]) {
  return values
    .filter(Boolean)
    .sort((a, b) => b.localeCompare(a))[0] ?? "2026-08-02";
}

export const marketplaceUpdatedAt = maxIsoDate([
  ...vendors.map((vendor) => vendor.lastReviewedAt),
  ...marketListings.map((listing) => listing.checkedAt),
  ...coaRecords.map((record) => record.reviewedAt),
]);

export const marketplaceSummary = {
  vendors: vendors.length,
  listings: marketListings.length,
  markets: new Set(vendors.map((vendor) => vendor.market)).size,
  exactBatchRecords: coaRecords.filter(
    (record) => record.match === "exact-listing",
  ).length,
  directPriceSources: marketListings.filter(
    (listing) =>
      getListingEvidence(listing)?.priceSourceStatus === "direct-product-page",
  ).length,
  linkedBatchListings: marketListings.filter(
    (listing) =>
      getListingEvidence(listing)?.documentStatus === "linked-batch-report",
  ).length,
  namedLabs: new Set(
    coaRecords
      .map((record) => record.lab)
      .filter((lab) => !lab.toLowerCase().startsWith("vendor-linked")),
  ).size,
};

export const vendorTransparencyRows = vendors.map((vendor) => {
  const listings = marketListings.filter(
    (listing) => listing.vendorId === vendor.id,
  );
  const directSources = listings.filter(
    (listing) =>
      getListingEvidence(listing)?.priceSourceStatus === "direct-product-page",
  ).length;
  const linkedBatchListings = listings.filter(
    (listing) =>
      getListingEvidence(listing)?.documentStatus === "linked-batch-report",
  ).length;
  const reports = coaRecords.filter((record) => record.vendorId === vendor.id);

  return {
    vendor,
    listings: listings.length,
    directSources,
    linkedBatchListings,
    reports: reports.length,
  };
});

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function buildMarketplaceCsv() {
  const header = [
    "listing_id",
    "vendor",
    "market",
    "country_served",
    "compound",
    "product_label",
    "amount",
    "unit",
    "currency",
    "list_price",
    "effective_price",
    "price_per_unit",
    "checked_at",
    "price_source_status",
    "document_status",
    "source_url",
  ];

  const rows = marketListings.map((listing) => {
    const vendor = vendorById.get(listing.vendorId);
    const evidence = getListingEvidence(listing);
    return [
      listing.id,
      vendor?.name ?? listing.vendorId,
      vendor?.market ?? "",
      vendor?.countryServed ?? "",
      listing.compound,
      listing.productLabel,
      listing.amount,
      listing.unit,
      getListingCurrency(listing),
      listing.listPrice.toFixed(2),
      getEffectivePrice(listing).toFixed(2),
      getUnitPrice(listing).toFixed(4),
      listing.checkedAt,
      evidence?.priceSourceStatus ?? "",
      evidence?.documentStatus ?? "",
      evidence?.sourceUrl ?? "",
    ].map(csvCell);
  });

  return [header.map(csvCell), ...rows]
    .map((row) => row.join(","))
    .join("\n");
}
