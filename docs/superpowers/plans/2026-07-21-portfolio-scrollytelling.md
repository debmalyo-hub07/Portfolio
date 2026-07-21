# Portfolio Scrollytelling Implementation Plan

> **For agentic workers:** Implement task-by-task. 3D/visual work — verification is `npm run build` + Playwright screenshots, not unit tests (no meaningful assertions for a morph animation).

**Goal:** Rebuild the portfolio presentation layer into a premium scrollytelling experience with a persistent WebGL particle-morph protagonist, keeping all content (resume.json + lib/resume.ts) and the server-component data pipeline untouched.

**Architecture:** One fixed full-viewport `<Canvas>` behind the DOM renders a `THREE.Points` cloud that morphs between six chapter shapes. An `IntersectionObserver`-based `ScrollContext` tracks the active chapter; `useFrame` lerps particle positions/colors toward the active chapter's precomputed target buffer. Sections stay natural-flow (no clip risk). Lenis + framer-motion unchanged. Device-tier probe scales particle count and strips bloom on mobile.

**Tech Stack:** Next 16, React 19, @react-three/fiber 9, @react-three/drei 10, @react-three/postprocessing 3, three 0.185, framer-motion 12, lenis 1.3, Tailwind 4.

## Global Constraints

- Next 16 App Router: `ssr:false` dynamic import ONLY inside a Client Component (never a Server Component).
- Do NOT modify `data/resume.json`, `lib/resume.ts` types, or the `getResumeData`/`getCvUrl` server calls in `page.tsx`.
- Preserve existing a11y gates: `prefers-reduced-motion` (CSS + JS probe), mobile `<768px` backdrop-filter stripping.
- Brand palette (from globals.css): `--primary:#00f0ff` cyan, `--secondary:#ff00ff` fuchsia, `--accent:#00ff88` emerald, `--background:#020617`.
- Canvas is `pointer-events:none`, behind DOM (`z-index:0`); DOM content `z-index:1`; Navbar `z-index:50`.
- Verify with `npm run build` (Turbopack) before every commit.

---
## File Structure

**New files:**
- `context/ScrollContext.tsx` — provider: active chapter index (0–5) + `activeChapterId` string, set via IntersectionObserver; also exposes a `scrollProgress` MotionValue (0–1 page progress) for the Hero scrub and overlays.
- `components/three/particleTargets.ts` — pure math, no imports beyond `three`. Exports `buildTargets(count: number): ChapterTargets`.
- `components/three/useParticleMorph.ts` — hook: owns current/target position + color Float32Arrays, lerps them each frame toward the active chapter target.
- `components/three/WorldScene.tsx` — the `<Canvas>` + `<Points>` + lights + optional `<Bloom>`. Reads active chapter from context.
- `components/three/WorldSceneLoader.tsx` — Client Component: device-tier probe → dynamic `ssr:false` import of WorldScene, passes `particleCount` + `bloom` props. Renders nothing on mobile-lite.
- `components/ui/ScrollOverlay.tsx` — cinematic scroll-synced text lines sourced from `profile.taglines` + `profile.quote`.

**Modified files:**
- `app/page.tsx` — wrap in `<ScrollProvider>`, mount `<WorldSceneLoader/>` + `<ScrollOverlay/>`, add `data-chapter` attributes, keep section order + server data.
- `app/globals.css` — add `.world-canvas` fixed layer + overlay z-index; no token removal.
- `components/sections/Hero.tsx` — drop old `HeroScene` import (WorldScene replaces it), keep all DOM, add scroll-scrub fade.
- `components/three/HeroScene.tsx` — deleted (superseded).

**Interface contracts (verbatim — every task depends on these):**

```ts
// context/ScrollContext.tsx
export type ChapterId = "home" | "about" | "education" | "skills" | "projects" | "contact";
export const CHAPTERS: ChapterId[] = ["home","about","education","skills","projects","contact"];
export interface ScrollState {
  activeIndex: number;            // 0..5, current chapter in view
  activeId: ChapterId;
  scrollProgress: import("framer-motion").MotionValue<number>; // 0..1 whole-page
}
export function ScrollProvider(props: { children: React.ReactNode }): JSX.Element;
export function useScrollState(): ScrollState;

// components/three/particleTargets.ts
export interface ChapterTargets {
  positions: Float32Array[]; // length 6, each Float32Array(count*3)
  colors: Float32Array[];    // length 6, each Float32Array(count*3), rgb 0..1
}
export function buildTargets(count: number): ChapterTargets;

// components/three/useParticleMorph.ts
export function useParticleMorph(
  count: number,
  targets: ChapterTargets,
): { positions: Float32Array; colors: Float32Array; pointsRef: React.RefObject<THREE.Points | null> };
```

---

### Task 1: ScrollContext provider

**Files:**
- Create: `context/ScrollContext.tsx`

