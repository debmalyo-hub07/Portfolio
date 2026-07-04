"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Blob() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // gentle idle rotation
    mesh.current.rotation.y = t * 0.15;
    mesh.current.rotation.z = t * 0.05;
    // ease toward pointer for interactivity
    const { x, y } = state.pointer;
    mesh.current.rotation.x += (y * 0.4 - mesh.current.rotation.x) * 0.05;
    mesh.current.position.x += (x * 0.4 - mesh.current.position.x) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={mesh} args={[1.35, 12]}>
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#7c3aed"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          distort={0.42}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={2.2} color="#00f0ff" />
      <directionalLight position={[-3, -2, 2]} intensity={1.6} color="#ff00ff" />
      <pointLight position={[0, 0, 3]} intensity={1.4} color="#00ff88" />
      <Blob />
    </Canvas>
  );
}
