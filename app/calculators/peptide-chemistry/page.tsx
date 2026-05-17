import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import { PeptideChemistryCalculator } from "@/components/PeptideChemistryCalculator";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ArrowRightIcon } from "@/components/icons";
import {
  breadcrumbJsonLd,
  buildMetadata,
  webApplicationJsonLd,
} from "@/lib/seo";

const title =
  "Peptide Calculator: Molecular Weight, Sequence and Composition";
const description =
  "Analyze peptide sequences: molecular weight, amino acid composition, one-letter and three-letter conversion, net charge, GRAVY and extinction estimates.";
const path = "/calculators/peptide-chemistry";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/calculators" },
  { name: "Peptide chemistry", path },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
});

export default function PeptideChemistryCalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={webApplicationJsonLd({ name: title, description, path })} />

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Breadcrumbs crumbs={crumbs} className="mb-6" />
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Tools
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/peptides/what-are-peptides"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              What are peptides?
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/peptides/peptide-glossary"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Peptide glossary
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Live now
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
            Sequence analysis tool
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
            Paste a peptide sequence to estimate basic chemistry properties and
            convert between one-letter and three-letter amino acid notation.
          </p>
        </div>
        <PeptideChemistryCalculator />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              What it calculates
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Sequence length, amino acid composition, average and monoisotopic
              molecular weight, net charge estimate, GRAVY hydropathy and 280
              nm extinction coefficient.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Best for
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Quick peptide chemistry checks, glossary support, sequence
              notation conversion and educational research notes.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Common searches
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Peptide molecular weight calculator, peptide sequence calculator,
              amino acid composition calculator and peptide hydropathy tool.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Important limitations
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This calculator assumes the standard 20 amino acids in a linear
            peptide with free termini. It does not include terminal capping,
            amidation, acetylation, salts, counterions, glycosylation, isotope
            labels, non-standard residues or confirmed disulfide mapping.
          </p>
        </div>

        <RelatedCalculators
          currentPath={path}
          className="mt-10"
          title="Use with other peptide calculators"
          description="Pair sequence chemistry with concentration, unit conversion and accumulation tools when building research notes."
        />
      </section>

      <DisclaimerBanner />
    </>
  );
}
