import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { externalLinkRel } from "@/lib/externalLinks";

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
        className="font-medium text-accent underline underline-offset-2 hover:text-accent-bright"
      >
        {children}
      </Link>
    );
  }

  // Paid/referral links are qualified; editorial source links stay followable.
  return (
    <a
      href={href}
      target="_blank"
      rel={externalLinkRel(href)}
      className="font-medium text-accent underline underline-offset-2 hover:text-accent-bright"
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
    <section className="mt-10 overflow-hidden rounded-xl border border-line bg-surface-2">
      <div className="grid gap-5 p-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center">
        <div className="mx-auto flex h-52 w-full max-w-48 items-center justify-center rounded-lg border border-line bg-white p-4">
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
            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h3>
            {badge && (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-bright">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
              {description}
            </p>
          )}
          {ctaHref && (
            <a
              href={ctaHref}
              target="_blank"
              rel={externalLinkRel(ctaHref, { sponsored: true })}
              className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-line p-5">{children}</div>
    </section>
  );
}

export const mdxComponents = {
  ProtocolProduct,
  References: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-4 space-y-3 rounded-xl border border-line bg-surface-2 p-5 pl-10 text-sm leading-6 text-ink-soft [&_a]:font-semibold [&_a]:text-accent-bright [&_a]:underline [&_a]:underline-offset-4"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 text-lg font-semibold text-ink" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 leading-7 text-ink-soft" {...props} />
  ),
  a: MdxLink,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-6 leading-7 text-ink-soft"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-ink-soft"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-accent bg-surface px-5 py-3 italic text-ink-soft"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-surface text-left" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border border-line px-3 py-2 font-semibold text-ink"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-line px-3 py-2 text-ink-soft" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-bright"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-sm text-ink"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mx-auto mt-6 max-h-[420px] w-auto max-w-full rounded-lg border border-line object-contain"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};
