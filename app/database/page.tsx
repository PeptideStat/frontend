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
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-16 lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Structured reference
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-ink">
              Peptide database
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-ink-soft">
              {description}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper p-5">
            <span className="text-4xl font-semibold tracking-[-0.04em] text-ink">
              {peptides.length}
            </span>
            <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
              structured records
            </span>
            <p className="mt-5 text-[10px] leading-5 text-muted-soft">
              Dose and half-life fields are trial or label reference points, not
              dosing recommendations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
                Browse by peptide category
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
                Start with a category hub for comparison tables, evidence scores
                and FAQ targeting the main research use cases.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {peptideCategoryHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/database/${hub.slug}`}
                className="group rounded-xl border border-line bg-surface-2 p-4 transition-colors hover:border-line-strong hover:bg-paper"
              >
                <span className="text-sm font-bold text-ink group-hover:text-cobalt">
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
