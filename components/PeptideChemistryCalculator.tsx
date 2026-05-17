"use client";

import { useMemo, useState } from "react";

type AminoAcid = {
  code: string;
  name: string;
  three: string;
  averageResidueMass: number;
  monoisotopicResidueMass: number;
  hydropathy: number;
  kind: "acidic" | "basic" | "hydrophobic" | "polar" | "special";
};

const WATER_AVERAGE_MASS = 18.01528;
const WATER_MONOISOTOPIC_MASS = 18.01056;
const PH_DEFAULT = "7.0";
const SAMPLE_SEQUENCE = "ACDEFGHIKLMNPQRSTVWY";

const AMINO_ACIDS: Record<string, AminoAcid> = {
  A: {
    code: "A",
    name: "Alanine",
    three: "Ala",
    averageResidueMass: 71.0788,
    monoisotopicResidueMass: 71.03711,
    hydropathy: 1.8,
    kind: "hydrophobic",
  },
  R: {
    code: "R",
    name: "Arginine",
    three: "Arg",
    averageResidueMass: 156.1875,
    monoisotopicResidueMass: 156.10111,
    hydropathy: -4.5,
    kind: "basic",
  },
  N: {
    code: "N",
    name: "Asparagine",
    three: "Asn",
    averageResidueMass: 114.1038,
    monoisotopicResidueMass: 114.04293,
    hydropathy: -3.5,
    kind: "polar",
  },
  D: {
    code: "D",
    name: "Aspartic acid",
    three: "Asp",
    averageResidueMass: 115.0886,
    monoisotopicResidueMass: 115.02694,
    hydropathy: -3.5,
    kind: "acidic",
  },
  C: {
    code: "C",
    name: "Cysteine",
    three: "Cys",
    averageResidueMass: 103.1388,
    monoisotopicResidueMass: 103.00919,
    hydropathy: 2.5,
    kind: "polar",
  },
  E: {
    code: "E",
    name: "Glutamic acid",
    three: "Glu",
    averageResidueMass: 129.1155,
    monoisotopicResidueMass: 129.04259,
    hydropathy: -3.5,
    kind: "acidic",
  },
  Q: {
    code: "Q",
    name: "Glutamine",
    three: "Gln",
    averageResidueMass: 128.1307,
    monoisotopicResidueMass: 128.05858,
    hydropathy: -3.5,
    kind: "polar",
  },
  G: {
    code: "G",
    name: "Glycine",
    three: "Gly",
    averageResidueMass: 57.0519,
    monoisotopicResidueMass: 57.02146,
    hydropathy: -0.4,
    kind: "special",
  },
  H: {
    code: "H",
    name: "Histidine",
    three: "His",
    averageResidueMass: 137.1411,
    monoisotopicResidueMass: 137.05891,
    hydropathy: -3.2,
    kind: "basic",
  },
  I: {
    code: "I",
    name: "Isoleucine",
    three: "Ile",
    averageResidueMass: 113.1594,
    monoisotopicResidueMass: 113.08406,
    hydropathy: 4.5,
    kind: "hydrophobic",
  },
  L: {
    code: "L",
    name: "Leucine",
    three: "Leu",
    averageResidueMass: 113.1594,
    monoisotopicResidueMass: 113.08406,
    hydropathy: 3.8,
    kind: "hydrophobic",
  },
  K: {
    code: "K",
    name: "Lysine",
    three: "Lys",
    averageResidueMass: 128.1741,
    monoisotopicResidueMass: 128.09496,
    hydropathy: -3.9,
    kind: "basic",
  },
  M: {
    code: "M",
    name: "Methionine",
    three: "Met",
    averageResidueMass: 131.1926,
    monoisotopicResidueMass: 131.04049,
    hydropathy: 1.9,
    kind: "hydrophobic",
  },
  F: {
    code: "F",
    name: "Phenylalanine",
    three: "Phe",
    averageResidueMass: 147.1766,
    monoisotopicResidueMass: 147.06841,
    hydropathy: 2.8,
    kind: "hydrophobic",
  },
  P: {
    code: "P",
    name: "Proline",
    three: "Pro",
    averageResidueMass: 97.1167,
    monoisotopicResidueMass: 97.05276,
    hydropathy: -1.6,
    kind: "special",
  },
  S: {
    code: "S",
    name: "Serine",
    three: "Ser",
    averageResidueMass: 87.0782,
    monoisotopicResidueMass: 87.03203,
    hydropathy: -0.8,
    kind: "polar",
  },
  T: {
    code: "T",
    name: "Threonine",
    three: "Thr",
    averageResidueMass: 101.1051,
    monoisotopicResidueMass: 101.04768,
    hydropathy: -0.7,
    kind: "polar",
  },
  W: {
    code: "W",
    name: "Tryptophan",
    three: "Trp",
    averageResidueMass: 186.2132,
    monoisotopicResidueMass: 186.07931,
    hydropathy: -0.9,
    kind: "hydrophobic",
  },
  Y: {
    code: "Y",
    name: "Tyrosine",
    three: "Tyr",
    averageResidueMass: 163.176,
    monoisotopicResidueMass: 163.06333,
    hydropathy: -1.3,
    kind: "polar",
  },
  V: {
    code: "V",
    name: "Valine",
    three: "Val",
    averageResidueMass: 99.1326,
    monoisotopicResidueMass: 99.06841,
    hydropathy: 4.2,
    kind: "hydrophobic",
  },
};

