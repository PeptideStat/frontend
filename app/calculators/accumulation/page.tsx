import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { AccumulationCalculator } from "@/components/AccumulationCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorFallback } from "@/components/CalculatorFallback";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { ArrowRightIcon } from "@/components/icons";
import {
  breadcrumbJsonLd,
  buildMetadata,
  webApplicationJsonLd,
} from "@/lib/seo";

const title = "Peptide Accumulation Calculator";
const description =
  "Model peptide accumulation over repeated doses using dose amount, half-life, dosing interval and optional peptide shortcuts.";
const path = "/calculators/accumulation";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Calculators", path: "/calculators" },
  { name: "Accumulation calculator", path },
];

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
});

export default function AccumulationCalculatorPage() {
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
          <Link
            href="/calculators"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
          >
            Reconstitution calculator
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Live now
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
            Accumulation simulator
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
            Enter a repeated dosing schedule to estimate peak, trough and
            steady-state accumulation over time.
          </p>
        </div>
        <Suspense fallback={<CalculatorFallback />}>
          <AccumulationCalculator />
        </Suspense>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              What it shows
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              The chart estimates how repeated dosing can build up over time,
              including peak, trough, current modeled amount and the
              accumulation factor.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Useful inputs
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Change half-life, dose interval and simulation length to compare
              daily, every-other-day and weekly schedules.
            </p>
          </article>
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Search intent
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Built for peptide half-life calculator, peptide accumulation
              calculator and steady-state peptide level searches.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            How the model works
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The curve uses a first-order elimination model. Each scheduled dose
            adds to the remaining amount from prior doses, then decays according
            to the half-life you enter. This is useful for comparing schedules,
            not for predicting an exact blood concentration.
          </p>
        </div>

        <RelatedCalculators
          currentPath={path}
          className="mt-10"
          title="Use with other peptide calculators"
          description="Pair accumulation estimates with reconstitution and unit conversion math when comparing repeated-dose schedules."
        />
      </section>

      <DisclaimerBanner />
    </>
  );
}
