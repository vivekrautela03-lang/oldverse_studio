import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5e6d3 0%, #8b6f47 100%)",
          color: "#1a1a1a",
          fontSize: 28,
          fontFamily: "serif",
          fontWeight: 700
        }}
      >
        OV
      </div>
    ),
    size
  );
}
