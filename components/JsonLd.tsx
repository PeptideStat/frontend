/**
 * Renders a JSON-LD structured-data block.
 *
 * The `<` escaping mitigates XSS via crafted content, per the Next.js
 * JSON-LD guidance.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
