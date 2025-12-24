"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Orbit } from "lucide-react";
import PortalZoomSearch from "@/components/ui/portal-zoom-search";

export default function PortalZoomSearchDemo() {
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
            <Orbit className="h-3.5 w-3.5 text-cyan-300" />
            <span>Portal Zoom Search</span>
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">
            A circular{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              search portal
            </span>{" "}
            that becomes the viewport
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-slate-400 md:text-base">
            The search bar is a circular node. When you type a query and hit Enter, the circle
            expands into a wormhole: it masks the entire screen with the results view while the
            origin page blurs out behind it.
          </p>
        </motion.header>

        {/* Demo */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex flex-col items-center justify-center"
        >
          <PortalZoomSearch />

          <div className="mt-10 grid w-full gap-6 text-xs text-slate-200 md:grid-cols-3 md:text-sm">
            <div className="rounded-2xl border border-cyan-500/40 bg-black/70 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Search className="h-4 w-4 text-cyan-300" />
                <span className="font-medium text-slate-100">Circular search node</span>
              </div>
              <p>
                The search input is represented as a circular node at the center of the layout.
                It feels more like a portal than a traditional search bar.
              </p>
            </div>
            <div className="rounded-2xl border border-fuchsia-500/40 bg-black/70 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/10 text-[11px] text-fuchsia-200">
                  ○
                </span>
                <span className="font-medium text-slate-100">Scale-based masking</span>
              </div>
              <p>
                On submit, the circle scales up dramatically until it covers the viewport, turning
                into a circular mask that reveals the destination view inside.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/40 bg-black/70 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-500/20 text-[11px] text-emerald-200">
                  TW
                </span>
                <span className="font-medium text-slate-100">Time Warp + Barba-inspired</span>
              </div>
              <p>
                The interior of the portal uses the existing Time Warp transition to distort the
                new content. In a real multi-page Barba.js setup, this circle would be your custom
                transition layer between namespaces.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}