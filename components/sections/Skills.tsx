"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaLayerGroup, FaPython, FaLinux } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiTailwindcss, SiTypescript, SiFramer, SiNextdotjs, SiExpress, SiPostgresql, SiRedis, SiDocker } from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";
import { FiList, FiGrid, FiCode } from "react-icons/fi";
import type { ReactNode } from "react";
import type { SkillCategory } from "@/lib/resume";

// Icon + brand-color registry, keyed by skill name. resume.json holds only
// names + mastery; visuals are resolved here so the data stays serializable.
const skillIcons: Record<string, { icon: ReactNode; colorClass: string }> = {
  "React": { icon: <FaReact />, colorClass: "text-[#61DAFB]" },
  "Next.js": { icon: <SiNextdotjs />, colorClass: "text-white" },
  "JavaScript": { icon: <SiJavascript />, colorClass: "text-[#F7DF1E]" },
  "TypeScript": { icon: <SiTypescript />, colorClass: "text-[#3178C6]" },
  "Tailwind CSS": { icon: <SiTailwindcss />, colorClass: "text-[#06B6D4]" },
  "Framer Motion": { icon: <SiFramer />, colorClass: "text-[#E91E63]" },
  "Node.js": { icon: <FaNodeJs />, colorClass: "text-[#339933]" },
  "Express.js": { icon: <SiExpress />, colorClass: "text-white" },
  "Express": { icon: <SiExpress />, colorClass: "text-white" },
  "Java": { icon: <FaJava />, colorClass: "text-[#ED8B00]" },
  "Python": { icon: <FaPython />, colorClass: "text-[#3776AB]" },
  "MongoDB": { icon: <SiMongodb />, colorClass: "text-[#47A248]" },
  "PostgreSQL": { icon: <SiPostgresql />, colorClass: "text-[#336791]" },
  "Redis": { icon: <SiRedis />, colorClass: "text-[#DC382D]" },
  "Git & GitHub": { icon: <FaGitAlt />, colorClass: "text-[#F05032]" },
  "Docker": { icon: <SiDocker />, colorClass: "text-[#2496ED]" },
  "Linux": { icon: <FaLinux />, colorClass: "text-yellow-400" },
  "DSA & Algorithms": { icon: <TbBinaryTree />, colorClass: "text-emerald-400" },
};

const categoryIcons: Record<string, ReactNode> = {
  frontend: <FaLayerGroup className="text-cyan-400" />,
  backend: <FaDatabase className="text-fuchsia-500" />,
  tools: <FaGitAlt className="text-emerald-400" />,
};

type SkillCategoryColor = "cyan" | "fuchsia" | "emerald";

function resolveIcon(name: string) {
  return skillIcons[name] ?? { icon: <FiCode />, colorClass: "text-gray-400" };
}

function getBarColor(color: SkillCategoryColor) {
  switch (color) {
    case "cyan": return "bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.5)]";
    case "fuchsia": return "bg-gradient-to-r from-fuchsia-400 to-purple-600 shadow-[0_0_20px_rgba(232,121,249,0.5)]";
    case "emerald": return "bg-gradient-to-r from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(52,211,153,0.5)]";
    default: return "bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.5)]";
  }
}

function getMasteryColor(color: SkillCategoryColor) {
  switch (color) {
    case "cyan": return "text-cyan-400";
    case "fuchsia": return "text-fuchsia-400";
    case "emerald": return "text-emerald-400";
    default: return "text-cyan-400";
  }
}

function getBorderHover(color: SkillCategoryColor) {
  switch (color) {
    case "cyan": return "hover:border-cyan-500/50 hover:bg-cyan-500/10";
    case "fuchsia": return "hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10";
    case "emerald": return "hover:border-emerald-500/50 hover:bg-emerald-500/10";
    default: return "hover:border-cyan-500/50 hover:bg-cyan-500/10";
  }
}

