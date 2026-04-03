"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { FiArrowDown, FiDownload, FiExternalLink } from "react-icons/fi";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb } from "react-icons/si";

const techIcons = [
  { icon: <FaReact />, name: "React" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <FaJava />, name: "Java" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <SiMongodb />, name: "MongoDB" },
];

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
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden"
    >
      
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 -z-20" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10"
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] -z-10"
      />

      {/* Intro Tag & Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">
          Digital Architect & Futurist
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold tracking-widest text-green-500 uppercase">System: Online</span>
        </div>
      </motion.div>

      {/* Hero Branding: Name Change */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl xs:text-6xl md:text-[7rem] lg:text-[9rem] font-black heading-font leading-[0.85] tracking-tighter uppercase">
          <span className="text-white drop-shadow-2xl">Debmalyo</span> <br />
          <span className="neon-text inline-block transform hover:scale-105 transition-transform duration-500 cursor-default">Barman</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 h-8"
      >
        <TypeAnimation
          sequence={[
            "Building high-performance web systems.",
            2000,
            "Designing immersive digital futures.",
            2000,
            "Mastering the art of full-stack engineering.",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
          className="text-lg md:text-xl text-gray-500 font-medium tracking-tight"
        />
      </motion.div>

      {/* CTAs */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-6 mt-16"
      >
        <a href="#projects" className="btn-primary flex items-center justify-center gap-3 group">
          View Projects
          <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>

        <a 
          href="/projects/Debmalyo_Barman_Resume.pdf" 
          download="Debmalyo_Barman_Resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center gap-3 group"
        >
          Download CV
          <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {/* Tech Stack Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-32 w-full max-w-4xl border-t border-white/5 pt-12"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
          {techIcons.map((item, i) => (
            <div key={i} className="flex items-center gap-2 group cursor-default">
              <span className="text-2xl group-hover:text-cyan-400 group-hover:scale-110 transition-all">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/10 rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-1.5 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>

    </section>
  );
}