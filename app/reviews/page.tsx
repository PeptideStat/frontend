import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { VendorLogo } from "@/components/VendorLogo";
import { vendors } from "@/data/marketplace";
import { getVendorReviewPath } from "@/data/vendorReviews";
import { getArticleBySlug } from "@/lib/content";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";
import { marketplaceUpdatedAt } from "@/lib/marketReport";

const title = "Peptide Vendor Reviews (2026): COAs, Prices & Legitimacy";
const description =
  "Evidence-led peptide vendor reviews covering public COAs, exact batch references, prices, shipping, discount codes, affiliate status and verification limits.";
const path = "/reviews";

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function ReviewsPage() {
  const reviewItems = vendors.map((vendor) => {
    const reviewPath = getVendorReviewPath(vendor.id);
    const slug = reviewPath?.split("/").at(-1);
    const article = slug ? getArticleBySlug(slug) : null;
    return { vendor, reviewPath, article };
  });

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path,
          dateModified: marketplaceUpdatedAt,
          items: reviewItems.map(({ vendor, reviewPath }) => ({
            name: `${vendor.name} review`,
            path: reviewPath ?? `/vendors/${vendor.id}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Peptide vendor reviews", path },
        ])}
      />

      <section className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-lime">
            Editorial vendor audits
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.1rem,7vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Peptide vendor reviews.
            <span className="block text-lime">Evidence before star scores.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
            Reviews separate current prices, vendor-hosted documents, exact
            batch records and affiliate relationships. A favorable paper trail
            is not a product test or human-use recommendation.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {reviewItems.map(({ vendor, reviewPath, article }) => (
              <article
                key={vendor.id}
                className="flex min-h-[330px] flex-col rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <VendorLogo vendor={vendor} size="md" />
                  <span className="rounded-full border border-line px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-muted">
                    {reviewPath ? "Full audit" : "Market review"}
                  </span>
                </div>
                <p className="mt-8 text-[9px] font-black uppercase tracking-[0.14em] text-accent">
                  {vendor.countryServed}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
                  {vendor.name} review
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {article?.excerpt ?? vendor.profileSummary}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <Link
                    href={reviewPath ?? `/vendors/${vendor.id}`}
                    className="inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent-dark"
                  >
                    {reviewPath ? "Read editorial audit" : "Read market review"}
                  </Link>
                  <Link
                    href={`/vendors/${vendor.id}`}
                    className="inline-flex min-h-10 items-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink"
                  >
                    Prices & COAs
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-ink p-7 text-white sm:p-10">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-lime">
              How reviews are built
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The method is part of the verdict.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/55">
              PeptideStat records exact public facts and states what was not
              checked. Vendor claims, linked laboratory reports and tests
              commissioned by PeptideStat are deliberately different evidence
              levels.
            </p>
            <Link
              href="/market-methodology"
              className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white"
            >
              Read the market methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
