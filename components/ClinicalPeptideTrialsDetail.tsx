import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  EvidenceTimeline,
  PhaseDistributionChart,
  TrialsOverTimeChart,
} from "@/components/ClinicalTrialCharts";
import { ClinicalTrialExplorer } from "@/components/ClinicalTrialExplorer";
import { ClinicalTrialList } from "@/components/ClinicalTrialLists";
import { JsonLd } from "@/components/JsonLd";
import { compoundBySlug, marketListings, vendorById } from "@/data/marketplace";
import { peptides } from "@/data/peptides";
import {
  clinicalTrialCoverageBySlug,
  clinicalTrialFacets,
  clinicalTrialSnapshot,
  formatClinicalDate,
  phaseSeries,
  searchClinicalTrials,
  summarizeClinicalTrials,
  trialsOverTime,
} from "@/lib/clinicalTrials";
import type {
  ClinicalTrial,
  ClinicalTrialQuery,
} from "@/lib/clinicalTrialsTypes";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="min-h-24 bg-[#111713] p-4 sm:p-5">
      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white/27">
        {label}
      </dt>
      <dd
        className={`mt-2 font-mono text-2xl font-bold tracking-[-0.04em] ${accent ? "text-lime" : "text-white"}`}
      >
        {typeof value === "number" ? value.toLocaleString("en") : value}
      </dd>
    </div>
  );
}

