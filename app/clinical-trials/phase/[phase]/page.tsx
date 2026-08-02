import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClinicalTrialCollectionDetail } from "@/components/ClinicalTrialCollectionDetail";
import {
  getTrialsForPhase,
  phaseLabelForSlug,
} from "@/lib/clinicalTrials";
import {
  CLINICAL_TRIAL_PHASES,
  type ClinicalTrialPhaseSlug,
} from "@/lib/clinicalTrialsTypes";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLINICAL_TRIAL_PHASES.map(({ value }) => ({ phase: value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase } = await params;
  const label = phaseLabelForSlug(phase as ClinicalTrialPhaseSlug);
  if (!label) return { title: "Clinical-trial phase not found" };
  const count = getTrialsForPhase(phase as ClinicalTrialPhaseSlug).length;
  return buildMetadata({
    title: `${label} Peptide Clinical Trials`,
    description: `Search ${count.toLocaleString("en")} indexed ${label} peptide clinical trials by compound, sponsor, status, indication, country, results and publications.`,
    path: `/clinical-trials/phase/${phase}`,
  });
}

export default async function ClinicalTrialPhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase } = await params;
  const typedPhase = phase as ClinicalTrialPhaseSlug;
  const label = phaseLabelForSlug(typedPhase);
  if (!label) notFound();
  const trials = getTrialsForPhase(typedPhase);

  return (
    <ClinicalTrialCollectionDetail
      label={label}
      eyebrow="Development-stage index"
      description={`Explore every ${label} peptide study in the local registry snapshot. Compare recruitment, sponsors, therapeutic areas, enrollment, results, publications and study geography.`}
      path={`/clinical-trials/phase/${phase}`}
      trials={trials}
      baseFilters={{ phase: typedPhase }}
      hiddenFilters={["phase"]}
    />
  );
}
