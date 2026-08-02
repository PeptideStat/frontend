import { dealsFeed } from "@/lib/deals";

export const dynamic = "force-static";

export function GET() {
  return Response.json(dealsFeed, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
