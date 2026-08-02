import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const rootUrl = new URL("../", import.meta.url);
const queryFileUrl = new URL("data/clinicalTrialQueries.json", rootUrl);
const snapshotFileUrl = new URL("data/clinicalTrials.snapshot.json", rootUrl);
const changesFileUrl = new URL("data/clinicalTrials.changes.json", rootUrl);
const apiBase = "https://clinicaltrials.gov/api/v2";

const requestedLimit = Number(
  process.argv.find((argument) => argument.startsWith("--limit="))?.split("=")[1] ??
    "75",
);
const perQueryLimit = Math.min(Math.max(requestedLimit, 1), 1000);
const dryRun = process.argv.includes("--dry-run");

const fields = [
  "NCTId",
  "BriefTitle",
  "OfficialTitle",
  "OverallStatus",
  "StartDate",
  "PrimaryCompletionDate",
  "CompletionDate",
  "StudyFirstPostDate",
  "ResultsFirstPostDate",
  "LastUpdatePostDate",
  "LeadSponsorName",
  "LeadSponsorClass",
  "CollaboratorName",
  "CollaboratorClass",
  "BriefSummary",
  "DetailedDescription",
  "Condition",
  "Keyword",
  "StudyType",
  "Phase",
  "EnrollmentCount",
  "InterventionType",
  "InterventionName",
  "InterventionDescription",
  "PrimaryOutcomeMeasure",
  "PrimaryOutcomeDescription",
  "PrimaryOutcomeTimeFrame",
  "SecondaryOutcomeMeasure",
  "SecondaryOutcomeDescription",
  "SecondaryOutcomeTimeFrame",
  "EligibilityCriteria",
  "HealthyVolunteers",
  "Sex",
  "MinimumAge",
  "MaximumAge",
  "LocationFacility",
  "LocationStatus",
  "LocationCity",
  "LocationState",
  "LocationCountry",
  "LocationGeoPoint",
  "ReferencePMID",
  "ReferenceCitation",
  "HasResults",
];

const statusDefinitions = {
  RECRUITING: ["recruiting", "Recruiting"],
  NOT_YET_RECRUITING: ["active", "Not yet recruiting"],
  ACTIVE_NOT_RECRUITING: ["active", "Active, not recruiting"],
  ENROLLING_BY_INVITATION: ["active", "Enrolling by invitation"],
  COMPLETED: ["completed", "Completed"],
  TERMINATED: ["terminated", "Terminated"],
  WITHDRAWN: ["withdrawn", "Withdrawn"],
  SUSPENDED: ["suspended", "Suspended"],
};

const phaseDefinitions = {
  EARLY_PHASE1: ["early-phase-1", "Early Phase 1", 0.5],
  PHASE1: ["phase-1", "Phase 1", 1],
  PHASE2: ["phase-2", "Phase 2", 2],
  PHASE3: ["phase-3", "Phase 3", 3],
  PHASE4: ["phase-4", "Phase 4", 4],
  NA: ["not-applicable", "Not applicable", 0],
};

const conditionDefinitions = [
  {
    slug: "weight-loss",
    label: "Weight loss",
    pattern: /obesity|overweight|weight loss|weight management|adiposity/i,
  },
  {
    slug: "type-2-diabetes",
    label: "Type 2 diabetes",
    pattern: /type 2 diabetes|type ii diabetes|t2d|t2dm/i,
  },
  {
    slug: "hair-loss",
    label: "Hair loss",
    pattern: /alopecia|hair loss|hair growth/i,
  },
  {
    slug: "inflammation",
    label: "Inflammation",
    pattern: /inflamm|arthritis|autoimmune|psoriasis|sepsis/i,
  },
  {
    slug: "crohns",
    label: "Crohn's",
    pattern: /crohn/i,
  },
  {
    slug: "muscle-growth",
    label: "Muscle growth",
    pattern: /sarcopenia|muscle wasting|muscular dystrophy|muscle growth|cachexia/i,
  },
  {
    slug: "longevity",
    label: "Longevity",
    pattern: /aging|ageing|longevity|frailty|senescence/i,
  },
  {
    slug: "pain",
    label: "Pain",
    pattern: /pain|analgesi|neuropath/i,
  },
  {
    slug: "brain-health",
    label: "Brain health",
    pattern:
      /alzheimer|parkinson|cognit|dementia|depression|anxiety|brain|neurolog|schizophrenia/i,
  },
];

