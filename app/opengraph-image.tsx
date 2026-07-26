import { ImageResponse } from "next/og";
import { getResumeData } from "@/lib/resume";

export const alt = "Debmalyo Barman — Digital Architect & Futurist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static 1200x630 share card, generated at build time. Auto-wired to
// og:image / twitter:image by the file convention — no manual PNG needed.
export default function Image() {
  const { profile } = getResumeData();

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
          background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#22d3ee",
            marginBottom: 24,
          }}
        >
          {profile.role}
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 34, color: "#94a3b8", marginTop: 28, maxWidth: 900 }}>
          {profile.taglines[0]}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 56,
            fontSize: 26,
            color: "#e879f9",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#00ff88",
            }}
          />
          {profile.status}
        </div>
      </div>
    ),
    { ...size },
  );
}
