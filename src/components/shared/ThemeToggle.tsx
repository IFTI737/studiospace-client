"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "cn";

const options = [
  { value: "system", label: "Auto", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

// Auto / Light / Dark. Full switch from sm screens up; a single cycling button on small phones.
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current = mounted ? (theme ?? "system") : "system";
  const index = options.findIndex((o) => o.value === current);
  const active = options[index === -1 ? 0 : index];
  const next = options[((index === -1 ? 0 : index) + 1) % options.length];
  const ActiveIcon = active.icon;

  return (
    <>
      <div
        role="radiogroup"
        aria-label="Color theme"
        className="relative hidden h-9 items-center gap-0.5 rounded-full border bg-muted/60 p-0.5 sm:flex"
      >
        <span
          aria-hidden
          className="absolute top-0.5 left-0.5 size-8 rounded-full bg-primary shadow-[0_6px_16px_-6px] shadow-primary/70 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ transform: `translateX(${(index === -1 ? 0 : index) * 34}px)`, opacity: mounted ? 1 : 0 }}
        />
        {options.map(({ value, label, icon: Icon }) => {
          const selected = current === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${label} theme`}
              title={label}
              onClick={() => setTheme(value)}
              className={cn(
                "relative z-10 flex size-8 items-center justify-center rounded-full transition-colors",
                selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setTheme(next.value)}
        aria-label={`Theme: ${active.label}. Switch to ${next.label}`}
        title={`Theme: ${active.label}`}
        className="flex size-9 items-center justify-center rounded-full border bg-muted/60 text-foreground transition-colors hover:text-primary sm:hidden"
      >
        <ActiveIcon className="size-4" />
      </button>
    </>
  );
}
