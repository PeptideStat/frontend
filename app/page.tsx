import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { ArticleList } from "@/components/ArticleList";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export default function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 6);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero */}
      <section className="border-b border-line bg-gradient-to-b from-accent-soft/60 to-canvas">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-dark">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Clear, research-backed answers about peptides.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {siteConfig.name} breaks down what the research actually says —
            dosing, benefits, side effects and how popular peptides compare — so
            you can make informed decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/peptides"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Browse all guides
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-line bg-canvas px-5 py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-surface"
            >
              How we research
            </Link>
          </div>
        </div>
      </section>

      {/* Latest guides */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest guides
            </h2>
            <p className="mt-1 text-sm text-muted">
              Fresh research breakdowns and peptide comparisons.
            </p>
          </div>
          <Link
            href="/peptides"
            className="hidden text-sm font-medium text-accent-dark hover:text-accent sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        <ArticleList articles={latest} priorityCount={3} />
      </section>
    </>
  );
}
