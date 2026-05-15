"use client";

import { useMemo, useState } from "react";

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
  const [vialMg, setVialMg] = useState("10");
  const [waterMl, setWaterMl] = useState("2");
  const [doseMg, setDoseMg] = useState("2.5");
  const [unitsPerMl, setUnitsPerMl] = useState("100"); // standard insulin syringe

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

    const concentration = vial / water; // mg per mL
    const volumeMl = dose / concentration;
    const units = volumeMl * upm;

    return {
      concentration,
      volumeMl,
      units,
      overdraw: volumeMl > water,
    };
  }, [vialMg, waterMl, doseMg, unitsPerMl]);

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Vial amount"
          unit="mg"
          value={vialMg}
          onChange={setVialMg}
          help="Total peptide in the vial (e.g., 10 mg)"
        />
        <Field
          label="Bacteriostatic water added"
          unit="mL"
          value={waterMl}
          onChange={setWaterMl}
          help="Volume of BAC water you mixed in (e.g., 2 mL)"
        />
        <Field
          label="Target dose"
          unit="mg"
          value={doseMg}
          onChange={setDoseMg}
          help="The amount you want to inject (e.g., 2.5 mg)"
        />
        <Field
          label="Syringe scale"
          unit="units/mL"
          value={unitsPerMl}
          onChange={setUnitsPerMl}
          help="100 for a standard insulin syringe; 50 for some half-unit syringes"
        />
      </div>

      <div className="mt-6 rounded-lg border border-line bg-canvas p-5">
        {result ? (
          <dl className="grid gap-3 sm:grid-cols-3">
            <Stat
              label="Concentration"
              value={`${result.concentration.toFixed(2)} mg/mL`}
            />
            <Stat
              label="Volume for dose"
              value={`${result.volumeMl.toFixed(3)} mL`}
            />
            <Stat
              label="Units on syringe"
              value={`${result.units.toFixed(1)} units`}
              accent
            />
          </dl>
        ) : (
          <p className="text-sm text-muted">
            Enter all four numbers above to see the dose calculation.
          </p>
        )}

        {result?.overdraw && (
          <p className="mt-4 rounded-md border border-tint-amber-ink/40 bg-tint-amber px-3 py-2 text-sm text-tint-amber-ink">
            Heads up — the requested dose volume ({result.volumeMl.toFixed(2)}{" "}
            mL) exceeds the total water you added ({waterMl} mL). That means
            the dose is more than one vial. Double-check vial strength, dose
            and water values.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Educational tool only. Always confirm dosing with your prescriber and
        follow the syringe scale stamped on your syringe. We don&apos;t store
        the values you type.
      </p>
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
      <div className="flex items-center gap-2 rounded-md border border-line bg-canvas pl-3 pr-2 focus-within:border-accent/60">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-soft"
        />
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          {unit}
        </span>
      </div>
      <span className="text-xs text-muted-soft">{help}</span>
    </label>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd
        className={`mt-1 font-mono text-lg font-semibold tracking-tight ${
          accent ? "text-accent-bright" : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
