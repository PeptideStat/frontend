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
  faqPageJsonLd,
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

const CHEMISTRY_FAQS = [
  {
    question: "How is peptide molecular weight calculated?",
    answer:
      "The calculator sums amino acid residue masses and adds one water molecule for a linear peptide with free N- and C-termini. Modified residues, salts and terminal caps are not included.",
  },
  {
    question: "What is the difference between average and monoisotopic mass?",
    answer:
      "Average mass uses natural isotope abundance averages. Monoisotopic mass uses the most abundant isotope of each element and is often used in mass spectrometry contexts.",
  },
  {
    question: "What does GRAVY mean?",
    answer:
      "GRAVY is the grand average of hydropathy. Positive values indicate a more hydrophobic sequence on the Kyte-Doolittle scale, while negative values indicate a more hydrophilic sequence.",
  },
  {
    question: "Can this calculator handle modified peptides?",
    answer:
      "No. It is limited to the standard 20 amino acids in a simple linear sequence. It does not include amidation, acetylation, PEGylation, labels, salts, disulfide mapping or non-standard residues.",
  },
];

const AMINO_ACID_CODES = [
  ["A", "Ala", "Alanine"],
  ["R", "Arg", "Arginine"],
  ["N", "Asn", "Asparagine"],
  ["D", "Asp", "Aspartic acid"],
  ["C", "Cys", "Cysteine"],
  ["E", "Glu", "Glutamic acid"],
  ["Q", "Gln", "Glutamine"],
  ["G", "Gly", "Glycine"],
  ["H", "His", "Histidine"],
  ["I", "Ile", "Isoleucine"],
  ["L", "Leu", "Leucine"],
  ["K", "Lys", "Lysine"],
  ["M", "Met", "Methionine"],
  ["F", "Phe", "Phenylalanine"],
  ["P", "Pro", "Proline"],
  ["S", "Ser", "Serine"],
  ["T", "Thr", "Threonine"],
  ["W", "Trp", "Tryptophan"],
  ["Y", "Tyr", "Tyrosine"],
  ["V", "Val", "Valine"],
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
      <JsonLd data={faqPageJsonLd(CHEMISTRY_FAQS)} />

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

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Amino acid code table
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The calculator accepts one-letter sequences like{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-accent-bright">
                ACDE
              </code>{" "}
              and three-letter tokens like{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-accent-bright">
                Ala-Cys-Asp-Glu
              </code>
              .
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-surface text-left">
                  <tr>
                    <th className="border border-line px-3 py-2 font-semibold text-ink">
                      1-letter
                    </th>
                    <th className="border border-line px-3 py-2 font-semibold text-ink">
                      3-letter
                    </th>
                    <th className="border border-line px-3 py-2 font-semibold text-ink">
                      Amino acid
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AMINO_ACID_CODES.map(([one, three, name]) => (
                    <tr key={one}>
                      <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                        {one}
                      </td>
                      <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                        {three}
                      </td>
                      <td className="border border-line px-3 py-2 text-ink-soft">
                        {name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              How mass is calculated
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted">
              <p>
                A peptide sequence is treated as a chain of amino acid
                residues. The tool sums residue masses, then adds one water
                molecule to represent the free termini of a simple linear
                peptide.
              </p>
              <p>
                That is a useful educational estimate, but it is not a
                substitute for analytical testing. Terminal caps, salts,
                disulfides, labels and non-standard amino acids change the
                actual mass.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Peptide chemistry calculator FAQ
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {CHEMISTRY_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-sm font-semibold text-ink-soft">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
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
