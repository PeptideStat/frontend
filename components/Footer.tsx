import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-semibold tracking-tight">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-ink">Explore</span>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors hover:text-accent"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. For educational
            purposes only — not medical advice. Articles may contain affiliate
            links; we may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
