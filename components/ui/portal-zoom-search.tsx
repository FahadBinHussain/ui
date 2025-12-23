"use client";

import React, { FormEvent, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import TimeWarpTransition, { useTimeWarpTransition } from "@/components/ui/time-warp-transition";

/**
 * PortalZoomSearch
 *
 * Circular search bar that becomes the viewport.
 * When the user submits a query, the circle rapidly scales up,
 * masking the entire screen with the “results” while the old content blurs out.
 *
 * In a real multi-page setup, you would wire this to Barba.js transitions:
 * - The circular mask becomes the transition layer
 * - The results view corresponds to a separate data-barba container/namespace
 */

interface PortalZoomSearchProps {
  className?: string;
}

export function PortalZoomSearch({ className }: PortalZoomSearchProps) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [portalOpen, setPortalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isActive: warpActive, triggerTransition } = useTimeWarpTransition();

  const runPortal = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      // If empty, just focus the input so the user can start typing
      inputRef.current?.focus();
      return;
    }

    setSubmittedQuery(trimmed);
    setPortalOpen(true);

    // Trigger time warp distortion while the portal expands
    triggerTransition();
  }, [query, triggerTransition]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    runPortal();
  };

  const handleReset = () => {
    setPortalOpen(false);
    setSubmittedQuery(null);
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative min-h-[520px] flex items-center justify-center", className)}>
      {/* Base content that will blur when the portal opens */}
      <div
        className={cn(
          "relative z-10 max-w-4xl mx-auto px-4 py-8 transition-all duration-500",
          portalOpen ? "blur-md scale-105 pointer-events-none" : "blur-0 scale-100"
        )}
      >
        {/* Mock “origin page” content */}
        <div className="mb-10 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Portal <span className="text-cyan-300">Zoom</span> Search
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Type into the circular search node and press Enter. The circle becomes a wormhole,
            expanding to reveal the results view while the current page melts away behind it.
          </p>
        </div>

        {/* Circular search input */}
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <div className="relative">
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/70 bg-slate-950/90 shadow-[0_0_40px_rgba(8,47,73,0.9)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => runPortal()}
            >
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_140deg,rgba(34,211,238,0.3),transparent,rgba(94,234,212,0.4),transparent)] opacity-70 blur-sm" />

              {/* Inner disk */}
              <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-slate-950/95 border border-cyan-500/40 overflow-hidden">
                <Search className="mb-1 h-4 w-4 text-cyan-300" />
                <div className="px-2 text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-200/80">
                  {query ? "Press Enter" : "Portal Search"}
                </div>
                {/* Show a tiny preview of the query so typing feels responsive */}
                {query && (
                  <div className="mt-1 px-2 text-[9px] font-mono text-cyan-100/80 truncate max-w-[4.5rem]">
                    {query}
                  </div>
                )}
              </div>

              {/* Invisible input overlaying the circle */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="absolute inset-0 h-full w-full rounded-full border-none bg-transparent text-transparent caret-cyan-300 outline-none"
                aria-label="Portal zoom search"
              />
            </motion.div>
          </div>
        </form>

        {/* Helper text */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Start typing and press <span className="rounded-sm border border-slate-600 px-1">Enter</span>{" "}
          to travel through the portal.
        </div>
      </div>

      {/* Dark backing when portal open */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 bg-black/80 backdrop-blur transition-opacity duration-500",
          portalOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Expanding circular mask with results inside */}
      <AnimatePresence>
        {portalOpen && submittedQuery && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.div
              className="relative flex items-center justify-center rounded-full bg-slate-950 overflow-hidden shadow-[0_0_60px_rgba(8,47,73,1)]"
              initial={{ scale: 0.2 }}
              animate={{ scale: 20 }}
              exit={{ scale: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* Time warp distortion + “results page” content */}
              <TimeWarpTransition isActive={warpActive} duration={1.6}>
                <div className="pointer-events-auto flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
                  <div className="max-w-3xl px-6 text-center space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                      Wormhole established
                    </p>
                    <h3 className="text-3xl md:text-4xl font-semibold">
                      Results for{" "}
                      <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                        {submittedQuery}
                      </span>
                    </h3>
                    <p className="text-sm md:text-base text-slate-300">
                      This is the “destination” page rendered inside the expanding circle. In a real
                      multi-page setup, this view would be a separate Barba.js namespace loaded
                      during the transition.
                    </p>
                  </div>

                  <div className="mt-10 grid w-full max-w-4xl gap-4 px-6 md:grid-cols-3">
                    {["Overview", "Deep Dive", "Related"].map((section, index) => (
                      <div
                        key={section}
                        className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 px-4 py-4 text-left text-xs text-slate-200"
                      >
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                          {section}
                        </p>
                        <p className="text-[11px] leading-relaxed text-slate-300/90">
                          Sample content block {index + 1} that represents the results loaded inside
                          the portal viewport.
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-10 inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-black/40 px-4 py-1.5 text-[11px] text-slate-200 hover:bg-black/70"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Return to origin page
                  </button>
                </div>
              </TimeWarpTransition>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PortalZoomSearch;