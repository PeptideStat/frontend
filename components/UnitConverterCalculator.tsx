"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCalculatorPreset } from "@/lib/calculatorPresets";

const AMOUNT_PRESETS = [
  { label: "100 mcg", value: "100", unit: "mcg" },
  { label: "250 mcg", value: "250", unit: "mcg" },
  { label: "500 mcg", value: "500", unit: "mcg" },
  { label: "1 mg", value: "1", unit: "mg" },
  { label: "2.5 mg", value: "2.5", unit: "mg" },
  { label: "5 mg", value: "5", unit: "mg" },
];

const PEPTIDE_SHORTCUTS = [
  { label: "Semaglutide", vialMg: "5", waterMl: "2" },
  { label: "Tirzepatide", vialMg: "10", waterMl: "2" },
  { label: "Retatrutide", vialMg: "10", waterMl: "2" },
  { label: "BPC-157", vialMg: "10", waterMl: "2" },
  { label: "TB-500", vialMg: "5", waterMl: "2" },
  { label: "Ipamorelin", vialMg: "5", waterMl: "2" },
  { label: "CJC-1295", vialMg: "5", waterMl: "2" },
];

const IU_FACTOR_PRESETS = [
  { label: "Somatropin label", value: "3" },
  { label: "Custom", value: "" },
];

const SYRINGE_OPTIONS = [
  { label: "U-100", value: "100" },
  { label: "U-50", value: "50" },
  { label: "U-40", value: "40" },
];

type AmountUnit = "mg" | "mcg" | "iu";

