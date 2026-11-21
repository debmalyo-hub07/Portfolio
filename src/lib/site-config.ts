import { profile } from "@/content/profile";
import { resume } from "@/content/resume.generated";
import { sections } from "@/content/site";
import { downloadName, formatLabel } from "@/lib/resume";

/** Serializable props shared by client chrome (header, command palette). */
export const navSections = sections.map(({ id, label }) => ({ id, label }));

export const resumeLink = {
  href: resume.primary.href,
  filename: downloadName(profile.name, resume.primary.ext),
  label: formatLabel(resume.primary),
  updatedISO: resume.primary.updatedISO,
};