const THREE_TO_ONE = Object.values(AMINO_ACIDS).reduce<Record<string, string>>(
  (acc, aminoAcid) => {
    acc[aminoAcid.three.toLowerCase()] = aminoAcid.code;
    return acc;
  },
  {},
);

const PKAS = {
  cTerm: 2.34,
  nTerm: 9.69,
  C: 8.33,
  D: 3.86,
  E: 4.25,
  H: 6.0,
  K: 10.5,
  R: 12.4,
  Y: 10.07,
};

function parseSequence(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    return { sequence: "", invalidTokens: [] as string[] };
  }

  const compact = trimmed.replace(/[^A-Za-z]/g, "");
  const tokenized = trimmed
    .split(/[\s,\-.]+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const hasThreeLetterTokens = tokenized.some((token) => token.length > 1);

  if (hasThreeLetterTokens) {
    const codes: string[] = [];
    const invalidTokens: string[] = [];

    tokenized.forEach((token) => {
      const oneLetter = THREE_TO_ONE[token.toLowerCase()];
      const upper = token.toUpperCase();

      if (oneLetter) {
        codes.push(oneLetter);
      } else if (upper.length === 1 && AMINO_ACIDS[upper]) {
        codes.push(upper);
      } else {
        invalidTokens.push(token);
      }
    });

    return { sequence: codes.join(""), invalidTokens };
  }

  const invalidTokens = [...compact.toUpperCase()].filter(
    (code) => !AMINO_ACIDS[code],
  );
  const sequence = [...compact.toUpperCase()]
    .filter((code) => AMINO_ACIDS[code])
    .join("");

  return { sequence, invalidTokens };
}

function acidFraction(pH: number, pKa: number) {
  return 1 / (1 + 10 ** (pKa - pH));
}

