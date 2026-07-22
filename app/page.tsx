import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import TechMarquee from "@/components/ui/TechMarquee";
import WorldSceneLoader from "@/components/three/WorldSceneLoader";
import { ScrollProvider } from "@/context/ScrollContext";
import { getResumeData, getCvUrl } from "@/lib/resume";

export default function Home() {
  // Server Component: read resume-driven content + resolve newest CV at build time.
  const data = getResumeData();
  const cvUrl = getCvUrl();

  return (
    <ScrollProvider>
      {/* Persistent WebGL protagonist — fixed, behind everything. Renders
          nothing on mobile-lite / reduced-motion (CSS fallback carries it). */}
      <WorldSceneLoader />

      <Navbar cvUrl={cvUrl} />

      {/* Page content floats above the canvas. Each chapter is tagged for the
          IntersectionObserver in ScrollContext (index drives the morph). */}
      <main className="relative z-[1]">
        <div className="space-y-32">
          <div data-chapter="home" data-chapter-index="0">
            <Hero profile={data.profile} cvUrl={cvUrl} />
          </div>
          <div data-chapter="about" data-chapter-index="1">
            <About about={data.about} />
          </div>
          <TechMarquee />
          <div data-chapter="education" data-chapter-index="2">
            <Education education={data.education} />
          </div>
          <div data-chapter="skills" data-chapter-index="3">
            <Skills skills={data.skills} />
          </div>
          <div data-chapter="projects" data-chapter-index="4">
            <Projects projects={data.projects} />
          </div>
          <div data-chapter="contact" data-chapter-index="5">
            <Contact profile={data.profile} />
          </div>
        </div>

        <Footer />
      </main>
    </ScrollProvider>
  );
}
