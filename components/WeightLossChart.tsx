/**
 * Average trial weight-loss comparison for approved GLP-1 weight-loss drugs.
 *
 * Server-rendered CSS bar chart (no client JS). Figures mirror the article's
 * ranking table — pivotal-trial averages, not individual results. Bars are
 * coloured by molecule so the tirzepatide/semaglutide/liraglutide grouping
 * reads at a glance.
 */

interface Bar {
  drug: string;
  ingredient: string;
  /** Numeric percent used for bar width. */
  value: number;
  /** Display label (may be a range). */
  label: string;
  trial: string;
  className: string;
}

const MAX_SCALE = 24;

const BARS: Bar[] = [
  {
    drug: "Zepbound",
    ingredient: "tirzepatide 15 mg",
    value: 21,
    label: "~21%",
    trial: "SURMOUNT-1",
    className: "bg-tint-emerald-ink",
  },
  {
    drug: "Mounjaro",
    ingredient: "tirzepatide 15 mg",
    value: 21,
    label: "~21%",
    trial: "off-label",
    className: "bg-tint-emerald-ink",
  },
  {
    drug: "Wegovy",
    ingredient: "semaglutide 2.4 mg",
    value: 15,
    label: "~15%",
    trial: "STEP-1",
    className: "bg-tint-sky-ink",
  },
  {
    drug: "Ozempic",
    ingredient: "semaglutide 2.0 mg",
    value: 13.5,
    label: "~12–15%",
    trial: "off-label",
    className: "bg-tint-sky-ink",
  },
  {
    drug: "Saxenda",
    ingredient: "liraglutide 3.0 mg",
    value: 8,
    label: "~8%",
    trial: "SCALE",
    className: "bg-tint-slate-ink",
  },
];

export function WeightLossChart() {
  return (
    <figure className="mt-6 rounded-xl border border-line bg-surface-2 p-5">
      <figcaption className="text-sm font-semibold text-ink">
        Average weight loss in pivotal trials
        <span className="ml-1 font-normal text-muted">
          (% of body weight)
        </span>
      </figcaption>

      <div className="mt-4 space-y-3">
        {BARS.map((bar) => (
          <div
            key={bar.drug}
            className="grid grid-cols-[7rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr]"
          >
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold text-ink">
                {bar.drug}
              </div>
              <div className="truncate text-xs text-muted">
                {bar.ingredient}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-6 flex-1 overflow-hidden rounded bg-surface">
                <div
                  className={`flex h-full items-center rounded ${bar.className}`}
                  style={{ width: `${(bar.value / MAX_SCALE) * 100}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-sm font-semibold text-ink">
                {bar.label}
                <span className="ml-1 font-normal text-muted-soft">
                  {bar.trial}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-muted">
        Averages from each drug&apos;s pivotal weight-management trial.
        Individual results vary substantially. Tirzepatide figures are at the
        15 mg dose; semaglutide at 2.4 mg (Wegovy) and 2.0 mg (Ozempic).
      </p>
    </figure>
  );
}
