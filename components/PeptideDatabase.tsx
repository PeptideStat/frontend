"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  type Peptide,
  type PeptideCategory,
  type PeptideStatus,
} from "@/data/peptides";
import { SearchIcon, CloseIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Filterable / sortable peptide database table.
 *
 * Client component because every interaction (search, filter toggles, column
 * sort) is local UI state. The full peptide list is passed in from the page
 * — it ships as JSON in the RSC payload.
 *
 * Deep-linkable: the page reads `?category=<slug>` server-side and passes it
 * as `initialCategory` so the table can render with the filter applied in
 * the initial HTML (no CSR bailout).
 */

type SortKey = "name" | "category" | "drugClass" | "status" | "halfLife";
type SortDir = "asc" | "desc";

const STATUS_BADGE: Record<PeptideStatus, string> = {
  approved: "border-tint-emerald-ink/40 bg-tint-emerald text-tint-emerald-ink",
  investigational: "border-tint-amber-ink/40 bg-tint-amber text-tint-amber-ink",
  "research-only": "border-tint-slate-ink/40 bg-tint-slate text-tint-slate-ink",
};

export function PeptideDatabase({
  peptides,
  initialCategory = null,
}: {
  peptides: Peptide[];
  initialCategory?: PeptideCategory | null;
}) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Set<PeptideCategory>>(
    () => (initialCategory ? new Set([initialCategory]) : new Set()),
  );
  const [statusFilter, setStatusFilter] = useState<Set<PeptideStatus>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const visible = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const filtered = peptides.filter((peptide) => {
      if (categoryFilter.size && !categoryFilter.has(peptide.category)) {
        return false;
      }
      if (statusFilter.size && !statusFilter.has(peptide.status)) {
        return false;
      }
      if (trimmed) {
        const haystack =
          `${peptide.name} ${peptide.aliases ?? ""} ${peptide.drugClass}`.toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }
      return true;
    });

    const sortMultiplier = sortDir === "asc" ? 1 : -1;
    filtered.sort((a, b) => {
      const left = a[sortKey] ?? "";
      const right = b[sortKey] ?? "";
      return String(left).localeCompare(String(right)) * sortMultiplier;
    });
    return filtered;
  }, [peptides, query, categoryFilter, statusFilter, sortKey, sortDir]);

  function toggleSet<T>(setter: (next: Set<T>) => void, current: Set<T>, value: T) {
    const next = new Set(current);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  function toggleCategory(category: PeptideCategory) {
    toggleSet(setCategoryFilter, categoryFilter, category);
  }
  function toggleStatus(status: PeptideStatus) {
    toggleSet(setStatusFilter, statusFilter, status);
  }

  function clearAll() {
    setQuery("");
    setCategoryFilter(new Set());
    setStatusFilter(new Set());
  }

  function clickSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const hasFilters =
    query.length > 0 || categoryFilter.size > 0 || statusFilter.size > 0;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, alias or class…"
          className="h-12 w-full rounded-lg border border-line bg-surface-2 pl-10 pr-10 text-sm text-ink placeholder:text-muted-soft outline-none focus:border-accent/60"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:bg-surface hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <FilterRow label="Category">
          {(Object.entries(CATEGORY_LABELS) as [PeptideCategory, string][]).map(
            ([value, label]) => (
              <FilterPill
                key={value}
                active={categoryFilter.has(value)}
                onClick={() => toggleCategory(value)}
              >
                {label}
              </FilterPill>
            ),
          )}
        </FilterRow>
        <FilterRow label="Status">
          {(Object.entries(STATUS_LABELS) as [PeptideStatus, string][]).map(
            ([value, label]) => (
              <FilterPill
                key={value}
                active={statusFilter.has(value)}
                onClick={() => toggleStatus(value)}
              >
                {label}
              </FilterPill>
            ),
          )}
        </FilterRow>
      </div>

      {/* Result summary + clear */}
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {visible.length} of {peptides.length} peptides
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="text-accent transition-colors hover:text-accent-bright"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <Th onClick={() => clickSort("name")} active={sortKey === "name"} dir={sortDir}>
                  Peptide
                </Th>
                <Th
                  onClick={() => clickSort("category")}
                  active={sortKey === "category"}
                  dir={sortDir}
                >
                  Category
                </Th>
                <Th
                  onClick={() => clickSort("drugClass")}
                  active={sortKey === "drugClass"}
                  dir={sortDir}
                >
                  Class
                </Th>
                <Th
                  onClick={() => clickSort("status")}
                  active={sortKey === "status"}
                  dir={sortDir}
                >
                  Status
                </Th>
                <Th
                  onClick={() => clickSort("halfLife")}
                  active={sortKey === "halfLife"}
                  dir={sortDir}
                >
                  Half-life
                </Th>
                <th className="px-4 py-3 text-right font-semibold">
                  <span className="sr-only">Link</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-muted">
                    No peptides match the current filters.
                  </td>
                </tr>
              ) : (
                visible.map((peptide) => (
                  <tr
                    key={peptide.slug}
                    className="border-t border-line/70 transition-colors hover:bg-surface/60"
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-ink">{peptide.name}</div>
                      {peptide.aliases && (
                        <div className="mt-0.5 text-xs text-muted">
                          {peptide.aliases}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-ink-soft">
                      {CATEGORY_LABELS[peptide.category]}
                    </td>
                    <td className="px-4 py-4 text-ink-soft">{peptide.drugClass}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_BADGE[peptide.status]}`}
                      >
                        {STATUS_LABELS[peptide.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-ink-soft">
                      {peptide.halfLife}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {peptide.articleSlug ? (
                        <Link
                          href={`/peptides/${peptide.articleSlug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
                        >
                          Guide
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <span className="text-xs text-muted-soft">No guide yet</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/** Section heading + horizontal pills row, used twice above. */
function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent-soft text-accent-bright"
          : "border-line bg-surface-2 text-ink-soft hover:border-accent/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Th({
  onClick,
  active,
  dir,
  children,
}: {
  onClick: () => void;
  active: boolean;
  dir: SortDir;
  children: React.ReactNode;
}) {
  return (
    <th className="px-4 py-3 font-semibold">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1 transition-colors ${active ? "text-accent" : "hover:text-ink"}`}
      >
        {children}
        {active && (
          <span aria-hidden className="text-[10px]">
            {dir === "asc" ? "▲" : "▼"}
          </span>
        )}
      </button>
    </th>
  );
}
