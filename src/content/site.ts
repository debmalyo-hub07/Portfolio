export interface NavItem {
  id: string;
  label: string;
  /** One line shown on the sheet header, describing what the sheet holds. */
  note: string;
}

/** The page is a drawing set. Hero = sheet 1 (cover). Nav label === sheet title. */
export const sections: NavItem[] = [
  { id: "about", label: "About", note: "Who I am and how I work." },
  { id: "skills", label: "Skills", note: "Every part, sorted into the layers of the system." },
  { id: "work", label: "Work", note: "Detail drawings of shipped projects." },
  { id: "journey", label: "Journey", note: "Education, measured on one line." },
  { id: "connect", label: "Connect", note: "Based in Kolkata, working with people anywhere." },
];

export const SHEET_TOTAL = sections.length + 1;
export const sheetNumber = (id: string) => sections.findIndex((s) => s.id === id) + 2;
