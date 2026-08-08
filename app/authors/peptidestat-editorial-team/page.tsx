import type { Metadata } from "next";
import Link from "next/link";
import { ArticleList } from "@/components/ArticleList";
import { JsonLd } from "@/components/JsonLd";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const title = "PeptideStat Editorial Team";
const description =
  "How the PeptideStat Editorial Team researches peptide guides: source hierarchy, review process, affiliate independence and what we will not claim.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/authors/peptidestat-editorial-team",
});

function authorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "PeptideStat Editorial Team author profile",
    url: absoluteUrl("/authors/peptidestat-editorial-team"),
    dateModified: "2026-08-08",
    mainEntity: {
      "@type": "Organization",
      "@id": absoluteUrl("/authors/peptidestat-editorial-team#editorial-team"),
      name: "PeptideStat Editorial Team",
      url: absoluteUrl("/authors/peptidestat-editorial-team"),
      parentOrganization: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      description,
      email: siteConfig.contactEmail,
    },
  };
}

const SOURCE_TIERS = [
  {
    tier: "Primary",
    items:
      "Peer-reviewed trials, FDA labels / USPIs, ClinicalTrials.gov records, regulatory briefing materials.",
  },
  {
    tier: "Secondary",
    items:
      "Systematic reviews, high-quality narrative reviews, manufacturer trial summaries when methods are transparent.",
  },
  {
    tier: "Market data",
    items:
      "Dated vendor catalog prices, public COAs and policies we can open ourselves — not review-site scores as proof.",
  },
  {
    tier: "Not treated as evidence",
    items:
      "Anonymous forum dosing, TikTok protocols, vendor marketing copy, unsourced “stack” charts.",
  },
] as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Define the question",
    body: "Each guide starts from a real search intent (what it is, evidence, dosage in trials, comparison, safety) — not a keyword dump.",
  },
  {
    step: "02",
    title: "Label status first",
    body: "Approved drug, investigational, research-only or compounding context. We separate human data from animal-only claims early.",
  },
  {
    step: "03",
    title: "Map the evidence",
    body: "Trial design, N, dose, outcomes and limitations when available. Missing human data is stated as missing.",
  },
  {
    step: "04",
    title: "Review and date",
    body: "Guides carry published and last-reviewed dates. Material regulatory or trial updates trigger a rewrite, not a silent tweak.",
  },
] as const;

export default function PeptideStatEditorialTeamPage() {
  const articles = getAllArticles()
    .filter(
      (article) =>
        article.author === "PeptideStat Editorial Team" || !article.author,
    )
    .slice(0, 12);

  return (
    <>
      <JsonLd data={authorJsonLd()} />

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Publisher · Editorial standards
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            PeptideStat Editorial Team
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            PeptideStat guides are researched and maintained by the PeptideStat
            Editorial Team — a collective byline for work produced under one
            sourcing standard. We do not invent individual medical credentials
            for marketing purposes.
          </p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            Our job is readable peptide literacy: mechanisms, human evidence
            (or its absence), regulatory status, safety uncertainty, vendor
            documentation quality and practical comparisons — without turning
            research compounds into DIY prescriptions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/editorial-policy"
              className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              Full editorial policy
            </Link>
            <Link
              href="/disclaimer"
              className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              Medical disclaimer
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright"
            >
              Contact editorial team
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            How a guide is built
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Process over personality. Every money page should show the same
            discipline whether the topic is an approved GLP-1 or a research-only
            recovery peptide.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {PROCESS_STEPS.map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-line bg-canvas p-5"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                  {item.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Source hierarchy
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            When sources conflict, higher tiers win. Marketing never outranks a
            label or a trial.
          </p>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {SOURCE_TIERS.map((row) => (
              <div
                key={row.tier}
                className="grid gap-2 py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6"
              >
                <p className="text-sm font-bold text-ink">{row.tier}</p>
                <p className="text-sm leading-6 text-muted">{row.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              What we will not claim
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>Personalized medical dosing for unapproved compounds.</li>
              <li>
                That animal data proves human efficacy for marketing claims.
              </li>
              <li>
                That research-chemical or compounded products equal branded
                trial medicines.
              </li>
              <li>Fake named physicians or fabricated patient case studies.</li>
              <li>
                That affiliate partners set evidence grades or safety language.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Affiliate independence
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              Some pages include affiliate links. Commissions may apply if you
              buy through them. Partner placement never changes regulatory
              status labels, evidence summaries or safety caveats. Details live
              in our{" "}
              <Link
                href="/disclaimer"
                className="font-semibold text-accent-bright underline underline-offset-4"
              >
                disclaimer
              </Link>{" "}
              and{" "}
              <Link
                href="/editorial-policy"
                className="font-semibold text-accent-bright underline underline-offset-4"
              >
                editorial policy
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Vendor market pages use dated price and documentation snapshots.
              See the{" "}
              <Link
                href="/reports/peptide-vendor-transparency-2026"
                className="font-semibold text-accent-bright underline underline-offset-4"
              >
                2026 vendor transparency report
              </Link>{" "}
              for methodology readers can inspect.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Corrections
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            If you find a factual error, outdated label claim or broken primary
            source, email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-semibold text-accent-bright underline underline-offset-4"
            >
              {siteConfig.contactEmail}
            </a>
            . Material corrections update the page and the last-reviewed date.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Nothing on PeptideStat is medical advice. Many peptides discussed
            are investigational or research-only. Decisions about health care
            belong with a qualified clinician.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Recent guides
        </h2>
        <div className="mt-6">
          <ArticleList articles={articles} />
        </div>
      </section>
    </>
  );
}
