"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { EmailLink } from "@/components/ui/EmailLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { gsap, SplitText, useScrollScene } from "@/lib/gsap";
import { copyText } from "@/lib/site-actions";

interface Props {
  email: string;
  phone: string;
  linkedin: string;
  whatsapp: string;
  timeZone: string;
  openTo: string;
}

function subscribeMinute(cb: () => void) {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
}

function useLocalTime(timeZone: string): string {
  return useSyncExternalStore(
    subscribeMinute,
    () =>
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(
        new Date(),
      ),
    () => "",
  );
}

/** Closing sheet: the address is the headline. Letters ink in; secondary channels follow. */
export function Connect({ email, phone, linkedin, whatsapp, timeZone, openTo }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const time = useLocalTime(timeZone);

  useScrollScene(ref, (root) => {
    const halves = root.querySelectorAll<HTMLElement>("[data-mail] > span");
    if (halves.length) {
      const split = SplitText.create(halves, { type: "chars", aria: "hidden" });
      gsap.fromTo(
        split.chars,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 80%", end: "top 35%", scrub: 0.5 },
        },
      );
    }
    gsap.from("[data-channel]", {
      opacity: 0,
      y: 18,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: "[data-channels]",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const channels: {
    label: string;
    value: string;
    href: string;
    icon: IconName;
    external?: boolean;
  }[] = [
    { label: "LinkedIn", value: "View profile", href: linkedin, icon: "linkedin", external: true },
    { label: "WhatsApp", value: phone, href: whatsapp, icon: "whatsapp", external: true },
    { label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}`, icon: "phone" },
  ];

  return (
    <div ref={ref}>
      <p className="text-ink-2">The fastest way to reach me:</p>
      <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-4">
        <EmailLink
          email={email}
          aria-label={`Email ${email}`}
          data-mail
          className="type-condensed font-display text-[clamp(1.9rem,5.2vw,4.75rem)] leading-[0.95] font-semibold tracking-[-0.02em] decoration-accent decoration-[3px] underline-offset-[0.12em] hover:underline"
        >
          {/* Two unbreakable halves: wraps only before "@" on narrow screens. */}
          <span className="inline-block whitespace-nowrap">{email.split("@")[0]}</span>
          <wbr />
          <span className="inline-block whitespace-nowrap">@{email.split("@")[1]}</span>
        </EmailLink>
        <button
          type="button"
          onClick={async () => {
            const ok = await copyText(email);
            setCopied(ok);
            if (ok) window.setTimeout(() => setCopied(false), 2000);
          }}
          className="mb-2 inline-flex h-10 items-center gap-2 rounded-full border border-ink/30 px-4 text-sm transition-colors hover:border-ink"
        >
          <Icon name="copy" className="size-4" />
          <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
        </button>
      </div>

      <div
        data-channels
        className="mt-16 grid border-t border-l border-rule md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.3fr)]"
      >
        {channels.map((c) => (
          <a
            key={c.label}
            data-channel
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex flex-col gap-6 border-r border-b border-rule p-6 transition-colors hover:bg-paper-2"
          >
            <span className="flex items-center justify-between text-sm text-ink-3">
              {c.label}
              <Icon
                name="arrowUpRight"
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Icon name={c.icon} className="size-4 text-line" />
              {c.value}
            </span>
            {c.external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        ))}
        <div data-channel className="flex flex-col gap-6 border-r border-b border-rule p-6">
          <span className="text-sm text-ink-3">Kolkata, UTC+05:30</span>
          <p className="font-medium">
            {time ? (
              <>
                It&apos;s <time className="font-mono">{time}</time> here now.
              </>
            ) : (
              "Local time in Kolkata."
            )}
          </p>
          <p className="text-sm text-ink-2">Open to {openTo}.</p>
        </div>
      </div>
    </div>
  );
}
