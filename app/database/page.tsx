import type { Metadata } from "next";
import {
  CATEGORY_LABELS,
  peptides,
  type PeptideCategory,
} from "@/data/peptides";
import { PeptideDatabase } from "@/components/PeptideDatabase";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { buildMetadata } from "@/lib/seo";

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
      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
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
        <PeptideDatabase peptides={peptides} initialCategory={initialCategory} />
      </section>

      <DisclaimerBanner />
    </>
  );
}
