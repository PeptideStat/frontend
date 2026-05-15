import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getAllArticles } from "@/lib/content";
import { SearchTrigger, type SearchItem } from "@/components/SearchTrigger";
import { Logo } from "@/components/Logo";

/**
 * Top-of-page header with logo, primary nav and the ⌘K search trigger.
 *
 * The article list is fetched on the server here and passed to the client-
 * side `SearchTrigger` as plain data — that keeps the MDX content layer
 * out of the client bundle.
 */
export function Header() {
  const items: SearchItem[] = getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    cluster: article.cluster,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex items-center text-ink transition-colors hover:text-accent-bright"
          >
            <Logo className="h-9 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SearchTrigger items={items} />
          <Link
            href="/database"
            className="hidden h-9 items-center rounded-md bg-accent px-4 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright sm:inline-flex"
          >
            Browse peptides
          </Link>
        </div>
      </div>
    </header>
  );
}
