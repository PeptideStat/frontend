const defaultShopUrl =
  "https://ascensionpeptides.com/ref/mihaita/?campaign=rand";
export const shopUrl =
  process.env.NEXT_PUBLIC_SHOP_URL?.trim() || defaultShopUrl;
const isExternalUrl = (href: string) => /^https?:\/\//i.test(href);

/**
 * Single source of truth for site-wide metadata.
 * Used by layout metadata, SEO helpers, sitemap, robots and JSON-LD.
 */
export const siteConfig = {
  name: "PeptideStat",
  tagline: "Evidence-based peptide research, decoded",
  title: "PeptideStat — Evidence-Based Peptide Guides & Reviews",
  description:
    "In-depth, research-backed guides on peptides — dosing, benefits, side effects and how they compare. Clear answers for people researching peptides.",
  // Set NEXT_PUBLIC_SITE_URL in production (Vercel env var).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://peptidestat.com",
  locale: "en_US",
  author: {
    name: "PeptideStat Editorial Team",
    url: "/authors/peptidestat-editorial-team",
  },
  // Social handle (without @) — used for Twitter/X card metadata.
  twitter: "peptidestat",
  // Contact address shown on legal pages (Privacy, Disclaimer).
  contactEmail: "admin@peptidestat.com",
  nav: [
    {
      title: "Shop Peptides",
      href: shopUrl,
      external: isExternalUrl(shopUrl),
      sponsored: isExternalUrl(shopUrl),
    },
    { title: "Calculators", href: "/calculators" },
    { title: "Database", href: "/database" },
    { title: "Guides", href: "/peptides" },
    { title: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
