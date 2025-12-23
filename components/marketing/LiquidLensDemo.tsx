"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplets, Eye, Layers, Search } from "lucide-react";
import { LiquidLensSearch } from "@/components/ui/liquid-lens-search";

export default function LiquidLensDemo() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/25 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 md:py-24">
        {/* Hero copy */}
        <section className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-1 text-xs font-medium text-cyan-200"
          >
            <Droplets className="h-3.5 w-3.5" />
            LIQUID LENS · Three.js · Metaballs · GSAP
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent">
                Liquid Lens Search
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Orb → Mercury Bar
              </span>
            </h1>
            <p className="max-w-xl text-base text-slate-300 md:text-lg">
              A floating glass orb that ripples with liquid shaders, then bursts
              into a full-width search bar made of metaball goop and
              glassmorphism refraction. Built for interfaces that want to feel
              physical, tactile, and impossibly premium.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid gap-4 text-sm text-slate-300 md:grid-cols-3"
          >
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-4">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20">
                <Eye className="h-4 w-4 text-cyan-300" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-cyan-100">
                Orbital Lens
              </h3>
              <p className="text-xs text-slate-400">
                A small glass orb anchored to the viewport corner, powered by a
                liquid image shader.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/60 p-4">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20">
                <Droplets className="h-4 w-4 text-sky-300" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-sky-100">
                Metaball Morph
              </h3>
              <p className="text-xs text-slate-400">
                On click, the orb stretches across the screen using a GSAP-driven
                metaballs goop layer.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/60 p-4">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20">
                <Layers className="h-4 w-4 text-indigo-300" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-indigo-100">
                Glass Refraction
              </h3>
              <p className="text-xs text-slate-400">
                A Three.js glass strip refracts a tiny 3D scene behind the bar
                for real depth and parallax.
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center gap-2 text-xs text-slate-400"
          >
            <Search className="h-3.5 w-3.5 text-cyan-300" />
            Hover the orb in the bottom-right corner, then click to morph it
            into the Liquid Lens search bar.
          </motion.p>
        </section>

        {/* Background content that the bar floats above */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.85)]"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Search Results Canvas
                </h2>
                <p className="text-xs text-slate-400">
                  Example content the Liquid Lens bar can float above and
                  distort.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Realtime UI Playground
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                {
                  title: "Holographic dashboard",
                  tag: "Interface concept",
                },
                {
                  title: "Voice-first command palette",
                  tag: "Interaction",
                },
                {
                  title: "Spatial search clusters",
                  tag: "Information design",
                },
                {
                  title: "Glassmorphism overlays",
                  tag: "Visual language",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/80 p-4 transition-colors hover:border-cyan-500/70"
                >
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    {item.tag}
                  </div>
                  <div className="text-sm font-semibold text-slate-100 group-hover:text-cyan-100">
                    {item.title}
                  </div>
                  <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-700/60 bg-slate-950/70 p-6"
          >
            <div>
              <h2 className="mb-2 text-sm font-semibold text-slate-100">
                Tech Stack
              </h2>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <span className="text-cyan-300">Three.js</span> via
                  React‑Three‑Fiber for the refraction glass.
                </li>
                <li>
                  <span className="text-sky-300">LiquidImage</span> shader for
                  the orb&apos;s surface distortion.
                </li>
                <li>
                  <span className="text-indigo-300">Metaballs</span> + GSAP for
                  the goop expansion into a bar.
                </li>
                <li>
                  <span className="text-emerald-300">Framer Motion</span> for
                  the shared layout morph between orb and bar.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 text-[11px] text-slate-300">
              <div className="mb-2 font-semibold text-slate-100">
                Implementation
              </div>
              <code className="block rounded-md bg-slate-950/80 p-3 text-[10px] leading-relaxed text-slate-400">
                {`import { LiquidLensSearch } from "@/components/ui/liquid-lens-search";

<LiquidLensSearch />`}
              </code>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Floating orb + morphing search bar */}
      <LiquidLensSearch />
    </div>
  );
}