const canonicalOrganizations = [
  [/^eli lilly( and company)?$/i, "Eli Lilly"],
  [/^novo nordisk/i, "Novo Nordisk"],
  [/^astrazeneca/i, "AstraZeneca"],
  [/^amgen/i, "Amgen"],
  [/^sanofi/i, "Sanofi"],
  [/^novartis/i, "Novartis"],
  [/^ferring/i, "Ferring Pharmaceuticals"],
  [/^ipsen/i, "Ipsen"],
  [/^takeda/i, "Takeda"],
  [/^boehringer ingelheim/i, "Boehringer Ingelheim"],
  [/^zealand pharma/i, "Zealand Pharma"],
  [/^biomarin/i, "BioMarin"],
  [/^johnson & johnson/i, "Johnson & Johnson"],
  [/^janssen/i, "Janssen"],
  [/^pfizer/i, "Pfizer"],
  [/^bayer/i, "Bayer"],
  [/^regeneron/i, "Regeneron"],
  [/^merck sharp/i, "Merck"],
  [/^merck kgaa/i, "Merck KGaA"],
];

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function canonicalizeOrganization(value = "Unknown sponsor") {
  const trimmed = value.trim() || "Unknown sponsor";
  return (
    canonicalOrganizations.find(([pattern]) => pattern.test(trimmed))?.[1] ??
    trimmed
  );
}

