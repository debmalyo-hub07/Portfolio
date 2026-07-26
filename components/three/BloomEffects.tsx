"use client";

// Split into its own lazy chunk: @react-three/postprocessing (+ postprocessing)
// is ~150-200KB min and only the desktop bloom tier ever executes it. Mobile
// tiers must not pay to download and parse it.

import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BloomEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}
