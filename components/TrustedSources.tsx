import { trustedSources } from "@/lib/data";
import { externalLinkRel } from "@/lib/externalLinks";

export function TrustedSources() {
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[190px_1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Sources we read
            </p>
            <p className="mt-1 text-xs text-muted-soft">Sources, not sponsors.</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {trustedSources.map((source) => (
              <li key={source.name}>
                <a
                  href={source.url}
                  target="_blank"
                  rel={externalLinkRel(source.url)}
                  className="flex h-10 items-center justify-center rounded-lg border border-line bg-paper px-3 text-center text-[10px] font-bold uppercase tracking-[0.07em] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
