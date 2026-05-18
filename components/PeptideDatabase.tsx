"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  type Peptide,
  type PeptideCategory,
  type PeptideStatus,
} from "@/data/peptides";
import { getPeptideEvidence } from "@/data/peptideEvidence";
import {
  SearchIcon,
  CloseIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import {
  buildAccumulationCalculatorHref,
  buildReconstitutionCalculatorHref,
  buildUnitConverterHref,
  getCalculatorPreset,
} from "@/lib/calculatorPresets";
import { externalLinkRel } from "@/lib/externalLinks";

/**
 * Filterable / sortable peptide database cards.
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

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "drugClass", label: "Class" },
  { key: "status", label: "Status" },
  { key: "halfLife", label: "Half-life" },
];

const STATUS_BADGE: Record<PeptideStatus, string> = {
  approved: "border-tint-emerald-ink/40 bg-tint-emerald text-tint-emerald-ink",
  investigational: "border-tint-amber-ink/40 bg-tint-amber text-tint-amber-ink",
  "research-only": "border-tint-slate-ink/40 bg-tint-slate text-tint-slate-ink",
};

export function PeptideDatabase({
  peptides,
  shopHref,
  initialCategory = null,
}: {
  peptides: Peptide[];
  shopHref: string;
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

      {/* Result summary + sort */}
      <div className="flex flex-col gap-3 border-y border-line py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
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
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Sort
          </span>
          {SORT_OPTIONS.map((option) => (
            <SortPill
              key={option.key}
              active={sortKey === option.key}
              dir={sortDir}
              onClick={() => clickSort(option.key)}
            >
              {option.label}
            </SortPill>
          ))}
        </div>
      </div>

      {/* Cards */}
      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line bg-surface-2 px-4 py-16 text-center text-muted">
          No peptides match the current filters.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((peptide) => {
            const guideHref = peptide.articleSlug
              ? `/peptides/${peptide.articleSlug}`
              : "/peptides";
            const guideLabel = peptide.articleSlug ? "Guide" : "Guides";
            const detailHref = `/database/${peptide.slug}`;
            const buyHref = peptide.productUrl ?? shopHref;
            const evidence = getPeptideEvidence(peptide.slug);
            const preset = getCalculatorPreset(peptide.slug);
            const calculatorHref = preset
              ? (buildReconstitutionCalculatorHref(preset) ??
                buildAccumulationCalculatorHref(preset) ??
                buildUnitConverterHref(preset))
              : null;

            return (
              <article
                key={peptide.slug}
                className="flex min-h-full flex-col rounded-lg border border-line bg-surface-2 p-4 shadow-card transition-colors hover:border-accent/40"
              >
                <div className="mb-4 overflow-hidden rounded-md border border-line bg-white">
                  {peptide.productImageUrl ? (
                    <Image
                      src={peptide.productImageUrl}
                      alt={`${peptide.name} product image`}
                      width={420}
                      height={315}
                      loading="lazy"
                      unoptimized
                      className="aspect-[4/3] w-full object-contain p-3"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface px-4 text-center">
                      <span className="text-sm font-semibold text-muted">
                        {peptide.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-ink">
                      <Link
                        href={detailHref}
                        className="transition-colors hover:text-accent-bright"
                      >
                        {peptide.name}
                      </Link>
                    </h2>
                    {peptide.aliases && (
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {peptide.aliases}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_BADGE[peptide.status]}`}
                  >
                    {STATUS_LABELS[peptide.status]}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft">
                    {CATEGORY_LABELS[peptide.category]}
                  </span>
                  <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-ink-soft">
                    {peptide.routeOfAdministration}
                  </span>
                  {evidence && (
                    <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-accent-bright">
                      Evidence {evidence.score}/5
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {peptide.mechanism}
                </p>

                <dl className="mt-4 space-y-3 text-xs">
                  <div>
                    <dt className="font-semibold uppercase tracking-wider text-muted">
                      Class
                    </dt>
                    <dd className="mt-1 text-ink-soft">{peptide.drugClass}</dd>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold uppercase tracking-wider text-muted">
                        Dose ref
                      </dt>
                      <dd className="mt-1 text-ink-soft">{peptide.typicalDose}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wider text-muted">
                        Half-life
                      </dt>
                      <dd className="mt-1 font-mono text-ink-soft">
                        {peptide.halfLife}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-wider text-muted">
                      Targets
                    </dt>
                    <dd className="mt-1 text-ink-soft">
                      {peptide.targets.join(", ")}
                    </dd>
                  </div>
                </dl>

                <div
                  className={`mt-auto grid gap-2 pt-5 ${
                    calculatorHref ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
                  }`}
                >
                  <Link
                    href={detailHref}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 text-sm font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                  >
                    Details
                  </Link>
                  <Link
                    href={guideHref}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 text-sm font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                  >
                    {guideLabel}
                  </Link>
                  {calculatorHref && (
                    <Link
                      href={calculatorHref}
                      aria-label={`${peptide.name} calculator shortcut`}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 text-sm font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-bright"
                    >
                      Calc
                    </Link>
                  )}
                  <a
                    href={buyHref}
                    target="_blank"
                    rel={externalLinkRel(buyHref, { sponsored: true })}
                    aria-label={`Buy ${peptide.name}`}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-accent px-2 text-sm font-semibold text-canvas transition-colors hover:bg-accent-bright"
                  >
                    Buy
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
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

function SortPill({
  active,
  dir,
  onClick,
  children,
}: {
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent-soft text-accent-bright"
          : "border-line bg-surface-2 text-ink-soft hover:border-accent/40 hover:text-ink"
      }`}
    >
      {children}
      {active && (
        <span aria-hidden className="text-[10px] uppercase">
          {dir}
        </span>
      )}
    </button>
  );
}
