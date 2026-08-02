"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ClinicalTrialFacetOption,
  ClinicalTrialFacets,
  ClinicalTrialSearchFilters,
  ClinicalTrialSearchRecord,
  ClinicalTrialSearchResponse,
} from "@/lib/clinicalTrialsTypes";

type FilterKey =
  | "status"
  | "phase"
  | "condition"
  | "company"
  | "country";

interface ClinicalTrialExplorerProps {
  initialResponse: ClinicalTrialSearchResponse;
  facets: ClinicalTrialFacets;
  baseFilters?: ClinicalTrialSearchFilters;
  hiddenFilters?: FilterKey[];
  syncUrl?: boolean;
}

const emptyFilters: ClinicalTrialSearchFilters = {
  q: "",
  status: "",
  phase: "",
  condition: "",
  company: "",
  country: "",
  recruiting: false,
  results: false,
  publications: false,
};

const emptyBaseFilters: ClinicalTrialSearchFilters = {};

function formatDate(value: string | null) {
  if (!value) return "—";
  const normalized = /^\d{4}$/.test(value)
    ? `${value}-01-01`
    : /^\d{4}-\d{2}$/.test(value)
      ? `${value}-01`
      : value;
  const date = new Date(`${normalized}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatNumber(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en").format(value);
}

function statusClasses(status: string) {
  if (status === "recruiting") return "border-lime/35 bg-lime/10 text-lime";
  if (status === "completed") {
    return "border-emerald-300/30 bg-emerald-300/10 text-emerald-200";
  }
  if (status === "terminated" || status === "withdrawn") {
    return "border-coral/35 bg-coral/10 text-[#ffb49d]";
  }
  if (status === "suspended") {
    return "border-amber-300/35 bg-amber-300/10 text-amber-200";
  }
  return "border-white/15 bg-white/[0.04] text-white/65";
}

function optionLabel(label: string, count: number) {
  return `${label} · ${new Intl.NumberFormat("en").format(count)}`;
}

function filterCount(filters: ClinicalTrialSearchFilters) {
  return Object.entries(filters).filter(([key, value]) => {
    if (key === "q") return Boolean(String(value).trim());
    return Boolean(value);
  }).length;
}

function TrialCard({ trial }: { trial: ClinicalTrialSearchRecord }) {
  const industrySponsor = trial.sponsor.class === "INDUSTRY";

  return (
    <article className="group border-b border-white/10 px-4 py-5 transition-colors hover:bg-white/[0.035] sm:px-6">
      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_170px] xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white/38">
            <Link
              href={`/clinical-trials/${trial.nctId}`}
              className="text-lime transition-colors hover:text-white"
            >
              {trial.nctId}
            </Link>
            <span aria-hidden>·</span>
            <span>{trial.phases.label}</span>
            {trial.hasResults ? (
              <span className="border border-white/15 px-1.5 py-0.5 text-white/55">
                Results
              </span>
            ) : null}
            {trial.hasPublications ? (
              <span className="border border-white/15 px-1.5 py-0.5 text-white/55">
                PubMed
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 max-w-4xl text-base font-semibold leading-6 tracking-[-0.018em] text-white sm:text-lg">
            <Link
              href={`/clinical-trials/${trial.nctId}`}
              className="transition-colors group-hover:text-lime"
            >
              {trial.title}
            </Link>
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/48">
            <span className="flex flex-wrap items-center gap-1.5">
              {trial.peptideNames.map((name, index) => (
                <Link
                  key={trial.peptideSlugs[index] ?? name}
                  href={`/clinical-trials/${trial.peptideSlugs[index]}`}
                  className="font-bold text-white/75 hover:text-lime"
                >
                  {name}
                </Link>
              ))}
            </span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            {industrySponsor ? (
              <Link
                href={`/clinical-trials/company/${trial.sponsor.slug}`}
                className="hover:text-white"
              >
                {trial.sponsor.name}
              </Link>
            ) : (
              <span>{trial.sponsor.name}</span>
            )}
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="line-clamp-1">
              {trial.conditions.slice(0, 2).join(" · ") || "Condition not reported"}
            </span>
          </div>
        </div>

        <div className="xl:text-right">
          <Link
            href={`/clinical-trials/status/${trial.status.group}`}
            className={`inline-flex border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] ${statusClasses(trial.status.group)}`}
          >
            {trial.status.label}
          </Link>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/[0.07] pt-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ["Enrollment", formatNumber(trial.enrollment)],
          ["Started", formatDate(trial.dates.start)],
          ["Completion", formatDate(trial.dates.completion)],
          ["Locations", formatNumber(trial.locationCount)],
          ["Countries", formatNumber(trial.countries.length)],
          ["Updated", formatDate(trial.dates.lastUpdated)],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/28">
              {label}
            </dt>
            <dd className="mt-1 truncate font-mono text-[11px] text-white/68">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function ClinicalTrialExplorer({
  initialResponse,
  facets,
  baseFilters = emptyBaseFilters,
  hiddenFilters = [],
  syncUrl = false,
}: ClinicalTrialExplorerProps) {
  const [filters, setFilters] = useState<ClinicalTrialSearchFilters>(emptyFilters);
  const [records, setRecords] = useState(initialResponse.records);
  const [total, setTotal] = useState(initialResponse.total);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstRender = useRef(true);
  const loadingRef = useRef(false);
  const activeRequest = useRef<AbortController | null>(null);
  const resultsScrollRef = useRef<HTMLDivElement | null>(null);
  const hasMore = records.length < total;
  const activeCount = filterCount(filters);

  const combinedFilters = useMemo(
    () => ({ ...filters, ...baseFilters }),
    [baseFilters, filters],
  );

  const buildSearchParams = useCallback(
    (currentFilters: ClinicalTrialSearchFilters, offset = 0) => {
      const params = new URLSearchParams();
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value) params.set(key, String(value));
      });
      params.set("offset", String(offset));
      params.set("limit", "24");
      return params;
    },
    [],
  );

  const runSearch = useCallback(
    async (
      currentFilters: ClinicalTrialSearchFilters,
      offset = 0,
      append = false,
    ) => {
      if (append && loadingRef.current) return;
      activeRequest.current?.abort();
      const controller = new AbortController();
      activeRequest.current = controller;
      loadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const params = buildSearchParams(currentFilters, offset);
        const response = await fetch(`/clinical-trials/search?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Search failed (${response.status})`);
        const payload = (await response.json()) as ClinicalTrialSearchResponse;
        setRecords((current) =>
          append ? [...current, ...payload.records] : payload.records,
        );
        setTotal(payload.total);
        if (!append) resultsScrollRef.current?.scrollTo({ top: 0 });

        if (syncUrl && !append) {
          const visibleParams = buildSearchParams(filters);
          visibleParams.delete("offset");
          visibleParams.delete("limit");
          const suffix = visibleParams.size ? `?${visibleParams}` : "";
          window.history.replaceState(null, "", `/clinical-trials${suffix}`);
        }
      } catch (caught) {
        if ((caught as Error).name !== "AbortError") {
          setError("The local trial index could not be searched. Try again.");
        }
      } finally {
        if (activeRequest.current === controller) {
          loadingRef.current = false;
          setLoading(false);
        }
      }
    },
    [buildSearchParams, filters, syncUrl],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timeout = window.setTimeout(() => {
      void runSearch(combinedFilters);
    }, 180);
    return () => window.clearTimeout(timeout);
  }, [combinedFilters, runSearch]);

  const updateFilter = <Key extends keyof ClinicalTrialSearchFilters>(
    key: Key,
    value: ClinicalTrialSearchFilters[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const selectClassName =
    "min-h-11 w-full appearance-none border border-white/12 bg-[#151c18] px-3 pr-8 text-[11px] font-bold text-white/75 outline-none transition-colors hover:border-white/25 focus:border-lime sm:min-w-0";

  const filtersByKey: Array<{
    key: FilterKey;
    label: string;
    options: ClinicalTrialFacetOption[];
  }> = [
    { key: "status", label: "All statuses", options: facets.statuses },
    { key: "phase", label: "All phases", options: facets.phases },
    { key: "condition", label: "All conditions", options: facets.conditions },
    { key: "company", label: "All companies", options: facets.companies },
    { key: "country", label: "All countries", options: facets.countries },
  ];

  return (
    <div className="overflow-hidden border border-white/12 bg-[#111713] shadow-2xl shadow-black/25">
      <div className="border-b border-white/10 bg-[#0d120f] p-4 sm:p-6">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-lime"
          >
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <label htmlFor="clinical-trial-search" className="sr-only">
            Search clinical trials
          </label>
          <input
            id="clinical-trial-search"
            value={filters.q ?? ""}
            onChange={(event) => updateFilter("q", event.target.value)}
            placeholder="Search peptide, drug, sponsor, NCT ID or indication"
            autoComplete="off"
            className="h-14 w-full border border-white/15 bg-white/[0.045] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-lime sm:text-base"
          />
          {loading ? (
            <span className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-white/15 border-t-lime" />
          ) : null}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {filtersByKey
            .filter((filter) => !hiddenFilters.includes(filter.key))
            .map((filter) => (
              <div key={filter.key} className="relative">
                <label htmlFor={`trial-filter-${filter.key}`} className="sr-only">
                  {filter.label}
                </label>
                <select
                  id={`trial-filter-${filter.key}`}
                  value={String(filters[filter.key] ?? "")}
                  onChange={(event) =>
                    updateFilter(filter.key, event.target.value as never)
                  }
                  className={selectClassName}
                >
                  <option value="">{filter.label}</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {optionLabel(option.label, option.count)}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/35"
                >
                  <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </div>
            ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            ["recruiting", "Recruiting now"],
            ["results", "Results posted"],
            ["publications", "Has publications"],
          ].map(([key, label]) => {
            const typedKey = key as "recruiting" | "results" | "publications";
            const active = Boolean(filters[typedKey]);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilter(typedKey, !active)}
                className={`min-h-9 border px-3 font-mono text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? "border-lime bg-lime text-ink"
                    : "border-white/12 bg-white/[0.025] text-white/48 hover:border-white/30 hover:text-white"
                }`}
              >
                {active ? "✓ " : "+ "}
                {label}
              </button>
            );
          })}
          {activeCount ? (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="ml-auto min-h-9 px-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-white/40 hover:text-white"
            >
              Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#151c18] px-4 py-3 sm:px-6">
        <p aria-live="polite" className="font-mono text-[10px] text-white/45">
          <strong className="text-white">
            {new Intl.NumberFormat("en").format(total)}
          </strong>{" "}
          matching {total === 1 ? "study" : "studies"}
        </p>
        <p className="hidden font-mono text-[9px] uppercase tracking-[0.1em] text-white/25 sm:block">
          Last registry update first
        </p>
      </div>

      {error ? (
        <div role="alert" className="border-b border-coral/20 bg-coral/10 px-6 py-4 text-xs text-[#ffb49d]">
          {error}
        </div>
      ) : null}

      <div
        ref={resultsScrollRef}
        role="region"
        aria-label="Clinical trial search results"
        tabIndex={0}
        onScroll={(event) => {
          const region = event.currentTarget;
          const remaining =
            region.scrollHeight - region.scrollTop - region.clientHeight;
          if (remaining < 320 && hasMore && !loadingRef.current) {
            void runSearch(combinedFilters, records.length, true);
          }
        }}
        className="max-h-[78vh] overflow-y-auto overscroll-contain [scrollbar-color:rgba(217,243,106,.45)_rgba(255,255,255,.05)] [scrollbar-gutter:stable]"
      >
        <div className={loading && !records.length ? "min-h-96 opacity-50" : ""}>
          {records.map((trial) => (
            <TrialCard key={trial.nctId} trial={trial} />
          ))}
        </div>

        {!records.length && !loading ? (
          <div className="px-6 py-20 text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-white/55">
              No matching trials
            </p>
            <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-white/35">
              Try a broader drug name, remove a filter, or search by the exact NCT
              identifier.
            </p>
          </div>
        ) : null}

        <div className="flex min-h-20 items-center justify-center px-4 py-5">
          {hasMore ? (
            <button
              type="button"
              disabled={loading}
              onClick={() => void runSearch(combinedFilters, records.length, true)}
              className="min-h-11 border border-white/15 px-5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/65 hover:border-lime hover:text-lime disabled:cursor-wait disabled:opacity-45"
            >
              {loading
                ? "Loading studies…"
                : `Load next ${Math.min(24, total - records.length)}`}
            </button>
          ) : records.length ? (
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/25">
              End of {new Intl.NumberFormat("en").format(total)} results
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
