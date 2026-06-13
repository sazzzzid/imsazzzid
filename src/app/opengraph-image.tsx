import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 24,
            color: "#ff611a",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff611a",
            }}
          />
          Developer tools, video & streaming
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            {siteConfig.author.name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(250,250,250,0.72)",
              maxWidth: 760,
              lineHeight: 1.35,
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(250,250,250,0.45)" }}>
          {new URL(siteConfig.url).host}
        </div>
      </div>
    ),
    { ...size }
  );
}