export default function Skills({ skills }: { skills: SkillCategory[] }) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"bars" | "badges">("bars");

  // Attach icons/colors from the registry to the serializable JSON data.
  const skillCategories = skills.map((c) => ({
    id: c.id,
    title: c.title,
    color: c.color,
    icon: categoryIcons[c.id] ?? <FiCode className="text-cyan-400" />,
    skills: c.items.map((s) => ({ name: s.name, mastery: s.mastery, ...resolveIcon(s.name) })),
  }));

  // Determine what categories to render based on the active tab
  const visibleCategories = activeTab === "all" 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">

      {/* Subtle Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] -z-10 rounded-full pointer-events-none will-change-gpu"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px] -z-10 rounded-full pointer-events-none will-change-gpu"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-[11px] font-mono uppercase tracking-[0.4em] text-emerald-400/70">
            03 — Capabilities
          </span>
          <motion.h2
            whileHover={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl font-black heading-font mb-4 cursor-default"
          >
            <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Technical</motion.span>{" "}
            <motion.span
              whileHover={{ textShadow: "0 0 15px rgba(0, 240, 255, 0.4)" }}
              transition={{ duration: 0.3 }}
              className="neon-text inline-block cursor-default"
            >Arsenal</motion.span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 mx-auto rounded-full mb-6" />
          <motion.p
            whileHover={{ scale: 1.02, color: "#d1d5db" }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto text-lg cursor-default"
          >
            Technologies I&apos;ve mastered and domains I&apos;m constantly leveling up in.
          </motion.p>
        </motion.div>

        {/* Controls: Tabs & View Toggle */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          
          {/* Category Tabs (Segmented Glow Slider) */}
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md relative">
            {["all", ...skillCategories.map(c => c.id)].map((tabId) => {
              const cat = skillCategories.find(c => c.id === tabId);
              const isActive = activeTab === tabId;
              const title = tabId === "all" ? "All Domains" : cat?.title.split(" ")[0] || "";
              
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 z-10 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {/* Hover Ghost Pill Effect */}
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                  <span className="relative z-20 flex items-center gap-2">
                    {cat?.icon && <span className="hidden sm:inline">{cat.icon}</span>}
                    {title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Toggles (Smooth Slider) */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md relative">
            {[
              { id: "bars", label: "Bars", icon: <FiList /> },
              { id: "badges", label: "Badges", icon: <FiGrid /> }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as "bars" | "badges")}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 z-10 ${
                  viewMode === mode.id ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {viewMode === mode.id && (
                  <motion.div
                    layoutId="viewMode"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Hover Ghost */}
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                <span className="relative z-20 flex items-center gap-2">
                  {mode.icon} {mode.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`transition-all ${viewMode === "bars" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-12"}`}
          >
            {visibleCategories.map((cat, catIdx) => (
              
              <div 
                key={catIdx} 
                className={viewMode === "bars" 
                  ? "panel p-8 relative group border-white/10 bg-black/40 backdrop-blur-3xl rounded-[2.5rem]" 
                  : "w-full"
                }
              >
                {/* Category Title (Used differently based on view modes) */}
                {viewMode === "bars" ? (
                  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <div className="text-3xl p-3 bg-white/5 rounded-2xl border border-white/10">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white cursor-default">{cat.title}</h3>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 mb-6 pl-2">
                    <div className="text-2xl">{cat.icon}</div>
                    <h3 className="text-2xl font-black text-white">{cat.title}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                )}

                {/* Skills Container */}
                <div className={viewMode === "bars" 
                  ? "flex flex-col gap-6" 
                  : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                }>
                  {cat.skills.map((skill, skillIdx) => (
                    
                    /* Render conditionally based on viewMode */
                    viewMode === "bars" ? (
                      
                      // BARS VIEW
                      <div key={skillIdx} className="group cursor-default">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className={`text-xl ${skill.colorClass}`}>{skill.icon}</span>
                            <span className="text-xs font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors uppercase">
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-xs font-bold ${getMasteryColor(cat.color as SkillCategoryColor)}`}>
                            {skill.mastery}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full relative">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: skill.mastery / 100 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIdx * 0.1, ease: "easeOut" }}
                            style={{ transformOrigin: "left" }}
                            className={`h-full w-full rounded-full will-change-gpu ${getBarColor(cat.color as SkillCategoryColor)}`}
                          />
                        </div>
                      </div>

                    ) : (

                      // BADGES VIEW
                      <motion.div
                        key={skillIdx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: skillIdx * 0.05 }}
                        className={`panel flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md cursor-default transition-all duration-300 ${getBorderHover(cat.color as SkillCategoryColor)}`}
                      >
                        <div className={`text-4xl ${skill.colorClass} drop-shadow-xl mb-1`}>
                          {skill.icon}
                        </div>
                        <span className="text-xs font-bold text-white tracking-wider text-center">{skill.name}</span>
                        <div className="w-full h-1 bg-white/5 rounded-full mt-2 relative">
                           <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: skill.mastery / 100 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                              style={{ transformOrigin: "left" }}
                              className={`h-full w-full rounded-full will-change-gpu ${getBarColor(cat.color as SkillCategoryColor)}`}
                            />
                        </div>
                      </motion.div>

                    )

                  ))}
                </div>
              </div>

            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}