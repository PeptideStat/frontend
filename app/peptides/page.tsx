import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { ArticleList } from "@/components/ArticleList";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

const title = "Peptide guides & reviews";
const description =
  "Every PeptideStat guide — research-backed breakdowns of peptide dosing, benefits, side effects and head-to-head comparisons.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/peptides",
});

export default function PeptidesIndexPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-16 lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              The complete archive
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-ink">
              Peptide guides &amp; reviews
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-ink-soft">
              {description}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper p-5">
            <span className="text-4xl font-semibold tracking-[-0.04em] text-ink">
              {articles.length}
            </span>
            <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
              published notes
            </span>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.1em]">
              <Link href="/database" className="hover:text-accent">
                Database
              </Link>
              <Link href="/calculators" className="hover:text-accent">
                Calculators
              </Link>
              <Link href="/shop" className="hover:text-accent">
                Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <ArticleList articles={articles} priorityCount={3} />
      </section>

      <DisclaimerBanner />
    </>
  );
}
