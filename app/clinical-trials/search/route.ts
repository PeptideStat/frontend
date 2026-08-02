import {
  CLINICAL_TRIAL_PHASES,
  CLINICAL_TRIAL_STATUSES,
  type ClinicalTrialPhaseSlug,
  type ClinicalTrialSearchFilters,
  type ClinicalTrialStatusGroup,
} from "@/lib/clinicalTrialsTypes";
import { searchClinicalTrials } from "@/lib/clinicalTrials";

export const dynamic = "force-dynamic";

function flag(value: string | null) {
  return value === "true" || value === "1";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedStatus = searchParams.get("status") ?? "";
  const requestedPhase = searchParams.get("phase") ?? "";
  const status = CLINICAL_TRIAL_STATUSES.some(
    (option) => option.value === requestedStatus,
  )
    ? (requestedStatus as ClinicalTrialStatusGroup)
    : "";
  const phase = CLINICAL_TRIAL_PHASES.some(
    (option) => option.value === requestedPhase,
  )
    ? (requestedPhase as ClinicalTrialPhaseSlug)
    : "";
  const filters: ClinicalTrialSearchFilters = {
    q: searchParams.get("q")?.slice(0, 160) ?? "",
    peptide: searchParams.get("peptide")?.slice(0, 90) ?? "",
    status,
    phase,
    condition: searchParams.get("condition")?.slice(0, 80) ?? "",
    company: searchParams.get("company")?.slice(0, 100) ?? "",
    country: searchParams.get("country")?.slice(0, 100) ?? "",
    recruiting: flag(searchParams.get("recruiting")),
    results: flag(searchParams.get("results")),
    publications: flag(searchParams.get("publications")),
  };
  const offset = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = Number.parseInt(searchParams.get("limit") ?? "24", 10);
  const payload = searchClinicalTrials(
    filters,
    Number.isFinite(offset) ? offset : 0,
    Number.isFinite(limit) ? limit : 24,
  );

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
