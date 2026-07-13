import { HeroSection } from "@/components/HeroSection";
import { StatsRow } from "@/components/StatsRow";
import { TrustedSources } from "@/components/TrustedSources";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedGuides } from "@/components/FeaturedGuides";
import { LatestResearch } from "@/components/LatestResearch";
import { ReferralBand } from "@/components/ReferralBand";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { PopularCompounds } from "@/components/PopularCompounds";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Homepage layout adapted from peptide-db.com:
 *
 *   Hero (search-shaped CTA + popular questions)
 *   Stats row
 *   Trusted sources
 *   Category grid
 *   Featured guides
 *   Disclaimer banner
 *
 * Each section is a focused component so it can be reordered, replaced or
 * reused on other pages without touching the others.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <HeroSection />
      <StatsRow />
      <TrustedSources />
      <PopularCompounds />
      <LatestResearch />
      <ReferralBand />
      <CategoryGrid />
      <FeaturedGuides />
      <DisclaimerBanner />
    </>
  );
}
