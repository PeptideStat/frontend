"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCalculatorPreset } from "@/lib/calculatorPresets";

const VIAL_PRESETS = ["5", "10", "15", "30", "60"];
const WATER_PRESETS = ["1", "2", "2.5", "3"];
const DOSE_PRESETS = ["0.25", "0.5", "1", "2.5", "5"];
const SYRINGE_OPTIONS = [
  { label: "U-100", value: "100" },
  { label: "U-50", value: "50" },
  { label: "U-40", value: "40" },
];
const PEPTIDE_SHORTCUTS = [
  { label: "Semaglutide", vialMg: "5", waterMl: "2" },
  { label: "Tirzepatide", vialMg: "10", waterMl: "2" },
  { label: "Retatrutide", vialMg: "10", waterMl: "2" },
  { label: "BPC-157", vialMg: "10", waterMl: "2" },
  { label: "TB-500", vialMg: "5", waterMl: "2" },
  { label: "Ipamorelin", vialMg: "5", waterMl: "2" },
];

type ReconstitutionResult = {
  concentration: number;
  doseMg: number;
  dosesPerVial: number;
  mcgPerUnit: number;
  overVial: boolean;
  overSyringe: boolean;
  units: number;
  unitsPerMl: number;
  vialMg: number;
  volumeMl: number;
  waterMl: number;
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

/**
 * Reconstitution calculator.
 *
 * Given a peptide vial (mg), the volume of bacteriostatic water added (mL),
 * a target dose (mg) and a syringe scale (units per mL), computes:
 *   - concentration (mg/mL)
 *   - dose volume (mL)
 *   - dose volume in syringe units
 *
 * Pure local state. No tracking, no submission, no network.
 */
export function ReconstitutionCalculator() {
  const searchParams = useSearchParams();
  const queryPeptide = searchParams.get("peptide");
  const [vialMg, setVialMg] = useState(() =>
    numericQueryParam(searchParams, "vialMg", "10"),
  );
  const [waterMl, setWaterMl] = useState(() =>
    numericQueryParam(searchParams, "waterMl", "2"),
  );
  const [doseMg, setDoseMg] = useState(() =>
    numericQueryParam(searchParams, "doseMg", "2.5"),
  );
  const [unitsPerMl, setUnitsPerMl] = useState(() =>
    numericQueryParam(searchParams, "unitsPerMl", "100"),
  );

  const result = useMemo(() => {
    const vial = parseFloat(vialMg);
    const water = parseFloat(waterMl);
    const dose = parseFloat(doseMg);
    const upm = parseFloat(unitsPerMl);

    if (
      !Number.isFinite(vial) ||
      !Number.isFinite(water) ||
      !Number.isFinite(dose) ||
      !Number.isFinite(upm) ||
      vial <= 0 ||
      water <= 0 ||
      dose <= 0 ||
      upm <= 0
    ) {
      return null;
    }

    const concentration = vial / water;
    const volumeMl = dose / concentration;
    const units = volumeMl * upm;

    return {
      concentration,
      doseMg: dose,
      dosesPerVial: vial / dose,
      mcgPerUnit: (concentration * 1000) / upm,
      overVial: volumeMl > water,
      overSyringe: units > upm,
      units,
      unitsPerMl: upm,
      vialMg: vial,
      volumeMl,
      waterMl: water,
    };
  }, [vialMg, waterMl, doseMg, unitsPerMl]);

  const reset = () => {
    setVialMg("10");
    setWaterMl("2");
    setDoseMg("2.5");
    setUnitsPerMl("100");
  };

  const applyPeptideShortcut = (shortcut: (typeof PEPTIDE_SHORTCUTS)[number]) => {
    setVialMg(shortcut.vialMg);
    setWaterMl(shortcut.waterMl);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
      <div className="border-b border-line bg-surface px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Reconstitution
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              Peptide dose calculator
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

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
        <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <PeptideShortcuts
            loadedPeptide={queryPeptide ? formatPeptideSlug(queryPeptide) : null}
            onSelect={applyPeptideShortcut}
          />

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Vial amount"
              unit="mg"
              value={vialMg}
              onChange={setVialMg}
              help="Total peptide in the vial."
              presets={VIAL_PRESETS}
            />
            <Field
              label="BAC water added"
              unit="mL"
              value={waterMl}
              onChange={setWaterMl}
              help="How much water you mixed into the vial."
              presets={WATER_PRESETS}
            />
            <Field
              label="Target dose"
              unit="mg"
              value={doseMg}
              onChange={setDoseMg}
              help="The dose you want to draw."
              presets={DOSE_PRESETS}
            />
            <SyringeScale value={unitsPerMl} onChange={setUnitsPerMl} />
          </div>

          <CalculationPanel result={result} />
        </div>

        <div className="bg-canvas/55 p-5 sm:p-6">
          <ResultPanel result={result} />
          <ReferenceTable />
        </div>
      </div>

      <div className="border-t border-line bg-surface px-5 py-3 sm:px-6">
        <p className="text-xs leading-relaxed text-muted">
          Educational math tool only. Confirm dosing, concentration and syringe
          markings with a licensed clinician before use.
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
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-soft">
            Peptide shortcuts
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-soft">
            Sets vial and BAC water examples only. Target dose stays editable.
          </p>
          {loadedPeptide && (
            <p className="mt-1 text-xs font-medium text-accent-bright">
              Loaded editable {loadedPeptide} example.
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {PEPTIDE_SHORTCUTS.map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() => onSelect(shortcut)}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-accent/45 hover:text-accent-bright"
          >
            {shortcut.label}
            <span className="ml-1 text-muted-soft">{shortcut.vialMg} mg</span>
          </button>
        ))}
      </div>
    </div>
  );
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

function SyringeScale({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-sm font-medium text-ink-soft">Syringe scale</span>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5 rounded-lg border border-line bg-canvas p-1.5">
          {SYRINGE_OPTIONS.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`rounded-md px-2 py-2 text-center transition ${
                  isActive
                    ? "bg-accent text-canvas shadow-card"
                    : "text-muted hover:bg-surface hover:text-ink-soft"
                }`}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-[10px] leading-none opacity-80">
                  {option.value} U/mL
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <span className="text-xs leading-relaxed text-muted-soft">
        Use the scale printed on the syringe barrel.
      </span>
    </div>
  );
}

function ResultPanel({
  result,
}: {
  result: ReconstitutionResult;
}) {
  if (!result) {
    return (
      <div className="rounded-xl border border-line bg-surface-2 p-5">
        <p className="text-sm font-medium text-ink-soft">Dose result</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Enter the vial, water, dose and syringe values to calculate the draw.
        </p>
      </div>
    );
  }

  const syringeLabel =
    SYRINGE_OPTIONS.find((option) => option.value === String(result.unitsPerMl))
      ?.label ?? `${result.unitsPerMl} U/mL`;

  return (
    <div className="rounded-xl border border-accent/35 bg-accent-soft/40 p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
            Draw to
          </p>
          <p className="mt-2 font-mono text-5xl font-semibold tracking-tight text-ink">
            {formatNumber(result.units, 1)}
          </p>
          <p className="mt-1 text-sm text-muted">
            units on a {syringeLabel} syringe
          </p>
        </div>
        <div className="rounded-lg border border-accent/25 bg-canvas/70 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-wider text-muted">Volume</p>
          <p className="mt-1 font-mono text-lg font-semibold text-accent-bright">
            {formatNumber(result.volumeMl, 3)} mL
          </p>
        </div>
      </div>

      <SyringeMeter units={result.units} unitsPerMl={result.unitsPerMl} />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Concentration" value={`${formatNumber(result.concentration, 2)} mg/mL`} />
        <Metric label="Dose" value={`${formatNumber(result.doseMg, 3)} mg`} />
        <Metric label="Per unit" value={`${formatNumber(result.mcgPerUnit, 1)} mcg`} />
        <Metric label="Doses/vial" value={formatNumber(result.dosesPerVial, 1)} />
      </div>

      {(result.overSyringe || result.overVial) && (
        <div className="mt-4 rounded-lg border border-tint-amber-ink/35 bg-tint-amber px-3 py-2 text-sm leading-relaxed text-tint-amber-ink">
          {result.overVial
            ? "This target dose is larger than the reconstituted vial volume. Recheck the vial amount and target dose."
            : "This draw is more than one full syringe at the selected scale. Recheck the values before using the result."}
        </div>
      )}
    </div>
  );
}

function SyringeMeter({
  units,
  unitsPerMl,
}: {
  units: number;
  unitsPerMl: number;
}) {
  const fill = clamp((units / unitsPerMl) * 100, 0, 100);
  const labels = [0, unitsPerMl * 0.25, unitsPerMl * 0.5, unitsPerMl * 0.75, unitsPerMl];

  return (
    <div className="mt-5">
      <div className="relative h-24">
        <div className="absolute left-0 top-7 h-10 w-4 rounded-l-md border border-line bg-surface" />
        <div className="absolute left-3 right-11 top-5 h-14 overflow-hidden rounded-lg border border-line-strong bg-canvas">
          <div
            className="absolute inset-y-0 left-0 bg-accent/35 transition-[width] duration-300"
            style={{ width: `${fill}%` }}
          />
          <div className="absolute inset-x-3 top-1 grid grid-cols-11">
            {Array.from({ length: 11 }).map((_, index) => (
              <span
                key={index}
                className="h-5 border-l border-ink/25 first:border-l-0"
              />
            ))}
          </div>
          <div className="absolute inset-x-3 bottom-2 h-1 rounded-full bg-ink/10" />
        </div>
        <div className="absolute right-5 top-10 h-3 w-8 rounded-r-full border-y border-r border-line-strong bg-surface" />
        <div className="absolute right-1 top-[46px] h-px w-5 bg-line-strong" />
      </div>

      <div className="grid grid-cols-5 text-[10px] font-medium uppercase tracking-wider text-muted-soft">
        {labels.map((label) => (
          <span key={label} className="first:text-left last:text-right">
            {formatNumber(label, 0)}
          </span>
        ))}
      </div>
    </div>
  );
}

function CalculationPanel({
  result,
}: {
  result: ReconstitutionResult;
}) {
  return (
    <div className="mt-6 rounded-xl border border-line bg-canvas p-4">
      <p className="text-sm font-semibold text-ink-soft">Calculation</p>
      {result ? (
        <div className="mt-3 grid gap-3 text-sm text-muted sm:grid-cols-3">
          <Formula label="Concentration" value={`${result.vialMg} mg / ${result.waterMl} mL`} />
          <Formula
            label="Dose volume"
            value={`${result.doseMg} mg / ${formatNumber(result.concentration, 2)} mg/mL`}
          />
          <Formula
            label="Syringe units"
            value={`${formatNumber(result.volumeMl, 3)} mL x ${result.unitsPerMl}`}
          />
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted">
          Complete all fields to see the formula behind the result.
        </p>
      )}
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
      <h3 className="text-sm font-semibold text-ink-soft">Quick reference</h3>
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
                mg/mL
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                How much peptide is in each milliliter after mixing.
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                mL
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                The liquid volume needed for the target dose.
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                units
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                The syringe marking to draw to on the selected scale.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}
