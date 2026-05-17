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
  faqPageJsonLd,
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

const ACCUMULATION_FAQS = [
  {
    question: "What is peptide half-life?",
    answer:
      "Half-life is the time it takes for the modeled amount to fall by half. If a peptide has a 24 hour half-life, about half remains after 24 hours in a simple first-order model.",
  },
  {
    question: "What does steady state mean?",
    answer:
      "Steady state is the repeated-dose pattern where peak and trough levels become more consistent. In simple first-order models, it usually takes about 4 to 5 half-lives to get close to steady state.",
  },
  {
    question: "What is the difference between peak and trough?",
    answer:
      "Peak is the modeled amount soon after a dose is added. Trough is the modeled amount just before the next dose. Shorter intervals and longer half-lives usually raise troughs.",
  },
  {
    question: "Does this predict blood concentration?",
    answer:
      "No. This is a simple accumulation model using dose amount, interval and half-life. It does not account for absorption, bioavailability, distribution, metabolism, active metabolites or patient differences.",
  },
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
      <JsonLd data={faqPageJsonLd(ACCUMULATION_FAQS)} />

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
              href="/calculators/peptide-chemistry"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Peptide chemistry calculator
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/peptides/peptide-half-life-explained"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
            >
              Half-life guide
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
            not for predicting an exact blood concentration. Read the{" "}
            <Link
              href="/peptides/peptide-half-life-explained"
              className="font-medium text-accent hover:text-accent-bright"
            >
              peptide half-life guide
            </Link>{" "}
            for the peak, trough and steady-state context.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Half-life quick table
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              In a simple first-order model, each half-life reduces the modeled
              remaining amount by half.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-surface text-left">
                  <tr>
                    <th className="border border-line px-3 py-2 font-semibold text-ink">
                      Time elapsed
                    </th>
                    <th className="border border-line px-3 py-2 font-semibold text-ink">
                      Approx amount remaining
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1 half-life", "50%"],
                    ["2 half-lives", "25%"],
                    ["3 half-lives", "12.5%"],
                    ["4 half-lives", "6.25%"],
                    ["5 half-lives", "3.125%"],
                  ].map(([time, remaining]) => (
                    <tr key={time}>
                      <td className="border border-line px-3 py-2 text-ink-soft">
                        {time}
                      </td>
                      <td className="border border-line px-3 py-2 text-ink-soft">
                        {remaining}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-xl border border-line bg-surface-2 p-5 shadow-card">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Peak, trough and steady state
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted">
              <p>
                <strong className="font-semibold text-ink-soft">Peak</strong>{" "}
                is the modeled high point after a dose is added.
              </p>
              <p>
                <strong className="font-semibold text-ink-soft">Trough</strong>{" "}
                is the modeled low point before the next scheduled dose.
              </p>
              <p>
                <strong className="font-semibold text-ink-soft">
                  Steady state
                </strong>{" "}
                is when repeated peaks and troughs become more consistent over
                time. The calculator estimates this pattern; it does not
                replace pharmacokinetic data.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface-2 p-5 shadow-card">
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            Accumulation calculator FAQ
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {ACCUMULATION_FAQS.map((faq) => (
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
          description="Pair accumulation estimates with reconstitution and unit conversion math when comparing repeated-dose schedules."
        />
      </section>

      <DisclaimerBanner />
    </>
  );
}
