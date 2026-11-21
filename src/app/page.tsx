import { Hero } from "@/components/hero/Hero";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { About } from "@/components/sections/About";
import { Connect } from "@/components/sections/Connect";
import { Journey } from "@/components/sections/Journey";
import { Sheet } from "@/components/sections/Sheet";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { education } from "@/content/education";
import { principles } from "@/content/principles";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { schematics } from "@/content/schematics";
import { SHEET_TOTAL, sections, sheetNumber } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { SITE_URL } from "@/lib/site-url";

const sheet = (id: string) => {
  const s = sections.find((x) => x.id === id)!;
  return { id, label: s.label, note: s.note, number: sheetNumber(id), total: SHEET_TOTAL };
};

export default function Home() {
  const { contact } = profile;
  let item = 0;
  const layers = skillGroups.map((g) => ({
    id: g.id,
    label: g.label,
    note: g.note,
    parts: g.skills.map((s) => ({ item: ++item, name: s.name, usedIn: s.usedIn })),
  }));
  const openTo = new Intl.ListFormat("en", { type: "conjunction" }).format(profile.openTo);

  // Structured data for search engines. LinkedIn only (no GitHub, CLAUDE.md rule 5).
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.positioning,
    url: SITE_URL,
    email: `mailto:${contact.email}`,
    telephone: contact.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: "IN",
    },
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    knowsAbout: skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
    knowsLanguage: profile.languages,
    sameAs: [contact.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
      />
      <ProgressRail
        sheets={[
          { id: "home", label: "Cover" },
          ...sections.map(({ id, label }) => ({ id, label })),
        ]}
      />
      <Hero />

      <Sheet {...sheet("about")}>
        <About statement={profile.about} principles={principles} />
      </Sheet>

      <Sheet {...sheet("skills")}>
        <Skills
          layers={layers}
          projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
          total={item}
        />
      </Sheet>

      <Sheet {...sheet("work")}>
        <Work projects={projects.map((p) => ({ ...p, schematic: schematics[p.slug] }))} />
      </Sheet>
      <Sheet {...sheet("journey")}>
        <Journey items={education} />
      </Sheet>

      <Sheet {...sheet("connect")}>
        <Connect
          email={contact.email}
          phone={contact.phone}
          linkedin={contact.linkedin}
          whatsapp={contact.whatsapp}
          timeZone={profile.timeZone}
          openTo={openTo}
        />
      </Sheet>
    </>
  );
}
