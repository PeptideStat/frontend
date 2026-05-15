"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchIcon, CloseIcon } from "@/components/icons";

/**
 * Minimal article descriptor passed in from the server-side header.
 * We keep the payload thin so the page doesn't ship MDX bodies to the client.
 */
export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  cluster?: string;
}

/**
 * Header search button + Cmd/Ctrl-K command palette.
 *
 * The button is part of the page layout. The dialog mounts inline only when
 * open. Filtering is a simple case-insensitive includes() over title +
 * description + cluster — good enough for a small article set and keeps the
 * client bundle small (no Fuse.js etc.).
 */
export function SearchTrigger({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd/Ctrl-K opens, Esc closes. Other parts of the page can request the
  // dialog by dispatching the `peptidestat:open-search` event (used by the
  // hero search button).
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("peptidestat:open-search", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("peptidestat:open-search", onOpenRequest);
    };
  }, []);

  // Focus the input + reset state whenever the dialog opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlight(0);
      // setTimeout lets the input mount before we focus it.
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Lock body scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return items.slice(0, 8);
    return items
      .filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.cluster ?? ""}`.toLowerCase();
        return haystack.includes(trimmed);
      })
      .slice(0, 12);
  }, [items, query]);

  // Keep highlight in bounds when results shrink.
  useEffect(() => {
    if (highlight >= results.length) setHighlight(Math.max(0, results.length - 1));
  }, [results.length, highlight]);

  function handleResultsKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[highlight];
      if (target) {
        window.location.href = `/peptides/${target.slug}`;
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink-soft sm:inline-flex"
        aria-label="Search articles"
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search</span>
        <kbd className="ml-2 rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] font-medium text-ink-soft">
          ⌘K
        </kbd>
      </button>

      {/* Mobile: icon-only trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink sm:hidden"
        aria-label="Search articles"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search articles"
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] sm:pt-[15vh]"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card-hover">
            <div className="flex items-center gap-2 border-b border-line px-4">
              <SearchIcon className="h-5 w-5 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleResultsKey}
                placeholder="Search peptide guides…"
                className="h-12 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-soft"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1 text-muted hover:bg-surface hover:text-ink"
                aria-label="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No matches. Try a peptide name or topic.
                </p>
              ) : (
                <ul>
                  {results.map((item, index) => (
                    <li key={item.slug}>
                      <Link
                        href={`/peptides/${item.slug}`}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setHighlight(index)}
                        className={`flex flex-col gap-0.5 rounded-md px-3 py-2.5 transition-colors ${
                          index === highlight
                            ? "bg-accent-soft text-ink"
                            : "text-ink-soft hover:bg-surface"
                        }`}
                      >
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="line-clamp-1 text-xs text-muted">
                          {item.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-[11px] text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-line bg-surface px-1.5 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-line bg-surface px-1.5 font-mono">↵</kbd>
                  open
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-line bg-surface px-1.5 font-mono">esc</kbd>
                close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
