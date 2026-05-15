import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { siteConfig } from "@/site.config";

export const alt = "PeptideStat article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerender one OG image per article at build time.
export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? siteConfig.name;
  const eyebrow = article?.pillar ? "Complete Guide" : "Peptide Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse 70% 50% at 80% 100%, rgba(16,185,129,0.25), transparent 70%), #0b0f14",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#34d399",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: "linear-gradient(135deg, #10b981, #047857)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            P
          </div>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#34d399",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 62,
              fontWeight: 800,
              color: "#e6edf3",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#7d8a99" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
