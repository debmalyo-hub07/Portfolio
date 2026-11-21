import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { OG_SIZE, OgCard, ogFonts } from "@/lib/og";

export const alt = `${profile.name}, ${profile.role} based in ${profile.location.city}`;
export const size = OG_SIZE;
export const contentType = "image/png";

// Read once at module load so the image is generated at build time (static), not per request.
const fonts = await ogFonts();

export default async function Image() {
  return new ImageResponse(
    <OgCard
      kicker="Portfolio"
      title={profile.name}
      subtitle={profile.quote}
      cells={[
        ["Role", profile.role],
        ["Based in", `${profile.location.city}, ${profile.location.country}`],
        ["Stack", "TypeScript, React, Node.js"],
        ["Open to", "Full-time, freelance, remote"],
      ]}
    />,
    { ...size, fonts },
  );
}
