import { buildMarketplaceCsv } from "@/lib/marketReport";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildMarketplaceCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="peptidestat-vendor-transparency-2026.csv"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
