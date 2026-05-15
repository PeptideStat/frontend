import Link from "next/link";
import { siteConfig } from "@/site.config";

/**
 * Multi-column footer modelled on peptide-db.com's grouping:
 * Browse / Resources / Legal. Kept lean — no fake links to features that
 * don't exist yet.
 */

interface FooterColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

const columns: FooterColumn[] = [
  {
    heading: "Browse",
    links: [
      { label: "Peptide database", href: "/database" },
      { label: "All guides", href: "/peptides" },
      { label: "Retatrutide", href: "/peptides/retatrutide" },
      { label: "BPC-157", href: "/peptides/bpc-157" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "How we research", href: "/about" },
      { label: "Editorial standards", href: "/about" },
      { label: "Affiliate disclosure", href: "/about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Disclaimer", href: "/about" },
      { label: "Privacy policy", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span
                aria-hidden
                className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-dark text-sm font-bold text-white"
              >
                P
              </span>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} className="flex flex-col gap-2 text-sm">
              <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-soft">
                {column.heading}
              </span>
              {column.links.map((link) => (
                <Link
                  key={`${column.heading}-${link.label}`}
                  href={link.href}
                  className="text-ink-soft transition-colors hover:text-accent-bright"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Educational
            content only — not medical advice.
          </p>
          <p>
            Articles may contain affiliate links; we may earn a commission at no
            extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
