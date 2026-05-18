/**
 * Full-width medical/affiliate disclaimer band shown just above the
 * footer. Distinct from the in-article `<Disclaimer />` box.
 */
export function DisclaimerBanner() {
  return (
    <section className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-10 text-center">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Research & educational purposes only
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          The information on PeptideStat is for educational and research
          purposes only and is not medical advice. Many peptides discussed are
          research compounds not approved for human use. Always consult a
          qualified healthcare professional before making any health decisions.
          Articles may contain affiliate links — we may earn a commission at
          no extra cost to you.
        </p>
      </div>
    </section>
  );
}
