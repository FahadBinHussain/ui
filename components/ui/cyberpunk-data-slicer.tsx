"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GlitchButton, RGBGlitchText } from "@/components/ui/glitch-effects";
import { TextScramble } from "@/components/ui/text-scramble";
import { CRTText } from "@/components/ui/crt";
import { motion, AnimatePresence } from "framer-motion";

interface CyberpunkDataSlicerProps {
  className?: string;
}

export function CyberpunkDataSlicer({ className }: CyberpunkDataSlicerProps) {
  const [open, setOpen] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Trigger a short global glitch when opening
  const triggerGlitch = () => {
    setGlitching(true);
    setOpen(true);
    // focus slightly after open so layout is ready
    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);
    window.setTimeout(() => {
      setGlitching(false);
    }, 350);
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Jagged cyberpunk search icon / trigger */}
      <GlitchButton
        onClick={triggerGlitch}
        className="border-cyan-500 text-cyan-400 rounded-none px-6 py-3 text-sm tracking-[0.25em] uppercase bg-black/60 hover:text-black"
      >
        <span className="inline-flex items-center gap-2 font-mono">
          <span
            className="inline-block h-4 w-4"
            style={{
              clipPath: "polygon(0 30%, 30% 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
              background:
                "linear-gradient(135deg, rgba(34,211,238,1) 0%, rgba(56,189,248,1) 40%, rgba(236,72,153,1) 100%)",
            }}
          />
          <span>SLICE</span>
        </span>
      </GlitchButton>

      {/* Fullscreen-ish glitch overlay */}
      <AnimatePresence>
        {glitching && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Horizontal RGB slice lines */}
            <motion.div
              className="absolute inset-0"
              initial={{ x: 0 }}
              animate={{ x: [-10, 10, -6, 0] }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="absolute inset-0 mix-blend-screen opacity-80">
                <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
              </div>
              <div className="absolute inset-0 mix-blend-screen opacity-60">
                <div className="h-full w-full bg-gradient-to-b from-transparent via-pink-500/10 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyberpunk search bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mt-8 w-full"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-black/80 shadow-[0_0_40px_rgba(8,47,73,0.9)]">
              {/* Scanline header */}
              <div className="flex items-center justify-between border-b border-cyan-500/40 bg-gradient-to-r from-cyan-900/60 via-black to-fuchsia-900/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-cyan-200">
                <span>Cyberpunk Data Slicer</span>
                <span className="text-cyan-400/70">v1.0 · RGB GLITCH</span>
              </div>

              {/* Scrambled label / input row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-8 items-center rounded-sm bg-black/60 px-2">
                  <RGBGlitchText text="DATA" fontSize="0.75rem" fontWeight="700" />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-1 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500">
                    <TextScramble text="SEARCH" className="inline-block" />
                  </div>

                  {/* Custom input surface */}
                  <div className="relative flex items-center rounded-md border border-cyan-500/40 bg-slate-950/70 px-3 py-2">
                    {/* Visible text and cyber-caret */}
                    <div className="flex min-h-[1.25rem] flex-1 items-center text-xs font-mono text-cyan-50">
                      <span className="whitespace-pre-wrap break-all">{value}</span>
                      {/* Block caret with CRT scanlines */}
                      <span
                        className="ml-[1px] inline-block h-[1.1em] w-[0.7em] animate-pulse"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, rgba(34,197,235,0.9) 0px, rgba(34,197,235,0.9) 1px, rgba(0,0,0,0.8) 1px, rgba(0,0,0,0.8) 2px)",
                          boxShadow: "0 0 10px rgba(34,197,235,0.7)",
                        }}
                      />
                    </div>

                    {/* Hidden input capturing real text */}
                    <input
                      ref={inputRef}
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      className="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
                      aria-label="Cyberpunk search"
                    />
                  </div>
                </div>
              </div>

              {/* Footer hint */}
              <div className="border-t border-cyan-500/20 bg-black/80 px-4 py-2 text-[10px] text-cyan-300/70">
                <CRTText glow={false} flicker className="text-[10px] text-cyan-300">
                  Type to slice through data indices · Press Esc to close
                </CRTText>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CyberpunkDataSlicer;