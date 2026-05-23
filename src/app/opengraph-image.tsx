import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Didarsis · Educación que mueve.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF8F4",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg viewBox="0 0 32 32" width="64" height="64">
            <circle cx="6" cy="22" r="3" fill="#7F00FF" />
            <circle cx="16" cy="15" r="3" fill="#BF15AE" />
            <circle cx="26" cy="8" r="3" fill="#FF295C" />
          </svg>
          <span
            style={{
              fontSize: 64,
              fontWeight: 500,
              color: "#7F00FF",
              letterSpacing: "-2px",
            }}
          >
            didarsis
          </span>
        </div>
        <span style={{ fontSize: 28, color: "#4A3460" }}>
          Educación que mueve.
        </span>
      </div>
    ),
    { ...size }
  );
}
