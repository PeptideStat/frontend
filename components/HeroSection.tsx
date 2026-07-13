import Link from "next/link";
import { HeroSearchButton } from "@/components/HeroSearchButton";
import { popularQuestions, getSiteStats } from "@/lib/data";
import { peptides, STATUS_LABELS } from "@/data/peptides";
import { ArrowRightIcon } from "@/components/icons";

const quickStarts = popularQuestions.filter((question) =>
  [
    "BPC-157 vs TB-500",
    "Semaglutide vs Tirzepatide",
    "Retatrutide dosing schedule",
  ].includes(question.label),
);

export function HeroSection() {
  const guideCount = getSiteStats()[0]?.value ?? "200+";
  const spotlight = peptides.find((peptide) => peptide.slug === "retatrutide");

  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,.98fr)] lg:items-center lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <div className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            Independent peptide research database
          </div>

          <h1 className="max-w-3xl text-[clamp(3.15rem,6.3vw,6.4rem)] font-semibold leading-[0.93] tracking-[-0.065em] text-ink">
            Research peptides with less guesswork.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
            Search {guideCount} evidence-led guides, structured compound profiles,
            safety context and practical calculators in one clear research hub.
          </p>

          <div className="mt-8 max-w-2xl">
            <HeroSearchButton />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/database"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-bold text-white transition-colors hover:bg-accent"
            >
              Explore the database
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/calculators"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-line-strong bg-paper px-5 text-sm font-bold text-ink transition-colors hover:border-ink"
            >
              Calculators &amp; tools
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-soft">
              Popular
            </span>
            {quickStarts.map((question) => (
              <Link
                key={question.label}
                href={question.href}
                className="text-xs font-semibold text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
              >
                {question.label}
              </Link>
            ))}
          </div>
        </div>

        {spotlight && (
          <aside className="rounded-2xl border border-line bg-paper p-3 shadow-[0_24px_70px_-45px_rgba(17,23,19,.5)]">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Database preview
              </div>
              <span className="font-mono text-[10px] text-muted-soft">PS / 001</span>
            </div>

            <div className="rounded-xl border border-line bg-surface-2 p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                    Most researched this week
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                    {spotlight.name}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {spotlight.aliases}
                  </p>
                </div>
                <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-800">
                  {STATUS_LABELS[spotlight.status]}
                </span>
              </div>

              <p className="mt-6 text-sm leading-6 text-ink-soft">
                {spotlight.mechanism}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {spotlight.targets.map((target) => (
                  <span
                    key={target}
                    className="rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-[11px] font-semibold text-ink-soft"
                  >
                    {target}
                  </span>
                ))}
              </div>

              <dl className="mt-7 grid grid-cols-3 divide-x divide-line border-y border-line py-4">
                <div className="pr-3">
                  <dt className="text-[9px] font-bold uppercase tracking-[0.13em] text-muted-soft">
                    Half-life
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{spotlight.halfLife}</dd>
                </div>
                <div className="px-3">
                  <dt className="text-[9px] font-bold uppercase tracking-[0.13em] text-muted-soft">
                    Route
                  </dt>
                  <dd className="mt-1 truncate text-sm font-semibold text-ink">
                    {spotlight.routeOfAdministration}
                  </dd>
                </div>
                <div className="pl-3">
                  <dt className="text-[9px] font-bold uppercase tracking-[0.13em] text-muted-soft">
                    Developer
                  </dt>
                  <dd className="mt-1 truncate text-sm font-semibold text-ink">
                    {spotlight.developer}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Link
                  href={`/database/${spotlight.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-ink px-4 text-sm font-bold text-white transition-colors hover:bg-accent"
                >
                  View compound profile
                </Link>
                <Link
                  href={
                    spotlight.articleSlug
                      ? `/peptides/${spotlight.articleSlug}`
                      : `/database/${spotlight.slug}`
                  }
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-line-strong bg-paper px-4 text-sm font-bold text-ink transition-colors hover:border-ink"
                >
                  Read research guide
                </Link>
              </div>
            </div>

            <p className="px-3 pb-2 pt-4 text-[10px] leading-5 text-muted-soft">
              Reference values come from published trials and regulatory records;
              they are not dosing recommendations.
            </p>
          </aside>
        )}
      </div>
    </section>
  );
}
