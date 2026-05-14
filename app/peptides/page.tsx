import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { ArticleList } from "@/components/ArticleList";
import { buildMetadata } from "@/lib/seo";

const title = "Peptide Guides & Reviews";
const description =
  "Browse every PeptideStat guide — research-backed breakdowns of peptide dosing, benefits, side effects and comparisons.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/peptides",
});

export default function PeptidesIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{description}</p>
      </header>

      <ArticleList articles={articles} priorityCount={3} />
    </div>
  );
}
