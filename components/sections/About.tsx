"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Card3D from "../ui/Card3D";
import { FiCode, FiZap, FiTarget } from "react-icons/fi";

const highlights = [
  {
    icon: <FiCode className="text-cyan-400 w-8 h-8" />,
    title: "Development",
    desc: "Building high-performance full-stack applications with React, Next.js, and Node.js.",
  },
  {
    icon: <FiZap className="text-fuchsia-500 w-8 h-8" />,
    title: "Vision",
    desc: "Creating futuristic, AI-driven digital experiences with immersive UI/UX design.",
  },
  {
    icon: <FiTarget className="text-emerald-400 w-8 h-8" />,
    title: "Strategy",
    desc: "Robust problem-solving using advanced data structures and optimized algorithms.",
  },
];

function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
          setCount(0);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <motion.span ref={ref} whileHover={{ scale: 1.1, color: "#00f0ff" }} transition={{ duration: 0.3 }}>{count}{suffix}</motion.span>;
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 will-change-gpu" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Side: Story */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <motion.h2 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-6xl font-black heading-font mb-10 leading-tight cursor-default"
            >
              <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Transforming</motion.span> <br />
              <motion.span 
                whileHover={{ textShadow: "0 0 15px rgba(0, 240, 255, 0.4)" }}
                transition={{ duration: 0.3 }}
                className="neon-text inline-block cursor-default"
              >Ideas into Impact</motion.span>
            </motion.h2>
            
            <motion.div 
              style={{ y: y1 }} 
              className="space-y-8 text-gray-400 text-xl leading-relaxed"
            >
              <motion.p whileHover={{ x: 10, color: "#e5e7eb" }} transition={{ duration: 0.3 }} className="cursor-default">
                I am a Computer Science student and Full Stack Developer with an obsession for building 
                modern, scalable, and visually immersive web applications.
              </motion.p>
              <motion.p whileHover={{ x: 10, color: "#e5e7eb" }} transition={{ duration: 0.3 }} className="cursor-default">
                My work blends technical precision with creative design, pushing the boundaries 
                of what&apos;s possible in the digital realm. I focus on performance, scalability, 
                and creating futuristic experiences that leave a lasting impression.
              </motion.p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mt-16 flex flex-wrap gap-8 sm:gap-16 justify-center lg:justify-start"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
              >
                <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
                  <CountUp end={4} suffix="+" />
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">Major Projects</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
              >
                <span className="block text-4xl sm:text-5xl font-black text-white mb-2">
                  <CountUp end={10} suffix="+" />
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">Technologies</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side: Highlight Cards */}
          <div className="flex-1 grid gap-8 w-full max-w-xl">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card3D>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start p-2">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 shadow-inner inline-flex"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <motion.h3 
                        whileHover={{ color: "#00f0ff", x: 5 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 cursor-default"
                      >{item.title}</motion.h3>
                      <motion.p 
                        whileHover={{ color: "#d1d5db" }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 leading-relaxed text-base sm:text-lg cursor-default"
                      >
                        {item.desc}
                      </motion.p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}