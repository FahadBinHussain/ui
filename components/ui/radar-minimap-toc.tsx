"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

interface HeadingData {
  id: string;
  text: string;
  level: number;
  offsetTop: number;
}

interface RadarMinimapTOCProps {
  /** Container selector to scan for headings (default: "main") */
  containerSelector?: string;
  /** Position of the minimap */
  position?: "left" | "right";
  /** Width of the canvas */
  width?: number;
  /** Height of the canvas */
  height?: number;
  /** Primary color (default: cyan) */
  primaryColor?: string;
  /** Secondary color (default: purple) */
  secondaryColor?: string;
  /** Enable scanline effect */
  scanlineEffect?: boolean;
  /** Enable glitch effect on hover */
  glitchEffect?: boolean;
  /** Scroll offset for targeting */
  scrollOffset?: number;
}

export function RadarMinimapTOC({
  containerSelector = "main",
  position = "right",
  width = 280,
  height = 400,
  primaryColor = "#00ffff",
  secondaryColor = "#ff00ff",
  scanlineEffect = true,
  glitchEffect = true,
  scrollOffset = 100,
}: RadarMinimapTOCProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const scanlineOffsetRef = useRef(0);

  // Scan document for headings
  useEffect(() => {
    const scanHeadings = () => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const headingElements = container.querySelectorAll("h1, h2, h3, h4");
      const headingsData: HeadingData[] = [];

      headingElements.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        let id = heading.id;

        // Generate ID if not present
        if (!id) {
          id = `heading-${index}-${heading.textContent?.toLowerCase().replace(/\s+/g, "-")}`;
          heading.id = id;
        }

        headingsData.push({
          id,
          text: heading.textContent || "",
          level,
          offsetTop: (heading as HTMLElement).offsetTop,
        });
      });

      setHeadings(headingsData);
    };

    scanHeadings();

    // Rescan on window resize
    window.addEventListener("resize", scanHeadings);
    return () => window.removeEventListener("resize", scanHeadings);
  }, [containerSelector]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const scrollTop = window.scrollY;
      const containerTop = (container as HTMLElement).offsetTop;
      const containerHeight = (container as HTMLElement).scrollHeight;
      const viewportHeight = window.innerHeight;

      const progress =
        (scrollTop - containerTop) / (containerHeight - viewportHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerSelector]);

  // Draw radar canvas
  const drawRadar = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || headings.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid background
    ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw heading bars
    const barSpacing = height / (headings.length + 1);

    headings.forEach((heading, index) => {
      const y = barSpacing * (index + 1);
      const isHovered = hoveredIndex === index;

      // Calculate bar properties based on heading level
      const lengthMultiplier = 1 - (heading.level - 1) * 0.2;
      const barLength = (width - 40) * lengthMultiplier;
      const opacity = 1 - (heading.level - 1) * 0.2;

      // Determine color based on level
      let color = primaryColor;
      if (heading.level === 2) color = secondaryColor;
      if (heading.level === 3) color = "#ffff00";
      if (heading.level === 4) color = "#ff9900";

      // Parse color and apply opacity
      const rgb = hexToRgb(color);
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

      // Draw bar with hover effect
      const barHeight = isHovered ? 8 : 4;
      const barX = 20;

      ctx.fillRect(barX, y - barHeight / 2, barLength, barHeight);

      // Add glow effect on hover
      if (isHovered) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.fillRect(barX, y - barHeight / 2, barLength, barHeight);
        ctx.shadowBlur = 0;
      }

      // Add level indicator dots
      ctx.fillStyle = color;
      for (let i = 0; i < heading.level; i++) {
        ctx.beginPath();
        ctx.arc(10, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw viewport indicator
    const viewportY = scrollProgress * (height - 60) + 30;
    const viewportHeight = 40;

    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = primaryColor;
    ctx.strokeRect(10, viewportY, width - 20, viewportHeight);
    ctx.shadowBlur = 0;

    // Draw corner brackets
    const bracketSize = 8;
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(10, viewportY + bracketSize);
    ctx.lineTo(10, viewportY);
    ctx.lineTo(10 + bracketSize, viewportY);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - 10 - bracketSize, viewportY);
    ctx.lineTo(width - 10, viewportY);
    ctx.lineTo(width - 10, viewportY + bracketSize);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(10, viewportY + viewportHeight - bracketSize);
    ctx.lineTo(10, viewportY + viewportHeight);
    ctx.lineTo(10 + bracketSize, viewportY + viewportHeight);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - 10 - bracketSize, viewportY + viewportHeight);
    ctx.lineTo(width - 10, viewportY + viewportHeight);
    ctx.lineTo(width - 10, viewportY + viewportHeight - bracketSize);
    ctx.stroke();

    // Draw scanline effect
    if (scanlineEffect) {
      scanlineOffsetRef.current = (scanlineOffsetRef.current + 2) % height;
      ctx.strokeStyle = `rgba(0, 255, 255, 0.3)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanlineOffsetRef.current);
      ctx.lineTo(width, scanlineOffsetRef.current);
      ctx.stroke();
    }
  }, [
    headings,
    scrollProgress,
    hoveredIndex,
    width,
    height,
    primaryColor,
    secondaryColor,
    scanlineEffect,
  ]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      drawRadar();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawRadar]);

  // Handle bar click - warp to section
  const handleBarClick = (heading: HeadingData) => {
    const element = document.getElementById(heading.id);
    if (!element || isWarping) return;

    setIsWarping(true);

    // Hyperspace warp effect
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle, transparent 0%, rgba(0, 255, 255, 0.3) 50%, rgba(255, 255, 255, 1) 100%);
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
    `;
    document.body.appendChild(overlay);

    // Flash effect
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        // Scroll to element
        const targetY = element.offsetTop - scrollOffset;

        window.scrollTo({
          top: targetY,
          behavior: "auto", // Instant for hyperspace effect
        });

        // Fade out warp effect
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            overlay.remove();
            setIsWarping(false);
          },
        });
      },
    });

    // Add motion blur lines
    const lines = 30;
    for (let i = 0; i < lines; i++) {
      const line = document.createElement("div");
      const angle = (Math.PI * 2 * i) / lines;
      line.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 100vh;
        background: linear-gradient(to bottom, transparent, ${primaryColor}, transparent);
        transform-origin: center;
        transform: rotate(${angle}rad) translateY(-50%);
        opacity: 0;
        z-index: 9998;
        pointer-events: none;
      `;
      document.body.appendChild(line);

      gsap.to(line, {
        opacity: 0.8,
        duration: 0.1,
        onComplete: () => {
          gsap.to(line, {
            opacity: 0,
            scaleY: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => line.remove(),
          });
        },
      });
    }
  };

  // Handle mouse move for hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (headings.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const barSpacing = height / (headings.length + 1);
    let hoveredIdx: number | null = null;

    headings.forEach((_, index) => {
      const barY = barSpacing * (index + 1);
      if (Math.abs(y - barY) < 12) {
        hoveredIdx = index;
      }
    });

    setHoveredIndex(hoveredIdx);

    // Update text overlay
    if (hoveredIdx !== null && textOverlayRef.current) {
      const heading = headings[hoveredIdx];
      const barY = barSpacing * (hoveredIdx + 1);

      textOverlayRef.current.textContent = heading.text;
      textOverlayRef.current.style.top = `${barY}px`;
      textOverlayRef.current.style.opacity = "1";
      textOverlayRef.current.style.transform = "translateX(0)";

      // Glitch effect
      if (glitchEffect) {
        const glitchInterval = setInterval(() => {
          const offset = Math.random() * 4 - 2;
          textOverlayRef.current!.style.transform = `translateX(${offset}px)`;
        }, 50);

        setTimeout(() => clearInterval(glitchInterval), 300);
      }
    } else if (textOverlayRef.current) {
      textOverlayRef.current.style.opacity = "0";
      textOverlayRef.current.style.transform = "translateX(-20px)";
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (textOverlayRef.current) {
      textOverlayRef.current.style.opacity = "0";
      textOverlayRef.current.style.transform = "translateX(-20px)";
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredIndex !== null) {
      handleBarClick(headings[hoveredIndex]);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed top-1/2 -translate-y-1/2 z-50 ${
        position === "left" ? "left-4" : "right-4"
      }`}
      style={{ width: `${width}px` }}
    >
      {/* Title */}
      <div className="mb-2 text-center">
        <div
          className="text-xs font-mono uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          ◢ RADAR TOC ◣
        </div>
      </div>

      {/* Canvas container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-cyan-500/30 rounded-sm cursor-crosshair shadow-lg"
          style={{
            boxShadow: `0 0 20px rgba(0, 255, 255, 0.3)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCanvasClick}
        />

        {/* Text overlay */}
        <div
          ref={textOverlayRef}
          className="absolute left-full ml-4 px-3 py-2 bg-black/90 border border-cyan-500/50 rounded text-xs font-mono whitespace-nowrap pointer-events-none transition-all duration-200"
          style={{
            color: primaryColor,
            opacity: 0,
            transform: "translateX(-20px)",
            textShadow: `0 0 10px ${primaryColor}`,
          }}
        />

        {/* Scanline overlay (CSS) */}
        {scanlineEffect && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)",
            }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="mt-2 text-[10px] font-mono space-y-1 opacity-60">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-1 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
          <span style={{ color: primaryColor }}>H1</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-1 rounded-full"
            style={{ backgroundColor: secondaryColor }}
          />
          <span style={{ color: secondaryColor }}>H2</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-1 rounded-full"
            style={{ backgroundColor: "#ffff00" }}
          />
          <span style={{ color: "#ffff00" }}>H3</span>
        </div>
      </div>
    </div>
  );
}

// Utility function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 255, b: 255 };
}
