"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface FluidScrollProgressProps {
  /** Position on the screen */
  position?: "left" | "right";
  /** Width of the progress bar */
  width?: number;
  /** Height of the progress bar */
  height?: number;
  /** Color of the liquid fill */
  fillColor?: string;
  /** Background color of the tube */
  backgroundColor?: string;
  /** Container selector to track scrolling */
  containerSelector?: string;
  /** Section markers (0-1 values) */
  sectionMarkers?: number[];
}

export function FluidScrollProgress({
  position = "right",
  width = 40,
  height = 400,
  fillColor = "#00ffff",
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  containerSelector = "body",
  sectionMarkers = [0.2, 0.4, 0.6, 0.8],
}: FluidScrollProgressProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const surfaceRippleRef = useRef(0);
  const bulgeStatesRef = useRef<Map<number, number>>(new Map());

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const element = container === document.body ? document.documentElement : container;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));

      // Calculate velocity
      const velocity = (scrollTop - lastScrollRef.current) / 16; // Normalized per frame
      setScrollVelocity(velocity);
      lastScrollRef.current = scrollTop;

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.querySelector(containerSelector)?.addEventListener("scroll", handleScroll, { passive: true } as any);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.querySelector(containerSelector)?.removeEventListener("scroll", handleScroll);
    };
  }, [containerSelector]);

  // Animate liquid surface and bulges
  useEffect(() => {
    const animate = () => {
      // Dampen velocity over time
      setScrollVelocity((v) => v * 0.9);

      // Calculate ripple based on velocity
      surfaceRippleRef.current += scrollVelocity * 0.5;
      surfaceRippleRef.current *= 0.85; // Damping

      // Update bulge states (decay over time)
      bulgeStatesRef.current.forEach((value, key) => {
        const newValue = value * 0.9; // Decay
        if (newValue < 0.01) {
          bulgeStatesRef.current.delete(key);
        } else {
          bulgeStatesRef.current.set(key, newValue);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollVelocity]);

  // Trigger bulge when passing section markers
  useEffect(() => {
    sectionMarkers.forEach((marker, index) => {
      const distance = Math.abs(scrollProgress - marker);
      if (distance < 0.02) {
        // Within range of marker
        const currentBulge = bulgeStatesRef.current.get(index) || 0;
        if (currentBulge < 0.5) {
          // Trigger bulge
          bulgeStatesRef.current.set(index, 1);
        }
      }
    });
  }, [scrollProgress, sectionMarkers]);

  // Generate liquid path with ripples and bulges
  const generateLiquidPath = () => {
    const tubeWidth = width * 0.6;
    const centerX = width / 2;
    const fillHeight = height * scrollProgress;

    // Start from bottom
    let path = `M ${centerX - tubeWidth / 2} ${height}`;
    path += ` L ${centerX - tubeWidth / 2} ${height - fillHeight}`;

    // Top surface with ripples
    const surfaceY = height - fillHeight;
    const rippleAmplitude = Math.abs(surfaceRippleRef.current) * 2;
    const ripplePoints = 5;

    for (let i = 0; i <= ripplePoints; i++) {
      const t = i / ripplePoints;
      const x = centerX - tubeWidth / 2 + t * tubeWidth;
      const ripple = Math.sin(t * Math.PI * 2 + Date.now() * 0.005) * rippleAmplitude;
      const y = surfaceY + ripple;

      if (i === 0) {
        path += ` L ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }

    // Right side down with bulges
    path += ` L ${centerX + tubeWidth / 2} ${height}`;
    path += ` Z`;

    return path;
  };

  // Generate tube path with bulges at section markers
  const generateTubePath = () => {
    const tubeWidth = width * 0.6;
    const centerX = width / 2;
    const segments = 50;
    let leftPath = "";
    let rightPath = "";

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = height * t;

      // Check for bulges at section markers
      let bulge = 0;
      sectionMarkers.forEach((marker, index) => {
        const markerY = height * (1 - marker);
        const distance = Math.abs(y - markerY);
        const bulgeStrength = bulgeStatesRef.current.get(index) || 0;

        if (distance < 20) {
          // Within bulge range
          const factor = 1 - distance / 20;
          bulge += factor * bulgeStrength * 8;
        }
      });

      // Also add slight bulge when liquid passes through
      const liquidY = height * (1 - scrollProgress);
      const liquidDistance = Math.abs(y - liquidY);
      if (liquidDistance < 15) {
        const factor = 1 - liquidDistance / 15;
        bulge += factor * Math.abs(scrollVelocity) * 2;
      }

      const leftX = centerX - tubeWidth / 2 - bulge;
      const rightX = centerX + tubeWidth / 2 + bulge;

      if (i === 0) {
        leftPath = `M ${leftX} ${y}`;
        rightPath = `M ${rightX} ${y}`;
      } else {
        leftPath += ` L ${leftX} ${y}`;
        rightPath += ` L ${rightX} ${y}`;
      }
    }

    return { leftPath, rightPath };
  };

  const liquidPath = generateLiquidPath();
  const { leftPath, rightPath } = generateTubePath();

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-40 ${
        position === "left" ? "left-6" : "right-6"
      }`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Tube background */}
        <path
          d={leftPath}
          stroke={backgroundColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={rightPath}
          stroke={backgroundColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Section marker dots */}
        {sectionMarkers.map((marker, index) => {
          const markerY = height * (1 - marker);
          const markerX = width / 2;
          const isPassed = scrollProgress >= marker;
          const bulgeStrength = bulgeStatesRef.current.get(index) || 0;
          const scale = 1 + bulgeStrength * 0.5;

          return (
            <g key={index}>
              {/* Outer glow */}
              <circle
                cx={markerX}
                cy={markerY}
                r={6 * scale}
                fill={isPassed ? fillColor : backgroundColor}
                opacity={isPassed ? 0.3 : 0.1}
                filter="blur(4px)"
              />
              {/* Main dot */}
              <circle
                cx={markerX}
                cy={markerY}
                r={3 * scale}
                fill={isPassed ? fillColor : backgroundColor}
                stroke={fillColor}
                strokeWidth={isPassed ? 2 : 1}
                opacity={isPassed ? 1 : 0.3}
              />
            </g>
          );
        })}

        {/* Liquid fill */}
        <path
          d={liquidPath}
          fill={fillColor}
          opacity={0.8}
          filter="url(#liquidGlow)"
        />

        {/* Top surface highlight */}
        <line
          x1={width / 2 - (width * 0.6) / 2}
          y1={height * (1 - scrollProgress)}
          x2={width / 2 + (width * 0.6) / 2}
          y2={height * (1 - scrollProgress)}
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={scrollProgress > 0.01 ? 1 : 0}
        />

        {/* Gradient and glow definitions */}
        <defs>
          <filter id="liquidGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.8" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Progress percentage */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-xs font-mono font-bold"
        style={{
          top: `${height * (1 - scrollProgress) - 30}px`,
          color: fillColor,
          textShadow: `0 0 10px ${fillColor}`,
          opacity: scrollProgress > 0.01 ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
}
