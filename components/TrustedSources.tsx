import { trustedSources } from "@/lib/data";

/**
 * Wordmark row of trusted sources — peptide-db.com uses university and
 * partner logos in this slot to establish credibility. We don't have logo
 * assets (and shouldn't host third-party marks without permission), so we
 * use clean wordmarks with a hairline divider above.
 */
export function TrustedSources() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
        Drawing on research from
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {trustedSources.map((source) => (
          <li
            key={source.name}
            className="text-sm font-semibold tracking-wide text-muted/80 sm:text-base"
          >
            {source.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
