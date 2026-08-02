import Link from "next/link";
import { ComparisonExplorer } from "@/components/ComparisonExplorer";
import { VendorLogo } from "@/components/VendorLogo";
import {
  coaRecords,
  getListingEvidence,
  marketListings,
  type MarketRegion,
  vendors,
} from "@/data/marketplace";
import { getVendorReviewPath } from "@/data/vendorReviews";

export function RegionalVendorDirectory({
  market,
  eyebrow,
  heading,
  description,
  deliveryNote,
}: {
  market: MarketRegion;
  eyebrow: string;
  heading: string;
  description: string;
  deliveryNote: string;
}) {
  const regionalVendors = vendors.filter((vendor) => vendor.market === market);
  const vendorIds = new Set(regionalVendors.map((vendor) => vendor.id));
  const listings = marketListings.filter((listing) =>
    vendorIds.has(listing.vendorId),
  );
  const reports = coaRecords.filter((record) => vendorIds.has(record.vendorId));
  const directSources = listings.filter(
    (listing) =>
      getListingEvidence(listing)?.priceSourceStatus === "direct-product-page",
  ).length;

  return (
    <>
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.1rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            {heading}
          </h1>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
            {description}
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl gap-px border-x border-line bg-line sm:grid-cols-4">
          {[
            ["Vendors tracked", regionalVendors.length],
            ["Listings tracked", listings.length],
            ["Direct price sources", directSources],
            ["Batch records", reports.length],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper px-5 py-7 sm:px-6">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-muted-soft">
                {label}
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-ink">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {regionalVendors.map((vendor) => {
              const vendorListings = listings.filter(
                (listing) => listing.vendorId === vendor.id,
              );
              const vendorReports = reports.filter(
                (record) => record.vendorId === vendor.id,
              );
              const reviewPath = getVendorReviewPath(vendor.id);

              return (
                <article
                  key={vendor.id}
                  className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <VendorLogo vendor={vendor} size="md" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-accent">
                          {vendor.countryServed}
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-ink">
                          {vendor.name}
                        </h2>
                      </div>
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-muted">
                      {vendor.currency}
                    </span>
                  </div>

                  <p className="mt-7 text-sm leading-7 text-muted">
                    {vendor.profileSummary}
                  </p>
                  <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                    {[
                      ["Listings", vendorListings.length],
                      ["Batches", vendorReports.length],
                      ["Updated", vendor.lastReviewedAt],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-surface-2 p-4">
                        <dt className="text-[8px] font-black uppercase tracking-[0.12em] text-muted-soft">
                          {label}
                        </dt>
                        <dd className="mt-2 font-mono text-xs font-bold text-ink">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/vendors/${vendor.id}`}
                      className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent-dark"
                    >
                      Open vendor review
                    </Link>
                    {reviewPath ? (
                      <Link
                        href={reviewPath}
                        className="inline-flex min-h-10 items-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink"
                      >
                        Read full audit
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12">
            <div className="mb-6 max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                Regional price table
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                Compare like with like.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {deliveryNote} Prices exclude delivery, tax and duties unless
                explicitly stated by the vendor.
              </p>
            </div>
            <ComparisonExplorer
              initialMarket={market}
              lockMarket
            />
          </div>
        </div>
      </section>
    </>
  );
}
