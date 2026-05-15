import Link from "next/link";
import { HeroSearchButton } from "@/components/HeroSearchButton";
import { popularQuestions } from "@/lib/data";
import { ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/site.config";

/**
 * The landing hero — modeled on peptide-db.com:
 * headline + descriptive sub + a search-shaped CTA + example question
 * chips. Sits over a subtle accent-tinted gradient with a faint grid.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-accent-soft/50 to-canvas">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-0 h-72 bg-gradient-to-b from-canvas/0 to-canvas"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {siteConfig.tagline}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Clear answers about peptides, grounded in real research.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Dosing, side effects, head-to-head comparisons and what trials
            actually show — written for people who want the truth without the
            forum noise.
          </p>

          <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <HeroSearchButton />
            <Link
              href="/peptides"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-ink px-5 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
            >
              Browse all guides
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-soft">
              Popular questions
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {popularQuestions.map((question) => (
                <Link
                  key={question.label}
                  href={question.href}
                  className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
                >
                  {question.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
