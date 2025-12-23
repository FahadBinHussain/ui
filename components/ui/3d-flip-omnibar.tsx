"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Flame, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { StickyStackingCards } from "@/components/ui/sticky-stacking-cards";

/**
 * 3D Flip-Card Omnibar
 *
 * - Isometric rectangular prism search bar using CSS 3D transforms
 * - Front face: trending tags
 * - On focus: prism flips 90deg on X axis to reveal the input face
 * - Results: appear as sticky stacking cards that feel like flying in from Z-depth
 */

type OmnibarResult = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  color?: string;
};

interface FlipOmnibarProps {
  placeholder?: string;
  className?: string;
}

const TRENDING_TAGS = ["dashboards", "billing", "ai workflows", "team permissions", "search UI"];

const MOCK_RESULTS: OmnibarResult[] = [
  {
    id: "search-ui",
    title: "Search Interfaces",
    description: "Patterns for omnibars, radial search, and AI-powered query surfaces.",
    badge: "Pattern Library",
    color: "bg-gradient-to-br from-sky-600 to-indigo-700",
  },
  {
    id: "ai-intent",
    title: "Intent-Aware Command Palettes",
    description: "Command+K surfaces that blend navigation, settings, and actions with AI.",
    badge: "AI",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    id: "cards",
    title: "3D Card Effects",
    description: "CSS perspective, hover tilt, and layered content for rich card layouts.",
    badge: "3D",
    color: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
  {
    id: "stacking",
    title: "Sticky Stacking Cards",
    description: "Scrolling stories where cards stack and pin to tell progressive narratives.",
    badge: "Scroll UX",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
];

export function FlipOmnibar3D({ placeholder = "Search components, patterns, or docs…", className }: FlipOmnibarProps) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(TRENDING_TAGS[0]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = query.trim()
    ? MOCK_RESULTS.filter((result) => {
        const value = query.toLowerCase();
        return (
          result.title.toLowerCase().includes(value) ||
          result.description.toLowerCase().includes(value) ||
          (result.badge && result.badge.toLowerCase().includes(value))
        );
      })
    : MOCK_RESULTS;

  useEffect(() => {
    if (!focused) return;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timeout);
  }, [focused]);

  useEffect(() => {
    let tagIndex = 0;
    const intervalId = window.setInterval(() => {
      tagIndex = (tagIndex + 1) % TRENDING_TAGS.length;
      setActiveTag(TRENDING_TAGS[tagIndex]);
    }, 2400);
    return () => window.clearInterval(intervalId);
  }, []);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    // Keep prism flipped while there is a query; otherwise allow reset
    if (!query.trim()) {
      setFocused(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className="mx-auto flex max-w-xl items-center justify-center"
        style={{
          perspective: "1200px",
        }}
      >
        <div
          className="relative h-20 w-full max-w-xl transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: focused ? "rotateX(-90deg)" : "rotateX(0deg)",
          }}
        >
          {/* Front face: trending tags */}
          <div
            className="absolute inset-0 rounded-2xl border border-cyan-500/40 bg-slate-950/90 shadow-[0_18px_50px_rgba(15,23,42,0.9)]"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(40px)",
            }}
          >
            <div className="flex h-full items-center gap-4 px-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                <Search className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Trending in the Omnibar
                </span>
                <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-300">
                  {TRENDING_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setQuery(tag);
                        setFocused(true);
                        inputRef.current?.focus();
                      }}
                      className={cn(
                        "rounded-full border px-2 py-0.5 transition-colors",
                        activeTag === tag
                          ? "border-cyan-500/70 bg-cyan-500/10 text-cyan-200"
                          : "border-white/10 bg-slate-900/80 hover:border-cyan-400/60"
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFocused(true);
                  inputRef.current?.focus();
                }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200 hover:bg-white/10"
              >
                Press / to search
              </button>
            </div>
          </div>

          {/* Top face: subtle highlight (only when not focused so it doesn't cover the input face) */}
          {!focused && (
            <div
              className="absolute left-0 right-0 h-8 rounded-t-2xl bg-gradient-to-br from-slate-800 to-slate-900"
              style={{
                transformOrigin: "bottom center",
                transform: "rotateX(90deg) translateZ(84px)",
                backfaceVisibility: "hidden",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Back face / input face */}
          <div
            className="absolute inset-0 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(90deg) translateZ(40px)",
            }}
          >
            <div className="flex h-full items-center gap-3 px-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                <Flame className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className="w-full bg-transparent text-sm text-slate-50 placeholder-slate-500 outline-none"
                />
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                  <TrendingUp className="h-3 w-3 text-cyan-400" />
                  <span>Results will stack behind the bar as you scroll</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results stack */}
      <div className="mt-16">
        <StickyStackingCards
          cards={results.map((result, index) => ({
            id: result.id,
            title: result.title,
            description: result.description,
            color: result.color,
            content: (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-4xl font-bold text-white">{result.title}</h3>
                    {result.badge && (
                      <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                        {result.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-slate-100/90 max-w-2xl">{result.description}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs text-slate-200/80">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-[11px]">
                    {index + 1}
                  </span>
                  <span>Card {index + 1} of {results.length} · Scroll to bring the next card in from the depth.</span>
                </div>
              </div>
            ),
          }))}
          cardHeight={460}
          gap={24}
          enableScrollTrigger={false}
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
}

export default FlipOmnibar3D;