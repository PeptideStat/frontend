import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorFallback } from "@/components/CalculatorFallback";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ArrowRightIcon } from "@/components/icons";
import { UnitConverterCalculator } from "@/components/UnitConverterCalculator";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  webApplicationJsonLd,
} from "@/lib/seo";

const title = "Peptide Unit Converter";
const description =
  "Convert peptide amounts between mg, mcg, optional IU and syringe units using vial strength, BAC water and syringe scale.";
const path = "/calculators/unit-converter";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/calculators" },
  { name: "Unit converter", path },
];

const UNIT_CONVERTER_FAQS = [
  {
    question: "How many mcg are in 1 mg?",
    answer:
      "1 mg equals 1000 mcg. To convert mg to mcg, multiply by 1000. To convert mcg to mg, divide by 1000.",
  },
  {
    question: "How do you convert mcg to syringe units?",
    answer:
      "First convert mcg to mg, then divide by the vial concentration in mg/mL to get mL. On a U-100 syringe, multiply mL by 100 to get units.",
  },
  {
    question: "Are IU and mg interchangeable?",
    answer:
      "No. IU is a biological activity unit and is product-specific. Milligrams and micrograms are mass units. Only use an IU factor when it appears on the exact product label or is provided by a clinician.",
  },
  {
    question: "What is the difference between units and mcg?",
    answer:
      "mcg measures mass. Syringe units measure volume on a specific syringe scale. A unit mark only tells you how much liquid to draw, not how many micrograms are in that liquid.",
  },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
});

export default function UnitConverterPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={webApplicationJsonLd({ name: title, description, path })} />
      <JsonLd data={faqPageJsonLd(UNIT_CONVERTER_FAQS)} />

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
              href="/calculators"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Reconstitution calculator
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/calculators/accumulation"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Accumulation calculator
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/calculators/peptide-chemistry"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Peptide chemistry calculator
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
            Unit conversion calculator
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
            Convert mass units, optional IU and syringe draw from the same
            reconstituted vial setup.
          </p>
        </div>
        <Suspense fallback={<CalculatorFallback />}>
          <UnitConverterCalculator />
        </Suspense>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              What it converts
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Convert between mg and mcg, optionally calculate IU with a label
              factor, and translate the dose into mL and syringe units.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Best for
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Checking dose unit math, comparing concentration after
              reconstitution and converting microgram amounts into syringe
              marks.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Common searches
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Peptide unit converter, mcg to mg peptide calculator, peptide IU
              converter and peptide units calculator.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            mg to mcg quick table
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Milligrams and micrograms are mass units. This table is pure unit
            conversion, independent of vial concentration.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-surface text-left">
                <tr>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    mg
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    mcg
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    Decimal mg
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0.05", "50", "0.05 mg"],
                  ["0.1", "100", "0.1 mg"],
                  ["0.25", "250", "0.25 mg"],
                  ["0.5", "500", "0.5 mg"],
                  ["1", "1000", "1 mg"],
                ].map(([mg, mcg, decimal]) => (
                  <tr key={mg}>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {mg} mg
                    </td>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {mcg} mcg
                    </td>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {decimal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            mcg to units examples
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Syringe units require concentration. These examples assume a U-100
            syringe and a vial mixed to 2.5 mg/mL.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-surface text-left">
                <tr>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    Amount
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    In mg
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    Draw volume
                  </th>
                  <th className="border border-line px-3 py-2 font-semibold text-ink">
                    U-100 units
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["100 mcg", "0.1 mg", "0.04 mL", "4 units"],
                  ["250 mcg", "0.25 mg", "0.1 mL", "10 units"],
                  ["500 mcg", "0.5 mg", "0.2 mL", "20 units"],
                  ["1000 mcg", "1 mg", "0.4 mL", "40 units"],
                ].map(([amount, mg, volume, units]) => (
                  <tr key={amount}>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {amount}
                    </td>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {mg}
                    </td>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {volume}
                    </td>
                    <td className="border border-line px-3 py-2 text-ink-soft">
                      {units}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            About IU conversions
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Milligrams and micrograms are mass units. IU is a biological
            activity unit and is not universal across peptides. Use the IU
            factor only when it appears on a specific product label or is
            provided by a clinician.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Unit converter FAQ
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {UNIT_CONVERTER_FAQS.map((faq) => (
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
          description="Pair unit conversion with reconstitution math and accumulation estimates for a fuller view of peptide calculations."
        />
      </section>

      <DisclaimerBanner />
    </>
  );
}
