"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from "react-icons/fi";

const socialLinks = [
  { icon: <FiGithub size={20} />, href: "https://github.com/debmalyo-hub07", label: "GitHub" },
  { icon: <FiLinkedin size={20} />, href: "https://www.linkedin.com/in/debmalyo-barman-087429318/", label: "LinkedIn" },
  { icon: <FiTwitter size={20} />, href: "#", label: "Twitter" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        
        {/* Back to Top */}
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all"
        >
          <FiArrowUp size={24} />
        </motion.button>

        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 border-b border-white/5 pb-12">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black neon-text mb-2">DB.</h2>
            <p className="text-gray-500 max-w-xs">
              Engineering futuristic digital experiences with precision and creativity.
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -5, color: "#00f0ff" }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Legal & Version */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 text-xs font-mono tracking-widest text-gray-600 uppercase">
          <p>© 2026 DEBMALYO BARMAN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE v2.0.4
            </span>
            <span>BUILT WITH NEXT.JS & FRAMER</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
