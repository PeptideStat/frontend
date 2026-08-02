import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonExplorer } from "@/components/ComparisonExplorer";
import { JsonLd } from "@/components/JsonLd";
import {
  coaRecords,
  compoundBySlug,
  compoundProfiles,
  getListingEvidence,
  getListingsForCompound,
  vendorById,
} from "@/data/marketplace";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return compoundProfiles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const compound = compoundBySlug.get(slug);

  if (!compound) return {};

  return buildMetadata({
    title: `${compound.name} prices, COAs and discount codes`,
    description: `Compare current ${compound.name} research listings by vial price, normalized cost, source status, vendor-published COAs and PeptideStat discount codes.`,
    path: `/compare/${compound.slug}`,
  });
}

export default async function CompoundComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const compound = compoundBySlug.get(slug);
  if (!compound) notFound();

  const listings = getListingsForCompound(slug);
  const reports = coaRecords.filter((record) => record.compoundSlug === slug);
  const dateModified = [...listings]
    .map((listing) => listing.checkedAt)
    .sort()
    .at(-1);
  const sourcedListings = listings.filter(
    (listing) =>
      getListingEvidence(listing)?.priceSourceStatus !== "needs-deep-link",
  ).length;

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `${compound.name} price and COA comparison`,
          description: `Compare current ${compound.name} research listings by price, market, source status and vendor-published COA records.`,
          path: `/compare/${compound.slug}`,
          dateModified,
          items: listings.map((listing) => ({
            name: `${vendorById.get(listing.vendorId)?.name ?? listing.vendorId}: ${listing.productLabel}`,
            path: `/vendors/${listing.vendorId}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide vendors compared", path: "/compare" },
          { name: compound.name, path: `/compare/${compound.slug}` },
        ])}
      />
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            <Link href="/compare" className="hover:text-lime">
              Market comparison
            </Link>
            <span>·</span>
            <span className="text-lime">{compound.name}</span>
            <span>·</span>
            <span>checked 02 Aug 2026</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            {compound.name}
            <span className="block text-lime">price & COA comparison.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            {compound.comparisonNote} Commercial listings are shown for research
            comparison only, not as a product recommendation.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-px border-x border-line bg-line sm:grid-cols-4">
          {[
            ["Listings", String(listings.length)],
            ["Price sources", `${sourcedListings}/${listings.length}`],
            ["Batch records", String(reports.length)],
            ["Markets", "US + UAE/GCC"],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper px-5 py-7 sm:px-6">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-muted-soft">
                {label}
              </p>
              <p className="mt-2 font-mono text-2xl font-bold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <ComparisonExplorer initialCompound={compound.slug} lockCompound />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                    COA ledger
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
                    Recorded batch references.
                  </h2>
                </div>
                <Link
                  href="/market-methodology"
                  className="text-xs font-bold text-ink hover:text-accent"
                >
                  Read status definitions →
                </Link>
              </div>

              {reports.length ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-line bg-surface-2 text-[9px] font-black uppercase tracking-[0.12em] text-muted-soft">
                          <th className="px-5 py-3">Vendor / product</th>
                          <th className="px-4 py-3">Lab</th>
                          <th className="px-4 py-3">Batch</th>
                          <th className="px-4 py-3">Report date</th>
                          <th className="px-5 py-3 text-right">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map((record) => {
                          const vendor = vendorById.get(record.vendorId);
                          return (
                            <tr
                              key={record.id}
                              className="border-b border-line text-xs last:border-0"
                            >
                              <td className="px-5 py-4">
                                <Link
                                  href={`/vendors/${record.vendorId}`}
                                  className="font-bold text-ink hover:text-accent"
                                >
                                  {vendor?.name}
                                </Link>
                                <span className="mt-1 block text-[10px] text-muted">
                                  {record.productLabel}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-muted">{record.lab}</td>
                              <td className="px-4 py-4 font-mono text-ink">
                                {record.batch}
                              </td>
                              <td className="px-4 py-4 font-mono text-muted">
                                {record.reportDate}
                              </td>
                              <td className="px-5 py-4 text-right">
                                <a
                                  href={record.reportUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-ink hover:text-accent"
                                >
                                  Vendor source ↗
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="border-t border-line bg-surface-2 px-5 py-4 text-[10px] leading-5 text-muted">
                    PeptideStat records the vendor, product, lab, batch and report date.
                    This does not establish sample custody or independently verify the
                    material sold to a buyer.
                  </p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-paper p-7">
                  <p className="text-sm font-bold text-ink">No batch record matched yet.</p>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    Vendor library or testing claims may still be visible in the comparison
                    table; they are deliberately not promoted to batch status.
                  </p>
                </div>
              )}
            </div>

            <aside className="rounded-2xl bg-ink p-7 text-white sm:p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-lime">
                Research layer
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">
                The price table is not the science.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/55">
                Read the mechanism, evidence quality and limitations separately from
                vendor pricing and promotional claims.
              </p>
              <Link
                href={compound.researchHref}
                className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white"
              >
                Read the {compound.name} guide
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
