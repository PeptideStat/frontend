import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLinkIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { LabTestExplorer } from "@/components/LabTestExplorer";
import { VendorLogo } from "@/components/VendorLogo";
import { vendorById } from "@/data/marketplace";
import {
  labTestRecords,
  labTestSummary,
  labTestVendorCoverage,
  type VendorSourceStatus,
} from "@/lib/labTests";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  datasetJsonLd,
} from "@/lib/seo";

const title = "Peptide COA & Lab Test Ledger (2026)";
const description =
  "Search source-linked peptide COAs and vendor-presented lab reports by compound, vendor, batch, laboratory, test date and reported result.";
const path = "/lab-tests";

export const metadata: Metadata = {
  ...buildMetadata({ title, description, path }),
  alternates: {
    canonical: absoluteUrl(path),
    types: {
      "application/json": absoluteUrl("/lab-tests/data"),
      "text/csv": absoluteUrl("/lab-tests/data.csv"),
    },
  },
};

function sourceStatusClasses(status: VendorSourceStatus) {
  if (status === "batch-records-indexed") {
    return "border-accent/25 bg-accent-soft text-accent-dark";
  }

  if (status === "access-gated") {
    return "border-coral/30 bg-tint-rose text-tint-rose-ink";
  }

  return "border-tint-amber-ink/20 bg-tint-amber text-tint-amber-ink";
}

