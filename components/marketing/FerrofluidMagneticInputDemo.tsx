"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnet, Waves, Zap } from "lucide-react";
import { FerrofluidMagneticInput } from "@/components/ui/ferrofluid-magnetic-input";

export default function FerrofluidMagneticInputDemo() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 px-4 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-cyan-200">
            <Magnet className="h-3 w-3" />
            <span>Ferrofluid Magnetic Input</span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Search as a{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              magnetic particle field
            </span>
          </h1>
          <p className="mt-3 text-sm text-cyan-100/80 md:text-base">
            The input is no longer a box. It&apos;s a cluster of magnetic particles that pull toward
            your cursor, snap into a ferrofluid line on focus, and react with shockwaves as you type.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <FerrofluidMagneticInput />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 text-xs text-cyan-100/80 md:grid-cols-3"
        >
          <div className="rounded-xl border border-cyan-500/25 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Magnet className="h-4 w-4 text-cyan-300" />
              <span className="font-medium text-cyan-100">
                Magnetic particle input
              </span>
            </div>
            <p>
              The &quot;input field&quot; is rendered as a tight cluster of glowing particles that
              subtly tug toward your cursor using the magnetic wrapper.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/25 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-300" />
              <span className="font-medium text-cyan-100">
                Ferrofluid snap-to-line
              </span>
            </div>
            <p>
              On click, the particles reorganize into a sharp line while a WebGL
              <span className="font-semibold text-cyan-200"> ferrofluid typography</span> layer
              reflects the current query.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/25 bg-slate-950/80 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Waves className="h-4 w-4 text-cyan-300" />
              <span className="font-medium text-cyan-100">Typing shockwaves</span>
            </div>
            <p>
              Each keystroke sends a brief shockwave through the particle cluster and ferrofluid
              layer, pushing elements outward before they settle back into place.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}