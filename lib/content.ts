import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

/**
 * File-based MDX content layer.
 *
 * Articles live in `content/peptides/<slug>.mdx`. The URL slug is the file
 * name, which keeps article URLs flat at `/peptides/<slug>` — pillar pages
 * and cluster articles are grouped logically via the `cluster` frontmatter
 * field, not via nested routes.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "peptides");

export interface ArticleFrontmatter {
  /** Page <title> and on-page H1. */
  title: string;
  /** Meta description — keep ~150-160 chars. */
  description: string;
  /** Short summary shown on cards/listings. Falls back to `description`. */
  excerpt?: string;
  /** ISO date (YYYY-MM-DD) the article was published. */
  date: string;
  /** ISO date the article was last reviewed/updated. */
  updated?: string;
  /** Path to a cover image under /public, e.g. "/images/retatrutide.jpg". */
  coverImage?: string;
  /** Display name of the author. Defaults to the editorial team. */
  author?: string;
  /** Free-form tags for grouping/related content. */
  tags?: string[];
  /** Topic-cluster key, e.g. "retatrutide". Ties cluster articles together. */
  cluster?: string;
  /** True for the pillar/hub article of a cluster. */
  pillar?: boolean;
  /** Optional FAQ entries used for FAQPage structured data. */
  faqs?: { question: string; answer: string }[];
  /** Hide from listings, sitemap and build output. */
  draft?: boolean;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
  /** Human-readable reading time, e.g. "6 min read". */
  readingTime: string;
}

export interface Article extends ArticleMeta {
  /** Raw MDX body (frontmatter stripped). */
  content: string;
}

type ArticleMetaWithOptionalContent = ArticleMeta & { content?: string };

function contentDirExists(): boolean {
  return fs.existsSync(CONTENT_DIR);
}

export function getArticleSlugs(): string[] {
  if (!contentDirExists()) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content).text,
    content,
  };
}

interface GetArticlesOptions {
  includeDrafts?: boolean;
  /** Include articles whose `date` is in the future. Off by default so a
   *  staggered publishing schedule can sit in the repo unpublished. */
  includeFuture?: boolean;
}

/** All articles as metadata only (no MDX body), newest first. */
export function getAllArticles({
  includeDrafts = false,
  includeFuture = false,
}: GetArticlesOptions = {}): ArticleMeta[] {
  const now = Date.now();
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .filter((article) => includeDrafts || !article.draft)
    .filter(
      (article) => includeFuture || new Date(article.date).getTime() <= now,
    )
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((article) => {
      const meta: ArticleMetaWithOptionalContent = { ...article };
      delete meta.content;
      return meta;
    });
}

/** Articles belonging to a topic cluster, pillar first. */
export function getArticlesByCluster(cluster: string): ArticleMeta[] {
  return getAllArticles()
    .filter((article) => article.cluster === cluster)
    .sort((a, b) => Number(b.pillar ?? false) - Number(a.pillar ?? false));
}

/** Up to `limit` articles related to the given slug (same cluster, then same tags). */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const others = getAllArticles().filter((article) => article.slug !== slug);
  const sameCluster = current.cluster
    ? others.filter((article) => article.cluster === current.cluster)
    : [];
  const sameTags = others.filter(
    (article) =>
      !sameCluster.includes(article) &&
      article.tags?.some((tag) => current.tags?.includes(tag)),
  );

  return [...sameCluster, ...sameTags].slice(0, limit);
}
