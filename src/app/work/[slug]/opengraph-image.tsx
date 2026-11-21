import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { OG_SIZE, OgCard, ogFonts } from "@/lib/og";

export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = "image/png";

// Read once at module load so the image is generated at build time (static), not per request.
const fonts = await ogFonts();

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug) ?? projects[0];
  const index = projects.findIndex((x) => x.slug === p.slug);
  return new ImageResponse(
    <OgCard
      kicker={`Case study by ${profile.name}`}
      title={p.title}
      subtitle={p.tagline}
      cells={[
        [
          "Drawing",
          `${String(index + 1).padStart(2, "0")} of ${String(projects.length).padStart(2, "0")}`,
        ],
        ["Team", p.team ? "Team project" : "Solo"],
        ["Year", String(p.year)],
        ["Stack", p.stack.slice(0, 3).join(", ")],
      ]}
    />,
    { ...size, fonts },
  );
}
