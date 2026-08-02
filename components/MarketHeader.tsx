import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getAllArticles } from "@/lib/content";
import { SearchTrigger, type SearchItem } from "@/components/SearchTrigger";
import { Logo } from "@/components/Logo";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ascensionCouponCode } from "@/data/ascensionLinks";
import { marketListings, vendors } from "@/data/marketplace";

const vendorNavigation = [
  { title: "Compare prices", href: "/compare" },
  { title: "Vendor directory", href: "/vendors" },
  { title: "Vendor reviews", href: "/reviews" },
  { title: "Discount codes", href: "/deals" },
  { title: "Lab tests & COAs", href: "/lab-tests" },
];

const researchNavigation = [
  { title: "Research", href: "/peptides" },
  { title: "Database", href: "/database" },
  { title: "Clinical trials", href: "/clinical-trials" },
];

const toolNavigation = [
  { title: "All calculators", href: "/calculators" },
  { title: "Reconstitution", href: "/calculators#reconstitution" },
  { title: "Accumulation", href: "/calculators/accumulation" },
  { title: "Unit converter", href: "/calculators/unit-converter" },
  { title: "Peptide chemistry", href: "/calculators/peptide-chemistry" },
];

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="m2.5 4.5 3.5 3 3.5-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopMenu({
  title,
  links,
}: {
  title: string;
  links: typeof vendorNavigation;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className="flex items-center gap-1.5 text-ink-soft transition-colors group-hover:text-accent group-focus-within:text-accent"
      >
        {title}
        <ChevronIcon className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility] duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-xl border border-line bg-paper p-2 shadow-[0_18px_55px_rgba(16,29,23,0.16)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-10 items-center rounded-lg px-3 text-[11px] font-bold text-ink-soft transition-colors hover:bg-surface-2 hover:text-accent"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <details className="group relative lg:hidden">
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg border border-line-strong px-3 text-[11px] font-bold text-ink hover:border-ink [&::-webkit-details-marker]:hidden">
        <MenuIcon className="h-4 w-4 group-open:hidden" />
        <CloseIcon className="hidden h-4 w-4 group-open:block" />
        Menu
      </summary>
      <div className="absolute right-0 top-full z-50 mt-3 w-[min(21rem,calc(100vw-2rem))] rounded-xl border border-line bg-paper p-3 shadow-[0_18px_55px_rgba(16,29,23,0.18)]">
        <p className="px-2 pb-2 pt-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-muted">
          Vendors
        </p>
        <div className="grid grid-cols-2 gap-1">
          {vendorNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-10 items-center rounded-lg px-2 text-[11px] font-bold text-ink-soft hover:bg-surface-2 hover:text-accent"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="my-3 border-t border-line" />
        <p className="px-2 pb-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-muted">
          Research
        </p>
        <div className="grid grid-cols-2 gap-1">
          {researchNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-10 items-center rounded-lg px-2 text-[11px] font-bold text-ink-soft hover:bg-surface-2 hover:text-accent"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="my-3 border-t border-line" />
        <p className="px-2 pb-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-muted">
          Tools
        </p>
        <div className="grid grid-cols-2 gap-1">
          {toolNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-10 items-center rounded-lg px-2 text-[11px] font-bold text-ink-soft hover:bg-surface-2 hover:text-accent"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}

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
        <div className="flex items-center gap-7 xl:gap-10">
          <Link href="/" aria-label={siteConfig.name} className="flex items-center text-ink hover:opacity-75">
            <Logo className="h-8 w-auto sm:h-10" />
          </Link>

          <nav className="hidden items-center gap-4 text-[11px] font-bold lg:flex xl:gap-6">
            <DesktopMenu title="Vendors" links={vendorNavigation} />
            {researchNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-ink-soft transition-colors hover:text-accent">
                {item.title}
              </Link>
            ))}
            <DesktopMenu title="Tools" links={toolNavigation} />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SearchTrigger items={items} />
          <Link href="/compare" className="hidden h-10 items-center rounded-lg bg-ink px-4 text-xs font-bold text-white transition-colors hover:bg-accent-dark sm:inline-flex">
            Compare prices
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
