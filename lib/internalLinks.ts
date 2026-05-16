import {
  peptides,
  type Peptide,
  type PeptideCategory,
} from "@/data/peptides";
import { getPeptideEvidence } from "@/data/peptideEvidence";
import {
  getPeptideCategoryHubByCategory,
  type PeptideCategoryHub,
} from "@/data/peptideCategoryHubs";
import {
  getAllArticles,
  type Article,
  type ArticleMeta,
} from "@/lib/content";

type ArticleLike = Article | ArticleMeta;

const CATEGORY_KEYWORDS: Record<PeptideCategory, string[]> = {
  "weight-loss": [
    "glp-1",
    "weight loss",
    "obesity",
    "tirzepatide",
    "semaglutide",
    "retatrutide",
    "liraglutide",
    "cagrilintide",
    "survodutide",
    "mounjaro",
    "zepbound",
    "ozempic",
    "wegovy",
    "saxenda",
  ],
  "healing-recovery": [
    "bpc-157",
    "tb-500",
    "healing",
    "recovery",
    "tissue repair",
    "tendon",
    "injury",
  ],
  "growth-hormone": [
    "growth hormone",
    "ghrh",
    "gh secretagogue",
    "ipamorelin",
    "sermorelin",
    "cjc-1295",
    "tesamorelin",
  ],
  longevity: [
    "longevity",
    "ghk-cu",
    "copper peptide",
    "hair growth",
    "hair loss",
    "bryan johnson",
    "skin",
  ],
  cognitive: [
    "cognitive",
    "nootropic",
    "selank",
    "semax",
    "anxiety",
    "focus",
    "neuroprotection",
  ],
  "metabolic-health": [
    "metabolic",
    "glucose",
    "insulin",
    "diabetes",
  ],
};

const STATUS_WEIGHT: Record<Peptide["status"], number> = {
  approved: 3,
  investigational: 2,
  "research-only": 1,
};

function normalize(value: string): string {
  return value.toLowerCase();
}

function articleHaystack(article: ArticleLike): string {
  return normalize(
    [
      article.slug,
      article.title,
      article.description,
      article.cluster,
      ...(article.tags ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function peptideTokens(peptide: Peptide): string[] {
  return [
    peptide.slug,
    peptide.name,
    ...(peptide.aliases?.split(",").map((alias) => alias.trim()) ?? []),
  ]
    .map(normalize)
    .filter((token) => token.length > 2);
}

function includesAny(haystack: string, tokens: string[]): boolean {
  return tokens.some((token) => haystack.includes(normalize(token)));
}

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function compareArticles(a: ArticleMeta, b: ArticleMeta): number {
  if (Boolean(a.pillar) !== Boolean(b.pillar)) {
    return Number(Boolean(b.pillar)) - Number(Boolean(a.pillar));
  }

  return +new Date(b.date) - +new Date(a.date);
}

export function inferArticleCategories(article: ArticleLike): PeptideCategory[] {
  const haystack = articleHaystack(article);
  return (Object.keys(CATEGORY_KEYWORDS) as PeptideCategory[]).filter(
    (category) => includesAny(haystack, CATEGORY_KEYWORDS[category]),
  );
}

export function getArticleRelatedPeptides(
  article: ArticleLike,
  limit = 5,
): Peptide[] {
  const haystack = articleHaystack(article);
  const inferredCategories = new Set(inferArticleCategories(article));

  return peptides
    .map((peptide) => {
      let score = 0;
      if (peptide.articleSlug === article.slug) score += 100;
      if (includesAny(haystack, peptideTokens(peptide))) score += 55;
      if (inferredCategories.has(peptide.category)) score += 14;

      return { peptide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      const evidenceA = getPeptideEvidence(a.peptide.slug)?.score ?? 0;
      const evidenceB = getPeptideEvidence(b.peptide.slug)?.score ?? 0;
      if (evidenceB !== evidenceA) return evidenceB - evidenceA;

      const statusDiff =
        STATUS_WEIGHT[b.peptide.status] - STATUS_WEIGHT[a.peptide.status];
      if (statusDiff !== 0) return statusDiff;

      return a.peptide.name.localeCompare(b.peptide.name);
    })
    .slice(0, limit)
    .map((item) => item.peptide);
}

export function getArticleRelatedCategoryHubs(
  article: ArticleLike,
  limit = 3,
): PeptideCategoryHub[] {
  const categories = [
    ...getArticleRelatedPeptides(article, 8).map((peptide) => peptide.category),
    ...inferArticleCategories(article),
  ];

  return uniqueBySlug(
    categories
      .map((category) => getPeptideCategoryHubByCategory(category))
      .filter((hub): hub is PeptideCategoryHub => hub !== null),
  ).slice(0, limit);
}

export function getGuidesForPeptide(
  peptide: Peptide,
  limit = 4,
): ArticleMeta[] {
  const tokens = peptideTokens(peptide);
  const categoryTokens = CATEGORY_KEYWORDS[peptide.category];

  return getAllArticles()
    .map((article) => {
      const haystack = articleHaystack(article);
      let score = 0;

      if (peptide.articleSlug === article.slug) score += 100;
      if (includesAny(haystack, tokens)) score += 55;
      if (article.cluster && includesAny(normalize(article.cluster), tokens)) {
        score += 25;
      }
      if (includesAny(haystack, categoryTokens)) score += 8;

      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return compareArticles(a.article, b.article);
    })
    .slice(0, limit)
    .map((item) => item.article);
}

export function getGuidesForCategoryHub(
  hub: PeptideCategoryHub,
  limit = 6,
): ArticleMeta[] {
  const categoryPeptides = peptides.filter(
    (peptide) => peptide.category === hub.category,
  );
  const articleSlugs = new Set(
    categoryPeptides
      .map((peptide) => peptide.articleSlug)
      .filter((slug): slug is string => Boolean(slug)),
  );
  const peptideSearchTokens = categoryPeptides.flatMap(peptideTokens);
  const categoryTokens = CATEGORY_KEYWORDS[hub.category];

  return getAllArticles()
    .map((article) => {
      const haystack = articleHaystack(article);
      let score = 0;

      if (articleSlugs.has(article.slug)) score += 85;
      if (includesAny(haystack, peptideSearchTokens)) score += 40;
      if (includesAny(haystack, categoryTokens)) score += 24;
      if (article.pillar) score += 8;

      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return compareArticles(a.article, b.article);
    })
    .slice(0, limit)
    .map((item) => item.article);
}