type UnitConverterResult = {
  amountMg: number;
  amountMcg: number;
  amountIu: number | null;
  concentrationMgMl: number;
  concentrationMcgMl: number;
  iuPerMg: number | null;
  mcgPerUnit: number;
  syringeUnits: number;
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

function amountUnitQueryParam(
  searchParams: { get: (key: string) => string | null },
  fallback: AmountUnit,
) {
  const value = searchParams.get("amountUnit");
  return value === "mg" || value === "mcg" || value === "iu"
    ? value
    : fallback;
}

function formatPeptideSlug(slug: string) {
  const preset = getCalculatorPreset(slug);
  if (preset) return preset.label;

  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function UnitConverterCalculator() {
  const searchParams = useSearchParams();
  const queryPeptide = searchParams.get("peptide");
  const [amount, setAmount] = useState(() =>
    numericQueryParam(searchParams, "amount", "500"),
  );
  const [amountUnit, setAmountUnit] = useState<AmountUnit>(() =>
    amountUnitQueryParam(searchParams, "mcg"),
  );
  const [iuPerMg, setIuPerMg] = useState(() => {
    const value = searchParams.get("iuPerMg");
    if (!value) return "";
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? value : "";
  });
  const [vialMg, setVialMg] = useState(() =>
    numericQueryParam(searchParams, "vialMg", "10"),
  );
  const [waterMl, setWaterMl] = useState(() =>
    numericQueryParam(searchParams, "waterMl", "2"),
  );
  const [unitsPerMl, setUnitsPerMl] = useState(() =>
    numericQueryParam(searchParams, "unitsPerMl", "100"),
  );

  const result = useMemo<UnitConverterResult>(() => {
    const rawAmount = parseFloat(amount);
    const iuFactor = iuPerMg.trim() === "" ? null : parseFloat(iuPerMg);
    const vial = parseFloat(vialMg);
    const water = parseFloat(waterMl);
    const syringeScale = parseFloat(unitsPerMl);

    if (
      !Number.isFinite(rawAmount) ||
      !Number.isFinite(vial) ||
      !Number.isFinite(water) ||
      !Number.isFinite(syringeScale) ||
      rawAmount <= 0 ||
      vial <= 0 ||
      water <= 0 ||
      syringeScale <= 0
    ) {
      return null;
    }

    if (amountUnit === "iu" && (!iuFactor || iuFactor <= 0)) {
      return null;
    }

    if (iuFactor !== null && (!Number.isFinite(iuFactor) || iuFactor <= 0)) {
      return null;
    }

    const amountMg =
      amountUnit === "mg"
        ? rawAmount
        : amountUnit === "mcg"
          ? rawAmount / 1000
          : rawAmount / (iuFactor as number);
    const amountMcg = amountMg * 1000;
    const amountIu = iuFactor ? amountMg * iuFactor : null;
    const concentrationMgMl = vial / water;
    const concentrationMcgMl = concentrationMgMl * 1000;
    const volumeMl = amountMg / concentrationMgMl;
    const syringeUnits = volumeMl * syringeScale;

    return {
      amountMg,
      amountMcg,
      amountIu,
      concentrationMgMl,
      concentrationMcgMl,
      iuPerMg: iuFactor,
      mcgPerUnit: concentrationMcgMl / syringeScale,
      syringeUnits,
      vialMg: vial,
      volumeMl,
      waterMl: water,
    };
  }, [amount, amountUnit, iuPerMg, unitsPerMl, vialMg, waterMl]);

  const reset = () => {
    setAmount("500");
    setAmountUnit("mcg");
    setIuPerMg("");
    setVialMg("10");
    setWaterMl("2");
    setUnitsPerMl("100");
  };

  const applyAmountPreset = (preset: (typeof AMOUNT_PRESETS)[number]) => {
    setAmount(preset.value);
    setAmountUnit(preset.unit as AmountUnit);
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
              Unit converter
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              Peptide unit calculator
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

      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(380px,1fr)]">
        <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <PeptideShortcuts
            loadedPeptide={queryPeptide ? formatPeptideSlug(queryPeptide) : null}
            onSelect={applyPeptideShortcut}
          />

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <AmountField
              value={amount}
              unit={amountUnit}
              onValueChange={setAmount}
              onUnitChange={setAmountUnit}
            />
            <IuFactorField value={iuPerMg} onChange={setIuPerMg} />
            <Field
              label="Vial amount"
              unit="mg"
              value={vialMg}
              onChange={setVialMg}
              help="Total peptide in the vial."
            />
            <Field
              label="BAC water added"
              unit="mL"
              value={waterMl}
              onChange={setWaterMl}
              help="Total diluent added to the vial."
            />
          </div>

          <div className="mt-5">
            <SyringeScale value={unitsPerMl} onChange={setUnitsPerMl} />
          </div>

          <div className="mt-5 rounded-xl border border-line bg-canvas p-4">
            <p className="text-sm font-semibold text-ink-soft">Amount presets</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AMOUNT_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyAmountPreset(preset)}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-accent/45 hover:text-accent-bright"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-canvas/55 p-5 sm:p-6">
          <ResultPanel result={result} amountUnit={amountUnit} />
          <ReferenceTable />
        </div>
      </div>

      <div className="border-t border-line bg-surface px-5 py-3 sm:px-6">
        <p className="text-xs leading-relaxed text-muted">
          Educational math tool only. IU conversions require a product-specific
          IU-per-mg factor from the label or prescriber.
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
      <p className="text-sm font-semibold text-ink-soft">Peptide shortcuts</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-soft">
        Sets vial and BAC water examples only. Amount stays editable.
      </p>
      {loadedPeptide && (
        <p className="mt-1 text-xs font-medium text-accent-bright">
          Loaded editable {loadedPeptide} example.
        </p>
      )}
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

function AmountField({
  value,
  unit,
  onValueChange,
  onUnitChange,
}: {
  value: string;
  unit: AmountUnit;
  onValueChange: (v: string) => void;
  onUnitChange: (v: AmountUnit) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-soft">Amount to convert</span>
        <div className="flex h-12 items-center gap-2 rounded-lg border border-line bg-canvas pl-3 pr-2 focus-within:border-accent/70 focus-within:ring-2 focus-within:ring-accent/10">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent font-mono text-lg font-semibold text-ink outline-none placeholder:text-muted-soft"
          />
        </div>
      </label>
      <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-line bg-canvas p-1.5">
        {(["mg", "mcg", "iu"] as AmountUnit[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onUnitChange(option)}
            className={`rounded-md px-2 py-2 text-center text-sm font-semibold uppercase transition ${
              unit === option
                ? "bg-accent text-canvas shadow-card"
                : "text-muted hover:bg-surface hover:text-ink-soft"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <span className="text-xs leading-relaxed text-muted-soft">
        Convert mass, optional IU and syringe draw from one input.
      </span>
    </div>
  );
}

function IuFactorField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-soft">IU factor</span>
        <div className="flex h-12 items-center gap-2 rounded-lg border border-line bg-canvas pl-3 pr-2 focus-within:border-accent/70 focus-within:ring-2 focus-within:ring-accent/10">
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={value}
            placeholder="optional"
            onChange={(event) => onChange(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent font-mono text-lg font-semibold text-ink outline-none placeholder:text-muted-soft"
          />
          <span className="shrink-0 rounded-md border border-line bg-surface px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
            IU/mg
          </span>
        </div>
      </label>
      <div className="flex flex-wrap gap-1.5">
        {IU_FACTOR_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onChange(preset.value)}
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted transition hover:border-accent/40 hover:text-ink-soft"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <span className="text-xs leading-relaxed text-muted-soft">
        Needed only for IU input/output. Check the product label.
      </span>
    </div>
  );
}

function Field({
  label,
  unit,
  value,
  onChange,
  help,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  help: string;
}) {
  return (
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
      <span className="text-xs leading-relaxed text-muted-soft">{help}</span>
    </label>
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
      <span className="text-sm font-medium text-ink-soft">Syringe scale</span>
      <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-line bg-canvas p-1.5">
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
      <span className="text-xs leading-relaxed text-muted-soft">
        Use the scale printed on the syringe barrel.
      </span>
    </div>
  );
}

function ResultPanel({
  result,
  amountUnit,
}: {
  result: UnitConverterResult;
  amountUnit: AmountUnit;
}) {
  if (!result) {
    return (
      <div className="rounded-xl border border-line bg-surface-2 p-5">
        <p className="text-sm font-medium text-ink-soft">Conversion result</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Enter a valid amount, vial amount and water volume. IU input also
          needs a product-specific IU factor.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-accent/35 bg-accent-soft/40 p-5 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
            Draw to
          </p>
          <p className="mt-2 font-mono text-5xl font-semibold tracking-tight text-ink">
            {formatNumber(result.syringeUnits, 1)}
          </p>
          <p className="mt-1 text-sm text-muted">
            syringe units for {formatNumber(result.amountMcg, 0)} mcg
          </p>
        </div>
        <div className="rounded-lg border border-accent/25 bg-canvas/70 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-wider text-muted">Volume</p>
          <p className="mt-1 font-mono text-lg font-semibold text-accent-bright">
            {formatNumber(result.volumeMl, 3)} mL
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="mg" value={formatNumber(result.amountMg, 4)} />
        <Metric label="mcg" value={formatNumber(result.amountMcg, 0)} />
        <Metric
          label="IU"
          value={result.amountIu === null ? "Add factor" : formatNumber(result.amountIu, 2)}
        />
        <Metric label="mcg/unit" value={formatNumber(result.mcgPerUnit, 1)} />
        <Metric
          label="Concentration"
          value={`${formatNumber(result.concentrationMgMl, 2)} mg/mL`}
        />
        <Metric
          label="Vial mix"
          value={`${formatNumber(result.vialMg, 1)} mg / ${formatNumber(result.waterMl, 2)} mL`}
        />
      </div>

      {amountUnit === "iu" && !result.iuPerMg && (
        <div className="mt-4 rounded-lg border border-tint-amber-ink/35 bg-tint-amber px-3 py-2 text-sm leading-relaxed text-tint-amber-ink">
          IU input needs an IU-per-mg factor before it can be converted.
        </div>
      )}
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
      <h3 className="text-sm font-semibold text-ink-soft">Conversion reference</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border border-line bg-surface px-3 py-2 font-semibold text-ink">
                Conversion
              </th>
              <th className="border border-line bg-surface px-3 py-2 font-semibold text-ink">
                Formula
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                mg to mcg
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                mg x 1,000
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                mcg to mg
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                mcg / 1,000
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                syringe units
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                dose mL x syringe units per mL
              </td>
            </tr>
            <tr>
              <td className="border border-line px-3 py-2 font-mono text-ink-soft">
                IU
              </td>
              <td className="border border-line px-3 py-2 text-muted">
                mg x product-specific IU per mg
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}
