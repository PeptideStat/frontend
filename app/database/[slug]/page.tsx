import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  peptides,
  type Peptide,
  type PeptideStatus,
} from "@/data/peptides";
import {
  getPeptideCategoryHub,
  getPeptideCategoryHubByCategory,
  peptideCategoryHubs,
} from "@/data/peptideCategoryHubs";
import {
  EVIDENCE_SCORE_EXPLAINER,
  getPeptideEvidence,
  type EvidenceScore,
  type PeptideEvidence,
} from "@/data/peptideEvidence";
import { PeptideCategoryHub } from "@/components/PeptideCategoryHub";
import { CalculatorPresetLinks } from "@/components/CalculatorPresetLinks";
import {
  RelatedCategoryHubs,
  RelatedDatabaseEntries,
  RelatedGuides,
} from "@/components/InternalLinkBlocks";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getGuidesForPeptide } from "@/lib/internalLinks";
import { externalLinkRel } from "@/lib/externalLinks";
import { shopUrl } from "@/site.config";

export const dynamicParams = false;

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

function getPeptide(slug: string): Peptide | undefined {
  return peptides.find((peptide) => peptide.slug === slug);
}

function getRelated(peptide: Peptide): Peptide[] {
  return peptides
    .filter(
      (candidate) =>
        candidate.slug !== peptide.slug && candidate.category === peptide.category,
    )
    .slice(0, 4);
}

export function generateStaticParams() {
  return [
    ...peptides.map((peptide) => ({ slug: peptide.slug })),
    ...peptideCategoryHubs.map((hub) => ({ slug: hub.slug })),
  ];
}

export async function generateMetadata(
  props: PageProps<"/database/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const peptide = getPeptide(slug);
  const routeCategoryHub = getPeptideCategoryHub(slug);

  if (!peptide) {
    if (routeCategoryHub) {
      return buildMetadata({
        title: routeCategoryHub.metaTitle,
        description: routeCategoryHub.description,
        path: `/database/${routeCategoryHub.slug}`,
      });
    }

    return { title: "Peptide not found" };
  }

  return buildMetadata({
    title: `${peptide.name}: Mechanism, Status, Dose Reference & Half-Life`,
    description: `${peptide.name} database entry covering aliases, category, class, targets, mechanism, status, dose reference, half-life and related guides.`,
    path: `/database/${peptide.slug}`,
    image: peptide.productImageUrl,
  });
}

function peptideJsonLd(peptide: Peptide) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${peptide.name} peptide database entry`,
    description: peptide.mechanism,
    url: absoluteUrl(`/database/${peptide.slug}`),
    mainEntity: {
      "@type": "Thing",
      name: peptide.name,
      alternateName: peptide.aliases
        ? peptide.aliases.split(",").map((alias) => alias.trim())
        : undefined,
      description: peptide.mechanism,
    },
  };
}

function evidenceJsonLd(peptide: Peptide, evidence: PeptideEvidence | null) {
  if (!evidence) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${peptide.name} evidence references`,
    itemListElement: evidence.references.map((reference, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: reference.url,
      name: reference.title,
    })),
  };
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-2 p-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-ink-soft">{value}</dd>
    </div>
  );
}

