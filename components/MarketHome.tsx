import Link from "next/link";
import Image from "next/image";
import { ComparisonExplorer } from "@/components/ComparisonExplorer";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { LatestResearch } from "@/components/LatestResearch";
import { VendorLogo } from "@/components/VendorLogo";
import { ArrowRightIcon } from "@/components/icons";
import { ascensionCouponCode, ascensionDiscountPercent } from "@/data/ascensionLinks";
import {
  compoundOptions,
  marketListings,
  vendorById,
  vendors,
} from "@/data/marketplace";
import { getAllArticles } from "@/lib/content";

const highlightedCompoundSlugs = new Set(["bpc-157", "ghk-cu", "retatrutide"]);

const marketSignals = compoundOptions
  .filter(({ slug }) => highlightedCompoundSlugs.has(slug))
  .map(({ name, slug }) => {
    const listings = marketListings.filter(
      (listing) => listing.compoundSlug === slug,
    );

    return {
      compound: name,
      slug,
      usListings: listings.filter(
        (listing) => vendorById.get(listing.vendorId)?.market === "us",
      ).length,
      uaeListings: listings.filter(
        (listing) => vendorById.get(listing.vendorId)?.market === "uae-gcc",
      ).length,
    };
  });

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

          <aside className="relative isolate">
            <div
              aria-hidden
              className="absolute -inset-5 -z-10 rounded-[2rem] bg-lime/10 blur-3xl"
            />
            <div className="overflow-hidden rounded-[1.65rem] border border-white/20 bg-[#0d1713] shadow-[0_36px_90px_-34px_rgba(0,0,0,0.95)]">
              <div className="h-1 bg-lime" />
              <div className="relative overflow-hidden border-b border-white/10 px-5 pb-5 pt-4">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
                <div className="relative flex items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.16em]">
                  <span className="inline-flex items-center gap-2 text-lime">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_0_4px_rgba(217,243,106,.12)]" />
                    Market snapshot
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-white/45">
                    02 AUG 2026
                  </span>
                </div>

                <div className="relative mt-6 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                      Full market ledger
                    </p>
                    <p className="mt-2 text-5xl font-semibold leading-none tracking-[-0.06em] text-white">
                      {marketListings.length}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-lime">
                      tracked listings
                    </p>
                  </div>
                  <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/10 bg-black/15">
                    <div className="border-r border-white/10 px-3 py-3">
                      <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/35">
                        Vendors
                      </dt>
                      <dd className="mt-1 font-mono text-xl font-bold text-white">
                        {String(vendors.length).padStart(2, "0")}
                      </dd>
                    </div>
                    <div className="px-3 py-3">
                      <dt className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/35">
                        Markets
                      </dt>
                      <dd className="mt-1 font-mono text-xl font-bold text-white">02</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-1 bg-white/[0.018] p-3">
                <div className="flex items-center justify-between px-3 pb-1 pt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/30">
                  <span>Highlighted compounds</span>
                  <span>US / UAE split</span>
                </div>
                {marketSignals.map((signal, index) => {
                  const totalListings = signal.usListings + signal.uaeListings;

                  return (
                    <Link
                      key={signal.compound}
                      href={`/compare?compound=${signal.slug}`}
                      className="group grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-white/[0.055]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] font-mono text-[10px] text-white/35 transition-colors group-hover:border-lime/40 group-hover:text-lime">
                        0{index + 1}
                      </span>
                      <span className="min-w-0">
                        <strong className="block text-sm font-semibold text-white">
                          {signal.compound}
                        </strong>
                        <span className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <span
                            className="bg-lime"
                            style={{ flex: signal.usListings }}
                          />
                          <span
                            className="bg-white/30"
                            style={{ flex: signal.uaeListings }}
                          />
                        </span>
                        <span className="mt-2 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.08em] text-white/35">
                          <span>US {signal.usListings}</span>
                          <span>UAE {signal.uaeListings}</span>
                        </span>
                      </span>
                      <span className="text-right">
                        <strong className="block font-mono text-2xl leading-none text-lime">
                          {String(totalListings).padStart(2, "0")}
                        </strong>
                        <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.12em] text-white/30">
                          listings
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mx-3 mb-3 mt-2 overflow-hidden rounded-xl border border-white/35 bg-lime p-5 text-ink shadow-[0_20px_45px_-28px_rgba(217,243,106,0.9)]">
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
              <Link href="/reports/peptide-vendor-transparency-2026" className="group mt-4 flex w-fit items-center gap-2 text-sm font-bold text-ink hover:text-accent">
                Open the 2026 transparency report
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

          <div className="mb-6 flex flex-wrap gap-4 text-xs font-bold">
            <Link href="/vendors/usa" className="text-ink hover:text-accent">Browse US peptide vendors</Link>
            <Link href="/vendors/uae" className="text-ink hover:text-accent">Browse UAE & GCC peptide vendors</Link>
            <Link href="/reviews" className="text-ink hover:text-accent">Read vendor reviews</Link>
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
