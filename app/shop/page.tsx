import type { Metadata } from "next";
import Link from "next/link";
import { peptides, STATUS_LABELS } from "@/data/peptides";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { ArrowRightIcon, CATEGORY_ICONS } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";

const title = "Shop Peptides";
const description =
  "Find the right peptide for your goal — weight loss, healing, growth hormone, longevity or cognitive. Compare options and read where to buy each one.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/shop",
});

/**
 * Goal-oriented buying landing.
 *
 * Routes visitors from "what goal do I have?" to the right peptide and the
 * right buying guide. Affiliate CTAs slot in via per-peptide buying-guide
 * links once affiliate components and partnerships exist.
 */

interface ShopCategory {
  slug: string;
  title: string;
  description: string;
  icon: keyof typeof CATEGORY_ICONS;
  tint: "emerald" | "sky" | "violet" | "amber" | "rose" | "slate";
  /** Article slug to deep-link into when the visitor clicks. */
  buyingGuideSlug: string | null;
  /** Highlight peptides for this goal (slugs from the database). */
  featuredSlugs: string[];
}

const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "weight-loss",
    title: "Weight loss",
    description: "GLP-1, GIP and triple agonists — the modern obesity drugs.",
    icon: "weight",
    tint: "emerald",
    buyingGuideSlug: "where-to-get-glp-1-online",
    featuredSlugs: ["tirzepatide", "semaglutide", "retatrutide", "liraglutide"],
  },
  {
    slug: "healing-recovery",
    title: "Healing & recovery",
    description: "Tissue repair and recovery peptides — research grade.",
    icon: "spark",
    tint: "sky",
    buyingGuideSlug: "bpc-157",
    featuredSlugs: ["bpc-157", "tb-500"],
  },
  {
    slug: "growth-hormone",
    title: "Growth hormone",
    description: "GH secretagogues and GHRH analogs.",
    icon: "molecule",
    tint: "violet",
    buyingGuideSlug: "sermorelin-complete-guide",
    featuredSlugs: ["ipamorelin", "cjc-1295", "tesamorelin"],
  },
  {
    slug: "longevity",
    title: "Longevity",
    description: "Peptides marketed for healthspan and skin remodeling.",
    icon: "pulse",
    tint: "amber",
    buyingGuideSlug: null,
    featuredSlugs: ["ghk-cu"],
  },
  {
    slug: "cognitive",
    title: "Cognitive",
    description: "Nootropic peptides and neuroprotective compounds.",
    icon: "brain",
    tint: "rose",
    buyingGuideSlug: null,
    featuredSlugs: ["selank", "semax"],
  },
  {
    slug: "metabolic-health",
    title: "Metabolic health",
    description: "Glucose, insulin sensitivity and lipid markers.",
    icon: "flame",
    tint: "slate",
    buyingGuideSlug: "best-glp-1-for-weight-loss",
    featuredSlugs: ["tirzepatide", "semaglutide"],
  },
];

const TINT_BG: Record<string, string> = {
  emerald: "bg-tint-emerald text-tint-emerald-ink",
  sky: "bg-tint-sky text-tint-sky-ink",
  amber: "bg-tint-amber text-tint-amber-ink",
  violet: "bg-tint-violet text-tint-violet-ink",
  rose: "bg-tint-rose text-tint-rose-ink",
  slate: "bg-tint-slate text-tint-slate-ink",
};

export default function ShopPage() {
  const bySlug = Object.fromEntries(peptides.map((p) => [p.slug, p]));

  return (
    <>
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Shop by goal
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-soft">
            Many peptides discussed are prescription medications or research
            compounds. Click through to each peptide&apos;s buying guide for
            legal sourcing, pricing and provider information.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-16">
        {SHOP_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon];
          const tintClasses = TINT_BG[category.tint] ?? TINT_BG.emerald;
          const featured = category.featuredSlugs
            .map((slug) => bySlug[slug])
            .filter(Boolean);
          return (
            <div key={category.slug} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${tintClasses}`}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-ink">
                      {category.title}
                    </h2>
                    <p className="text-sm text-muted">{category.description}</p>
                  </div>
                </div>
                {category.buyingGuideSlug && (
                  <Link
                    href={`/peptides/${category.buyingGuideSlug}`}
                    className="hidden text-sm font-medium text-accent hover:text-accent-bright sm:inline-flex sm:items-center sm:gap-1"
                  >
                    Buying guide
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {featured.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-6 text-sm text-muted">
                    Buying guides for this category are in development.
                  </p>
                ) : (
                  featured.map((peptide) => {
                    const target =
                      peptide.articleSlug ?? category.buyingGuideSlug;
                    return (
                      <Link
                        key={peptide.slug}
                        href={target ? `/peptides/${target}` : "/database"}
                        className="group flex flex-col gap-2 rounded-xl border border-line bg-surface-2 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-base font-semibold tracking-tight text-ink group-hover:text-accent-bright">
                            {peptide.name}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                              peptide.status === "approved"
                                ? "border-tint-emerald-ink/40 bg-tint-emerald text-tint-emerald-ink"
                                : peptide.status === "investigational"
                                  ? "border-tint-amber-ink/40 bg-tint-amber text-tint-amber-ink"
                                  : "border-tint-slate-ink/40 bg-tint-slate text-tint-slate-ink"
                            }`}
                          >
                            {STATUS_LABELS[peptide.status]}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted">
                          {peptide.drugClass}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-accent">
                          {peptide.articleSlug ? "Read guide" : "Buying info"}
                          <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}

        <div className="rounded-xl border border-line bg-surface px-5 py-5 text-sm text-muted">
          <p>
            <strong className="text-ink-soft">Don&apos;t see what you&apos;re looking for?</strong>{" "}
            The{" "}
            <Link
              href="/database"
              className="font-medium text-accent hover:text-accent-bright"
            >
              full peptide database
            </Link>{" "}
            covers every compound we track, with filters for category, status
            and drug class. The{" "}
            <Link
              href="/peptides"
              className="font-medium text-accent hover:text-accent-bright"
            >
              guides index
            </Link>{" "}
            has the long-form breakdowns.
          </p>
        </div>
      </section>

      <DisclaimerBanner />
    </>
  );
}
