import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

const CALCULATOR_LINKS = [
  {
    href: "/calculators",
    title: "Peptide reconstitution calculator",
    description:
      "Calculate concentration, draw volume and syringe units from vial strength and BAC water.",
  },
  {
    href: "/calculators/accumulation",
    title: "Peptide accumulation calculator",
    description:
      "Model repeated dosing schedules with half-life, interval, peak and trough estimates.",
  },
  {
    href: "/calculators/unit-converter",
    title: "Peptide unit converter",
    description:
      "Convert mg, mcg, optional IU and syringe units from one reconstituted vial setup.",
  },
];

function sectionClassName(className?: string): string {
  return className ?? "mt-10";
}

export function RelatedCalculators({
  currentPath,
  title = "Related calculators",
  description = "Use the calculators alongside the database and guides to check unit math, vial concentration and repeated-dose accumulation.",
  className,
}: {
  currentPath?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  const links = CALCULATOR_LINKS.filter((link) => link.href !== currentPath);

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
              Open tool
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
