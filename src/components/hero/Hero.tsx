import { Icon } from "@/components/ui/Icon";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { profile } from "@/content/profile";
import { systemLayers } from "@/content/system";
import { resumeLink } from "@/lib/site-config";

export function Hero() {
  const openTo = new Intl.ListFormat("en", { type: "conjunction" }).format(profile.openTo);
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="bg-grid relative overflow-hidden border-b border-rule"
    >
      {/* Drawing area: right side on desktop, top on mobile. */}
      <div className="absolute inset-x-0 top-0 h-[46vh] md:inset-y-0 md:right-0 md:left-[46%] md:h-auto">
        <HeroCanvas layers={systemLayers} />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-4 pt-[44vh] pb-14 sm:px-8 md:justify-center md:pt-20 md:pb-24">
        <h1
          id="hero-title"
          className="type-condensed text-[clamp(3.75rem,13vw,10.5rem)] leading-[0.86] font-[650] tracking-[-0.035em]"
        >
          <span className="mask-line">
            <span>{profile.firstName}</span>
          </span>
          <span className="mask-line">
            <span style={{ "--d": "90ms" } as React.CSSProperties}>{profile.lastName}</span>
          </span>
        </h1>

        <p
          className="fade-late mt-8 max-w-md font-display text-2xl leading-snug font-normal text-ink sm:text-3xl"
          style={{ "--d": "450ms" } as React.CSSProperties}
        >
          {profile.quote}
        </p>

        <p
          className="fade-late mt-5 max-w-md text-ink-2"
          style={{ "--d": "600ms" } as React.CSSProperties}
        >
          {profile.positioning}
        </p>

        <div
          className="fade-late mt-9 flex flex-wrap items-center gap-3"
          style={{ "--d": "750ms" } as React.CSSProperties}
        >
          <a
            href="#work"
            className="group flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            See my work
            <Icon
              name="arrowDown"
              className="size-4 transition-transform group-hover:translate-y-0.5"
            />
          </a>
          <a
            href={resumeLink.href}
            download={resumeLink.filename}
            className="flex h-12 items-center gap-2 rounded-full border border-ink/30 px-6 text-sm font-medium transition-colors hover:border-ink"
          >
            <Icon name="download" className="size-4" />
            Download CV
          </a>
          <span className="text-xs text-ink-3">{resumeLink.label}</span>
        </div>

        <p
          className="fade-late mt-10 max-w-md text-sm text-ink-2"
          style={{ "--d": "900ms" } as React.CSSProperties}
        >
          <span
            className="mr-2 inline-block size-2 translate-y-[-1px] rounded-full bg-accent align-middle"
            aria-hidden="true"
          />
          Open to {openTo}.
        </p>
      </div>
    </section>
  );
}
