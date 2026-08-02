import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClinicalPeptideTrialsDetail } from "@/components/ClinicalPeptideTrialsDetail";
import { ClinicalTrialDetail } from "@/components/ClinicalTrialDetail";
import {
  clinicalTrialById,
  clinicalTrialQueries,
  clinicalTrialQueryBySlug,
  clinicalTrials,
  getTrialsForPeptide,
} from "@/lib/clinicalTrials";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...clinicalTrials.map((trial) => ({ slug: trial.nctId })),
    ...clinicalTrialQueries.map((query) => ({ slug: query.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trial = clinicalTrialById.get(slug.toUpperCase());
  if (trial) {
    const peptide = trial.peptideNames.slice(0, 2).join(" + ") || "Peptide";
    const description = `${trial.nctId}: ${trial.title}. ${trial.status.label}; ${trial.phases.label}; sponsor ${trial.sponsor.name}; enrollment ${trial.enrollment?.toLocaleString("en") ?? "not reported"}.`;
    return buildMetadata({
      title: `${peptide} Clinical Trial ${trial.nctId}`,
      description: description.slice(0, 310),
      path: `/clinical-trials/${trial.nctId}`,
    });
  }

  const query = clinicalTrialQueryBySlug.get(slug);
  if (query) {
    const count = getTrialsForPeptide(query.slug).length;
    return buildMetadata({
      title: `${query.name} Clinical Trials: Phase, Status & Results`,
      description: `Search ${count.toLocaleString("en")} indexed ${query.name} clinical trials. Explore recruiting status, phases, sponsors, enrollment, locations, results, publications and study timelines.`,
      path: `/clinical-trials/${query.slug}`,
    });
  }

  return { title: "Clinical trial not found" };
}

export default async function ClinicalTrialOrPeptidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trial = clinicalTrialById.get(slug.toUpperCase());
  if (trial) return <ClinicalTrialDetail trial={trial} />;

  const query = clinicalTrialQueryBySlug.get(slug);
  if (!query) notFound();

  return (
    <ClinicalPeptideTrialsDetail
      query={query}
      trials={getTrialsForPeptide(query.slug)}
    />
  );
}
