import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorFallback } from "@/components/CalculatorFallback";
import { JsonLd } from "@/components/JsonLd";
import { ReconstitutionCalculator } from "@/components/ReconstitutionCalculator";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  webApplicationJsonLd,
} from "@/lib/seo";
import { CATEGORY_ICONS, ArrowRightIcon } from "@/components/icons";
import { Suspense } from "react";

const title = "Peptide Reconstitution Calculator";
const description =
  "Calculate peptide concentration, dose volume, syringe units, accumulation and sequence chemistry. Optional peptide shortcuts included.";
const path = "/calculators";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path },
];

const RECONSTITUTION_FAQS = [
  {
    question: "How much BAC water should I add to a 5 mg peptide vial?",
    answer:
      "There is no universal amount. The water volume sets the final concentration. For example, 5 mg with 1 mL is 5 mg/mL, while 5 mg with 2 mL is 2.5 mg/mL. Follow the product label, prescriber or pharmacist instructions.",
  },
  {
    question: "How many syringe units is 250 mcg?",
    answer:
      "It depends on the vial concentration and syringe scale. If 5 mg is mixed with 2 mL, concentration is 2.5 mg/mL. A 250 mcg dose is 0.25 mg, which equals 0.1 mL or 10 units on a U-100 syringe.",
  },
  {
    question: "What does 10 mg reconstituted with 2 mL mean?",
    answer:
      "It means the vial contains 10 mg total in 2 mL of liquid, giving a concentration of 5 mg/mL. A 1 mg draw would be 0.2 mL, or 20 units on a U-100 syringe.",
  },
  {
    question: "What are U-100 syringe units?",
    answer:
      "U-100 syringes are marked so 100 units equals 1 mL. One unit equals 0.01 mL. Units are volume markings, not peptide milligrams.",
  },
  {
    question: "Is this calculator a dosing recommendation?",
    answer:
      "No. It only converts vial amount, water volume and target amount into concentration and draw volume. The target amount must come from a product label, prescriber, pharmacist or appropriate research protocol.",
  },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
});

interface CalculatorEntry {
  slug: string;
  title: string;
  description: string;
  status: "live" | "soon";
  href: string;
  icon: keyof typeof CATEGORY_ICONS;
  tint: "emerald" | "sky" | "violet" | "amber" | "rose" | "slate";
}

const CALCULATORS: CalculatorEntry[] = [
  {
    slug: "reconstitution",
    title: "Reconstitution calculator",
    description:
      "Vial mg, BAC water mL and target dose into concentration, dose volume and syringe units.",
    status: "live",
    href: "#reconstitution",
    icon: "molecule",
    tint: "emerald",
  },
  {
    slug: "accumulation",
    title: "Accumulation calculator",
    description:
      "Model repeated dosing over time: peak, trough, accumulation factor and steady-state timing.",
    status: "live",
    href: "/calculators/accumulation",
    icon: "pulse",
    tint: "sky",
  },
  {
    slug: "unit-converter",
    title: "Unit converter",
    description:
      "Convert mg, mcg, optional IU and syringe units from one reconstituted vial setup.",
    status: "live",
    href: "/calculators/unit-converter",
    icon: "leaf",
    tint: "slate",
  },
  {
    slug: "peptide-chemistry",
    title: "Peptide chemistry calculator",
    description:
      "Analyze sequence length, molecular weight, composition, charge, hydropathy and amino acid notation.",
    status: "live",
    href: "/calculators/peptide-chemistry",
    icon: "molecule",
    tint: "violet",
  },
];

const TINT_BG: Record<string, string> = {
  emerald: "bg-tint-emerald text-tint-emerald-ink",
  sky: "bg-tint-sky text-tint-sky-ink",
  amber: "bg-tint-amber text-tint-amber-ink",
  violet: "bg-tint-violet text-tint-violet-ink",
  rose: "bg-tint-rose text-tint-rose-ink",
  slate: "bg-tint-slate text-tint-slate-ink",
};

export default function CalculatorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={webApplicationJsonLd({ name: title, description, path })} />
      <JsonLd data={faqPageJsonLd(RECONSTITUTION_FAQS)} />

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
              href="/peptides/peptide-reconstitution-guide"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Reconstitution guide
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/peptides/bacteriostatic-water-guide"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Bacteriostatic water guide
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/peptides/peptide-storage-guide"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Peptide storage guide
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reconstitution Calculator — live */}
      <section id="reconstitution" className="mx-auto max-w-6xl px-5 pt-12 scroll-mt-24">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Live now
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              Reconstitution calculator
            </h2>
            <p className="mt-1 text-sm text-muted">
              Enter the numbers from your vial and syringe. The tool returns
              concentration, volume and the unit mark to draw to.
            </p>
          </div>
        </div>
        <Suspense fallback={<CalculatorFallback />}>
          <ReconstitutionCalculator />
        </Suspense>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              What it calculates
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Enter vial strength and BAC water volume to get concentration in
              mg/mL, then add a target dose to calculate mL and syringe units.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Best for
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Quick reconstitution math for research notes, comparison tables
              and checking whether a draw volume matches the syringe scale.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Common searches
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Peptide reconstitution calculator, BAC water calculator, peptide
              syringe units calculator and mg to units calculator.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Common reconstitution examples
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            These examples show the math only. They are not dose instructions.
            Change the vial amount, water volume or syringe scale in the
            calculator above for your actual label or protocol.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-surface text-left">
                <tr>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    Vial setup
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    Concentration
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    250 mcg draw
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    U-100 units
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    5 mg + 1 mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    5 mg/mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    0.05 mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    5 units
                  </td>
                </tr>
                <tr>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    5 mg + 2 mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    2.5 mg/mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    0.1 mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    10 units
                  </td>
                </tr>
                <tr>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    10 mg + 2 mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    5 mg/mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    0.05 mL
                  </td>
                  <td className="border border-line px-3 py-2 text-ink-soft">
                    5 units
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Reconstitution FAQ
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {RECONSTITUTION_FAQS.map((faq) => (
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
      </section>

      {/* Calculator index */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            All calculators
          </h2>
          <p className="mt-1 text-sm text-muted">
            Live, no-signup tools for peptide concentration, unit conversion,
            repeated-dose accumulation and sequence chemistry.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CALCULATORS.map((calc) => {
            const Icon = CATEGORY_ICONS[calc.icon];
            const tintClasses = TINT_BG[calc.tint] ?? TINT_BG.emerald;
            const isLive = calc.status === "live";
            return (
              <div
                key={calc.slug}
                className={`flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-5 shadow-card ${
                  isLive ? "" : "opacity-70"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${tintClasses}`}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                      isLive
                        ? "border-tint-emerald-ink/40 bg-tint-emerald text-tint-emerald-ink"
                        : "border-line bg-surface text-muted"
                    }`}
                  >
                    {isLive ? "Live" : "Coming soon"}
                  </span>
                </div>
                <h3 className="text-base font-semibold tracking-tight text-ink">
                  {calc.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {calc.description}
                </p>
                {isLive ? (
                  <Link
                    href={calc.href}
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
                  >
                    Use it
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <span className="mt-auto text-xs text-muted-soft">
                    In development
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <DisclaimerBanner />
    </>
  );
}