function baseFraction(pH: number, pKa: number) {
  return 1 / (1 + 10 ** (pH - pKa));
}

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function analyzeSequence(input: string, pHInput: string) {
  const { sequence, invalidTokens } = parseSequence(input);
  const residues = [...sequence].map((code) => AMINO_ACIDS[code]);
  const length = residues.length;
  const pH = Number.parseFloat(pHInput);
  const safePH = Number.isFinite(pH) ? Math.min(14, Math.max(0, pH)) : 7;

  if (length === 0) {
    return {
      invalidTokens,
      length,
      sequence,
      threeLetter: "",
      averageMass: 0,
      monoisotopicMass: 0,
      gravy: 0,
      netCharge: 0,
      extinctionReduced: 0,
      extinctionOxidized: 0,
      counts: {} as Record<string, number>,
      kindCounts: {} as Record<AminoAcid["kind"], number>,
      pH: safePH,
    };
  }

  const counts: Record<string, number> = {};
  const kindCounts: Record<AminoAcid["kind"], number> = {
    acidic: 0,
    basic: 0,
    hydrophobic: 0,
    polar: 0,
    special: 0,
  };

  residues.forEach((aminoAcid) => {
    counts[aminoAcid.code] = (counts[aminoAcid.code] ?? 0) + 1;
    kindCounts[aminoAcid.kind] += 1;
  });

  const residueAverageMass = residues.reduce(
    (sum, aminoAcid) => sum + aminoAcid.averageResidueMass,
    0,
  );
  const residueMonoisotopicMass = residues.reduce(
    (sum, aminoAcid) => sum + aminoAcid.monoisotopicResidueMass,
    0,
  );
  const hydropathySum = residues.reduce(
    (sum, aminoAcid) => sum + aminoAcid.hydropathy,
    0,
  );

  const positiveCharge =
    baseFraction(safePH, PKAS.nTerm) +
    (counts.K ?? 0) * baseFraction(safePH, PKAS.K) +
    (counts.R ?? 0) * baseFraction(safePH, PKAS.R) +
    (counts.H ?? 0) * baseFraction(safePH, PKAS.H);
  const negativeCharge =
    acidFraction(safePH, PKAS.cTerm) +
    (counts.D ?? 0) * acidFraction(safePH, PKAS.D) +
    (counts.E ?? 0) * acidFraction(safePH, PKAS.E) +
    (counts.C ?? 0) * acidFraction(safePH, PKAS.C) +
    (counts.Y ?? 0) * acidFraction(safePH, PKAS.Y);

  const tryptophan = counts.W ?? 0;
  const tyrosine = counts.Y ?? 0;
  const cysteine = counts.C ?? 0;
  const possibleCystines = Math.floor(cysteine / 2);

  return {
    invalidTokens,
    length,
    sequence,
    threeLetter: residues.map((aminoAcid) => aminoAcid.three).join("-"),
    averageMass: residueAverageMass + WATER_AVERAGE_MASS,
    monoisotopicMass: residueMonoisotopicMass + WATER_MONOISOTOPIC_MASS,
    gravy: hydropathySum / length,
    netCharge: positiveCharge - negativeCharge,
    extinctionReduced: tryptophan * 5500 + tyrosine * 1490,
    extinctionOxidized:
      tryptophan * 5500 + tyrosine * 1490 + possibleCystines * 125,
    counts,
    kindCounts,
    pH: safePH,
  };
}

const AMINO_ACID_ORDER = [
  "A",
  "R",
  "N",
  "D",
  "C",
  "E",
  "Q",
  "G",
  "H",
  "I",
  "L",
  "K",
  "M",
  "F",
  "P",
  "S",
  "T",
  "W",
  "Y",
  "V",
];

