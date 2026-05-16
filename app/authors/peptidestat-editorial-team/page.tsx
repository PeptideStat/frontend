import type { Metadata } from "next";
import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { JsonLd } from "@/components/JsonLd";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const title = "PeptideStat Editorial Team";
const description =
  "The PeptideStat Editorial Team researches peptide mechanisms, safety, regulatory status, sourcing and clinical evidence for PeptideStat guides.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/authors/peptidestat-editorial-team",
});

function authorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PeptideStat Editorial Team",
    url: absoluteUrl("/authors/peptidestat-editorial-team"),
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description,
  };
}

export default function PeptideStatEditorialTeamPage() {
  const articles = getAllArticles()
    .filter((article) => article.author === "PeptideStat Editorial Team" || !article.author)
    .slice(0, 9);

  return (
    <>
      <JsonLd data={authorJsonLd()} />

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Author
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            PeptideStat Editorial Team
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            We publish evidence-based peptide guides focused on mechanisms,
            human evidence, regulatory status, side effects, sourcing risks and
            practical comparisons.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/editorial-policy"
              className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              Editorial policy
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright"
            >
              Contact editorial team
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Recent guides
        </h2>
        <div className="mt-6">
          <ArticleList articles={articles} />
        </div>
      </section>
    </>
  );
}
