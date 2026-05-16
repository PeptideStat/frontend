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
import { ArticleList } from "@/components/ArticleList";
import { Disclaimer } from "@/components/Disclaimer";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/site.config";

// Only build pages that exist as MDX files; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
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
    title: article.title,
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
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Peptides", path: "/peptides" },
    { name: article.title, path: `/peptides/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <article className="mx-auto max-w-2xl px-5 py-12">
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
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 672px"
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

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Related reading
          </h2>
          <ArticleList articles={related} />
        </section>
      )}
    </>
  );
}
