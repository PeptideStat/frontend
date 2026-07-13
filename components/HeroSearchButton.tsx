"use client";

import { SearchIcon } from "@/components/icons";

/**
 * A search-bar-shaped button in the hero that opens the global search
 * dialog (the same one ⌘K opens in the header). Uses a custom DOM event
 * so the hero stays decoupled from `SearchTrigger`'s internal state.
 */
export function HeroSearchButton() {
  function openSearch() {
    window.dispatchEvent(new Event("peptidestat:open-search"));
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="group inline-flex h-14 w-full items-center gap-3 rounded-xl border border-line-strong bg-paper px-4 text-left text-sm text-muted shadow-[0_12px_35px_-28px_rgba(17,23,19,.65)] transition-all hover:border-ink hover:shadow-[0_16px_40px_-28px_rgba(17,23,19,.8)]"
    >
      <SearchIcon className="h-4 w-4" />
      <span className="flex-1">Search a peptide or question…</span>
      <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted">
        ⌘K
      </kbd>
    </button>
  );
}
