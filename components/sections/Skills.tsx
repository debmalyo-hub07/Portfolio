"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaLayerGroup, FaPython, FaLinux } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiTailwindcss, SiTypescript, SiFramer, SiNextdotjs, SiExpress, SiPostgresql, SiRedis, SiDocker } from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";
import { FiList, FiGrid } from "react-icons/fi";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    icon: <FaLayerGroup className="text-cyan-400" />,
    color: "cyan",
    skills: [
      { name: "React", icon: <FaReact />, colorClass: "text-[#61DAFB]", mastery: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, colorClass: "text-white", mastery: 85 },
      { name: "JavaScript", icon: <SiJavascript />, colorClass: "text-[#F7DF1E]", mastery: 92 },
      { name: "TypeScript", icon: <SiTypescript />, colorClass: "text-[#3178C6]", mastery: 80 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, colorClass: "text-[#06B6D4]", mastery: 88 },
      { name: "Framer Motion", icon: <SiFramer />, colorClass: "text-[#E91E63]", mastery: 75 },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    icon: <FaDatabase className="text-fuchsia-500" />,
    color: "fuchsia",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, colorClass: "text-[#339933]", mastery: 82 },
      { name: "Express.js", icon: <SiExpress />, colorClass: "text-white", mastery: 78 },
      { name: "Java", icon: <FaJava />, colorClass: "text-[#ED8B00]", mastery: 75 },
      { name: "Python", icon: <FaPython />, colorClass: "text-[#3776AB]", mastery: 72 },
      { name: "MongoDB", icon: <SiMongodb />, colorClass: "text-[#47A248]", mastery: 70 },
      { name: "PostgreSQL", icon: <SiPostgresql />, colorClass: "text-[#336791]", mastery: 65 },
      { name: "Redis", icon: <SiRedis />, colorClass: "text-[#DC382D]", mastery: 60 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Engineering",
    icon: <FaGitAlt className="text-emerald-400" />,
    color: "emerald",
    skills: [
      { name: "Git & GitHub", icon: <FaGitAlt />, colorClass: "text-[#F05032]", mastery: 88 },
      { name: "Docker", icon: <SiDocker />, colorClass: "text-[#2496ED]", mastery: 65 },
      { name: "Linux", icon: <FaLinux />, colorClass: "text-yellow-400", mastery: 70 },
      { name: "DSA & Algorithms", icon: <TbBinaryTree />, colorClass: "text-emerald-400", mastery: 80 },
    ],
  },
];

type SkillCategoryColor = "cyan" | "fuchsia" | "emerald";

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

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"bars" | "badges">("bars");

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
          <motion.h2
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl font-black heading-font mb-4 cursor-default"
          >
            <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Technical</motion.span>{" "}
            <motion.span
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
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
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "all" 
                  ? "bg-white/10 text-white shadow-lg border border-white/20" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Domains
            </button>
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === cat.id 
                    ? `bg-${cat.color}-500/20 text-${cat.color}-400 border border-${cat.color}-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]` 
                    : "text-gray-400 hover:text-white"
                }`}
                style={activeTab === cat.id ? { 
                  backgroundColor: cat.color === "cyan" ? "rgba(34,211,238,0.15)" : cat.color === "fuchsia" ? "rgba(232,121,249,0.15)" : "rgba(52,211,153,0.15)",
                  borderColor: cat.color === "cyan" ? "rgba(34,211,238,0.3)" : cat.color === "fuchsia" ? "rgba(232,121,249,0.3)" : "rgba(52,211,153,0.3)",
                  color: cat.color === "cyan" ? "#22d3ee" : cat.color === "fuchsia" ? "#e879f9" : "#34d399",
                } : {}}
              >
                <span className="hidden sm:inline">{cat.icon}</span>
                {cat.title.split(" ")[0]} 
              </button>
            ))}
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setViewMode("bars")}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === "bars" ? "bg-white/10 text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              <FiList /> Bars
            </button>
            <button
              onClick={() => setViewMode("badges")}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === "badges" ? "bg-white/10 text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              <FiGrid /> Badges
            </button>
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