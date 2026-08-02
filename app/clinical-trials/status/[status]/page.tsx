import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClinicalTrialCollectionDetail } from "@/components/ClinicalTrialCollectionDetail";
import {
  getTrialsForStatus,
  statusLabelForSlug,
} from "@/lib/clinicalTrials";
import {
  CLINICAL_TRIAL_STATUSES,
  type ClinicalTrialStatusGroup,
} from "@/lib/clinicalTrialsTypes";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLINICAL_TRIAL_STATUSES.map(({ value }) => ({ status: value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ status: string }>;
}): Promise<Metadata> {
  const { status } = await params;
  const label = statusLabelForSlug(status as ClinicalTrialStatusGroup);
  if (!label) return { title: "Clinical-trial status not found" };
  const count = getTrialsForStatus(status as ClinicalTrialStatusGroup).length;
  return buildMetadata({
    title: `${label} Peptide Clinical Trials`,
    description: `Search ${count.toLocaleString("en")} indexed ${label.toLowerCase()} peptide clinical trials by compound, phase, sponsor, indication, country, results and publications.`,
    path: `/clinical-trials/status/${status}`,
  });
}

export default async function ClinicalTrialStatusPage({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;
  const typedStatus = status as ClinicalTrialStatusGroup;
  const label = statusLabelForSlug(typedStatus);
  if (!label) notFound();
  const trials = getTrialsForStatus(typedStatus);

  return (
    <ClinicalTrialCollectionDetail
      label={label}
      eyebrow="Recruitment-status index"
      description={`Explore every peptide study grouped under ${label.toLowerCase()} in the local registry snapshot. Check the source record before relying on recruitment status, because registry entries can change.`}
      path={`/clinical-trials/status/${status}`}
      trials={trials}
      baseFilters={{ status: typedStatus }}
      hiddenFilters={["status"]}
    />
  );
}
