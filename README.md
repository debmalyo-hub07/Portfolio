# Debmalyo Barman — Engineering Portfolio & Technical Whiteprint

> **Full-Stack Engineer** · React · Next.js · Node.js · Applied Machine Learning  
> **Kolkata, West Bengal, India** · [debmalyo-barman.vercel.app](https://debmalyo-barman.vercel.app) · [debmalyobarman2003@gmail.com](mailto:debmalyobarman2003@gmail.com)

[![Live Site](https://img.shields.io/badge/Live%20Site-debmalyo--barman.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://debmalyo-barman.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](<https://img.shields.io/badge/Tailwind%20CSS-v4%20(OKLCH)-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white>)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](./LICENSE)

> _"Every system starts as noise. I draw the lines."_

---

## 📑 Table of Contents

- [📐 Overview & Philosophy](#-overview--philosophy)
- [🏛️ Architecture & Interaction Design](#️-architecture--interaction-design)
  - [1. The Whiteprint / Blueprint Drafting System](#1-the-whiteprint--blueprint-drafting-system)
  - [2. 6-Sheet Scrollytelling Drawing Set](#2-6-sheet-scrollytelling-drawing-set)
  - [3. 4-Tier Isometric Hero Assembly (Three.js WebGL)](#3-4-tier-isometric-hero-assembly-threejs-webgl)
  - [4. Deterministic Skills Scatter Tray](#4-deterministic-skills-scatter-tray)
  - [5. Stacked Sticky Work Sheets](#5-stacked-sticky-work-sheets)
- [🚀 Featured Engineering Projects](#-featured-engineering-projects)
  - [1. Kingside (WASM Stockfish 19 Chess Engine)](#1-kingside)
  - [2. FixMyCity (SIH 2025 ML Civic Classifier)](#2-fixmycity)
  - [3. Portfolio System (Living Engineering Schematic)](#3-portfolio-system-this-project)
- [🛠️ Tech Stack](#️-tech-stack)
- [💻 Getting Started & Local Development](#-getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Available Scripts](#available-scripts)
- [📄 Automated Resume Drop-In Pipeline](#-automated-resume-drop-in-pipeline)
  - [Architectural Mechanics](#architectural-mechanics)
  - [Developer Update Workflow](#developer-update-workflow)
- [🛡️ Security & Integrity](#️-security--integrity)
- [📄 Copyright & License](#-copyright--license)
- [📬 Contact & Coordinates](#-contact--coordinates)

---

## 📐 Overview & Philosophy

This repository contains the source code for my personal portfolio: **[debmalyo-barman.vercel.app](https://debmalyo-barman.vercel.app)**.

Rather than presenting projects as a conventional grid of generic cards, this application is engineered as an **interactive engineering whiteprint / technical drawing set**. Complexity is treated as an unorganized system brought to clarity through typed contracts, spatial layouts, deterministic interaction mechanics, and calibrated visual hierarchy.

### Engineering Identity

- **Author**: Debmalyo Barman
- **Discipline**: Full-Stack Web Systems & Applied Machine Learning
- **Core Philosophy**: Maintainable architectures, typed client-server boundaries, deterministic visual systems, and zero-bullshit engineering proof-of-work.

---

## 🏛️ Architecture & Interaction Design

The interface mimics physical engineering schematics and architectural drafting sheets through five core visual mechanisms:

### 1. The Whiteprint / Blueprint Drafting System

- **Precision Drafting Grid**: The background renders a calibrated engineering canvas with centimeter marks, registration ticks, and drafting coordinates (`[x, y]` planar tracking).
- **OKLCH Color Model**: Engineered on custom OKLCH color palettes in Tailwind CSS v4, supporting seamless dual-state blueprint themes (crisp drafting white and deep blueprint navy) with perceptual contrast ratios and high-visibility accents.

### 2. 6-Sheet Scrollytelling Drawing Set

The portfolio is partitioned into six distinct engineering drawing sheets:

- **Sheet 01 (Cover / Hero)**: 4-tier isometric architecture assembly, positioning statement, and automated resume drop-in link.
- **Sheet 02 (About)**: Background, credentials, core working principles, and live operational status.
- **Sheet 03 (Skills)**: Multi-layer system taxonomy organized into Interface, Services, Data, and Models.
- **Sheet 04 (Work)**: Project detail drawings featuring vector schematics, problem-solution breakdowns, and metrics.
- **Sheet 05 (Journey)**: Measured timeline tracking academic degrees, board results, and milestones.
- **Sheet 06 (Connect)**: Contact nodes, encrypted mail protocol, and communication coordinates.

### 3. 4-Tier Isometric Hero Assembly (Three.js WebGL)

- **Assembly from Noise**: When the page loads, hundreds of scattered vector strokes assemble deterministically into a four-tiered isometric architectural stack:
  ```
  ┌────────────────────────┐  Layer 1: Interface (React / Next.js)
  │      INTERFACE         │
  └───────────┬────────────┘
              │
  ┌───────────▼────────────┐  Layer 2: Services (Node.js / Express / APIs)
  │       SERVICES         │
  └───────────┬────────────┘
              │
  ┌───────────▼────────────┐  Layer 3: Data (MongoDB / SQL)
  │         DATA           │
  └───────────┬────────────┘
              │
  ┌───────────▼────────────┐  Layer 4: Models (TensorFlow / WASM)
  │        MODELS          │
  └────────────────────────┘
  ```
- **Exploded View on Scroll**: Scrolling past the hero pushes the orthographic camera and expands the layers apart, exposing internal depth and structural relationships.
- **Performance & LCP Optimization**: Three.js is deferred through dynamic imports and initialized via `requestIdleCallback`, keeping 3D bundle weight out of the critical rendering path for zero layout delay.

### 4. Deterministic Skills Scatter Tray

- Before sorting into system tiers, skill chips appear as an unorganized "scatter tray" simulating unsorted workshop components.
- Uses a deterministic trigonometric pseudo-random generator (`Math.sin` hash) so the scatter pattern is perfectly reproducible across reloads without layout shifts.
- As the user scrolls, parts assemble into their designated functional system layers.

### 5. Stacked Sticky Work Sheets

- Project studies are structured as physical drafting sheets stacked on top of each other.
- Built with GSAP ScrollTrigger: earlier sheets stay sticky as later sheets slide over them, scaling back and dimming slightly to preserve spatial context.
- Maintains native scroll momentum without scroll-jacking or interfering with accessibility.

---

## 🚀 Featured Engineering Projects

### 1. [Kingside](https://kingsidechess.vercel.app)

_In-browser chess analysis platform powered by WebAssembly Stockfish 19._

- **Core Highlights**: 100% client-side computation, 0 accounts, 0 ads, local-first storage.
- **Capabilities**: Full game review (PGN, Lichess, Chess.com), move classification (brilliant to blunder), rating estimations, 7-piece endgame tablebases, opening explorer, and tactical puzzles.
- **Architecture**: Next.js client running Stockfish 19 via WASM threads, coupled with an auxiliary MongoDB Atlas microservice.
- **License**: Free and open source (AGPL-3.0).

### 2. [FixMyCity](https://fix-my-city-c24e.vercel.app)

_Mobile-first civic issue reporting with on-device/edge ML classification._

- **Context**: Smart India Hackathon (SIH 2025) — Problem Statement ID 25031.
- **Engineering Highlights**:
  - Trained an **EfficientNetV2S** convolutional neural network achieving **F1 = 0.975**.
  - Custom dataset curation pipeline: automated scraping, perceptual hash deduplication, temperature scaling for calibrated probabilities.
  - Deployed on constrained free-tier infrastructure using a dedicated WASM inference backend, reusing decoded image buffers across civic and content-moderation checks to eliminate out-of-memory crashes.
  - Backend hardened with Aadhaar Verhoeff checksum validation, JWT authorization, audit logging, and reverse-proxy rate limiting.

### 3. Portfolio System (This Project)

_Living engineering schematic and continuous drop-in resume synchronization._

- **Runtime-Safe Content**: Every content record is strictly validated at build time via Zod schemas (`src/lib/schema.ts`). An invalid record immediately halts the build.
- **Drop-in Résumé Pipeline**: Updating the resume is as simple as dropping a new PDF into `public/resume/`. `scripts/sync-resume.ts` reads document metadata, updates the typed index, and regenerates `src/content/resume.generated.ts`.

---

## 🛠️ Tech Stack

| Domain                     | Technologies                                                               |
| :------------------------- | :------------------------------------------------------------------------- |
| **Framework & Core**       | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5                 |
| **Styling & Design**       | Tailwind CSS v4, OKLCH Color Space, PostCSS                                |
| **3D & Graphics**          | Three.js (Orthographic WebGL Scene, Custom Shaders, Points & LineSegments) |
| **Animation & Motion**     | GSAP 3 (ScrollTrigger, DrawSVG-style line animations), Lenis Smooth Scroll |
| **Validation & Contracts** | Zod 4 runtime schemas, TypeScript strict mode                              |
| **Deployment & Edge**      | Vercel Edge Network, Vercel Speed Insights & Analytics                     |

---

## 💻 Getting Started & Local Development

### Prerequisites

- **Node.js**: `>= 20.9.0`
- **npm**: `>= 10.0.0`

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/debmalyo-hub07/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Available Scripts

| Command               | Purpose                                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------------------------ |
| `npm run dev`         | Starts local Turbopack dev server on [http://localhost:3000](http://localhost:3000) (auto-runs `sync:resume`) |
| `npm run sync:resume` | Scans `public/resume/`, parses embedded PDF metadata, and updates `src/content/resume.generated.ts`           |
| `npm run build`       | Compiles optimized Next.js production build, prerendering all 15 static routes                                |
| `npm run start`       | Serves the production build locally                                                                           |
| `npm run lint`        | Runs ESLint 9 code checks with Next.js core Web Vitals & TypeScript rules                                     |
| `npm run typecheck`   | Synchronizes résumé metadata and validates types via `tsc --noEmit`                                           |
| `npm run test`        | Runs unit and schema contract tests via Vitest (configured with `--passWithNoTests`)                          |
| `npm run check`       | Comprehensive pipeline check: executes lint, typecheck, test, and build                                       |

> _Note: Local developer instruction files (`CLAUDE.md`), duplicate root PDFs (`Resume.pdf`), and local test suites (`tests/`, `vitest.config.*`) are excluded from Git tracking via `.gitignore`. Vitest is configured to run cleanly in both local and fresh public checkouts._

---

## 📄 Automated Resume Drop-In Pipeline

The portfolio features a zero-maintenance drop-in architecture for updating the professional curriculum vitae. Instead of hardcoding file sizes, revision timestamps, or direct paths in React components, the application parses the document's binary payload and generates typed contracts ahead of compilation.

```
┌──────────────────────────────────────────────────────────────┐
│  1. Drop new PDF into public/resume/Resume.pdf               │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│  2. git push origin main                                     │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│  3. Cloud CI/CD Trigger (Vercel)                             │
│     npm run prebuild ➔ tsx scripts/sync-resume.ts            │
│     ├── Scans public/resume/ for primary PDF                 │
│     ├── Reads embedded /ModDate or /CreationDate binary tags │
│     ├── Measures physical payload size in KB                 │
│     └── Emits src/content/resume.generated.ts                │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│  4. Next.js App Router Compilation                           │
│     ├── Hero download CTA: dynamic size & revision badges    │
│     ├── Nav Header & Command Palette download actions        │
│     ├── Footer schematic stamp (CV revision date)            │
│     └── Dynamic XML sitemap sync (/sitemap.xml)              │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│  5. Live Deployment (~30 seconds)                            │
│     https://debmalyo-barman.vercel.app                       │
└──────────────────────────────────────────────────────────────┘
```

### Architectural Mechanics

1. **Embedded PDF Metadata Extraction**:
   - In cloud CI/CD environments (such as Vercel or GitHub Actions), fresh Git clones assign the current checkout timestamp to the filesystem `mtime`.
   - `scripts/sync-resume.ts` bypasses filesystem timestamps by inspecting the PDF byte stream using Latin-1 encoding, searching for internal PDF dictionary tags:
     ```ts
     /\/(?:ModDate|CreationDate)\s*\(D:(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?/;
     ```
   - This guarantees that the portfolio displays the genuine authoring date (e.g., `"Updated Oct 2026"`) rather than the arbitrary cloud deployment timestamp.
2. **Deterministic Code Generation**:
   - Before Next.js or Turbopack begins compiling (`prebuild` and `predev` lifecycle hooks), `npm run sync:resume` executes automatically.
   - It outputs an immutable, strongly-typed module at `src/content/resume.generated.ts` conforming to `ResumeData`:
     ```ts
     export const resume: ResumeData = {
       primary: {
         href: "/resume/Resume.pdf",
         ext: ".pdf",
         sizeKB: 151,
         updatedISO: "2026-10-31T15:35:07.000Z",
       },
       alt: null,
     };
     ```
3. **Omnipresent UI Synchronization**:
   - **Hero Section**: Displays the exact payload size and human-formatted revision date alongside the instant download trigger.
   - **Navigation & Mobile Palette**: Provides direct access to the latest CV asset with sanitized filename formatting (`Debmalyo_Barman_CV.pdf`).
   - **Footer Architecture Stamp**: Renders the active revision month/year in the technical metadata panel.
   - **Search Engine Optimization**: Automatically registers the fresh resume link in `src/app/sitemap.ts`.

### Developer Update Workflow

Whenever a new version of the resume is generated, execute this quick reference workflow:

```bash
# 1. Replace public/resume/Resume.pdf
git add public/resume/Resume.pdf
git commit -m "chore: update resume to latest version"
git push
```

> ⚠️ **File Placement**: Ensure the updated PDF is saved directly to `public/resume/Resume.pdf`. Avoid dropping the file in the project root directory (`./Resume.pdf`), as root PDFs are excluded by `.gitignore` and bypassed by the extraction pipeline.

#### What Happens Next?

- **Zero Manual Build Commands**: No manual export, upload, or CLI deployment is required.
- **Automated Vercel Edge Build**: Vercel detects the push on the main branch, initiates the pipeline, executes `npm run prebuild` (`scripts/sync-resume.ts`), extracts updated metadata, compiles static routes, and redeploys live to **[debmalyo-barman.vercel.app](https://debmalyo-barman.vercel.app)** within **~30 seconds**.
- **Optional Local Validation**: To preview changes locally prior to pushing, simply run `npm run dev` or `npm run sync:resume`.

---

## 🛡️ Security & Integrity

- **Strict Type Validation**: Content definitions are decoupled from presentation and parsed through immutable Zod schemas, enforcing typed contracts across the entire site.
- **Metadata Resilience**: The résumé extraction script inspects PDF internal date tags (`/ModDate`, `/CreationDate`) rather than relying on filesystem modification timestamps, ensuring consistent dates even after cloud build checkouts.
- **Content Security**: Static generation eliminates dynamic injection vectors. External links use strict `rel="noreferrer noopener"` policies.

---

## 📄 Copyright & License

This project is licensed under a **Proprietary Portfolio License (All Rights Reserved)**.

```
Copyright (c) 2026 Debmalyo Barman. All rights reserved.
```

- **Open for Inspection**: You are welcome to browse, inspect, and evaluate this code for technical review, recruitment assessment, and educational purposes.
- **Restrictions**: Unauthorized commercial use, full reproduction, re-hosting, or plagiarism of Debmalyo Barman's personal identity, written case studies, branding, or proprietary visual layout is strictly prohibited.
- For complete terms, please refer to the [LICENSE](./LICENSE) file.

---

## 📬 Contact & Coordinates

- **Author**: Debmalyo Barman
- **Role**: Full-Stack Engineer
- **Location**: Kolkata, West Bengal, India
- **Email**: [debmalyobarman2003@gmail.com](mailto:debmalyobarman2003@gmail.com)
- **LinkedIn**: [linkedin.com/in/debmalyo-barman](https://www.linkedin.com/in/debmalyo-barman/)
- **GitHub**: [@debmalyo-hub07](https://github.com/debmalyo-hub07)
- **Live Portfolio**: [debmalyo-barman.vercel.app](https://debmalyo-barman.vercel.app)
