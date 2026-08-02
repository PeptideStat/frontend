import type { Metadata } from "next";
import Link from "next/link";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { JsonLd } from "@/components/JsonLd";
import { VendorLogo } from "@/components/VendorLogo";
import { ArrowRightIcon } from "@/components/icons";
import {
  ascensionCouponCode,
  ascensionDiscountPercent,
  getAscensionShopUrl,
} from "@/data/ascensionLinks";
import { vendors } from "@/data/marketplace";
import { partnerStatusLabels } from "@/data/partnerPrograms";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

const title = "Verified Peptide Discount Codes (2026): Current Vendor Offers";
const description =
  "Current PeptideStat partner codes, vendor offers and transparent coupon-status tracking for research-peptide listings.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/deals" });

const partnerUrl = getAscensionShopUrl("deals_primary");

export default function DealsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path: "/deals",
          dateModified: marketplaceUpdatedAt,
          items: vendors.map((vendor) => ({
            name: `${vendor.name} discount code status`,
            path: `/vendors/${vendor.id}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide discount codes", path: "/deals" },
        ])}
      />
      <section className="border-b border-line bg-lime text-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-ink/50">Discount desk · checked 02 Aug 2026</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Verified peptide discount codes.<br />Nothing padded.
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-ink/65 sm:text-base">
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
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">Code watchlist</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">Every tracked vendor, including the blanks.</h2>
              </div>
              <Link href="/vendors" className="hidden text-xs font-bold text-ink hover:text-accent sm:block">Vendor details →</Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {vendors.map((vendor) => (
                <article key={vendor.id} className="rounded-xl border border-line bg-paper p-5">
                  <div className="flex items-center justify-between gap-3">
                    <VendorLogo vendor={vendor} size="sm" />
                    <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${vendor.code || vendor.partnerStatus === "active" ? "text-accent-dark" : "text-muted-soft"}`}>{vendor.code ? "Code active" : vendor.partnerStatus === "active" ? "Referral active" : vendor.partnerStatus === "pending" ? "Pending" : "Watching"}</span>
                  </div>
                  <h3 className="mt-8 text-base font-bold text-ink">{vendor.name}</h3>
                  <div className="mt-4 border-t border-line pt-4">
                    {vendor.code ? <CopyCodeButton code={vendor.code} compact /> : <span className="text-[10px] text-muted">{partnerStatusLabels[vendor.partnerStatus]}</span>}
                  </div>
                  <Link href={`/vendors/${vendor.id}`} className="mt-4 inline-flex text-[10px] font-bold text-ink hover:text-accent">Open vendor profile →</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
