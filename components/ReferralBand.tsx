import Link from "next/link";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import {
  ascensionCouponCode,
  getAscensionShopUrl,
} from "@/data/ascensionLinks";
import { externalLinkRel } from "@/lib/externalLinks";

const partnerUrl = getAscensionShopUrl("homepage_research_partner");

export function ReferralBand() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-ink text-white">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                Vetted research partner · sponsored
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">
                Read the quality audit before visiting the shop.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                Our Ascension Peptides review covers its public COA library,
                testing documentation, fulfillment policies and the limitations
                you should understand before ordering.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/peptides/ascension-peptides-review"
                  className="group inline-flex h-11 items-center gap-2 rounded-lg bg-lime px-5 text-sm font-bold text-ink transition-colors hover:bg-white"
                >
                  Read the independent review
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={partnerUrl}
                  target="_blank"
                  rel={externalLinkRel(partnerUrl, { sponsored: true })}
                  data-affiliate-placement="homepage-partner-band"
                  data-affiliate-product="catalog"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:border-white"
                >
                  Visit partner shop
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                Partner code
              </p>
              <strong className="mt-2 block font-mono text-4xl tracking-[-0.05em] text-lime sm:text-5xl">
                {ascensionCouponCode}
              </strong>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Apply at checkout and verify the current saving before ordering.
                Offers can change.
              </p>
              <p className="mt-8 border-t border-white/10 pt-5 text-[10px] leading-5 text-white/40">
                Research-use products are not medicines and are not approved for
                human use. We may earn a commission from partner links.
              </p>
              <Link
                href="/peptides/where-to-get-glp-1-online"
                className="group mt-5 flex items-center justify-between gap-4 text-xs font-bold text-white transition-colors hover:text-lime"
              >
                Looking for licensed GLP-1 care?
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
