import Link from "next/link";
import { peptides, STATUS_LABELS } from "@/data/peptides";
import {
  ascensionAvailabilityCheckedAt,
  ascensionCouponCode,
  getAscensionAvailability,
  getAscensionBuyUrl,
  getAscensionProduct,
  getAscensionShopUrl,
} from "@/data/ascensionLinks";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { externalLinkRel } from "@/lib/externalLinks";

interface ArticlePartnerCardProps {
  cluster?: string;
  slug: string;
  tags?: string[];
  title: string;
}

export function ArticlePartnerCard({
  cluster,
  slug,
  tags,
  title,
}: ArticlePartnerCardProps) {
  const matchingPeptide = peptides.find(
    (peptide) => peptide.articleSlug === slug || peptide.slug === slug,
  );
  const matchingProduct =
    getAscensionProduct(slug) ??
    (matchingPeptide ? getAscensionProduct(matchingPeptide.slug) : undefined);
  const productAvailability = matchingProduct
    ? getAscensionAvailability(matchingProduct.id)
    : "unknown";
  const topicText = `${cluster ?? ""} ${tags?.join(" ") ?? ""} ${title}`.toLowerCase();
  const isClinicalGlp1 = /glp-?1|semaglutide|tirzepatide|ozempic|wegovy|zepbound|mounjaro/.test(
    topicText,
  );

  if (!matchingProduct && isClinicalGlp1) {
    return (
      <aside className="rounded-xl border border-line bg-paper p-5 shadow-[0_18px_40px_-34px_rgba(17,23,19,.5)]">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cobalt">
          Prescription pathway
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink">
          Compare licensed GLP-1 care
        </h2>
        <p className="mt-3 text-xs leading-5 text-muted">
          Review provider models, current entry prices, insurance support and
          medication types before starting an intake.
        </p>
        <Link
          href="/peptides/where-to-get-glp-1-online"
          className="group mt-5 flex min-h-11 items-center justify-between gap-3 rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent"
        >
          Compare providers
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-4 text-[9px] leading-4 text-muted-soft">
          Prescription medications require evaluation by a licensed clinician.
          Availability and eligibility vary.
        </p>
      </aside>
    );
  }

  const partnerUrl = matchingProduct
    ? getAscensionBuyUrl(matchingProduct.id, `article_${slug}`)
    : getAscensionShopUrl(`article_${slug}`);

  return (
    <aside
      className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_18px_40px_-34px_rgba(17,23,19,.5)]"
      data-affiliate-placement="article-sidebar"
    >
      <div className="bg-ink p-5 text-white">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-lime">
          Research partner · affiliate
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em]">
          {matchingProduct
            ? `${matchingProduct.name} research listing`
            : "Research marketplace"}
        </h2>
        {matchingPeptide && (
          <div className="mt-3 flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-[0.1em] text-white/65">
            <span className="rounded border border-white/20 px-2 py-1">
              {STATUS_LABELS[matchingPeptide.status]}
            </span>
            <span className="rounded border border-white/20 px-2 py-1">
              {matchingPeptide.routeOfAdministration}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs leading-5 text-muted">
          {productAvailability === "out-of-stock"
            ? `This listing was out of stock at our ${ascensionAvailabilityCheckedAt} catalog check. Open the direct page to recheck availability or compare the wider catalog.`
            : matchingProduct
            ? "Check the current lot COA and product documentation before purchasing from our reviewed partner."
            : "Browse the current catalog from our reviewed research-marketplace partner and verify the lot documentation before purchasing."}
        </p>

        <div className="mt-4 rounded-lg border border-line bg-surface px-3 py-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
            Partner code
          </span>
          <strong className="mt-1 block font-mono text-xl tracking-[-0.04em] text-ink">
            {ascensionCouponCode}
          </strong>
        </div>

        <a
          href={partnerUrl}
          target="_blank"
          rel={externalLinkRel(partnerUrl, { sponsored: true })}
          data-affiliate-placement="article-sidebar"
          data-affiliate-product={matchingProduct?.id ?? "catalog"}
          className="group mt-4 flex min-h-11 items-center justify-between gap-3 rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent"
        >
          {matchingProduct
            ? productAvailability === "out-of-stock"
              ? `Recheck ${matchingProduct.name}`
              : `View ${matchingProduct.name}`
            : "Browse partner shop"}
          <ExternalLinkIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <Link
          href="/peptides/ascension-peptides-review"
          className="mt-3 flex items-center justify-between gap-3 border-b border-line py-2 text-[10px] font-bold text-ink hover:border-cobalt hover:text-cobalt"
        >
          Why this partner?
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>

        <p className="mt-4 text-[9px] leading-4 text-muted-soft">
          Research use only. Not approved for human use. We may earn a commission
          from this link at no extra cost to you. Verify any saving at checkout.
        </p>
      </div>
    </aside>
  );
}
