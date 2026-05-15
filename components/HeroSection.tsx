import Link from "next/link";
import { HeroSearchButton } from "@/components/HeroSearchButton";
import { popularQuestions } from "@/lib/data";
import { ArrowRightIcon } from "@/components/icons";
import { siteConfig } from "@/site.config";

/**
 * Landing hero on dark canvas.
 * Layered effects (bottom → top): solid canvas, light grid pattern, radial
 * accent glow behind the headline. The glow is the signature "premium dark"
 * touch — soft emerald light spilling down from the top of the section.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/80 px-3 py-1 text-xs font-medium text-ink-soft backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" aria-hidden />
            {siteConfig.tagline}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Clear answers about peptides,{" "}
            <span className="text-accent-bright">grounded in real research.</span>
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
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright"
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
                  className="rounded-full border border-line bg-surface-2/60 px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent hover:bg-surface-2 hover:text-accent-bright"
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
