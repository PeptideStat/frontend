import Link from "next/link";
import { AnalyticsChoicesButton } from "@/components/AnalyticsChoicesButton";
import { Logo } from "@/components/Logo";
import { ascensionCouponCode } from "@/data/ascensionLinks";
import { siteConfig } from "@/site.config";

const columns = [
  {
    heading: "Market",
    links: [
      ["Compare prices", "/compare"],
      ["Vendor directory", "/vendors"],
      ["Vendor reviews", "/reviews"],
      ["US vendors", "/vendors/usa"],
      ["UAE & GCC vendors", "/vendors/uae"],
      ["Discount codes", "/deals"],
    ],
  },
  {
    heading: "Research",
    links: [
      ["All research guides", "/peptides"],
      ["Peptide database", "/database"],
      ["BPC-157 guide", "/peptides/bpc-157"],
      ["Retatrutide guide", "/peptides/retatrutide"],
    ],
  },
  {
    heading: "Standards",
    links: [
      ["Market methodology", "/market-methodology"],
      ["Transparency report", "/reports/peptide-vendor-transparency-2026"],
      ["Editorial policy", "/editorial-policy"],
      ["Affiliate disclosure", "/disclaimer"],
      ["About PeptideStat", "/about"],
      ["Privacy", "/privacy"],
    ],
  },
] as const;

export function MarketFooter({ showAnalyticsChoices = false }: { showAnalyticsChoices?: boolean }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            <Link href="/" aria-label={siteConfig.name} className="inline-block text-white">
              <Logo className="h-12 w-auto" />
            </Link>
            <h2 className="mt-8 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl">
              Compare the market.<br /><span className="text-lime">Then read the evidence.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
              Price snapshots, vendor-published documentation and source-linked peptide research in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.045] p-6 sm:p-8">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-lime">Current partner code</p>
            <p className="mt-4 font-mono text-3xl font-bold tracking-[-0.04em]">{ascensionCouponCode}</p>
            <p className="mt-4 text-xs leading-6 text-white/45">
              We may earn a commission when you use a marked partner link. Verify price, availability and code at checkout.
            </p>
            <Link href="/deals" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-lime px-4 text-xs font-black text-ink hover:bg-white">
              View offer details
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-3">
          {columns.map((column) => (
            <nav key={column.heading} className="flex flex-col gap-3 text-xs">
              <span className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/30">{column.heading}</span>
              {column.links.map(([label, href]) => (
                <Link key={href} href={href} className="w-fit text-white/60 transition-colors hover:text-lime">{label}</Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-[9px] uppercase tracking-[0.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Research and educational use only.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            {showAnalyticsChoices ? <AnalyticsChoicesButton /> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
