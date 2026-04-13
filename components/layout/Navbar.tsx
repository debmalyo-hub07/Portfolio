"use client";

import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useLenis } from "lenis/react";

// Moved outside component to prevent useEffect dep changes on every render
const links = ["home", "about", "education", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Lock / unlock body scroll when mobile menu is open
  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = links.map((id) => document.getElementById(id));
    const currentSection = sections.find((section) => {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });

    if (currentSection) setActive(currentSection.id);

    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  }, []);

  useEffect(() => {
    // Immediate sync after mount to prevent flicker
    const init = () => {
      handleScroll();
      setMounted(true);
    };
    
    // Use timeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(init, 0);

    const savedScrollY = sessionStorage.getItem("scrollPosition");
    if (savedScrollY) {
      window.scrollTo({ top: parseInt(savedScrollY), behavior: "instant" });
      sessionStorage.removeItem("scrollPosition");
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleScroll]);

  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    // Force an immediate unlock and close
    closeMenu();

    // Small delay to allow the state update and body unlock to propagate
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { 
          duration: 1.2, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        });
      } else {
        // Native fallback - extremely resilient
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setActive(id);
    }, 150);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-50 flex justify-center px-6 py-6 md:px-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`panel relative px-6 py-3 flex items-center justify-between md:justify-center gap-8 md:gap-12 w-full max-w-4xl z-50 ${mounted ? "transition-all duration-500" : "transition-none"} ${
            scrolled
              ? "bg-black/40 shadow-2xl border-white/20 backdrop-blur-xl"
              : "bg-transparent border-transparent"
          }`}
        >
          <motion.h1
            whileHover={{ scale: 1.05, color: "#00f0ff" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-black neon-text cursor-pointer transition-colors duration-300"
            aria-label="DB Logo"
          >
            DB.
          </motion.h1>

          <div className="hidden md:flex gap-8">
            {links.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group px-4 py-2 transition-all duration-300 ${
                  mounted && active === item ? "bg-cyan-500/15 rounded-full border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : ""
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                />
                <motion.span
                  className={`relative z-10 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                    mounted && active === item ? "text-cyan-400" : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {item}
                </motion.span>
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-2 relative z-[60]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[55] md:hidden"
                onClick={closeMenu}
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 panel p-8 flex flex-col items-center gap-6 md:hidden backdrop-blur-2xl bg-black/80 border-white/20 shadow-2xl z-[58] w-[85%] max-w-xs"
              >
                {links.map((item, i) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1, color: "#00f0ff" }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-lg font-bold tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 px-8 py-3 text-center ${
                      active === item ? "text-cyan-400 bg-cyan-400/10 rounded-xl" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}