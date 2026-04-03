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
        if (entry.isIntersecting) setIsInView(true);
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

  return <span ref={ref}>{count}{suffix}</span>;
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Side: Story */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-left"
          >
            <h2 className="text-6xl font-black heading-font mb-10 leading-tight">
              Transforming <br />
              <span className="neon-text">Ideas into Impact</span>
            </h2>
            
            <motion.div style={{ y: y1 }} className="space-y-8 text-gray-400 text-xl leading-relaxed">
              <p>
                I am a Computer Science student and Full Stack Developer with an obsession for building 
                modern, scalable, and visually immersive web applications.
              </p>
              <p>
                My work blends technical precision with creative design, pushing the boundaries 
                of what&apos;s possible in the digital realm. I focus on performance, scalability, 
                and creating futuristic experiences that leave a lasting impression.
              </p>
            </motion.div>
            
            <div className="mt-16 flex gap-16">
              <div className="relative">
                <span className="block text-5xl font-black text-white mb-2">
                  <CountUp end={4} suffix="+" />
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">Major Projects</span>
              </div>
              <div className="relative">
                <span className="block text-5xl font-black text-white mb-2">
                  <CountUp end={10} suffix="+" />
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">Technologies</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Highlight Cards */}
          <div className="flex-1 grid gap-8 w-full max-w-xl">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card3D>
                  <div className="flex gap-8 items-start p-2">
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/10 shadow-inner group-hover:border-cyan-400/30 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {item.desc}
                      </p>
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