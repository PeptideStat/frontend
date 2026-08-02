import "server-only";

import { readFileSync } from "node:fs";
import {
  CLINICAL_TRIAL_CONDITIONS,
  CLINICAL_TRIAL_PHASES,
  CLINICAL_TRIAL_STATUSES,
  type ClinicalTrial,
  type ClinicalTrialFacetOption,
  type ClinicalTrialFacets,
  type ClinicalTrialPhaseSlug,
  type ClinicalTrialQuery,
  type ClinicalTrialSearchFilters,
  type ClinicalTrialSearchRecord,
  type ClinicalTrialSeriesPoint,
  type ClinicalTrialSnapshot,
  type ClinicalTrialStatusGroup,
} from "@/lib/clinicalTrialsTypes";

function loadJson<T>(relativePath: string): T {
  return JSON.parse(
    readFileSync(new URL(relativePath, import.meta.url), "utf8"),
  ) as T;
}

export const clinicalTrialSnapshot = loadJson<ClinicalTrialSnapshot>(
  "../data/clinicalTrials.snapshot.json",
);

export const clinicalTrialQueries = loadJson<ClinicalTrialQuery[]>(
  "../data/clinicalTrialQueries.json",
);

export const clinicalTrials = clinicalTrialSnapshot.trials;

export const clinicalTrialById = new Map(
  clinicalTrials.map((trial) => [trial.nctId.toUpperCase(), trial]),
);

export const clinicalTrialQueryBySlug = new Map(
  clinicalTrialQueries.map((query) => [query.slug, query]),
);

export const clinicalTrialCoverageBySlug = new Map(
  clinicalTrialSnapshot.queryCoverage.map((coverage) => [
    coverage.peptideSlug,
    coverage,
  ]),
);

export function toClinicalTrialSearchRecord(
  trial: ClinicalTrial,
): ClinicalTrialSearchRecord {
  return {
    nctId: trial.nctId,
    title: trial.title,
    peptideSlugs: trial.peptideSlugs,
    peptideNames: trial.peptideNames,
    sponsor: trial.sponsor,
    conditions: trial.conditions.slice(0, 4),
    conditionGroups: trial.conditionGroups,
    status: trial.status,
    phases: {
      slugs: trial.phases.slugs,
      label: trial.phases.label,
      highest: trial.phases.highest,
    },
    enrollment: trial.enrollment,
    dates: trial.dates,
    locationCount: trial.locationCount,
    countries: trial.countries,
    hasResults: trial.hasResults,
    hasPublications: trial.publications.length > 0,
  };
}

