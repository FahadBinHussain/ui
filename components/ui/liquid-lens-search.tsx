"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidImage } from "@/components/ui/liquid-image";
import { Metaballs } from "@/components/ui/metaballs";
import {
  GlassmorphismRefraction,
  glassPresets,
} from "@/components/ui/glassmorphism-refraction";

interface LiquidLensSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}

const SHELL_ID = "liquid-lens-shell";

function LiquidLensBackground() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 6, 4]} intensity={1.3} color="#38bdf8" />
      <pointLight position={[-4, -2, -2]} intensity={0.7} color="#a855f7" />
      <mesh position={[-1.8, 0.4, -2.5]}>
        <boxGeometry args={[1.4, 1, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[1.8, -0.4, -2.5]}>
        <boxGeometry args={[1.2, 0.9, 1]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 0, -3.2]}>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshStandardMaterial
          color="#22d3ee"
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>
    </>
  );
}

/**
 * Liquid Lens Search
 *
 * A small floating orb that liquefies on hover and morphs into
 * a full-width glassmorphism search bar with metaball goop.
 */
export function LiquidLensSearch({
  className,
  placeholder = "Search the interface…",
  ...props
}: LiquidLensSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const glassLayers = [
    {
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [4.5, 1.2, 1] as [number, number, number],
      geometry: "plane" as const,
      ...glassPresets.magnifyingGlass,
      refractionStrength: 0.18,
      thickness: 1.0,
    },
  ];

  return (
    <div className={cn("pointer-events-none", className)} {...props}>
      {/* Orb trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            className="fixed bottom-6 right-6 z-40 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
          >
            <motion.div
              layoutId={SHELL_ID}
              className="relative h-16 w-16 overflow-hidden rounded-full border border-cyan-200/60 bg-slate-900/40 shadow-[0_0_40px_rgba(34,211,238,0.55)] backdrop-blur-xl"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 60px rgba(56,189,248,0.75)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              {/* Liquid image distortion using Three.js shader */}
              <div className="absolute inset-0 opacity-80">
                <LiquidImage
                  src="/earth-texture.jpg"
                  width={128}
                  height={128}
                  intensity={0.4}
                  className="h-full w-full rounded-full"
                />
              </div>

              {/* Glass highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-cyan-500/25 mix-blend-screen" />

              {/* Search icon */}
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <Search className="h-5 w-5 text-cyan-50 drop-shadow-[0_0_8px_rgba(15,118,110,0.7)]" />
              </div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay + morphing search bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              layoutId={SHELL_ID}
              className="relative w-full max-w-5xl px-4 rounded-3xl"
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer glow */}
              <div className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-cyan-300/70 via-blue-500/60 to-indigo-500/70 opacity-70 blur-md" />

              <div className="relative overflow-hidden rounded-[inherit] border border-cyan-100/30 bg-slate-950/50 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
                {/* Metaballs goop background (GSAP) */}
                <div className="absolute inset-0 opacity-70">
                  <Metaballs
                    ballCount={5}
                    color="#38bdf8"
                    useColor
                    className="absolute inset-0 h-full w-full"
                  />
                </div>

                {/* Glassmorphism refraction strip using Three.js */}
                <div className="absolute inset-0 mix-blend-screen opacity-80">
                  <GlassmorphismRefraction
                    backgroundElements={<LiquidLensBackground />}
                    glassLayers={glassLayers}
                    cameraPosition={[0, 0, 5]}
                    cameraFov={60}
                    className="h-24 w-full"
                  />
                </div>

                {/* Search input layer */}
                <div className="relative z-10 flex items-center gap-4 px-6 py-4">
                  <Search className="h-6 w-6 text-cyan-100" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-base text-slate-50 placeholder:text-cyan-100/50 outline-none md:text-lg"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="rounded-full p-1.5 transition-colors hover:bg-slate-900/40"
                    >
                      <X className="h-4 w-4 text-cyan-100/80" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1.5 transition-colors hover:bg-slate-900/40"
                  >
                    <X className="h-4 w-4 text-cyan-100/80" />
                  </button>
                </div>

                {/* Helper text */}
                <div className="relative z-10 flex items-center justify-between px-6 pb-3 text-[11px] text-cyan-100/60 md:text-xs">
                  <span>Liquid Lens · Liquid Image Shader · Metaballs · Glassmorphism Refraction</span>
                  <span>Press Esc or click outside to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}