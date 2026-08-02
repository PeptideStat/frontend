import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { MarketHeader } from "@/components/MarketHeader";
import { MarketFooter } from "@/components/MarketFooter";
import { AffiliateClickTracker } from "@/components/AffiliateClickTracker";
import { TraceDartAnalytics } from "@/components/TraceDartAnalytics";

// TraceDart's browser key is a public site identifier by design. Collection is
// restricted by the allowed origins configured for this key in TraceDart.
const TRACEDART_BROWSER_KEY =
  "td_sk_QrSMFYFCgABspJNVDkB55okAU6dnp7Fo9aFI7w_Ni9g";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1744,
        height: 909,
        alt: "PeptideStat — Compare the market. Read the evidence.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${siteConfig.twitter}`,
    creator: `@${siteConfig.twitter}`,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <MarketHeader />
        <main className="flex-1">{children}</main>
        <MarketFooter showAnalyticsChoices />
        <Analytics />
        <AffiliateClickTracker />
        <TraceDartAnalytics apiKey={TRACEDART_BROWSER_KEY} />
      </body>
    </html>
  );
}
