import {
  coaRecords,
  compoundBySlug,
  vendorById,
  vendors,
} from "@/data/marketplace";
import type { VendorId } from "@/data/partnerPrograms";
import { marketplaceUpdatedAt } from "@/lib/marketReport";
import { absoluteUrl } from "@/lib/seo";

export type LabEvidenceType =
  | "vendor-hosted-batch-entry"
  | "vendor-hosted-report"
  | "vendor-linked-third-party-report";

export type ReportedCheckStatus = "reported-pass" | null;

export interface LabTestRecord {
  id: string;
  listingId: string;
  vendorId: VendorId;
  vendorName: string;
  compoundSlug: string;
  compoundName: string;
  productLabel: string;
  lab: string;
  batch: string;
  reportDate: string;
  reviewedAt: string;
  reportUrl: string;
  sourceFormat: "PDF" | "Web page";
  listingMatch: "exact-listing" | "product-family";
  evidenceType: LabEvidenceType;
  evidenceLabel: string;
  resultStatus: "transcribed" | "linked-not-transcribed";
  purityPercent: number | null;
  netContentMg: number | null;
  methods: readonly string[];
  identity: ReportedCheckStatus;
  heavyMetals: ReportedCheckStatus;
  endotoxins: ReportedCheckStatus;
  sterility: ReportedCheckStatus;
  chainOfCustody: "not-established";
  note: string;
}

interface ResultEnrichment {
  purityPercent: number;
  netContentMg: number;
  methods: readonly string[];
  identity?: "reported-pass";
  heavyMetals?: "reported-pass";
  endotoxins?: "reported-pass";
  sterility?: "reported-pass";
}

/**
 * Values below are transcribed from the linked vendor-presented reports. They
 * are reported results, not PeptideStat measurements or custody-controlled
 * samples. A record without an entry remains linked but untranscribed.
 */
const resultByRecordId: Readonly<Partial<Record<string, ResultEnrichment>>> = {
  "glacier-ipa-2602110044": {
    purityPercent: 99.86,
    netContentMg: 11.43,
    methods: ["HPLC-UV", "LC-MS/MS"],
    identity: "reported-pass",
    endotoxins: "reported-pass",
  },
  "nova-bpc-nvbp10-01042026": {
    purityPercent: 99.6,
    netContentMg: 10.45,
    methods: [],
  },
  "nova-ghk-nvcu50-01052026": {
    purityPercent: 99.85,
    netContentMg: 48.74,
    methods: [],
  },
  "nova-ipa-nvip10-01042026": {
    purityPercent: 99.827,
    netContentMg: 10.1,
    methods: ["HPLC", "LC-MS"],
    identity: "reported-pass",
  },
  "nova-reta-nvrt10-01072026-lp06": {
    purityPercent: 99.9,
    netContentMg: 9.98,
    methods: [],
    heavyMetals: "reported-pass",
    endotoxins: "reported-pass",
    sterility: "reported-pass",
  },
  "nova-cjc-nvcjnd10-01042026": {
    purityPercent: 99.866,
    netContentMg: 10.56,
    methods: ["HPLC", "LC-MS"],
    identity: "reported-pass",
  },
};

const evidenceLabels: Readonly<Record<LabEvidenceType, string>> = {
  "vendor-hosted-batch-entry": "Vendor-hosted batch entry",
  "vendor-hosted-report": "Vendor-hosted report",
  "vendor-linked-third-party-report": "Vendor-linked lab report",
};

function getEvidenceType(
  vendorId: VendorId,
  reportUrl: string,
): LabEvidenceType {
  if (reportUrl.toLowerCase().endsWith(".pdf")) {
    return "vendor-hosted-report";
  }

  if (vendorId === "ascension") {
    return "vendor-hosted-batch-entry";
  }

  return "vendor-linked-third-party-report";
}

export const labTestRecords: readonly LabTestRecord[] = coaRecords
  .map<LabTestRecord>((record) => {
    const vendor = vendorById.get(record.vendorId);
    const compound = compoundBySlug.get(record.compoundSlug);
    const result = resultByRecordId[record.id];
    const evidenceType = getEvidenceType(record.vendorId, record.reportUrl);

    return {
      id: record.id,
      listingId: record.listingId,
      vendorId: record.vendorId,
      vendorName: vendor?.name ?? record.vendorId,
      compoundSlug: record.compoundSlug,
      compoundName: compound?.name ?? record.compoundSlug,
      productLabel: record.productLabel,
      lab: record.lab,
      batch: record.batch,
      reportDate: record.reportDate,
      reviewedAt: record.reviewedAt,
      reportUrl: record.reportUrl,
      sourceFormat: record.reportUrl.toLowerCase().endsWith(".pdf")
        ? "PDF"
        : "Web page",
      listingMatch: record.match,
      evidenceType,
      evidenceLabel: evidenceLabels[evidenceType],
      resultStatus: result ? "transcribed" : "linked-not-transcribed",
      purityPercent: result?.purityPercent ?? null,
      netContentMg: result?.netContentMg ?? null,
      methods: result?.methods ?? [],
      identity: result?.identity ?? null,
      heavyMetals: result?.heavyMetals ?? null,
      endotoxins: result?.endotoxins ?? null,
      sterility: result?.sterility ?? null,
      chainOfCustody: "not-established",
      note: result
        ? "Reported values were transcribed from the linked vendor-presented source; PeptideStat did not establish sample custody."
        : record.note,
    };
  })
  .sort((a, b) =>
    b.reportDate.localeCompare(a.reportDate) ||
    a.vendorName.localeCompare(b.vendorName),
  );

