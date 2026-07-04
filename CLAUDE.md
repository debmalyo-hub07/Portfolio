@AGENTS.md

# Portfolio — project guide

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 4 · framer-motion · three.js (react-three-fiber + drei) · gsap · lenis.

## Resume-driven content pipeline

All section content is data-driven, not hardcoded:

- `data/resume.json` — single source of truth for HOME/ABOUT/EDUCATION/SKILLS/PROJECTS content. Edit this to update the site; every section re-renders on the next build.
- `lib/resume.ts` — server-only helpers:
  - `getResumeData()` — typed read of `resume.json`.
  - `getCvUrl()` — scans `public/resume/` for PDFs, returns the newest by filename (string-sortable date suffix, e.g. `*_2026-07.pdf`). Falls back to the legacy path if empty.
- `app/page.tsx` is a Server Component: it calls both helpers and passes data + `cvUrl` as props to the section Client Components.

### Updating the CV
Drop a new PDF into `public/resume/` named with a later date suffix (e.g. `Debmalyo_Barman_Resume_2027-01.pdf`), commit, and redeploy. The download button (Hero + Navbar) auto-points to the newest file. No code change.

### Updating projects / skills / education / about
Edit the relevant array in `data/resume.json`. Skill/category icons resolve from a name→icon registry in `components/sections/Skills.tsx` (`skillIcons`) — add an entry there if you introduce a new skill name.

## Conventions
- Sections are `"use client"` and receive data via props from the server `page.tsx`.
- three.js lives in `components/three/` and is loaded via `next/dynamic` with `ssr:false` from inside a Client Component only (Next 16 forbids `ssr:false` in Server Components).
- Interactive helpers: `components/ui/TiltCard.tsx`, `components/ui/MagneticButton.tsx`.
- Verify with `npm run build` before committing.
