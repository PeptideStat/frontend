"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLinkIcon } from "@/components/icons";
import type { LabTestRecord } from "@/lib/labTests";

type ResultFilter = "all" | LabTestRecord["resultStatus"];
type SortMode = "newest" | "purity";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

function formatResult(value: number) {
  return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function reportedChecks(record: LabTestRecord) {
  const checks = [...record.methods];

  if (record.identity) checks.push("Identity reported pass");
  if (record.heavyMetals) checks.push("Heavy metals reported pass");
  if (record.endotoxins) checks.push("Endotoxins reported pass");
  if (record.sterility) checks.push("Sterility reported pass");

  return checks;
}

function ResultBlock({ record }: { record: LabTestRecord }) {
  if (record.purityPercent === null || record.netContentMg === null) {
    return (
      <div>
        <span className="text-xs font-bold text-ink">Not transcribed</span>
        <span className="mt-1 block text-[9px] leading-4 text-muted-soft">
          Source is linked; values are not in the ledger yet.
        </span>
      </div>
    );
  }

  return (
    <dl className="space-y-1.5">
      <div className="flex items-baseline gap-2">
        <dt className="text-[9px] font-black uppercase tracking-[0.08em] text-muted-soft">
          Purity
        </dt>
        <dd className="font-mono text-sm font-bold text-ink">
          {formatResult(record.purityPercent)}%
        </dd>
      </div>
      <div className="flex items-baseline gap-2">
        <dt className="text-[9px] font-black uppercase tracking-[0.08em] text-muted-soft">
          Content
        </dt>
        <dd className="font-mono text-xs font-bold text-ink-soft">
          {formatResult(record.netContentMg)} mg
        </dd>
      </div>
      <p className="text-[9px] leading-4 text-muted-soft">Vendor-presented result</p>
    </dl>
  );
}

function CheckBadges({ record }: { record: LabTestRecord }) {
  const checks = reportedChecks(record);

  if (!checks.length) {
    return <span className="text-[10px] text-muted-soft">Not transcribed</span>;
  }

  return (
    <div className="flex max-w-[260px] flex-wrap gap-1.5">
      {checks.map((check) => (
        <span
          key={check}
          className="rounded-full border border-line bg-surface-2 px-2 py-1 text-[9px] font-bold leading-4 text-ink-soft"
        >
          {check}
        </span>
      ))}
    </div>
  );
}

function RecordDataAttributes({ record }: { record: LabTestRecord }) {
  return (
    <span
      hidden
      data-record-id={record.id}
      data-vendor-id={record.vendorId}
      data-compound-slug={record.compoundSlug}
      data-batch={record.batch}
      data-report-date={record.reportDate}
      data-result-status={record.resultStatus}
      data-chain-of-custody={record.chainOfCustody}
    />
  );
}

export function LabTestExplorer({
  records,
}: {
  records: readonly LabTestRecord[];
}) {
  const [query, setQuery] = useState("");
  const [vendor, setVendor] = useState("all");
  const [compound, setCompound] = useState("all");
  const [resultFilter, setResultFilter] = useState<ResultFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const vendorOptions = useMemo(
    () =>
      Array.from(
        new Map(
          records.map((record) => [record.vendorId, record.vendorName]),
        ),
      )
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [records],
  );

  const compoundOptions = useMemo(
    () =>
      Array.from(
        new Map(
          records.map((record) => [record.compoundSlug, record.compoundName]),
        ),
      )
        .map(([slug, name]) => ({ slug, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [records],
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return records
      .filter((record) => {
        const haystack = [
          record.compoundName,
          record.productLabel,
          record.vendorName,
          record.batch,
          record.lab,
        ]
          .join(" ")
          .toLowerCase();

        return (
          (!normalizedQuery || haystack.includes(normalizedQuery)) &&
          (vendor === "all" || record.vendorId === vendor) &&
          (compound === "all" || record.compoundSlug === compound) &&
          (resultFilter === "all" || record.resultStatus === resultFilter)
        );
      })
      .sort((a, b) => {
        if (sortMode === "purity") {
          return (
            (b.purityPercent ?? -1) - (a.purityPercent ?? -1) ||
            b.reportDate.localeCompare(a.reportDate)
          );
        }

        return b.reportDate.localeCompare(a.reportDate);
      });
  }, [compound, query, records, resultFilter, sortMode, vendor]);

  const hasFilters =
    query ||
    vendor !== "all" ||
    compound !== "all" ||
    resultFilter !== "all" ||
    sortMode !== "newest";

  function resetFilters() {
    setQuery("");
    setVendor("all");
    setCompound("all");
    setResultFilter("all");
    setSortMode("newest");
  }

  return (
    <div
      id="ledger"
      data-testid="lab-test-explorer"
      className="scroll-mt-32 overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
    >
      <div className="border-b border-line bg-surface-2 p-4 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[minmax(240px,1.35fr)_repeat(4,minmax(140px,.7fr))]">
          <label className="block">
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.13em] text-muted-soft">
              Search records
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Compound, batch, vendor or lab"
              className="min-h-11 w-full rounded-lg border border-line-strong bg-paper px-3 text-sm text-ink outline-none placeholder:text-muted-soft hover:border-ink focus:border-accent"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.13em] text-muted-soft">
              Vendor
            </span>
            <select
              value={vendor}
              onChange={(event) => setVendor(event.target.value)}
              className="min-h-11 w-full rounded-lg border border-line-strong bg-paper px-3 text-xs font-bold text-ink outline-none hover:border-ink focus:border-accent"
            >
              <option value="all">All indexed vendors</option>
              {vendorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.13em] text-muted-soft">
              Compound
            </span>
            <select
              value={compound}
              onChange={(event) => setCompound(event.target.value)}
              className="min-h-11 w-full rounded-lg border border-line-strong bg-paper px-3 text-xs font-bold text-ink outline-none hover:border-ink focus:border-accent"
            >
              <option value="all">All compounds</option>
              {compoundOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.13em] text-muted-soft">
              Result detail
            </span>
            <select
              value={resultFilter}
              onChange={(event) =>
                setResultFilter(event.target.value as ResultFilter)
              }
              className="min-h-11 w-full rounded-lg border border-line-strong bg-paper px-3 text-xs font-bold text-ink outline-none hover:border-ink focus:border-accent"
            >
              <option value="all">All source links</option>
              <option value="transcribed">Values transcribed</option>
              <option value="linked-not-transcribed">Linked only</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.13em] text-muted-soft">
              Sort
            </span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="min-h-11 w-full rounded-lg border border-line-strong bg-paper px-3 text-xs font-bold text-ink outline-none hover:border-ink focus:border-accent"
            >
              <option value="newest">Newest report</option>
              <option value="purity">Reported purity</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p aria-live="polite" className="text-xs font-bold text-ink">
            {filteredRecords.length} of {records.length} batch records
            <span className="ml-2 font-normal text-muted">
              · vendor-presented documentation
            </span>
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[10px] font-black uppercase tracking-[0.12em] text-accent-dark hover:text-ink"
            >
              Reset filters
            </button>
          ) : null}
        </div>
      </div>

      {filteredRecords.length ? (
        <>
          <div className="divide-y divide-line lg:hidden">
            {filteredRecords.map((record) => (
              <article
                key={record.id}
                data-lab-test-record="true"
                data-record-id={record.id}
                data-vendor-id={record.vendorId}
                data-compound-slug={record.compoundSlug}
                data-batch={record.batch}
                data-report-date={record.reportDate}
                data-result-status={record.resultStatus}
                data-chain-of-custody={record.chainOfCustody}
                className="p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.12em] text-accent">
                      {record.compoundName}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-ink">
                      {record.productLabel}
                    </h3>
                    <Link
                      href={`/vendors/${record.vendorId}`}
                      className="mt-1 inline-block text-xs font-semibold text-muted hover:text-accent"
                    >
                      {record.vendorName}
                    </Link>
                  </div>
                  <time
                    dateTime={record.reportDate}
                    className="shrink-0 font-mono text-[10px] text-muted"
                  >
                    {formatDate(record.reportDate)}
                  </time>
                </div>

                <dl className="mt-5 grid gap-4 border-y border-line py-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                      Batch / laboratory
                    </dt>
                    <dd className="mt-1.5 font-mono text-xs font-bold text-ink">
                      {record.batch}
                    </dd>
                    <dd className="mt-1 text-[10px] text-muted">{record.lab}</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                      Reported result
                    </dt>
                    <dd>
                      <ResultBlock record={record} />
                    </dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <p className="mb-2 text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                    Reported checks
                  </p>
                  <CheckBadges record={record} />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-ink-soft">
                      {record.evidenceLabel}
                    </p>
                    <p className="mt-0.5 text-[9px] text-coral">
                      Chain of custody not established
                    </p>
                  </div>
                  <a
                    href={record.reportUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent-dark"
                  >
                    Open {record.sourceFormat}
                    <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1180px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-paper text-[9px] font-black uppercase tracking-[0.13em] text-muted-soft">
                  <th className="px-5 py-4">Compound / product</th>
                  <th className="px-4 py-4">Vendor</th>
                  <th className="px-4 py-4">Batch / laboratory</th>
                  <th className="px-4 py-4">Reported result</th>
                  <th className="px-4 py-4">Reported checks</th>
                  <th className="px-4 py-4">Test date</th>
                  <th className="px-4 py-4">Evidence</th>
                  <th className="px-5 py-4 text-right">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    data-lab-test-record="true"
                    className="border-b border-line align-top last:border-0"
                  >
                    <td className="px-5 py-5">
                      <RecordDataAttributes record={record} />
                      <p className="text-[9px] font-black uppercase tracking-[0.11em] text-accent">
                        {record.compoundName}
                      </p>
                      <p className="mt-1 max-w-[180px] text-xs font-bold leading-5 text-ink">
                        {record.productLabel}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <Link
                        href={`/vendors/${record.vendorId}`}
                        className="text-xs font-bold text-ink hover:text-accent"
                      >
                        {record.vendorName}
                      </Link>
                    </td>
                    <td className="px-4 py-5">
                      <p className="whitespace-nowrap font-mono text-[11px] font-bold text-ink">
                        {record.batch}
                      </p>
                      <p className="mt-1 max-w-[175px] text-[10px] leading-4 text-muted">
                        {record.lab}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <ResultBlock record={record} />
                    </td>
                    <td className="px-4 py-5">
                      <CheckBadges record={record} />
                    </td>
                    <td className="px-4 py-5">
                      <time
                        dateTime={record.reportDate}
                        className="whitespace-nowrap font-mono text-[10px] text-ink-soft"
                      >
                        {formatDate(record.reportDate)}
                      </time>
                    </td>
                    <td className="px-4 py-5">
                      <p className="max-w-[170px] text-[10px] font-bold leading-4 text-ink-soft">
                        {record.evidenceLabel}
                      </p>
                      <p className="mt-1.5 max-w-[170px] text-[9px] leading-4 text-coral">
                        Custody not established
                      </p>
                    </td>
                    <td className="px-5 py-5 text-right">
                      <a
                        href={record.reportUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-lg border border-line-strong px-3 text-[10px] font-bold text-ink hover:border-ink"
                      >
                        Open {record.sourceFormat}
                        <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="px-6 py-16 text-center">
          <p className="text-lg font-bold text-ink">No matching batch records.</p>
          <p className="mt-2 text-xs text-muted">
            Clear a filter or search a different compound, batch, vendor or lab.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-ink px-4 text-xs font-bold text-white hover:bg-accent-dark"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