export function ClinicalPeptideTrialsDetail({
  query,
  trials,
}: {
  query: ClinicalTrialQuery;
  trials: ClinicalTrial[];
}) {
  const summary = summarizeClinicalTrials(trials);
  const coverage = clinicalTrialCoverageBySlug.get(query.slug);
  const database = peptides.find(
    (peptide) => peptide.slug === (query.databaseSlug ?? query.slug),
  );
  const comparison = compoundBySlug.get(query.slug);
  const currentTrials = trials.filter(
    (trial) =>
      trial.status.group === "recruiting" || trial.status.group === "active",
  );
  const completedTrials = trials.filter(
    (trial) => trial.status.group === "completed",
  );
  const stoppedTrials = trials.filter(
    (trial) =>
      trial.status.group === "withdrawn" ||
      trial.status.group === "terminated" ||
      trial.status.group === "suspended",
  );
  const latestPublications = trials
    .flatMap((trial) =>
      trial.publications.map((publication) => ({ publication, trial })),
    )
    .sort((a, b) =>
      (b.trial.dates.lastUpdated ?? "").localeCompare(
        a.trial.dates.lastUpdated ?? "",
      ),
    )
    .filter(
      (entry, index, all) =>
        all.findIndex(
          (candidate) => candidate.publication.pmid === entry.publication.pmid,
        ) === index,
    )
    .slice(0, 8);
  const relatedVendors = [
    ...new Set(
      marketListings
        .filter((listing) => listing.compoundSlug === query.slug)
        .map((listing) => listing.vendorId),
    ),
  ]
    .map((vendorId) => vendorById.get(vendorId))
    .filter((vendor) => vendor !== undefined)
    .slice(0, 6);
  const initialResponse = searchClinicalTrials(
    { peptide: query.slug },
    0,
    24,
  );
  const firstStart = [...trials]
    .map((trial) => trial.dates.start ?? trial.dates.firstPosted)
    .filter((date): date is string => Boolean(date))
    .sort()[0];
  const evidenceSummary = trials.length
    ? `${query.name} appears in ${trials.length.toLocaleString("en")} indexed studies: ${summary.recruiting.toLocaleString("en")} recruiting, ${summary.completed.toLocaleString("en")} completed and ${summary.resultsPublished.toLocaleString("en")} with registry results posted. The highest registered development stage in this snapshot is ${summary.highestPhaseLabel}. These counts measure registry activity; they do not establish that ${query.name} is safe or effective.`
    : `No ${query.name} study is present in the current local snapshot. Absence from this index is not proof that no study exists; search the source registry directly and check the stated query coverage.`;
  const faqs = [
    {
      question: `How many ${query.name} clinical trials are indexed?`,
      answer: `${trials.length.toLocaleString("en")} unique studies in the current PeptideStat snapshot. The source query returned ${coverage?.registryMatches.toLocaleString("en") ?? "an unreported number of"} registry matches; high-volume queries are capped at the most recently updated ${clinicalTrialSnapshot.source.perQueryLimit} records before cross-query deduplication.`,
    },
    {
      question: `Are any ${query.name} trials recruiting?`,
      answer: `${summary.recruiting.toLocaleString("en")} indexed studies currently carry a recruiting status. Always confirm the current status and site contacts on the source registry record.`,
    },
    {
      question: `What is the highest phase for ${query.name}?`,
      answer: `${summary.highestPhaseLabel} is the highest phase label among indexed studies. Phase labels can overlap and some observational studies are not assigned a phase.`,
    },
    {
      question: `Do registered trials prove that ${query.name} works?`,
      answer:
        "No. Registration shows that a study record exists. Conclusions require completed results, appropriate study design, peer-reviewed evidence and regulatory context.",
    },
  ];
  const path = `/clinical-trials/${query.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Clinical trials", path: "/clinical-trials" },
    { name: query.name, path },
  ];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `${query.name} clinical trials`,
          description: evidenceSummary,
          path,
          dateModified: clinicalTrialSnapshot.generatedAt,
          items: trials.map((trial) => ({
            name: trial.title,
            path: `/clinical-trials/${trial.nctId}`,
          })),
        })}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8">
          <Breadcrumbs inverse crumbs={crumbs} />
          <div className="mt-11 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
                <span className="flex items-center gap-2 text-lime">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  Evidence dashboard
                </span>
                {firstStart ? <span>Studies since {firstStart.slice(0, 4)}</span> : null}
                <span>Updated {formatClinicalDate(clinicalTrialSnapshot.source.dataTimestamp.slice(0, 10))}</span>
              </div>
              <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.87] tracking-[-0.07em]">
                {query.name}
                <span className="block text-lime">Clinical Trials.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                A source-linked view of every {query.name} study in the current
                snapshot—status, phase, enrollment, results, publications,
                locations and changes over time.
              </p>
            </div>

            <aside className="border-l border-white/15 pl-6 sm:pl-8">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/28">
                Registry coverage
              </p>
              <div className="mt-5 grid grid-cols-2 gap-px bg-white/10">
                <div className="bg-[#111713] p-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/28">
                    Indexed query rows
                  </p>
                  <p className="mt-2 font-mono text-3xl font-bold text-lime">
                    {coverage?.indexedFromQuery.toLocaleString("en") ?? "—"}
                  </p>
                </div>
                <div className="bg-[#111713] p-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/28">
                    Registry matches
                  </p>
                  <p className="mt-2 font-mono text-3xl font-bold text-white">
                    {coverage?.registryMatches.toLocaleString("en") ?? "—"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-5 text-white/30">
                Query: <span className="font-mono text-white/50">{query.query}</span>.
                Up to {clinicalTrialSnapshot.source.perQueryLimit} most recently
                updated source records are stored per query, then deduplicated.
              </p>
            </aside>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            <Metric label="Total trials" value={summary.total} accent />
            <Metric label="Recruiting" value={summary.recruiting} />
            <Metric label="Completed" value={summary.completed} />
            <Metric label="Terminated" value={summary.terminated} />
            <Metric label="Results posted" value={summary.resultsPublished} />
            <Metric label="Average enrollment" value={summary.averageEnrollment} />
            <Metric label="Countries" value={summary.countries} />
            <Metric label="Highest phase" value={summary.highestPhaseLabel} />
          </dl>
          <div className="grid gap-px border-x border-b border-white/10 bg-white/10 sm:grid-cols-2">
            <div className="bg-[#0d120f] px-5 py-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/28">
                Largest indexed study
              </p>
              {summary.largest ? (
                <Link
                  href={`/clinical-trials/${summary.largest.nctId}`}
                  className="mt-1 block truncate text-xs font-bold text-white/65 hover:text-lime"
                >
                  {summary.largest.enrollment?.toLocaleString("en")} participants ·{" "}
                  {summary.largest.nctId} →
                </Link>
              ) : (
                <p className="mt-1 text-xs text-white/35">Not reported</p>
              )}
            </div>
            <div className="bg-[#0d120f] px-5 py-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/28">
                Developer / research origin
              </p>
              <p className="mt-1 truncate text-xs font-bold text-white/65">
                {query.developer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Evidence summary
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Activity is not efficacy.
            </h2>
          </div>
          <div className="border-l-2 border-lime pl-5 sm:pl-7">
            <p className="text-sm leading-8 text-white/58">{evidenceSummary}</p>
            <p className="mt-5 text-[10px] leading-5 text-white/28">
              Review the design, endpoints, population, protocol changes,
              statistical analysis and publications before drawing conclusions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Development history
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Trial timeline.
            </h2>
          </div>
          <EvidenceTimeline trials={trials} />
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
            <TrialsOverTimeChart
              title={`${query.name} studies by start year`}
              data={trialsOverTime(trials)}
            />
            <PhaseDistributionChart data={phaseSeries(trials)} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Current studies
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Recruiting or active
              </h2>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                Completed studies
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Finished records
              </h2>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#ffad94]">
                Stopped studies
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Withdrawn or terminated
              </h2>
            </div>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            <ClinicalTrialList trials={currentTrials} limit={6} />
            <ClinicalTrialList trials={completedTrials} limit={6} />
            <ClinicalTrialList trials={stoppedTrials} limit={6} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Full study index
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                Search {query.name} trials.
              </h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-white/35">
              Add status, phase, condition, country, result and publication filters
              inside this molecule’s indexed study set.
            </p>
          </div>
          <ClinicalTrialExplorer
            initialResponse={initialResponse}
            facets={clinicalTrialFacets}
            baseFilters={{ peptide: query.slug }}
          />
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Latest publications
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Follow the paper trail.
            </h2>
          </div>
          {latestPublications.length ? (
            <div className="border border-white/10">
              {latestPublications.map(({ publication, trial }) => (
                <a
                  key={publication.pmid}
                  href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-b border-white/10 p-5 last:border-0 hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-[9px] font-bold text-lime">
                    PMID {publication.pmid} ↗
                  </span>
                  <span className="mt-2 block text-xs leading-6 text-white/55">
                    {publication.citation ?? "Citation details unavailable"}
                  </span>
                  <span className="mt-2 block font-mono text-[8px] text-white/25">
                    Linked from {trial.nctId}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 p-7 text-xs leading-6 text-white/35">
              No PMID-linked publications are present in the indexed registry
              records for this molecule.
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0b100d] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Related pages
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Keep researching {query.name}.
            </h2>
            <p className="mt-5 text-xs leading-6 text-white/32">
              Commercial research listings, where present, are kept separate
              from clinical evidence and are not treatment recommendations.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {database ? (
              <>
                <Link
                  href={`/database/${database.slug}`}
                  className="border border-white/12 p-5 hover:border-lime"
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-lime/70">
                    Database
                  </span>
                  <strong className="mt-2 block text-sm text-white/75">
                    {query.name} database page →
                  </strong>
                </Link>
                {database.articleSlug ? (
                  <Link
                    href={`/peptides/${database.articleSlug}`}
                    className="border border-white/12 p-5 hover:border-lime"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-lime/70">
                      Research guide
                    </span>
                    <strong className="mt-2 block text-sm text-white/75">
                      Read the {query.name} guide →
                    </strong>
                  </Link>
                ) : null}
              </>
            ) : null}
            {comparison ? (
              <Link
                href={`/compare/${comparison.slug}`}
                className="border border-white/12 p-5 hover:border-lime"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                  Market comparison
                </span>
                <strong className="mt-2 block text-sm text-white/75">
                  {query.name} research listings →
                </strong>
              </Link>
            ) : null}
            <Link
              href="/lab-tests"
              className="border border-white/12 p-5 hover:border-lime"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                Lab reports
              </span>
              <strong className="mt-2 block text-sm text-white/75">
                Search the COA ledger →
              </strong>
            </Link>
            {relatedVendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/vendors/${vendor.id}`}
                className="border border-white/12 p-5 hover:border-lime"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                  Research vendor record
                </span>
                <strong className="mt-2 block text-sm text-white/75">
                  {vendor.name} →
                </strong>
              </Link>
            ))}
            <a
              href={`https://clinicaltrials.gov/search?intr=${encodeURIComponent(query.query)}`}
              target="_blank"
              rel="noreferrer"
              className="border border-white/12 p-5 hover:border-lime"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                Source registry
              </span>
              <strong className="mt-2 block text-sm text-white/75">
                Search ClinicalTrials.gov ↗
              </strong>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