function cleanText(value, maximumLength = 14_000) {
  if (!value) return null;
  const text = String(value).replace(/\r\n/g, "\n").trim();
  if (text.length <= maximumLength) return text;
  return `${text.slice(0, maximumLength - 1).trimEnd()}…`;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeStatus(rawStatus = "UNKNOWN") {
  const [group, label] = statusDefinitions[rawStatus] ?? [
    "unknown",
    rawStatus
      .toLowerCase()
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
  ];
  return { raw: rawStatus, group, label };
}

function normalizePhases(rawPhases = []) {
  const entries = rawPhases.map(
    (phase) => phaseDefinitions[phase] ?? [slugify(phase), phase, 0],
  );
  return {
    raw: rawPhases,
    slugs: unique(entries.map(([slug]) => slug)),
    labels: unique(entries.map(([, label]) => label)),
    label: entries.length
      ? unique(entries.map(([, label]) => label)).join(" / ")
      : "Not applicable",
    highest: Math.max(0, ...entries.map(([, , rank]) => rank)),
  };
}

function normalizeConditionGroups(conditions, keywords) {
  const haystack = [...conditions, ...keywords].join(" | ");
  const matches = conditionDefinitions
    .filter((definition) => definition.pattern.test(haystack))
    .map(({ slug, label }) => ({ slug, label }));
  return matches.length ? matches : [{ slug: "other", label: "Other" }];
}

function normalizeOutcome(outcome) {
  return {
    measure: cleanText(outcome?.measure, 1_000) ?? "Outcome not specified",
    description: cleanText(outcome?.description, 3_000),
    timeFrame: cleanText(outcome?.timeFrame, 600),
  };
}

function normalizeTrial(rawStudy, matchedSpecs) {
  const protocol = rawStudy.protocolSection ?? {};
  const identification = protocol.identificationModule ?? {};
  const statusModule = protocol.statusModule ?? {};
  const sponsors = protocol.sponsorCollaboratorsModule ?? {};
  const description = protocol.descriptionModule ?? {};
  const conditionsModule = protocol.conditionsModule ?? {};
  const design = protocol.designModule ?? {};
  const arms = protocol.armsInterventionsModule ?? {};
  const outcomes = protocol.outcomesModule ?? {};
  const eligibility = protocol.eligibilityModule ?? {};
  const contacts = protocol.contactsLocationsModule ?? {};
  const references = protocol.referencesModule ?? {};
  const status = normalizeStatus(statusModule.overallStatus);
  const phases = normalizePhases(design.phases ?? []);
  const conditions = unique(conditionsModule.conditions ?? []);
  const keywords = unique(conditionsModule.keywords ?? []);
  const leadSponsorName = canonicalizeOrganization(sponsors.leadSponsor?.name);
  const allLocations = contacts.locations ?? [];
  const countries = unique(allLocations.map((location) => location.country)).sort();
  const peptideSlugs = unique(matchedSpecs.map((spec) => spec.slug));
  const peptideNames = peptideSlugs.map(
    (slug) => matchedSpecs.find((spec) => spec.slug === slug)?.name ?? slug,
  );

  return {
    nctId: identification.nctId,
    title: cleanText(identification.briefTitle, 1_200) ?? identification.nctId,
    officialTitle: cleanText(identification.officialTitle, 2_000),
    summary: cleanText(description.briefSummary, 6_000),
    detailedDescription: cleanText(description.detailedDescription, 10_000),
    peptideSlugs,
    peptideNames,
    conditions,
    keywords,
    conditionGroups: normalizeConditionGroups(conditions, keywords),
    sponsor: {
      name: leadSponsorName,
      slug: slugify(leadSponsorName),
      class: sponsors.leadSponsor?.class ?? "UNKNOWN",
    },
    collaborators: (sponsors.collaborators ?? []).slice(0, 12).map((collaborator) => {
      const name = canonicalizeOrganization(collaborator.name);
      return {
        name,
        slug: slugify(name),
        class: collaborator.class ?? "UNKNOWN",
      };
    }),
    status,
    phases,
    studyType: design.studyType ?? "UNKNOWN",
    enrollment: design.enrollmentInfo?.count ?? null,
    dates: {
      start: statusModule.startDateStruct?.date ?? null,
      primaryCompletion: statusModule.primaryCompletionDateStruct?.date ?? null,
      completion: statusModule.completionDateStruct?.date ?? null,
      firstPosted: statusModule.studyFirstPostDateStruct?.date ?? null,
      resultsPosted: statusModule.resultsFirstPostDateStruct?.date ?? null,
      lastUpdated: statusModule.lastUpdatePostDateStruct?.date ?? null,
    },
    hasResults: Boolean(rawStudy.hasResults),
    locationCount: allLocations.length,
    countries,
    locations: allLocations.slice(0, 24).map((location) => ({
      facility: cleanText(location.facility, 500),
      status: location.status ?? null,
      city: location.city ?? null,
      state: location.state ?? null,
      country: location.country ?? null,
      latitude: location.geoPoint?.lat ?? null,
      longitude: location.geoPoint?.lon ?? null,
    })),
    eligibility: {
      criteria: cleanText(eligibility.eligibilityCriteria, 14_000),
      minimumAge: eligibility.minimumAge ?? null,
      maximumAge: eligibility.maximumAge ?? null,
      sex: eligibility.sex ?? "ALL",
      healthyVolunteers: eligibility.healthyVolunteers ?? null,
    },
    interventions: (arms.interventions ?? []).slice(0, 12).map((intervention) => ({
      type: intervention.type ?? "OTHER",
      name: cleanText(intervention.name, 500) ?? "Unnamed intervention",
      description: cleanText(intervention.description, 2_500),
    })),
    primaryOutcomes: (outcomes.primaryOutcomes ?? [])
      .slice(0, 8)
      .map(normalizeOutcome),
    secondaryOutcomes: (outcomes.secondaryOutcomes ?? [])
      .slice(0, 10)
      .map(normalizeOutcome),
    publications: (references.references ?? [])
      .filter((reference) => reference.pmid)
      .slice(0, 12)
      .map((reference) => ({
        pmid: reference.pmid,
        citation: cleanText(reference.citation, 2_500),
      })),
    sourceRegistry: "ClinicalTrials.gov",
    sourceUrl: `https://clinicaltrials.gov/study/${identification.nctId}`,
  };
}

async function fetchJson(url, attempt = 0) {
  const response = await fetch(url, {
    headers: { "User-Agent": "PeptideStat clinical-trial indexer/1.0" },
  });

  if (!response.ok) {
    if (attempt < 3 && (response.status === 429 || response.status >= 500)) {
      await new Promise((resolve) => setTimeout(resolve, 750 * 2 ** attempt));
      return fetchJson(url, attempt + 1);
    }
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  return response.json();
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker),
  );
  return results;
}

