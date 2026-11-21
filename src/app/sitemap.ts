import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { resume } from "@/content/resume.generated";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(resume.primary.updatedISO);
  return [
    { url: SITE_URL, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: updated,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
