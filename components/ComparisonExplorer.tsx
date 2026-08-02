"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { VendorLogo } from "@/components/VendorLogo";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { ExternalLinkIcon } from "@/components/icons";
import {
  compoundBySlug,
  compoundOptions,
  documentStatusLabels,
  formatMoney,
  getEffectivePrice,
  getListingCurrency,
  getListingEvidence,
  getUnitPrice,
  marketRegions,
  marketListings,
  priceSourceStatusLabels,
  type MarketRegion,
  vendorById,
} from "@/data/marketplace";
import { partnerStatusLabels } from "@/data/partnerPrograms";

type SortMode = "effective" | "unit";

export function ComparisonExplorer({
  initialCompound = "bpc-157",
  initialMarket = "us",
  compact = false,
  lockCompound = false,
  lockMarket = false,
}: {
  initialCompound?: string;
  initialMarket?: MarketRegion;
  compact?: boolean;
  lockCompound?: boolean;
  lockMarket?: boolean;
}) {
  const [compound, setCompound] = useState(initialCompound);
  const [sortMode, setSortMode] = useState<SortMode>("unit");
  const [market, setMarket] = useState<MarketRegion>(initialMarket);

  const listings = useMemo(() => {
    return marketListings
      .filter((listing) => {
        const vendor = vendorById.get(listing.vendorId);
        return listing.compoundSlug === compound && vendor?.market === market;
      })
      .sort((a, b) =>
        sortMode === "unit"
          ? getUnitPrice(a) - getUnitPrice(b)
          : getEffectivePrice(a) - getEffectivePrice(b),
      );
  }, [compound, market, sortMode]);

  const activeCompound = compoundBySlug.get(compound);
  const activeMarket = marketRegions.find((region) => region.id === market);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
      <div className="border-b border-line bg-surface-2 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-line pb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
          <span className="mr-1">Country served</span>
          {marketRegions
            .filter((region) => !lockMarket || region.id === market)
            .map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => setMarket(region.id)}
              disabled={lockMarket}
              aria-pressed={market === region.id}
              className={`rounded-full border px-3 py-1.5 transition-colors ${
                market === region.id
                  ? "border-accent bg-accent-soft text-accent-dark"
                  : "border-line-strong bg-paper text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {region.label}
            </button>
            ))}
          <span className="ml-auto font-mono text-muted-soft">
            {activeMarket?.currency}
          </span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {lockCompound ? (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-muted-soft">
                Locked comparison
              </p>
              <p className="mt-1 text-sm font-bold text-ink">{activeCompound?.name}</p>
            </div>
          ) : (
            <div className="flex min-w-0 flex-1 flex-wrap items-end gap-3">
              <label className="block w-full sm:w-auto">
                <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.14em] text-muted-soft">
                  Compound
                </span>
                <select
                  value={compound}
                  onChange={(event) => setCompound(event.target.value)}
                  className="min-h-10 w-full rounded-lg border border-line-strong bg-paper px-3 text-sm font-bold text-ink outline-none transition-colors hover:border-ink focus:border-accent sm:w-[280px]"
                >
                  {compoundOptions.map((option) => (
                    <option key={option.slug} value={option.slug}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
              <p className="pb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-soft">
                {compoundOptions.length} tracked compounds
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
            <span>Sort</span>
            <button
              type="button"
              onClick={() => setSortMode("unit")}
              className={`rounded-md px-2.5 py-1.5 ${
                sortMode === "unit" ? "bg-accent-soft text-accent-dark" : "hover:text-ink"
              }`}
            >
              Price / mg
            </button>
            <button
              type="button"
              onClick={() => setSortMode("effective")}
              className={`rounded-md px-2.5 py-1.5 ${
                sortMode === "effective" ? "bg-accent-soft text-accent-dark" : "hover:text-ink"
              }`}
            >
              Effective price
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-paper text-[9px] font-bold uppercase tracking-[0.14em] text-muted-soft">
              <th className="px-5 py-3.5">Vendor</th>
              <th className="px-4 py-3.5">Listing</th>
              <th className="px-4 py-3.5">List</th>
              <th className="px-4 py-3.5">PeptideStat code</th>
              <th className="px-4 py-3.5">Effective price</th>
              <th className="px-4 py-3.5">Per mg</th>
              <th className="px-4 py-3.5">Evidence state</th>
              <th className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {listings.length === 0 ? (
              <tr>
                <td colSpan={8} className="bg-paper px-6 py-14 text-center">
                  <p className="text-sm font-bold text-ink">
                    No current {activeMarket?.shortLabel} listings tracked for {activeCompound?.name}.
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Switch markets or choose another compound while this catalog is expanded.
                  </p>
                </td>
              </tr>
            ) : listings.map((listing, index) => {
              const vendor = vendorById.get(listing.vendorId);
              const evidence = getListingEvidence(listing);
              if (!vendor || !evidence) return null;

              const effectivePrice = getEffectivePrice(listing);
              const hasKnownDiscount =
                typeof vendor.discountPercent === "number";
              const isBest = index === 0;
              const isSourceReady =
                evidence.priceSourceStatus !== "needs-deep-link";
              const hasLinkedBatch =
                evidence.documentStatus === "linked-batch-report";

              return (
                <tr
                  key={listing.id}
                  className={`border-b border-line last:border-0 ${
                    vendor.partner ? "bg-lime/[0.08]" : "bg-paper"
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <VendorLogo vendor={vendor} size="sm" />
                      <span>
                        <Link
                          href={`/vendors/${vendor.id}`}
                          className="block text-sm font-bold text-ink hover:text-accent"
                        >
                          {vendor.name}
                        </Link>
                        <span className="mt-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-muted">
                          {partnerStatusLabels[vendor.partnerStatus]}
                          {isBest ? (
                            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent-dark">
                              Best value
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/compare/${listing.compoundSlug}`}
                      className="block text-xs font-semibold text-ink hover:text-accent"
                    >
                      {listing.productLabel}
                    </Link>
                    <span className="mt-1 block font-mono text-[9px] text-muted-soft">
                      {vendor.countryServed} · checked {listing.checkedAt}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-muted">
                    {formatMoney(listing.listPrice, getListingCurrency(listing))}
                  </td>
                  <td className="px-4 py-4">
                    {vendor.code ? (
                      <div className="flex items-center gap-2">
                        <CopyCodeButton code={vendor.code} compact />
                        <span className="text-[10px] font-bold text-accent-dark">
                          {hasKnownDiscount
                            ? `−${vendor.discountPercent}%`
                            : "Verify saving"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-soft">
                        {vendor.partnerStatus === "pending"
                          ? "Application pending"
                          : "No site code"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <strong className="font-mono text-sm text-ink">
                      {vendor.code && !hasKnownDiscount
                        ? "At checkout"
                        : formatMoney(effectivePrice, getListingCurrency(listing))}
                    </strong>
                    {vendor.code ? (
                      <span className="mt-1 block text-[9px] text-muted-soft">
                        {hasKnownDiscount ? "estimate" : "amount not specified"}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <strong className="font-mono text-sm text-ink">
                      {formatMoney(getUnitPrice(listing), getListingCurrency(listing))}
                    </strong>
                    <span className="text-[10px] text-muted">/{listing.unit}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        hasLinkedBatch
                          ? "border-accent/30 bg-accent-soft text-accent-dark"
                          : "border-line text-ink-soft"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          hasLinkedBatch ? "bg-accent" : "bg-muted-soft"
                        }`}
                      />
                      {documentStatusLabels[evidence.documentStatus]}
                    </span>
                    <a
                      href={evidence.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-2 inline-flex items-center gap-1 whitespace-nowrap text-[9px] font-bold ${
                        isSourceReady
                          ? "text-ink hover:text-accent"
                          : "text-orange-700"
                      }`}
                    >
                      <span>{priceSourceStatusLabels[evidence.priceSourceStatus]}</span>
                      <ExternalLinkIcon className="h-3 w-3 shrink-0" aria-hidden />
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <a
                      href={listing.href}
                      target="_blank"
                      rel={
                        vendor.partner
                          ? "sponsored nofollow noreferrer"
                          : "noopener noreferrer"
                      }
                      data-affiliate-placement={
                        vendor.partner ? "comparison-table" : undefined
                      }
                      data-affiliate-product={
                        vendor.partner ? listing.compoundSlug : undefined
                      }
                      className={`inline-flex min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 text-xs font-bold transition-colors ${
                        vendor.partner
                          ? "bg-ink text-white hover:bg-accent-dark"
                          : "border border-line-strong text-ink hover:border-ink"
                      }`}
                    >
                      <span>
                        {vendor.code
                          ? "Use code"
                          : vendor.partner
                            ? "Visit partner"
                            : "View listing"}
                      </span>
                      <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-line bg-surface-2 px-5 py-4 text-[10px] leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Prices exclude shipping and tax. Effective price applies a known code
          when listed; otherwise it equals list price. Verify checkout.
          Vendor-hosted reports are not PeptideStat product verification.
        </p>
        {compact ? (
          <Link href="/compare" className="shrink-0 font-bold text-ink hover:text-accent">
            Open full comparison →
          </Link>
        ) : lockCompound ? (
          <Link
            href="/market-methodology"
            className="shrink-0 font-bold text-ink hover:text-accent"
          >
            How statuses work →
          </Link>
        ) : (
          <span className="shrink-0 font-mono">
            {activeMarket?.currency} · {activeMarket?.label} · research listings only
          </span>
        )}
      </div>
    </div>
  );
}
