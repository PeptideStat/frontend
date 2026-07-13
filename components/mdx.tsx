import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { externalLinkRel, isSponsoredHref } from "@/lib/externalLinks";
import { ProviderTable } from "@/components/ProviderTable";
import { WeightLossChart } from "@/components/WeightLossChart";

/**
 * Component map passed to <MDXRemote />. Styles raw markdown elements so
 * articles get consistent typography without a global prose stylesheet.
 *
 * Affiliate-specific components (CTA boxes, comparison tables, disclosure
 * banners) can be added to this map later and used directly inside .mdx files.
 */

type AnchorProps = ComponentPropsWithoutRef<"a">;

interface ProtocolProductProps {
  badge?: string;
  children: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  description?: string;
  imageAlt: string;
  imageSrc: string;
  label: string;
  title: string;
}

function MdxLink({ href = "", children, ...props }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="font-semibold text-cobalt underline decoration-cobalt/35 underline-offset-4 hover:text-ink"
      >
        {children}
      </Link>
    );
  }

  // Paid/referral links are qualified; editorial source links stay followable.
  const isSponsored = isSponsoredHref(href);
  return (
    <a
      href={href}
      target="_blank"
      rel={externalLinkRel(href)}
      data-affiliate-placement={isSponsored ? "article-inline" : undefined}
      className="font-semibold text-cobalt underline decoration-cobalt/35 underline-offset-4 hover:text-ink"
      {...props}
    >
      {children}
    </a>
  );
}

function ProtocolProduct({
  badge,
  children,
  ctaHref,
  ctaLabel = "View product",
  description,
  imageAlt,
  imageSrc,
  label,
  title,
}: ProtocolProductProps) {
  return (
    <section className="mt-12 overflow-hidden border border-ink bg-paper shadow-[5px_5px_0_var(--color-ink)]">
      <div className="grid gap-6 p-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center sm:p-6">
        <div className="mx-auto flex h-52 w-full max-w-48 items-center justify-center border border-line bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="max-h-44 w-auto max-w-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {label}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h3 className="font-display text-3xl leading-tight tracking-[-0.03em] text-ink">
              {title}
            </h3>
            {badge && (
              <span className="bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
              {description}
            </p>
          )}
          {ctaHref && (
            <a
              href={ctaHref}
              target="_blank"
              rel={externalLinkRel(ctaHref, { sponsored: true })}
              data-affiliate-placement="article-product-card"
              className="mt-5 inline-flex min-h-11 items-center bg-cobalt px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-ink"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-line bg-surface-2 p-5 sm:p-6">{children}</div>
    </section>
  );
}

export const mdxComponents = {
  ProtocolProduct,
  ProviderTable,
  WeightLossChart,
  References: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 space-y-3 border border-line bg-surface-2 p-5 pl-10 text-sm leading-6 text-ink-soft [&_a]:font-semibold [&_a]:text-cobalt [&_a]:underline [&_a]:underline-offset-4"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 scroll-mt-28 border-t border-ink pt-7 font-display text-4xl leading-[1.05] tracking-[-0.035em] text-ink"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-2xl leading-tight tracking-[-0.025em] text-ink sm:text-3xl"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-8 text-sm font-bold uppercase tracking-[0.1em] text-ink" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 text-[1.03rem] leading-8 text-ink-soft" {...props} />
  ),
  a: MdxLink,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2.5 pl-6 text-[1.02rem] leading-8 text-ink-soft marker:text-coral"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2.5 pl-6 text-[1.02rem] leading-8 text-ink-soft marker:font-bold marker:text-cobalt"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-4 border-coral bg-surface px-6 py-4 font-display text-xl leading-8 text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-ink" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-ink" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-7 overflow-x-auto border border-line bg-paper">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-ink text-left" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-ink px-3 py-3 text-xs font-bold uppercase tracking-[0.08em] text-canvas"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-line px-3 py-3 text-sm leading-6 text-ink-soft" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-cobalt"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-7 overflow-x-auto border border-ink bg-ink p-5 font-mono text-sm text-canvas"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mx-auto mt-8 max-h-[460px] w-auto max-w-full border border-ink bg-paper p-1 object-contain saturate-[.72]"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};
