import { getAscensionShopUrl } from "@/data/ascensionLinks";

const defaultShopUrl = getAscensionShopUrl("nav_shop");
export const shopUrl =
  process.env.NEXT_PUBLIC_SHOP_URL?.trim() || defaultShopUrl;
const defaultSiteUrl = "https://www.peptidestat.com";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
const canonicalSiteUrl = rawSiteUrl.replace(
  /^https:\/\/peptidestat\.com\/?$/i,
  defaultSiteUrl,
);

export const siteConfig = {
  name: "PeptideStat",
  tagline: "Compare prices. Check testing. Read the evidence.",
  title: "PeptideStat — Peptide Vendor Prices & Discount Codes",
  description:
    "Compare research-peptide vendor prices, published testing documentation and current discount codes, backed by an evidence-led peptide research library.",
  url: canonicalSiteUrl.replace(/\/$/, ""),
  locale: "en_US",
  author: {
    name: "PeptideStat Editorial Team",
    url: "/authors/peptidestat-editorial-team",
    type: "Organization",
  },
  twitter: "peptidestat",
  contactEmail: "admin@peptidestat.com",
  indexNowKey: "edb8b768a066cfe25ce55be1268c90ce",
  nav: [
    { title: "Compare", href: "/compare" },
    { title: "Vendors", href: "/vendors" },
    { title: "Reviews", href: "/reviews" },
    { title: "Discount Codes", href: "/deals" },
    { title: "Calculators", href: "/calculators" },
    { title: "Database", href: "/database" },
    { title: "Research", href: "/peptides" },
    { title: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