export type VendorSourceStatus =
  | "batch-records-indexed"
  | "public-library-queued"
  | "access-gated"
  | "library-linked-queued";

interface VendorSourceDefinition {
  status: VendorSourceStatus;
  statusLabel: string;
  note: string;
  sourceUrl?: string;
}

const vendorSourceDefinitions: Readonly<
  Record<VendorId, VendorSourceDefinition>
> = {
  ascension: {
    status: "batch-records-indexed",
    statusLabel: "Batch records indexed",
    note: "Public batch entries are matched to tracked products; reported result values are not yet transcribed.",
  },
  ion: {
    status: "public-library-queued",
    statusLabel: "Public library · indexing next",
    note: "A public lab-result archive is available. No batch row is counted until its product and report details are extracted.",
  },
  ez: {
    status: "access-gated",
    statusLabel: "Access gated · not counted",
    note: "The vendor COA destination is access-gated. Testing claims are not counted as batch reports.",
    sourceUrl: "https://ezpeptides.com/coa/",
  },
  glacier: {
    status: "batch-records-indexed",
    statusLabel: "Batch PDF indexed",
    note: "A vendor-hosted laboratory PDF is indexed with its reported analytical values and limitations.",
    sourceUrl:
      "https://glacieraminos.shop/wp-content/uploads/2026/02/Glac2602110044.pdf",
  },
  nura: {
    status: "library-linked-queued",
    statusLabel: "Library linked · indexing next",
    note: "The vendor links a COA library. Direct batch documents remain uncounted until they are matched and reviewed.",
  },
  nova: {
    status: "batch-records-indexed",
    statusLabel: "Batch records indexed",
    note: "Product-linked batch reports are indexed; available reported values are transcribed without implying independent verification.",
  },
};

export interface LabTestVendorCoverage {
  vendorId: VendorId;
  vendorName: string;
  countryServed: string;
  sourceUrl: string;
  lastReviewedAt: string;
  recordCount: number;
  status: VendorSourceStatus;
  statusLabel: string;
  note: string;
}

export const labTestVendorCoverage: readonly LabTestVendorCoverage[] = vendors.map(
  (vendor) => {
    const definition = vendorSourceDefinitions[vendor.id];

    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      countryServed: vendor.countryServed,
      sourceUrl: definition.sourceUrl ?? vendor.documentationUrl,
      lastReviewedAt: vendor.lastReviewedAt,
      recordCount: labTestRecords.filter(
        (record) => record.vendorId === vendor.id,
      ).length,
      status: definition.status,
      statusLabel: definition.statusLabel,
      note: definition.note,
    };
  },
);

export const labTestSummary = {
  records: labTestRecords.length,
  vendorSources: labTestVendorCoverage.length,
  vendorsIndexed: new Set(labTestRecords.map((record) => record.vendorId)).size,
  compounds: new Set(labTestRecords.map((record) => record.compoundSlug)).size,
  transcribedResults: labTestRecords.filter(
    (record) => record.resultStatus === "transcribed",
  ).length,
  chainOfCustodyConfirmed: 0,
} as const;

export const labTestsFeed = {
  schemaVersion: "1.0",
  name: "PeptideStat peptide COA and lab-test ledger",
  description:
    "Source-linked vendor-presented peptide batch records with explicit evidence and custody limitations.",
  updatedAt: marketplaceUpdatedAt,
  methodologyUrl: absoluteUrl("/market-methodology"),
  jsonUrl: absoluteUrl("/lab-tests/data"),
  csvUrl: absoluteUrl("/lab-tests/data.csv"),
  summary: labTestSummary,
  limitations: [
    "PeptideStat did not purchase, sample or test the listed material.",
    "Vendor-hosted or vendor-linked reports do not establish independent chain of custody.",
    "A reported purity value does not by itself establish identity, quantity, sterility, endotoxin status or suitability for human use.",
  ],
  vendors: labTestVendorCoverage,
  records: labTestRecords,
};

function csvCell(value: string | number | null) {
  const text = value === null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function buildLabTestsCsv() {
  const header = [
    "record_id",
    "vendor_id",
    "vendor",
    "compound_slug",
    "compound",
    "product_label",
    "batch",
    "laboratory",
    "report_date",
    "reviewed_at",
    "listing_match",
    "evidence_type",
    "result_status",
    "reported_purity_percent",
    "reported_net_content_mg",
    "reported_methods",
    "identity_status",
    "heavy_metals_status",
    "endotoxins_status",
    "sterility_status",
    "chain_of_custody",
    "source_format",
    "source_url",
    "editorial_note",
  ];

  const rows = labTestRecords.map((record) =>
    [
      record.id,
      record.vendorId,
      record.vendorName,
      record.compoundSlug,
      record.compoundName,
      record.productLabel,
      record.batch,
      record.lab,
      record.reportDate,
      record.reviewedAt,
      record.listingMatch,
      record.evidenceType,
      record.resultStatus,
      record.purityPercent,
      record.netContentMg,
      record.methods.join(" | "),
      record.identity,
      record.heavyMetals,
      record.endotoxins,
      record.sterility,
      record.chainOfCustody,
      record.sourceFormat,
      record.reportUrl,
      record.note,
    ].map(csvCell),
  );

  return [header.map(csvCell), ...rows]
    .map((row) => row.join(","))
    .join("\n");
}
