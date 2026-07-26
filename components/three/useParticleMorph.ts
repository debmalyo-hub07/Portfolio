// Morph hook: owns the live position/color buffers and lerps them toward the
// active chapter's target each frame. All mutation is on typed arrays — no
// React state in the render loop, so it never triggers re-renders.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { useScrollState } from "@/context/ScrollContext";
import type { ChapterTargets } from "./particleTargets";

export function useParticleMorph(count: number, targets: ChapterTargets) {
  const pointsRef = useRef<THREE.Points | null>(null);
  const { activeIndex } = useScrollState();

  // Live buffers, initialised to chapter 0 (home sphere). `count` is baked
  // into `targets`, so it's not a separate dependency.
  const positions = useMemo(() => Float32Array.from(targets.positions[0]), [targets]);
  const colors = useMemo(() => Float32Array.from(targets.colors[0]), [targets]);

  // Convergence gate: an exponential lerp never mathematically arrives, so
  // without this the loop mutated + re-uploaded both GPU buffers on every
  // frame for the lifetime of the page — the dominant idle battery cost on
  // phones. Once settled we skip the loop and the uploads until the chapter
  // changes again.
  const settled = useRef(false);
  const lastIdx = useRef(-1);

  useFrame((_, delta) => {
    const idx = Math.max(0, Math.min(targets.positions.length - 1, activeIndex));
    if (idx !== lastIdx.current) {
      lastIdx.current = idx;
      settled.current = false;
    }

    const pts = pointsRef.current;
    if (!pts) return;

    if (!settled.current) {
      const targetPos = targets.positions[idx];
      const targetCol = targets.colors[idx];

      // Frame-rate-independent lerp factor. Smaller base = snappier morph.
      const posK = 1 - Math.pow(0.0015, delta);
      const colK = 1 - Math.pow(0.02, delta);

      // In-place typed-array mutation inside the rAF loop is the r3f idiom —
      // these buffers are GPU attribute storage, not React state.
      let maxStep = 0;
      for (let i = 0; i < positions.length; i++) {
        const d = (targetPos[i] - positions[i]) * posK;
        // eslint-disable-next-line react-hooks/immutability
        positions[i] += d;
        const a = Math.abs(d);
        if (a > maxStep) maxStep = a;
      }
      for (let i = 0; i < colors.length; i++) {
        // eslint-disable-next-line react-hooks/immutability
        colors[i] += (targetCol[i] - colors[i]) * colK;
      }

      const geo = pts.geometry;
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      if (maxStep < 0.0005) settled.current = true;
    }

    // Idle rotation is a transform uniform, not a buffer upload — cheap.
    pts.rotation.y += delta * 0.05;
  });

  return { positions, colors, pointsRef };
}
