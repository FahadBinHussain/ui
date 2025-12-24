"use client";

import { AICommandCenter } from "@/components/ui/ai-command-center";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AICommandCenterDemo() {
  return (
    <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-cyan-500/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] text-gray-300">
            <Sparkles className="h-3 w-3 text-cyan-300" />
            <span>Semantic AI Command Center</span>
          </div>
          <p className="text-xs text-gray-400">
            Press{" "}
            <span className="rounded bg-white/5 px-1 py-0.5 font-mono text-[10px]">
              ⌘ K
            </span>{" "}
            or{" "}
            <span className="rounded bg-white/5 px-1 py-0.5 font-mono text-[10px]">
              Ctrl K
            </span>{" "}
            to open.
          </p>
        </motion.div>

        <AICommandCenter showLauncher />
      </div>
    </div>
  );
}