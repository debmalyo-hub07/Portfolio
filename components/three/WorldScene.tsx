"use client";

// The persistent WebGL protagonist. One Points cloud morphing between chapter
// shapes, optional bloom on capable devices. Sits behind all DOM content.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { lazy, Suspense, useMemo } from "react";
import { AdditiveBlending } from "three";
import { buildTargets } from "./particleTargets";
import { useParticleMorph } from "./useParticleMorph";
import { useScrollState } from "@/context/ScrollContext";

// Lazy: keeps the postprocessing library out of the mobile bundle entirely —
// only the desktop bloom tier ever fetches this chunk.
const BloomEffects = lazy(() => import("./BloomEffects"));

interface WorldSceneProps {
  particleCount: number;
  bloom: boolean;
}

function Particles({ count }: { count: number }) {
  const targets = useMemo(() => buildTargets(count), [count]);
  const { positions, colors, pointsRef } = useParticleMorph(count, targets);

  return (
    // raycast disabled defensively: Points.raycast tests every particle and
    // must never run if the canvas ever becomes interactive.
    <points ref={pointsRef} raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      {/* pointsMaterial is unlit — vertex colors are the only color source,
          so the scene needs no lights. */}
      <pointsMaterial
        size={0.035}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

// Scroll-driven camera dolly: eases in through the middle chapters, pulls back
// at the end for the reassembly reveal.
function CameraRig() {
  const { camera } = useThree();
  const { scrollProgress } = useScrollState();
  useFrame((_, delta) => {
    const p = scrollProgress.get(); // 0..1
    // 5.0 at edges, ~3.6 mid-page (sinusoidal push-in).
    const targetZ = 5 - Math.sin(p * Math.PI) * 1.4;
    // Mutating the three.js camera inside the rAF loop is the r3f idiom.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z += (targetZ - camera.position.z) * (1 - Math.pow(0.05, delta));
  });
  return null;
}

export default function WorldScene({ particleCount, bloom }: WorldSceneProps) {
  // Stable identity across renders; bloom never changes after mount.
  const dpr = useMemo<[number, number]>(() => [1, bloom ? 1.75 : 1.25], [bloom]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={dpr}
      // antialias off: MSAA can't smooth additive point sprites and costs
      // fill-rate on tile-based mobile GPUs (the bloom tier renders through an
      // FBO where canvas MSAA is bypassed anyway). powerPreference only forces
      // the high-power GPU where bloom already demands it.
      gl={{
        antialias: false,
        alpha: true,
        stencil: false,
        powerPreference: bloom ? "high-performance" : "default",
      }}
      style={{ background: "transparent" }}
    >
      <Particles count={particleCount} />
      <CameraRig />

      {bloom && (
        <Suspense fallback={null}>
          <BloomEffects />
        </Suspense>
      )}
    </Canvas>
  );
}
