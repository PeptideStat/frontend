import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { ArticleList } from "@/components/ArticleList";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { buildMetadata } from "@/lib/seo";

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
      <section className="border-b border-line bg-gradient-to-b from-accent-soft/40 to-canvas">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
            All guides
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <ArticleList articles={articles} priorityCount={3} />
      </section>

      <DisclaimerBanner />
    </>
  );
}
