import Link from "next/link";
import { siteConfig, shopUrl } from "@/site.config";
import { getAllArticles } from "@/lib/content";
import { SearchTrigger, type SearchItem } from "@/components/SearchTrigger";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { externalLinkRel } from "@/lib/externalLinks";
import { ascensionCouponCode } from "@/data/ascensionLinks";

const navigation = [
  { title: "Database", href: "/database" },
  { title: "Guides", href: "/peptides" },
  { title: "Calculators", href: "/calculators" },
  { title: "Reviews", href: "/peptides/ascension-peptides-review" },
];

export function Header() {
  const items: SearchItem[] = getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    cluster: article.cluster,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-xl">
      <div className="bg-accent-dark text-white">
        <div className="mx-auto flex min-h-8 max-w-7xl items-center justify-between gap-4 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-6 lg:px-8">
          <span className="hidden text-white/60 sm:inline">
            Independent research desk · affiliate-supported
          </span>
          <a
            href={shopUrl}
            target="_blank"
            rel={externalLinkRel(shopUrl, { sponsored: true })}
            data-affiliate-placement="header-announcement"
            data-affiliate-product="catalog"
            className="group flex w-full items-center justify-center gap-2 py-2 text-lime transition-colors hover:text-white sm:w-auto sm:justify-end"
          >
            Research partner marketplace
            <span className="text-white/50">Code {ascensionCouponCode}</span>
            <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex items-center text-ink transition-opacity hover:opacity-75"
          >
            <Logo className="h-8 w-auto sm:h-11" />
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-semibold md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-2 text-ink-soft transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-cobalt after:transition-transform hover:text-ink hover:after:scale-x-100"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchTrigger items={items} />
          <a
            href={shopUrl}
            target="_blank"
            rel={externalLinkRel(shopUrl, { sponsored: true })}
            data-affiliate-placement="header-partner-shop"
            data-affiliate-product="catalog"
            className="hidden h-10 items-center gap-2 rounded-lg bg-ink px-4 text-xs font-bold text-white transition-colors hover:bg-accent sm:inline-flex"
          >
            Partner shop
            <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
          </a>
          <Link
            href="/database"
            className="inline-flex h-10 items-center rounded-lg border border-line-strong px-3 text-xs font-bold text-ink transition-colors hover:border-ink sm:hidden"
          >
            Index
          </Link>
        </div>
      </div>
    </header>
  );
}
