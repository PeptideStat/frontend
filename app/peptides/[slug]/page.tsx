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
  getArticleRelatedPeptides,
} from "@/lib/internalLinks";
import { siteConfig } from "@/site.config";

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
  const relatedHubs = getArticleRelatedCategoryHubs(article, 2);
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
                <div className="grid grid-cols-2 border-b border-line py-3">
                  <dt className="font-bold text-muted">By</dt>
                  <dd className="text-right normal-case tracking-normal text-ink">
                    <Link href={siteConfig.author.url} className="hover:text-cobalt">
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
            <div className="border-l-2 border-coral pl-5 text-xs leading-5 text-muted sm:pl-6">
              This article separates published evidence from commercial claims.
              It is educational, not medical advice.
            </div>

            <div className="mt-8">
              <MDXRemote
                source={article.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

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

          <div className="order-first lg:order-none">
            <div className="lg:sticky lg:top-32">
              <ArticlePartnerCard
                slug={article.slug}
                title={article.title}
                cluster={article.cluster}
                tags={article.tags}
              />
              <div className="mt-8 hidden border-t border-ink pt-4 lg:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
                  Editorial standard
                </p>
                <p className="mt-3 text-[11px] leading-5 text-muted">
                  Sources remain linked in the reference list. Partner placement
                  never changes our evidence grading or conclusions.
                </p>
                <Link
                  href="/editorial-policy"
                  className="mt-3 inline-block border-b border-line text-[10px] font-bold text-ink hover:border-cobalt hover:text-cobalt"
                >
                  Read our editorial policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-surface">
        <RelatedDatabaseEntries
          peptides={relatedPeptides}
          title="Continue in the database"
          description="Structured status, mechanism and evidence notes for compounds connected to this guide."
          currentArticleSlug={article.slug}
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
