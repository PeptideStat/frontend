import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  PhaseDistributionChart,
  RecruitmentMap,
  TrialBarChart,
  TrialsOverTimeChart,
} from "@/components/ClinicalTrialCharts";
import { ClinicalTrialExplorer } from "@/components/ClinicalTrialExplorer";
import { JsonLd } from "@/components/JsonLd";
import {
  clinicalTrialFacets,
  clinicalTrialQueries,
  clinicalTrialSnapshot,
  clinicalTrials,
  companySeries,
  conditionSeries,
  countrySeries,
  formatClinicalDate,
  phaseSeries,
  searchClinicalTrials,
  trialsOverTime,
} from "@/lib/clinicalTrials";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

const path = "/clinical-trials";
const title = "Peptide Clinical Trials Database";
const description =
  "Search 2,600+ indexed peptide clinical trials by drug, sponsor, NCT ID, condition, phase, recruitment status, country, results and publications.";

export const metadata: Metadata = buildMetadata({ title, description, path });

function StatCell({
  label,
  value,
  href,
  accent = false,
}: {
  label: string;
  value: string | number;
  href?: string;
  accent?: boolean;
}) {
  const content = (
    <>
      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/30">
        {label}
      </dt>
      <dd
        className={`mt-2 font-mono text-2xl font-bold tracking-[-0.04em] sm:text-3xl ${accent ? "text-lime" : "text-white"}`}
      >
        {typeof value === "number" ? value.toLocaleString("en") : value}
      </dd>
    </>
  );

  return href ? (
    <Link
      href={href}
      className="block min-h-24 bg-[#111713] p-4 transition-colors hover:bg-white/[0.055] sm:p-5"
    >
      <dl>{content}</dl>
    </Link>
  ) : (
    <div className="min-h-24 bg-[#111713] p-4 sm:p-5">
      <dl>{content}</dl>
    </div>
  );
}

