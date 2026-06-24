import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/constants";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function TwitterImage() {
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
          color: "#F5E6D3",
          background:
            "radial-gradient(circle at top, rgba(245,230,211,0.12), transparent 24%), linear-gradient(135deg, #1A1A1A 0%, #251b16 45%, #8B6F47 100%)"
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 8, textTransform: "uppercase", opacity: 0.8 }}>
          The OldVerse
        </div>
        <div>
          <div style={{ fontSize: 90, lineHeight: 1, fontFamily: "serif", maxWidth: 840 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, maxWidth: 860, lineHeight: 1.4, opacity: 0.88 }}>
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    size
  );
}