**Interfaces:** Produces `ScrollProvider`, `useScrollState`, `CHAPTERS`, `ChapterId`, `ScrollState` (see contracts above).

**Steps:**
- [ ] Implement `"use client"` context. `scrollProgress` = `useScroll().scrollYProgress` from framer-motion (whole document).
- [ ] `activeIndex` state (default 0). On mount, `IntersectionObserver` over `document.querySelectorAll("[data-chapter]")`, `rootMargin: "-45% 0px -45% 0px"`, threshold 0 → the element whose center is nearest viewport center sets `activeIndex` = its `data-chapter-index`.
- [ ] Guard SSR: only attach observer in `useEffect`. Clean up on unmount.
- [ ] Provide `{ activeIndex, activeId: CHAPTERS[activeIndex], scrollProgress }`.
- [ ] `useScrollState` throws if used outside provider.
- [ ] Verify: `npm run build`. Expected: compiles, no type errors.
- [ ] Commit: `feat: scroll context (active-chapter + progress)`.

### Task 2: Particle target shapes

**Files:**
- Create: `components/three/particleTargets.ts`

**Interfaces:** Produces `buildTargets(count)` → `ChapterTargets`. Consumes `three`.

**Shapes (index → math), all centered at origin, radius ~1.6:**
- [ ] 0 home: **fibonacci sphere** (even distribution).
- [ ] 1 about: **torus** (R=1.3, r=0.45).
- [ ] 2 education: **vertical helix/constellation** — points on an ascending spiral, y ∈ [-1.8,1.8].
- [ ] 3 skills: **three clusters** — partition count into 3, each a small sphere offset left/center/right; colors = cyan/fuchsia/emerald per cluster.
- [ ] 4 projects: **scattered shards** — random points in a box [-2,2]³ with slight shell bias.
- [ ] 5 contact: **fibonacci sphere** (same as home = reassembly, full circle).
- [ ] Colors: chapters 0,1,5 = cyan→fuchsia gradient by position; 2 = cyan; 3 = per-cluster triad; 4 = fuchsia→emerald.
- [ ] Deterministic seeded RNG (mulberry32) so builds are stable.
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: particle target shapes`.

### Task 3: Particle morph hook

**Files:**
- Create: `components/three/useParticleMorph.ts`

**Interfaces:** Consumes `ChapterTargets`, `useScrollState`. Produces `{ positions, colors, pointsRef }`.

**Steps:**
- [ ] Allocate persistent `positions`/`colors` Float32Array(count*3) via `useMemo`, init to chapter 0.
- [ ] `useFrame`: read `activeIndex` from context; lerp each component of `positions` toward `targets.positions[activeIndex]` by factor `1 - Math.pow(0.001, delta)` (frame-rate-independent, ~fast); same for `colors`.
- [ ] After lerp, set `pointsRef.current.geometry.attributes.position.needsUpdate = true` and `.color.needsUpdate = true`.
- [ ] Add slow global rotation on `pointsRef` (y += delta*0.05) + gentle pointer parallax (ease toward `state.pointer`).
- [ ] No React state in the loop (mutate typed arrays only).
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: particle morph lerp hook`.

### Task 4: WorldScene canvas

**Files:**
- Create: `components/three/WorldScene.tsx`

**Interfaces:** Props `{ particleCount: number; bloom: boolean }`. Consumes `buildTargets`, `useParticleMorph`.

**Steps:**
- [ ] `"use client"`. `<Canvas camera={{position:[0,0,5],fov:45}} dpr={[1, bloom?1.75:1.25]} gl={{antialias:true,alpha:true}} style={{background:"transparent"}}>`.
- [ ] `buildTargets(particleCount)` memoized. Inner `<Particles>` component uses `useParticleMorph`.
- [ ] `<points ref={pointsRef}>` with `<bufferGeometry>` + position/color attributes bound to the hook arrays; `<pointsMaterial size={0.035} vertexColors sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending}/>`.
- [ ] Lights: keep hero triad (ambient + 2 directional cyan/fuchsia + point emerald) — subtle, points are additive so mostly self-lit.
- [ ] If `bloom`: wrap in `<EffectComposer><Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur/></EffectComposer>` from `@react-three/postprocessing`.
- [ ] Camera Z eased by `scrollProgress` (push in mid-page, pull back at end) via `useFrame` reading context.
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: WorldScene particle canvas`.

### Task 5: WorldSceneLoader + device tiers

**Files:**
- Create: `components/three/WorldSceneLoader.tsx`

**Interfaces:** No props. Dynamic-imports WorldScene `ssr:false`.

**Tiers (probe on mount):** desktop ≥1024 & motion-safe & MAX_TEXTURE_SIZE≥4096 → count 4000, bloom true. tablet 768–1023 & motion-safe → 1500, bloom false. mobile <768 & motion-safe & gpu ok → 800, bloom false. else → render `null` (mobile-lite, CSS fallback handles hero).

**Steps:**
- [ ] `"use client"`. `useState<{count:number;bloom:boolean}|null>(null)`.
- [ ] `useEffect` one-shot probe: reduced-motion via matchMedia; width buckets; GPU via throwaway canvas `getContext("webgl")` + `MAX_TEXTURE_SIZE`. Set tier or null.
- [ ] `const WorldScene = useMemo(()=>dynamic(()=>import("./WorldScene"),{ssr:false}),[])`.
- [ ] Render fixed wrapper `<div className="world-canvas">` only when tier set; else null.
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: WorldScene loader + device tiers`.

