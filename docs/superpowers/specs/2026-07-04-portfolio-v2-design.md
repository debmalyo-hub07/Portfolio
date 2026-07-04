# Portfolio v2 — Design Spec

Date: 2026-07-04
Stack: Next.js 16.2, React 19, Tailwind 4, framer-motion, tsparticles, lenis.
Deploy target: Vercel (build-time file scanning only — no runtime FS).

## Goals

1. Replace hardcoded projects with the owner's 5 real repos.
2. Elevate visuals with three.js (react-three-fiber + drei) + GSAP premium motion.
3. **Feature A** — drop a new resume PDF into a folder → CV download link auto-updates.
4. **Feature B** — edit a single JSON file → ABOUT / EDUCATION / SKILLS / PROJECTS re-render automatically.

Sections stay: HOME, ABOUT, EDUCATION, SKILLS, PROJECTS, CONTACT.

## Decisions (approved)

- Content source = **JSON sidecar** (`data/resume.json`), not PDF parsing. Reliable, no hallucination.
- CV pick rule = **newest by filename date string** (e.g. `Resume_2026-07.pdf`), highest wins. Deterministic on Vercel (git does not preserve mtime).
- Visual scope = **full three.js hero + premium 2D** (tilt cards, magnetic buttons, GSAP scroll reveals). three.js lazy-loaded, mobile/reduced-motion fallback.
- Project data = fetched from GitHub READMEs (done).

## Architecture

### Data layer
- `data/resume.json` — single source of truth:
  ```
  {
    profile: { name, role, tagline, quote, email, socials{github,linkedin,...} },
    about: string,
    education: [{ title, org, period, detail }],
    skills: { <category>: [<skill>...] },
    projects: [{ title, desc, tech[], categories[], github, live, theme{glow,stroke,primary} }]
  }
  ```
- `public/resume/` — new folder; owner drops CV PDFs here. Naming convention `*_YYYY-MM.pdf` or any string-sortable date suffix.
- `lib/resume.ts` — server-only module:
  - `getCvUrl()` — `fs.readdirSync('public/resume')`, filter `.pdf`, sort desc, return `/resume/<newest>`. Falls back to legacy `/projects/Debmalyo_Barman_Resume.pdf` if folder empty.
  - `getResumeData()` — imports `data/resume.json` (typed).
- **Feature A** = `getCvUrl()` result flows to Hero Download CV button + Navbar.
- **Feature B** = every section reads its slice of `resume.json`.

### Component wiring
- `app/page.tsx` (Server Component) computes `cvUrl` via `getCvUrl()` and reads `getResumeData()`, passes as props to sections. Sections that need interactivity stay `"use client"` and receive data as props (RSC → client boundary per Next 16 docs).
- Project filter categories derived dynamically from `projects[].categories` (no hardcoded filter list).

### Visual overhaul
New deps: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`.
- `components/three/HeroScene.tsx` (`"use client"`) — R3F `<Canvas>`: distorted animated sphere / particle field reacting to pointer. Loaded via `next/dynamic` with `ssr:false` **from inside a client component** (Next 16: `ssr:false` illegal in Server Components — confirmed in docs).
- Perf guard: skip/replace Canvas with existing CSS orbital when `prefers-reduced-motion` or small viewport / low DPR.
- `components/ui/TiltCard.tsx` — pointer-driven 3D tilt wrapper for project cards.
- `components/ui/MagneticButton.tsx` — CTA magnetic hover.
- GSAP ScrollTrigger reveals wired in `SectionWrapper` (respect reduced-motion).

## Projects (final content → resume.json)

| Title | Categories | Tech | github | live |
|---|---|---|---|---|
| GrandForge Analyzer | Chess/AI, Web App | React, Vite, TS, Stockfish WASM, MongoDB, Framer Motion | .../GrandForge-Analyzer | (Vercel if known, else repo) |
| NexMart | E-Commerce, Full Stack | Next.js 15, TS, MongoDB, Redis, Razorpay, Socket.io | .../NexMart | repo |
| FixMyCity | Civic-Tech, AI | React 19, Express, MongoDB, TensorFlow.js | .../FixMyCity | repo |
| Job Portal 2.0 | Platform, Full Stack | JavaScript, Node.js, Express | .../job-portal-2.0 | repo |
| Futuristic Portfolio | Premium, Creative | Next.js 16, Tailwind 4, three.js, TS | .../Portfolio | portfolio-rho-olive-95.vercel.app |

Removes stale "Nexus Chess". Filter tabs = `All` + unique categories.

## Error handling / edge cases
- Empty `public/resume/` → fallback legacy PDF path.
- `resume.json` is the schema contract; a typed interface in `lib/resume.ts` guards shape.
- three.js: dynamic import failure or reduced-motion → CSS fallback, page never blocks.

## Verification
- `npm install` new deps.
- `npm run build` must pass (SSR-safe, no `fs` in client, no `ssr:false` in RSC).
- Manual: swap a PDF filename → CV link changes; edit `resume.json` project → Projects section changes.

## Out of scope (YAGNI)
- No LLM/automated PDF text extraction.
- No CMS, no DB, no runtime uploads UI (owner commits files to repo → Vercel rebuild).
