import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClinicalTrialCollectionDetail } from "@/components/ClinicalTrialCollectionDetail";
import {
  conditionLabelForSlug,
  getTrialsForCondition,
} from "@/lib/clinicalTrials";
import { CLINICAL_TRIAL_CONDITIONS } from "@/lib/clinicalTrialsTypes";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLINICAL_TRIAL_CONDITIONS.map(({ value }) => ({ condition: value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ condition: string }>;
}): Promise<Metadata> {
  const { condition } = await params;
  const label = conditionLabelForSlug(condition);
  if (!label) return { title: "Clinical-trial condition not found" };
  const count = getTrialsForCondition(condition).length;
  return buildMetadata({
    title: `${label} Peptide Clinical Trials`,
    description: `Search ${count.toLocaleString("en")} indexed peptide clinical trials related to ${label.toLowerCase()} by compound, phase, status, sponsor, country, results and publications.`,
    path: `/clinical-trials/condition/${condition}`,
  });
}

export default async function ClinicalTrialConditionPage({
  params,
}: {
  params: Promise<{ condition: string }>;
}) {
  const { condition } = await params;
  const label = conditionLabelForSlug(condition);
  if (!label) notFound();
  const trials = getTrialsForCondition(condition);

  return (
    <ClinicalTrialCollectionDetail
      label={label}
      eyebrow="Therapeutic-area index"
      description={`Explore peptide clinical trials tagged to the ${label.toLowerCase()} condition group in the current local registry snapshot. Condition groups are PeptideStat search classifications layered over source-reported indications.`}
      path={`/clinical-trials/condition/${condition}`}
      trials={trials}
      baseFilters={{ condition }}
      hiddenFilters={["condition"]}
    />
  );
}
