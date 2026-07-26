"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { FiGithub, FiExternalLink, FiFolder, FiClock } from "react-icons/fi";
import TiltCard from "../ui/TiltCard";
import type { ProjectItem } from "@/lib/resume";

const techBadgeColors: Record<string, string> = {
  "Next.js": "border-white/20 text-gray-200 bg-white/5",
  "React": "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "Node.js": "border-green-500/30 text-green-400 bg-green-500/5",
  "Express": "border-white/20 text-gray-200 bg-white/5",
  "MongoDB": "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  "PostgreSQL": "border-blue-500/30 text-blue-400 bg-blue-500/5",
  "Redis": "border-red-500/30 text-red-400 bg-red-500/5",
  "Tailwind CSS": "border-sky-500/30 text-sky-400 bg-sky-500/5",
  "TypeScript": "border-blue-600/30 text-blue-400 bg-blue-600/5",
  "Framer Motion": "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/5",
  "three.js": "border-violet-500/30 text-violet-400 bg-violet-500/5",
  "TensorFlow.js": "border-orange-500/30 text-orange-400 bg-orange-500/5",
  "Stockfish WASM": "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
  "JavaScript": "border-yellow-400/30 text-yellow-400 bg-yellow-400/5",
};

// Full variant strings keyed by theme.primary — Tailwind's scanner only
// generates classes it can see in source, so runtime interpolation like
// `group-hover:${...}` silently produces no CSS.
const titleHoverColors: Record<string, string> = {
  "text-blue-400": "group-hover:text-blue-400",
  "text-pink-400": "group-hover:text-pink-400",
  "text-emerald-400": "group-hover:text-emerald-400",
  "text-cyan-400": "group-hover:text-cyan-400",
  "text-violet-400": "group-hover:text-violet-400",
};

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filters derived from the data — no hardcoded list, so new categories in
  // resume.json show up automatically.
  const filterCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-16 md:py-32 px-6 relative overflow-hidden">

      {/* Subtle Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] -z-10 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[130px] -z-10 rounded-full"
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-[11px] font-mono uppercase tracking-[0.4em] text-fuchsia-400/70">
            04 — Selected Work
          </span>
          <motion.h2
            whileHover={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black heading-font mb-4 cursor-default"
          >
            <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Featured</motion.span>{" "}
            <motion.span
              whileHover={{ textShadow: "0 0 15px rgba(0, 240, 255, 0.4)" }}
              transition={{ duration: 0.3 }}
              className="neon-text inline-block cursor-default"
            >Ventures</motion.span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed cursor-default">
            A curated selection of high-performance digital products engineered for excellence,
            built with scalable architectures and modern interfaces.
          </p>
        </motion.div>

        {/* Unified Filter Toggle */}
        <div className="flex justify-center mb-16 px-4">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md relative">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2.5 min-h-11 md:min-h-0 md:py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 z-10 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectTab"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="group flex flex-col h-full relative rounded-2xl bg-[#0a0a0e] border border-white/5 transition-colors duration-300 hover:border-white/20"
                >
                  {/* Outer Hover Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 40px ${project.theme.glow}, inset 0 0 20px ${project.theme.glow}` }}
                  />

                  {/* Dynamic Top Gradient Bar */}
                  <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${project.theme.stroke} opacity-80 group-hover:opacity-100 transition-opacity`} />

                  <div className="p-5 sm:p-8 flex flex-col flex-1 relative z-10">
                    {/* Header Row: Title + Category Tags */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 group-hover:text-white transition-colors shadow-inner">
                          <FiFolder size={24} />
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-black heading-font tracking-tight transition-colors duration-300 ${titleHoverColors[project.theme.primary] ?? ""} text-gray-100`}>
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.categories.map((cat) => (
                          <span key={cat} className="text-[10px] sm:text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 group-hover:text-gray-300 transition-colors">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => {
                        const badgeClass = techBadgeColors[t] || "border-white/10 text-gray-400 bg-white/5";
                        return (
                          <span key={t} className={`px-2.5 py-1 rounded-md border text-[10px] sm:text-xs font-mono transition-colors shadow-sm ${badgeClass} hover:opacity-80`}>
                            {t}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-bold tracking-wide"
                      >
                        <FiGithub size={18} /> Source Code
                      </motion.a>

                      {project.live !== "#" ? (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${project.theme.stroke} text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all`}
                        >
                          <FiExternalLink size={18} /> Live Demo
                        </motion.a>
                      ) : (
                        <div
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-white/5 text-gray-500 font-medium text-sm cursor-not-allowed"
                          title="This project isn't deployed yet"
                        >
                          <FiClock size={16} /> Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
