import Image from "next/image";
import Link from "next/link";
import {
  peptides,
  STATUS_LABELS,
  type Peptide,
} from "@/data/peptides";
import {
  ascensionCouponCode,
  getAscensionBuyUrl,
} from "@/data/ascensionLinks";
import { externalLinkRel } from "@/lib/externalLinks";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";

const popularSlugs = ["bpc-157", "tb-500", "ghk-cu", "ipamorelin"];

const popularCompounds = popularSlugs
  .map((slug) => peptides.find((peptide) => peptide.slug === slug))
  .filter((peptide): peptide is Peptide => Boolean(peptide));

export function PopularCompounds() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Most researched
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              Popular compound profiles
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Start with the evidence profile, then follow the clearly marked
              partner link only if a research product is relevant to you.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper px-4 py-3 text-xs text-ink-soft">
            Partner code <strong className="ml-1 font-mono text-ink">{ascensionCouponCode}</strong>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularCompounds.map((peptide) => {
            const guideHref = peptide.articleSlug
              ? `/peptides/${peptide.articleSlug}`
              : `/database/${peptide.slug}`;
            const productUrl = getAscensionBuyUrl(
              peptide.slug,
              `homepage_popular_${peptide.slug}`,
            );

            return (
              <article
                key={peptide.slug}
                className="group flex min-h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_45px_-35px_rgba(17,23,19,.55)]"
              >
                <Link
                  href={guideHref}
                  className="relative block aspect-[4/3] overflow-hidden border-b border-line bg-surface-2"
                  aria-label={`Read the ${peptide.name} evidence profile`}
                >
                  {peptide.productImageUrl ? (
                    <Image
                      src={peptide.productImageUrl}
                      alt={`${peptide.name} research product packaging`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      unoptimized
                      className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-sm font-semibold text-muted">
                      {peptide.name}
                    </span>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-line bg-paper/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.11em] text-muted backdrop-blur-sm">
                    {STATUS_LABELS[peptide.status]}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                    {peptide.drugClass}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-ink">
                    <Link href={guideHref} className="hover:text-accent">
                      {peptide.name}
                    </Link>
                  </h3>

                  <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-3 text-xs">
                    <div>
                      <dt className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-soft">
                        Half-life
                      </dt>
                      <dd className="mt-1 font-semibold text-ink-soft">{peptide.halfLife}</dd>
                    </div>
                    <div>
                      <dt className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-soft">
                        Route
                      </dt>
                      <dd className="mt-1 font-semibold text-ink-soft">
                        {peptide.routeOfAdministration}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto grid gap-2 pt-5">
                    <Link
                      href={guideHref}
                      className="group/link inline-flex h-10 items-center justify-between rounded-lg border border-line bg-surface-2 px-3 text-xs font-bold text-ink transition-colors hover:border-ink"
                    >
                      Evidence profile
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                    <a
                      href={productUrl}
                      target="_blank"
                      rel={externalLinkRel(productUrl, { sponsored: true })}
                      data-affiliate-placement="homepage-popular-compound"
                      data-affiliate-product={peptide.slug}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-ink px-3 text-xs font-bold text-white transition-colors hover:bg-accent"
                    >
                      Partner listing
                      <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-5 max-w-4xl text-[10px] leading-5 text-muted-soft">
          Affiliate disclosure: partner-listing links are sponsored. We may earn
          a commission at no additional cost to you. Research-use products are
          not medicines and are not approved for human use.
        </p>
      </div>
    </section>
  );
}
