import { profileSchema, type Profile } from "@/lib/schema";

export const profile: Profile = profileSchema.parse({
  name: "Debmalyo Barman",
  firstName: "Debmalyo",
  lastName: "Barman",
  role: "Full-stack Engineer",
  positioning:
    "Full-stack engineer building TypeScript web systems across React, Node.js and Next.js — with applied machine learning when the problem needs it.",
  summary: [
    "Computer Science and Engineering graduate (B.Tech, MAKAUT, 2026) with a Diploma in Computer Science and Technology.",
    "I build full-stack web applications in TypeScript across React, Node.js, Express and Next.js — REST API design, authentication, payment integration and database modelling.",
    "I care about the parts that keep a project maintainable: typed client/server contracts, automated tests and CI.",
    "I have also trained and deployed an image-classification model for a civic-reporting platform.",
  ],
  about: [
    "I'm Debmalyo, a full-stack engineer from Kolkata. I build [web systems in TypeScript]: React and Next.js in front, Node.js and Express behind them, MongoDB underneath.",
    "I care about the parts that keep software honest: [shared types between client and server], tests that run on every change, and CI that refuses to ship a broken build.",
    "When a problem calls for it, I reach for [machine learning], like the civic-issue classifier I trained and fitted onto free-tier hosting.",
  ],
  location: { city: "Kolkata", region: "West Bengal", country: "India" },
  timeZone: "Asia/Kolkata",
  contact: {
    email: "debmalyobarman2003@gmail.com",
    phone: "+91 7596810200",
    whatsapp: "https://wa.me/917596810200",
    linkedin: "https://www.linkedin.com/in/debmalyo-barman/",
  },
  openTo: [
    "full-time roles",
    "freelance and contract work",
    "remote teams worldwide",
    "relocation",
  ],
  languages: ["English", "Bengali", "Hindi"],
  interests: ["Chess", "Cricket", "Exploring new technologies"],
  quote: "Every system starts as noise. I draw the lines.",
});
