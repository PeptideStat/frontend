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
          background: "linear-gradient(135deg, #e7f6ef 0%, #ffffff 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#0a7d57",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#0f9d6e",
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
            fontSize: 64,
            fontWeight: 800,
            color: "#0d1714",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Clear, research-backed answers about peptides.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#5f6f68" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
