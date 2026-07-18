# Personal Portfolio

A modern, highly interactive, and responsive personal portfolio website built with Next.js 16, React 19, and Tailwind CSS. The design focuses on rich aesthetics, fluid animations, and an engaging user experience to effectively showcase projects, skills, and experience.

## ✨ Features

- **Interactive three.js Hero** - A live, pointer-reactive distorted 3D blob with a starfield, lazy-loaded and motion-safe (falls back gracefully on mobile / reduced-motion).
- **Resume-driven content** - Every section (About, Education, Skills, Projects) renders from a single `data/resume.json`. Edit the JSON, rebuild, done.
- **Auto-updating CV download** - Drop a newer PDF into `public/resume/` and the download button repoints automatically — no code change.
- **Premium motion** - Framer Motion powered 3D tilt project cards, magnetic CTA buttons, and reduced-motion aware ambient effects.
- **Lenis Smooth Scrolling** - Premium native-feeling smooth scroll experience.
- **Living backdrop** - Drifting aurora mesh, masked grid, and a subtle film-grain texture layer.
- **Tailwind CSS v4** - Utility-first styling, glassmorphism, dynamic gradients.
- **Fully Responsive** - Flawless across mobile, tablet, and desktop.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Core Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D**: [three.js](https://threejs.org/) via [react-three-fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🔄 Updating Content (no code)

- **Text / projects / skills / education** — edit `data/resume.json`.
- **CV file** — add a PDF to `public/resume/` with a later date suffix (e.g. `Resume_2027-01.pdf`). Newest filename wins; the Hero and Navbar download buttons auto-point to it.

See `CLAUDE.md` for the full content pipeline.

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

## 🛠 Project Structure

- `/app` - Next.js App Router pages, global styles, and root layout.
- `/components` - Modular UI components: `sections/`, `layout/`, `ui/`, and `three/` (3D scene).
- `/data` - `resume.json`, the single source of truth for all section content.
- `/lib` - `resume.ts` server helpers (`getResumeData`, `getCvUrl`).
- `/public` - Static assets; `public/resume/` holds downloadable CV PDFs.

## 🎨 Design & Aesthetics

This portfolio prioritizes visual excellence and aims to provide a premium feel. It moves away from generic designs by implementing:
- Harmonious and sleek color palettes, including a polished dark mode.
- Thoughtful micro-animations for interactive elements, hover states, and scroll reveals.
- A dynamic, responsive layout that reacts seamlessly to user interactions.

## 📄 License

This project is open-source and available under the MIT License.

---
*Designed & Built by Debmalyo Barman*