const searchableByNctId = new Map(
  clinicalTrials.map((trial) => [
    trial.nctId,
    [
      trial.nctId,
      trial.title,
      trial.officialTitle,
      ...trial.peptideNames,
      ...trial.conditions,
      ...trial.keywords,
      trial.sponsor.name,
      ...trial.collaborators.map((collaborator) => collaborator.name),
      ...trial.interventions.map((intervention) => intervention.name),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase(),
  ]),
);

function countOptions(
  values: Iterable<{ value: string; label: string }>,
): ClinicalTrialFacetOption[] {
  const counts = new Map<string, { label: string; count: number }>();
  for (const { value, label } of values) {
    const current = counts.get(value);
    counts.set(value, { label, count: (current?.count ?? 0) + 1 });
  }
  return [...counts.entries()]
    .map(([value, { label, count }]) => ({ value, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

const statusCounts = new Map(
  countOptions(
    clinicalTrials.map((trial) => ({
      value: trial.status.group,
      label:
        CLINICAL_TRIAL_STATUSES.find(
          (status) => status.value === trial.status.group,
        )?.label ?? trial.status.label,
    })),
  ).map((option) => [option.value, option.count]),
);

const phaseCounts = new Map(
  countOptions(
    clinicalTrials.flatMap((trial) =>
      trial.phases.slugs.map((phase) => ({
        value: phase,
        label:
          CLINICAL_TRIAL_PHASES.find((item) => item.value === phase)?.label ??
          phase,
      })),
    ),
  ).map((option) => [option.value, option.count]),
);

const conditionCounts = new Map(
  countOptions(
    clinicalTrials.flatMap((trial) =>
      trial.conditionGroups.map((condition) => ({
        value: condition.slug,
        label: condition.label,
      })),
    ),
  ).map((option) => [option.value, option.count]),
);

export const clinicalTrialFacets: ClinicalTrialFacets = {
  statuses: CLINICAL_TRIAL_STATUSES.map(({ value, label }) => ({
    value,
    label,
    count: statusCounts.get(value) ?? 0,
  })),
  phases: CLINICAL_TRIAL_PHASES.map(({ value, label }) => ({
    value,
    label,
    count: phaseCounts.get(value) ?? 0,
  })),
  conditions: CLINICAL_TRIAL_CONDITIONS.map(({ value, label }) => ({
    value,
    label,
    count: conditionCounts.get(value) ?? 0,
  })),
  companies: countOptions(
    clinicalTrials
      .filter((trial) => trial.sponsor.class === "INDUSTRY")
      .map((trial) => ({
        value: trial.sponsor.slug,
        label: trial.sponsor.name,
      })),
  ),
  countries: countOptions(
    clinicalTrials.flatMap((trial) =>
      trial.countries.map((country) => ({ value: country, label: country })),
    ),
  ),
};

export function filterClinicalTrials(
  filters: ClinicalTrialSearchFilters = {},
): ClinicalTrial[] {
  const query = filters.q?.trim().toLocaleLowerCase() ?? "";
  const queryParts = query.split(/\s+/).filter(Boolean);

  const filtered = clinicalTrials.filter((trial) => {
    if (queryParts.length) {
      const searchable = searchableByNctId.get(trial.nctId) ?? "";
      if (!queryParts.every((part) => searchable.includes(part))) return false;
    }
    if (filters.peptide && !trial.peptideSlugs.includes(filters.peptide)) {
      return false;
    }
    if (filters.status && trial.status.group !== filters.status) return false;
    if (filters.phase && !trial.phases.slugs.includes(filters.phase)) return false;
    if (
      filters.condition &&
      !trial.conditionGroups.some(
        (condition) => condition.slug === filters.condition,
      )
    ) {
      return false;
    }
    if (filters.company && trial.sponsor.slug !== filters.company) return false;
    if (filters.country && !trial.countries.includes(filters.country)) return false;
    if (filters.recruiting && trial.status.group !== "recruiting") return false;
    if (filters.results && !trial.hasResults) return false;
    if (filters.publications && trial.publications.length === 0) return false;
    return true;
  });

  if (!query) return filtered;

  return [...filtered].sort((a, b) => {
    const score = (trial: ClinicalTrial) => {
      const normalizedId = trial.nctId.toLocaleLowerCase();
      if (normalizedId === query) return 100;
      if (trial.peptideNames.some((name) => name.toLocaleLowerCase() === query)) {
        return 80;
      }
      if (trial.title.toLocaleLowerCase().startsWith(query)) return 60;
      if (normalizedId.startsWith(query)) return 50;
      return 0;
    };
    return score(b) - score(a);
  });
}

export function searchClinicalTrials(
  filters: ClinicalTrialSearchFilters = {},
  offset = 0,
  limit = 24,
) {
  const matches = filterClinicalTrials(filters);
  const safeOffset = Math.max(0, offset);
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  return {
    records: matches
      .slice(safeOffset, safeOffset + safeLimit)
      .map(toClinicalTrialSearchRecord),
    total: matches.length,
    offset: safeOffset,
    limit: safeLimit,
    generatedAt: clinicalTrialSnapshot.generatedAt,
  };
}

export function getTrialsForPeptide(slug: string) {
  return clinicalTrials.filter((trial) => trial.peptideSlugs.includes(slug));
}

export function getTrialsForCompany(slug: string) {
  return clinicalTrials.filter(
    (trial) => trial.sponsor.class === "INDUSTRY" && trial.sponsor.slug === slug,
  );
}

export function getTrialsForPhase(phase: ClinicalTrialPhaseSlug) {
  return clinicalTrials.filter((trial) => trial.phases.slugs.includes(phase));
}

export function getTrialsForStatus(status: ClinicalTrialStatusGroup) {
  return clinicalTrials.filter((trial) => trial.status.group === status);
}

export function getTrialsForCondition(condition: string) {
  return clinicalTrials.filter((trial) =>
    trial.conditionGroups.some((group) => group.slug === condition),
  );
}

export function summarizeClinicalTrials(trials: ClinicalTrial[]) {
  const interventionalEnrollments = trials
    .filter((trial) => trial.studyType === "INTERVENTIONAL")
    .map((trial) => trial.enrollment)
    .filter((enrollment): enrollment is number => enrollment !== null);
  const countries = new Set(trials.flatMap((trial) => trial.countries));
  const largest = [...trials]
    .filter((trial) => trial.enrollment !== null)
    .sort((a, b) => (b.enrollment ?? 0) - (a.enrollment ?? 0))[0];
  const highestPhase = Math.max(0, ...trials.map((trial) => trial.phases.highest));

  return {
    total: trials.length,
    recruiting: trials.filter((trial) => trial.status.group === "recruiting")
      .length,
    active: trials.filter((trial) => trial.status.group === "active").length,
    completed: trials.filter((trial) => trial.status.group === "completed")
      .length,
    terminated: trials.filter((trial) => trial.status.group === "terminated")
      .length,
    withdrawn: trials.filter((trial) => trial.status.group === "withdrawn")
      .length,
    resultsPublished: trials.filter((trial) => trial.hasResults).length,
    publications: trials.reduce(
      (total, trial) => total + trial.publications.length,
      0,
    ),
    averageEnrollment: interventionalEnrollments.length
      ? Math.round(
          interventionalEnrollments.reduce((total, value) => total + value, 0) /
            interventionalEnrollments.length,
        )
      : 0,
    countries: countries.size,
    largest,
    highestPhase,
    highestPhaseLabel:
      CLINICAL_TRIAL_PHASES.find((phase) => {
        if (highestPhase === 0.5) return phase.value === "early-phase-1";
        return phase.value === `phase-${highestPhase}`;
      })?.label ?? "Not applicable",
  };
}

export function trialsOverTime(
  trials: ClinicalTrial[],
  minimumYear?: number,
): ClinicalTrialSeriesPoint[] {
  const counts = new Map<number, number>();
  for (const trial of trials) {
    const date = trial.dates.start ?? trial.dates.firstPosted;
    const year = date ? Number(date.slice(0, 4)) : Number.NaN;
    if (!Number.isFinite(year) || (minimumYear && year < minimumYear)) continue;
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  const years = [...counts.keys()].sort((a, b) => a - b);
  if (!years.length) return [];
  const firstYear = minimumYear ?? years[0];
  const lastYear = Math.max(...years);
  return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => {
    const year = firstYear + index;
    return { label: String(year), value: counts.get(year) ?? 0 };
  });
}

export function phaseSeries(trials: ClinicalTrial[]): ClinicalTrialSeriesPoint[] {
  return CLINICAL_TRIAL_PHASES.slice(0, 5).map((phase) => ({
    label: phase.label,
    value: trials.filter((trial) => trial.phases.slugs.includes(phase.value))
      .length,
  }));
}

export function conditionSeries(
  trials: ClinicalTrial[],
  limit = 8,
): ClinicalTrialSeriesPoint[] {
  return countOptions(
    trials.flatMap((trial) =>
      trial.conditionGroups.map((group) => ({
        value: group.slug,
        label: group.label,
      })),
    ),
  )
    .filter((option) => option.value !== "other")
    .slice(0, limit)
    .map((option) => ({ label: option.label, value: option.count }));
}

export function companySeries(
  trials: ClinicalTrial[],
  limit = 8,
): ClinicalTrialSeriesPoint[] {
  return countOptions(
    trials
      .filter((trial) => trial.sponsor.class === "INDUSTRY")
      .map((trial) => ({
        value: trial.sponsor.slug,
        label: trial.sponsor.name,
      })),
  )
    .slice(0, limit)
    .map((option) => ({ label: option.label, value: option.count }));
}

export function countrySeries(
  trials: ClinicalTrial[],
  limit = 8,
): ClinicalTrialSeriesPoint[] {
  return countOptions(
    trials.flatMap((trial) =>
      trial.countries.map((country) => ({ value: country, label: country })),
    ),
  )
    .slice(0, limit)
    .map((option) => ({ label: option.label, value: option.count }));
}

export const industryCompanySlugs = clinicalTrialFacets.companies.map(
  (company) => company.value,
);

export function companyNameForSlug(slug: string) {
  return clinicalTrialFacets.companies.find((company) => company.value === slug)
    ?.label;
}

export function phaseLabelForSlug(slug: ClinicalTrialPhaseSlug) {
  return CLINICAL_TRIAL_PHASES.find((phase) => phase.value === slug)?.label;
}

export function statusLabelForSlug(slug: ClinicalTrialStatusGroup) {
  return CLINICAL_TRIAL_STATUSES.find((status) => status.value === slug)?.label;
}

export function conditionLabelForSlug(slug: string) {
  return CLINICAL_TRIAL_CONDITIONS.find(
    (condition) => condition.value === slug,
  )?.label;
}

export function formatClinicalDate(value: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!value) return "Not reported";
  const normalized = /^\d{4}$/.test(value)
    ? `${value}-01-01`
    : /^\d{4}-\d{2}$/.test(value)
      ? `${value}-01`
      : value;
  const parsed = new Date(`${normalized}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: value.length >= 10 ? "numeric" : undefined,
    ...options,
  }).format(parsed);
}

export function compactNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}
