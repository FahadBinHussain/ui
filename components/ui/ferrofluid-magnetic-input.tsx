"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Magnetic } from "./magnetic";
import { FerrofluidMagneticTypography } from "@/components/ui/ferrofluid-typography";
import { cn } from "@/lib/utils";

interface FerrofluidMagneticInputProps {
  placeholder?: string;
  className?: string;
}

type ParticleConfig = {
  id: number;
  clusterX: number;
  clusterY: number;
  lineX: number;
  lineY: number;
};

export function FerrofluidMagneticInput({
  placeholder = "Search the field...",
  className = "",
}: FerrofluidMagneticInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const shockTimeoutRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const particles = useMemo<ParticleConfig[]>(() => {
    const count = 32;
    const radius = 42;
    const spread = 0.6;
    const lineWidth = 240;
    const startX = -lineWidth / 2;
    const step = lineWidth / (count - 1);

    const result: ParticleConfig[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius * (0.5 + Math.random() * 0.8);
      const cx = Math.cos(angle) * r;
      const cy = Math.sin(angle) * r * spread;

      const lx = startX + i * step;
      const ly = 0;

      result.push({
        id: i,
        clusterX: cx,
        clusterY: cy,
        lineX: lx,
        lineY: ly,
      });
    }
    return result;
  }, []);

  useEffect(
    () => () => {
      if (shockTimeoutRef.current) {
        window.clearTimeout(shockTimeoutRef.current);
      }
    },
    []
  );

  const triggerShockwave = () => {
    setShockwaveActive(true);
    if (shockTimeoutRef.current) {
      window.clearTimeout(shockTimeoutRef.current);
    }
    shockTimeoutRef.current = window.setTimeout(() => {
      setShockwaveActive(false);
    }, 220);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    triggerShockwave();
  };

  const handleActivate = () => {
    setFocused(true);
    setShowLine(true);
    inputRef.current?.focus();
  };

  const displayText = value.length ? value.toUpperCase() : "SEARCH";

  return (
    <div className={cn("w-full", className)}>
      <Magnetic strength={0.35}>
        <div
          className="relative mx-auto flex max-w-xl flex-col gap-4 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-[0_0_40px_rgba(8,47,73,0.6)]"
          onClick={handleActivate}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-cyan-500/10">
                <Search className="h-3 w-3" />
              </span>
              <span>Ferrofluid Magnetic Input</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-cyan-200/80">
              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">
                WebGL
              </span>
              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">
                Physics
              </span>
            </div>
          </div>

          <div className="relative mt-3 h-32 overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/80">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-32 w-32 rounded-full bg-emerald-500/15 blur-3xl" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              {particles.map((particle) => {
                const baseX = showLine ? particle.lineX : particle.clusterX;
                const baseY = showLine ? particle.lineY : particle.clusterY;

                let offsetX = 0;
                let offsetY = 0;
                if (shockwaveActive) {
                  const mag = Math.sqrt(baseX * baseX + baseY * baseY) || 1;
                  const strength = 14;
                  offsetX = (baseX / mag) * strength;
                  offsetY = (baseY / mag) * strength;
                }

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute h-2 w-2 rounded-full bg-cyan-300/90 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                    initial={false}
                    animate={{
                      x: baseX + offsetX,
                      y: baseY + offsetY,
                      scale: focused ? 1.15 : 1,
                      opacity: showLine ? 1 : 0.85,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: showLine ? 260 : 190,
                      damping: 18,
                      mass: 0.45,
                      delay: showLine ? particle.id * 0.004 : 0,
                    }}
                  />
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-x-6 bottom-4 flex items-center justify-between text-[11px] text-cyan-100/80">
              <span className="truncate">
                {focused ? displayText : placeholder}
              </span>
              <span className="hidden items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-cyan-200/80 md:flex">
                type to send a shockwave
              </span>
            </div>

            <input
              ref={inputRef}
              value={value}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="pointer-events-auto absolute inset-x-6 bottom-3 bg-transparent text-transparent caret-cyan-400 outline-none"
              aria-label={placeholder}
            />
          </div>

          <div className="mt-2 h-32 w-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950">
            {showLine && (
              <FerrofluidMagneticTypography
                text={displayText}
                size={0.85}
                strength={shockwaveActive ? 1.1 : 0.8}
                radius={2.4}
                noiseScale={2}
                noiseStrength={shockwaveActive ? 0.9 : 0.5}
                color="#020617"
                spikeColor="#22d3ee"
                backgroundColor="#020617"
              />
            )}
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] text-cyan-100/70">
            <span>Particles cluster until focus, then snap into a ferrofluid line.</span>
            <span>Click anywhere in the card to focus.</span>
          </div>
        </div>
      </Magnetic>
    </div>
  );
}

export default FerrofluidMagneticInput;