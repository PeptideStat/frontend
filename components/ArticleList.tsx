import type { ArticleMeta } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export function ArticleList({
  articles,
  priorityCount = 0,
}: {
  articles: ArticleMeta[];
  /** Number of leading cards that should preload their cover image. */
  priorityCount?: number;
}) {
  if (articles.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
        No articles published yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.slug}
          article={article}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
