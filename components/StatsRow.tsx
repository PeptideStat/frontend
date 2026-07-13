import { getSiteStats } from "@/lib/data";

export function StatsRow() {
  const stats = getSiteStats();

  return (
    <section className="border-b border-line bg-paper">
      <h2 className="sr-only">PeptideStat research library statistics</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative border-line px-2 py-6 even:border-l sm:px-5 lg:border-l lg:py-7 lg:first:border-l-0"
            >
              <span className="absolute right-3 top-4 font-mono text-[9px] text-muted-soft sm:right-5">
                /0{index + 1}
              </span>
              <dt className="mt-2 max-w-36 text-[10px] font-semibold uppercase leading-4 tracking-[0.13em] text-muted">
                {stat.label}
              </dt>
              <dd className="order-first text-3xl font-semibold leading-none tracking-[-0.04em] text-ink sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
