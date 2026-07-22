"use client";

// The persistent WebGL protagonist. One Points cloud morphing between chapter
// shapes, optional bloom on capable devices. Sits behind all DOM content.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { buildTargets } from "./particleTargets";
import { useParticleMorph } from "./useParticleMorph";
import { useScrollState } from "@/context/ScrollContext";

interface WorldSceneProps {
  particleCount: number;
  bloom: boolean;
}

function Particles({ count }: { count: number }) {
  const targets = useMemo(() => buildTargets(count), [count]);
  const { positions, colors, pointsRef } = useParticleMorph(count, targets);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
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
    camera.position.z += (targetZ - camera.position.z) * (1 - Math.pow(0.05, delta));
  });
  return null;
}

export default function WorldScene({ particleCount, bloom }: WorldSceneProps) {
  const dpr = useRef<[number, number]>([1, bloom ? 1.75 : 1.25]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={dpr.current}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.6} color="#00f0ff" />
      <directionalLight position={[-3, -2, 2]} intensity={1.2} color="#ff00ff" />
      <pointLight position={[0, 0, 3]} intensity={1.0} color="#00ff88" />

      <Particles count={particleCount} />
      <CameraRig />

      {bloom && (
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
