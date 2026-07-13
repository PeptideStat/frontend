import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORY_LABELS,
  peptides,
  STATUS_LABELS,
} from "@/data/peptides";
import {
  ascensionCatalog,
  ascensionAvailabilityCheckedAt,
  ascensionCouponCode,
  getAscensionAvailability,
  getAscensionBuyUrl,
  getAscensionShopUrl,
  hasAscensionProduct,
} from "@/data/ascensionLinks";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { externalLinkRel } from "@/lib/externalLinks";
import { buildMetadata } from "@/lib/seo";

const title = "Research peptide marketplace";
const description =
  "Review peptide evidence and lot documentation before visiting our vetted research-marketplace partner. Research use only; affiliate-supported.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/shop",
});

const listedPeptides = peptides.filter((peptide) =>
  hasAscensionProduct(peptide.slug),
);
const marketplaceUrl = getAscensionShopUrl("marketplace_hero");

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Vetted partner · affiliate marketplace
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-ink">
              Research first. Purchase second.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-ink-soft">
              PeptideStat does not manufacture, sell or fulfill products. We review
              the evidence, the vendor&apos;s public COAs and the questions buyers
              should ask—then link out to our current research-marketplace partner.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={marketplaceUrl}
                target="_blank"
                rel={externalLinkRel(marketplaceUrl, { sponsored: true })}
                data-affiliate-placement="marketplace-hero"
                data-affiliate-product="catalog"
                className="group inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-5 text-sm font-bold text-white transition-colors hover:bg-accent"
              >
                Browse partner catalog
                <ExternalLinkIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/peptides/ascension-peptides-review"
                className="group inline-flex h-12 items-center gap-2 rounded-lg border border-line-strong bg-paper px-5 text-sm font-bold text-ink hover:border-ink"
              >
                Read our vendor audit
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="self-end overflow-hidden rounded-2xl bg-ink p-7 text-white shadow-[0_24px_70px_-45px_rgba(17,23,19,.6)] sm:p-9">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                Partner code / verify at checkout
              </p>
              <strong className="mt-4 block break-all font-mono text-[clamp(2.4rem,6vw,4.6rem)] leading-none tracking-[-0.07em] text-lime">
                {ascensionCouponCode}
              </strong>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.12em] text-white/45">
                <p>
                  Catalog
                  <span className="mt-1 block text-3xl font-semibold normal-case tracking-[-0.03em] text-white">
                    {ascensionCatalog.length} audited
                  </span>
                </p>
                <p>
                  Intended use
                  <span className="mt-2 block font-bold text-lime">Research only</span>
                </p>
              </div>
              <p className="mt-7 text-[10px] leading-5 text-white/40">
                We may earn a commission at no additional cost to you. Current
                savings, availability and lot documentation can change; verify all
                three on the destination site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["01", "Check the evidence", "Read the compound guide and confirm whether the evidence is human, animal or preclinical."],
            ["02", "Open the lot COA", "Match the lot number, testing method and date to the exact listing you are considering."],
            ["03", "Verify at checkout", "Confirm the current code, total price, shipping terms and research-use acknowledgment."],
          ].map(([number, heading, copy]) => (
            <div key={number} className="rounded-xl border border-line bg-surface-2 p-6">
              <span className="font-mono text-xs font-bold text-accent">{number}</span>
              <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-ink">{heading}</h2>
              <p className="mt-3 text-xs leading-6 text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-9 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Evidence-linked catalog index
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                Follow the data to the listing.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted lg:justify-self-end">
              Approval status describes the compound in the evidence database—not
              the partner&apos;s research-use product. A research listing is never a
              prescription medicine.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listedPeptides.map((peptide, index) => {
              const buyUrl = getAscensionBuyUrl(peptide.slug, `marketplace_${peptide.slug}`);
              const productAvailability = getAscensionAvailability(peptide.slug);
              return (
                <article
                  key={peptide.slug}
                  className="group flex min-h-[330px] flex-col rounded-xl border border-line bg-surface-2 p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper"
                >
                  <div className="flex items-start justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-soft">
                    <span>PS—{String(index + 1).padStart(2, "0")}</span>
                    <span
                      className={`rounded border px-2 py-1 ${
                        productAvailability === "out-of-stock"
                          ? "border-tint-amber-ink/40 bg-tint-amber text-tint-amber-ink"
                          : "border-line"
                      }`}
                    >
                      {productAvailability === "out-of-stock"
                        ? `Out of stock · ${ascensionAvailabilityCheckedAt}`
                        : STATUS_LABELS[peptide.status]}
                    </span>
                  </div>
                  <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.16em] text-cobalt">
                    {CATEGORY_LABELS[peptide.category]}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink">
                    {peptide.name}
                  </h3>
                  {peptide.aliases && (
                    <p className="mt-1 text-[10px] text-muted-soft">{peptide.aliases}</p>
                  )}
                  <p className="mt-4 line-clamp-3 text-xs leading-6 text-muted">
                    {peptide.mechanism}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-7">
                    <Link
                      href={`/database/${peptide.slug}`}
                      className="flex h-10 items-center justify-center rounded-lg border border-line-strong bg-paper px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-ink hover:border-ink"
                    >
                      Evidence
                    </Link>
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel={externalLinkRel(buyUrl, { sponsored: true })}
                      data-affiliate-placement="marketplace-card"
                      data-affiliate-product={peptide.slug}
                      className="flex h-10 items-center justify-center gap-2 rounded-lg bg-ink px-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white hover:bg-accent"
                    >
                      {productAvailability === "out-of-stock" ? "Recheck" : "Listing"}{" "}
                      <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <DisclaimerBanner />
    </>
  );
}