async function readExistingSnapshot() {
  try {
    return JSON.parse(await readFile(snapshotFileUrl, "utf8"));
  } catch {
    return null;
  }
}

function buildChanges(previousSnapshot, nextTrials, generatedAt) {
  const previousById = new Map(
    (previousSnapshot?.trials ?? []).map((trial) => [trial.nctId, trial]),
  );
  const nextById = new Map(nextTrials.map((trial) => [trial.nctId, trial]));

  const added = nextTrials
    .filter((trial) => !previousById.has(trial.nctId))
    .map((trial) => ({ nctId: trial.nctId, title: trial.title }));
  const removed = (previousSnapshot?.trials ?? [])
    .filter((trial) => !nextById.has(trial.nctId))
    .map((trial) => ({ nctId: trial.nctId, title: trial.title }));
  const statusChanges = [];
  const resultsPosted = [];
  const publicationsAdded = [];

  for (const trial of nextTrials) {
    const previous = previousById.get(trial.nctId);
    if (!previous) continue;

    if (previous.status.raw !== trial.status.raw) {
      statusChanges.push({
        nctId: trial.nctId,
        from: previous.status.label,
        to: trial.status.label,
      });
    }
    if (!previous.hasResults && trial.hasResults) {
      resultsPosted.push({ nctId: trial.nctId, title: trial.title });
    }
    const previousPmids = new Set(
      (previous.publications ?? []).map((publication) => publication.pmid),
    );
    const addedPmids = trial.publications
      .filter((publication) => !previousPmids.has(publication.pmid))
      .map((publication) => publication.pmid);
    if (addedPmids.length) {
      publicationsAdded.push({ nctId: trial.nctId, pmids: addedPmids });
    }
  }

  return {
    schemaVersion: 1,
    generatedAt,
    comparedWith: previousSnapshot?.generatedAt ?? null,
    summary: {
      added: added.length,
      removed: removed.length,
      statusChanges: statusChanges.length,
      resultsPosted: resultsPosted.length,
      publicationsAdded: publicationsAdded.length,
    },
    added,
    removed,
    statusChanges,
    resultsPosted,
    publicationsAdded,
  };
}

function calculateStats(trials) {
  const enrollments = trials
    .filter((trial) => trial.studyType === "INTERVENTIONAL")
    .map((trial) => trial.enrollment)
    .filter((value) => typeof value === "number");
  const newestTrial = [...trials]
    .filter((trial) => trial.dates.firstPosted)
    .sort((a, b) => b.dates.firstPosted.localeCompare(a.dates.firstPosted))[0];
  const latestResult = [...trials]
    .filter((trial) => trial.dates.resultsPosted)
    .sort((a, b) =>
      b.dates.resultsPosted.localeCompare(a.dates.resultsPosted),
    )[0];

  return {
    trials: trials.length,
    recruiting: trials.filter((trial) => trial.status.raw === "RECRUITING").length,
    active: trials.filter((trial) => trial.status.group === "active").length,
    completed: trials.filter((trial) => trial.status.group === "completed").length,
    phase1: trials.filter((trial) => trial.phases.slugs.includes("phase-1")).length,
    phase2: trials.filter((trial) => trial.phases.slugs.includes("phase-2")).length,
    phase3: trials.filter((trial) => trial.phases.slugs.includes("phase-3")).length,
    phase4: trials.filter((trial) => trial.phases.slugs.includes("phase-4")).length,
    companies: new Set(
      trials
        .filter((trial) => trial.sponsor.class === "INDUSTRY")
        .map((trial) => trial.sponsor.slug),
    ).size,
    countries: new Set(trials.flatMap((trial) => trial.countries)).size,
    averageEnrollment: enrollments.length
      ? Math.round(
          enrollments.reduce((total, enrollment) => total + enrollment, 0) /
            enrollments.length,
        )
      : 0,
    newestTrial: newestTrial?.nctId ?? null,
    latestResult: latestResult?.nctId ?? null,
  };
}

