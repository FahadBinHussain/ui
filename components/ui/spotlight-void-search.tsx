"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { ChromaticAberration } from "@/components/ui/chromatic-aberration";
import { VelocityScrollSkew } from "@/components/ui/velocity-scroll-skew";
import { cn } from "@/lib/utils";

interface SpotlightVoidSearchProps {
  placeholder?: string;
  className?: string;
}

type Category = {
  id: string;
  label: string;
  description: string;
  group: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: "dashboards", label: "Dashboards", description: "Metrics, overviews, and analytics hubs.", group: "Product" },
  { id: "billing", label: "Billing", description: "Invoices, subscriptions, payment methods.", group: "Product" },
  { id: "team", label: "Team & Roles", description: "Members, permissions, and seats.", group: "Organization" },
  { id: "integrations", label: "Integrations", description: "Connect Stripe, Slack, GitHub, and more.", group: "Platform" },
  { id: "ai", label: "AI Workflows", description: "Agents, tools, and orchestration graphs.", group: "Intelligence" },
  { id: "logs", label: "Logs & Traces", description: "Errors, events, and observability streams.", group: "Reliability" },
  { id: "themes", label: "Themes", description: "Light, dark, and brand palettes.", group: "Design" },
  { id: "shortcuts", label: "Shortcuts", description: "Keyboard maps and power user routes.", group: "Product" },
  { id: "playbooks", label: "Playbooks", description: "Saved flows, templates, and recipes.", group: "Intelligence" },
  { id: "experiments", label: "Experiments", description: "A/B tests, feature flags, and cohorts.", group: "Growth" },
  { id: "guides", label: "Guides", description: "Docs, tutorials, and onboarding paths.", group: "Help" },
  { id: "api", label: "API", description: "Keys, webhooks, and rate limits.", group: "Platform" },
];

export function SpotlightVoidSearch({
  placeholder = "Search the void…",
  className,
}: SpotlightVoidSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mousePercent, setMousePercent] = useState({ x: 50, y: 50 });
  const [mousePixels, setMousePixels] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const spotlightRadius = 160;

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const xPct = ((event.clientX - rect.left) / rect.width) * 100;
    const yPct = ((event.clientY - rect.top) / rect.height) * 100;

    setMousePercent({ x: xPct, y: yPct });
    setMousePixels({ x: event.clientX, y: event.clientY });
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  useEffect(() => {
    if (open) {
      const timeout = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => window.clearTimeout(timeout);
    }
  }, [open]);

  const filtered = query.trim()
    ? DEFAULT_CATEGORIES.filter((category) => {
        const value = query.toLowerCase();
        return (
          category.label.toLowerCase().includes(value) ||
          category.description.toLowerCase().includes(value) ||
          category.group.toLowerCase().includes(value)
        );
      })
    : DEFAULT_CATEGORIES;

  const displayText = query || placeholder;

  return (
    <div className={cn("relative", className)}>
      {/* Minimal trigger pill */}
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-gray-200 shadow-lg shadow-slate-900/40 backdrop-blur-md"
      >
        <Search className="h-4 w-4 text-cyan-300" />
        <span className="hidden sm:inline">Search the Void</span>
        <span className="inline sm:hidden">Search</span>
      </button>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/95 text-white"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => inputRef.current?.focus()}
          style={{ cursor: "none" }}
        >
          {/* Underlying content: scrollable category grid with Lenis */}
          <VelocityScrollSkew maxSkew={0} className="relative h-full overflow-y-auto">
            <div className="min-h-[150vh] px-6 py-16 md:px-10">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[11px]">
                      ◯
                    </span>
                    <span className="uppercase tracking-[0.25em] text-slate-400">
                      Spotlight Void Search
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px]">
                      ESC
                    </span>
                    <span className="text-[10px]">to close</span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {filtered.map((category) => (
                    <div
                      key={category.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-slate-200"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold tracking-wide text-slate-50">
                          {category.label}
                        </span>
                        <span className="text-[10px] text-cyan-300/80">
                          {category.group}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </VelocityScrollSkew>

          {/* Dark overlay with spotlight hole revealing the categories */}
          <div
            className="pointer-events-none absolute inset-0 transition-all"
            style={{
              background: "rgba(0,0,0,0.98)",
              maskImage: `radial-gradient(circle ${spotlightRadius}px at ${mousePercent.x}% ${mousePercent.y}%, transparent 0%, black 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${mousePercent.x}% ${mousePercent.y}%, transparent 0%, black 100%)`,
              transition: "mask-position 0.08s ease-out",
            }}
          />

          {/* Torch cursor */}
          {isActive && (
            <div
              className="pointer-events-none fixed z-[60]"
              style={{
                left: mousePixels.x,
                top: mousePixels.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 shadow-[0_0_40px_rgba(34,211,238,0.7)]"
                  style={{
                    width: spotlightRadius * 2,
                    height: spotlightRadius * 2,
                    left: "50%",
                    top: "50%",
                  }}
                />
              </div>
            </div>
          )}

          {/* Search text at center of spotlight with chromatic aberration */}
          <div
            className="pointer-events-none fixed z-[55] flex items-center justify-center"
            style={{
              left: mousePixels.x,
              top: mousePixels.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <ChromaticAberration intensity={4} trigger="always">
              <span className="block max-w-[60vw] truncate text-center text-sm font-medium tracking-wide text-slate-50 md:text-base">
                {displayText}
              </span>
            </ChromaticAberration>
          </div>

          {/* Hidden text input to capture keystrokes */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="fixed left-1/2 top-1/2 h-[1px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-transparent text-transparent opacity-0 outline-none"
            aria-label={placeholder}
          />

          {/* Close button in corner */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleClose();
            }}
            className="fixed right-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[11px] text-slate-200 backdrop-blur-md hover:bg-black/90"
          >
            <X className="h-3.5 w-3.5" />
            <span>Close</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SpotlightVoidSearch;