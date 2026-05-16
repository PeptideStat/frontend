import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const title = "About";
const description = `How ${siteConfig.name} researches and writes about peptides — our editorial standards, sourcing and affiliate disclosure.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        About {siteConfig.name}
      </h1>

      <div className="mt-6 space-y-4 leading-7 text-ink-soft">
        <p>
          {siteConfig.name} exists to make peptide research readable. The space
          is full of forum lore, marketing copy and outdated information — we
          translate what the actual studies and clinical data say into clear,
          structured guides.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          How we research
        </h2>
        <p>
          Every guide is built around a specific question people are asking. We
          prioritise peer-reviewed studies, regulatory filings and manufacturer
          data over anecdote, and we cite sources so you can check the work.
          Articles are dated and reviewed for accuracy as new evidence emerges.
          Read the full{" "}
          <Link
            href="/editorial-policy"
            className="font-semibold text-accent-bright underline underline-offset-4"
          >
            editorial policy
          </Link>
          .
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          Editorial team
        </h2>
        <p>
          PeptideStat guides are published by the{" "}
          <Link
            href="/authors/peptidestat-editorial-team"
            className="font-semibold text-accent-bright underline underline-offset-4"
          >
            PeptideStat Editorial Team
          </Link>
          . Our pages are source-led and written to distinguish approved drugs,
          investigational compounds and research-only peptides.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          Medical disclaimer
        </h2>
        <p>
          Nothing on {siteConfig.name} is medical advice. Many peptides
          discussed are research compounds not approved for human use. Always
          consult a qualified healthcare professional before making health
          decisions.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          Affiliate disclosure
        </h2>
        <p>
          Some articles contain affiliate links. If you buy through them we may
          earn a commission at no extra cost to you. This never changes our
          editorial assessment — recommendations are based on research, not
          commissions.
        </p>
      </div>
    </div>
  );
}
