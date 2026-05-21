"use client";

import { useMemo, useState } from "react";
import {
  LAST_VERIFIED,
  telehealthProviders,
  type DrugType,
  type InsuranceStatus,
} from "@/data/telehealthProviders";

type TypeFilter = "all" | "brand" | "compounded";
type SortKey = "name" | "price";

const TYPE_BADGE: Record<DrugType, { label: string; className: string }> = {
  brand: { label: "Brand", className: "bg-tint-sky text-tint-sky-ink" },
  compounded: {
    label: "Compounded",
    className: "bg-tint-amber text-tint-amber-ink",
  },
  both: { label: "Brand + compounded", className: "bg-tint-violet text-tint-violet-ink" },
};

const INSURANCE_BADGE: Record<
  InsuranceStatus,
  { label: string; className: string }
> = {
  yes: { label: "Yes", className: "bg-tint-emerald text-tint-emerald-ink" },
  some: { label: "Sometimes", className: "bg-tint-amber text-tint-amber-ink" },
  no: { label: "No", className: "bg-tint-slate text-tint-slate-ink" },
};

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
          ? "border-accent bg-accent text-white"
          : "border-line bg-surface text-ink-soft hover:border-accent/40 hover:text-accent-bright"
      }`}
    >
      {children}
    </button>
  );
}

export function ProviderTable() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [insuredOnly, setInsuredOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortAsc, setSortAsc] = useState(true);

  const rows = useMemo(() => {
    const filtered = telehealthProviders.filter((p) => {
      const typeOk =
        typeFilter === "all" ||
        p.type === typeFilter ||
        p.type === "both";
      const insuranceOk = !insuredOnly || p.insurance !== "no";
      return typeOk && insuranceOk;
    });

    const sorted = [...filtered].sort((a, b) => {
      const cmp =
        sortKey === "name"
          ? a.name.localeCompare(b.name)
          : a.sortPrice - b.sortPrice;
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [typeFilter, insuredOnly, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function sortArrow(key: SortKey) {
    if (sortKey !== key) return null;
    return <span aria-hidden>{sortAsc ? " ↑" : " ↓"}</span>;
  }

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-soft">
            Type
          </span>
          <FilterPill
            active={typeFilter === "all"}
            onClick={() => setTypeFilter("all")}
          >
            All
          </FilterPill>
          <FilterPill
            active={typeFilter === "brand"}
            onClick={() => setTypeFilter("brand")}
          >
            Brand-name
          </FilterPill>
          <FilterPill
            active={typeFilter === "compounded"}
            onClick={() => setTypeFilter("compounded")}
          >
            Compounded
          </FilterPill>
        </div>
        <FilterPill active={insuredOnly} onClick={() => setInsuredOnly((v) => !v)}>
          Takes insurance
        </FilterPill>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="border border-line px-3 py-2 font-semibold text-ink">
                <button
                  type="button"
                  onClick={() => toggleSort("name")}
                  className="inline-flex items-center font-semibold hover:text-accent-bright"
                >
                  Provider{sortArrow("name")}
                </button>
              </th>
              <th className="border border-line px-3 py-2 font-semibold text-ink">
                Stocks
              </th>
              <th className="border border-line px-3 py-2 font-semibold text-ink">
                <button
                  type="button"
                  onClick={() => toggleSort("price")}
                  className="inline-flex items-center font-semibold hover:text-accent-bright"
                >
                  Starting price{sortArrow("price")}
                </button>
              </th>
              <th className="border border-line px-3 py-2 font-semibold text-ink">
                Insurance
              </th>
              <th className="border border-line px-3 py-2 font-semibold text-ink">
                Notable
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const typeBadge = TYPE_BADGE[p.type];
              const insBadge = INSURANCE_BADGE[p.insurance];
              return (
                <tr key={p.name}>
                  <td className="border border-line px-3 py-2 align-top">
                    <span className="font-semibold text-ink">{p.name}</span>
                    <span
                      className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${typeBadge.className}`}
                    >
                      {typeBadge.label}
                    </span>
                  </td>
                  <td className="border border-line px-3 py-2 align-top text-ink-soft">
                    {p.stocks}
                  </td>
                  <td className="border border-line px-3 py-2 align-top text-ink-soft">
                    {p.priceLabel}
                  </td>
                  <td className="border border-line px-3 py-2 align-top">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${insBadge.className}`}
                    >
                      {insBadge.label}
                    </span>
                  </td>
                  <td className="border border-line px-3 py-2 align-top text-ink-soft">
                    {p.notable}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs leading-5 text-muted">
        Last verified {LAST_VERIFIED}. Sort by starting price ranks the lowest
        monthly-equivalent entry cost; per-visit and annual plans are normalised
        for ordering only. Medication cost is separate and varies — see our{" "}
        <a
          href="/peptides/glp-1-cost"
          className="font-medium text-accent underline underline-offset-2 hover:text-accent-bright"
        >
          GLP-1 cost guide
        </a>
        .
      </p>
    </section>
  );
}
