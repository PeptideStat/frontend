const MAX_ANALYTICS_VALUE_LENGTH = 255;

const PARTNER_NAMES: Record<string, string> = {
  "ascensionpeptides.com": "ascension-peptides",
  "www.ascensionpeptides.com": "ascension-peptides",
  "blueprint.bryanjohnson.com": "blueprint",
};

export interface AffiliateClickInput {
  campaign?: string | null;
  href: string;
  placement?: string | null;
  product?: string | null;
  sourcePath: string;
}

export type AffiliateClickProperties = {
  campaign: string;
  partner: string;
  placement: string;
  product: string;
  source_path: string;
};

function analyticsValue(value: string | null | undefined, fallback: string) {
  const normalized = value?.trim().replace(/\s+/g, " ") || fallback;
  return normalized.slice(0, MAX_ANALYTICS_VALUE_LENGTH);
}

function productFromUrl(url: URL) {
  const segments = url.pathname.split("/").filter(Boolean);
  const productIndex = segments.indexOf("product");

  if (productIndex >= 0 && segments[productIndex + 1]) {
    return segments[productIndex + 1];
  }

  return url.searchParams.get("q") || "catalog";
}

export function buildAffiliateClickProperties({
  campaign,
  href,
  placement,
  product,
  sourcePath,
}: AffiliateClickInput): AffiliateClickProperties {
  const url = new URL(href, "https://www.peptidestat.com");

  return {
    partner: analyticsValue(
      PARTNER_NAMES[url.hostname.toLowerCase()] ?? url.hostname.toLowerCase(),
      "unknown",
    ),
    placement: analyticsValue(placement, "unlabeled-sponsored-link"),
    product: analyticsValue(product ?? productFromUrl(url), "catalog"),
    campaign: analyticsValue(
      campaign ?? url.searchParams.get("campaign"),
      "unassigned",
    ),
    source_path: analyticsValue(sourcePath, "/"),
  };
}
