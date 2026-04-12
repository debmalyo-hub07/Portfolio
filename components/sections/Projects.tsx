"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";

const projects = [
  {
    title: "Job Portal 2.0",
    desc: "A full-stack job portal with real-time listings, company dashboards, applicant tracking, and role-based authentication. Built for scale and production deployment.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Node.js"],
    categories: ["Full Stack", "Platform"],
    github: "https://github.com/debmalyo-hub07/job-portal-2.0",
    live: "#",
    colorTheme: { glow: "rgba(34,211,238,0.3)", stroke: "from-cyan-400 to-blue-500", primary: "text-cyan-400" },
  },
  {
    title: "E-Commerce App",
    desc: "A full-featured e-commerce platform with product management, cart, secure auth, and admin dashboard. Powered by React, Node.js, and MongoDB.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    categories: ["E-Commerce", "Full Stack"],
    github: "https://github.com/debmalyo-hub07/E-Commerce-Application",
    live: "#",
    colorTheme: { glow: "rgba(232,121,249,0.3)", stroke: "from-fuchsia-400 to-purple-500", primary: "text-fuchsia-400" },
  },
  {
    title: "Nexus Chess",
    desc: "A real-time multiplayer chess platform featuring ELO rating, live matchmaking, Stockfish AI analysis, game history, and an immersive 3D-inspired board.",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Prisma"],
    categories: ["Gaming", "Real-Time"],
    github: "https://github.com/debmalyo-hub07",
    live: "#",
    colorTheme: { glow: "rgba(59,130,246,0.3)", stroke: "from-blue-400 to-indigo-500", primary: "text-blue-400" },
  },
  {
    title: "MB Jewelry Store",
    desc: "A premium jewelry e-commerce application with curated collections, rich product details, secure payments, and an elegant glassmorphism UI.",
    tech: ["React", "Express.js", "MongoDB", "Node.js"],
    categories: ["Premium", "React"],
    github: "https://github.com/debmalyo-hub07",
    live: "#",
    colorTheme: { glow: "rgba(16,185,129,0.3)", stroke: "from-emerald-400 to-teal-500", primary: "text-emerald-400" },
  },
];

const techBadgeColors: Record<string, string> = {
  "Next.js": "border-white/20 text-gray-200 bg-white/5",
  "React": "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
  "Node.js": "border-green-500/30 text-green-400 bg-green-500/5",
  "Express.js": "border-gray-500/30 text-gray-300 bg-gray-500/5",
  "MongoDB": "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  "PostgreSQL": "border-blue-500/30 text-blue-400 bg-blue-500/5",
  "Tailwind CSS": "border-sky-500/30 text-sky-400 bg-sky-500/5",
  "TypeScript": "border-blue-600/30 text-blue-400 bg-blue-600/5",
  "Framer Motion": "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/5",
  "Prisma": "border-slate-500/30 text-slate-300 bg-slate-500/5",
  "Socket.io": "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
};

const filterCategories = ["All", "Full Stack", "Gaming", "E-Commerce", "Platform"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden bg-black">

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
          <motion.h2
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-6xl font-black heading-font mb-4 cursor-default"
          >
            <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Featured</motion.span>{" "}
            <motion.span
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
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
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-300 z-10 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectTab"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col relative rounded-2xl bg-[#0a0a0e] border border-white/5 transition-all duration-300 hover:border-white/20"
                style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}
              >
                {/* Outer Hover Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 40px ${project.colorTheme.glow}, inset 0 0 20px ${project.colorTheme.glow}` }}
                />

                {/* Dynamic Top Gradient Bar */}
                <div className={`h-1.5 w-full rounded-t-2xl bg-gradient-to-r ${project.colorTheme.stroke} opacity-80 group-hover:opacity-100 transition-opacity`} />
                
                <div className="p-5 sm:p-8 flex flex-col flex-1 relative z-10">
                  {/* Header Row: Title + Category Tags */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 group-hover:text-white transition-colors shadow-inner">
                        <FiFolder size={24} />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black heading-font tracking-tight transition-colors duration-300 group-hover:${project.colorTheme.primary} text-gray-100`}>
                        {project.title}
                      </h3>
                    </div>
                    
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.categories.map(cat => (
                        <span key={cat} className="text-[10px] sm:text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description Text */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 group-hover:text-gray-300 transition-colors">
                    {project.desc}
                  </p>

                  {/* Tech Stack Listing */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => {
                      const badgeClass = techBadgeColors[t] || "border-white/10 text-gray-400 bg-white/5";
                      return (
                        <span key={t} className={`px-2.5 py-1 rounded-md border text-[10px] sm:text-xs font-mono transition-colors shadow-sm ${badgeClass} hover:opacity-80`}>
                          {t}
                        </span>
                      )
                    })}
                  </div>

                  {/* Buttons Component */}
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
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${project.colorTheme.stroke} text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all`}
                      >
                        <FiExternalLink size={18} /> Live Demo
                      </motion.a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-white/5 text-gray-500 font-medium text-sm cursor-not-allowed">
                        Development Phase
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}