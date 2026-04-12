"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

// Moved outside component to prevent useEffect dep changes on every render
const links = ["home", "about", "education", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Lock / unlock body scroll when mobile menu is open
  useEffect(() => {
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
    // Restore scroll position on mount
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleScroll]);

  const closeMenu = () => setIsOpen(false);

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
            scrolled
              ? "bg-black/40 shadow-2xl border-white/20 backdrop-blur-xl"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <motion.h1
            whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-black neon-text cursor-pointer"
            aria-label="Debmalyo Barman Portfolio - Scroll to Top"
          >
            DB.
          </motion.h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {links.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                  setActive(item);
                }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative group py-1"
              >
                <motion.span
                  whileHover={{ color: "#00f0ff" }}
                  transition={{ duration: 0.2 }}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                    active === item ? "text-cyan-400" : "text-gray-400"
                  }`}
                >
                  {item}
                </motion.span>

                {active === item && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 md:hidden"
                onClick={closeMenu}
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-24 left-6 right-6 panel p-8 flex flex-col items-center gap-6 md:hidden backdrop-blur-2xl bg-black/80 border-white/20 shadow-2xl"
              >
                {links.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                      setActive(item);
                      closeMenu();
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: 10, scale: 1.1, color: "#00f0ff" }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-lg font-bold tracking-widest uppercase cursor-pointer ${
                      active === item ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}