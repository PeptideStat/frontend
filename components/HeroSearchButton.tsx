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
      className="group inline-flex h-12 flex-1 items-center gap-2 rounded-lg border border-line bg-surface-2 px-4 text-left text-sm text-muted shadow-card transition-colors hover:border-accent/50 hover:text-ink-soft"
    >
      <SearchIcon className="h-4 w-4" />
      <span className="flex-1">Search a peptide or question…</span>
      <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted">
        ⌘K
      </kbd>
    </button>
  );
}
