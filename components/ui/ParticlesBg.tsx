"use client";

import Particles from "@tsparticles/react";

export default function ParticlesBg() {
  return (
    <Particles
      options={{
        particles: {
          color: { value: "#00f0ff" },
          links: {
            enable: true,
            color: "#00f0ff",
            opacity: 0.2,
          },
          move: { enable: true, speed: 1 },
          size: { value: 2 },
          opacity: { value: 0.5 },
        },
      }}
      className="fixed inset-0 z-0"
    />
  );
}