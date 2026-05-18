import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
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

// Only build pages that exist as MDX files; unknown slugs 404. Include future
// articles here so internal links never 404 while scheduled posts remain hidden
// from listings/sitemap until their date.
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

  if (!article) {
    return { title: "Article not found" };
  }

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

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(slug);
  const relatedPeptides = getArticleRelatedPeptides(article, 5);
  const relatedHubs = getArticleRelatedCategoryHubs(article, 2);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Peptides", path: "/peptides" },
    { name: article.title, path: `/peptides/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {article.faqs && article.faqs.length > 0 && (
        <JsonLd data={faqPageJsonLd(article.faqs)} />
      )}

      <article className="mx-auto max-w-4xl px-5 py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-muted"
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={crumb.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="line-clamp-1 text-ink-soft">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="transition-colors hover:text-accent-bright"
                  >
                    {crumb.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden>/</span>}
              </span>
            );
          })}
        </nav>

        {/* Header */}
        <header className="mt-6">
          {article.pillar && (
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Complete Guide
            </span>
          )}
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {article.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link
              href={siteConfig.author.url}
              className="transition-colors hover:text-accent-bright"
            >
              {article.author ?? siteConfig.author.name}
            </Link>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime}</span>
            {article.updated && (
              <>
                <span aria-hidden>·</span>
                <span>Updated {formatDate(article.updated)}</span>
              </>
            )}
          </div>
        </header>

        {article.coverImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface-2">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt ?? article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="mt-8">
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Disclaimer />
        </div>
      </article>

      <RelatedDatabaseEntries
        peptides={relatedPeptides}
        title="Related database entries"
        description="Jump from this guide into structured peptide database pages with evidence scores, status and mechanism notes."
        currentArticleSlug={article.slug}
        className="mx-auto max-w-5xl px-5 py-8"
      />

      <RelatedCalculators
        title="Peptide calculators"
        description="Use these tools for reconstitution math, unit conversion and repeated-dose accumulation estimates."
        className="mx-auto max-w-5xl px-5 py-8"
      />

      <CalculatorPresetLinks
        peptides={relatedPeptides}
        title="Prefilled calculator shortcuts"
        description="Open calculators with editable example values for peptides mentioned around this guide."
        className="mx-auto max-w-5xl px-5 py-8"
      />

      <RelatedCategoryHubs
        hubs={relatedHubs}
        title="Related peptide categories"
        description="Compare the wider category before going deeper on a single compound."
        className="mx-auto max-w-5xl px-5 py-8"
      />

      <RelatedGuides
        articles={related}
        title="Related guides"
        className="mx-auto max-w-5xl px-5 py-8"
      />
    </>
  );
}
