@AGENTS.md

# Portfolio — project guide

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 4 · framer-motion · three.js (react-three-fiber) · lenis.

## Resume-driven content pipeline

All section content is data-driven, not hardcoded:

- `data/resume.json` — single source of truth for HOME/ABOUT/EDUCATION/SKILLS/PROJECTS content **and** contact/social URLs (`profile.socials`: github, linkedin, whatsapp). Edit this to update the site; every section re-renders on the next build.
- `lib/resume.ts` — server-only helpers:
  - `getResumeData()` — typed read of `resume.json`.
  - `getCvUrl()` — scans `public/resume/` for PDFs matching `*_YYYY-MM.pdf`, sorts on the extracted date (an undated stray like `Resume.pdf` can never shadow a dated file), returns the newest.
- `lib/site.ts` — `SITE_URL` canonical origin. Change here on domain move; feeds metadata, sitemap, robots, and the Person JSON-LD in `page.tsx`.
- `app/page.tsx` is a Server Component: it calls the helpers and passes data + `cvUrl` as props to the section Client Components (Footer gets `profile.socials`).

### Updating the CV
Drop a new PDF into `public/resume/` named with a later date suffix (e.g. `Debmalyo_Barman_Resume_2027-01.pdf`), commit, and redeploy. The download button (Hero + Navbar) auto-points to the newest file. No code change.

### Updating projects / skills / education / about
Edit the relevant array in `data/resume.json`.
- Skill/category icons resolve from the `skillIcons` registry in `components/sections/Skills.tsx` — add an entry for a new skill name.
- Project `theme.primary` hover colors resolve from the `titleHoverColors` map in `components/sections/Projects.tsx` — add the full `group-hover:text-*` string there for a new theme color. **Never interpolate Tailwind class fragments at runtime** (`group-hover:${...}`) — the JIT scanner can't see them, so no CSS is generated.

## Mobile / touch rules (hard-won — do not regress)

- **Hover-only JS effects must ignore touch.** Mobile browsers fire a synthetic `mousemove` at the tap point but no `mouseleave`, so unguarded tilt/magnetic effects freeze mid-state after every tap. Pattern: pointer events + `if (e.pointerType !== "mouse") return`, and/or render a static fallback when `useFinePointer()` (`components/ui/useFinePointer.ts`) is false. TiltCard, Card3D, MagneticButton all do this.
- **Custom CSS `:hover` rules go inside `@media (hover: hover) and (pointer: fine)`** (see `.panel-hover`, `.btn-*` in globals.css). Tailwind 4's own `hover:` variants are already gated — hand-written CSS is not.
- **Lenis runs everywhere with `syncTouch: false`** (`components/ui/SmoothScroll.tsx`) — touch scrolling stays native on phones/tablets; wheel gets the smoothing. Do not reintroduce a width-based gate (it hijacked iPad scroll and remounted the tree on phones) and do not enable `syncTouch`.
- **`<MotionConfig reducedMotion="user">`** lives in SmoothScroll — framer-motion ignores `prefers-reduced-motion` by default. The globals.css kill-switch only covers CSS animations.
- Section rhythm: `py-16 md:py-32` on sections, `space-y-16 md:space-y-32` in `page.tsx`. Touch targets ≥44px (`min-h-11 md:min-h-0` on pill buttons).
- The `@media (max-width: 767px)` block in globals.css strips `backdrop-filter` for perf and compensates `.glass` / `.panel` with solid fills — keep both compensations if adding surfaces.

## three.js scene (components/three/)

- `WorldSceneLoader.tsx` probes device tier once: reduced-motion / ≤2 cores / weak GPU → no WebGL; `pointer: coarse` → 800–1200 particles, no bloom; desktop ≥1024px → 4000 + bloom.
- Bloom lives in `BloomEffects.tsx` behind `React.lazy` so `@react-three/postprocessing` never ships to mobile. Keep it a separate chunk.
- `useParticleMorph.ts` has a convergence gate — buffer uploads (`needsUpdate`) stop once the morph settles. Any edit to the morph loop must preserve this; per-frame uploads forever were the top mobile battery cost.
- Canvas is `pointer-events: none` and `raycast={() => null}` on the points — the scene is non-interactive by design; `state.pointer` is always (0,0) here.

## Conventions
- Sections are `"use client"` and receive data via props from the server `page.tsx`.
- three.js loads via `next/dynamic` with `ssr:false` from inside a Client Component only (Next 16 forbids `ssr:false` in Server Components); the `dynamic()` call sits at module scope.
- Contact form has **no backend** — it composes a `mailto:` from the fields. If wiring a real service (Formspree/Resend/route handler), replace `handleSubmit` in `components/sections/Contact.tsx`; inputs already have `name`/`autocomplete`.
- SEO surface: `app/layout.tsx` (Metadata + Viewport exports), `app/opengraph-image.tsx` (generated share card), `app/sitemap.ts`, `app/robots.ts`, Person JSON-LD in `page.tsx`. Exactly one `<h1>` (Hero name) — the navbar logo is an `<a>`, keep it that way.
- Verify with `npm run build` **and** `npm run lint` before committing. R3F's imperative mutations need targeted `eslint-disable-next-line react-hooks/immutability` comments — don't blanket-disable the rule.
