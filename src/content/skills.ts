import { z } from "zod";
import { skillGroupSchema, type SkillGroup } from "@/lib/schema";

/**
 * Every skill on the CV, sorted into the same system layers drawn in the hero
 * (Interface → Services → Data → Models), then the foundations underneath.
 * `usedIn` = project slugs where the skill is evidenced on this site.
 */
export const skillGroups: SkillGroup[] = z.array(skillGroupSchema).parse([
  {
    id: "interface",
    label: "Interface",
    note: "What people see and touch.",
    skills: [
      { name: "React.js", usedIn: ["fixmycity", "portfolio", "kingside"] },
      { name: "Next.js", usedIn: ["portfolio", "kingside"] },
      { name: "Tailwind CSS", usedIn: ["portfolio"] },
      { name: "Redux Toolkit", usedIn: [] },
      { name: "HTML", usedIn: ["fixmycity", "portfolio", "kingside"] },
      { name: "CSS", usedIn: ["fixmycity", "portfolio", "kingside"] },
    ],
  },
  {
    id: "services",
    label: "Services",
    note: "APIs, auth, payments and media.",
    skills: [
      { name: "Node.js", usedIn: ["fixmycity", "kingside"] },
      { name: "Express.js", usedIn: ["fixmycity"] },
      { name: "REST APIs", usedIn: ["fixmycity"] },
      { name: "NextAuth", usedIn: [] },
      { name: "Razorpay", usedIn: [] },
      { name: "Cloudinary", usedIn: [] },
    ],
  },
  {
    id: "data",
    label: "Data",
    note: "Where state lives.",
    skills: [
      { name: "MongoDB (Mongoose)", usedIn: ["fixmycity", "kingside"] },
      { name: "SQL", usedIn: [] },
    ],
  },
  {
    id: "models",
    label: "Models",
    note: "Machine learning, trained and shipped.",
    skills: [
      { name: "TensorFlow", usedIn: ["fixmycity"] },
      { name: "TensorFlow.js", usedIn: ["fixmycity"] },
      { name: "scikit-learn", usedIn: [] },
      { name: "NumPy", usedIn: ["fixmycity"] },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    note: "What everything above is written in.",
    skills: [
      { name: "TypeScript", usedIn: ["portfolio"] },
      { name: "JavaScript", usedIn: ["fixmycity"] },
      { name: "Python", usedIn: ["fixmycity"] },
      { name: "Java", usedIn: [] },
      { name: "C", usedIn: [] },
    ],
  },
  {
    id: "tooling",
    label: "Quality & tooling",
    note: "Tests, builds and CI that keep it honest.",
    skills: [
      { name: "Vitest", usedIn: ["portfolio"] },
      { name: "Supertest", usedIn: [] },
      { name: "GitHub Actions", usedIn: [] },
      { name: "Git", usedIn: ["fixmycity", "portfolio", "kingside"] },
      { name: "Vite", usedIn: [] },
    ],
  },
]);
