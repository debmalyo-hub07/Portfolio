import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import TechMarquee from "@/components/ui/TechMarquee";
import { getResumeData, getCvUrl } from "@/lib/resume";

export default function Home() {
  // Server Component: read resume-driven content + resolve newest CV at build time.
  const data = getResumeData();
  const cvUrl = getCvUrl();

  return (
    <main>

      <Navbar cvUrl={cvUrl} />

      <div className="space-y-32">
        <Hero profile={data.profile} cvUrl={cvUrl} />
        <About about={data.about} />
        <TechMarquee />
        <Education education={data.education} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact profile={data.profile} />
      </div>

      <Footer />

    </main>
  );
}
