import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  datasetJsonLd,
} from "@/lib/seo";
import {
  marketplaceSummary,
  marketplaceUpdatedAt,
  vendorTransparencyRows,
} from "@/lib/marketReport";

const title = "2026 Peptide Vendor Transparency Report: COAs & Price Sources";
const description =
  "Original PeptideStat analysis of tracked vendor listings, direct price sources, batch-document coverage, named laboratories, markets and downloadable data.";
const path = "/reports/peptide-vendor-transparency-2026";
const downloadPath = `${path}/data`;

export const metadata: Metadata = buildMetadata({ title, description, path });

function percentage(value: number, total: number) {
  return total ? `${Math.round((value / total) * 100)}%` : "0%";
}

export default function VendorTransparencyReportPage() {
  return (
    <>
      <JsonLd
        data={datasetJsonLd({
          name: title,
          description,
          path,
          dateModified: marketplaceUpdatedAt,
          downloadPath,
          variables: [
            "Vendor",
            "Market",
            "Country served",
            "Compound",
            "List price",
            "Effective price",
            "Price per stated unit",
            "Price source status",
            "Documentation status",
            "Checked date",
          ],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Market reports", path: "/reports" },
          { name: "2026 vendor transparency report", path },
        ])}
      />

      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">
            Original PeptideStat dataset · updated {marketplaceUpdatedAt}
          </p>
          <h1 className="mt-5 max-w-6xl text-[clamp(3rem,6.5vw,6.4rem)] font-semibold leading-[0.91] tracking-[-0.063em] text-ink">
            2026 peptide vendor
            <span className="block text-accent">transparency report.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted sm:text-base">
            A reproducible view of source quality and documentation coverage
            across PeptideStat&apos;s current marketplace. This report measures
            what is publicly linked; it does not score product efficacy,
            sterility or suitability for human use.
          </p>
          <a
            href={downloadPath}
            className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-ink px-5 text-sm font-black text-white hover:bg-accent-dark"
          >
            Download listing data (CSV)
          </a>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl gap-px border-x border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Vendors", marketplaceSummary.vendors],
            ["Listings", marketplaceSummary.listings],
            ["Markets", marketplaceSummary.markets],
            ["Direct sources", marketplaceSummary.directPriceSources],
            ["Exact batches", marketplaceSummary.exactBatchRecords],
            ["Named labs", marketplaceSummary.namedLabs],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper px-5 py-7">
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-muted-soft">
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
          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                Vendor-level coverage
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                Documentation, not a star score.
              </h2>
              <div className="mt-7 overflow-x-auto rounded-2xl border border-line bg-paper shadow-card">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line bg-surface-2 text-[9px] font-black uppercase tracking-[0.12em] text-muted-soft">
                      <th className="px-5 py-4">Vendor</th>
                      <th className="px-4 py-4">Listings</th>
                      <th className="px-4 py-4">Direct price sources</th>
                      <th className="px-4 py-4">Batch-linked listings</th>
                      <th className="px-5 py-4">Batch records</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorTransparencyRows.map((row) => (
                      <tr
                        key={row.vendor.id}
                        className="border-b border-line text-xs last:border-0"
                      >
                        <td className="px-5 py-4">
                          <Link
                            href={`/vendors/${row.vendor.id}`}
                            className="font-bold text-ink hover:text-accent"
                          >
                            {row.vendor.name}
                          </Link>
                          <span className="mt-1 block text-[9px] text-muted">
                            {row.vendor.countryServed}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono text-ink">
                          {row.listings}
                        </td>
                        <td className="px-4 py-4 font-mono text-ink">
                          {row.directSources}{" "}
                          <span className="text-muted">
                            ({percentage(row.directSources, row.listings)})
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono text-ink">
                          {row.linkedBatchListings}{" "}
                          <span className="text-muted">
                            ({percentage(row.linkedBatchListings, row.listings)})
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono text-ink">
                          {row.reports}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="rounded-2xl bg-ink p-7 text-white sm:p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-lime">
                Reading the report
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                What the numbers mean.
              </h2>
              <div className="mt-6 space-y-5 text-xs leading-6 text-white/55">
                <p>
                  <strong className="text-white">Direct price source</strong>{" "}
                  means the recorded price came from a product page rather than
                  a homepage or unresolved catalog reference.
                </p>
                <p>
                  <strong className="text-white">Batch-linked listing</strong>{" "}
                  means PeptideStat matched the listing to a vendor-published
                  batch report or laboratory-verification destination.
                </p>
                <p>
                  <strong className="text-white">Batch record</strong> records
                  the vendor, product, lab label, batch and date. It does not
                  establish sample custody.
                </p>
              </div>
              <Link
                href="/market-methodology"
                className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white"
              >
                Read full definitions
              </Link>
            </aside>
          </div>

          <div className="mt-14 rounded-2xl border border-line bg-paper p-7 sm:p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
              Reuse and citation
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">
              Cite the date and the limitation.
            </h2>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-muted">
              Suggested citation: PeptideStat, “2026 Peptide Vendor
              Transparency Report,” updated {marketplaceUpdatedAt}. When using
              the data, retain the checked date and distinguish vendor-linked
              documentation from independent product verification.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