const queries = JSON.parse(await readFile(queryFileUrl, "utf8"));
const version = await fetchJson(`${apiBase}/version`);
const fetchedQueries = await mapWithConcurrency(queries, 6, async (spec, index) => {
  const url = new URL(`${apiBase}/studies`);
  url.searchParams.set("query.intr", spec.query);
  url.searchParams.set("pageSize", String(perQueryLimit));
  url.searchParams.set("countTotal", "true");
  url.searchParams.set("format", "json");
  url.searchParams.set("fields", fields.join(","));
  url.searchParams.set("sort", "LastUpdatePostDate:desc");
  const body = await fetchJson(url);
  console.log(
    `[clinical-trials] ${String(index + 1).padStart(2, "0")}/${queries.length} ${spec.name}: ${body.studies?.length ?? 0}/${body.totalCount ?? 0}`,
  );
  return {
    spec,
    studies: body.studies ?? [],
    registryCount: body.totalCount ?? 0,
  };
});

const merged = new Map();
for (const query of fetchedQueries) {
  for (const study of query.studies) {
    const nctId = study.protocolSection?.identificationModule?.nctId;
    if (!nctId) continue;
    const current = merged.get(nctId) ?? { study, specs: [] };
    if (!current.specs.some((spec) => spec.slug === query.spec.slug)) {
      current.specs.push(query.spec);
    }
    merged.set(nctId, current);
  }
}

const trials = [...merged.values()]
  .map(({ study, specs }) => normalizeTrial(study, specs))
  .sort(
    (a, b) =>
      (b.dates.lastUpdated ?? "").localeCompare(a.dates.lastUpdated ?? "") ||
      a.nctId.localeCompare(b.nctId),
  );
const generatedAt = new Date().toISOString();
const previousSnapshot = await readExistingSnapshot();
const changes = buildChanges(previousSnapshot, trials, generatedAt);
const snapshotWithoutHash = {
  schemaVersion: 1,
  generatedAt,
  source: {
    registry: "ClinicalTrials.gov",
    apiVersion: version.apiVersion,
    dataTimestamp: version.dataTimestamp,
    endpoint: `${apiBase}/studies`,
    perQueryLimit,
    queryCount: queries.length,
    coverageNote:
      "The snapshot stores the most recently updated matches for each tracked peptide query. Registry totals can exceed indexed rows when a query has more matches than the per-query limit.",
  },
  stats: calculateStats(trials),
  queryCoverage: fetchedQueries.map(({ spec, studies, registryCount }) => ({
    peptideSlug: spec.slug,
    peptideName: spec.name,
    indexedFromQuery: studies.length,
    registryMatches: registryCount,
  })),
  trials,
};
const contentHash = createHash("sha256")
  .update(JSON.stringify(snapshotWithoutHash.trials))
  .digest("hex");
const snapshot = { ...snapshotWithoutHash, contentHash };

console.log(
  `[clinical-trials] ${trials.length} unique trials, ${snapshot.stats.companies} sponsors, ${snapshot.stats.countries} countries`,
);
console.log(
  `[clinical-trials] changes: +${changes.summary.added} / -${changes.summary.removed} / ${changes.summary.statusChanges} status / ${changes.summary.resultsPosted} results`,
);

if (!dryRun) {
  await writeFile(snapshotFileUrl, `${JSON.stringify(snapshot)}\n`);
  await writeFile(changesFileUrl, `${JSON.stringify(changes, null, 2)}\n`);
  console.log(
    `[clinical-trials] wrote ${fileURLToPath(snapshotFileUrl)} and ${fileURLToPath(changesFileUrl)}`,
  );
}
