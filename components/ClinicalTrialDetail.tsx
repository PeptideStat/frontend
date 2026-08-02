import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClinicalTrialList } from "@/components/ClinicalTrialLists";
import { JsonLd } from "@/components/JsonLd";
import { compoundBySlug, marketListings, vendorById } from "@/data/marketplace";
import { peptides } from "@/data/peptides";
import {
  clinicalTrialQueryBySlug,
  clinicalTrials,
  formatClinicalDate,
} from "@/lib/clinicalTrials";
import type { ClinicalTrial } from "@/lib/clinicalTrialsTypes";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

function statusClasses(status: string) {
  if (status === "recruiting") return "border-lime/40 bg-lime/10 text-lime";
  if (status === "completed") {
    return "border-emerald-300/30 bg-emerald-300/10 text-emerald-200";
  }
  if (status === "terminated" || status === "withdrawn") {
    return "border-coral/35 bg-coral/10 text-[#ffb49d]";
  }
  return "border-white/20 bg-white/[0.04] text-white/65";
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10 py-4 last:border-0">
      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white/28">
        {label}
      </dt>
      <dd className="mt-1.5 text-xs leading-5 text-white/68">{children}</dd>
    </div>
  );
}

function OutcomeList({
  title,
  outcomes,
}: {
  title: string;
  outcomes: ClinicalTrial["primaryOutcomes"];
}) {
  return (
    <div>
      <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
        {title}
      </h3>
      {outcomes.length ? (
        <div className="mt-4 border border-white/10">
          {outcomes.map((outcome, index) => (
            <article
              key={`${outcome.measure}-${index}`}
              className="border-b border-white/10 p-5 last:border-0"
            >
              <p className="text-sm font-semibold leading-6 text-white">
                {outcome.measure}
              </p>
              {outcome.timeFrame ? (
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.08em] text-lime/75">
                  Time frame · {outcome.timeFrame}
                </p>
              ) : null}
              {outcome.description ? (
                <p className="mt-3 text-xs leading-6 text-white/45">
                  {outcome.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-white/35">Not reported in the indexed record.</p>
      )}
    </div>
  );
}

function clinicalTrialJsonLd(trial: ClinicalTrial) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalStudy", "MedicalTrial"],
    name: trial.title,
    alternateName: trial.officialTitle ?? undefined,
    description: trial.summary ?? trial.title,
    url: absoluteUrl(`/clinical-trials/${trial.nctId}`),
    sameAs: trial.sourceUrl,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ClinicalTrials.gov",
      value: trial.nctId,
      url: trial.sourceUrl,
    },
    status: trial.status.label,
    studySubject: trial.peptideNames.map((name) => ({
      "@type": "Drug",
      name,
    })),
    healthCondition: trial.conditions.map((condition) => ({
      "@type": "MedicalCondition",
      name: condition,
    })),
    sponsor: {
      "@type": "Organization",
      name: trial.sponsor.name,
    },
    studyLocation: trial.locations.slice(0, 10).map((location) => ({
      "@type": "Place",
      name: location.facility ?? [location.city, location.country].filter(Boolean).join(", "),
      address: {
        "@type": "PostalAddress",
        addressLocality: location.city ?? undefined,
        addressRegion: location.state ?? undefined,
        addressCountry: location.country ?? undefined,
      },
    })),
    dateCreated: trial.dates.firstPosted ?? undefined,
    dateModified: trial.dates.lastUpdated ?? undefined,
  };
}

export function ClinicalTrialDetail({ trial }: { trial: ClinicalTrial }) {
  const mainPeptide = trial.peptideNames[0] ?? "Peptide";
  const relatedTrials = clinicalTrials
    .filter(
      (candidate) =>
        candidate.nctId !== trial.nctId &&
        candidate.peptideSlugs.some((slug) => trial.peptideSlugs.includes(slug)),
    )
    .slice(0, 8);
  const linkedPeptides = trial.peptideSlugs.map((slug, index) => ({
    slug,
    name: trial.peptideNames[index] ?? slug,
    query: clinicalTrialQueryBySlug.get(slug),
    database: peptides.find((peptide) => peptide.slug === slug),
    comparison: compoundBySlug.get(slug),
  }));
  const relevantVendorIds = new Set(
    marketListings
      .filter((listing) => trial.peptideSlugs.includes(listing.compoundSlug))
      .map((listing) => listing.vendorId),
  );
  const relevantVendors = [...relevantVendorIds]
    .map((vendorId) => vendorById.get(vendorId))
    .filter((vendor) => vendor !== undefined)
    .slice(0, 6);
  const timeline = [
    ["First posted", trial.dates.firstPosted],
    ["Study start", trial.dates.start],
    ["Primary completion", trial.dates.primaryCompletion],
    ["Study completion", trial.dates.completion],
    ["Results posted", trial.dates.resultsPosted],
    ["Registry updated", trial.dates.lastUpdated],
  ] as const;
  const pubmedQuery = encodeURIComponent(`${trial.nctId} OR ${mainPeptide}`);
  const regulatorQuery = encodeURIComponent(mainPeptide);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Clinical trials", path: "/clinical-trials" },
    { name: trial.nctId, path: `/clinical-trials/${trial.nctId}` },
  ];

  return (
    <>
      <JsonLd data={clinicalTrialJsonLd(trial)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-7 sm:px-6 sm:pb-16 lg:px-8">
          <Breadcrumbs inverse crumbs={crumbs} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.28fr_.72fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-white/38">
                <Link href={`/clinical-trials/${trial.nctId}`} className="text-lime">
                  {trial.nctId}
                </Link>
                <span>·</span>
                <Link
                  href={`/clinical-trials/phase/${trial.phases.slugs[0] ?? "not-applicable"}`}
                  className="hover:text-white"
                >
                  {trial.phases.label}
                </Link>
                <span>·</span>
                <span>{trial.studyType.replaceAll("_", " ")}</span>
              </div>
              <h1 className="mt-5 max-w-5xl text-[clamp(2.35rem,4.4vw,4.35rem)] font-semibold leading-[0.97] tracking-[-0.055em]">
                {trial.title}
              </h1>
              <div className="mt-7 flex flex-wrap gap-2">
                {linkedPeptides.map((peptide) => (
                  <Link
                    key={peptide.slug}
                    href={`/clinical-trials/${peptide.slug}`}
                    className="border border-lime/35 bg-lime/10 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-lime hover:bg-lime hover:text-ink"
                  >
                    {peptide.name}
                  </Link>
                ))}
                {trial.conditionGroups.map((condition) => (
                  <Link
                    key={condition.slug}
                    href={`/clinical-trials/condition/${condition.slug}`}
                    className="border border-white/20 bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white/55 hover:border-white hover:text-white"
                  >
                    {condition.label}
                  </Link>
                ))}
                <Link
                  href={`/clinical-trials/status/${trial.status.group}`}
                  className={`border px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] ${statusClasses(trial.status.group)}`}
                >
                  {trial.status.label}
                </Link>
              </div>
            </div>

            <aside className="border-l border-white/15 pl-6 sm:pl-8">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/30">
                Registry record
              </p>
              <dl className="mt-3">
                <Fact label="Lead sponsor">
                  {trial.sponsor.class === "INDUSTRY" ? (
                    <Link
                      href={`/clinical-trials/company/${trial.sponsor.slug}`}
                      className="font-bold text-white hover:text-lime"
                    >
                      {trial.sponsor.name}
                    </Link>
                  ) : (
                    trial.sponsor.name
                  )}
                </Fact>
                <Fact label="Enrollment">
                  {trial.enrollment?.toLocaleString("en") ?? "Not reported"}
                </Fact>
                <Fact label="Study dates">
                  {formatClinicalDate(trial.dates.start)} —{" "}
                  {formatClinicalDate(trial.dates.completion)}
                </Fact>
                <Fact label="Locations">
                  {trial.locationCount.toLocaleString("en")} sites ·{" "}
                  {trial.countries.length.toLocaleString("en")} countries
                </Fact>
                <Fact label="Last updated">
                  {formatClinicalDate(trial.dates.lastUpdated)}
                </Fact>
              </dl>
              <a
                href={trial.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center bg-lime px-4 text-xs font-black text-ink hover:bg-white"
              >
                Open ClinicalTrials.gov ↗
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 lg:grid-cols-6">
          {[
            ["Status", trial.status.label],
            ["Phase", trial.phases.label],
            ["Enrollment", trial.enrollment?.toLocaleString("en") ?? "—"],
            ["Locations", trial.locationCount.toLocaleString("en")],
            ["Results", trial.hasResults ? "Posted" : "Not posted"],
            ["Publications", trial.publications.length.toLocaleString("en")],
          ].map(([label, value]) => (
            <div key={label} className="min-h-24 bg-[#111713] p-4 sm:p-5">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-white/27">
                {label}
              </p>
              <p className="mt-2 font-mono text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Study summary
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              What the protocol is testing.
            </h2>
            <p className="mt-6 whitespace-pre-wrap text-sm leading-8 text-white/60">
              {trial.summary ?? "A plain-language summary was not reported in the indexed registry record."}
            </p>
            {trial.detailedDescription ? (
              <details className="mt-7 border border-white/10 bg-white/[0.025] p-5 open:bg-white/[0.04]">
                <summary className="cursor-pointer font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-lime">
                  Full detailed description
                </summary>
                <p className="mt-5 whitespace-pre-wrap text-xs leading-7 text-white/48">
                  {trial.detailedDescription}
                </p>
              </details>
            ) : null}
          </div>

          <aside>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Study record
            </p>
            <dl className="mt-4 border-y border-white/10">
              <Fact label="Condition">
                {trial.conditions.join(" · ") || "Not reported"}
              </Fact>
              <Fact label="Sponsor">
                {trial.sponsor.name} ({trial.sponsor.class})
              </Fact>
              <Fact label="Collaborators">
                {trial.collaborators.length
                  ? trial.collaborators.map((item) => item.name).join(" · ")
                  : "None reported"}
              </Fact>
              <Fact label="Study type">{trial.studyType.replaceAll("_", " ")}</Fact>
              <Fact label="Age">
                {trial.eligibility.minimumAge ?? "No minimum"} —{" "}
                {trial.eligibility.maximumAge ?? "No maximum"}
              </Fact>
              <Fact label="Sex">{trial.eligibility.sex}</Fact>
              <Fact label="Healthy volunteers">
                {trial.eligibility.healthyVolunteers === null
                  ? "Not reported"
                  : trial.eligibility.healthyVolunteers
                    ? "Accepted"
                    : "Not accepted"}
              </Fact>
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Interventions
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                Treatment arms and agents.
              </h2>
              <div className="mt-6 border border-white/10">
                {trial.interventions.length ? (
                  trial.interventions.map((intervention, index) => (
                    <article
                      key={`${intervention.name}-${index}`}
                      className="border-b border-white/10 p-5 last:border-0"
                    >
                      <p className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-lime/70">
                        {intervention.type}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-white">
                        {intervention.name}
                      </h3>
                      {intervention.description ? (
                        <p className="mt-3 text-xs leading-6 text-white/45">
                          {intervention.description}
                        </p>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <p className="p-5 text-xs text-white/35">No intervention details reported.</p>
                )}
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Timeline
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                From registration to results.
              </h2>
              <ol className="mt-7 border-l border-white/15 pl-6">
                {timeline.map(([label, date]) => (
                  <li key={label} className="relative pb-7 last:pb-0">
                    <span
                      className={`absolute -left-[27px] top-1 h-1.5 w-1.5 rounded-full ${date ? "bg-lime" : "bg-white/20"}`}
                    />
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/30">
                      {label}
                    </p>
                    <p className="mt-1 font-mono text-sm text-white/70">
                      {formatClinicalDate(date)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
            Outcomes
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
            What the study measures.
          </h2>
          <div className="mt-9 grid gap-10 lg:grid-cols-2">
            <OutcomeList title="Primary outcomes" outcomes={trial.primaryOutcomes} />
            <OutcomeList title="Secondary outcomes" outcomes={trial.secondaryOutcomes} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Eligibility
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Who can take part.
            </h2>
            <dl className="mt-6 border-y border-white/10">
              <Fact label="Minimum age">{trial.eligibility.minimumAge ?? "Not reported"}</Fact>
              <Fact label="Maximum age">{trial.eligibility.maximumAge ?? "Not reported"}</Fact>
              <Fact label="Sex">{trial.eligibility.sex}</Fact>
              <Fact label="Healthy volunteers">
                {trial.eligibility.healthyVolunteers === null
                  ? "Not reported"
                  : trial.eligibility.healthyVolunteers
                    ? "Yes"
                    : "No"}
              </Fact>
            </dl>
          </div>
          <div className="max-h-[760px] overflow-y-auto border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <p className="whitespace-pre-wrap text-xs leading-7 text-white/50">
              {trial.eligibility.criteria ?? "Detailed eligibility criteria were not reported in the indexed record."}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
                Study locations
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {trial.locationCount.toLocaleString("en")} registered sites.
              </h2>
            </div>
            <p className="max-w-lg text-xs leading-6 text-white/35">
              {trial.countries.join(" · ") || "No country data reported"}. Showing up to 24
              locations stored in the fast local snapshot.
            </p>
          </div>
          {trial.locations.length ? (
            <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {trial.locations.map((location, index) => (
                <article key={`${location.facility}-${index}`} className="bg-[#111713] p-5">
                  <p className="text-xs font-semibold leading-5 text-white/75">
                    {location.facility ?? "Facility not named"}
                  </p>
                  <p className="mt-2 font-mono text-[9px] leading-5 text-white/32">
                    {[location.city, location.state, location.country]
                      .filter(Boolean)
                      .join(", ") || "Location not reported"}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-7 text-xs text-white/35">No study locations reported.</p>
          )}
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d120f] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Publications
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
              Results and literature.
            </h2>
            {trial.publications.length ? (
              <div className="mt-6 border border-white/10">
                {trial.publications.map((publication) => (
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
                    <span className="mt-2 block text-xs leading-6 text-white/50">
                      {publication.citation ?? "Citation details unavailable"}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-xs leading-6 text-white/35">
                No PMID-linked publications were present in this registry snapshot.
              </p>
            )}
          </div>

          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Primary links
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
              Continue at the source.
            </h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                ["ClinicalTrials.gov", trial.sourceUrl],
                ["Search PubMed", `https://pubmed.ncbi.nlm.nih.gov/?term=${pubmedQuery}`],
                ["Search FDA", `https://www.fda.gov/search?s=${regulatorQuery}`],
                ["Search EMA", `https://www.ema.europa.eu/en/search?search_api_fulltext=${regulatorQuery}`],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-between border border-white/12 px-4 text-xs font-bold text-white/60 hover:border-lime hover:text-lime"
                >
                  {label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b100d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
            Related trials
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
            More studies on {mainPeptide}.
          </h2>
          <div className="mt-8">
            <ClinicalTrialList trials={relatedTrials} />
          </div>
        </div>
      </section>

      <section className="bg-[#0d120f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-lime">
              Related PeptideStat pages
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Put the record in context.
            </h2>
            <p className="mt-5 text-xs leading-6 text-white/35">
              Research pages describe evidence. Vendor pages, where available,
              describe independently tracked research-product listings and are
              not clinical recommendations.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {linkedPeptides.flatMap((peptide) => {
              const links: Array<[string, string, string]> = [
                [
                  `${peptide.name} trial dashboard`,
                  `/clinical-trials/${peptide.slug}`,
                  "Trials",
                ],
              ];
              if (peptide.database) {
                links.push([
                  `${peptide.name} database entry`,
                  `/database/${peptide.database.slug}`,
                  "Database",
                ]);
                if (peptide.database.articleSlug) {
                  links.push([
                    `${peptide.name} research guide`,
                    `/peptides/${peptide.database.articleSlug}`,
                    "Research",
                  ]);
                }
              }
              if (peptide.comparison) {
                links.push([
                  `${peptide.name} comparison`,
                  `/compare/${peptide.comparison.slug}`,
                  "Market",
                ]);
              }
              return links;
            }).map(([label, href, type]) => (
              <Link
                key={`${href}-${label}`}
                href={href}
                className="border border-white/12 p-4 hover:border-lime hover:bg-lime/[0.04]"
              >
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-lime/70">
                  {type}
                </span>
                <span className="mt-2 block text-sm font-semibold text-white/75">
                  {label} →
                </span>
              </Link>
            ))}
            {relevantVendors.map((vendor) => (
              <Link
                key={vendor.id}
                href={`/vendors/${vendor.id}`}
                className="border border-white/12 p-4 hover:border-lime hover:bg-lime/[0.04]"
              >
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/35">
                  Research vendor record
                </span>
                <span className="mt-2 block text-sm font-semibold text-white/75">
                  {vendor.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
