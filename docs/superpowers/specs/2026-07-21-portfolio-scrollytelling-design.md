# Portfolio Scrollytelling Redesign — Design Spec
**Date:** 2026-07-21  
**Status:** Awaiting user review

---

## 1. Vision

"You, forged and unfolded." The portfolio is rebuilt as a single continuous scroll narrative. One persistent 3D protagonist — a particle-morph object representing the developer — assembles, explodes into the story of their journey, then reassembles at the contact section. Content is unchanged; only the presentation layer is rebuilt.

---

## 2. Constraints & Non-Goals

- `data/resume.json` and `lib/resume.ts` are untouched. All content is still data-driven.
- `app/page.tsx` server component pattern (getResumeData + getCvUrl) is preserved.
- No new backend, no image-frame asset pipeline, no GSAP dependency.
- Existing a11y gates (`prefers-reduced-motion`, mobile stripping) are preserved and extended.

---

## 3. Architecture

### 3.1 Scroll Engine
- **Lenis** stays as smooth-scroll provider (already in `SmoothScroll.tsx`, desktop ≥768px only).
- **Framer Motion `useScroll`** reads native scroll progress (0→1) across the full page height. This is the single source of truth for all scroll-driven animation. No drei `ScrollControls` (conflicts with Lenis).
- A shared `MotionValue<number>` (`scrollProgress`) is passed via React context (`ScrollContext`) to both the WebGL layer and DOM sections.

### 3.2 WebGL Layer
- One **persistent full-viewport `<Canvas>`** (`components/three/WorldScene.tsx`), `position: fixed`, `inset: 0`, `z-index: 0`, `pointer-events: none`.
- Loaded via `next/dynamic({ ssr: false })` from a Client Component wrapper (`components/three/WorldSceneLoader.tsx`).
- Mounted only when `enable3D` probe passes (desktop + motion-safe). Mobile/reduced-motion gets CSS-only fallback.
- The canvas renders behind all DOM content. DOM sections are normal-flow with transparent backgrounds over it.

### 3.3 DOM Layer
- `app/page.tsx` structure is preserved. The `<main>` wrapper gets `position: relative; z-index: 1`.
- `space-y-32` between sections is replaced with scroll-chapter spacers (each section gets enough height for its pinned animation to play).
- Each section component receives `scrollProgress` from context and uses `useTransform` to derive its own local progress range.

### 3.4 Navbar
- Stays fixed, `z-index: 50`. No changes to its scroll-progress bar or Lenis anchor logic.

---

## 4. The Protagonist — Particle Morph System

### 4.1 Geometry
- One `THREE.Points` buffer with **N particles** (N = device tier: 4000 desktop, 1500 tablet, 800 mobile-3D, 0 mobile-lite).
- Six **target position buffers** (Float32Array, length N×3), one per chapter. Precomputed on mount from deterministic math (no asset load).
- `useFrame` lerps current positions toward the active target buffer. Lerp speed is scroll-velocity-aware (faster scroll = faster morph).

### 4.2 Target Shapes (per chapter)

| Chapter | Shape | Description |
|---|---|---|
| 0 — Hero | Sphere / icosahedron shell | Assembled glowing core, slow float |
| 1 — About | Breathing torus | Core expands, camera eases in |
| 2 — Education | Constellation arc | Particles align to timeline milestones |
| 3 — Skills | Three orbiting clusters | Cyan / fuchsia / emerald (from JSON colors) |
| 4 — Projects | Scattered shards | Fragments drift in 3D space |
| 5 — Contact | Sphere (reassembled) | Full circle, core reforms |

### 4.3 Rendering
- `THREE.PointsMaterial` with `vertexColors: true`, `sizeAttenuation: true`, `transparent: true`.
- Per-particle color interpolates between chapter palettes using the same lerp.
- **Desktop only:** `@react-three/postprocessing` `Bloom` effect (threshold 0.4, luminanceSmoothing 0.9). Stripped on mobile/tablet.
- Camera: gentle parallax on pointer (existing HeroScene pattern), plus scroll-driven Z push (eases in on About, pulls back on Contact).

### 4.4 Device Tiers

| Tier | Trigger | Particles | Bloom | Lenis |
|---|---|---|---|---|
| Desktop-full | ≥1024px + motion-safe + GPU ok | 4000 | Yes | Yes |
| Tablet | 768–1023px + motion-safe | 1500 | No | Yes |
| Mobile-3D | <768px + motion-safe + GPU ok | 800 | No | No |
| Mobile-lite | <768px OR reduced-motion OR GPU fail | 0 | No | No |

GPU probe: `renderer.getParameter(renderer.MAX_TEXTURE_SIZE) >= 4096`. Fallback on WebGL context loss.

---

## 5. Scroll Arc — Chapter Map

Total page height: ~`700vh` — six 100vh sticky chapters + one 100vh non-sticky TechMarquee interstitial between About and Education. Each chapter section is pinned via `position: sticky; top: 0; height: 100vh` inside its own scroll-height wrapper. The percentages below are relative to the six-chapter arc (marquee excluded from the arc math; it is a visual breather that does not advance the protagonist).

