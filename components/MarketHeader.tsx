import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getAllArticles } from "@/lib/content";
import { SearchTrigger, type SearchItem } from "@/components/SearchTrigger";
import { Logo } from "@/components/Logo";
import { ascensionCouponCode } from "@/data/ascensionLinks";
import { marketListings, vendors } from "@/data/marketplace";

const navigation = [
  { title: "Compare", href: "/compare" },
  { title: "Vendors", href: "/vendors" },
  { title: "Discount codes", href: "/deals" },
  { title: "Research", href: "/peptides" },
  { title: "Tools", href: "/calculators" },
];

export function MarketHeader() {
  const items: SearchItem[] = getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    cluster: article.cluster,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-xl">
      <div className="bg-ink text-white">
        <div className="mx-auto flex min-h-8 max-w-7xl items-center justify-between gap-4 px-4 text-[9px] font-bold uppercase tracking-[0.15em] sm:px-6 lg:px-8">
          <span className="hidden items-center gap-3 text-white/45 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Tracking {vendors.length} vendors · {marketListings.length} listings · checked Aug 02
          </span>
          <Link href="/deals" className="flex w-full items-center justify-center gap-2 py-2 text-lime hover:text-white sm:w-auto">
            Current partner code
            <span className="font-mono text-white">{ascensionCouponCode}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" aria-label={siteConfig.name} className="flex items-center text-ink hover:opacity-75">
            <Logo className="h-8 w-auto sm:h-10" />
          </Link>

          <nav className="hidden items-center gap-6 text-[12px] font-bold md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-ink-soft transition-colors hover:text-accent">
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SearchTrigger items={items} />
          <Link href="/deals" className="hidden h-10 items-center rounded-lg border border-line-strong px-3 text-xs font-bold text-ink hover:border-ink sm:inline-flex md:hidden">
            Codes
          </Link>
          <Link href="/compare" className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-xs font-bold text-white transition-colors hover:bg-accent-dark">
            Compare prices
          </Link>
        </div>
      </div>
    </header>
  );
}
