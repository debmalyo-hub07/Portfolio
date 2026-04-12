"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiJavascript, SiPython } from "react-icons/si";

const logos = [
  { icon: <FaReact />, color: "text-[#61DAFB]" },
  { icon: <SiNextdotjs />, color: "text-white" },
  { icon: <SiTypescript />, color: "text-[#3178C6]" },
  { icon: <FaNodeJs />, color: "text-[#339933]" },
  { icon: <SiTailwindcss />, color: "text-[#06B6D4]" },
  { icon: <FaJava />, color: "text-[#ED8B00]" },
  { icon: <SiMongodb />, color: "text-[#47A248]" },
  { icon: <FaGitAlt />, color: "text-[#F05032]" },
  { icon: <SiJavascript />, color: "text-[#F7DF1E]" },
  { icon: <SiPython />, color: "text-[#3776AB]" },
  { icon: <FaDatabase />, color: "text-cyan-400" },
  { icon: <SiNextdotjs />, color: "text-white" },
];

type LogoPosition = {
  startX: number;
  startY: number;
  duration: number;
  rotate: number;
  scale: number;
  fontSize: number;
  endX1: number;
  endX2: number;
  endY1: number;
  endY2: number;
  scaleMid: number;
};

function generatePositions(): LogoPosition[] {
  return logos.map(() => ({
    startX: Math.random() * window.innerWidth,
    startY: Math.random() * window.innerHeight,
    duration: 25 + Math.random() * 25,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 1.5,
    fontSize: 40 + Math.random() * 60,
    endX1: Math.random() * 400 - 200,
    endX2: Math.random() * 400 - 200,
    endY1: Math.random() * 400 - 200,
    endY2: Math.random() * 400 - 200,
    scaleMid: 0.8 + Math.random() * 1.2,
  }));
}

export default function FloatingLogos() {
  // null = not yet mounted; an array = mounted with positions
  const [logoPositions, setLogoPositions] = useState<LogoPosition[] | null>(null);

  useEffect(() => {
    const handleResize = () => setLogoPositions(generatePositions());
    // First generation happens inside the resize handler equivalent
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!logoPositions) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {logos.map((logo, i) => {
        const pos = logoPositions[i];
        if (!pos) return null;

        return (
          <motion.div
            key={i}
            className={`absolute ${logo.color} opacity-5`}
            initial={{
              x: pos.startX,
              y: pos.startY,
              rotate: pos.rotate,
              scale: pos.scale,
            }}
            animate={{
              x: [pos.startX, pos.startX + pos.endX1, pos.startX + pos.endX2, pos.startX],
              y: [pos.startY, pos.startY + pos.endY1, pos.startY + pos.endY2, pos.startY],
              rotate: [0, 180, 360],
              scale: [pos.scale, pos.scaleMid, pos.scale],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
            }}
            style={{
              fontSize: `${pos.fontSize}px`,
            }}
          >
            {logo.icon}
          </motion.div>
        );
      })}
    </div>
  );
}
