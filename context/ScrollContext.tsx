"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useScroll, type MotionValue } from "framer-motion";

/** The ordered set of scroll "chapters" that make up the page. */
export type ChapterId =
  | "home"
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "contact";

/** Canonical chapter order. Index into this array maps to `activeIndex`. */
export const CHAPTERS: ChapterId[] = [
  "home",
  "about",
  "education",
  "skills",
  "projects",
  "contact",
];

export interface ScrollState {
  /** Index of the chapter currently crossing the viewport center (0..5). */
  activeIndex: number;
  /** The `ChapterId` corresponding to `activeIndex`. */
  activeId: ChapterId;
  /** Whole-page scroll progress, 0..1, as a framer-motion MotionValue. */
  scrollProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollState | null>(null);

export function ScrollProvider(props: {
  children: ReactNode;
}): React.JSX.Element {
  // Whole-document scroll progress (no target => tracks the page).
  const { scrollYProgress } = useScroll();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // SSR-safe: this only runs on the client, so `document` is available.
    const chapters = document.querySelectorAll("[data-chapter]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // Shrinking the root to a thin band at viewport center means the
          // element that intersects is the one crossing the center line.
          const raw = entry.target.getAttribute("data-chapter-index");
          if (raw !== null) setActiveIndex(Number(raw));
        }
      },
      {
        // Collapse the root to a horizontal band at the vertical center.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    chapters.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const value: ScrollState = {
    activeIndex,
    activeId: CHAPTERS[activeIndex],
    scrollProgress: scrollYProgress,
  };

  return (
    <ScrollContext.Provider value={value}>
      {props.children}
    </ScrollContext.Provider>
  );
}

export function useScrollState(): ScrollState {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollState must be used within ScrollProvider");
  }
  return ctx;
}
