import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { CaseStudyMotion } from "@/components/sections/CaseStudy";
import { Schematic } from "@/components/sections/Schematic";
import { Icon } from "@/components/ui/Icon";
import { getProject, projects } from "@/content/projects";
import { schematics } from "@/content/schematics";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${p.slug}`,
      title: `${p.title} — Case study`,
      description: p.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} — Case study`,
      description: p.summary,
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      data-case-block
      aria-label={title}
      className="grid gap-6 py-14 md:grid-cols-[12rem_1fr] md:gap-12"
    >
      <div>
        <div data-rule aria-hidden="true" className="mb-4 h-px origin-left bg-line" />
        <h2 data-ink className="font-sans text-base font-semibold tracking-normal text-ink-2">
          {title}
        </h2>
      </div>
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const index = projects.findIndex((x) => x.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const schematic = schematics[p.slug];
  const facts: [string, string][] = [
    [
      "Drawing",
      `${String(index + 1).padStart(2, "0")} of ${String(projects.length).padStart(2, "0")}`,
    ],
    ["Role", p.role],
    ["Team", p.team ? "Team project" : "Solo"],
    ["Year", String(p.year)],
  ];

  return (
    <CaseStudyMotion>
      <article className="mx-auto max-w-6xl px-4 pt-10 pb-24 sm:px-8">
        <Link
          href="/#work"
          className="redline inline-flex items-center gap-2 py-1 text-sm text-ink-2 hover:text-ink"
        >
          <Icon name="arrowDown" className="size-4 rotate-90" />
          All work
        </Link>

        <header className="mt-10">
          <p data-case-meta className="text-sm text-ink-3">
            {p.context ?? p.tagline}
          </p>
          <h1
            data-case-title
            className="type-condensed mt-3 text-[clamp(4rem,13vw,10rem)] leading-[0.82] tracking-[-0.03em]"
          >
            <ViewTransition name={`project-title-${p.slug}`} share="morph" default="none">
              <span className="inline-block">{p.title}</span>
            </ViewTransition>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-ink-2">{p.summary}</p>
          <dl
            data-case-meta
            className="mt-10 grid grid-cols-2 border border-line/50 text-sm md:grid-cols-4"
          >
            {facts.map(([k, v]) => (
              <div
                key={k}
                className="border-line/50 px-4 py-3 odd:border-r md:border-r md:last:border-r-0"
              >
                <dt className="text-xs text-ink-3">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {schematic && (
          <figure data-case-drawing className="bg-grid mt-10 border border-line/50 p-4 sm:p-10">
            <div className="mx-auto max-w-3xl">
              <ViewTransition name={`project-drawing-${p.slug}`} share="morph" default="none">
                <div className="w-full">
                  <Schematic data={schematic} title={p.title} />
                </div>
              </ViewTransition>
            </div>
            <figcaption className="mt-4 text-center text-sm text-ink-3">
              System overview of {p.title}.
            </figcaption>
          </figure>
        )}

        <div className="mt-6 divide-y divide-rule">
          <Block title="The problem">
            <p data-ink className="text-xl leading-relaxed">
              {p.problem}
            </p>
          </Block>

          <Block title="What I did">
            <ul className="space-y-5">
              {p.approach.map((a) => (
                <li key={a} data-ink className="grid grid-cols-[1.5rem_1fr] gap-2 text-ink-2">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 bg-accent" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Block>

          {(p.results.length > 0 || p.highlights.length > 0) && (
            <Block title="Results">
              {p.highlights.length > 0 && (
                <dl className="grid grid-cols-3 gap-6">
                  {p.highlights.map((h) => (
                    <div key={h.label} data-ink>
                      <dd className="type-condensed font-display text-5xl font-semibold">
                        {h.value}
                      </dd>
                      <dt className="mt-1 text-sm text-ink-3">{h.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
              {p.results.length > 0 && (
                <ul className="mt-8 space-y-3 text-ink-2">
                  {p.results.map((r) => (
                    <li key={r} data-ink>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </Block>
          )}

          <Block title="Built with">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} data-ink className="rounded-full border border-rule px-3 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            {p.liveUrl && (
              <a
                data-ink
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper"
              >
                Open live site
                <Icon
                  name="arrowUpRight"
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </Block>
        </div>

        {next && next.slug !== p.slug && (
          <Link
            href={`/work/${next.slug}`}
            className="group mt-10 flex items-end justify-between gap-6 border-t border-line pt-8"
          >
            <span>
              <span className="block text-sm text-ink-3">Next drawing</span>
              <span className="type-condensed mt-1 block font-display text-6xl font-semibold tracking-tight sm:text-8xl">
                {next.title}
              </span>
            </span>
            <Icon
              name="arrowUpRight"
              className="mb-4 size-8 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        )}
      </article>
    </CaseStudyMotion>
  );
}