### Task 6: ScrollOverlay

**Files:**
- Create: `components/ui/ScrollOverlay.tsx`

**Interfaces:** Props `{ taglines: string[]; quote: string }`. Consumes `useScrollState` (`scrollProgress`).

**Steps:**
- [ ] `"use client"`. 4 fixed-centered `motion.p` lines, opacity via `useTransform(scrollProgress,[in,peak,out],[0,1,0])` at progress windows ~0.22, 0.42, 0.62, 0.82. Text = taglines[1], taglines[2], taglines[3], quote.
- [ ] `pointer-events:none`, big tracking-tight type, `text-white/80`, staggered blur-in.
- [ ] Hidden on reduced-motion (matchMedia guard → render null).
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: cinematic scroll overlays`.

### Task 7: globals.css layers

**Files:**
- Modify: `app/globals.css`

**Steps:**
- [ ] Add `.world-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }` and ensure DOM `<main>` sits above. Add `.scroll-overlay { position: fixed; inset: 0; z-index: 5; pointer-events: none; display:flex; align-items:center; justify-content:center; }`.
- [ ] No removal of existing tokens/layers.
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: world canvas + overlay css layers`.

### Task 8: Wire page.tsx

**Files:**
- Modify: `app/page.tsx`

**Steps:**
- [ ] Keep server `getResumeData()`/`getCvUrl()`. Import `ScrollProvider`, `WorldSceneLoader`, `ScrollOverlay`.
- [ ] Wrap `<main>` content in `<ScrollProvider>`. Put `<WorldSceneLoader/>` first (behind), then `<main className="relative z-[1]">`.
- [ ] Give each section wrapper `data-chapter={id} data-chapter-index={n}`: home=0 about=1 education=2 skills=3 projects=4 contact=5. TechMarquee stays between About and Education (no data-chapter).
- [ ] `<ScrollOverlay taglines={data.profile.taglines} quote={data.profile.quote}/>`.
- [ ] Verify: `npm run build`.
- [ ] Commit: `feat: wire scrollytelling into page`.

### Task 9: Adapt Hero + delete HeroScene

**Files:**
- Modify: `components/sections/Hero.tsx`
- Delete: `components/three/HeroScene.tsx`

**Steps:**
- [ ] Remove `dynamic(HeroScene)` import + `enable3D` mount of `<HeroScene/>` (WorldScene now provides the 3D). Keep the orbital-ring avatar DOM (it frames the canvas core nicely).
- [ ] Keep name/typewriter/CTA/badges. Add scroll-scrub: entire hero `motion.div` opacity+y driven by `useScroll` local `scrollYProgress` so it fades as chapter leaves.
- [ ] Delete `components/three/HeroScene.tsx`.
- [ ] Verify: `npm run build`.
- [ ] Commit: `refactor: hero uses shared WorldScene`.

### Task 10: Build + Playwright verification

**Steps:**
- [ ] `npm run build` — clean.
- [ ] `npm run dev`, Playwright: desktop 1440×900 + mobile 390×844. Screenshot each chapter (scroll to each `data-chapter`). Assert no console errors, no horizontal scroll, hero visible, sections legible (no clip).
- [ ] `npm audit fix` (non-breaking) for pre-existing dev-dep vulns.
- [ ] Commit: `test: playwright scrollytelling verification`.

## Self-Review

- Spec §3 scroll engine → Tasks 1,4,8. §4 protagonist → Tasks 2,3,4. §4.4 tiers → Task 5. §5 arc → Tasks 2,8. §6 sections → Task 9 (+ existing sections keep whileInView). §7 overlays → Task 6. §8 mobile → Task 5 (lite=null) + existing CSS. §9 files → all tasks. §10 perf → Tasks 3,5. No placeholders; interfaces consistent (`buildTargets`, `useParticleMorph`, `useScrollState`, `ChapterTargets` used identically across tasks).
- Deviation from spec §5: sections are natural-flow (not `sticky;height:100vh`) to avoid content clipping on tall sections (Skills/Projects/Contact). Morph triggers on IntersectionObserver active-chapter instead of raw scroll-scrub. Same narrative, robust. Hero keeps scroll-scrub fade.

