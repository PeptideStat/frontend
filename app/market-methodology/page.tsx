import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

const title = "Peptide price, COA and discount-code methodology";
const description =
  "How PeptideStat records vendor price snapshots, calculates code-adjusted estimates, classifies COA links and discloses partner relationships.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/market-methodology",
});

const evidenceStates = [
  {
    state: "Batch report linked",
    means:
      "PeptideStat recorded a vendor-hosted report or batch entry whose product name and strength match the listing.",
    doesNotMean:
      "PeptideStat bought or sampled the material, established chain of custody, or repeated the laboratory test.",
  },
  {
    state: "Product-page COA",
    means:
      "The product page contains a COA area or analytical document, but no batch record has been entered in the PeptideStat ledger.",
    doesNotMean:
      "The report necessarily matches inventory currently shipping.",
  },
  {
    state: "COA library only",
    means:
      "The vendor publishes a certificate library or archive that may contain relevant reports.",
    doesNotMean:
      "A report has been matched to this exact product, strength or lot.",
  },
  {
    state: "Vendor testing claim",
    means:
      "The vendor states that products or batches are tested.",
    doesNotMean:
      "PeptideStat found a public report for the listing.",
  },
] as const;

export default function MarketMethodologyPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">
            Market methodology · version 1.1 · reviewed 2026-08-08
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Four facts.
            <span className="block text-lime">Never one vague score.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Price, discount, documentation and independent verification answer different
            questions. PeptideStat keeps them separate so a promotional relationship
            cannot turn into an implied quality rating. This page is intentionally
            citable — use it when linking to how our market tables are built.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/reports/peptide-vendor-transparency-2026"
              className="inline-flex min-h-10 items-center rounded-lg bg-lime px-4 py-2 font-semibold text-ink"
            >
              2026 transparency report
            </Link>
            <Link
              href="/authors/peptidestat-editorial-team"
              className="inline-flex min-h-10 items-center rounded-lg border border-white/20 px-4 py-2 font-semibold text-white/85 hover:border-lime hover:text-lime"
            >
              Editorial process
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              [
                "01",
                "Price source",
                "A listed amount, product configuration, direct source URL and check date.",
              ],
              [
                "02",
                "Code state",
                "Active, pending or absent. The after-code number is always labeled as an estimate.",
              ],
              [
                "03",
                "Document state",
                "Batch-linked, product-page, library-only or vendor claim.",
              ],
              [
                "04",
                "Verification",
                "Vendor-hosted documentation is never presented as PeptideStat product testing.",
              ],
            ].map(([number, heading, copy]) => (
              <article key={number} className="min-h-[280px] bg-paper p-6 sm:p-7">
                <span className="font-mono text-xs font-bold text-accent">{number}</span>
                <h2 className="mt-16 text-2xl font-semibold tracking-[-0.035em] text-ink">
                  {heading}
                </h2>
                <p className="mt-4 text-xs leading-6 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                COA vocabulary
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
                What each badge actually says.
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted">
                COA presence is a documentation observation. It is not a blanket claim
                about purity, sterility, identity, efficacy or the contents of a future
                order.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-line">
              {evidenceStates.map((entry) => (
                <article
                  key={entry.state}
                  className="grid gap-4 border-b border-line bg-surface-2 p-6 last:border-0 sm:grid-cols-[180px_1fr]"
                >
                  <h3 className="text-sm font-bold text-ink">{entry.state}</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-accent">
                        Means
                      </p>
                      <p className="mt-2 text-xs leading-6 text-muted">{entry.means}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-orange-700">
                        Does not mean
                      </p>
                      <p className="mt-2 text-xs leading-6 text-muted">
                        {entry.doesNotMean}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-accent">
                Price calculation
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-ink">
                Same stated unit.
              </h2>
              <p className="mt-4 text-xs leading-6 text-muted">
                Price per milligram equals the code-adjusted estimate divided by the
                vendor’s stated milligrams. Rankings stay within one served market and
                currency. Shipping, tax, insurance, bulk tiers and payment-method fees
                are excluded unless explicitly recorded.
              </p>
            </article>

            <article className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-accent">
                Freshness
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-ink">
                Stale should look stale.
              </h2>
              <p className="mt-4 text-xs leading-6 text-muted">
                Every listing carries a check date and price-source state. Entries
                without a direct product link are marked for recheck instead of being
                presented with false precision.
              </p>
            </article>

            <article className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-accent">
                Commercial relationships
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-ink">
                Disclosure at the click.
              </h2>
              <p className="mt-4 text-xs leading-6 text-muted">
                Active partner links are marked sponsored. Pending applications do not
                receive affiliate treatment. Partner status never changes sorting or
                documentation labels.
              </p>
            </article>
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-lime p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-ink/50">
                See the model in use
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
                Compare the current market snapshot.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex min-h-11 items-center rounded-lg bg-ink px-5 text-sm font-bold text-white hover:bg-accent-dark"
              >
                Compare prices
              </Link>
              <Link
                href="/editorial-policy"
                className="inline-flex min-h-11 items-center rounded-lg border border-ink/25 px-5 text-sm font-bold text-ink hover:bg-white"
              >
                Editorial policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
