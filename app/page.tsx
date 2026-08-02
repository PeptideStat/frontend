import { JsonLd } from "@/components/JsonLd";
import { MarketHome } from "@/components/MarketHome";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <MarketHome />
    </>
  );
}
