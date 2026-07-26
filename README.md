# Personal Portfolio

A modern, highly interactive, and responsive personal portfolio built with Next.js 16, React 19, and Tailwind CSS v4. Rich aesthetics, fluid motion, and a fully data-driven content pipeline — with first-class mobile behavior, not a shrunken desktop.

## ✨ Features

- **Particle-morph scrollytelling** — a persistent three.js particle cloud morphs between chapter shapes as you scroll, with a scroll-driven camera dolly and bloom on capable desktops.
- **Device-tiered WebGL** — the scene probes GPU, cores, and pointer type at load: desktops get 4000 particles + bloom, touch devices a trimmed tier, weak/reduced-motion devices a pure CSS fallback. The postprocessing library never ships to phones.
- **Touch-aware interactions** — 3D tilt cards, magnetic buttons, and cursor glow run only on hover-capable fine pointers; touch devices get clean static equivalents (no stuck-mid-tilt cards after a tap).
- **Resume-driven content** — every section (About, Education, Skills, Projects, contact/social links) renders from a single `data/resume.json`. Edit the JSON, rebuild, done.
- **Auto-updating CV download** — drop a newer dated PDF into `public/resume/` and the download buttons repoint automatically. No code change.
- **Native-feeling scroll** — Lenis smooths wheel input; touch scrolling stays fully native on phones and tablets.
- **Motion-safe** — `prefers-reduced-motion` is honored end-to-end (framer-motion via `MotionConfig`, CSS loops via a global kill-switch, WebGL skipped entirely).
- **SEO-complete** — generated Open Graph share card, sitemap, robots, canonical URL, and Person JSON-LD structured data.
- **Living backdrop** — drifting aurora mesh, masked grid, and film-grain texture, trimmed on phones for scroll performance.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Core Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D**: [three.js](https://threejs.org/) via [react-three-fiber](https://r3f.docs.pmnd.rs/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🔄 Updating Content (no code)

- **Text / projects / skills / education / social links** — edit `data/resume.json`.
- **CV file** — add a PDF to `public/resume/` named `*_YYYY-MM.pdf` with a later date (e.g. `Debmalyo_Barman_Resume_2027-01.pdf`). Newest date wins; the Hero and Navbar download buttons auto-point to it.

See `CLAUDE.md` for the full content pipeline and the mobile/touch engineering rules.

## 📦 Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/debmalyo-hub07/Portfolio.git
   cd Portfolio
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Before committing

```bash
npm run build && npm run lint
```

## 🛠 Project Structure

- `/app` — App Router root: layout (metadata + viewport), page, global styles, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`.
- `/components` — `sections/` (page chapters), `layout/` (Navbar, Footer), `ui/` (TiltCard, MagneticButton, SmoothScroll, `useFinePointer`…), `three/` (WebGL scene, tier loader, lazy bloom).
- `/context` — scroll chapter tracking that drives the particle morph.
- `/data` — `resume.json`, the single source of truth for all section content.
- `/lib` — `resume.ts` server helpers (`getResumeData`, `getCvUrl`), `site.ts` (canonical `SITE_URL`).
- `/public` — static assets; `public/resume/` holds downloadable CV PDFs.

## 🎨 Design & Aesthetics

This portfolio prioritizes visual excellence with a premium feel:
- Neon triad palette (cyan → fuchsia → emerald) over deep-space navy, with glassmorphism surfaces.
- Thoughtful micro-animations for interactive elements, hover states, and scroll reveals — all gated to the devices that can actually use them.
- WCAG-minded details: 44px+ touch targets, AA-aware text contrast, skip-to-content link, dialog semantics on the mobile menu, pausable marquee.

## 📄 License

This project is open-source and available under the MIT License.

---
*Designed & Built by Debmalyo Barman*
