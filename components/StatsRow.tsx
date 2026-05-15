import { getSiteStats } from "@/lib/data";

/**
 * A horizontal row of headline numbers. peptide-db.com uses this slot to
 * establish scale ("101 peptides, 66 compounds…"). Ours mixes a live count
 * with the editorial cluster's stated targets.
 */
export function StatsRow() {
  const stats = getSiteStats();

  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
