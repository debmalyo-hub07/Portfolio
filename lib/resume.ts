import fs from "node:fs";
import path from "node:path";
import data from "@/data/resume.json";

// ---- Types (schema contract for resume.json) ----
export interface ResumeProfile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  quote: string;
  email: string;
  taglines: string[];
  socials: { github: string; linkedin: string };
}

export interface EducationItem {
  title: string;
  org: string;
  date: string;
  desc: string;
}

export interface SkillItem {
  name: string;
  mastery: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  color: "cyan" | "fuchsia" | "emerald";
  items: SkillItem[];
}

export interface ProjectItem {
  title: string;
  desc: string;
  tech: string[];
  categories: string[];
  github: string;
  live: string;
  theme: { glow: string; stroke: string; primary: string };
}

export interface ResumeData {
  profile: ResumeProfile;
  about: string;
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
}

export function getResumeData(): ResumeData {
  return data as ResumeData;
}

const LEGACY_CV = "/projects/Debmalyo_Barman_Resume.pdf";

/**
 * Feature A — resolves the CV download URL at build time.
 * Scans public/resume/ for PDFs and returns the newest by filename
 * (string-sortable date suffix, e.g. *_2026-07.pdf). This is deterministic
 * on Vercel where git does not preserve file mtimes. Falls back to the
 * legacy path if the folder is empty or unreadable.
 */
export function getCvUrl(): string {
  try {
    const dir = path.join(process.cwd(), "public", "resume");
    const pdfs = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".pdf"))
      .sort((a, b) => b.localeCompare(a));
    if (pdfs.length > 0) return `/resume/${pdfs[0]}`;
  } catch {
    // folder missing / unreadable — fall through to legacy
  }
  return LEGACY_CV;
}

export function getCvFileName(url: string): string {
  return url.split("/").pop() || "Debmalyo_Barman_Resume.pdf";
}
