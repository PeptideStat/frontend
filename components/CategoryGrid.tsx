import Link from "next/link";
import { categories } from "@/lib/data";
import { CATEGORY_ICONS } from "@/components/icons";

/**
 * "Explore by category" — the 8-card grid pattern from peptide-db.com.
 * Each card has a tinted icon chip + title + one-line description.
 *
 * Tints come from `--color-tint-*` CSS variables defined in globals.css
 * and are mapped here so the data layer stays clean. We do not pass raw
 * Tailwind class strings through props (would defeat content scanning).
 */

const TINT_BG: Record<string, string> = {
  emerald: "bg-tint-emerald text-tint-emerald-ink",
  sky: "bg-tint-sky text-tint-sky-ink",
  amber: "bg-tint-amber text-tint-amber-ink",
  violet: "bg-tint-violet text-tint-violet-ink",
  rose: "bg-tint-rose text-tint-rose-ink",
  slate: "bg-tint-slate text-tint-slate-ink",
};

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
            Topics
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Explore by category
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Every peptide we cover sits inside a research topic — pick a
            direction and dive in.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon];
          const tintClasses = TINT_BG[category.tint] ?? TINT_BG.emerald;
          return (
            <Link
              key={category.slug}
              href={category.href}
              className="group flex flex-col gap-3 rounded-xl border border-line bg-canvas p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${tintClasses}`}
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-dark">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
