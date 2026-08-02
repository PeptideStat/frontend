import {
  clinicalTrialSnapshot,
  clinicalTrials,
} from "@/lib/clinicalTrials";

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 250;

export const dynamic = "force-dynamic";

function parseInteger(value: string | null, fallback: number) {
  if (value === null) return fallback;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pageUrl(requestUrl: URL, offset: number, limit: number) {
  const url = new URL(requestUrl);
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("limit", String(limit));
  return url.toString();
}

export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const total = clinicalTrials.length;
  const offset = Math.min(
    Math.max(parseInteger(requestUrl.searchParams.get("offset"), 0), 0),
    total,
  );
  const limit = Math.min(
    Math.max(
      parseInteger(requestUrl.searchParams.get("limit"), DEFAULT_LIMIT),
      1,
    ),
    MAX_LIMIT,
  );
  const trials = clinicalTrials.slice(offset, offset + limit);
  const nextOffset = offset + trials.length;
  const previousOffset = Math.max(offset - limit, 0);

  return Response.json(
    {
      schemaVersion: clinicalTrialSnapshot.schemaVersion,
      generatedAt: clinicalTrialSnapshot.generatedAt,
      source: clinicalTrialSnapshot.source,
      stats: clinicalTrialSnapshot.stats,
      contentHash: clinicalTrialSnapshot.contentHash,
      pagination: {
        offset,
        limit,
        returned: trials.length,
        total,
        hasMore: nextOffset < total,
      },
      links: {
        self: pageUrl(requestUrl, offset, limit),
        first: pageUrl(requestUrl, 0, limit),
        previous:
          offset > 0 ? pageUrl(requestUrl, previousOffset, limit) : null,
        next:
          nextOffset < total
            ? pageUrl(requestUrl, nextOffset, limit)
            : null,
      },
      trials,
    },
    {
      headers: {
        "Cache-Control":
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, follow",
      },
    },
  );
}
