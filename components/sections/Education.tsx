"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    title: "The Odyssey Begins",
    desc: "Starting the journey on 24 July 2003, driven by a growing fascination with logic and systems.",
    date: "2003",
  },
  {
    title: "Secondary (Madhyamik)",
    desc: "Completed Madhyamik from the historic Sanskrit Collegiate School, laying the foundation for academic excellence.",
    date: "2019",
  },
  {
    title: "Diploma in CST",
    desc: "Graduated with a Diploma in Computer Science & Technology from Canning Government Polytechnic, mastering core engineering principles.",
    date: "2020 – 2023",
  },
  {
    title: "B.Tech in CSE",
    desc: "Currently specializing in Computer Science and Engineering at Techno Engineering College Banipur, Habra, building the next generation of digital solutions.",
    date: "2023 – 2026",
  },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="education" className="py-32 px-6 relative overflow-hidden">

      {/* Subtle Background Glows */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-cyan-500/5 blur-[140px] -z-10 rounded-full will-change-gpu"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.04, 0.09, 0.04],
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-fuchsia-500/5 blur-[120px] -z-10 rounded-full will-change-gpu"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-32"
      >
        <motion.h2
          whileHover={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
          transition={{ duration: 0.3 }}
          className="text-4xl sm:text-6xl font-black heading-font mb-4 cursor-default"
        >
          <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Personal</motion.span>{" "}
          <motion.span
            whileHover={{ textShadow: "0 0 15px rgba(0, 240, 255, 0.4)" }}
            transition={{ duration: 0.3 }}
            className="neon-text inline-block cursor-default"
          >Odyssey</motion.span>
        </motion.h2>
        <motion.p
          whileHover={{ scale: 1.02, color: "#d1d5db" }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 max-w-xl mx-auto cursor-default"
        >
          Tracing the evolution of a developer&apos;s mind through academic excellence
          and technical milestones.
        </motion.p>
      </motion.div>

      <div ref={containerRef} className="max-w-4xl mx-auto relative">

        {/* Central Dynamic Timeline Line (Desktop Only) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 w-full h-full bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-emerald-400 origin-top shadow-[0_0_20px_rgba(0,240,255,0.5)]"
          />
        </div>

        <div className="space-y-16 md:space-y-32">
          {milestones.map((item, i) => (
            <div key={i} className="relative flex items-center justify-between gap-8 flex-col md:flex-row">

              {/* Desktop Central Point */}

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.5, margin: "-100px" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:text-right" : "md:text-left order-2 md:order-none pl-12 md:pl-0"}`}
              >
                <motion.div
                  whileHover={{ 
                    y: -2,
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)",
                    borderColor: "rgba(34, 211, 238, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="panel p-6 md:p-8 group bg-black/40 backdrop-blur-3xl border-white/10 transition-all duration-500 rounded-[2rem]"
                >
                  <motion.span
                    whileHover={{ scale: 1.1, color: "#00f0ff" }}
                    transition={{ duration: 0.3 }}
                    className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest mb-2 block cursor-default"
                  >{item.date}</motion.span>
                  <motion.h3
                    whileHover={{ color: "#00f0ff", x: i % 2 === 0 ? -5 : 5 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl md:text-2xl font-bold text-white mb-4 cursor-default"
                  >{item.title}</motion.h3>
                  <motion.p
                    whileHover={{ color: "#d1d5db" }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 leading-relaxed italic text-sm md:text-base cursor-default"
                  >{item.desc}</motion.p>
                </motion.div>
              </motion.div>

              {/* Desktop Central Point */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5, margin: "-100px" }}
                  className="w-12 h-12 rounded-full border-2 border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#00f0ff]"
                  />
                </motion.div>
              </motion.div>

              {/* Spacer for alternating layout */}
              <div className="w-[45%] hidden md:block" />

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}