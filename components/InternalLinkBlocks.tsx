import Link from "next/link";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  type Peptide,
} from "@/data/peptides";
import { getPeptideEvidence } from "@/data/peptideEvidence";
import type { PeptideCategoryHub } from "@/data/peptideCategoryHubs";
import type { ArticleMeta } from "@/lib/content";

function sectionClassName(className?: string): string {
  return className ?? "mt-10";
}

export function RelatedGuides({
  articles,
  title = "Related guides",
  description,
  className,
}: {
  articles: ArticleMeta[];
  title?: string;
  description?: string;
  className?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section className={sectionClassName(className)}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            {description}
          </p>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/peptides/${article.slug}`}
            className="group flex min-h-full flex-col rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-accent/40"
          >
            <span className="text-sm font-semibold leading-6 text-ink group-hover:text-accent-bright">
              {article.title}
            </span>
            <span className="mt-2 line-clamp-3 text-xs leading-5 text-muted">
              {article.excerpt ?? article.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedDatabaseEntries({
  peptides,
  title = "Related database entries",
  description,
  currentArticleSlug,
  className,
}: {
  peptides: Peptide[];
  title?: string;
  description?: string;
  currentArticleSlug?: string;
  className?: string;
}) {
  if (peptides.length === 0) return null;

  return (
    <section className={sectionClassName(className)}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            {description}
          </p>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {peptides.map((peptide) => {
          const evidence = getPeptideEvidence(peptide.slug);
          const showGuide =
            peptide.articleSlug && peptide.articleSlug !== currentArticleSlug;

          return (
            <article
              key={peptide.slug}
              className="flex min-h-full flex-col rounded-lg border border-line bg-surface-2 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    <Link
                      href={`/database/${peptide.slug}`}
                      className="transition-colors hover:text-accent-bright"
                    >
                      {peptide.name}
                    </Link>
                  </h3>
                  {peptide.aliases && (
                    <p className="mt-1 text-xs leading-5 text-muted">
                      {peptide.aliases}
                    </p>
                  )}
                </div>
                {evidence && (
                  <span className="shrink-0 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-bright">
                    {evidence.score}/5
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft">
                  {CATEGORY_LABELS[peptide.category]}
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft">
                  {STATUS_LABELS[peptide.status]}
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-soft">
                {peptide.mechanism}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <Link
                  href={`/database/${peptide.slug}`}
                  className="inline-flex h-9 items-center rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                >
                  Details
                </Link>
                {showGuide && (
                  <Link
                    href={`/peptides/${peptide.articleSlug}`}
                    className="inline-flex h-9 items-center rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                  >
                    Guide
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function RelatedCategoryHubs({
  hubs,
  title = "Related category hubs",
  description,
  className,
}: {
  hubs: PeptideCategoryHub[];
  title?: string;
  description?: string;
  className?: string;
}) {
  if (hubs.length === 0) return null;

  return (
    <section className={sectionClassName(className)}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            {description}
          </p>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <Link
            key={hub.slug}
            href={`/database/${hub.slug}`}
            className="group rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-accent/40"
          >
            <span className="text-sm font-semibold text-ink group-hover:text-accent-bright">
              {hub.title}
            </span>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">
              {hub.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
