import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          // Match the site's dark canvas + radial accent glow
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.28), transparent 70%), #0b0f14",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#34d399",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #10b981, #047857)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            P
          </div>
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            fontSize: 64,
            fontWeight: 800,
            color: "#e6edf3",
            lineHeight: 1.15,
            maxWidth: 900,
            gap: "0.25em",
          }}
        >
          <span>Clear answers about peptides,</span>
          <span style={{ color: "#34d399" }}>grounded in research.</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#7d8a99" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
