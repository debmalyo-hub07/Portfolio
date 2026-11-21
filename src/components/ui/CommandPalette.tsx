"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useRouter } from "next/navigation";
import {
  PALETTE_OPEN_EVENT,
  copyText,
  pauseScroll,
  scrollToSection,
  triggerDownload,
} from "@/lib/site-actions";
import { openEmail } from "@/lib/email";
import { toggleTheme } from "@/lib/theme-client";
import { cn } from "@/lib/utils";

export interface PaletteConfig {
  sections: { id: string; label: string }[];
  projects: { slug: string; title: string }[];
  email: string;
  phone: string;
  linkedin: string;
  whatsapp: string;
  resume: { href: string; filename: string; label: string };
}

interface Command {
  id: string;
  group: "Navigate" | "Projects" | "Contact" | "Actions";
  label: string;
  hint?: string;
  icon: IconName;
  keywords?: string;
  run: () => void | Promise<void>;
  /** Keep palette open after run (e.g. to show "Copied"). */
  stay?: boolean;
}

export function CommandPalette({ config }: { config: PaletteConfig }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");

  const router = useRouter();
  const close = useCallback(() => dialogRef.current?.close(), []);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    setStatus("");
    d.showModal();
    pauseScroll(true);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_OPEN_EVENT, open);
    };
  }, [open, close]);

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "nav-top",
        group: "Navigate",
        label: "Home",
        icon: "hash",
        run: () => scrollToSection("top"),
      },
      ...config.sections.map<Command>((s) => ({
        id: `nav-${s.id}`,
        group: "Navigate",
        label: s.label,
        icon: "hash",
        run: () => scrollToSection(s.id),
      })),
      ...config.projects.map<Command>((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: `${p.title} case study`,
        icon: "arrowUpRight",
        keywords: "project work",
        run: () => router.push(`/work/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Contact",
        label: "Copy email address",
        hint: config.email,
        icon: "copy",
        keywords: "mail",
        stay: true,
        run: async () =>
          setStatus(
            (await copyText(config.email))
              ? "Email copied to clipboard"
              : "Copy failed — email: " + config.email,
          ),
      },
      {
        id: "mail",
        group: "Contact",
        label: "Write an email (opens Gmail)",
        icon: "mail",
        run: () => openEmail(config.email),
      },
      {
        id: "linkedin",
        group: "Contact",
        label: "Open LinkedIn",
        icon: "linkedin",
        run: () => void window.open(config.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "whatsapp",
        group: "Contact",
        label: "Message on WhatsApp",
        hint: config.phone,
        icon: "whatsapp",
        run: () => void window.open(config.whatsapp, "_blank", "noopener,noreferrer"),
      },
      {
        id: "call",
        group: "Contact",
        label: "Call",
        hint: config.phone,
        icon: "phone",
        keywords: "phone",
        run: () => void (location.href = `tel:${config.phone.replace(/\s/g, "")}`),
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        hint: config.resume.label,
        icon: "download",
        keywords: "resume",
        run: () => triggerDownload(config.resume.href, config.resume.filename),
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle theme",
        hint: "light / dark",
        icon: "moon",
        keywords: "dark light mode",
        run: toggleTheme,
      },
    ],
    [config, router],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const current = Math.min(active, Math.max(0, results.length - 1));

  const run = async (cmd: Command | undefined) => {
    if (!cmd) return;
    if (!cmd.stay) close();
    await cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((current + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((current - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      void run(results[current]);
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Quick actions"
      data-lenis-prevent
      onClose={() => pauseScroll(false)}
      onClick={(e) => e.target === dialogRef.current && close()}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-lg border border-rule bg-paper p-0 text-ink shadow-[0_24px_80px_-20px_rgb(0_0_0/0.45)] backdrop:bg-ink/30 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3 border-b border-rule px-4">
        <Icon name="search" className="size-4 shrink-0 text-ink-3" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section or run an action…"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[current] ? `${listId}-${results[current].id}` : undefined}
          aria-autocomplete="list"
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-3"
        />
        <kbd className="font-mono text-[11px] text-ink-3">Esc</kbd>
      </div>

      <ul
        id={listId}
        role="listbox"
        aria-label="Commands"
        className="scroll-thin max-h-[min(62vh,34rem)] overflow-y-auto overscroll-contain p-2"
      >
        {results.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-ink-3">No results</li>
        )}
        {results.map((c, i) => {
          const header = c.group !== lastGroup ? c.group : null;
          lastGroup = c.group;
          return (
            <li key={c.id} role="presentation">
              {header && (
                <p className="px-3 pt-3 pb-1 text-xs text-ink-3" aria-hidden="true">
                  {header}
                </p>
              )}
              <div
                id={`${listId}-${c.id}`}
                role="option"
                aria-selected={i === current}
                onMouseMove={() => i !== current && setActive(i)}
                onClick={() => void run(c)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm",
                  i === current ? "bg-ink text-paper" : "text-ink-2",
                )}
              >
                <Icon name={c.icon} className="size-4 shrink-0" />
                <span className="flex-1 truncate">{c.label}</span>
                {c.hint && (
                  <span
                    className={cn(
                      "truncate font-mono text-[11px]",
                      i === current ? "text-paper/70" : "text-ink-3",
                    )}
                  >
                    {c.hint}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p
        role="status"
        aria-live="polite"
        className="min-h-0 border-t border-rule px-4 py-2 font-mono text-[11px] text-ink-3"
      >
        {status || "↑ ↓ to move · Enter to run"}
      </p>
    </dialog>
  );
}
