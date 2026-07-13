import Link from "next/link";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  peptides,
  type Peptide,
  type PeptideStatus,
} from "@/data/peptides";
import {
  EVIDENCE_SCORE_EXPLAINER,
  getPeptideEvidence,
  type EvidenceScore,
} from "@/data/peptideEvidence";
import {
  peptideCategoryHubs,
  type PeptideCategoryHub as PeptideCategoryHubData,
} from "@/data/peptideCategoryHubs";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { RelatedGuides } from "@/components/InternalLinkBlocks";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { getGuidesForCategoryHub } from "@/lib/internalLinks";
import { externalLinkRel } from "@/lib/externalLinks";
import { shopUrl } from "@/site.config";
import { PeptideProfileVisual } from "@/components/PeptideProfileVisual";
import {
  getAscensionAvailability,
  getAscensionBuyUrl,
  hasAscensionProduct,
} from "@/data/ascensionLinks";

const STATUS_BADGE: Record<PeptideStatus, string> = {
  approved: "border-tint-emerald-ink/40 bg-tint-emerald text-tint-emerald-ink",
  investigational: "border-tint-amber-ink/40 bg-tint-amber text-tint-amber-ink",
  "research-only": "border-tint-slate-ink/40 bg-tint-slate text-tint-slate-ink",
};

const EVIDENCE_BADGE: Record<EvidenceScore, string> = {
  5: "border-tint-emerald-ink/50 bg-tint-emerald text-tint-emerald-ink",
  4: "border-tint-sky-ink/50 bg-tint-sky text-tint-sky-ink",
  3: "border-tint-amber-ink/50 bg-tint-amber text-tint-amber-ink",
  2: "border-tint-violet-ink/50 bg-tint-violet text-tint-violet-ink",
  1: "border-tint-slate-ink/50 bg-tint-slate text-tint-slate-ink",
};

function getCategoryPeptides(hub: PeptideCategoryHubData): Peptide[] {
  return peptides.filter((peptide) => peptide.category === hub.category);
}

