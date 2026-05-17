import Link from "next/link";
import { featuredGuides } from "@/lib/data";
import { ArrowRightIcon } from "@/components/icons";

/**
 * "Featured guides" — analogous to peptide-db.com's "Tools" grid, but
 * surfacing the pillar articles since this is a blog rather than a tool
 * suite. Larger cards with a kicker, title, summary and arrow.
 */
export function FeaturedGuides() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              In depth
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Featured guides
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Long-form, evidence-led breakdowns of the peptides people search
              for most.
            </p>
          </div>
          <Link
            href="/peptides"
            className="hidden text-sm font-medium text-accent hover:text-accent-bright sm:block"
          >
            All guides &rarr;
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {guide.kicker}
              </span>
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-bright">
                {guide.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {guide.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read guide
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
