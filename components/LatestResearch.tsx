import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ArrowRightIcon } from "@/components/icons";

export function LatestResearch() {
  const articles = getAllArticles().slice(0, 6);
  const [lead, ...rest] = articles;

  if (!lead) return null;

  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Recently published
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              Latest research guides
            </h2>
          </div>
          <Link
            href="/peptides"
            className="group hidden items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-accent sm:flex"
          >
            Browse all guides
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <Link
            href={`/peptides/${lead.slug}`}
            className="group flex min-h-[430px] flex-col rounded-2xl bg-ink p-7 text-white transition-colors hover:bg-accent-dark sm:p-9"
          >
            <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white/50">
              <span className="rounded-full bg-lime px-3 py-1 text-ink">Featured guide</span>
              <span>{formatDate(lead.date)}</span>
            </div>
            <div className="mt-auto max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-lime">
                {lead.cluster ?? lead.tags?.[0] ?? "Research"}
              </p>
              <h3 className="mt-3 text-3xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
                {lead.excerpt ?? lead.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white">
                Read the guide
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
            {rest.map((article, index) => (
              <Link
                key={article.slug}
                href={`/peptides/${article.slug}`}
                className="group grid gap-3 border-b border-line p-5 transition-colors last:border-b-0 hover:bg-paper sm:grid-cols-[34px_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-[10px] text-muted-soft">0{index + 2}</span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                    {article.cluster ?? article.tags?.[0] ?? "Research"}
                  </span>
                  <span className="mt-1.5 block text-base font-semibold leading-5 tracking-[-0.015em] text-ink group-hover:text-accent">
                    {article.title}
                  </span>
                </span>
                <span className="hidden whitespace-nowrap font-mono text-[10px] text-muted-soft sm:block">
                  {article.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
