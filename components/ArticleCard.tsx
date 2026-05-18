import Link from "next/link";
import Image from "next/image";
import type { ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleMeta;
  /** Pass true for above-the-fold cards to preload the cover image. */
  priority?: boolean;
}) {
  const href = `/peptides/${article.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover">
      <Link href={href} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt ?? `${article.title} cover image`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent-soft to-surface-2">
              <span className="text-2xl font-bold tracking-tight text-accent/70">
                {article.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          {article.pillar && (
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent-bright">
              Guide
            </span>
          )}
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTime}</span>
        </div>

        <h3 className="text-lg font-semibold leading-snug tracking-tight">
          <Link
            href={href}
            className="transition-colors hover:text-accent-bright"
          >
            {article.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {article.excerpt ?? article.description}
        </p>
      </div>
    </article>
  );
}
