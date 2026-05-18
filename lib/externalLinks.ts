const SPONSORED_HOSTS = new Set([
  "ascensionpeptides.com",
  "www.ascensionpeptides.com",
]);

const SPONSORED_PATH_MARKERS = ["/ref/", "/steveslayo"];

export function isSponsoredHref(href?: string): boolean {
  if (!href) return false;

  try {
    const url = new URL(href, "https://www.peptidestat.com");

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    if (SPONSORED_HOSTS.has(url.hostname.toLowerCase())) {
      return true;
    }

    const pathname = url.pathname.toLowerCase();

    if (
      url.searchParams.has("ref") ||
      SPONSORED_PATH_MARKERS.some((marker) => pathname.includes(marker))
    ) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export function externalLinkRel(
  href?: string,
  options: { sponsored?: boolean } = {},
): string {
  const sponsored = options.sponsored ?? isSponsoredHref(href);

  return sponsored
    ? "nofollow sponsored noopener noreferrer"
    : "noopener noreferrer";
}
