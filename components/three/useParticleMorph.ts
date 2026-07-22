// Morph hook: owns the live position/color buffers and lerps them toward the
// active chapter's target each frame. All mutation is on typed arrays — no
// React state in the render loop, so it never triggers re-renders.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollState } from "@/context/ScrollContext";
import type { ChapterTargets } from "./particleTargets";

export function useParticleMorph(count: number, targets: ChapterTargets) {
  const pointsRef = useRef<THREE.Points | null>(null);
  const { activeIndex } = useScrollState();

  // Live buffers, initialised to chapter 0 (home sphere).
  const positions = useMemo(() => Float32Array.from(targets.positions[0]), [targets, count]);
  const colors = useMemo(() => Float32Array.from(targets.colors[0]), [targets, count]);

  // Reusable pointer parallax target (avoids per-frame allocation).
  const parallax = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const idx = Math.max(0, Math.min(targets.positions.length - 1, activeIndex));
    const targetPos = targets.positions[idx];
    const targetCol = targets.colors[idx];

    // Frame-rate-independent lerp factor. Smaller base = snappier morph.
    const posK = 1 - Math.pow(0.0015, delta);
    const colK = 1 - Math.pow(0.02, delta);

    for (let i = 0; i < positions.length; i++) {
      positions[i] += (targetPos[i] - positions[i]) * posK;
    }
    for (let i = 0; i < colors.length; i++) {
      colors[i] += (targetCol[i] - colors[i]) * colK;
    }

    const pts = pointsRef.current;
    if (pts) {
      const geo = pts.geometry;
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // Idle rotation + gentle pointer parallax.
      pts.rotation.y += delta * 0.05;
      parallax.current.x += (state.pointer.x * 0.25 - parallax.current.x) * 0.04;
      parallax.current.y += (state.pointer.y * 0.25 - parallax.current.y) * 0.04;
      pts.rotation.x = parallax.current.y;
      pts.position.x = parallax.current.x;
    }
  });

  return { positions, colors, pointsRef };
}
