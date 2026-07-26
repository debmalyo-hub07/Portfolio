"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useFinePointer } from "./useFinePointer";

export default function Card3D({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Spotlight position as motion values — driving the gradient through a
  // motion template avoids a React re-render on every mousemove.
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${gx}px ${gy}px, rgba(0, 240, 255, 0.15), transparent 40%)`;

  const fine = useFinePointer();

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    gx.set(mouseX);
    gy.set(mouseY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Touch devices get the static card: no hover, no tilt, no compositing
  // layers burned on preserve-3d for an effect that can never trigger.
  if (!fine) {
    return (
      <div className="relative panel p-1">
        <div className="relative h-full w-full bg-white/5 rounded-[22px] p-6">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative panel p-1 group cursor-default"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full bg-white/5 rounded-[22px] p-6 transition-colors group-hover:bg-white/[0.07]"
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[22px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {children}
      </div>
    </motion.div>
  );
}
