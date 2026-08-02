import type { Metadata } from "next";
import Link from "next/link";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { JsonLd } from "@/components/JsonLd";
import { VendorLogo } from "@/components/VendorLogo";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import {
  ascensionCouponCode,
  ascensionDiscountPercent,
  getAscensionShopUrl,
} from "@/data/ascensionLinks";
import { vendorById } from "@/data/marketplace";
import {
  dealsOfferCatalogJsonLd,
  vendorDeals,
} from "@/lib/deals";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

const title = "Verified Peptide Discount Codes (2026): Current Vendor Offers";
const description =
  "Current PeptideStat partner codes, vendor offers and transparent coupon-status tracking for research-peptide listings.";

const path = "/deals";

export const metadata: Metadata = {
  ...buildMetadata({ title, description, path }),
  alternates: {
    canonical: absoluteUrl(path),
    types: {
      "application/json": absoluteUrl("/deals/data"),
    },
  },
};

const partnerUrl = getAscensionShopUrl("deals_primary");

export default function DealsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path,
          dateModified: marketplaceUpdatedAt,
          items: vendorDeals.map((deal) => ({
            name: deal.code
              ? deal.discountPercent === null
                ? `${deal.vendorName}: coupon code ${deal.code}`
                : `${deal.vendorName}: ${deal.discountPercent}% off with code ${deal.code}`
              : `${deal.vendorName}: ${deal.statusLabel}`,
            path: `/vendors/${deal.vendorId}`,
          })),
        })}
      />
      <JsonLd data={dealsOfferCatalogJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide discount codes", path: "/deals" },
        ])}
      />
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">Discount desk · checked {marketplaceUpdatedAt}</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Verified peptide discount codes.
            <span className="block text-lime">Nothing padded.</span>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            We list only codes tied to PeptideStat or clearly identified public offers.
            If we do not have a code for a vendor, we show the application state instead.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink text-white shadow-card">
            <div className="grid lg:grid-cols-[1.1fr_.9fr]">
              <div className="p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-lime px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-ink">Current partner offer</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">Affiliate · verify at checkout</span>
                </div>
                <h2 className="mt-8 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{ascensionDiscountPercent}% off Ascension Peptides</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                  Applies through the tracked partner catalog. Availability, exclusions and
                  final savings can change, so confirm the code before payment.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CopyCodeButton code={ascensionCouponCode} />
                  <a
                    href={partnerUrl}
                    target="_blank"
                    rel="sponsored nofollow noreferrer"
                    data-affiliate-placement="deals-primary"
                    data-affiliate-product="catalog"
                    className="group inline-flex min-h-10 items-center gap-2 rounded-md border border-white/25 px-4 text-xs font-bold text-white hover:border-white"
                  >
                    Open partner catalog
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">Example on current BPC-157 listing</p>
                <dl className="mt-8 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <dt className="text-xs text-white/45">Listed price</dt><dd className="font-mono text-sm">$49.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <dt className="text-xs text-white/45">Code savings</dt><dd className="font-mono text-sm text-lime">−$24.50</dd>
                  </div>
                  <div className="flex items-end justify-between">
                    <dt className="text-xs text-white/45">Effective price</dt><dd className="font-mono text-3xl font-bold text-lime">$24.50</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">Code watchlist</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">Every tracked vendor, including the blanks.</h2>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                <Link href="/vendors" className="text-ink hover:text-accent">Vendor details →</Link>
                <a
                  href="/deals/data"
                  type="application/json"
                  rel="alternate"
                  className="inline-flex items-center gap-1.5 text-ink hover:text-accent"
                >
                  JSON data
                  <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {vendorDeals.map((deal) => {
                const vendor = vendorById.get(deal.vendorId);
                if (!vendor) return null;

                const badgeLabel =
                  deal.status === "code-active"
                    ? "Code active"
                    : deal.status === "referral-active"
                      ? "Referral active"
                      : deal.status === "pending"
                        ? "Pending"
                        : "Watching";
                const isActive =
                  deal.status === "code-active" ||
                  deal.status === "referral-active";

                return (
                  <article
                    key={deal.vendorId}
                    data-vendor-id={deal.vendorId}
                    data-discount-status={deal.status}
                    data-discount-code={deal.code ?? undefined}
                    data-discount-percent={deal.discountPercent ?? undefined}
                    data-checked-at={deal.lastCheckedAt}
                    className="flex h-full flex-col rounded-xl border border-line bg-paper p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <VendorLogo vendor={vendor} size="sm" />
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.1em] ${
                          isActive ? "text-accent-dark" : "text-muted-soft"
                        }`}
                      >
                        {badgeLabel}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-ink">
                      {deal.vendorName}
                    </h3>

                    <dl className="mt-4 divide-y divide-line border-y border-line">
                      <div className="grid gap-1.5 py-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
                        <dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                          Status
                        </dt>
                        <dd className="text-xs font-semibold text-ink-soft sm:text-right">
                          {deal.statusLabel}
                        </dd>
                      </div>
                      <div className="grid gap-1.5 py-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
                        <dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                          Discount code
                        </dt>
                        <dd className="sm:justify-self-end">
                          {deal.code ? (
                            <CopyCodeButton code={deal.code} compact />
                          ) : (
                            <span className="text-xs font-semibold text-muted">
                              None published
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="grid gap-1.5 py-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
                        <dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                          Discount
                        </dt>
                        <dd className="font-mono text-xs font-bold text-ink sm:text-right">
                          {deal.discountPercent === null
                            ? deal.code
                              ? "Verify at checkout"
                              : "No public discount"
                            : `${deal.discountPercent}% off`}
                        </dd>
                      </div>
                      <div className="grid gap-1.5 py-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
                        <dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                          Last checked
                        </dt>
                        <dd className="font-mono text-xs text-ink-soft sm:text-right">
                          <time dateTime={deal.lastCheckedAt}>{deal.lastCheckedAt}</time>
                        </dd>
                      </div>
                      <div className="grid gap-1.5 py-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center">
                        <dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                          Offer URL
                        </dt>
                        <dd className="sm:justify-self-end">
                          <a
                            href={deal.offerUrl}
                            target="_blank"
                            rel={
                              deal.affiliate
                                ? "sponsored nofollow noreferrer"
                                : "noopener noreferrer"
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-accent"
                          >
                            {deal.code ? "Open offer" : "Open vendor"}
                            <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          </a>
                        </dd>
                      </div>
                    </dl>

                    <Link
                      href={`/vendors/${deal.vendorId}`}
                      className="mt-4 inline-flex text-[10px] font-bold text-ink hover:text-accent"
                    >
                      Open vendor profile →
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
