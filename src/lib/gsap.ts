"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, type RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px)",
} as const;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Conditions = { motion: boolean; desktop: boolean };

/**
 * Scoped GSAP setup for one section. `setup` runs only when motion is allowed and re-runs
 * when the desktop breakpoint flips. Everything is reverted on unmount / breakpoint change,
 * so the server-rendered (final, readable) state is what reduced-motion users see.
 */
export function useScrollScene(
  scope: RefObject<HTMLElement | null>,
  setup: (root: HTMLElement, c: Conditions) => void,
) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    let mm: gsap.MatchMedia | undefined;
    // Defer setup until the browser is idle: SplitText + ScrollTrigger measure layout, and doing
    // that during first paint delays the hero (LCP). Sections below the fold aren't visible yet.
    const start = () => {
      mm = gsap.matchMedia(root);
      mm.add(MQ, (ctx) => {
        const c = ctx.conditions as Conditions;
        if (!c.motion) return;
        setup(root, c);
      });
    };
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(start, { timeout: 1200 });
    return () => {
      cic(id);
      mm?.revert();
    };
  }, []);
}
