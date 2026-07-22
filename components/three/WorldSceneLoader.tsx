"use client";

// Device-tier probe + lazy loader for the WorldScene. Keeps the heavy WebGL
// bundle out of the initial load and off low-capability devices entirely.

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

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

  const w = window.innerWidth;

  // GPU capability check via a throwaway context.
  let gpuOk = false;
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl") ||
      c.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (gl) {
      gpuOk = gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 4096;
    }
  } catch {
    gpuOk = false;
  }
  if (!gpuOk) return null;

  if (w >= 1024) return { count: 4000, bloom: true };
  if (w >= 768) return { count: 1500, bloom: false };
  return { count: 800, bloom: false }; // capable phones
}

export default function WorldSceneLoader() {
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot capability probe on mount (window unavailable during SSR)
    setTier(probeTier());
  }, []);

  const WorldScene = useMemo(
    () => dynamic(() => import("./WorldScene"), { ssr: false }),
    [],
  );

  if (!tier) return null;

  return (
    <div className="world-canvas">
      <WorldScene particleCount={tier.count} bloom={tier.bloom} />
    </div>
  );
}
