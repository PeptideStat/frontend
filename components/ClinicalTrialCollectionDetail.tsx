import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  PhaseDistributionChart,
  TrialBarChart,
  TrialsOverTimeChart,
} from "@/components/ClinicalTrialCharts";
import { ClinicalTrialExplorer } from "@/components/ClinicalTrialExplorer";
import { ClinicalTrialSectionNav } from "@/components/ClinicalTrialLists";
import { JsonLd } from "@/components/JsonLd";
import {
  clinicalTrialFacets,
  clinicalTrialSnapshot,
  companySeries,
  conditionSeries,
  formatClinicalDate,
  phaseSeries,
  searchClinicalTrials,
  summarizeClinicalTrials,
  trialsOverTime,
} from "@/lib/clinicalTrials";
import type {
  ClinicalTrial,
  ClinicalTrialSearchFilters,
} from "@/lib/clinicalTrialsTypes";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";

type HiddenFilter = "status" | "phase" | "condition" | "company" | "country";

function topPeptides(trials: ClinicalTrial[], limit = 12) {
  const values = new Map<string, { name: string; count: number }>();
  for (const trial of trials) {
    trial.peptideSlugs.forEach((slug, index) => {
      const current = values.get(slug);
      values.set(slug, {
        name: trial.peptideNames[index] ?? slug,
        count: (current?.count ?? 0) + 1,
      });
    });
  }
  return [...values.entries()]
    .map(([slug, value]) => ({ slug, ...value }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function ClinicalTrialCollectionDetail({
  label,
  eyebrow,
  description,
  path,
  trials,
  baseFilters,
  hiddenFilters,
}: {
  label: string;
  eyebrow: string;
  description: string;
  path: string;
  trials: ClinicalTrial[];
  baseFilters: ClinicalTrialSearchFilters;
  hiddenFilters: HiddenFilter[];
}) {
  const summary = summarizeClinicalTrials(trials);
  const initialResponse = searchClinicalTrials(baseFilters, 0, 24);
  const peptides = topPeptides(trials);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Clinical trials", path: "/clinical-trials" },
    { name: label, path },
  ];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `${label} peptide clinical trials`,
          description,
          path,
          dateModified: clinicalTrialSnapshot.generatedAt,
          items: trials.map((trial) => ({
            name: trial.title,
            path: `/clinical-trials/${trial.nctId}`,
          })),
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8">
          <Breadcrumbs inverse crumbs={crumbs} />
          <div className="mt-11 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                {eyebrow}
              </p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.87] tracking-[-0.07em]">
                {label}
                <span className="block text-lime">Peptide Trials.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/52 sm:text-base">
                {description}
              </p>
            </div>
            <aside className="border-l border-white/15 pl-6 sm:pl-8">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/27">
                Collection pulse
              </p>
              <p className="mt-5 font-mono text-6xl font-bold tracking-[-0.07em] text-lime">
                {summary.total.toLocaleString("en")}
              </p>
              <p className="mt-2 text-xs text-white/38">matching indexed studies</p>
              <p className="mt-6 text-[10px] leading-5 text-white/28">
                Snapshot updated {formatClinicalDate(clinicalTrialSnapshot.source.dataTimestamp.slice(0, 10))}.
                Counts describe registry records, not clinical conclusions.
              </p>
            </aside>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-6">
            {[
              ["Studies", summary.total],
              ["Recruiting", summary.recruiting],
              ["Completed", summary.completed],
              ["Results posted", summary.resultsPublished],
              ["Countries", summary.countries],
              ["Avg enrollment", summary.averageEnrollment],
            ].map(([metricLabel, value], index) => (
              <div key={metricLabel} className="min-h-24 bg-[#111713] p-4 sm:p-5">
                <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white/27">
                  {metricLabel}
                </dt>
                <dd
                  className={`mt-2 font-mono text-2xl font-bold ${index === 1 ? "text-lime" : "text-white"}`}
                >
                  {Number(value).toLocaleString("en")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
            <TrialsOverTimeChart
              title={`${label} trials by start year`}
              data={trialsOverTime(trials)}
            />
            <PhaseDistributionChart data={phaseSeries(trials)} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TrialBarChart
              eyebrow="Industry"
              title="Leading sponsors"
              data={companySeries(trials, 8)}
              accent="sky"
            />
            <TrialBarChart
              eyebrow="Therapeutic areas"
              title="Condition groups"
              data={conditionSeries(trials, 8)}
              accent="coral"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.65fr_1.35fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Compound leaders
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Most represented peptides.
            </h2>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {peptides.map((peptide, index) => (
              <Link
                key={peptide.slug}
                href={`/clinical-trials/${peptide.slug}`}
                className="flex items-center justify-between gap-5 bg-[#111713] p-4 hover:bg-white/[0.05]"
              >
                <span className="min-w-0">
                  <span className="font-mono text-[8px] text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong className="ml-3 text-xs text-white/70">
                    {peptide.name}
                  </strong>
                </span>
                <span className="font-mono text-xs font-bold text-lime">
                  {peptide.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Study explorer
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                Search this collection.
              </h2>
            </div>
            <ClinicalTrialSectionNav />
          </div>
          <ClinicalTrialExplorer
            initialResponse={initialResponse}
            facets={clinicalTrialFacets}
            baseFilters={baseFilters}
            hiddenFilters={hiddenFilters}
          />
        </div>
      </section>
    </>
  );
}
