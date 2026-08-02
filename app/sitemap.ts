import type { MetadataRoute } from "next";
import { peptides } from "@/data/peptides";
import { peptideCategoryHubs } from "@/data/peptideCategoryHubs";
import {
  compoundProfiles,
  marketListings,
  vendors,
} from "@/data/marketplace";
import { partnerPrograms } from "@/data/partnerPrograms";
import { getAllArticles } from "@/lib/content";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import {
  clinicalTrialQueries,
  clinicalTrialSnapshot,
  clinicalTrials,
  getTrialsForCompany,
  industryCompanySlugs,
} from "@/lib/clinicalTrials";
import {
  CLINICAL_TRIAL_CONDITIONS,
  CLINICAL_TRIAL_PHASES,
  CLINICAL_TRIAL_STATUSES,
} from "@/lib/clinicalTrialsTypes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const siteUpdatedAt = new Date(marketplaceUpdatedAt);
  const dealsUpdatedAt = new Date(
    Object.values(partnerPrograms)
      .map((program) => program.verifiedAt)
      .filter((date): date is string => Boolean(date))
      .sort()
      .at(-1) ?? marketplaceUpdatedAt,
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/bryan-johnson-discount-code"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/compare"),
      lastModified: siteUpdatedAt,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/vendors"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/vendors/usa"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/vendors/uae"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/reviews"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/deals"),
      lastModified: dealsUpdatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-tests"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/clinical-trials"),
      lastModified: new Date(clinicalTrialSnapshot.generatedAt),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/reports"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: absoluteUrl("/reports/peptide-vendor-transparency-2026"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/market-methodology"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: absoluteUrl("/shop"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/calculators"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/accumulation"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/calculators/unit-converter"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/calculators/peptide-chemistry"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/database"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/peptides"),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: siteUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/editorial-policy"),
      lastModified: siteUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/authors/peptidestat-editorial-team"),
      lastModified: siteUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/disclaimer"),
      lastModified: siteUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: siteUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/peptides/${article.slug}`),
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: "monthly",
    priority: article.pillar ? 0.9 : 0.7,
  }));

  const databaseRoutes: MetadataRoute.Sitemap = peptides.map((peptide) => ({
    url: absoluteUrl(`/database/${peptide.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const databaseCategoryRoutes: MetadataRoute.Sitemap = peptideCategoryHubs.map(
    (hub) => ({
      url: absoluteUrl(`/database/${hub.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }),
  );

  const comparisonRoutes: MetadataRoute.Sitemap = compoundProfiles.map(
    (compound) => {
      const lastModified =
        marketListings
          .filter((listing) => listing.compoundSlug === compound.slug)
          .map((listing) => listing.checkedAt)
          .sort()
          .at(-1) ?? marketplaceUpdatedAt;

      return {
        url: absoluteUrl(`/compare/${compound.slug}`),
        lastModified: new Date(lastModified),
        changeFrequency: "daily" as const,
        priority: 0.9,
      };
    },
  );

  const vendorRoutes: MetadataRoute.Sitemap = vendors.map((vendor) => ({
    url: absoluteUrl(`/vendors/${vendor.id}`),
    lastModified: new Date(vendor.lastReviewedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const clinicalTrialRoutes: MetadataRoute.Sitemap = clinicalTrials.map(
    (trial) => ({
      url: absoluteUrl(`/clinical-trials/${trial.nctId}`),
      lastModified: new Date(
        trial.dates.lastUpdated ?? clinicalTrialSnapshot.generatedAt,
      ),
      changeFrequency:
        trial.status.group === "recruiting" || trial.status.group === "active"
          ? ("weekly" as const)
          : ("monthly" as const),
      priority: 0.6,
    }),
  );

  const clinicalPeptideRoutes: MetadataRoute.Sitemap = clinicalTrialQueries.map(
    (query) => ({
      url: absoluteUrl(`/clinical-trials/${query.slug}`),
      lastModified: new Date(clinicalTrialSnapshot.generatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.78,
    }),
  );

  const clinicalCompanyRoutes: MetadataRoute.Sitemap = industryCompanySlugs.map(
    (company) => {
      const latest = getTrialsForCompany(company)
        .map((trial) => trial.dates.lastUpdated)
        .filter((date): date is string => Boolean(date))
        .sort()
        .at(-1);
      return {
        url: absoluteUrl(`/clinical-trials/company/${company}`),
        lastModified: new Date(latest ?? clinicalTrialSnapshot.generatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.68,
      };
    },
  );

  const clinicalPhaseRoutes: MetadataRoute.Sitemap = CLINICAL_TRIAL_PHASES.map(
    (phase) => ({
      url: absoluteUrl(`/clinical-trials/phase/${phase.value}`),
      lastModified: new Date(clinicalTrialSnapshot.generatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const clinicalStatusRoutes: MetadataRoute.Sitemap =
    CLINICAL_TRIAL_STATUSES.map((status) => ({
      url: absoluteUrl(`/clinical-trials/status/${status.value}`),
      lastModified: new Date(clinicalTrialSnapshot.generatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const clinicalConditionRoutes: MetadataRoute.Sitemap =
    CLINICAL_TRIAL_CONDITIONS.map((condition) => ({
      url: absoluteUrl(`/clinical-trials/condition/${condition.value}`),
      lastModified: new Date(clinicalTrialSnapshot.generatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.68,
    }));

  return [
    ...staticRoutes,
    ...clinicalTrialRoutes,
    ...clinicalPeptideRoutes,
    ...clinicalCompanyRoutes,
    ...clinicalPhaseRoutes,
    ...clinicalStatusRoutes,
    ...clinicalConditionRoutes,
    ...comparisonRoutes,
    ...vendorRoutes,
    ...articleRoutes,
    ...databaseCategoryRoutes,
    ...databaseRoutes,
  ];
}
