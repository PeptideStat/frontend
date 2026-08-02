import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  PhaseDistributionChart,
  TrialsOverTimeChart,
} from "@/components/ClinicalTrialCharts";
import { ClinicalTrialExplorer } from "@/components/ClinicalTrialExplorer";
import { ClinicalTrialList } from "@/components/ClinicalTrialLists";
import { JsonLd } from "@/components/JsonLd";
import {
  clinicalTrialFacets,
  clinicalTrialQueryBySlug,
  clinicalTrialSnapshot,
  companyNameForSlug,
  formatClinicalDate,
  getTrialsForCompany,
  industryCompanySlugs,
  phaseSeries,
  searchClinicalTrials,
  summarizeClinicalTrials,
  trialsOverTime,
} from "@/lib/clinicalTrials";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industryCompanySlugs.map((company) => ({ company }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;
  const name = companyNameForSlug(company);
  if (!name) return { title: "Clinical-trial sponsor not found" };
  const count = getTrialsForCompany(company).length;
  return buildMetadata({
    title: `${name} Peptide Clinical Trials & Pipeline`,
    description: `Explore ${count.toLocaleString("en")} indexed ${name} peptide clinical trials by product, phase, status, enrollment, indication, results, location and latest registry update.`,
    path: `/clinical-trials/company/${company}`,
  });
}

export default async function ClinicalTrialCompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const name = companyNameForSlug(company);
  if (!name) notFound();

  const trials = getTrialsForCompany(company);
  const summary = summarizeClinicalTrials(trials);
  const activeTrials = trials.filter(
    (trial) =>
      trial.status.group === "recruiting" || trial.status.group === "active",
  );
  const completedTrials = trials.filter(
    (trial) => trial.status.group === "completed",
  );
  const products = [
    ...new Set(trials.flatMap((trial) => trial.peptideSlugs)),
  ]
    .map((slug) => {
      const productTrials = trials.filter((trial) =>
        trial.peptideSlugs.includes(slug),
      );
      return {
        slug,
        name:
          clinicalTrialQueryBySlug.get(slug)?.name ??
          productTrials[0]?.peptideNames[
            productTrials[0].peptideSlugs.indexOf(slug)
          ] ??
          slug,
        trials: productTrials,
        highestPhase: Math.max(
          0,
          ...productTrials.map((trial) => trial.phases.highest),
        ),
        active: productTrials.filter(
          (trial) =>
            trial.status.group === "recruiting" ||
            trial.status.group === "active",
        ).length,
      };
    })
    .sort(
      (a, b) =>
        b.highestPhase - a.highestPhase ||
        b.trials.length - a.trials.length ||
        a.name.localeCompare(b.name),
    );
  const initialResponse = searchClinicalTrials({ company }, 0, 24);
  const path = `/clinical-trials/company/${company}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Clinical trials", path: "/clinical-trials" },
    { name, path },
  ];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `${name} peptide clinical trials`,
          description: `Indexed ${name} peptide clinical-trial pipeline, recruitment status, phase and registry updates.`,
          path,
          dateModified: clinicalTrialSnapshot.generatedAt,
          items: trials.map((trial) => ({
            name: trial.title,
            path: `/clinical-trials/${trial.nctId}`,
          })),
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name,
          url: absoluteUrl(path),
          subjectOf: trials.slice(0, 20).map((trial) => ({
            "@type": "MedicalStudy",
            name: trial.title,
            url: absoluteUrl(`/clinical-trials/${trial.nctId}`),
          })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8">
          <Breadcrumbs inverse crumbs={crumbs} />
          <div className="mt-11 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Industry sponsor intelligence
              </p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.87] tracking-[-0.07em]">
                {name}
                <span className="block text-lime">Clinical Pipeline.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/52 sm:text-base">
                Lead-sponsor view of {name}&apos;s indexed peptide studies,
                development phases, active programs, completed work and recent
                registry changes.
              </p>
            </div>
            <aside className="border-l border-white/15 pl-6 sm:pl-8">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/27">
                Pipeline pulse
              </p>
              <dl className="mt-5 space-y-4">
                {[
                  ["Indexed trials", summary.total],
                  ["Active or recruiting", activeTrials.length],
                  ["Tracked peptide programs", products.length],
                  ["Countries", summary.countries],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-end justify-between gap-5 border-b border-white/10 pb-3 last:border-0"
                  >
                    <dt className="text-xs text-white/38">{label}</dt>
                    <dd className="font-mono text-2xl font-bold text-white">
                      {Number(value).toLocaleString("en")}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-6">
            {[
              ["Total", summary.total],
              ["Recruiting", summary.recruiting],
              ["Active", summary.active],
              ["Completed", summary.completed],
              ["Results posted", summary.resultsPublished],
              ["Avg enrollment", summary.averageEnrollment],
            ].map(([label, value], index) => (
              <div key={label} className="min-h-24 bg-[#111713] p-4 sm:p-5">
                <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white/27">
                  {label}
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
          <div className="mb-8">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Pipeline overview
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
              Programs by phase and activity.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
            <TrialsOverTimeChart
              title={`${name} trials by start year`}
              data={trialsOverTime(trials)}
            />
            <PhaseDistributionChart data={phaseSeries(trials)} />
          </div>

          <div className="mt-4 overflow-x-auto border border-white/10 bg-[#111713]">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-[#151c18] font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/28">
                  <th className="px-5 py-3">Product</th>
                  <th className="px-4 py-3 text-right">Studies</th>
                  <th className="px-4 py-3 text-right">Early / I</th>
                  <th className="px-4 py-3 text-right">Phase II</th>
                  <th className="px-4 py-3 text-right">Phase III</th>
                  <th className="px-4 py-3 text-right">Phase IV</th>
                  <th className="px-5 py-3 text-right">Active</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.slug}
                    className="border-b border-white/[0.08] last:border-0 hover:bg-white/[0.03]"
                  >
                    <th className="px-5 py-4 text-xs font-semibold text-white/75">
                      <Link
                        href={`/clinical-trials/${product.slug}`}
                        className="hover:text-lime"
                      >
                        {product.name} →
                      </Link>
                    </th>
                    <td className="px-4 py-4 text-right font-mono text-[10px] text-white/50">
                      {product.trials.length}
                    </td>
                    {[
                      ["early-phase-1", "phase-1"],
                      ["phase-2"],
                      ["phase-3"],
                      ["phase-4"],
                    ].map((phases) => (
                      <td
                        key={phases.join("-")}
                        className="px-4 py-4 text-right font-mono text-[10px] text-white/50"
                      >
                        {
                          product.trials.filter((trial) =>
                            phases.some((phase) =>
                              trial.phases.slugs.includes(
                                phase as (typeof trial.phases.slugs)[number],
                              ),
                            ),
                          ).length
                        }
                      </td>
                    ))}
                    <td className="px-5 py-4 text-right font-mono text-[10px] font-bold text-lime">
                      {product.active}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Active peptide trials
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                In motion now.
              </h2>
              <div className="mt-7">
                <ClinicalTrialList trials={activeTrials} limit={10} />
              </div>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                Completed trials
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                Finished registry records.
              </h2>
              <div className="mt-7">
                <ClinicalTrialList trials={completedTrials} limit={10} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Search sponsor records
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
                All {name} studies.
              </h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-white/35">
              This page groups studies where {name} is listed as the lead industry
              sponsor. Collaborator-only records are not included in the count.
            </p>
          </div>
          <ClinicalTrialExplorer
            initialResponse={initialResponse}
            facets={clinicalTrialFacets}
            baseFilters={{ company }}
            hiddenFilters={["company"]}
          />
        </div>
      </section>

      <section className="bg-[#0b100d] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Recent updates
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Latest registry movement.
            </h2>
          </div>
          <div className="border border-white/10">
            {trials.slice(0, 10).map((trial) => (
              <Link
                key={trial.nctId}
                href={`/clinical-trials/${trial.nctId}`}
                className="grid gap-2 border-b border-white/10 p-5 last:border-0 hover:bg-white/[0.04] sm:grid-cols-[105px_1fr_100px] sm:items-center"
              >
                <span className="font-mono text-[9px] font-bold text-lime">
                  {trial.nctId}
                </span>
                <span className="line-clamp-1 text-xs font-semibold text-white/65">
                  {trial.title}
                </span>
                <span className="font-mono text-[9px] text-white/30 sm:text-right">
                  {formatClinicalDate(trial.dates.lastUpdated)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
