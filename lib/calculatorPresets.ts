export type AmountUnit = "mg" | "mcg" | "iu";

export interface CalculatorPreset {
  slug: string;
  label: string;
  reconstitution?: {
    vialMg: string;
    waterMl: string;
    doseMg: string;
    unitsPerMl?: string;
  };
  accumulation?: {
    doseMg: string;
    halfLifeHours: string;
    intervalHours: string;
    durationDays?: string;
  };
  unitConverter?: {
    amount: string;
    amountUnit: AmountUnit;
    vialMg: string;
    waterMl: string;
    unitsPerMl?: string;
  };
}

export const calculatorPresets: Record<string, CalculatorPreset> = {
  semaglutide: {
    slug: "semaglutide",
    label: "Semaglutide",
    reconstitution: { vialMg: "5", waterMl: "2", doseMg: "0.25" },
    accumulation: {
      doseMg: "0.25",
      halfLifeHours: "168",
      intervalHours: "168",
      durationDays: "84",
    },
    unitConverter: {
      amount: "250",
      amountUnit: "mcg",
      vialMg: "5",
      waterMl: "2",
    },
  },
  tirzepatide: {
    slug: "tirzepatide",
    label: "Tirzepatide",
    reconstitution: { vialMg: "10", waterMl: "2", doseMg: "2.5" },
    accumulation: {
      doseMg: "2.5",
      halfLifeHours: "120",
      intervalHours: "168",
      durationDays: "84",
    },
    unitConverter: {
      amount: "2.5",
      amountUnit: "mg",
      vialMg: "10",
      waterMl: "2",
    },
  },
  retatrutide: {
    slug: "retatrutide",
    label: "Retatrutide",
    reconstitution: { vialMg: "10", waterMl: "2", doseMg: "1" },
    accumulation: {
      doseMg: "1",
      halfLifeHours: "144",
      intervalHours: "168",
      durationDays: "84",
    },
    unitConverter: {
      amount: "1",
      amountUnit: "mg",
      vialMg: "10",
      waterMl: "2",
    },
  },
  liraglutide: {
    slug: "liraglutide",
    label: "Liraglutide",
    accumulation: {
      doseMg: "0.6",
      halfLifeHours: "13",
      intervalHours: "24",
      durationDays: "28",
    },
  },
  cagrilintide: {
    slug: "cagrilintide",
    label: "Cagrilintide",
    accumulation: {
      doseMg: "0.3",
      halfLifeHours: "168",
      intervalHours: "168",
      durationDays: "84",
    },
  },
  survodutide: {
    slug: "survodutide",
    label: "Survodutide",
    accumulation: {
      doseMg: "0.6",
      halfLifeHours: "168",
      intervalHours: "168",
      durationDays: "84",
    },
  },
  "bpc-157": {
    slug: "bpc-157",
    label: "BPC-157",
    reconstitution: { vialMg: "10", waterMl: "2", doseMg: "0.5" },
    unitConverter: {
      amount: "500",
      amountUnit: "mcg",
      vialMg: "10",
      waterMl: "2",
    },
  },
  "tb-500": {
    slug: "tb-500",
    label: "TB-500",
    reconstitution: { vialMg: "5", waterMl: "2", doseMg: "2" },
    unitConverter: {
      amount: "2",
      amountUnit: "mg",
      vialMg: "5",
      waterMl: "2",
    },
  },
  ipamorelin: {
    slug: "ipamorelin",
    label: "Ipamorelin",
    reconstitution: { vialMg: "5", waterMl: "2", doseMg: "0.1" },
    accumulation: {
      doseMg: "0.1",
      halfLifeHours: "2",
      intervalHours: "24",
      durationDays: "14",
    },
    unitConverter: {
      amount: "100",
      amountUnit: "mcg",
      vialMg: "5",
      waterMl: "2",
    },
  },
  "cjc-1295": {
    slug: "cjc-1295",
    label: "CJC-1295",
    reconstitution: { vialMg: "5", waterMl: "2", doseMg: "1" },
    accumulation: {
      doseMg: "1",
      halfLifeHours: "168",
      intervalHours: "168",
      durationDays: "84",
    },
    unitConverter: {
      amount: "1",
      amountUnit: "mg",
      vialMg: "5",
      waterMl: "2",
    },
  },
};

export function getCalculatorPreset(slug: string) {
  return calculatorPresets[slug] ?? null;
}

export function buildReconstitutionCalculatorHref(preset: CalculatorPreset) {
  if (!preset.reconstitution) return null;

  const params = new URLSearchParams({
    peptide: preset.slug,
    vialMg: preset.reconstitution.vialMg,
    waterMl: preset.reconstitution.waterMl,
    doseMg: preset.reconstitution.doseMg,
    unitsPerMl: preset.reconstitution.unitsPerMl ?? "100",
  });

  return `/calculators?${params.toString()}#reconstitution`;
}

export function buildAccumulationCalculatorHref(preset: CalculatorPreset) {
  if (!preset.accumulation) return null;

  const params = new URLSearchParams({
    peptide: preset.slug,
    doseMg: preset.accumulation.doseMg,
    halfLifeHours: preset.accumulation.halfLifeHours,
    intervalHours: preset.accumulation.intervalHours,
    durationDays: preset.accumulation.durationDays ?? "84",
  });

  return `/calculators/accumulation?${params.toString()}`;
}

export function buildUnitConverterHref(preset: CalculatorPreset) {
  if (!preset.unitConverter) return null;

  const params = new URLSearchParams({
    peptide: preset.slug,
    amount: preset.unitConverter.amount,
    amountUnit: preset.unitConverter.amountUnit,
    vialMg: preset.unitConverter.vialMg,
    waterMl: preset.unitConverter.waterMl,
    unitsPerMl: preset.unitConverter.unitsPerMl ?? "100",
  });

  return `/calculators/unit-converter?${params.toString()}`;
}
