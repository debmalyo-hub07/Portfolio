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
    restDelta: 0.001
  });

  return (
    <section id="education" className="py-32 px-6 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-32"
      >
        <h2 className="text-6xl font-black heading-font mb-4">
          Personal <span className="neon-text">Odyssey</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Tracing the evolution of a developer's mind through academic excellence 
          and technical milestones.
        </p>
      </motion.div>

      <div ref={containerRef} className="max-w-4xl mx-auto relative">
        
        {/* Central Dynamic Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block">
          <motion.div 
            style={{ scaleY }}
            className="absolute top-0 w-full h-full bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-emerald-400 origin-top shadow-[0_0_20px_rgba(0,240,255,0.5)]"
          />
        </div>

        <div className="space-y-32">
          {milestones.map((item, i) => (
            <div key={i} className="relative flex items-center justify-between gap-8 flex-col md:flex-row">
              
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`w-full md:w-[45%] ${i % 2 === 0 ? "md:text-right" : "md:text-left order-2 md:order-none"}`}
              >
                <div className="panel p-8 group hover:border-cyan-400/30 transition-all duration-500">
                  <span className="text-cyan-400 font-mono text-sm tracking-widest mb-2 block">{item.date}</span>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed italic">{item.desc}</p>
                </div>
              </motion.div>

              {/* Central Point */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-12 h-12 rounded-full border-2 border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#00f0ff]" 
                  />
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="w-[45%] hidden md:block" />

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}