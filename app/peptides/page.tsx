import type { Metadata } from "next";
import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRightIcon } from "@/components/icons";
import { peptideCategoryHubs } from "@/data/peptideCategoryHubs";
import { getAllArticles, type ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getGuidesForCategoryHub } from "@/lib/internalLinks";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const title = "Peptide Research Guides & Vendor Reviews";
const description =
  "Evidence-led peptide guides covering mechanisms, clinical research, safety, regulatory status, vendor documentation and market comparisons.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/peptides",
});

function researchCollectionJsonLd(articles: ArticleMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/peptides"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: absoluteUrl(`/peptides/${article.slug}`),
      })),
    },
  };
}

export default function PeptidesIndexPage() {
  const articles = getAllArticles();
  const [lead, ...supporting] = articles.slice(0, 6);
  const recentArchive = articles.slice(6, 18);
  const olderArchive = articles.slice(18);
  const topicCounts = new Map(
    peptideCategoryHubs.map((hub) => [
      hub.slug,
      getGuidesForCategoryHub(hub, articles.length).length,
    ]),
  );

  return (
    <>
      <JsonLd data={researchCollectionJsonLd(articles)} />

      <section className="relative overflow-hidden border-b border-white/10 bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.72fr)] lg:items-end lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              <span className="inline-flex items-center gap-2 text-lime">
                <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_0_5px_rgba(217,243,106,.12)]" />
                Evidence desk
              </span>
              <span>·</span>
              <span>{articles.length} published guides</span>
              <span>·</span>
              <span>{peptideCategoryHubs.length} research lanes</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-[clamp(3.4rem,7.2vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.068em]">
              Peptide research guides.
              <span className="mt-2 block text-lime">Evidence before claims.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Follow the clinical evidence, regulatory status and safety context—then
              connect the science to vendor documentation and current market data.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#latest"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-lime px-5 text-sm font-black text-ink transition-colors hover:bg-white"
              >
                Read the latest research
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/compare"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:border-white"
              >
                Compare peptide vendors
              </Link>
            </div>

            <p className="mt-5 max-w-xl text-[10px] leading-5 text-white/35">
              Educational research only, not medical advice. Approval status,
              evidence quality and commercial availability are kept separate.
            </p>
          </div>

          <aside className="rounded-2xl border border-white/15 bg-white/[0.055] p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
              <span>Research index</span>
              <span className="font-mono">05 lanes</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101b17]">
              {peptideCategoryHubs.map((hub, index) => (
                <Link
                  key={hub.slug}
                  href={`/database/${hub.slug}`}
                  className="group grid grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-white/10 px-4 py-4 transition-colors last:border-b-0 hover:bg-white/[0.06]"
                >
                  <span className="font-mono text-[10px] text-white/30">
                    0{index + 1}
                  </span>
                  <span>
                    <strong className="block text-sm text-white group-hover:text-lime">
                      {hub.title}
                    </strong>
                    <span className="mt-1 block text-[10px] text-white/40">
                      {hub.eyebrow}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-lime">
                    {topicCounts.get(hub.slug)}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {lead ? (
        <section id="latest" className="scroll-mt-24 border-b border-line bg-paper">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                  Fresh from the research desk
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
                  Start with what changed.
                </h2>
              </div>
              <a
                href="#archive"
                className="group inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-accent"
              >
                Browse the archive
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
              <Link
                href={`/peptides/${lead.slug}`}
                className="group flex min-h-[450px] flex-col rounded-2xl bg-ink p-7 text-white transition-colors hover:bg-accent-dark sm:p-9"
              >
                <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white/50">
                  <span className="rounded-full bg-lime px-3 py-1 text-ink">
                    Lead analysis
                  </span>
                  <span>{formatDate(lead.updated ?? lead.date)}</span>
                </div>
                <div className="mt-auto max-w-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-lime">
                    {lead.cluster ?? lead.tags?.[0] ?? "Research"}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                    {lead.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                    {lead.excerpt ?? lead.description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-black">
                    Read the full analysis
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>

              <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                {supporting.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/peptides/${article.slug}`}
                    className="group grid gap-3 border-b border-line p-5 transition-colors last:border-b-0 hover:bg-paper sm:grid-cols-[34px_1fr_auto] sm:items-center"
                  >
                    <span className="font-mono text-[10px] text-muted-soft">
                      0{index + 2}
                    </span>
                    <span>
                      <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-accent">
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
      ) : null}

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-9 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                Explore by research lane
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
                Choose the question first.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted lg:justify-self-end">
              Each lane separates approval status, human evidence and research-only
              claims before you drill into an individual compound.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
            {peptideCategoryHubs.map((hub, index) => (
              <Link
                key={hub.slug}
                href={`/database/${hub.slug}`}
                className={`group flex min-h-[310px] flex-col p-6 transition-colors sm:p-7 ${
                  index === 0
                    ? "bg-ink text-white hover:bg-accent-dark"
                    : "bg-surface-2 text-ink hover:bg-paper"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      index === 0 ? "text-lime" : "text-accent"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.12em] ${
                      index === 0 ? "text-white/40" : "text-muted-soft"
                    }`}
                  >
                    {topicCounts.get(hub.slug)} guides
                  </span>
                </div>
                <div className="mt-auto">
                  <p
                    className={`text-[9px] font-black uppercase tracking-[0.14em] ${
                      index === 0 ? "text-lime" : "text-accent"
                    }`}
                  >
                    {hub.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-[1.02] tracking-[-0.035em]">
                    {hub.title}
                  </h3>
                  <p
                    className={`mt-4 line-clamp-3 text-xs leading-6 ${
                      index === 0 ? "text-white/55" : "text-muted"
                    }`}
                  >
                    {hub.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold group-hover:text-accent">
                    Open research lane
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch lg:px-8">
          <div className="rounded-2xl bg-lime p-7 text-ink sm:p-9">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-ink/50">
              Editorial vendor audit
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl">
              Review the paper trail, not the star score.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-ink/65">
              Our vendor reviews separate public batch documents, commercial claims,
              prices and affiliate relationships instead of compressing them into one
              vague rating.
            </p>
            <Link
              href="/market-methodology"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-black"
            >
              Read the market methodology
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <Link
            href="/peptides/ascension-peptides-review"
            className="group flex min-h-[360px] flex-col rounded-2xl border border-line bg-surface-2 p-7 transition-colors hover:border-ink sm:p-9"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-ink px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white">
                Updated audit
              </span>
              <span className="font-mono text-[10px] text-muted-soft">
                02 AUG 2026
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-accent">
                Ascension Peptides
              </p>
              <h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl">
                Exact lots, named labs and the limits of a vendor-hosted COA.
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
                An evidence-led review of public batch records, pricing, shipping,
                research-use status and what PeptideStat did not independently verify.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-ink group-hover:text-accent">
                Read the Ascension review
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section
        id="archive"
        className="scroll-mt-24 border-b border-line bg-surface-2"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">
                Research archive
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
                Continue through the library.
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-soft">
              {articles.length} total · newest first
            </p>
          </div>

          <ArticleList articles={recentArchive} />

          {olderArchive.length ? (
            <details className="group mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-sm font-black text-ink transition-colors hover:bg-canvas sm:px-8">
                <span>Open the complete research index</span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-normal text-muted-soft">
                    {olderArchive.length} more
                  </span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-open:rotate-90" />
                </span>
              </summary>
              <div className="grid border-t border-line md:grid-cols-2">
                {olderArchive.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/peptides/${article.slug}`}
                    className="group/item grid grid-cols-[38px_1fr_auto] items-center gap-3 border-b border-line px-5 py-4 transition-colors hover:bg-canvas md:odd:border-r"
                  >
                    <span className="font-mono text-[9px] text-muted-soft">
                      {String(index + 19).padStart(3, "0")}
                    </span>
                    <span>
                      <span className="block text-[8px] font-black uppercase tracking-[0.12em] text-accent">
                        {article.cluster ?? article.tags?.[0] ?? "Research"}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-5 text-ink group-hover/item:text-accent">
                        {article.title}
                      </span>
                    </span>
                    <span className="hidden whitespace-nowrap font-mono text-[9px] text-muted-soft sm:block">
                      {article.readingTime}
                    </span>
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </section>

      <DisclaimerBanner />
    </>
  );
}
