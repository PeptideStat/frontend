import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const title = "Editorial Policy";
const description = `How ${siteConfig.name} researches, writes, cites, reviews and updates peptide guides.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/editorial-policy",
});

function editorialPolicyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${siteConfig.name} Editorial Policy`,
    description,
    url: absoluteUrl("/editorial-policy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd data={editorialPolicyJsonLd()} />

      <article className="mx-auto max-w-2xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Trust & standards
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Editorial Policy
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          PeptideStat publishes educational peptide research guides. Our job is
          to separate evidence, regulatory status and safety uncertainty from
          marketing claims.
        </p>

        <div className="mt-8 space-y-8 leading-7 text-ink-soft">
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              What we prioritize
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Peer-reviewed human clinical studies when available.</li>
              <li>FDA labels, prescribing information and regulatory filings.</li>
              <li>Clinical trial protocols and manufacturer trial summaries.</li>
              <li>Preclinical evidence only when human evidence is limited.</li>
              <li>Clear status labels for approved, investigational and research-only compounds.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              How we handle weak evidence
            </h2>
            <p className="mt-3">
              Many peptides are marketed far ahead of the data. When evidence is
              animal-only, mechanistic or cosmetic, we say that directly. We do
              not present preclinical findings as proof of human benefit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Affiliate links
            </h2>
            <p className="mt-3">
              Some pages contain affiliate links. Affiliate relationships do not
              determine our evidence ratings, regulatory status labels or safety
              language. See the full{" "}
              <Link
                href="/disclaimer"
                className="font-semibold text-accent-bright underline underline-offset-4"
              >
                affiliate disclosure
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Updates and corrections
            </h2>
            <p className="mt-3">
              We update pages when major trials, approvals, safety actions or
              product changes materially affect the content. To report an issue,
              email{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-semibold text-accent-bright underline underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Who writes PeptideStat
            </h2>
            <p className="mt-3">
              Guides are published by the{" "}
              <Link
                href="/authors/peptidestat-editorial-team"
                className="font-semibold text-accent-bright underline underline-offset-4"
              >
                PeptideStat Editorial Team
              </Link>
              , with source-first review for medical and research claims.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
