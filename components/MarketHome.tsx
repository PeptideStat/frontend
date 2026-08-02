import Link from "next/link";
import Image from "next/image";
import { ComparisonExplorer } from "@/components/ComparisonExplorer";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { LatestResearch } from "@/components/LatestResearch";
import { VendorLogo } from "@/components/VendorLogo";
import { ArrowRightIcon } from "@/components/icons";
import { ascensionCouponCode, ascensionDiscountPercent } from "@/data/ascensionLinks";
import { compoundOptions, marketListings, vendors } from "@/data/marketplace";
import { getAllArticles } from "@/lib/content";

const marketSignals = [
  { compound: "BPC-157", note: "4 US + 1 UAE listing", movement: "2 markets" },
  { compound: "GHK-Cu", note: "5 US + 1 UAE listing", movement: "2 markets" },
  { compound: "Retatrutide", note: "3 US + 1 UAE listing", movement: "2 markets" },
];

export function MarketHome() {
  const guideCount = getAllArticles().length;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,.72fr)] lg:items-end lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              <span className="inline-flex items-center gap-2 text-lime">
                <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_0_5px_rgba(217,243,106,.12)]" />
                Market desk live
              </span>
              <span>·</span>
              <span>{vendors.length} vendors</span>
              <span>·</span>
              <span>{marketListings.length} listings</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.4rem,7.2vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.068em]">
              Research the compound.
              <span className="mt-2 block text-lime">Compare the market.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Compare research-peptide prices, vendor testing documentation and current
              discount codes—then read the evidence before you leave the page.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/compare"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-lime px-5 text-sm font-black text-ink transition-colors hover:bg-white"
              >
                Compare peptide prices
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/deals"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:border-white"
              >
                Browse discount codes
              </Link>
            </div>

            <p className="mt-5 max-w-xl text-[10px] leading-5 text-white/35">
              Research use only. We may earn a commission from clearly marked partner
              links. Commercial relationships never change the displayed calculation.
            </p>
          </div>

          <aside className="rounded-2xl border border-white/15 bg-white/[0.055] p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
              <span>Market snapshot</span>
              <span className="font-mono">02 AUG 2026</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101b17]">
              {marketSignals.map((signal, index) => (
                <div
                  key={signal.compound}
                  className="grid grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-white/10 px-4 py-5 last:border-b-0"
                >
                  <span className="font-mono text-[10px] text-white/30">0{index + 1}</span>
                  <span>
                    <strong className="block text-sm text-white">{signal.compound}</strong>
                    <span className="mt-1 block text-[10px] text-white/40">{signal.note}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-lime">{signal.movement}</span>
                </div>
              ))}
            </div>
            <div className="m-3 mt-4 overflow-hidden rounded-xl bg-lime p-5 text-ink">
              <div className="grid grid-cols-[minmax(0,1fr)_112px] items-center gap-3">
                <div className="self-start">
                  <span className="inline-flex rounded-full border border-ink/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em]">
                    Sponsored
                  </span>
                  <p className="mt-4 text-[9px] font-black uppercase tracking-[0.16em] text-ink/55">
                    Current partner code
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Save {ascensionDiscountPercent}% at Ascension
                  </p>
                  <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-ink/45">
                    Featured · R-10 10mg
                  </p>
                </div>
                <div className="relative flex h-32 w-28 items-center justify-center self-end rounded-full bg-white/25">
                  <Image
                    src="/images/partners/ascension/r-10.webp"
                    alt="Ascension Peptides R-10 research vial"
                    width={150}
                    height={150}
                    sizes="112px"
                    className="h-32 w-32 max-w-none object-contain drop-shadow-[0_16px_16px_rgba(16,27,23,0.22)]"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/15 pt-4">
                <span className="font-mono text-[10px] text-ink/55">Verify at checkout</span>
                <CopyCodeButton code={ascensionCouponCode} compact />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Compare current listings</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
                The number that matters is after the code.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted lg:justify-self-end">
              We normalize vial size, apply only PeptideStat codes and separate vendor-published
              documentation from independent verification.
            </p>
          </div>
          <ComparisonExplorer compact />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Our methodology</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-ink sm:text-5xl">
                Price first.<br />Paper trail beside it.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-muted">
                A low price and a polished certificate answer different questions. PeptideStat
                shows both without collapsing them into a vague star score.
              </p>
              <Link href="/market-methodology" className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-accent">
                Read the methodology
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {[
                ["01", "Normalize", "Every listing is converted to an effective cost per stated unit so unlike vial sizes can be compared."],
                ["02", "Document", "We record whether a vendor publishes product, batch or library-level testing documentation."],
                ["03", "Timestamp", "Every price and code carries a check date. Stale commercial data should look stale."],
              ].map(([number, title, copy]) => (
                <article key={number} className="min-h-[280px] bg-surface-2 p-6 sm:p-7">
                  <span className="font-mono text-xs font-bold text-accent">{number}</span>
                  <h3 className="mt-16 text-2xl font-semibold tracking-[-0.035em] text-ink">{title}</h3>
                  <p className="mt-4 text-xs leading-6 text-muted">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Vendor watchlist</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">Six vendors. Two markets.</h2>
            </div>
            <Link href="/vendors" className="text-sm font-bold text-ink hover:text-accent">View vendor directory →</Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {vendors.map((vendor) => (
              <article key={vendor.id} className="rounded-xl border border-line bg-paper p-5">
                <VendorLogo vendor={vendor} size="md" />
                <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em] text-ink"><Link href={`/vendors/${vendor.id}`} className="hover:text-accent">{vendor.name}</Link></h3>
                <p className="mt-2 text-[10px] leading-5 text-muted">{vendor.testingNote}</p>
                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.1em] text-muted-soft">{vendor.countryServed} · {vendor.currency}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[9px] font-bold uppercase tracking-[0.1em]">
                  <span className="text-muted">{vendor.coaLabel}</span>
                  <span className={vendor.partner ? "text-accent-dark" : "text-muted-soft"}>{vendor.partner ? "Partner" : vendor.partnerStatus === "pending" ? "Pending" : "Tracked"}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LatestResearch />

      <section className="border-b border-line bg-lime text-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-ink/50">Built on an existing research library</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{guideCount} evidence-led guides behind the price table.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/peptides" className="inline-flex min-h-11 items-center rounded-lg bg-ink px-5 text-sm font-bold text-white hover:bg-accent-dark">Browse the research blog</Link>
            <Link href={`/compare?compound=${compoundOptions[0]?.slug ?? "bpc-157"}`} className="inline-flex min-h-11 items-center rounded-lg border border-ink/25 px-5 text-sm font-bold hover:bg-white">Start comparing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
