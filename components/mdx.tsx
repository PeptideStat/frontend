import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Component map passed to <MDXRemote />. Styles raw markdown elements so
 * articles get consistent typography without a global prose stylesheet.
 *
 * Affiliate-specific components (CTA boxes, comparison tables, disclosure
 * banners) can be added to this map later and used directly inside .mdx files.
 */

type AnchorProps = ComponentPropsWithoutRef<"a">;

function MdxLink({ href = "", children, ...props }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="font-medium text-accent-dark underline underline-offset-2 hover:text-accent"
      >
        {children}
      </Link>
    );
  }

  // External links — nofollow/sponsored keeps affiliate links policy-safe.
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="font-medium text-accent-dark underline underline-offset-2 hover:text-accent"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
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
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-dark"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg bg-ink p-4 font-mono text-sm text-surface"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mt-6 rounded-lg border border-line"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};
