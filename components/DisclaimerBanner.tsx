import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <section className="border-b border-ink bg-lime text-ink">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr_auto] lg:items-center lg:px-8">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Read this first
        </h2>
        <p className="max-w-3xl text-xs leading-6 text-ink/75">
          PeptideStat is educational, not medical advice. Many compounds we cover
          are investigational or research-only and are not approved for human use.
          Partner links may earn us a commission without changing your price or
          our editorial conclusions.
        </p>
        <Link
          href="/disclaimer"
          className="w-fit border-b-2 border-ink pb-0.5 text-xs font-bold hover:text-cobalt"
        >
          Full disclosure →
        </Link>
      </div>
    </section>
  );
}
