"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCalculatorPreset } from "@/lib/calculatorPresets";

const DOSE_PRESETS = ["0.25", "0.5", "1", "2.5", "5"];
const HALF_LIFE_PRESETS = ["6", "12", "24", "48", "72", "120"];
const DURATION_PRESETS = ["7", "14", "28", "56", "84"];
const INTERVAL_PRESETS = [
  { label: "12h", value: "12" },
  { label: "Daily", value: "24" },
  { label: "2 days", value: "48" },
  { label: "Weekly", value: "168" },
];
const PEPTIDE_SHORTCUTS = [
  {
    label: "Semaglutide",
    halfLifeHours: "168",
    intervalHours: "168",
    note: "~7d half-life",
  },
  {
    label: "Tirzepatide",
    halfLifeHours: "120",
    intervalHours: "168",
    note: "~5d half-life",
  },
  {
    label: "Retatrutide",
    halfLifeHours: "144",
    intervalHours: "168",
    note: "~6d half-life",
  },
  {
    label: "Liraglutide",
    halfLifeHours: "13",
    intervalHours: "24",
    note: "~13h half-life",
  },
  {
    label: "Cagrilintide",
    halfLifeHours: "168",
    intervalHours: "168",
    note: "~7d half-life",
  },
  {
    label: "Survodutide",
    halfLifeHours: "168",
    intervalHours: "168",
    note: "~7d half-life",
  },
];

type AccumulationPoint = {
  timeHours: number;
  amountMg: number;
};

type AccumulationResult = {
  accumulationFactor: number;
  currentAmount: number;
  doseCount: number;
  doseMg: number;
  durationDays: number;
  durationHours: number;
  halfLifeHours: number;
  intervalHours: number;
  lastPeak: number;
  lastTrough: number;
  maxAmount: number;
  points: AccumulationPoint[];
  steadyPeak: number;
  steadyTrough: number;
  timeTo95Days: number;
} | null;

function numericQueryParam(
  searchParams: { get: (key: string) => string | null },
  key: string,
  fallback: string,
) {
  const value = searchParams.get(key);
  if (!value) return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? value : fallback;
}

