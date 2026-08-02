import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonExplorer } from "@/components/ComparisonExplorer";
import { marketListings, vendors } from "@/data/marketplace";
import { buildMetadata } from "@/lib/seo";

const title = "Peptide Vendors Compared (2026): Prices, COAs & Codes";
const description =
  "Compare research peptide vendors by price per milligram, country served, published COAs and current discount codes. See how each listing was checked.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            <span className="text-lime">Market comparison</span>
            <span>·</span>
            <span>{vendors.length} vendors</span>
            <span>·</span>
            <span>{marketListings.length} listings</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
            Research peptide vendors
            <span className="block text-lime">compared.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Compare prices, published COAs, countries served and active discount
            codes. Choose a market, then sort listings by final price or normalized
            price per milligram.
          </p>
          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-lime">
            Compare the listing, not the headline discount.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <ComparisonExplorer />

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Prices", "Displayed prices are snapshots and may change before checkout."],
              ["Testing", "A COA badge means the vendor publishes documentation; PeptideStat has not tested the sample."],
              ["Research", "Listings are for laboratory research and are not medical recommendations."],
            ].map(([heading, copy]) => (
              <article key={heading} className="rounded-xl border border-line bg-paper p-5">
                <h2 className="text-sm font-bold text-ink">{heading}</h2>
                <p className="mt-2 text-[11px] leading-5 text-muted">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 text-right">
            <Link href="/market-methodology" className="text-xs font-bold text-ink hover:text-accent">
              Read price and COA status definitions →
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-accent-dark">Need the science first?</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink">Read the evidence before opening a listing.</h2>
            </div>
            <Link href="/peptides" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-ink px-5 text-sm font-bold text-white hover:bg-accent-dark">
              Browse research guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
