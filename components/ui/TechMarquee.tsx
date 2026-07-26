"use client";

import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaPython,
  FaLinux,
  FaDocker,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiFramer,
} from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";
import type { ReactNode } from "react";

// A deliberate, readable ticker of the stack — replaces the old barely-visible
// (opacity-5) FloatingLogos noise with one purposeful, low-cost strip.
const items: { icon: ReactNode; label: string; color: string }[] = [
  { icon: <FaReact />, label: "React", color: "text-[#61DAFB]" },
  { icon: <SiNextdotjs />, label: "Next.js", color: "text-white" },
  { icon: <SiTypescript />, label: "TypeScript", color: "text-[#3178C6]" },
  { icon: <SiJavascript />, label: "JavaScript", color: "text-[#F7DF1E]" },
  { icon: <SiTailwindcss />, label: "Tailwind", color: "text-[#06B6D4]" },
  { icon: <SiFramer />, label: "Framer Motion", color: "text-[#E91E63]" },
  { icon: <FaNodeJs />, label: "Node.js", color: "text-[#339933]" },
  { icon: <SiExpress />, label: "Express", color: "text-white" },
  { icon: <FaJava />, label: "Java", color: "text-[#ED8B00]" },
  { icon: <FaPython />, label: "Python", color: "text-[#3776AB]" },
  { icon: <SiMongodb />, label: "MongoDB", color: "text-[#47A248]" },
  { icon: <SiPostgresql />, label: "PostgreSQL", color: "text-[#4169E1]" },
  { icon: <SiRedis />, label: "Redis", color: "text-[#FF4438]" },
  { icon: <FaDocker />, label: "Docker", color: "text-[#2496ED]" },
  { icon: <FaLinux />, label: "Linux", color: "text-yellow-400" },
  { icon: <FaGitAlt />, label: "Git", color: "text-[#F05032]" },
  { icon: <TbBinaryTree />, label: "DSA", color: "text-emerald-400" },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-3 group">
          <span className={`text-2xl ${it.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
            {it.icon}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500 group-hover:text-gray-300 transition-colors whitespace-nowrap">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="relative py-10 border-y border-white/5 overflow-hidden"
    >
      {/* Both visual tracks are aria-hidden (duplicated + auto-moving); this
          static line is what screen readers get instead. */}
      <p className="sr-only">{items.map((it) => it.label).join(", ")}</p>
      <div className="marquee-mask flex w-max animate-marquee">
        {/* Two identical tracks → seamless -50% loop */}
        <Track />
        <Track />
      </div>
    </section>
  );
}
