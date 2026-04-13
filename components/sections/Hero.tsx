"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiMongodb } from "react-icons/si";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-start lg:justify-center px-6 pt-32 lg:pt-24 pb-16 overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-10 -z-20" />

      <motion.div
        style={{ y: y1, opacity }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 will-change-gpu"
      />
      <motion.div
        style={{ y: y2, opacity }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -z-10 will-change-gpu"
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-10 relative">
        
        {/* LEFT COMPONENT: Typography & CTAs */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Intro Tag & Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(0, 240, 255, 0.5)", backgroundColor: "rgba(0, 240, 255, 0.1)" }}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)]"
            >
              Digital Architect &amp; Futurist
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "rgba(16, 185, 129, 0.5)", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">
                Open to Work
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Name (Font sizes clamped for clean rendering) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black heading-font leading-[0.9] tracking-tighter uppercase mb-4"
          >
            <motion.span
              whileHover={{ color: "#00f0ff" }}
              transition={{ duration: 0.3 }}
              className="text-white drop-shadow-lg inline-block break-words"
            >Debmalyo</motion.span>{" "}
            <br className="hidden sm:block" />
            <motion.span
              whileHover={{ textShadow: "0 0 15px rgba(0, 240, 255, 0.5)" }}
              className="neon-text inline-block mt-2 sm:mt-0"
            >Barman</motion.span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-16 sm:h-12 mb-4"
          >
            <TypeAnimation
              sequence={[
                "Building high-performance web systems.",
                3000,
                "Designing immersive digital futures.",
                3000,
                "Mastering the art of full-stack engineering.",
                3000,
                "Turning ideas into extraordinary products.",
                3000,
              ]}
              speed={50}
              repeat={Infinity}
              className="text-lg md:text-xl text-gray-400 font-medium tracking-tight max-w-lg mx-auto lg:mx-0"
            />
          </motion.div>

          {/* Personal Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-500 text-sm italic mb-10 font-mono"
          >
            ✦ &quot;Complexity is just an unorganized system&quot; ✦
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,240,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto px-8"
            >
              <span className="relative z-10">View Projects</span>
              <FiExternalLink className="relative z-10" />
            </motion.a>

            <motion.a
              href="/projects/Debmalyo_Barman_Resume.pdf"
              download="Debmalyo_Barman_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,0,255,0.3)", borderColor: "rgba(255, 0, 255, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary flex items-center justify-center gap-3 w-full sm:w-auto px-8 border border-white/20"
            >
              <span className="relative z-10">Download CV</span>
              <FiDownload className="relative z-10" />
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT COMPONENT: Avatar & Orbitals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 flex justify-center items-center relative aspect-square max-w-[450px]"
        >
          {/* Advanced Orbital Spiral System */}
          <motion.div
            className="absolute inset-[0%] rounded-full border border-white/5 will-change-gpu"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {/* Glowing comet satellites with Tech Icons */}
            <div className="absolute top-0 left-1/2 w-8 h-8 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-[0_0_20px_#22d3ee] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
               <FaReact className="text-cyan-400 text-sm animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute bottom-0 left-1/4 w-8 h-8 bg-black/80 backdrop-blur-md border border-fuchsia-500/30 rounded-full shadow-[0_0_15px_#e879f9] flex items-center justify-center -translate-x-1/2 translate-y-1/2">
               <SiNextdotjs className="text-white text-sm" />
            </div>
            <div className="absolute top-1/4 right-0 w-8 h-8 bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-full shadow-[0_0_15px_#10b981] flex items-center justify-center translate-x-1/2 -translate-y-1/2">
               <FaNodeJs className="text-emerald-400 text-sm" />
            </div>
            <div className="absolute bottom-1/4 right-0 w-8 h-8 bg-black/80 backdrop-blur-md border border-yellow-500/30 rounded-full shadow-[0_0_15px_#fbbf24] flex items-center justify-center translate-x-1/2 translate-y-1/2">
               <SiMongodb className="text-yellow-400 text-sm" />
            </div>
          </motion.div>

          {/* Minimal reverse guide ring */}
          <motion.div
            className="absolute inset-[10%] rounded-full border border-dashed border-white/5 will-change-gpu"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-[20%] rounded-full border-[2px] border-transparent border-t-cyan-400/80 border-r-fuchsia-500/80 opacity-80 will-change-gpu"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[20%] rounded-full border-[2px] border-transparent border-b-emerald-400/80 border-l-cyan-400/80 opacity-80 will-change-gpu"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Avatar Focus Component */}
          <div className="absolute inset-[30%] rounded-full p-2 bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-emerald-400 shadow-[0_0_40px_rgba(34,211,238,0.4)] md:shadow-[0_0_80px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] md:hover:shadow-[0_0_100px_rgba(34,211,238,0.6)] transition-shadow duration-500">
            <div className="w-full h-full bg-black rounded-full overflow-hidden flex flex-col justify-center items-center relative group">
              
              {/* Internal Moving Glare */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div 
                  className="font-black heading-font text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl"
                >
                  DB
                </motion.div>
                <div className="text-cyan-400 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mt-1">
                  Creator
                </div>
              </div>
            </div>
          </div>

          {/* Floating Technology Badges fixed to absolute percentages */}
          <motion.div
            className="absolute top-[0%] right-[5%] sm:top-[12%] sm:right-[10%] glass border border-cyan-400/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8px] sm:text-xs font-mono text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-black/50 backdrop-blur-md z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚡ Full Stack
          </motion.div>

          <motion.div
            className="absolute bottom-[15%] left-[0%] sm:bottom-[22%] sm:left-[2%] glass border border-fuchsia-500/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8px] sm:text-xs font-mono text-fuchsia-400 shadow-[0_0_20px_rgba(232,121,249,0.3)] bg-black/50 backdrop-blur-md z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            🚀 Next.js 16
          </motion.div>

          <motion.div
            className="absolute top-[25%] left-[5%] sm:top-[35%] sm:left-[0%] glass border border-emerald-400/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8px] sm:text-xs font-mono text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-black/50 backdrop-blur-md z-20"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            🛡️ Architecture
          </motion.div>
          
          <motion.div
            className="absolute bottom-[5%] right-[10%] sm:bottom-[10%] sm:right-[15%] glass border border-yellow-400/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8px] sm:text-xs font-mono text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)] bg-black/50 backdrop-blur-md z-20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            🧠 AI Systems
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
