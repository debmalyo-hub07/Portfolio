"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { FiGithub, FiLinkedin, FiArrowUp, FiInstagram } from "react-icons/fi";

const socialLinks = [
  { icon: <FiGithub size={20} />, href: "https://github.com/debmalyo-hub07", label: "GitHub" },
  { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/debmalyo-barman-087429318/", label: "LinkedIn" },
  { icon: <FiInstagram size={20} />, href: "https://www.instagram.com/", label: "Instagram" },
];

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

        {/* Back to Top */}
        <motion.button
          whileHover={{ scale: 1.2, y: -8, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-4 rounded-full bg-white/5 border border-white/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <FiArrowUp size={24} />
          </motion.div>
        </motion.button>

        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 border-b border-white/5 pb-12">
          {/* Logo & Info */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="text-center md:text-left"
          >
            <motion.h2
              whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-3xl font-black neon-text mb-2 cursor-default"
            >DB.</motion.h2>
            <motion.p
              whileHover={{ color: "#d1d5db" }}
              transition={{ duration: 0.3 }}
              className="text-gray-500 max-w-xs cursor-default"
            >
              Engineering futuristic digital experiences with precision and creativity.
            </motion.p>
            {/* Available for work indicator */}
            <motion.div
              className="flex items-center gap-2 mt-3"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono tracking-widest uppercase">Available for opportunities</span>
            </motion.div>
          </motion.div>

          {/* Socials */}
          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2, y: -8, rotate: [-10, 10, -10] }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Legal & Version */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center w-full gap-4 text-xs font-mono tracking-widest text-gray-600 uppercase cursor-default"
        >
          <motion.p whileHover={{ color: "#9ca3af" }} transition={{ duration: 0.3 }}>© 2026 DEBMALYO BARMAN. ALL RIGHTS RESERVED.</motion.p>
          <div className="flex gap-8">
            <motion.span
              whileHover={{ color: "#10b981" }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE v2.1.0
            </motion.span>
            <motion.span whileHover={{ color: "#9ca3af" }} transition={{ duration: 0.3 }}>BUILT WITH NEXT.JS &amp; FRAMER</motion.span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
