import Image from "next/image";
import Link from "next/link";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { VendorLogo } from "@/components/VendorLogo";
import {
  ascensionAvailabilityCheckedAt,
  ascensionCouponCode,
  ascensionDiscountPercent,
  getAscensionAvailability,
  getAscensionBuyUrl,
  getAscensionProduct,
  getAscensionProductImage,
  getAscensionShopUrl,
  hasAscensionProduct,
} from "@/data/ascensionLinks";
import { vendorById } from "@/data/marketplace";
import { novaCouponCode, novaReferralUrl } from "@/data/novaLinks";
import { peptides, STATUS_LABELS, type Peptide } from "@/data/peptides";
import { externalLinkRel } from "@/lib/externalLinks";

interface ArticlePartnerCardProps {
  cluster?: string;
  description: string;
  slug: string;
  tags?: string[];
  title: string;
}

function normalizeTopic(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function includesPhrase(value: string, phrase: string) {
  return ` ${value} `.includes(` ${phrase} `);
}

function findMatchingPeptide({
  cluster,
  description,
  slug,
  tags,
  title,
}: ArticlePartnerCardProps): Peptide | undefined {
  const normalizedSlug = normalizeTopic(slug);
  const normalizedTitle = normalizeTopic(title);
  const normalizedDescription = normalizeTopic(description);
  const normalizedCluster = normalizeTopic(cluster ?? "");
  const normalizedTags = (tags ?? []).map(normalizeTopic);
  const topicSequence = normalizeTopic(
    [title, description, ...(tags ?? []), cluster, slug]
      .filter(Boolean)
      .join(" "),
  );

  return peptides
    .filter((peptide) => hasAscensionProduct(peptide.slug))
    .map((peptide) => {
      const phrases = [peptide.slug, peptide.name].map(normalizeTopic);
      let score = peptide.articleSlug === slug ? 500 : 0;
      let mentionIndex = Number.POSITIVE_INFINITY;

      for (const phrase of phrases) {
        const phraseIndex = topicSequence.indexOf(phrase);
        if (phraseIndex >= 0) mentionIndex = Math.min(mentionIndex, phraseIndex);
        if (includesPhrase(normalizedSlug, phrase)) score = Math.max(score, 400);
        if (includesPhrase(normalizedTitle, phrase)) score = Math.max(score, 350);
        if (normalizedTags.some((tag) => includesPhrase(tag, phrase))) {
          score = Math.max(score, 300);
        }
        if (includesPhrase(normalizedCluster, phrase)) {
          score = Math.max(score, 250);
        }
        if (includesPhrase(normalizedDescription, phrase)) {
          score = Math.max(score, 150);
        }
      }

      return { mentionIndex, peptide, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.mentionIndex - b.mentionIndex;
    })[0]?.peptide;
}

function AscensionCatalogCard({ slug }: { slug: string }) {
  const partnerUrl = getAscensionShopUrl(`article_${slug}`);

  return (
    <aside
      className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_18px_40px_-34px_rgba(17,23,19,.5)]"
      data-affiliate-placement="article-sidebar"
    >
      <div className="bg-ink p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-lime">
            Research partner · affiliate
          </p>
          <span className="shrink-0 rounded-full bg-lime px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-ink">
            {ascensionDiscountPercent}% off
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em]">
          Ascension Peptides catalog
        </h2>
      </div>

      <div className="p-5">
        <p className="text-xs leading-5 text-muted">
          Browse the current catalog from our reviewed research-marketplace
          partner and verify the lot documentation before purchasing.
        </p>

        <div className="mt-4 rounded-lg border border-line bg-surface px-3 py-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
            Save {ascensionDiscountPercent}% with partner code
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
          data-affiliate-product="catalog"
          className="group mt-4 flex min-h-11 items-center justify-between gap-3 rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent"
        >
          Browse partner shop
          <ExternalLinkIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>

        <p className="mt-4 text-[9px] leading-4 text-muted-soft">
          Research use only. Not approved for human use. We may earn a
          commission from this link at no extra cost to you. Verify the saving
          at checkout.
        </p>
      </div>
    </aside>
  );
}

