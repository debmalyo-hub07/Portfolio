export interface ResumeFile {
  href: string;
  ext: ".pdf" | ".docx" | ".doc";
  sizeKB: number;
  updatedISO: string;
}

export interface ResumeData {
  primary: ResumeFile;
  alt: ResumeFile | null;
}

/** Clean download filename, independent of the uploaded file's name. */
export function downloadName(fullName: string, ext: ResumeFile["ext"]): string {
  return `${fullName.trim().replace(/\s+/g, "_")}_CV${ext}`;
}

export function formatLabel(file: ResumeFile): string {
  const type = file.ext.slice(1).toUpperCase();
  const size = file.sizeKB >= 1024 ? `${(file.sizeKB / 1024).toFixed(1)} MB` : `${file.sizeKB} KB`;
  const updated = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(file.updatedISO));
  return `${type}, ${size}, updated ${updated}`;
}