export default function LabTestsPage() {
  return (
    <>
      <JsonLd
        data={datasetJsonLd({
          name: title,
          description,
          path,
          dateModified: marketplaceUpdatedAt,
          downloadPath: "/lab-tests/data.csv",
          variables: [
            "Vendor",
            "Compound",
            "Product label",
            "Batch identifier",
            "Laboratory label",
            "Report date",
            "Reported purity",
            "Reported net content",
            "Reported analytical checks",
            "Evidence type",
            "Chain-of-custody status",
            "Source URL",
          ],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide COA and lab-test ledger", path },
        ])}
      />

      <section className="overflow-hidden border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">
                Open COA ledger · updated {marketplaceUpdatedAt}
              </p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.89] tracking-[-0.067em]">
                Peptide COAs,
                <span className="block text-lime">
                  without the certainty theater.
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Search batch identifiers, labs, test dates and reported results
                from vendor-presented documents. Every row links back to its
                source and states the evidence limit plainly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#ledger"
                  className="inline-flex min-h-11 items-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white"
                >
                  Browse the ledger
                </a>
                <a
                  href="/lab-tests/data.csv"
                  download
                  className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 text-sm font-bold text-white hover:border-white"
                >
                  Download CSV
                </a>
                <a
                  href="/lab-tests/data"
                  type="application/json"
                  rel="alternate"
                  className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 text-sm font-bold text-white hover:border-white"
                >
                  View JSON
                </a>
              </div>
            </div>

            <aside className="border-l border-white/15 pl-6 sm:pl-8">
              <p className="text-[9px] font-black uppercase tracking-[0.17em] text-white/35">
                How to read a row
              </p>
              <ol className="mt-6 space-y-5">
                {[
                  ["01", "Match", "Does the named product and batch line up?"],
                  ["02", "Result", "What did the linked document actually report?"],
                  ["03", "Custody", "Who controlled the sample before the test?"],
                ].map(([number, label, copy]) => (
                  <li key={number} className="grid grid-cols-[34px_1fr] gap-3">
                    <span className="font-mono text-xs font-bold text-lime">
                      {number}
                    </span>
                    <span>
                      <strong className="block text-sm text-white">{label}</strong>
                      <span className="mt-1 block text-[11px] leading-5 text-white/45">
                        {copy}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-7 border-t border-white/15 pt-5 text-[10px] font-bold uppercase leading-5 tracking-[0.12em] text-lime">
                Documents, not guarantees.
              </p>
            </aside>
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Batch records", labTestSummary.records, "Matched and source-linked"],
              ["Compounds", labTestSummary.compounds, "With indexed batch rows"],
              ["Vendor sources", labTestSummary.vendorSources, "Indexed, queued or gated"],
              ["Custody-confirmed", labTestSummary.chainOfCustodyConfirmed, "By PeptideStat"],
            ].map(([label, value, note]) => (
              <div
                key={label}
                className="bg-ink py-6 sm:px-6 sm:first:pl-0"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.13em] text-white/35">
                  {label}
                </p>
                <p className="mt-2 font-mono text-3xl font-bold text-white">
                  {value}
                </p>
                <p className="mt-1 text-[9px] text-white/35">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                Batch record explorer
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">
                Open the source. Check the batch.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                {labTestSummary.transcribedResults} records currently include
                transcribed quantitative results. The remaining source-linked
                records stay visible without invented values.
              </p>
            </div>
            <Link
              href="/peptides/peptide-coa-guide"
              className="text-xs font-bold text-ink hover:text-accent"
            >
              How to read a peptide COA →
            </Link>
          </div>

          <LabTestExplorer records={labTestRecords} />

          <div className="mt-5 flex flex-col gap-2 text-[10px] leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              “Reported pass” reproduces the linked source&apos;s presentation; it
              is not a PeptideStat test conclusion.
            </p>
            <Link
              href="/market-methodology"
              className="shrink-0 font-bold text-ink hover:text-accent"
            >
              Read evidence definitions →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                Source coverage
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
                All six tracked vendors stay in view.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
                A public library, a batch-matched record and a testing claim are
                not the same thing. Sources with zero indexed rows remain visible
                so gaps cannot disappear from the headline count.
              </p>
              <div className="mt-7 rounded-xl border border-line bg-surface-2 p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-muted-soft">
                  Current extraction state
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-ink">
                  {labTestSummary.vendorsIndexed} / {labTestSummary.vendorSources}
                </p>
                <p className="mt-2 text-[11px] leading-5 text-muted">
                  vendors currently contribute counted batch records
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {labTestVendorCoverage.map((coverage) => {
                const vendor = vendorById.get(coverage.vendorId);
                if (!vendor) return null;

                return (
                  <article
                    key={coverage.vendorId}
                    data-vendor-source="true"
                    data-vendor-id={coverage.vendorId}
                    data-source-status={coverage.status}
                    data-indexed-record-count={coverage.recordCount}
                    data-reviewed-at={coverage.lastReviewedAt}
                    className="flex min-h-[270px] flex-col rounded-2xl border border-line bg-surface-2 p-5 shadow-card sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <VendorLogo vendor={vendor} size="sm" />
                      <span
                        className={`rounded-full border px-2.5 py-1 text-right text-[9px] font-black uppercase leading-4 tracking-[0.08em] ${sourceStatusClasses(coverage.status)}`}
                      >
                        {coverage.statusLabel}
                      </span>
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-4 border-b border-line pb-5">
                      <div>
                        <h3 className="text-lg font-bold text-ink">
                          {coverage.vendorName}
                        </h3>
                        <p className="mt-1 text-[9px] text-muted">
                          {coverage.countryServed}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-3xl font-bold text-ink">
                          {coverage.recordCount}
                        </p>
                        <p className="text-[9px] text-muted-soft">indexed rows</p>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-[11px] leading-5 text-muted">
                      {coverage.note}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/vendors/${coverage.vendorId}`}
                        className="text-[10px] font-bold text-ink hover:text-accent"
                      >
                        Vendor profile →
                      </Link>
                      <a
                        href={coverage.sourceUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-ink hover:text-accent"
                      >
                        Open source
                        <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {[
              [
                "01",
                "Batch match",
                "A counted row needs an identifiable product, vendor, batch or lot, report date and source destination.",
              ],
              [
                "02",
                "Reported result",
                "Purity, content and pass labels are transcribed only when the linked source exposes them clearly.",
              ],
              [
                "03",
                "Evidence limit",
                "Vendor-presented reports remain vendor-presented. PeptideStat does not imply independent sample custody.",
              ],
            ].map(([number, heading, copy]) => (
              <article key={number} className="min-h-[270px] bg-paper p-6 sm:p-8">
                <span className="font-mono text-xs font-bold text-accent">
                  {number}
                </span>
                <h2 className="mt-16 text-2xl font-semibold tracking-[-0.04em] text-ink">
                  {heading}
                </h2>
                <p className="mt-4 text-xs leading-6 text-muted">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-8 rounded-2xl bg-ink p-7 text-white sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-lime">
                The line we do not cross
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A clean chromatogram is not a blank check.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">
                Purity, identity, amount, sterility and endotoxin testing answer
                different questions. A report can be useful without proving what
                is in a future order or whether a product is suitable for human use.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/peptides/peptide-coa-guide"
                className="inline-flex min-h-11 items-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white"
              >
                Read the COA guide
              </Link>
              <Link
                href="/reports/peptide-vendor-transparency-2026"
                className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 text-sm font-bold text-white hover:border-white"
              >
                View transparency report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
