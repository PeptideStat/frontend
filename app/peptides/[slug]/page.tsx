import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx";
import { CalculatorPresetLinks } from "@/components/CalculatorPresetLinks";
import {
  RelatedCategoryHubs,
  RelatedDatabaseEntries,
  RelatedGuides,
  RelatedMarketComparisons,
} from "@/components/InternalLinkBlocks";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { ArticlePartnerCard } from "@/components/ArticlePartnerCard";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/format";
import {
  getArticleRelatedCategoryHubs,
  getArticleRelatedComparisons,
  getArticleRelatedPeptides,
} from "@/lib/internalLinks";
import { siteConfig } from "@/site.config";
import { clinicalTrialQueries } from "@/lib/clinicalTrials";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles({ includeFuture: true }).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/peptides/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: "Article not found" };

  const meta = buildMetadata({
    title: article.metaTitle ?? article.title,
    description: article.description,
    path: `/peptides/${article.slug}`,
    image: article.coverImage,
    type: "article",
  });

  return {
    ...meta,
    authors: [{ name: article.author ?? siteConfig.author.name }],
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage(
  props: PageProps<"/peptides/[slug]">,
) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(slug);
  const relatedPeptides = getArticleRelatedPeptides(article, 5);
  const relatedComparisons = getArticleRelatedComparisons(article, 3);
  const relatedHubs = getArticleRelatedCategoryHubs(article, 2);
  const relatedTrialPeptides = relatedPeptides
    .map((peptide) => ({
      peptide,
      query: clinicalTrialQueries.find(
        (query) =>
          query.slug === peptide.slug || query.databaseSlug === peptide.slug,
      ),
    }))
    .filter((item) => item.query !== undefined);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Research library", path: "/peptides" },
    { name: article.title, path: `/peptides/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {article.faqs && article.faqs.length > 0 && (
        <JsonLd data={faqPageJsonLd(article.faqs)} />
      )}

      <article>
        <header className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted"
            >
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <span key={crumb.path} className="flex items-center gap-2">
                    {isLast ? (
                      <span className="max-w-52 truncate text-muted-soft">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.path} className="hover:text-cobalt">
                        {crumb.name}
                      </Link>
                    )}
                    {!isLast && <span aria-hidden>→</span>}
                  </span>
                );
              })}
            </nav>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {article.pillar ? "Definitive guide" : "Research note"}
                  {article.cluster && (
                    <>
                      <span className="h-px w-8 bg-line-strong" />
                      {article.cluster}
                    </>
                  )}
                </div>
                <h1 className="mt-5 max-w-5xl text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-ink">
                  {article.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
                  {article.description}
                </p>
              </div>

              <dl className="rounded-xl border border-line bg-paper px-5 text-[10px] uppercase tracking-[0.12em]">
                <div className="grid grid-cols-2 border-b border-line py-3">
                  <dt className="font-bold text-muted">Published</dt>
                  <dd className="text-right text-ink">{formatDate(article.date)}</dd>
                </div>
                <div className="grid grid-cols-2 border-b border-line py-3">
                  <dt className="font-bold text-muted">Last reviewed</dt>
                  <dd className="text-right text-ink">
                    {formatDate(article.updated ?? article.date)}
                  </dd>
                </div>
                <div className="grid grid-cols-2 border-b border-line py-3">
                  <dt className="font-bold text-muted">Reading time</dt>
                  <dd className="text-right text-ink">{article.readingTime}</dd>
                </div>
                <div className="grid grid-cols-2 py-3">
                  <dt className="font-bold text-muted">By</dt>
                  <dd className="text-right normal-case tracking-normal text-ink">
                    <Link href={article.authorUrl ?? siteConfig.author.url} className="hover:text-cobalt">
                      {article.author ?? siteConfig.author.name}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,760px)_300px] lg:justify-between lg:gap-16 lg:px-8 lg:py-20">
          <div className="min-w-0">
            <p className="border-l-2 border-coral pl-4 text-xs leading-5 text-muted sm:pl-5">
              Educational only — not medical advice.
            </p>

            <div className="mt-8">
              <MDXRemote
                source={article.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {article.faqs && article.faqs.length > 0 && (
              <section
                aria-labelledby="article-faq-heading"
                className="mt-12 border-t border-line pt-10"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
                  Direct answers
                </p>
                <h2
                  id="article-faq-heading"
                  className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink"
                >
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-line border-y border-line">
                  {article.faqs.map((faq) => (
                    <div key={faq.question} className="py-6">
                      <h3 className="text-base font-bold text-ink">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 border-t border-line pt-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted">
                  Filed under
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line bg-surface-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <Disclaimer />
            </div>
          </div>

          <div>
            <div className="lg:sticky lg:top-32">
              <ArticlePartnerCard
                slug={article.slug}
                title={article.title}
                description={article.description}
                cluster={article.cluster}
                tags={article.tags}
              />
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-surface">
        {relatedTrialPeptides.length ? (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-xl bg-ink p-6 text-white sm:p-8">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-lime">
                Clinical-trial database
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                Follow the registered studies.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {relatedTrialPeptides.map(({ peptide, query }) => (
                  <Link
                    key={peptide.slug}
                    href={`/clinical-trials/${query!.slug}`}
                    className="border border-white/20 px-4 py-3 text-xs font-bold text-white/75 hover:border-lime hover:text-lime"
                  >
                    {peptide.name} trials →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <RelatedDatabaseEntries
          peptides={relatedPeptides}
          title="Continue in the database"
          description="Structured status, mechanism and evidence notes for compounds connected to this guide."
          currentArticleSlug={article.slug}
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        />
        <RelatedMarketComparisons
          compounds={relatedComparisons}
          description="Current commercial listings are kept separate from the scientific evidence in this guide."
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        />
        <RelatedCalculators
          title="Work with the numbers"
          description="Open reconstitution, unit-conversion and accumulation tools with editable examples."
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        />
        <CalculatorPresetLinks
          peptides={relatedPeptides}
          title="Prefilled calculator shortcuts"
          description="Open calculators with editable examples for compounds mentioned around this guide."
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        />
        <RelatedCategoryHubs
          hubs={relatedHubs}
          title="Explore the wider category"
          description="Compare the broader evidence landscape before focusing on one compound."
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        />
        <RelatedGuides
          articles={related}
          title="Read next"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        />
      </section>
    </>
  );
}
