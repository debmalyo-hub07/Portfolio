"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Card3D from "../ui/Card3D";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "Job Portal",
    desc: "A futuristic AI-powered dashboard for managing interconnected smart city resources with real-time data visualization and predictive analytics.",
    image: "/projects/job-portal.png",
    tech: ["Next.js", "Tailwind", "Framer", "D3.js"],
    github: "https://github.com/debmalyo-hub07/job-portal-2.0",
    live: "#",
    color: "cyan",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]"
  },
  {
    title: "E-Commerce Application",
    desc: "A premium e-commerce platform for high-end digital assets with an immersive 3D-inspired shopping experience and secure blockchain integration.",
    image: "/projects/ecommerce.png",
    tech: ["React", "Typescript", "Node.js", "Three.js"],
    github: "https://github.com/debmalyo-hub07/E-Commerce-Application",
    live: "#",
    color: "fuchsia",
    glow: "shadow-[0_0_20px_rgba(232,121,249,0.3)]"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl font-black heading-font mb-4">
            Featured <span className="neon-text">Ventures</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A curated selection of high-performance digital products engineered for excellence 
            and designed for the future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card3D>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative block w-full h-full"
                >
                  <div className="relative group overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 aspect-[4/5] md:aspect-video lg:aspect-square xl:aspect-[4/5]">
                    {/* Image Container */}
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={idx === 0}
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    </div>

                    {/* Single Clean Redirect Icon */}
                    <div className="absolute top-8 right-8 z-30">
                      <motion.div 
                        initial={{ opacity: 0.5, scale: 0.9 }}
                        whileHover={{ 
                          opacity: 1, 
                          scale: 1.15,
                          textShadow: "0 0 10px rgb(255 255 255 / 0.5)"
                        }}
                        className={`p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white hover:border-white/40 transition-all duration-300 group-hover:bg-black/60 ${project.glow}`}
                      >
                        <FiGithub size={24} />
                      </motion.div>
                    </div>

                    {/* Clean Fade-In Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-xl pointer-events-none">
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                      >
                        <h3 className="text-4xl font-black heading-font mb-4 tracking-tight">{project.title}</h3>
                        
                        <p className="text-gray-300 mb-8 leading-relaxed text-lg line-clamp-3 md:line-clamp-none">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <span 
                              key={i}
                              className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase group-hover:border-${project.color}-500/30 transition-colors shadow-inner`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Pre-hover Static Title */}
                    <div className="absolute bottom-10 left-10 group-hover:opacity-0 transition-all duration-500 group-hover:translate-y-4">
                      <div className={`w-12 h-1 bg-${project.color}-500 mb-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
                      <h3 className="text-3xl font-black heading-font tracking-tighter drop-shadow-2xl">{project.title}</h3>
                    </div>

                  </div>
                </a>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}