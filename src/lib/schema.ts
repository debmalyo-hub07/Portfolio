import { z } from "zod";

const httpsUrl = z
  .url({ protocol: /^https$/ })
  .refine((u) => !/github\.com/i.test(u), "GitHub links are not allowed (CLAUDE.md §0 rule 5)");

export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug");

export const profileSchema = z.object({
  name: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  positioning: z.string().min(1),
  summary: z.array(z.string().min(1)).min(1),
  /** First-person statement for the About sheet. [phrase] = marker highlight. One paragraph per principle. */
  about: z.array(z.string().min(1)).min(1),
  location: z.object({ city: z.string(), region: z.string(), country: z.string() }),
  timeZone: z.string().min(1),
  contact: z.object({
    email: z.email(),
    phone: z.string().regex(/^\+\d[\d ]{7,}$/),
    whatsapp: httpsUrl,
    linkedin: httpsUrl,
  }),
  openTo: z.array(z.string().min(1)).min(1),
  languages: z.array(z.string().min(1)),
  interests: z.array(z.string().min(1)),
  /** Hero line + link-preview subtitle. */
  quote: z.string().min(1),
});

export const skillGroupSchema = z.object({
  id: slug,
  label: z.string().min(1),
  /** One plain line on what this layer is for. */
  note: z.string().min(1),
  skills: z.array(
    z.object({
      name: z.string().min(1),
      /** Project slugs where this skill is evidenced. Empty = listed skill, no linked project. */
      usedIn: z.array(slug),
    }),
  ),
});

export const educationSchema = z.object({
  id: slug,
  qualification: z.string().min(1),
  field: z.string().optional(),
  institution: z.string().min(1),
  board: z.string().min(1),
  start: z.number().int().optional(),
  end: z.number().int(),
  scores: z.array(z.string().min(1)),
});

export const projectSchema = z
  .object({
    slug,
    title: z.string().min(1),
    tagline: z.string().min(1),
    summary: z.string().min(1),
    context: z.string().optional(),
    role: z.string().min(1),
    team: z.boolean(),
    year: z.number().int(),
    problem: z.string().min(1),
    approach: z.array(z.string().min(1)).min(1),
    results: z.array(z.string().min(1)),
    highlights: z.array(z.object({ value: z.string(), label: z.string() })),
    stack: z.array(z.string().min(1)).min(1),
    liveUrl: httpsUrl.optional(),
    featured: z.boolean(),
  })
  .strict(); // no repoUrl / sourceUrl fields allowed

export type Profile = z.infer<typeof profileSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
