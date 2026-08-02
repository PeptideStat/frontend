import { buildLabTestsCsv } from "@/lib/labTests";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLabTestsCsv(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="peptidestat-peptide-coa-ledger-2026.csv"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
