/**
 * Medical + affiliate disclosure shown on every article.
 *
 * Peptides are a health (YMYL) topic — being explicit about this is both
 * good practice and an FTC requirement for affiliate content.
 */
export function Disclaimer() {
  return (
    <aside className="rounded-xl border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
      <p>
        <strong className="text-ink-soft">Disclaimer:</strong> This article is
        for educational purposes only and is not medical advice. Peptides
        discussed here may be research compounds not approved for human use.
        Always consult a qualified healthcare professional before making any
        health decisions. This page may contain affiliate links — we may earn a
        commission at no extra cost to you.
      </p>
    </aside>
  );
}
