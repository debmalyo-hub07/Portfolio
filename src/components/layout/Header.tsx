"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { EmailLink } from "@/components/ui/EmailLink";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { kbdStore, openPalette, scrollToSection } from "@/lib/site-actions";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  sections: { id: string; label: string }[];
  resume: { href: string; filename: string };
  contact: { email: string; linkedin: string; whatsapp: string };
}

function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    // "home" (hero) is observed too so the nav clears when back at the top.
    const els = ["home", ...ids]
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(e.target.id === "home" ? null : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function Header({ name, sections, resume, contact }: Props) {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);
  const kbd = useSyncExternalStore(
    kbdStore.subscribe,
    kbdStore.getSnapshot,
    kbdStore.getServerSnapshot,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  const [first, ...rest] = name.split(" ");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-8">
          <a
            href="#top"
            onClick={go("top")}
            className="group flex items-center gap-2.5"
            aria-label={`DB, ${name}, home`}
          >
            <span
              aria-hidden="true"
              className="relative grid size-8 place-items-center border border-ink font-mono text-[11px] font-medium"
            >
              {first[0]}
              {rest.at(-1)?.[0]}
              <span className="absolute -top-px -right-px size-1.5 bg-accent transition-transform group-hover:scale-150" />
            </span>
            <span className="hidden text-sm font-medium sm:inline">{name}</span>
          </a>

          <nav aria-label="Primary" className="ml-auto hidden md:block">
            <ul className="flex items-center gap-6">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={go(s.id)}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "redline px-0.5 py-1 text-sm transition-colors",
                      active === s.id ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Quick actions, Ctrl K"
              title="Quick actions"
              aria-keyshortcuts="Control+K Meta+K"
              className="flex h-9 items-center gap-2 rounded-full border border-rule px-3 text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              <Icon name="search" className="size-3.5" />
              <kbd className="hidden font-mono text-[11px] sm:inline">{kbd}</kbd>
            </button>
            <ThemeToggle />
            <a
              href={resume.href}
              download={resume.filename}
              className="hidden h-9 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper transition-transform hover:-translate-y-px lg:flex"
            >
              <Icon name="download" className="size-4" />
              CV
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full border border-rule md:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="bg-grid fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-rule bg-paper px-4 py-8 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className="type-condensed block border-b border-rule py-4 font-display text-5xl font-semibold tracking-tight"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 grid gap-3 text-sm">
          <a
            href={resume.href}
            download={resume.filename}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-medium text-paper"
          >
            <Icon name="download" className="size-4" /> Download CV
          </a>
          <div className="grid grid-cols-3 gap-3">
            <EmailLink
              email={contact.email}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-rule"
            >
              <Icon name="mail" className="size-4" /> Email
            </EmailLink>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-rule"
            >
              <Icon name="linkedin" className="size-4" /> LinkedIn
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-rule"
            >
              <Icon name="whatsapp" className="size-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