function categoryWebPageJsonLd(
  hub: PeptideCategoryHubData,
  categoryPeptides: Peptide[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.description,
    url: absoluteUrl(`/database/${hub.slug}`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryPeptides.map((peptide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/database/${peptide.slug}`),
        name: peptide.name,
      })),
    },
  };
}

function faqJsonLd(hub: PeptideCategoryHubData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-2 p-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        {value}
      </dd>
    </div>
  );
}

function EvidencePill({ score }: { score: EvidenceScore }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${EVIDENCE_BADGE[score]}`}
    >
      {score}/5
    </span>
  );
}

export function PeptideCategoryHub({
  hub,
}: {
  hub: PeptideCategoryHubData;
}) {
  const categoryPeptides = getCategoryPeptides(hub);
  const evidenceScores = categoryPeptides
    .map((peptide) => getPeptideEvidence(peptide.slug)?.score)
    .filter((score): score is EvidenceScore => typeof score === "number");
  const highestEvidenceLabel = evidenceScores.length
    ? `${Math.max(...evidenceScores)}/5`
    : "N/A";
  const approvedCount = categoryPeptides.filter(
    (peptide) => peptide.status === "approved",
  ).length;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Database", path: "/database" },
    { name: hub.title, path: `/database/${hub.slug}` },
  ];
  const relatedHubs = peptideCategoryHubs.filter(
    (candidate) => candidate.slug !== hub.slug,
  );
  const relatedGuides = getGuidesForCategoryHub(hub, 6);

  return (
    <>
      <JsonLd data={categoryWebPageJsonLd(hub, categoryPeptides)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(hub)} />

      <article>
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-sm text-muted"
            >
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <span key={crumb.path} className="flex items-center gap-1.5">
                    {isLast ? (
                      <span className="line-clamp-1 text-ink-soft">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="transition-colors hover:text-accent-bright"
                      >
                        {crumb.name}
                      </Link>
                    )}
                    {!isLast && <span aria-hidden>/</span>}
                  </span>
                );
              })}
            </nav>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-accent">
              {hub.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {hub.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
              {hub.intro}
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <Stat label="Peptides covered" value={String(categoryPeptides.length)} />
              <Stat label="Highest evidence" value={highestEvidenceLabel} />
              <Stat label="Approved entries" value={String(approvedCount)} />
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                How to compare this category
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                {hub.compareIntro}
              </p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
                {hub.decisionPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-surface-2 p-5">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                Evidence scale
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Scores rate evidence quality for the listed research context.
                They are not recommendations, prescriptions or a safety ranking.
              </p>
              <dl className="mt-5 grid gap-2 text-xs sm:grid-cols-2">
                {(Object.entries(EVIDENCE_SCORE_EXPLAINER) as [
                  string,
                  string,
                ][]).map(([score, meaning]) => (
                  <div
                    key={score}
                    className="rounded-lg border border-line bg-surface p-3"
                  >
                    <dt className="font-semibold text-ink">Evidence {score}/5</dt>
                    <dd className="mt-1 leading-5 text-muted">{meaning}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-surface-2">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <caption className="sr-only">
                {hub.title} comparison table
              </caption>
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Peptide
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Evidence
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Best for
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Half-life
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {categoryPeptides.map((peptide) => {
                  const evidence = getPeptideEvidence(peptide.slug);
                  const note = hub.peptideNotes[peptide.slug];
                  const guideHref = peptide.articleSlug
                    ? `/peptides/${peptide.articleSlug}`
                    : "/peptides";

                  return (
                    <tr key={peptide.slug}>
                      <th scope="row" className="px-4 py-4 align-top">
                        <Link
                          href={`/database/${peptide.slug}`}
                          className="font-semibold text-ink transition-colors hover:text-accent-bright"
                        >
                          {peptide.name}
                        </Link>
                        <p className="mt-1 max-w-[220px] text-xs leading-5 text-muted">
                          {peptide.drugClass}
                        </p>
                      </th>
                      <td className="px-4 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[peptide.status]}`}
                        >
                          {STATUS_LABELS[peptide.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top">
                        {evidence ? (
                          <div>
                            <EvidencePill score={evidence.score} />
                            <p className="mt-1 max-w-[180px] text-xs leading-5 text-muted">
                              {evidence.label}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted">Not scored</span>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top text-ink-soft">
                        <p className="max-w-[260px] leading-6">
                          {note?.bestFor ?? "General category comparison"}
                        </p>
                        <p className="mt-1 max-w-[260px] text-xs leading-5 text-muted">
                          {note?.researchStatus ?? "See detail page for context."}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top font-mono text-xs text-ink-soft">
                        {peptide.halfLife}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/database/${peptide.slug}`}
                            className="inline-flex h-9 items-center rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                          >
                            Details
                          </Link>
                          <Link
                            href={guideHref}
                            className="inline-flex h-9 items-center rounded-md border border-line bg-surface px-3 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                          >
                            Guide
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {CATEGORY_LABELS[hub.category]} peptide cards
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categoryPeptides.map((peptide) => {
                const evidence = getPeptideEvidence(peptide.slug);
                const note = hub.peptideNotes[peptide.slug];
                const guideHref = peptide.articleSlug
                  ? `/peptides/${peptide.articleSlug}`
                  : "/peptides";
                const buyHref = hasAscensionProduct(peptide.slug)
                  ? getAscensionBuyUrl(
                      peptide.slug,
                      `category_${hub.slug}_${peptide.slug}`,
                    )
                  : shopUrl;
                const productAvailability = getAscensionAvailability(peptide.slug);

                return (
                  <article
                    key={peptide.slug}
                    className="flex min-h-full flex-col rounded-lg border border-line bg-surface-2 p-4 shadow-card"
                  >
                    <div className="overflow-hidden rounded-md border border-line bg-white">
                      <PeptideProfileVisual peptide={peptide} />
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-ink">
                          <Link
                            href={`/database/${peptide.slug}`}
                            className="transition-colors hover:text-accent-bright"
                          >
                            {peptide.name}
                          </Link>
                        </h3>
                        {peptide.aliases && (
                          <p className="mt-1 text-xs leading-5 text-muted">
                            {peptide.aliases}
                          </p>
                        )}
                      </div>
                      {evidence && <EvidencePill score={evidence.score} />}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-ink-soft">
                      {note?.bestFor ?? peptide.mechanism}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {note?.researchStatus ?? peptide.drugClass}
                    </p>

                    <div className="mt-auto grid grid-cols-3 gap-2 pt-5">
                      <Link
                        href={`/database/${peptide.slug}`}
                        className="inline-flex h-10 items-center justify-center rounded-md border border-line bg-surface px-2 text-sm font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                      >
                        Details
                      </Link>
                      <Link
                        href={guideHref}
                        className="inline-flex h-10 items-center justify-center rounded-md border border-line bg-surface px-2 text-sm font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                      >
                        Guide
                      </Link>
                      <a
                        href={buyHref}
                        target="_blank"
                        rel={externalLinkRel(buyHref, { sponsored: true })}
                        data-affiliate-placement="category-card"
                        data-affiliate-product={peptide.slug}
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-accent px-2 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright"
                      >
                        {productAvailability === "out-of-stock" ? "Recheck" : "Buy"}
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <RelatedGuides
            articles={relatedGuides}
            title={`${CATEGORY_LABELS[hub.category]} guides`}
            description="Read the strongest related guides for this category before drilling into a single database entry."
          />

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              FAQ
            </h2>
            <div className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface-2">
              {hub.faqs.map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-semibold text-ink group-open:text-accent-bright">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              More peptide categories
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedHubs.map((related) => (
                <Link
                  key={related.slug}
                  href={`/database/${related.slug}`}
                  className="group rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-accent/40"
                >
                  <span className="font-semibold text-ink group-hover:text-accent-bright">
                    {related.title}
                  </span>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
                    {related.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-bright">
                    Compare
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </article>

      <DisclaimerBanner />
    </>
  );
}