export function PeptideChemistryCalculator() {
  const [input, setInput] = useState(SAMPLE_SEQUENCE);
  const [pH, setPH] = useState(PH_DEFAULT);

  const analysis = useMemo(() => analyzeSequence(input, pH), [input, pH]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-card">
      <div className="border-b border-line bg-surface px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Sequence chemistry
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              Peptide sequence calculator
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setInput(SAMPLE_SEQUENCE);
              setPH(PH_DEFAULT);
            }}
            className="inline-flex h-9 items-center justify-center rounded-md border border-line bg-canvas px-3 text-sm font-medium text-ink-soft transition hover:border-accent/50 hover:text-ink"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
        <div className="border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <label
            htmlFor="peptide-sequence"
            className="text-sm font-semibold text-ink"
          >
            Amino acid sequence
          </label>
          <textarea
            id="peptide-sequence"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={7}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-lg border border-line bg-canvas px-3 py-3 font-mono text-sm leading-6 text-ink outline-none transition focus:border-accent/60"
            placeholder="Paste one-letter sequence, or three-letter tokens like Ala-Gly-Ser"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
            <div className="rounded-lg border border-line bg-canvas p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Accepted formats
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                One-letter sequences like <code>ACDEFGHIK</code>, or
                three-letter tokens like <code>Ala-Gly-Ser</code>. Unknown or
                ambiguous residues are ignored and flagged.
              </p>
            </div>
            <label className="rounded-lg border border-line bg-canvas p-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Charge pH
              </span>
              <input
                type="number"
                min="0"
                max="14"
                step="0.1"
                value={pH}
                onChange={(event) => setPH(event.target.value)}
                className="mt-2 h-10 w-full rounded-md border border-line bg-surface-2 px-3 text-sm text-ink outline-none focus:border-accent/60"
              />
            </label>
          </div>

          {analysis.invalidTokens.length > 0 && (
            <div className="mt-4 rounded-lg border border-tint-amber-ink/35 bg-tint-amber px-4 py-3 text-sm text-tint-amber-ink">
              Ignored unknown tokens: {analysis.invalidTokens.join(", ")}
            </div>
          )}

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Residues" value={String(analysis.length)} />
            <Metric
              label="Average mass"
              value={`${formatNumber(analysis.averageMass)} Da`}
            />
            <Metric
              label="Mono mass"
              value={`${formatNumber(analysis.monoisotopicMass)} Da`}
            />
            <Metric
              label={`Net charge at pH ${formatNumber(analysis.pH, 1)}`}
              value={formatNumber(analysis.netCharge, 2)}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Metric
              label="GRAVY hydropathy"
              value={formatNumber(analysis.gravy, 2)}
              help="Positive values are more hydrophobic on the Kyte-Doolittle scale."
            />
            <Metric
              label="Extinction coefficient"
              value={`${Math.round(analysis.extinctionReduced).toLocaleString()} M-1 cm-1`}
              help="Reduced estimate at 280 nm from Trp and Tyr."
            />
          </div>

          <div className="mt-5 rounded-lg border border-line bg-canvas p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Converted sequence
            </p>
            <p className="mt-2 break-all font-mono text-sm leading-6 text-ink">
              {analysis.sequence || "No valid residues yet"}
            </p>
            <p className="mt-3 break-words text-xs leading-5 text-muted">
              {analysis.threeLetter || "Three-letter output appears here."}
            </p>
          </div>
        </div>

        <div className="bg-canvas/55 p-5 sm:p-6">
          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <h3 className="text-base font-semibold tracking-tight text-ink">
              Composition
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 lg:grid-cols-2">
              {AMINO_ACID_ORDER.map((code) => {
                const aminoAcid = AMINO_ACIDS[code];
                const count = analysis.counts[code] ?? 0;
                return (
                  <div
                    key={code}
                    className="rounded-md border border-line bg-canvas px-2.5 py-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-semibold text-ink">
                        {code}
                      </span>
                      <span className="text-muted">{count}</span>
                    </div>
                    <p className="mt-1 truncate text-muted-soft">
                      {aminoAcid.three}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface-2 p-4">
            <h3 className="text-base font-semibold tracking-tight text-ink">
              Property groups
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <PropertyRow label="Hydrophobic" value={analysis.kindCounts.hydrophobic} />
              <PropertyRow label="Polar" value={analysis.kindCounts.polar} />
              <PropertyRow label="Acidic" value={analysis.kindCounts.acidic} />
              <PropertyRow label="Basic" value={analysis.kindCounts.basic} />
              <PropertyRow label="Special" value={analysis.kindCounts.special} />
            </dl>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface p-4">
            <h3 className="text-sm font-semibold text-ink">
              Calculation notes
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-5 text-muted">
              <li>Mass assumes a linear peptide with free N- and C-termini.</li>
              <li>Modified residues, salts, labels and terminal caps are not included.</li>
              <li>Charge is a Henderson-Hasselbalch estimate, not a measured pI.</li>
              <li>
                Oxidized extinction estimate would be{" "}
                {Math.round(analysis.extinctionOxidized).toLocaleString()} M-1
                cm-1 if cysteine pairs form cystines.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  help,
}: {
  label: string;
  value: string;
  help?: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
        {value}
      </p>
      {help && <p className="mt-2 text-xs leading-5 text-muted">{help}</p>}
    </div>
  );
}

function PropertyRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-line/70 pb-2 last:border-b-0 last:pb-0">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono text-ink-soft">{value}</dd>
    </div>
  );
}
