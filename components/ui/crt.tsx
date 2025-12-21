"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CRTProps {
  children: ReactNode;
  className?: string;
  scanlineIntensity?: number;
  curvature?: number;
  flickerIntensity?: number;
  chromaticAberration?: boolean;
}

/**
 * Retro CRT monitor effect with scanlines, curvature, and flicker
 * Creates an authentic old-school computer monitor appearance
 */
export function CRT({
  children,
  className = "",
  scanlineIntensity = 0.3,
  curvature = 0.02,
  flickerIntensity = 0.05,
  chromaticAberration = true
}: CRTProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;

    const animate = () => {
      // Subtle flicker effect
      if (flickerIntensity > 0) {
        const flicker = 1 + (Math.random() - 0.5) * flickerIntensity;
        container.style.filter = `brightness(${flicker})`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [flickerIntensity]);

  return (
    <div
      ref={containerRef}
      className={`
        relative overflow-hidden
        bg-gradient-to-b from-green-900 via-green-800 to-green-900
        border-4 border-gray-800 rounded-lg
        shadow-2xl
        ${className}
      `}
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(0,255,0,0.1) 0%, rgba(0,100,0,0.8) 100%),
          linear-gradient(90deg,
            rgba(0,20,0,0.9) 0%,
            rgba(0,40,0,0.7) 50%,
            rgba(0,20,0,0.9) 100%
          )
        `,
        boxShadow: `
          inset 0 0 50px rgba(0,255,0,0.1),
          0 0 20px rgba(0,255,0,0.2),
          0 10px 30px rgba(0,0,0,0.5)
        `
      }}
    >
      {/* Screen curvature effect */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: `${curvature * 100}%`,
          transform: `perspective(1000px) rotateX(${curvature * 10}deg)`,
        }}
      >
        {/* Content */}
        <div className="relative z-10 p-4 h-full">
          {children}
        </div>

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(0,255,0,${scanlineIntensity}) 1px,
                rgba(0,255,0,${scanlineIntensity}) 2px
              )
            `,
            animation: 'scanlines 0.1s linear infinite'
          }}
        />

        {/* Chromatic aberration */}
        {chromaticAberration && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'inherit',
                filter: 'hue-rotate(120deg) brightness(0.8)',
                transform: 'translateX(-1px)',
                mixBlendMode: 'screen'
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'inherit',
                filter: 'hue-rotate(240deg) brightness(0.8)',
                transform: 'translateX(1px)',
                mixBlendMode: 'screen'
              }}
            />
          </>
        )}

        {/* Screen glare */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at 30% 20%,
                rgba(255,255,255,0.1) 0%,
                transparent 50%
              )
            `
          }}
        />

        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 60%,
                rgba(0,0,0,0.3) 100%
              )
            `
          }}
        />
      </div>

      {/* Monitor frame details */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full opacity-50" />
      <div className="absolute bottom-2 left-4 right-4 h-2 bg-gray-800 rounded-full opacity-30" />

      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

interface CRTTextProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  flicker?: boolean;
}

/**
 * CRT-styled text with green glow and optional flicker
 */
export function CRTText({
  children,
  className = "",
  glow = true,
  flicker = false
}: CRTTextProps) {
  return (
    <motion.span
      className={`
        font-mono text-green-400
        ${glow ? 'drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]' : ''}
        ${className}
      `}
      animate={flicker ? {
        opacity: [1, 0.8, 1],
        textShadow: [
          '0 0 8px rgba(0,255,0,0.8)',
          '0 0 4px rgba(0,255,0,0.4)',
          '0 0 8px rgba(0,255,0,0.8)'
        ]
      } : undefined}
      transition={{
        duration: 0.1,
        repeat: flicker ? Infinity : 0,
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.span>
  );
}

interface CRTButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

/**
 * CRT-styled button with retro appearance
 */
export function CRTButton({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md"
}: CRTButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const variantStyles = {
    default: "border-green-500 text-green-400 hover:bg-green-500/10",
    danger: "border-red-500 text-red-400 hover:bg-red-500/10",
    success: "border-blue-500 text-blue-400 hover:bg-blue-500/10"
  };

  return (
    <motion.button
      className={`
        border-2 rounded font-mono
        bg-black/50 backdrop-blur-sm
        transition-all duration-200
        hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]
        active:scale-95
        ${sizeClasses[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}