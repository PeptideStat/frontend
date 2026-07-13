"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { buildAffiliateClickProperties } from "@/lib/affiliateTracking";
import { trackTraceDartEvent } from "@/lib/tracedart";

const AFFILIATE_LINK_SELECTOR =
  'a[rel~="sponsored"], a[data-affiliate-placement]';

/**
 * Captures sponsored outbound clicks without turning every CTA into a Client
 * Component. Event delegation also covers affiliate links rendered from MDX.
 */
export function AffiliateClickTracker() {
  useEffect(() => {
    function handleAffiliateClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>(
        AFFILIATE_LINK_SELECTOR,
      );

      if (!link?.href) return;

      const placementContainer = link.closest<HTMLElement>(
        "[data-affiliate-placement]",
      );
      const properties = buildAffiliateClickProperties({
        href: link.href,
        placement:
          link.dataset.affiliatePlacement ??
          placementContainer?.dataset.affiliatePlacement,
        product: link.dataset.affiliateProduct,
        campaign: link.dataset.affiliateCampaign,
        sourcePath: window.location.pathname,
      });

      try {
        track("affiliate_click", properties);
      } catch (error) {
        // Analytics must never delay or block the outbound journey.
        if (process.env.NODE_ENV === "development") {
          console.debug("[PeptideStat] Vercel event unavailable", error);
        }
      }

      try {
        trackTraceDartEvent("affiliate_click", properties);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.debug("[PeptideStat] TraceDart event unavailable", error);
        }
      }

      if (process.env.NODE_ENV === "development") {
        console.debug("[PeptideStat] affiliate_click", properties);
      }
    }

    document.addEventListener("click", handleAffiliateClick, true);
    return () => document.removeEventListener("click", handleAffiliateClick, true);
  }, []);

  return null;
}
