import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ArrowRightIcon } from "@/components/icons";

function articleIndex(slug: string) {
  const total = [...slug].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return String((total % 89) + 10).padStart(2, "0");
}

export function ArticleCard({
  article,
}: {
  article: ArticleMeta;
  priority?: boolean;
}) {
  const href = `/peptides/${article.slug}`;

  return (
    <article className="group relative flex min-h-[310px] flex-col overflow-hidden border border-line bg-surface-2 p-6 transition-all hover:-translate-y-1 hover:border-ink hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-muted-soft">
          PS—{articleIndex(article.slug)}
        </span>
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
          {article.pillar && <span className="bg-lime px-2 py-1 text-ink">Guide</span>}
          <span>{article.readingTime}</span>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cobalt">
          {article.cluster ?? article.tags?.[0] ?? "Research note"}
        </p>
        <h3 className="mt-3 font-display text-[1.7rem] leading-[1.04] tracking-[-0.03em] text-ink transition-colors group-hover:text-cobalt">
          <Link href={href} className="before:absolute before:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">
          {article.excerpt ?? article.description}
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <time
          dateTime={article.date}
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-soft"
        >
          {formatDate(article.date)}
        </time>
        <span className="flex h-9 w-9 items-center justify-center border border-ink text-ink transition-colors group-hover:bg-lime">
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>

      <span
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-coral transition-transform group-hover:scale-x-100"
        aria-hidden
      />
    </article>
  );
}
