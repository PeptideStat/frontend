import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";
import { marketplaceUpdatedAt } from "@/lib/marketReport";

const title = "Peptide Market Data Reports";
const description =
  "Original PeptideStat reports built from dated vendor prices, source status, batch references, testing-documentation labels and regional coverage.";
const path = "/reports";

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function ReportsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path,
          dateModified: marketplaceUpdatedAt,
          items: [
            {
              name: "2026 Peptide Vendor Transparency Report",
              path: "/reports/peptide-vendor-transparency-2026",
            },
          ],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Market data reports", path },
        ])}
      />
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">
            Original market research
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Peptide market
            <span className="block text-lime">data reports.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
            Reproducible summaries built from the same source-linked listing and
            batch records used throughout PeptideStat.
          </p>
        </div>
      </section>
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/reports/peptide-vendor-transparency-2026"
            className="group flex min-h-[380px] flex-col rounded-2xl border border-line bg-paper p-7 shadow-card transition-colors hover:border-ink sm:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-lime px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-ink">
                2026 report
              </span>
              <span className="font-mono text-[10px] text-muted-soft">
                Updated {marketplaceUpdatedAt}
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-accent">
                Vendor transparency index
              </p>
              <h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.045em] text-ink sm:text-6xl">
                Prices, direct sources and batch-document coverage.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">
                Compare documentation coverage without converting it into a
                pay-to-win score. Includes a downloadable listing-level CSV.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
