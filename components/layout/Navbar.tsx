"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";

// Moved outside component to prevent useEffect dep changes on every render
const links = ["home", "about", "education", "skills", "projects", "contact"];

export default function Navbar({ cvUrl = "/resume/Debmalyo_Barman_Resume_2026-07.pdf" }: { cvUrl?: string }) {
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

  // Lock / unlock body scroll when mobile menu is open.
  // iOS Safari ignores overflow:hidden on body while the document scrolls,
  // so the robust lock is position:fixed at the current offset, restored
  // (instantly, bypassing scroll-behavior:smooth) on close.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    };
  }, [isOpen]);

  // Close the mobile menu on Escape and move focus into the dialog.
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    sidebarRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

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

    // Enable transitions only after first paint to avoid a hydration flash —
    // deferred out of the effect body so it doesn't trigger a cascading render.
    const raf = requestAnimationFrame(() => setMounted(true));

    return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
        cancelAnimationFrame(raf);
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
          className={`panel relative px-5 md:px-6 py-3 flex items-center justify-between gap-4 md:gap-8 w-full max-w-3xl z-50 pointer-events-auto ${mounted ? "transition-all duration-500" : "transition-none"} ${
            isOpen 
              ? "bg-transparent border-transparent backdrop-blur-none shadow-none" 
              : scrolled
                ? "bg-black/40 shadow-2xl border-white/20 backdrop-blur-xl"
                : "bg-transparent border-transparent"
          }`}
        >
          {/* Anchor, not <h1>: the page's single h1 lives in the Hero, and a
              link keeps back-to-top reachable by keyboard. */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05, color: "#00f0ff" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-black neon-text cursor-pointer transition-colors duration-300"
            aria-label="DB — back to top"
          >
            DB.
          </motion.a>

          <div className="hidden md:flex items-center gap-1 mx-auto">
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
                aria-current={mounted && active === item ? "true" : undefined}
                className={`relative group px-3.5 py-2 rounded-full transition-all duration-300 ${
                  mounted && active === item ? "bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.25)]" : "border border-transparent"
                }`}
              >
                <motion.span
                  className={`relative z-10 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${
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
            className="md:hidden text-white p-3 -m-1 relative z-[70] pointer-events-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
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
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden pointer-events-auto touch-none"
                onClick={closeMenu}
              />

              {/* Sidebar */}
              <motion.div
                ref={sidebarRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                tabIndex={-1}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-black/90 border-l border-white/10 shadow-2xl z-[65] md:hidden flex flex-col pt-24 sm:pt-32 px-8 gap-8 pointer-events-auto overflow-y-auto overscroll-contain outline-none"
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
                      aria-current={active === item ? "true" : undefined}
                      className="group flex flex-col items-start gap-1"
                    >
                      <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${active === item ? "text-cyan-400" : "text-gray-400"}`}>
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

                <a
                  href={cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm font-bold tracking-widest uppercase hover:bg-cyan-500/20 transition-colors"
                >
                  Download CV
                </a>

                <div className="mt-auto pb-12">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-loose">
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