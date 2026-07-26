"use client";

// Device-tier probe + lazy loader for the WorldScene. Keeps the heavy WebGL
// bundle out of the initial load and off low-capability devices entirely.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Module scope (not per-render useMemo): the conventional pattern, and the
// dynamic() identity can never churn across renders.
const WorldScene = dynamic(() => import("./WorldScene"), { ssr: false });

interface Tier {
  count: number;
  bloom: boolean;
}

// Probe once on mount. Returns null for the "mobile-lite" tier (no WebGL) so
// the CSS/framer fallback carries the experience instead.
function probeTier(): Tier | null {
  if (typeof window === "undefined") return null;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  // Very weak hardware: skip WebGL entirely.
  if ((navigator.hardwareConcurrency ?? 4) <= 2) return null;

  // GPU capability check via a throwaway context.
  let gpuOk = false;
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl") ||
      c.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (gl) {
      gpuOk = gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 4096;
      // Release the probe context — browsers cap live WebGL contexts at ~8-16
      // and this one would otherwise linger alongside the real canvas.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    gpuOk = false;
  }
  if (!gpuOk) return null;

  // Touch devices get the trimmed tier regardless of width: a landscape phone
  // is 900px+ wide and an Android tablet exceeds 1024px, but neither should
  // run the 4000-particle + bloom desktop budget on a mobile GPU.
  const w = window.innerWidth;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (coarse) return { count: w >= 768 ? 1200 : 800, bloom: false };

  if (w >= 1024) return { count: 4000, bloom: true };
  return { count: 1500, bloom: false };
}

export default function WorldSceneLoader() {
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot capability probe on mount (window unavailable during SSR)
    setTier(probeTier());
  }, []);

  if (!tier) return null;

  return (
    <div className="world-canvas" aria-hidden="true">
      <WorldScene particleCount={tier.count} bloom={tier.bloom} />
    </div>
  );
}
