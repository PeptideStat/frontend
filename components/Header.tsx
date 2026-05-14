import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-white"
          >
            P
          </span>
          <span className="text-lg">{siteConfig.name}</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
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
    </header>
  );
}
