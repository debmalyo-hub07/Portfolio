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
    // Intersection Observer for accurate section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    links.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
    });

    // Handle scroll for navbar styling (scrolled state)
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    setMounted(true);

    return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    // Immediately close menu
    closeMenu();

    // Small delay to allow sidebar to start closing
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { 
          duration: 1.2, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setActive(id);
    }, 300);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 w-full z-50 flex justify-center p-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`panel relative px-6 py-3 flex items-center justify-between md:justify-center gap-8 md:gap-12 w-full max-w-4xl z-50 pointer-events-auto ${mounted ? "transition-all duration-500" : "transition-none"} ${
            isOpen 
              ? "bg-transparent border-transparent backdrop-blur-none shadow-none" 
              : scrolled
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
            className="md:hidden text-white p-2 relative z-[70] pointer-events-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6">
              <motion.div
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-6 h-0.5 bg-white origin-center"
              />
              <motion.div
                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className="absolute top-[10px] left-0 w-6 h-0.5 bg-white"
              />
              <motion.div
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 w-6 h-0.5 bg-white origin-center"
              />
            </div>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backing Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden pointer-events-auto"
                onClick={closeMenu}
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-black/90 border-l border-white/10 shadow-2xl z-[65] md:hidden flex flex-col pt-32 px-10 gap-8 pointer-events-auto overflow-y-auto"
              >
                <div className="flex flex-col gap-8">
                  {links.map((item, i) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex flex-col items-start gap-1"
                    >
                      <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${active === item ? "text-cyan-400" : "text-gray-600"}`}>
                        0{i + 1}.
                      </span>
                      <span className={`text-2xl font-black heading-font tracking-wider uppercase transition-all duration-300 ${
                        active === item ? "text-cyan-400 translate-x-2" : "text-white/50 group-hover:text-white"
                      }`}>
                        {item}
                      </span>
                      <AnimatePresence>
                        {active === item && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="h-px bg-gradient-to-r from-cyan-400 to-transparent mt-1"
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-auto pb-12">
                  <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest leading-loose">
                    &copy; 2026 DEBMALYO BARMAN<br />
                    DIGITAL ARCHITECT PORTFOLIO
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}