export default async function PeptideDetailPage(
  props: PageProps<"/database/[slug]">,
) {
  const { slug } = await props.params;
  const peptide = getPeptide(slug);
  const routeCategoryHub = getPeptideCategoryHub(slug);

  if (!peptide) {
    if (routeCategoryHub) {
      return <PeptideCategoryHub hub={routeCategoryHub} />;
    }

    notFound();
  }

  const related = getRelated(peptide);
  const evidence = getPeptideEvidence(peptide.slug);
  const relatedGuides = getGuidesForPeptide(peptide, 4);
  const peptideCategoryHub = getPeptideCategoryHubByCategory(peptide.category);
  const guideHref = peptide.articleSlug ? `/peptides/${peptide.articleSlug}` : "/peptides";
  const buyHref = peptide.productUrl ?? shopUrl;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Database", path: "/database" },
    { name: peptide.name, path: `/database/${peptide.slug}` },
  ];

  return (
    <>
      <JsonLd data={peptideJsonLd(peptide)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {evidence && <JsonLd data={evidenceJsonLd(peptide, evidence)!} />}

      <article>
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
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

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[peptide.status]}`}
                >
                  {STATUS_LABELS[peptide.status]}
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft">
                  {CATEGORY_LABELS[peptide.category]}
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft">
                  {peptide.routeOfAdministration}
                </span>
                {evidence && (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${EVIDENCE_BADGE[evidence.score]}`}
                  >
                    Evidence {evidence.score}/5
                  </span>
                )}
              </div>

              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {peptide.name}
              </h1>
              {peptide.aliases && (
                <p className="mt-3 text-sm text-muted">
                  Also known as: {peptide.aliases}
                </p>
              )}
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {peptide.mechanism}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={guideHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
                >
                  {peptide.articleSlug ? "Read guide" : "Browse guides"}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <a
                  href={buyHref}
                  target="_blank"
                  rel={externalLinkRel(buyHref, { sponsored: true })}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright"
                >
                  Buy / compare source
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
              {peptide.productImageUrl ? (
                <div className="overflow-hidden rounded-lg border border-line bg-white">
                  <Image
                    src={peptide.productImageUrl}
                    alt={`${peptide.name} product image`}
                    width={600}
                    height={600}
                    unoptimized
                    priority
                    className="aspect-square w-full object-contain p-5"
                  />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-lg border border-line bg-surface text-center">
                  <span className="px-6 text-2xl font-semibold text-muted">
                    {peptide.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <DetailRow label="Drug class" value={peptide.drugClass} />
            <DetailRow label="Primary targets" value={peptide.targets.join(", ")} />
            <DetailRow label="Dose reference" value={peptide.typicalDose} />
            <DetailRow label="Half-life" value={peptide.halfLife} />
            <DetailRow label="Developer / origin" value={peptide.developer} />
            <DetailRow label="Reference year" value={peptide.year} />
            {evidence && (
              <DetailRow
                label="Evidence score"
                value={`${evidence.score}/5 - ${evidence.label}`}
              />
            )}
          </div>

          {peptide.approvedFor && peptide.approvedFor.length > 0 && (
            <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5">
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                Approved uses
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
                {peptide.approvedFor.map((indication) => (
                  <li key={indication}>{indication}</li>
                ))}
              </ul>
            </div>
          )}

          {evidence && (
            <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-semibold ${EVIDENCE_BADGE[evidence.score]}`}
                >
                  Evidence {evidence.score}/5
                </span>
                <h2 className="text-xl font-semibold tracking-tight text-ink">
                  {evidence.label}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                {evidence.summary}
              </p>
              <p className="mt-3 text-xs leading-5 text-muted">
                {EVIDENCE_SCORE_EXPLAINER[evidence.score]}
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Evidence basis
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
                    {evidence.basis.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Key references
                  </h3>
                  <ol className="mt-3 space-y-3 text-sm leading-6 text-ink-soft">
                    {evidence.references.map((reference) => (
                      <li key={reference.url}>
                        <span className="mr-2 rounded bg-surface px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {reference.source}
                        </span>
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-accent-bright underline underline-offset-4"
                        >
                          {reference.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              How to read this entry
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Dose references and half-life values are pulled from trial
              protocols, labels, reviews, or published summaries where
              available. They are context for research and comparison, not a
              personal dosing recommendation.
            </p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Status matters: approved drugs have regulated indications;
              investigational compounds are still being studied; research-only
              peptides do not have established human dosing, safety, or
              efficacy for consumer use.
            </p>
          </div>

          <RelatedGuides
            articles={relatedGuides}
            title={`${peptide.name} guides`}
            description="Read the matching guide or adjacent research pages for more context."
          />

          <CalculatorPresetLinks
            peptides={[peptide]}
            title={`${peptide.name} calculator shortcuts`}
            description={`Open peptide calculators with editable ${peptide.name} example values already filled in.`}
            limit={3}
          />

          <RelatedCalculators
            title="Peptide calculators"
            description="Use calculators for concentration, unit conversion and repeated-dose accumulation math."
          />

          <RelatedDatabaseEntries
            peptides={related}
            title="Compare with related peptides"
            description="Stay inside the same research category and compare mechanism, status and evidence quality."
          />

          {peptideCategoryHub && (
            <RelatedCategoryHubs
              hubs={[peptideCategoryHub]}
              title="Category hub"
              description="Open the category page for the full comparison table and FAQ."
            />
          )}
        </section>
      </article>

      <DisclaimerBanner />
    </>
  );
}
