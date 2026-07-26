"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide scroll + motion configuration.
 *
 * Lenis runs everywhere with syncTouch OFF: touch input is never intercepted,
 * so phones and tablets keep native momentum scrolling while wheel/trackpad
 * users get the smoothed scroll. This replaces the old width<768 gate, which
 * (a) gave touch tablets >=768px a hijacked, janky scroll via syncTouch:true
 * and (b) mounted Lenis on phones for one render before unmounting — a full
 * remount of the page tree right after hydration.
 *
 * MotionConfig reducedMotion="user" makes every framer-motion animation
 * respect the OS prefers-reduced-motion setting (framer's default ignores
 * it — the CSS kill-switch in globals.css only covers CSS animations).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, syncTouch: false }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