export default function ClinicalTrialsPage() {
  const { stats } = clinicalTrialSnapshot;
  const initialResponse = searchClinicalTrials({}, 0, 24);
  const updatedAt = formatClinicalDate(
    clinicalTrialSnapshot.source.dataTimestamp.slice(0, 10),
  );
  const newest = stats.newestTrial;
  const latestResult = stats.latestResult;
  const topPeptides = clinicalTrialSnapshot.queryCoverage
    .map((coverage) => ({
      ...coverage,
      query: clinicalTrialQueries.find(
        (item) => item.slug === coverage.peptideSlug,
      ),
    }))
    .sort((a, b) => b.registryMatches - a.registryMatches)
    .slice(0, 16);

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path,
          dateModified: clinicalTrialSnapshot.generatedAt,
          items: clinicalTrialQueries.map((query) => ({
            name: `${query.name} clinical trials`,
            path: `/clinical-trials/${query.slug}`,
          })),
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: title,
          description,
          url: absoluteUrl(path),
          dateModified: clinicalTrialSnapshot.generatedAt,
          creator: {
            "@type": "Organization",
            name: "PeptideStat",
            url: absoluteUrl("/"),
          },
          isBasedOn: clinicalTrialSnapshot.source.endpoint,
          temporalCoverage: "1995/2026",
          variableMeasured: [
            "Recruitment status",
            "Study phase",
            "Enrollment",
            "Sponsor",
            "Condition",
            "Study locations",
            "Primary and secondary outcomes",
            "Results availability",
            "PubMed references",
          ],
          distribution: {
            "@type": "DataDownload",
            encodingFormat: "application/json",
            contentUrl: absoluteUrl("/clinical-trials/data"),
          },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Clinical trials", path },
        ])}
      />

      <section className="overflow-hidden border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <Breadcrumbs
            inverse
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Clinical trials", path },
            ]}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:gap-20">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/38">
                <span className="flex items-center gap-2 text-lime">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_12px_#d9f36a]" />
                  Registry snapshot online
                </span>
                <span>API {clinicalTrialSnapshot.source.apiVersion}</span>
                <span>Updated {updatedAt}</span>
              </div>
              <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,8.2vw,7.9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
                Clinical
                <span className="block text-lime">Trials.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
                Search thousands of peptide clinical trials from
                ClinicalTrials.gov. Follow the compound, sponsor, indication,
                phase, location, results and publication trail in one research
                index.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#trial-explorer"
                  className="inline-flex min-h-11 items-center bg-lime px-5 text-xs font-black text-ink hover:bg-white"
                >
                  Search the database
                </a>
                <a
                  href="#intelligence"
                  className="inline-flex min-h-11 items-center border border-white/20 px-5 text-xs font-bold text-white hover:border-white"
                >
                  Open intelligence view
                </a>
              </div>
            </div>

            <aside className="border-l border-white/15 pl-6 sm:pl-8">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-white/30">
                Snapshot pulse
              </p>
              <dl className="mt-6 space-y-5">
                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                  <dt className="text-xs text-white/42">Indexed studies</dt>
                  <dd className="font-mono text-3xl font-bold text-white">
                    {stats.trials.toLocaleString("en")}
                  </dd>
                </div>
                <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-4">
                  <dt className="text-xs text-white/42">Recruiting now</dt>
                  <dd className="font-mono text-3xl font-bold text-lime">
                    {stats.recruiting.toLocaleString("en")}
                  </dd>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <dt className="text-xs text-white/42">Tracked peptides</dt>
                  <dd className="font-mono text-3xl font-bold text-white">
                    {clinicalTrialQueries.length}
                  </dd>
                </div>
              </dl>
              <p className="mt-7 text-[10px] leading-5 text-white/30">
                Registry records describe study activity, not proof of clinical
                efficacy or product quality.
              </p>
            </aside>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-5">
            <StatCell label="Total trials" value={stats.trials} accent />
            <StatCell
              label="Recruiting"
              value={stats.recruiting}
              href="/clinical-trials/status/recruiting"
            />
            <StatCell
              label="Completed"
              value={stats.completed}
              href="/clinical-trials/status/completed"
            />
            <StatCell
              label="Phase 1"
              value={stats.phase1}
              href="/clinical-trials/phase/phase-1"
            />
            <StatCell
              label="Phase 2"
              value={stats.phase2}
              href="/clinical-trials/phase/phase-2"
            />
            <StatCell
              label="Phase 3"
              value={stats.phase3}
              href="/clinical-trials/phase/phase-3"
            />
            <StatCell
              label="Phase 4"
              value={stats.phase4}
              href="/clinical-trials/phase/phase-4"
            />
            <StatCell label="Industry sponsors" value={stats.companies} />
            <StatCell label="Countries" value={stats.countries} />
            <StatCell label="Avg enrollment" value={stats.averageEnrollment} />
          </div>

          <div className="grid gap-px border-x border-b border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              ["Newest indexed trial", newest],
              ["Latest results posting", latestResult],
            ].map(([label, nctId]) => (
              <Link
                key={label}
                href={`/clinical-trials/${nctId}`}
                className="flex items-center justify-between gap-6 bg-[#0d120f] px-5 py-4 hover:bg-white/[0.045]"
              >
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/30">
                  {label}
                </span>
                <strong className="font-mono text-[10px] text-lime">
                  {nctId} →
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="trial-explorer"
        className="scroll-mt-28 border-b border-white/10 bg-[#0b100d] text-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-lime">
                Query terminal
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Find the signal.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/42">
                Search by peptide, drug, company, NCT ID or indication. Layer
                recruitment, phase, condition, country, results and publication
                filters without downloading the full registry snapshot.
              </p>
            </div>
            <Link
              href="/clinical-trials/data"
              className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white/45 hover:text-lime"
            >
              Machine-readable API →
            </Link>
          </div>
          <ClinicalTrialExplorer
            initialResponse={initialResponse}
            facets={clinicalTrialFacets}
            syncUrl
          />
        </div>
      </section>

      <section
        id="intelligence"
        className="scroll-mt-28 border-b border-white/10 bg-[#0d120f] text-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-9 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-lime">
                Market intelligence
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                The whole field,
                <span className="block text-white/28">not a top-ten list.</span>
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/42 lg:justify-self-end">
              The charts use study start dates, phase labels, lead sponsors and
              geocoded registry locations from the same local snapshot as the
              search results. Counts may overlap when a study spans phases,
              compounds or condition groups.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.45fr_.55fr]">
            <TrialsOverTimeChart data={trialsOverTime(clinicalTrials, 1995)} />
            <PhaseDistributionChart data={phaseSeries(clinicalTrials)} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <TrialBarChart
              eyebrow="Therapeutic areas"
              title="Trials by condition"
              data={conditionSeries(clinicalTrials, 7)}
            />
            <TrialBarChart
              eyebrow="Industry"
              title="Trials by company"
              data={companySeries(clinicalTrials, 7)}
              accent="sky"
            />
            <TrialBarChart
              eyebrow="Geography"
              title="Trials by country"
              data={countrySeries(clinicalTrials, 7)}
              accent="coral"
            />
          </div>
          <div className="mt-4">
            <RecruitmentMap trials={clinicalTrials} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.62fr_1.38fr] lg:gap-16">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-accent">
                Peptide coverage
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-6xl">
                Follow a molecule.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted">
                Each molecule has its own evidence dashboard, trial timeline,
                status breakdown, study list and publication trail.
              </p>
              <p className="mt-5 border-l-2 border-coral pl-4 text-[11px] leading-6 text-muted">
                High-volume registry queries are capped at the 75 most recently
                updated matches in this snapshot. The registry match count is
                shown separately so indexed coverage stays explicit.
              </p>
            </div>

            <div className="overflow-hidden border border-line bg-paper">
              <div className="grid grid-cols-[minmax(0,1fr)_80px_90px] border-b border-line bg-surface px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-muted sm:px-5">
                <span>Compound</span>
                <span className="text-right">Indexed</span>
                <span className="text-right">Registry</span>
              </div>
              {topPeptides.map((item) => (
                <Link
                  key={item.peptideSlug}
                  href={`/clinical-trials/${item.peptideSlug}`}
                  className="grid grid-cols-[minmax(0,1fr)_80px_90px] items-center border-b border-line px-4 py-3 text-xs last:border-0 hover:bg-accent-soft sm:px-5"
                >
                  <span className="min-w-0">
                    <strong className="block truncate text-ink">
                      {item.peptideName}
                    </strong>
                    <span className="mt-0.5 block truncate text-[9px] text-muted">
                      {item.query?.developer ?? "Developer not listed"}
                    </span>
                  </span>
                  <span className="text-right font-mono font-bold text-ink">
                    {item.indexedFromQuery}
                  </span>
                  <span className="text-right font-mono text-muted">
                    {item.registryMatches.toLocaleString("en")}
                  </span>
                </Link>
              ))}
              <div className="border-t border-line bg-surface-2 px-5 py-4 text-right">
                <Link
                  href="#trial-explorer"
                  className="text-[10px] font-bold text-ink hover:text-accent"
                >
                  Search all {clinicalTrialQueries.length} tracked peptides ↑
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-accent">
              Provenance
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">
              Source-linked by default.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>
              Every study page links to its source record. PeptideStat stores a
              normalized snapshot so filters and pages remain fast, then records
              status, result and publication changes between syncs.
            </p>
            <p>
              Clinical-trial registration does not establish safety, efficacy or
              regulatory approval. Always read the protocol, results and linked
              publications in context.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-xs font-bold text-ink">
              <a
                href="https://clinicaltrials.gov/data-api/api"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                ClinicalTrials.gov API ↗
              </a>
              <Link href="/editorial-policy" className="hover:text-accent">
                Editorial policy →
              </Link>
              <Link href="/disclaimer" className="hover:text-accent">
                Medical disclaimer →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
