import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { VendorLogo } from "@/components/VendorLogo";
import { vendors } from "@/data/marketplace";
import { partnerStatusLabels } from "@/data/partnerPrograms";
import { getVendorReviewPath } from "@/data/vendorReviews";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

const title = "Legit Research Peptide Vendors (2026): COAs & Countries";
const description =
  "A transparent directory of tracked research-peptide vendors, testing-documentation practices, shipping regions and PeptideStat partner status.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/vendors" });

export default function VendorsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path: "/vendors",
          dateModified: marketplaceUpdatedAt,
          items: vendors.map((vendor) => ({
            name: vendor.name,
            path: `/vendors/${vendor.id}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Research peptide vendors", path: "/vendors" },
        ])}
      />
      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">Vendor directory</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Legit research peptide vendors.
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            PeptideStat tracks commercial listings and the documentation vendors publish.
            We do not equate a posted certificate with independent product verification.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            <Link href="/vendors/usa" className="rounded-2xl border border-line bg-paper p-6 shadow-card hover:border-accent">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-accent">Regional directory</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink">US peptide vendors</h2>
              <p className="mt-3 text-xs leading-6 text-muted">US-served listings, USD pricing and vendor-published documentation in one view.</p>
            </Link>
            <Link href="/vendors/uae" className="rounded-2xl border border-line bg-paper p-6 shadow-card hover:border-accent">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-accent">Regional directory</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink">UAE & GCC peptide vendors</h2>
              <p className="mt-3 text-xs leading-6 text-muted">Local and regional coverage, AED pricing, delivery scope and public COA status.</p>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {vendors.map((vendor, index) => (
              <article key={vendor.id} className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <VendorLogo vendor={vendor} size="md" />
                    <div>
                      <p className="font-mono text-[9px] text-muted-soft">VENDOR / {String(index + 1).padStart(2, "0")}</p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-ink">{vendor.name}</h2>
                    </div>
                  </div>
                  {vendor.partner ? <span className="rounded-full bg-lime px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-ink">Partner</span> : <span className="rounded-full border border-line px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-muted">{vendor.partnerStatus === "pending" ? "Pending" : "Tracked"}</span>}
                </div>

                <p className="mt-8 text-sm leading-7 text-muted">{vendor.testingNote}</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-soft">
                  {partnerStatusLabels[vendor.partnerStatus]} · reviewed {vendor.lastReviewedAt}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-y-5 divide-x-0 border-y border-line py-5 sm:grid-cols-4 sm:divide-x">
                  <div className="pr-4"><dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">Region</dt><dd className="mt-2 text-xs font-bold text-ink">{vendor.location}</dd></div>
                  <div className="px-4"><dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">Ships to</dt><dd className="mt-2 text-xs font-bold text-ink">{vendor.shipsTo}</dd></div>
                  <div className="px-4"><dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">Country served</dt><dd className="mt-2 text-xs font-bold text-ink">{vendor.countryServed}</dd></div>
                  <div className="pl-4"><dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">Currency</dt><dd className="mt-2 text-xs font-bold text-ink">{vendor.currency}</dd></div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/vendors/${vendor.id}`} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent-dark">Open market profile</Link>
                  {getVendorReviewPath(vendor.id) ? (
                    <Link href={getVendorReviewPath(vendor.id)!} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink">Read editorial audit</Link>
                  ) : null}
                  <a
                    href={vendor.url}
                    target="_blank"
                    rel={vendor.partner ? "sponsored nofollow noreferrer" : "noopener noreferrer"}
                    data-affiliate-placement={vendor.partner ? "vendor-directory" : undefined}
                    data-affiliate-product={vendor.partner ? "catalog" : undefined}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink"
                  >
                    Visit vendor ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-ink p-7 text-white sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-end">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-lime">Directory standard</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">No pay-to-win vendor score.</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">Partner relationships are disclosed at the row and link level. Price sorting is mathematical; documentation labels describe what is public, not what PeptideStat has independently confirmed.</p>
              </div>
              <Link href="/compare" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white lg:justify-self-end">Compare current listings</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
