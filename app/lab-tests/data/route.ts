import { labTestsFeed } from "@/lib/labTests";

export const dynamic = "force-static";

export function GET() {
  return Response.json(labTestsFeed, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