function NovaArticlePartnerCard() {
  const novaVendor = vendorById.get("nova");
  if (!novaVendor) return null;

  return (
    <aside
      className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_18px_40px_-34px_rgba(17,23,19,.5)]"
      data-affiliate-placement="article-sidebar"
    >
      <div className="bg-ink p-5 text-white">
        <div className="flex items-center justify-between gap-4">
          <VendorLogo
            vendor={novaVendor}
            size="md"
            className="border-white/15"
          />
          <span className="rounded-full bg-lime px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-ink">
            UAE & GCC
          </span>
        </div>
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-lime">
          Research partner - affiliate
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em]">
          NOVA Labs research catalog
        </h2>
      </div>

      <div className="p-5">
        <p className="text-xs leading-5 text-muted">
          Dubai-based catalog with AED pricing, UAE delivery and tracked GCC
          shipping. Check the current batch report before ordering.
        </p>

        <div className="mt-4 rounded-lg border border-line bg-surface px-3 py-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
            PeptideStat coupon code
          </span>
          <div className="mt-2">
            <CopyCodeButton code={novaCouponCode} compact />
          </div>
          <span className="mt-2 block text-[9px] leading-4 text-muted-soft">
            Discount amount and exclusions were not specified. Verify at checkout.
          </span>
        </div>

        <a
          href={novaReferralUrl}
          target="_blank"
          rel={externalLinkRel(novaReferralUrl, { sponsored: true })}
          data-affiliate-placement="article-sidebar"
          data-affiliate-product="catalog"
          className="group mt-4 flex min-h-11 items-center justify-between gap-3 rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent"
        >
          Open NOVA Labs
          <ExternalLinkIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <Link
          href="/vendors/nova"
          className="mt-3 flex items-center justify-between gap-3 border-b border-line py-2 text-[10px] font-bold text-ink hover:border-cobalt hover:text-cobalt"
        >
          View prices and batch records
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>

        <p className="mt-4 text-[9px] leading-4 text-muted-soft">
          Research use only. We may earn a commission from this link. The
          vendor supplied the code; verify the saving and final cart total.
        </p>
      </div>
    </aside>
  );
}

export function ArticlePartnerCard(props: ArticlePartnerCardProps) {
  if (props.slug === "nova-labs-uae-review") {
    return <NovaArticlePartnerCard />;
  }

  const matchingPeptide = findMatchingPeptide(props);
  const matchingProduct =
    getAscensionProduct(props.slug) ??
    (matchingPeptide
      ? getAscensionProduct(matchingPeptide.slug)
      : undefined);

  // No generic marketplace or prescription fallback: commercial cards only
  // appear when this article maps to a peptide-specific referral destination.
  // The partner review itself is the one exception — readers arriving there
  // are evaluating the vendor, so it gets a catalog-level card instead.
  if (!matchingProduct) {
    if (props.slug !== "ascension-peptides-review") return null;
    return <AscensionCatalogCard slug={props.slug} />;
  }

  const productAvailability = getAscensionAvailability(matchingProduct.id);
  const partnerUrl = getAscensionBuyUrl(
    matchingProduct.id,
    `article_${props.slug}`,
  );
  const matchingPeptideProduct = matchingPeptide
    ? getAscensionProduct(matchingPeptide.slug)
    : undefined;
  const productImageUrl =
    getAscensionProductImage(matchingProduct.id) ??
    (matchingPeptideProduct?.id === matchingProduct.id
      ? matchingPeptide?.productImageUrl
      : undefined);

  return (
    <aside
      className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_18px_40px_-34px_rgba(17,23,19,.5)]"
      data-affiliate-placement="article-sidebar"
    >
      <div className="bg-ink p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-lime">
            Research partner · affiliate
          </p>
          <span className="shrink-0 rounded-full bg-lime px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-ink">
            {ascensionDiscountPercent}% off
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em]">
          {matchingProduct.name} research listing
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

      {productImageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-[#f3f4ef]">
          <Image
            src={productImageUrl}
            alt={`${matchingProduct.name} research vial from Ascension Peptides`}
            fill
            sizes="(max-width: 1024px) 100vw, 300px"
            className="object-contain p-4"
          />
        </div>
      )}

      <div className="p-5">
        <p className="text-xs leading-5 text-muted">
          {productAvailability === "out-of-stock"
            ? `This listing was out of stock at our ${ascensionAvailabilityCheckedAt} catalog check. Open the direct page to recheck availability.`
            : "Check the current lot COA and product documentation before purchasing from our reviewed partner."}
        </p>

        <div className="mt-4 rounded-lg border border-line bg-surface px-3 py-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-muted">
            Save {ascensionDiscountPercent}% with partner code
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
          data-affiliate-product={matchingProduct.id}
          className="group mt-4 flex min-h-11 items-center justify-between gap-3 rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent"
        >
          {productAvailability === "out-of-stock"
            ? `Recheck ${matchingProduct.name}`
            : `View ${matchingProduct.name}`}
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
          Research use only. Not approved for human use. We may earn a
          commission from this link at no extra cost to you. Verify the saving
          at checkout.
        </p>
      </div>
    </aside>
  );
}
