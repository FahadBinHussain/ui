"use client";

import React, { useEffect, useState } from "react";

interface FilmGrainProps {
  /**
   * Opacity of the grain effect (default: 0.05)
   */
  opacity?: number;
  /**
   * Blend mode for the grain (default: "overlay")
   */
  blendMode?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion";
  /**
   * Enable animated grain (default: true)
   */
  animate?: boolean;
  /**
   * Animation speed in seconds (default: 0.5)
   */
  animationSpeed?: number;
  /**
   * Animation steps (default: 5)
   */
  animationSteps?: number;
  /**
   * Grain size/scale (default: 1)
   */
  scale?: number;
  /**
   * Base frequency for turbulence (default: 0.9 for fine grain)
   */
  baseFrequency?: number;
  /**
   * Number of octaves for turbulence (default: 4)
   */
  octaves?: number;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Film Grain Overlay
 * 
 * Subtle static grain texture that kills the "flat digital" look,
 * making websites feel tactile, retro, and cinematic
 */
export function FilmGrain({
  opacity = 0.05,
  blendMode = "overlay",
  animate = true,
  animationSpeed = 0.5,
  animationSteps = 5,
  scale = 1,
  baseFrequency = 0.9,
  octaves = 4,
  className = "",
}: FilmGrainProps) {
  const [grainId] = useState(() => `grain-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <>
      {/* SVG Filter Definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={grainId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={octaves}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Grain Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{
          zIndex: 9999,
          filter: `url(#${grainId})`,
          opacity: opacity,
          mixBlendMode: blendMode,
          transform: `scale(${scale})`,
          ...(animate && {
            animation: `grain-shift ${animationSpeed}s steps(${animationSteps}) infinite`,
          }),
        }}
      />

      {/* Keyframes for animation */}
      {animate && (
        <style jsx>{`
          @keyframes grain-shift {
            0%, 100% { transform: scale(${scale}) translate(0, 0); }
            10% { transform: scale(${scale}) translate(-5%, -5%); }
            20% { transform: scale(${scale}) translate(-10%, 5%); }
            30% { transform: scale(${scale}) translate(5%, -10%); }
            40% { transform: scale(${scale}) translate(-5%, 15%); }
            50% { transform: scale(${scale}) translate(10%, 5%); }
            60% { transform: scale(${scale}) translate(5%, -15%); }
            70% { transform: scale(${scale}) translate(-10%, 10%); }
            80% { transform: scale(${scale}) translate(15%, -5%); }
            90% { transform: scale(${scale}) translate(-15%, -10%); }
          }
        `}</style>
      )}
    </>
  );
}

/**
 * Preset: Subtle grain for clean, minimal sites
 */
export function FilmGrainSubtle({ className = "" }: { className?: string }) {
  return (
    <FilmGrain
      opacity={0.03}
      blendMode="overlay"
      animate={true}
      animationSpeed={0.8}
      baseFrequency={0.7}
      className={className}
    />
  );
}

/**
 * Preset: Classic film look
 */
export function FilmGrainClassic({ className = "" }: { className?: string }) {
  return (
    <FilmGrain
      opacity={0.08}
      blendMode="overlay"
      animate={true}
      animationSpeed={0.5}
      baseFrequency={0.9}
      octaves={5}
      className={className}
    />
  );
}

/**
 * Preset: Heavy VHS / retro feel
 */
export function FilmGrainVHS({ className = "" }: { className?: string }) {
  return (
    <FilmGrain
      opacity={0.12}
      blendMode="hard-light"
      animate={true}
      animationSpeed={0.3}
      animationSteps={8}
      baseFrequency={1.2}
      octaves={6}
      className={className}
    />
  );
}

/**
 * Preset: Security camera / surveillance look
 */
export function FilmGrainSecurity({ className = "" }: { className?: string }) {
  return (
    <FilmGrain
      opacity={0.15}
      blendMode="multiply"
      animate={true}
      animationSpeed={0.2}
      animationSteps={10}
      baseFrequency={1.5}
      octaves={3}
      className={className}
    />
  );
}

/**
 * Preset: Static grain (no animation)
 */
export function FilmGrainStatic({ className = "" }: { className?: string }) {
  return (
    <FilmGrain
      opacity={0.05}
      blendMode="overlay"
      animate={false}
      baseFrequency={0.9}
      className={className}
    />
  );
}

/**
 * Preset: Soft grain for photography sites
 */
export function FilmGrainPhotographic({ className = "" }: { className?: string }) {
  return (
    <FilmGrain
      opacity={0.06}
      blendMode="soft-light"
      animate={true}
      animationSpeed={1}
      baseFrequency={0.6}
      octaves={3}
      className={className}
    />
  );
}

/**
 * Alternative: PNG/Image-based grain (faster than SVG on some devices)
 */
export function FilmGrainImage({
  opacity = 0.05,
  blendMode = "overlay" as const,
  animate = true,
  animationSpeed = 0.5,
  imageUrl = "/noise.png", // User must provide their own noise texture
  className = "",
}: {
  opacity?: number;
  blendMode?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion";
  animate?: boolean;
  animationSpeed?: number;
  imageUrl?: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{
          zIndex: 9999,
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: opacity,
          mixBlendMode: blendMode,
          ...(animate && {
            animation: `grain-move ${animationSpeed}s steps(5) infinite`,
          }),
        }}
      />

      {animate && (
        <style jsx>{`
          @keyframes grain-move {
            0%, 100% { background-position: 0 0; }
            10% { background-position: -5% -10%; }
            20% { background-position: -15% 5%; }
            30% { background-position: 7% -8%; }
            40% { background-position: -12% 12%; }
            50% { background-position: 10% 5%; }
            60% { background-position: 8% -15%; }
            70% { background-position: -10% 10%; }
            80% { background-position: 15% -5%; }
            90% { background-position: -15% -10%; }
          }
        `}</style>
      )}
    </>
  );
}

/**
 * Grain with vignette darkening on edges
 */
export function FilmGrainWithVignette({
  grainOpacity = 0.05,
  vignetteStrength = 0.5,
  className = "",
}: {
  grainOpacity?: number;
  vignetteStrength?: number;
  className?: string;
}) {
  return (
    <>
      <FilmGrain opacity={grainOpacity} className={className} />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9998,
          background: `radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, ${vignetteStrength}) 100%)`,
        }}
      />
    </>
  );
}

/**
 * Colored grain for creative effects
 */
export function FilmGrainColored({
  color = "#ff00ff",
  opacity = 0.05,
  blendMode = "screen" as const,
  className = "",
}: {
  color?: string;
  opacity?: number;
  blendMode?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion";
  className?: string;
}) {
  const [grainId] = useState(() => `grain-colored-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={grainId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.5" />
              <feFuncG type="linear" slope="0.5" />
              <feFuncB type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{
          zIndex: 9999,
          filter: `url(#${grainId})`,
          opacity: opacity,
          mixBlendMode: blendMode,
          animation: "grain-shift 0.5s steps(5) infinite",
          backgroundColor: color,
        }}
      />

      <style jsx>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(10%, 5%); }
          60% { transform: translate(5%, -15%); }
          70% { transform: translate(-10%, 10%); }
          80% { transform: translate(15%, -5%); }
          90% { transform: translate(-15%, -10%); }
        }
      `}</style>
    </>
  );
}
