import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORY_LABELS,
  peptides,
  type PeptideCategory,
} from "@/data/peptides";
import { peptideCategoryHubs } from "@/data/peptideCategoryHubs";
import { PeptideDatabase } from "@/components/PeptideDatabase";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { buildMetadata } from "@/lib/seo";
import { shopUrl } from "@/site.config";

const title = "Peptide database";
const description =
  "Browse every peptide we cover — search and filter by category, status and class. Mechanism, half-life, dosing reference and links to in-depth guides.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/database",
});

/**
 * Reading `searchParams` makes this page render per-request rather than as
 * a static prerender, but it avoids the `useSearchParams` CSR bailout that
 * would otherwise hide the entire table from the initial HTML. The trade-
 * off is right for SEO: the table contents need to be in the source.
 */
export default async function DatabasePage(
  props: PageProps<"/database">,
) {
  const params = await props.searchParams;
  const requested = params.category;
  const initialCategory: PeptideCategory | null =
    typeof requested === "string" && requested in CATEGORY_LABELS
      ? (requested as PeptideCategory)
      : null;

  return (
    <>
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Reference
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-soft">
            Dose ranges and half-life values are reference points from trial
            protocols and approved labels — not dosing recommendations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                Browse by peptide category
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
                Start with a category hub for comparison tables, evidence scores
                and FAQ targeting the main research use cases.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {peptideCategoryHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/database/${hub.slug}`}
                className="group rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-accent/40"
              >
                <span className="text-sm font-semibold text-ink group-hover:text-accent-bright">
                  {hub.title}
                </span>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">
                  {hub.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <PeptideDatabase
          peptides={peptides}
          shopHref={shopUrl}
          initialCategory={initialCategory}
        />
      </section>

      <DisclaimerBanner />
    </>
  );
}
