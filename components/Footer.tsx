import Link from "next/link";
import { siteConfig, shopUrl } from "@/site.config";
import { Logo } from "@/components/Logo";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { externalLinkRel } from "@/lib/externalLinks";
import { ascensionCouponCode } from "@/data/ascensionLinks";
import { AnalyticsChoicesButton } from "@/components/AnalyticsChoicesButton";

const columns = [
  {
    heading: "Research",
    links: [
      { label: "Peptide database", href: "/database" },
      { label: "All research guides", href: "/peptides" },
      { label: "Weight-loss peptides", href: "/database/weight-loss-peptides" },
      { label: "Healing peptides", href: "/database/healing-peptides" },
      { label: "Growth-hormone peptides", href: "/database/growth-hormone-peptides" },
    ],
  },
  {
    heading: "Tools & reviews",
    links: [
      { label: "Calculators", href: "/calculators" },
      { label: "Ascension review", href: "/peptides/ascension-peptides-review" },
      { label: "GLP-1 provider guide", href: "/peptides/where-to-get-glp-1-online" },
      { label: "Retatrutide guide", href: "/peptides/retatrutide" },
      { label: "BPC-157 guide", href: "/peptides/bpc-157" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About PeptideStat", href: "/about" },
      { label: "Editorial policy", href: "/editorial-policy" },
      { label: "Editorial team", href: "/authors/peptidestat-editorial-team" },
      { label: "Affiliate disclosure", href: "/disclaimer" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer({
  showAnalyticsChoices = false,
}: {
  showAnalyticsChoices?: boolean;
}) {
  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 border-b border-canvas/20 pb-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
          <div>
            <Link href="/" aria-label={siteConfig.name} className="inline-block text-canvas">
              <Logo className="h-14 w-auto" />
            </Link>
            <h2 className="mt-8 max-w-2xl font-display text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              Better questions make
              <span className="block italic text-lime">better decisions.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-canvas/60">
              Independent peptide intelligence, searchable data and source-linked
              editorial research. No white-coat theater. No certainty where the
              evidence does not support it.
            </p>
          </div>

          <div className="border border-canvas/30 p-6 sm:p-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-lime">
              Research marketplace partner
            </p>
            <p className="mt-4 text-sm leading-6 text-canvas/65">
              Read our audit first, then browse the current partner catalog with
              code <strong className="font-mono text-canvas">{ascensionCouponCode}</strong>.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/peptides/ascension-peptides-review"
                className="group flex h-11 items-center justify-between gap-3 border border-canvas/35 px-4 text-xs font-bold hover:border-lime hover:text-lime"
              >
                Read the audit
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={shopUrl}
                target="_blank"
                rel={externalLinkRel(shopUrl, { sponsored: true })}
                data-affiliate-placement="footer-partner-shop"
                data-affiliate-product="catalog"
                className="flex h-11 items-center justify-between gap-3 bg-lime px-4 text-xs font-bold text-ink hover:bg-white"
              >
                Partner shop
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-[9px] leading-4 text-canvas/40">
              Research use only. Not approved for human use. Sponsored links may
              earn us a commission at no extra cost to you.
            </p>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <div className="hidden lg:block">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-canvas/40">
              Research desk
              <br />
              Open access
              <br />
              Updated 2026
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.heading} className="flex flex-col gap-3 text-xs">
              <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-canvas/40">
                {column.heading}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-canvas/70 transition-colors hover:text-lime"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-canvas/20 pt-6 text-[9px] uppercase tracking-[0.12em] text-canvas/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Educational content only.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/disclaimer" className="hover:text-canvas">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-canvas">Privacy</Link>
            {showAnalyticsChoices ? <AnalyticsChoicesButton /> : null}
            <Link href="/editorial-policy" className="hover:text-canvas">Editorial policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
