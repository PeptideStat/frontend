import Link from "next/link";
import type { Peptide } from "@/data/peptides";
import { ArrowRightIcon } from "@/components/icons";
import {
  buildAccumulationCalculatorHref,
  buildReconstitutionCalculatorHref,
  buildUnitConverterHref,
  getCalculatorPreset,
} from "@/lib/calculatorPresets";

interface CalculatorLinkItem {
  href: string;
  title: string;
  description: string;
}

function sectionClassName(className?: string): string {
  return className ?? "mt-10";
}

function getPresetLinks(peptide: Peptide): CalculatorLinkItem[] {
  const preset = getCalculatorPreset(peptide.slug);
  if (!preset) return [];

  const links: CalculatorLinkItem[] = [];
  const reconstitutionHref = buildReconstitutionCalculatorHref(preset);
  const accumulationHref = buildAccumulationCalculatorHref(preset);
  const unitHref = buildUnitConverterHref(preset);

  if (reconstitutionHref && preset.reconstitution) {
    links.push({
      href: reconstitutionHref,
      title: `${peptide.name} reconstitution calculator`,
      description: `Prefills a ${preset.reconstitution.vialMg} mg vial, ${preset.reconstitution.waterMl} mL BAC water and editable dose fields.`,
    });
  }

  if (accumulationHref && preset.accumulation) {
    links.push({
      href: accumulationHref,
      title: `${peptide.name} accumulation calculator`,
      description: `Prefills ${preset.accumulation.halfLifeHours} hour half-life and ${preset.accumulation.intervalHours} hour interval examples.`,
    });
  }

  if (unitHref && preset.unitConverter) {
    links.push({
      href: unitHref,
      title: `${peptide.name} unit converter`,
      description: `Prefills ${preset.unitConverter.amount} ${preset.unitConverter.amountUnit} with a ${preset.unitConverter.vialMg} mg vial example.`,
    });
  }

  return links;
}

export function CalculatorPresetLinks({
  peptides,
  title = "Calculator shortcuts",
  description = "Open calculators with peptide-specific example values already filled in. All values remain editable.",
  className,
  limit = 6,
}: {
  peptides: Peptide[];
  title?: string;
  description?: string;
  className?: string;
  limit?: number;
}) {
  const links = peptides.flatMap(getPresetLinks).slice(0, limit);

  if (links.length === 0) return null;

  return (
    <section className={sectionClassName(className)}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
          {description}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex min-h-full flex-col rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-accent/40"
          >
            <span className="text-sm font-semibold leading-6 text-ink group-hover:text-accent-bright">
              {link.title}
            </span>
            <span className="mt-2 text-xs leading-5 text-muted">
              {link.description}
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-accent">
              Open prefilled tool
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
