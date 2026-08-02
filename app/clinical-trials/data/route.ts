import { readFileSync } from "node:fs";

export const dynamic = "force-static";

export function GET() {
  const payload = readFileSync(
    new URL("../../../data/clinicalTrials.snapshot.json", import.meta.url),
    "utf8",
  );

  return new Response(payload, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Disposition": 'inline; filename="peptidestat-clinical-trials.json"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}
