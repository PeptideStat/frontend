const novaOrigin = "https://www.nova-biolabs.com";

export const novaReferralId = "w3s3DEsAJC8gAU";
export const novaReferralUrl = `${novaOrigin}/?ref=${novaReferralId}`;

export function getNovaReferralUrl(path = "/") {
  const url = new URL(path, `${novaOrigin}/`);
  url.searchParams.set("ref", novaReferralId);
  return url.toString();
}
