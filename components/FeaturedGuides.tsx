import Link from "next/link";
import { featuredGuides } from "@/lib/data";
import { ArrowRightIcon } from "@/components/icons";

export function FeaturedGuides() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              Start here
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              Four useful guides
            </h2>
          </div>
          <Link
            href="/peptides"
            className="group hidden items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-accent sm:flex"
          >
            View full index
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ol className="grid gap-4 md:grid-cols-2">
          {featuredGuides.map((guide, index) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="group flex min-h-56 flex-col rounded-xl border border-line bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-34px_rgba(17,23,19,.55)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-accent">
                    {guide.kicker}
                  </span>
                  <span className="font-mono text-[10px] text-muted-soft">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold leading-[1.08] tracking-[-0.03em] text-ink group-hover:text-accent sm:text-3xl">
                  {guide.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                  {guide.description}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold text-ink">
                  Read guide
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