| Scroll % | Chapter | DOM content | Protagonist transition |
|---|---|---|---|
| 0–16% | Hero | Name, typewriter taglines, CTA buttons, CV download | Sphere assembled, slow float, pointer-reactive |
| 16–33% | About | Story paragraph, CountUp stats, highlight cards | Torus breathe, camera push in |
| 33–50% | Education | Vertical timeline, milestone cards | Explode → constellation arc |
| 50–66% | Skills | Category tabs, mastery bars/badges | Regroup → 3 color clusters |
| 66–83% | Projects | Filter tabs, TiltCard grid | Scatter → project shards |
| 83–100% | Contact | Contact channels, form | Reassemble → sphere |

TechMarquee is placed between About and Education as a non-sticky interstitial (normal flow, 100vh spacer).

---

## 6. Section Animation Details

### Hero (0–16%)
- Typewriter (`react-type-animation`) unchanged.
- Name headline: `motion.h1` with staggered letter reveal on mount.
- CTAs: `MagneticButton` unchanged.
- Scroll-out: entire hero content fades + slides up as scroll leaves 16%.

### About (16–33%)
- Story text: scroll-synced line-by-line reveal (each line fades in as its scroll threshold passes).
- CountUp stats: trigger on chapter enter (IntersectionObserver, existing logic).
- Cards: `Card3D` unchanged.

### Education (33–50%)
- Timeline line: existing `scaleY` spring draw, now scroll-chapter-synced instead of viewport-based.
- Each milestone: staggers in as constellation particles align to its position.

### Skills (50–66%)
- Tab switcher: `AnimatePresence` + `layoutId` pill unchanged.
- Mastery bars: `scaleX` fill on chapter enter.
- Particle clusters glow in matching section color.

### Projects (66–83%)
- Filter tabs + `AnimatePresence mode="popLayout"` unchanged.
- `TiltCard` unchanged.
- Background particle shards drift slowly, no interaction with filter state.

### Contact (83–100%)
- Reassembly animation plays as section enters.
- Form: existing simulated submit unchanged.
- Social links: `MagneticButton` pattern.

---

## 7. Text Overlay System

Scroll-synced text overlays (cinematic, not section headings) appear at chapter transitions:

- 0%: *(no overlay — hero content is the text)*
- ~30%: `"Every line of code is a decision."` — fades in left, fades out right
- ~48%: `"Built from curiosity."` — fades in right
- ~65%: `"Shipped with intent."` — fades in center
- ~82%: `"Let's build something."` — fades in center, persists into Contact

These are `motion.p` elements with `useTransform(scrollProgress, [in, peak, out], [0, 1, 0])` opacity.

---

## 8. Mobile Experience

Mobile-lite (no WebGL): full framer-motion reveal experience. Each section uses `whileInView` stagger reveals (existing pattern, already in every section). Background: existing aurora/mesh CSS layers (already mobile-stripped of `backdrop-filter`). Hero gets a static CSS gradient orb instead of the 3D blob.

Mobile-3D (capable devices): same scroll arc, 800-particle protagonist, no bloom, no Lenis (native scroll). Sticky sections work via CSS `position: sticky`.

---

## 9. New Files

| File | Purpose |
|---|---|
| `components/three/WorldScene.tsx` | Persistent canvas + particle morph system |
| `components/three/WorldSceneLoader.tsx` | `next/dynamic` wrapper, `enable3D` probe |
| `components/three/useParticleMorph.ts` | Hook: target buffers, lerp logic, `useFrame` |
| `components/three/particleTargets.ts` | Pure math: generates 6 Float32Array target shapes |
| `context/ScrollContext.tsx` | Provides `scrollProgress` MotionValue to all consumers |
| `components/ui/ScrollOverlay.tsx` | Cinematic text overlays, scroll-synced |

### Modified Files

| File | Change |
|---|---|
| `app/page.tsx` | Wrap in `ScrollProvider`, add `WorldSceneLoader`, restructure layout to `600vh` sticky chapters |
| `app/layout.tsx` | No change |
| `app/globals.css` | Add sticky chapter layout utilities, overlay z-index tokens |
| `components/sections/Hero.tsx` | Remove old `HeroScene` (replaced by WorldScene), adapt to sticky chapter |
| `components/sections/About.tsx` | Adapt to sticky chapter, scroll-synced line reveal |
| `components/sections/Education.tsx` | Adapt timeline draw to chapter scroll range |
| `components/sections/Skills.tsx` | Adapt to sticky chapter |
| `components/sections/Projects.tsx` | Adapt to sticky chapter |
| `components/sections/Contact.tsx` | Adapt to sticky chapter |
| `components/three/HeroScene.tsx` | Deprecated (replaced by WorldScene) |

---

## 10. Performance Budget

- JS bundle delta: `@react-three/postprocessing` (~80KB gz, desktop-only dynamic import).
- No new image assets.
- `particleTargets.ts` runs once on mount, result memoized. No per-frame allocation.
- `useFrame` touches only typed arrays and one `Points` ref. No React state updates in render loop.
- Target: 60fps desktop, 60fps mobile-3D, 60fps mobile-lite (CSS only).

---

## 11. Open Questions (resolved)

- Image-sequence vs real-time 3D → **real-time R3F** (no asset pipeline, responsive, themeable).
- Rebuild scope → **full presentation rebuild, content/data unchanged**.
- Mobile → **tiered capability, not degraded** — same narrative arc on all devices.
