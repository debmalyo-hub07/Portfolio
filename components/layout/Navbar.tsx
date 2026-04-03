"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const links = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = links.map(id => document.getElementById(id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) setActive(currentSection.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-50 flex justify-center p-6">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`panel px-6 py-3 flex items-center justify-between md:justify-center gap-8 md:gap-12 w-full max-w-4xl transition-all duration-500 ${
            scrolled ? "bg-black/40 shadow-2xl border-white/20 backdrop-blur-xl" : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <motion.h1 
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-black neon-text cursor-pointer"
            aria-label="Debmalyo Barman Portfolio - Scroll to Top"
          >
            DB.
          </motion.h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {links.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                  setActive(item);
                }}
                className="relative group py-1"
              >
                <span className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                  active === item ? "text-cyan-400" : "text-gray-400 group-hover:text-white"
                }`}>
                  {item}
                </span>
                
                {active === item && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-24 left-6 right-6 panel p-8 flex flex-col items-center gap-6 md:hidden backdrop-blur-2xl bg-black/80 border-white/20 shadow-2xl"
            >
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                    setActive(item);
                    setIsOpen(false);
                  }}
                  className={`text-lg font-bold tracking-widest uppercase ${
                    active === item ? "text-cyan-400" : "text-gray-400"
                  }`}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}