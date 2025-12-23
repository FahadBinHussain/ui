"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Box } from "lucide-react";
import FlipOmnibar3D from "@/components/ui/3d-flip-omnibar";

export default function FlipOmnibar3DDemo() {
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
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs text-slate-300">
            <Box className="h-3.5 w-3.5 text-cyan-300" />
            <span>3D Flip-Card Omnibar</span>
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">
            An isometric{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              omnibar prism
            </span>{" "}
            with stacked results
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-slate-400 md:text-base">
            The search bar is a 3D rectangular prism. It shows trending tags on one face, then flips
            90° on the X-axis to reveal the input. Results don&apos;t drop down—they arrive as
            cards that fly in from the Z-axis, stacking as you scroll.
          </p>
        </motion.header>

        {/* Omnibar */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FlipOmnibar3D />
        </motion.section>

        {/* Explanation */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-6 text-xs text-slate-200 md:grid-cols-3 md:text-sm"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <span className="font-medium text-slate-100">3D rectangular prism</span>
            </div>
            <p>
              The omnibar sits inside a CSS perspective container. Two faces are modeled: the
              trending-tag face and the input face, connected by a top face for a prism feel.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/10 text-[11px] text-cyan-200">
                90°
              </span>
              <span className="font-medium text-slate-100">Flip-card focus</span>
            </div>
            <p>
              Focusing or clicking the bar rotates the prism -90° on the X-axis. The trending face
              tilts away while the hidden input face swings into view.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] text-emerald-200">
                Z
              </span>
              <span className="font-medium text-slate-100">Stacked Z-depth results</span>
            </div>
            <p>
              Results are rendered as Sticky Stacking Cards that feel like they&apos;re flying in
              from behind the omnibar as you scroll down the page.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}