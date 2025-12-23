"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Moon, Grid3X3 } from "lucide-react";
import SpotlightVoidSearch from "@/components/ui/spotlight-void-search";

export default function SpotlightVoidDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:px-8">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">
            <Moon className="h-3.5 w-3.5 text-slate-200" />
            <span>The Spotlight Void</span>
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">
            A minimalist,{" "}
            <span className="bg-gradient-to-r from-slate-200 via-cyan-300 to-slate-200 bg-clip-text text-transparent">
              torch-based search surface
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-base">
            Click search to dim the entire page to near-black. Your cursor becomes a spotlight
            that reveals a grid of categories, with the query projected directly inside the light.
          </p>
        </motion.header>

        {/* Demo */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <SpotlightVoidSearch />
        </motion.section>

        {/* Concept explanation */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-6 text-xs text-slate-200 md:grid-cols-3 md:text-sm"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <span className="font-medium text-slate-100">Minimal trigger</span>
            </div>
            <p>
              The primary interface is just a small pill. Once clicked, it takes over the entire
              viewport, turning the rest of the UI into a dark void.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Grid3X3 className="h-4 w-4 text-cyan-300" />
              <span className="font-medium text-slate-100">Spotlight Torch Reveal</span>
            </div>
            <p>
              The grid of search categories lives underneath a full-screen mask. Only the circular
              spotlight around your cursor reveals what&apos;s below.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/50 text-[10px] text-cyan-200">
                RGB
              </span>
              <span className="font-medium text-slate-100">Chromatic projection</span>
            </div>
            <p>
              Your query is typed straight into the center of the light circle, rendered with
              chromatic aberration to feel like a lens projection inside the beam.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}