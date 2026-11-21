"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme-client";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light" as const);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next === "dark" ? "night drafting (dark)" : "paper (light)"} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "grid size-9 place-items-center rounded-full border border-rule text-ink-2 transition-colors hover:border-ink hover:text-ink",
        className,
      )}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} className="size-4" />
    </button>
  );
}
