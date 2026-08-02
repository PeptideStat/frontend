import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { JsonLd } from "@/components/JsonLd";
import { VendorLogo } from "@/components/VendorLogo";
import {
  formatMoney,
  getCoasForVendor,
  getEffectivePrice,
  getListingEvidence,
  getListingCurrency,
  getListingsForVendor,
  getUnitPrice,
  vendors,
} from "@/data/marketplace";
import {
  partnerPrograms,
  partnerStatusLabels,
} from "@/data/partnerPrograms";
import { getVendorReviewPath } from "@/data/vendorReviews";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqPageJsonLd,
  webPageAboutJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return vendors.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = vendors.find((entry) => entry.id === slug);
  if (!vendor) return {};
  const hasEditorialAudit = Boolean(getVendorReviewPath(vendor.id));

  return buildMetadata({
    title: hasEditorialAudit
      ? `${vendor.name} Prices & COA Tracker (2026)`
      : `${vendor.name} Review (2026): Prices, COAs & Code Status`,
    description: `Review tracked ${vendor.name} prices, public testing-documentation status, batch references and current PeptideStat partner-code status.`,
    path: `/vendors/${vendor.id}`,
  });
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = vendors.find((entry) => entry.id === slug);
  if (!vendor) notFound();

  const program = partnerPrograms[vendor.id];
  const editorialAuditHref = getVendorReviewPath(vendor.id);
  const listings = getListingsForVendor(vendor.id);
  const reports = getCoasForVendor(vendor.id);
  const hasKnownDiscount = typeof vendor.discountPercent === "number";
  const sourceReady = listings.filter(
    (listing) =>
      getListingEvidence(listing)?.priceSourceStatus !== "needs-deep-link",
  ).length;
  const faqs = [
    {
      question: `Is ${vendor.name} a legit peptide vendor?`,
      answer: `PeptideStat does not certify vendors as legitimate. This evidence-led profile records ${listings.length} current listing${listings.length === 1 ? "" : "s"}, ${sourceReady} direct price source${sourceReady === 1 ? "" : "s"} and ${reports.length} batch-specific report${reports.length === 1 ? "" : "s"}, with partner status disclosed separately.`,
    },
    {
      question: `Does ${vendor.name} publish COAs?`,
      answer:
        reports.length > 0
          ? `PeptideStat has recorded ${reports.length} batch-specific vendor-published report${reports.length === 1 ? "" : "s"} for ${vendor.name}. A linked report documents what the vendor publishes; it is not independent verification of a purchased sample.`
          : `PeptideStat has not entered a batch-specific report for ${vendor.name} in this ledger yet. That is different from saying the vendor publishes no testing documentation; use the linked vendor document library to inspect the current source.`,
    },
    {
      question: `Is there a ${vendor.name} discount code?`,
      answer: vendor.code
        ? hasKnownDiscount
          ? `The current PeptideStat code is ${vendor.code} for ${vendor.discountPercent}% off. Offers can change, so verify the code, exclusions and final price at checkout.`
          : `The current vendor-provided PeptideStat code is ${vendor.code}. The discount amount and exclusions were not specified, so verify the saving and final price at checkout.`
        : `PeptideStat does not currently list a site-wide code for ${vendor.name}. The recorded partner status is "${partnerStatusLabels[vendor.partnerStatus]}".`,
    },
  ];

  return (
    <>
      <JsonLd
        data={webPageAboutJsonLd({
          name: `${vendor.name} review and market profile`,
          description: vendor.profileSummary,
          path: `/vendors/${vendor.id}`,
          dateModified: vendor.lastReviewedAt,
          about: {
            name: vendor.name,
            url: vendor.url,
            type: "Organization",
          },
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Research peptide vendors", path: "/vendors" },
          { name: vendor.name, path: `/vendors/${vendor.id}` },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <section className="border-b border-line bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-muted">
            <Link href="/vendors" className="hover:text-accent">
              Vendor directory
            </Link>
            <span>·</span>
            <span>{partnerStatusLabels[vendor.partnerStatus]}</span>
            <span>·</span>
            <span>reviewed {vendor.lastReviewedAt}</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <VendorLogo vendor={vendor} size="lg" />
              <h1 className="mt-6 max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-ink">
                {vendor.name}
                <span className="block text-accent">
                  {editorialAuditHref ? "market profile." : "review & market profile."}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                {vendor.profileSummary}
              </p>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                vendor.partner ? "bg-lime text-ink" : "bg-ink text-white"
              }`}
            >
              <p
                className={`text-[9px] font-black uppercase tracking-[0.16em] ${
                  vendor.partner ? "text-ink/50" : "text-lime"
                }`}
              >
                Partner status
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
                {partnerStatusLabels[vendor.partnerStatus]}
              </h2>
              <p
                className={`mt-3 text-xs leading-6 ${
                  vendor.partner ? "text-ink/60" : "text-white/50"
                }`}
              >
                {program.note}
              </p>
              {vendor.code ? (
                <div className="mt-5">
                  <CopyCodeButton code={vendor.code} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl gap-px border-x border-line bg-line sm:grid-cols-4">
          {[
            ["Listings tracked", String(listings.length)],
            ["Direct sources", `${sourceReady}/${listings.length}`],
            ["Batch records", String(reports.length)],
            ["Country served", vendor.countryServed],
          ].map(([label, value]) => (
            <div key={label} className="bg-paper px-5 py-7 sm:px-6">
              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-muted-soft">
                {label}
              </p>
              <p className="mt-2 font-mono text-xl font-bold text-ink">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                    Price ledger
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
                    Tracked listings.
                  </h2>
                </div>
                <Link
                  href="/compare"
                  className="text-xs font-bold text-ink hover:text-accent"
                >
                  Compare all vendors →
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {listings.map((listing) => {
                  const evidence = getListingEvidence(listing);
                  if (!evidence) return null;
                  const sourceReady =
                    evidence.priceSourceStatus !== "needs-deep-link";

                  return (
                    <article
                      key={listing.id}
                      className="rounded-2xl border border-line bg-paper p-5 shadow-card"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <Link
                            href={`/compare/${listing.compoundSlug}`}
                            className="text-base font-bold text-ink hover:text-accent"
                          >
                            {listing.productLabel}
                          </Link>
                          <p className="mt-2 font-mono text-[9px] text-muted-soft">
                            Checked {listing.checkedAt} · {listing.amount}
                            {listing.unit}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-5 sm:text-right">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                              List
                            </p>
                            <p className="mt-1 font-mono text-sm font-bold text-ink">
                              {formatMoney(listing.listPrice, getListingCurrency(listing))}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                              {vendor.code
                                ? hasKnownDiscount
                                  ? "After code"
                                  : "Code saving"
                                : "Tracked price"}
                            </p>
                            <p className="mt-1 font-mono text-sm font-bold text-ink">
                              {vendor.code && !hasKnownDiscount
                                ? "At checkout"
                                : formatMoney(
                                    getEffectivePrice(listing),
                                    getListingCurrency(listing),
                                  )}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-soft">
                              Per mg
                            </p>
                            <p className="mt-1 font-mono text-sm font-bold text-ink">
                              {formatMoney(getUnitPrice(listing), getListingCurrency(listing))}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                        <a
                          href={evidence.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-[10px] font-bold ${
                            sourceReady
                              ? "text-ink hover:text-accent"
                              : "text-orange-700"
                          }`}
                        >
                          {sourceReady ? "Open price source ↗" : "Source recheck needed ↗"}
                        </a>
                        <a
                          href={listing.href}
                          target="_blank"
                          rel={
                            vendor.partner
                              ? "sponsored nofollow noreferrer"
                              : "noopener noreferrer"
                          }
                          data-affiliate-placement={
                            vendor.partner ? "vendor-profile" : undefined
                          }
                          data-affiliate-product={
                            vendor.partner ? listing.compoundSlug : undefined
                          }
                          className="text-[10px] font-bold text-ink hover:text-accent"
                        >
                          Open listing ↗
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                Documentation ledger
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
                What is actually linked.
              </h2>

              <div className="mt-6 rounded-2xl border border-line bg-paper p-6 shadow-card">
                <p className="text-sm leading-7 text-muted">{vendor.testingNote}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={vendor.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink"
                  >
                    Vendor document library ↗
                  </a>
                  <Link
                    href="/market-methodology"
                    className="inline-flex min-h-10 items-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink"
                  >
                    Status definitions
                  </Link>
                  {editorialAuditHref ? (
                    <Link
                      href={editorialAuditHref}
                      className="inline-flex min-h-10 items-center rounded-lg border border-line-strong px-4 text-xs font-bold text-ink hover:border-ink"
                    >
                      Read editorial audit
                    </Link>
                  ) : null}
                </div>
              </div>

              <div className="mt-3 space-y-3">
                {reports.length ? (
                  reports.map((record) => (
                    <article
                      key={record.id}
                      className="rounded-xl border border-line bg-paper p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-ink">
                            {record.productLabel}
                          </h3>
                          <p className="mt-1 text-[10px] text-muted">
                            {record.lab} · {record.reportDate}
                          </p>
                        </div>
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-accent-dark">
                          Batch
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-[10px] text-muted">
                          {record.batch}
                        </span>
                        <a
                          href={record.reportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-ink hover:text-accent"
                        >
                          Vendor source ↗
                        </a>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-line-strong bg-paper p-5">
                    <p className="text-xs font-bold text-ink">
                      No batch-specific record entered yet.
                    </p>
                    <p className="mt-2 text-[10px] leading-5 text-muted">
                      This is intentionally different from saying the vendor has no
                      testing documentation.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-14 flex flex-col gap-5 rounded-2xl bg-ink p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-lime">
                External destination
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Visit {vendor.name}
              </h2>
              <p className="mt-2 text-xs leading-6 text-white/45">
                Recheck price, batch, availability and code before completing any order.
              </p>
            </div>
            <a
              href={vendor.url}
              target="_blank"
              rel={
                vendor.partner
                  ? "sponsored nofollow noreferrer"
                  : "noopener noreferrer"
              }
              data-affiliate-placement={
                vendor.partner ? "vendor-profile-footer" : undefined
              }
              data-affiliate-product={vendor.partner ? "catalog" : undefined}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-lime px-5 text-sm font-black text-ink hover:bg-white"
            >
              Open vendor site ↗
            </a>
          </div>

          <section aria-labelledby="vendor-faq-heading" className="mt-14">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-accent">
              Direct answers
            </p>
            <h2 id="vendor-faq-heading" className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
              {vendor.name} review questions
            </h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="text-base font-bold text-ink">{faq.question}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
