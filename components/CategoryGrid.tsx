import Link from "next/link";
import { categories } from "@/lib/data";
import { ArrowRightIcon, CATEGORY_ICONS } from "@/components/icons";

export function CategoryGrid() {
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9 grid gap-5 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Browse by research area
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              Find the right place to start
            </h2>
          </div>
          <p className="text-sm leading-6 text-muted">
            Explore by outcome, mechanism, safety question or comparison. Every
            category connects to the same structured database.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.icon];

            return (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex min-h-56 flex-col rounded-xl border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-34px_rgba(17,23,19,.55)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] text-muted-soft">0{index + 1}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em] text-ink group-hover:text-accent">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {category.description}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold text-ink">
                  Explore
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href="/database"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-line-strong bg-paper px-5 text-sm font-bold text-ink transition-colors hover:border-ink"
          >
            View all database records
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
