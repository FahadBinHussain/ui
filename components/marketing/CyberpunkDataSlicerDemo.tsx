"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Zap } from "lucide-react";
import CyberpunkDataSlicer from "@/components/ui/cyberpunk-data-slicer";

export default function CyberpunkDataSlicerDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-8">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs text-cyan-300">
            <Activity className="h-3.5 w-3.5 text-fuchsia-400" />
            <span>Cyberpunk Data Slicer</span>
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">
            High-tech, brutalist{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-red-400 bg-clip-text text-transparent">
              data search interface
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-slate-400 md:text-base">
            Click the jagged search glyph to shatter the screen with an RGB glitch. The omnibar
            materializes with a Text Scramble title and a solid block cursor that blinks like a
            retro CRT scanline.
          </p>
        </motion.header>

        {/* Demo */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <CyberpunkDataSlicer />

          <div className="grid w-full gap-6 text-xs text-slate-200 md:grid-cols-3 md:text-sm">
            <div className="rounded-2xl border border-cyan-500/40 bg-black/70 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-300" />
                <span className="font-medium text-slate-100">RGB glitch transition</span>
              </div>
              <p>
                Clicking the jagged search icon triggers a brief cyberpunk-style glitch where the
                viewport horizontally slices and channels separate.
              </p>
            </div>
            <div className="rounded-2xl border border-fuchsia-500/40 bg-black/70 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/10 text-[11px] text-fuchsia-200">
                  A
                </span>
                <span className="font-medium text-slate-100">Scrambled search label</span>
              </div>
              <p>
                The omnibar label decodes from random characters into “SEARCH” using the existing
                TextScramble utility, reinforcing the hacked-terminal feel.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/40 bg-black/70 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-500/20 text-[11px] text-emerald-200">
                  █
                </span>
                <span className="font-medium text-slate-100">CRT block cursor</span>
              </div>
              <p>
                Instead of a slim caret line, the input uses a solid block cursor rendered with
                scanline stripes and a flickering CRT caption underneath.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}