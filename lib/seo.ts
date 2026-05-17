import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import type { ArticleMeta } from "@/lib/content";

/** Absolute URL for a given path, based on the configured site URL. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

interface PageMetaInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/peptides". */
  path: string;
  /** Override the social image. Defaults to the route's generated OG image. */
  image?: string;
  /** Mark a page as an article for Open Graph typing. */
  type?: "website" | "article";
}

/** Build a consistent Metadata object for any route. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: `@${siteConfig.twitter}`,
      creator: `@${siteConfig.twitter}`,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** schema.org Organization + WebSite — rendered once on the homepage. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [`https://x.com/${siteConfig.twitter}`],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function webApplicationJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/** schema.org Article — rendered on each article page. */
export function articleJsonLd(article: ArticleMeta) {
  const url = absoluteUrl(`/peptides/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      "@type": "Organization",
      name: article.author ?? siteConfig.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: url,
    url,
    ...(article.coverImage
      ? { image: absoluteUrl(article.coverImage) }
      : {}),
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** schema.org BreadcrumbList for an article. */
export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
