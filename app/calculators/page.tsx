import type { Metadata } from "next";
import { ReconstitutionCalculator } from "@/components/ReconstitutionCalculator";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { buildMetadata } from "@/lib/seo";
import { CATEGORY_ICONS, ArrowRightIcon } from "@/components/icons";

const title = "Peptide Calculators & Tools";
const description =
  "Free peptide calculators: reconstitution math, dosage tracking, cost comparison, stack planning. All client-side — your values never leave your browser.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/calculators",
});

interface CalculatorEntry {
  slug: string;
  title: string;
  description: string;
  status: "live" | "soon";
  icon: keyof typeof CATEGORY_ICONS;
  tint: "emerald" | "sky" | "violet" | "amber" | "rose" | "slate";
}

const CALCULATORS: CalculatorEntry[] = [
  {
    slug: "reconstitution",
    title: "Reconstitution calculator",
    description:
      "Vial mg + BAC water mL → concentration, dose volume and units to draw on a syringe.",
    status: "live",
    icon: "molecule",
    tint: "emerald",
  },
  {
    slug: "dosage-tracker",
    title: "Dosage & titration tracker",
    description:
      "Plan a Wegovy / Zepbound / Saxenda titration schedule with side-effect notes per week.",
    status: "soon",
    icon: "pulse",
    tint: "sky",
  },
  {
    slug: "cost-calculator",
    title: "Cost calculator",
    description:
      "Compare monthly cost across brand-name, compounded, telehealth bundle and insurance copay paths.",
    status: "soon",
    icon: "flame",
    tint: "amber",
  },
  {
    slug: "weight-loss-projector",
    title: "Weight-loss projector",
    description:
      "Estimate your trajectory based on starting weight, drug, dose and trial-average response curve.",
    status: "soon",
    icon: "weight",
    tint: "violet",
  },
  {
    slug: "stack-builder",
    title: "Stack builder",
    description:
      "Plan multi-peptide stacks with interaction warnings (GLP-1 + GH + healing-recovery combinations).",
    status: "soon",
    icon: "spark",
    tint: "rose",
  },
  {
    slug: "unit-converter",
    title: "Unit converter",
    description: "Convert mg ↔ mcg ↔ IU ↔ syringe units. Common peptide presets included.",
    status: "soon",
    icon: "leaf",
    tint: "slate",
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
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Tools
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </div>
      </section>

      {/* Reconstitution Calculator — live */}
      <section id="reconstitution" className="mx-auto max-w-3xl px-5 pt-16 scroll-mt-24">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Live now
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              Reconstitution calculator
            </h2>
            <p className="mt-1 text-sm text-muted">
              The most-asked peptide math: how many syringe units for a target
              dose, given a vial size and the water you added.
            </p>
          </div>
        </div>
        <ReconstitutionCalculator />
      </section>

      {/* Calculator index */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            All calculators
          </h2>
          <p className="mt-1 text-sm text-muted">
            More tools in development. Each will be a self-contained, no-signup
            client-side calculator — same as the one above.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <a
                    href="#reconstitution"
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-bright"
                  >
                    Use it
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </a>
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
