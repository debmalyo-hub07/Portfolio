import { z } from "zod";
import { projectSchema, type Project } from "@/lib/schema";

/**
 * STRICT (CLAUDE.md §4.5): only projects the user has explicitly added (Kingside added 2026-10-27).
 * No source/repo links. `liveUrl` only when a real deployment exists.
 */
export const projects: Project[] = z.array(projectSchema).parse([
  {
    slug: "kingside",
    title: "Kingside",
    tagline: "Analyze chess, free forever.",
    summary:
      "A free, open-source chess platform: analysis board, full game review, puzzles, bots and endgame study. Stockfish 19 runs in the browser, with no account, paywall or ads.",
    context: "Free and open source (AGPL-3.0)",
    role: "Design and engineering",
    team: false,
    year: 2026,
    problem:
      "Serious chess analysis and game review usually sit behind accounts and paywalls. Kingside gives anyone the full toolset for free, and keeps their games private on their own device.",
    approach: [
      "Runs Stockfish 19 in the browser for live evaluation, best lines and arrows, so analysis needs no server and no sign-in.",
      "Game review imports from Lichess, Chess.com or pasted PGN, rates every move from brilliant to blunder, and shows accuracy per player and per game phase, key moments, a rating estimate and a way to retry mistakes.",
      "Training and study in one place: rated puzzles with themes, a daily puzzle, bots from beginner to full strength, an opening explorer, 7-piece endgame tablebases and practice positions.",
      "Local-first: games, insights and settings (14 piece sets, 10 board themes) are stored on the device, with no accounts or trackers.",
      "Deployed as two Vercel projects: the Next.js app and a separate API service backed by MongoDB Atlas.",
    ],
    results: ["Live and free for anyone, with no account needed."],
    highlights: [
      { value: "SF 19", label: "Engine, in browser" },
      { value: "0", label: "Accounts needed" },
      { value: "7-piece", label: "Tablebases" },
    ],
    stack: ["Next.js", "React.js", "Stockfish 19", "WebAssembly", "Node.js", "MongoDB Atlas"],
    liveUrl: "https://kingsidechess.vercel.app",
    featured: true,
  },
  {
    slug: "fixmycity",
    title: "FixMyCity",
    tagline: "Civic issue reporting backed by a calibrated image classifier.",
    summary:
      "Mobile-first civic issue reporting platform: citizens report problems with photos and location, departments receive routed, tracked complaints.",
    context: "Smart India Hackathon (SIH) 2025 — Problem Statement ID 25031",
    role: "Backend security, ML model and ML service",
    team: true,
    year: 2025,
    problem:
      "Citizens lack a simple way to report potholes, drainage and streetlight issues, and departments receive unstructured, unverified complaints with no tracking.",
    approach: [
      "Contributed to a mobile-first civic issue reporting platform enabling citizens to report problems with image uploads, geolocation, categorization, live status tracking, and department-wise routing, with an administrative dashboard.",
      "Implemented JWT authentication, Aadhaar Verhoeff checksum validation, per-admin activity logging, pagination, and rate limiting behind a reverse proxy.",
      "Trained and retrained an EfficientNetV2S civic-issue image classifier in TensorFlow, with a Python dataset pipeline — scraping, deduplication by perceptual hash, contamination cleaning, and temperature scaling for calibrated confidence.",
      "Split image classification into a standalone ML microservice tuned for constrained free-tier hosting: WASM inference backend, single-decode reuse across NSFW and civic checks, and heap limits to avoid OOM on model load.",
    ],
    results: [
      "Civic-issue classifier reached F1 = 0.975.",
      "ML inference runs reliably on free-tier hosting without out-of-memory failures.",
    ],
    highlights: [
      { value: "0.975", label: "Classifier F1" },
      { value: "SIH 2025", label: "Hackathon" },
      { value: "WASM", label: "Inference backend" },
    ],
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TensorFlow",
      "TensorFlow.js",
      "Python",
      "JWT",
    ],
    liveUrl: "https://fix-my-city-c24e.vercel.app",
    featured: true,
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    tagline: "This site — a portfolio drawn as a living system diagram.",
    summary:
      "A from-scratch personal site built around one idea: complexity is just an unorganized system. Content is laid out as connected nodes on a drafting grid.",
    role: "Design and engineering",
    team: false,
    year: 2026,
    problem:
      "The previous portfolio's source was lost and its look had become generic. It needed a distinct identity, honest content and a CV that updates without code changes.",
    approach: [
      "Typed content layer validated with Zod at build time, so invalid or disallowed data fails the build.",
      "Drop-in résumé pipeline: a new file in public/resume is detected and wired to the download button automatically.",
      "Blueprint visual system with light and dark themes, self-hosted fonts and reduced-motion support.",
    ],
    results: [],
    highlights: [],
    stack: ["Next.js", "TypeScript", "React.js", "Tailwind CSS", "Zod", "Vitest"],
    featured: true,
  },
]);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
