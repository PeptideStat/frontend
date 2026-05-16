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
            About IU conversions
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Milligrams and micrograms are mass units. IU is a biological
            activity unit and is not universal across peptides. Use the IU
            factor only when it appears on a specific product label or is
            provided by a clinician.
          </p>
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
