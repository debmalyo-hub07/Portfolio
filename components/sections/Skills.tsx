"use client";

import { motion } from "framer-motion";
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaLayerGroup } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiTailwindcss, SiTypescript, SiFramer, SiNextdotjs } from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend Architecture",
    icon: <FaLayerGroup className="text-cyan-400" />,
    color: "cyan",
    skills: [
      { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-[#E91E63]" /> },
    ],
  },
  {
    title: "Backend & Systems",
    icon: <FaDatabase className="text-fuchsia-500" />,
    color: "fuchsia",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
      { name: "Java", icon: <FaJava className="text-[#ED8B00]" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
          aria-label="Technical Arsenal and Skills Overview"
        >
          <h2 className="text-6xl font-black heading-font mb-4">
            Technical <span className="neon-text">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            An optimized collection of modern technologies engineered for building 
            robust, scalable, and immersive digital futures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div 
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="panel p-10 relative group border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem]"
              aria-label={`Skill category: ${cat.title}`}
            >
              <div className="flex items-center gap-6 mb-12">
                <div className={`text-4xl p-5 bg-white/5 rounded-[2rem] border border-white/10 transition-all duration-500 group-hover:border-${cat.color}-500/30 group-hover:bg-${cat.color}-500/5 shadow-2xl`}>
                  {cat.icon}
                </div>
                <h3 className="text-3xl font-black heading-font text-white">{cat.title}</h3>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-4"
              >
                {cat.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all cursor-default group/item"
                  >
                    <div className="text-3xl transition-transform group-hover/item:scale-110">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-bold tracking-widest text-gray-400 group-hover/item:text-white transition-colors uppercase">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}