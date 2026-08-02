export type ClinicalTrialStatusGroup =
  | "recruiting"
  | "active"
  | "completed"
  | "terminated"
  | "withdrawn"
  | "suspended"
  | "unknown";

export type ClinicalTrialPhaseSlug =
  | "early-phase-1"
  | "phase-1"
  | "phase-2"
  | "phase-3"
  | "phase-4"
  | "not-applicable";

export interface ClinicalTrialOrganization {
  name: string;
  slug: string;
  class: string;
}

export interface ClinicalTrialConditionGroup {
  slug: string;
  label: string;
}

export interface ClinicalTrialLocation {
  facility: string | null;
  status: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface ClinicalTrialOutcome {
  measure: string;
  description: string | null;
  timeFrame: string | null;
}

export interface ClinicalTrialIntervention {
  type: string;
  name: string;
  description: string | null;
}

export interface ClinicalTrialPublication {
  pmid: string;
  citation: string | null;
}

export interface ClinicalTrial {
  nctId: string;
  title: string;
  officialTitle: string | null;
  summary: string | null;
  detailedDescription: string | null;
  peptideSlugs: string[];
  peptideNames: string[];
  conditions: string[];
  keywords: string[];
  conditionGroups: ClinicalTrialConditionGroup[];
  sponsor: ClinicalTrialOrganization;
  collaborators: ClinicalTrialOrganization[];
  status: {
    raw: string;
    group: ClinicalTrialStatusGroup;
    label: string;
  };
  phases: {
    raw: string[];
    slugs: ClinicalTrialPhaseSlug[];
    labels: string[];
    label: string;
    highest: number;
  };
  studyType: string;
  enrollment: number | null;
  dates: {
    start: string | null;
    primaryCompletion: string | null;
    completion: string | null;
    firstPosted: string | null;
    resultsPosted: string | null;
    lastUpdated: string | null;
  };
  hasResults: boolean;
  locationCount: number;
  countries: string[];
  locations: ClinicalTrialLocation[];
  eligibility: {
    criteria: string | null;
    minimumAge: string | null;
    maximumAge: string | null;
    sex: string;
    healthyVolunteers: boolean | null;
  };
  interventions: ClinicalTrialIntervention[];
  primaryOutcomes: ClinicalTrialOutcome[];
  secondaryOutcomes: ClinicalTrialOutcome[];
  publications: ClinicalTrialPublication[];
  sourceRegistry: string;
  sourceUrl: string;
}

export interface ClinicalTrialQuery {
  slug: string;
  name: string;
  query: string;
  aliases: string[];
  developer: string;
  databaseSlug: string | null;
}

export interface ClinicalTrialSnapshot {
  schemaVersion: number;
  generatedAt: string;
  source: {
    registry: string;
    apiVersion: string;
    dataTimestamp: string;
    endpoint: string;
    perQueryLimit: number;
    queryCount: number;
    coverageNote: string;
  };
  stats: {
    trials: number;
    recruiting: number;
    active: number;
    completed: number;
    phase1: number;
    phase2: number;
    phase3: number;
    phase4: number;
    companies: number;
    countries: number;
    averageEnrollment: number;
    newestTrial: string | null;
    latestResult: string | null;
  };
  queryCoverage: Array<{
    peptideSlug: string;
    peptideName: string;
    indexedFromQuery: number;
    registryMatches: number;
  }>;
  trials: ClinicalTrial[];
  contentHash: string;
}

export interface ClinicalTrialSearchRecord {
  nctId: string;
  title: string;
  peptideSlugs: string[];
  peptideNames: string[];
  sponsor: ClinicalTrialOrganization;
  conditions: string[];
  conditionGroups: ClinicalTrialConditionGroup[];
  status: ClinicalTrial["status"];
  phases: Pick<ClinicalTrial["phases"], "slugs" | "label" | "highest">;
  enrollment: number | null;
  dates: ClinicalTrial["dates"];
  locationCount: number;
  countries: string[];
  hasResults: boolean;
  hasPublications: boolean;
}

export interface ClinicalTrialSearchFilters {
  q?: string;
  peptide?: string;
  status?: ClinicalTrialStatusGroup | "";
  phase?: ClinicalTrialPhaseSlug | "";
  condition?: string;
  company?: string;
  country?: string;
  recruiting?: boolean;
  results?: boolean;
  publications?: boolean;
}

export interface ClinicalTrialFacetOption {
  value: string;
  label: string;
  count: number;
}

export interface ClinicalTrialFacets {
  statuses: ClinicalTrialFacetOption[];
  phases: ClinicalTrialFacetOption[];
  conditions: ClinicalTrialFacetOption[];
  companies: ClinicalTrialFacetOption[];
  countries: ClinicalTrialFacetOption[];
}

export interface ClinicalTrialSearchResponse {
  records: ClinicalTrialSearchRecord[];
  total: number;
  offset: number;
  limit: number;
  generatedAt: string;
}

export interface ClinicalTrialSeriesPoint {
  label: string;
  value: number;
}

export const CLINICAL_TRIAL_STATUSES: ReadonlyArray<{
  value: ClinicalTrialStatusGroup;
  label: string;
}> = [
  { value: "recruiting", label: "Recruiting" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "terminated", label: "Terminated" },
  { value: "withdrawn", label: "Withdrawn" },
  { value: "suspended", label: "Suspended" },
  { value: "unknown", label: "Unknown" },
];

export const CLINICAL_TRIAL_PHASES: ReadonlyArray<{
  value: ClinicalTrialPhaseSlug;
  label: string;
}> = [
  { value: "early-phase-1", label: "Early Phase 1" },
  { value: "phase-1", label: "Phase 1" },
  { value: "phase-2", label: "Phase 2" },
  { value: "phase-3", label: "Phase 3" },
  { value: "phase-4", label: "Phase 4" },
  { value: "not-applicable", label: "Not applicable" },
];

export const CLINICAL_TRIAL_CONDITIONS = [
  { value: "weight-loss", label: "Weight loss" },
  { value: "type-2-diabetes", label: "Type 2 diabetes" },
  { value: "hair-loss", label: "Hair loss" },
  { value: "inflammation", label: "Inflammation" },
  { value: "crohns", label: "Crohn's" },
  { value: "muscle-growth", label: "Muscle growth" },
  { value: "longevity", label: "Longevity" },
  { value: "pain", label: "Pain" },
  { value: "brain-health", label: "Brain health" },
  { value: "other", label: "Other" },
] as const;
