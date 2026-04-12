"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  // Default to showing — we'll detect touch after mount
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show cursor glow on non-touch devices
    const hasPointer = window.matchMedia("(pointer: fine)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hasPointer && !visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!hasPointer) return;
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;
      setIsHovered(isInteractive);
    };

    if (!hasPointer) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] rounded-full blur-[80px]"
      style={{
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        width: isHovered ? 400 : 250,
        height: isHovered ? 400 : 250,
        background: isHovered
          ? "rgba(168, 85, 247, 0.15)"
          : "rgba(34, 211, 238, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
    />
  );
}