function formatPeptideSlug(slug: string) {
  const preset = getCalculatorPreset(slug);
  if (preset) return preset.label;

  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AccumulationCalculator() {
  const searchParams = useSearchParams();
  const queryPeptide = searchParams.get("peptide");
  const [doseMg, setDoseMg] = useState(() =>
    numericQueryParam(searchParams, "doseMg", "1"),
  );
  const [halfLifeHours, setHalfLifeHours] = useState(() =>
    numericQueryParam(searchParams, "halfLifeHours", "24"),
  );
  const [intervalHours, setIntervalHours] = useState(() =>
    numericQueryParam(searchParams, "intervalHours", "24"),
  );
  const [durationDays, setDurationDays] = useState(() =>
    numericQueryParam(searchParams, "durationDays", "28"),
  );

  const result = useMemo<AccumulationResult>(() => {
    const dose = parseFloat(doseMg);
    const halfLife = parseFloat(halfLifeHours);
    const interval = parseFloat(intervalHours);
    const duration = parseFloat(durationDays);

    if (
      !Number.isFinite(dose) ||
      !Number.isFinite(halfLife) ||
      !Number.isFinite(interval) ||
      !Number.isFinite(duration) ||
      dose <= 0 ||
      halfLife <= 0 ||
      interval <= 0 ||
      duration <= 0
    ) {
      return null;
    }

    return buildAccumulationResult(dose, halfLife, interval, duration);
  }, [doseMg, halfLifeHours, intervalHours, durationDays]);

  const reset = () => {
    setDoseMg("1");
    setHalfLifeHours("24");
    setIntervalHours("24");
    setDurationDays("28");
  };

  const applyPeptideShortcut = (shortcut: (typeof PEPTIDE_SHORTCUTS)[number]) => {
    setHalfLifeHours(shortcut.halfLifeHours);
    setIntervalHours(shortcut.intervalHours);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
      <div className="border-b border-line bg-surface px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Accumulation
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              Peptide level simulator
            </h2>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center justify-center rounded-md border border-line bg-canvas px-3 text-sm font-medium text-ink-soft transition hover:border-accent/50 hover:text-ink"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)]">
        <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <PeptideShortcuts
            loadedPeptide={queryPeptide ? formatPeptideSlug(queryPeptide) : null}
            onSelect={applyPeptideShortcut}
          />

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Dose amount"
              unit="mg"
              value={doseMg}
              onChange={setDoseMg}
              help="Amount taken each time."
              presets={DOSE_PRESETS}
            />
            <Field
              label="Half-life"
              unit="hours"
              value={halfLifeHours}
              onChange={setHalfLifeHours}
              help="How long it takes levels to fall by half."
              presets={HALF_LIFE_PRESETS}
            />
            <IntervalField value={intervalHours} onChange={setIntervalHours} />
            <Field
              label="Simulation length"
              unit="days"
              value={durationDays}
              onChange={setDurationDays}
              help="How far forward to model the schedule."
              presets={DURATION_PRESETS}
            />
          </div>

          <ScheduleSummary result={result} />
        </div>

        <div className="bg-canvas/55 p-5 sm:p-6">
          <ResultPanel result={result} />
          <ReferenceTable />
        </div>
      </div>

      <div className="border-t border-line bg-surface px-5 py-3 sm:px-6">
        <p className="text-xs leading-relaxed text-muted">
          Educational model only. It assumes first-order elimination and evenly
          spaced doses; real blood levels can vary by route, product, metabolism
          and adherence.
        </p>
      </div>
    </div>
  );
}

function PeptideShortcuts({
  loadedPeptide,
  onSelect,
}: {
  loadedPeptide: string | null;
  onSelect: (shortcut: (typeof PEPTIDE_SHORTCUTS)[number]) => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas p-4">
      <div>
        <p className="text-sm font-semibold text-ink-soft">
          Peptide shortcuts
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-soft">
          Sets half-life and interval examples only. Dose stays editable.
        </p>
        {loadedPeptide && (
          <p className="mt-1 text-xs font-medium text-accent-bright">
            Loaded editable {loadedPeptide} example.
          </p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {PEPTIDE_SHORTCUTS.map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() => onSelect(shortcut)}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-left text-xs font-medium text-ink-soft transition hover:border-accent/45 hover:text-accent-bright"
          >
            {shortcut.label}
            <span className="ml-1 text-muted-soft">{shortcut.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function buildAccumulationResult(
  doseMg: number,
  halfLifeHours: number,
  intervalHours: number,
  durationDays: number,
): NonNullable<AccumulationResult> {
  const durationHours = durationDays * 24;
  const k = Math.LN2 / halfLifeHours;
  const decayPerInterval = Math.exp(-k * intervalHours);
  const doseCount = Math.floor(durationHours / intervalHours) + 1;
  const steadyPeak = doseMg / (1 - decayPerInterval);
  const steadyTrough = steadyPeak * decayPerInterval;
  const accumulationFactor = steadyPeak / doseMg;
  const timeTo95Days = Math.log(0.05) / -k / 24;

  const sampleCount = Math.max(80, Math.min(260, Math.ceil(durationHours / 4)));
  const points = Array.from({ length: sampleCount }, (_, index) => {
    const timeHours =
      sampleCount === 1 ? 0 : (durationHours * index) / (sampleCount - 1);
    return {
      timeHours,
      amountMg: amountAtTime(timeHours, doseMg, intervalHours, doseCount, k),
    };
  });

  let amountBeforeInterval = 0;
  let lastPeak = doseMg;
  let lastTrough = 0;
  for (let doseIndex = 0; doseIndex < doseCount; doseIndex += 1) {
    lastTrough = doseIndex === 0 ? 0 : amountBeforeInterval * decayPerInterval;
    lastPeak = lastTrough + doseMg;
    amountBeforeInterval = lastPeak;
  }

  return {
    accumulationFactor,
    currentAmount: amountAtTime(durationHours, doseMg, intervalHours, doseCount, k),
    doseCount,
    doseMg,
    durationDays,
    durationHours,
    halfLifeHours,
    intervalHours,
    lastPeak,
    lastTrough,
    maxAmount: Math.max(...points.map((point) => point.amountMg), lastPeak),
    points,
    steadyPeak,
    steadyTrough,
    timeTo95Days,
  };
}

function amountAtTime(
  timeHours: number,
  doseMg: number,
  intervalHours: number,
  doseCount: number,
  eliminationRate: number,
) {
  let amount = 0;
  for (let doseIndex = 0; doseIndex < doseCount; doseIndex += 1) {
    const doseTime = doseIndex * intervalHours;
    if (doseTime <= timeHours) {
      amount += doseMg * Math.exp(-eliminationRate * (timeHours - doseTime));
    }
  }
  return amount;
}

function Field({
  label,
  unit,
  value,
  onChange,
  help,
  presets,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  help: string;
  presets: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        <div className="flex h-12 items-center gap-2 rounded-lg border border-line bg-canvas pl-3 pr-2 focus-within:border-accent/70 focus-within:ring-2 focus-within:ring-accent/10">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent font-mono text-lg font-semibold text-ink outline-none placeholder:text-muted-soft"
          />
          <span className="shrink-0 rounded-md border border-line bg-surface px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {unit}
          </span>
        </div>
      </label>
      <PresetChips presets={presets} unit={unit} value={value} onChange={onChange} />
      <span className="text-xs leading-relaxed text-muted-soft">{help}</span>
    </div>
  );
}

function PresetChips({
  presets,
  unit,
  value,
  onChange,
}: {
  presets: string[];
  unit: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {presets.map((preset) => {
        const isActive = preset === value;
        return (
          <button
            key={`${unit}-${preset}`}
            type="button"
            onClick={() => onChange(preset)}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              isActive
                ? "border-accent/60 bg-accent-soft text-accent-bright"
                : "border-line bg-surface text-muted hover:border-accent/40 hover:text-ink-soft"
            }`}
          >
            {preset}
          </button>
        );
      })}
    </div>
  );
}

function IntervalField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-soft">Dosing interval</span>
        <div className="flex h-12 items-center gap-2 rounded-lg border border-line bg-canvas pl-3 pr-2 focus-within:border-accent/70 focus-within:ring-2 focus-within:ring-accent/10">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent font-mono text-lg font-semibold text-ink outline-none placeholder:text-muted-soft"
          />
          <span className="shrink-0 rounded-md border border-line bg-surface px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
            hours
          </span>
        </div>
      </label>
      <div className="grid grid-cols-4 gap-1.5">
        {INTERVAL_PRESETS.map((preset) => {
          const isActive = preset.value === value;
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`rounded-full border px-2 py-1 text-xs font-medium transition ${
                isActive
                  ? "border-accent/60 bg-accent-soft text-accent-bright"
                  : "border-line bg-surface text-muted hover:border-accent/40 hover:text-ink-soft"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      <span className="text-xs leading-relaxed text-muted-soft">
        Time between doses.
      </span>
    </div>
  );
}

function ScheduleSummary({ result }: { result: AccumulationResult }) {
  return (
    <div className="mt-6 rounded-xl border border-line bg-canvas p-4">
      <p className="text-sm font-semibold text-ink-soft">Schedule</p>
      {result ? (
        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
          <Formula label="Doses modeled" value={`${result.doseCount}`} />
          <Formula label="Interval" value={formatHours(result.intervalHours)} />
          <Formula label="Half-life" value={formatHours(result.halfLifeHours)} />
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted">
          Complete all fields to model accumulation over time.
        </p>
      )}
    </div>
  );
}

function ResultPanel({ result }: { result: AccumulationResult }) {
  if (!result) {
    return (
      <div className="rounded-xl border border-line bg-surface-2 p-5">
        <p className="text-sm font-medium text-ink-soft">Accumulation result</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Enter dose, half-life, interval and duration to plot the curve.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-accent/35 bg-accent-soft/40 p-5 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
            Accumulation factor
          </p>
          <p className="mt-2 font-mono text-5xl font-semibold tracking-tight text-ink">
            {formatNumber(result.accumulationFactor, 2)}x
          </p>
          <p className="mt-1 text-sm text-muted">
            estimated steady-state peak vs a single dose
          </p>
        </div>
        <div className="rounded-lg border border-accent/25 bg-canvas/70 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-wider text-muted">Current</p>
          <p className="mt-1 font-mono text-lg font-semibold text-accent-bright">
            {formatNumber(result.currentAmount, 2)} mg
          </p>
        </div>
      </div>

      <AccumulationChart result={result} />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Last peak" value={`${formatNumber(result.lastPeak, 2)} mg`} />
        <Metric label="Last trough" value={`${formatNumber(result.lastTrough, 2)} mg`} />
        <Metric label="Steady peak" value={`${formatNumber(result.steadyPeak, 2)} mg`} />
        <Metric label="95% steady state" value={`${formatNumber(result.timeTo95Days, 1)} days`} />
      </div>
    </div>
  );
}

function AccumulationChart({ result }: { result: NonNullable<AccumulationResult> }) {
  const width = 640;
  const height = 260;
  const pad = 28;
  const innerWidth = width - pad * 2;
  const innerHeight = height - pad * 2;
  const yMax = Math.max(result.maxAmount, result.steadyPeak) * 1.12;
  const yBase = height - pad;
  const points = result.points.map((point) => {
    const x = pad + (point.timeHours / result.durationHours) * innerWidth;
    const y = yBase - (point.amountMg / yMax) * innerHeight;
    return { x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `M ${pad},${yBase} L ${line} L ${width - pad},${yBase} Z`;
  const steadyY = yBase - (result.steadyPeak / yMax) * innerHeight;
  const doseTicks = Array.from({ length: result.doseCount }, (_, index) => {
    const timeHours = index * result.intervalHours;
    return pad + (timeHours / result.durationHours) * innerWidth;
  }).filter((_, index) => result.doseCount <= 42 || index % Math.ceil(result.doseCount / 42) === 0);

  return (
    <div className="mt-5 rounded-lg border border-accent/15 bg-canvas/70 p-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Accumulation curve showing estimated peptide level over time"
        className="h-auto w-full overflow-visible text-accent-bright"
      >
        <defs>
          <linearGradient id="accumulationArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((tick) => {
          const y = yBase - tick * innerHeight;
          return (
            <line
              key={tick}
              x1={pad}
              x2={width - pad}
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.11"
            />
          );
        })}
        {doseTicks.map((x, index) => (
          <line
            key={`${x}-${index}`}
            x1={x}
            x2={x}
            y1={yBase - 10}
            y2={yBase}
            stroke="currentColor"
            strokeOpacity="0.28"
          />
        ))}
        <line
          x1={pad}
          x2={width - pad}
          y1={steadyY}
          y2={steadyY}
          stroke="currentColor"
          strokeDasharray="6 7"
          strokeOpacity="0.55"
        />
        <path d={area} fill="url(#accumulationArea)" />
        <polyline
          points={line}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <text x={pad} y={22} fill="currentColor" fontSize="14" opacity="0.75">
          steady peak
        </text>
        <text
          x={width - pad}
          y={height - 6}
          fill="currentColor"
          fontSize="14"
          opacity="0.75"
          textAnchor="end"
        >
          {formatNumber(result.durationDays, 0)} days
        </text>
      </svg>
    </div>
  );
}

function Formula({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2">
      <p className="text-xs uppercase tracking-wider text-muted-soft">{label}</p>
      <p className="mt-1 font-mono text-xs text-ink-soft">{value}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-accent/15 bg-canvas/70 px-3 py-2">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-mono text-base font-semibold text-ink">{value}</p>
    </div>
  );
}

function ReferenceTable() {
  return (
    <div className="mt-5 rounded-xl border border-line bg-surface-2 p-4">
      <h3 className="text-sm font-semibold text-ink-soft">Model reference</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border border-line bg-surface px-3 py-2 font-semibold text-ink">
                Term
              </th>
              <th className="border border-line bg-surface px-3 py-2 font-semibold text-ink">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                Half-life
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                Time for the modeled level to drop by 50%.
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                Peak
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                Estimated level immediately after a scheduled dose.
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                Trough
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                Estimated level right before the next scheduled dose.
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                Accumulation
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                How much higher steady-state peak is than a single dose.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatHours(hours: number) {
  if (hours % 24 === 0) {
    const days = hours / 24;
    return `${formatNumber(days, days % 1 === 0 ? 0 : 1)} day${days === 1 ? "" : "s"}`;
  }

  return `${formatNumber(hours, hours % 1 === 0 ? 0 : 1)} hours`;
}

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}
