"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface MagneticPaginationProps {
  /** Total number of pages */
  totalPages: number;
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Primary color */
  primaryColor?: string;
  /** Secondary color */
  secondaryColor?: string;
  /** Magnetic radius in pixels */
  magneticRadius?: number;
  /** Magnetic strength (0-1) */
  magneticStrength?: number;
}

export function MagneticPagination({
  totalPages,
  currentPage,
  onPageChange,
  primaryColor = "#00ffff",
  secondaryColor = "#ff00ff",
  magneticRadius = 100,
  magneticStrength = 0.3,
}: MagneticPaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply magnetic effect
  useEffect(() => {
    const applyMagnetic = () => {
      numbersRef.current.forEach((number, index) => {
        if (!number) return;

        const rect = number.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mousePos.x - centerX;
        const deltaY = mousePos.y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < magneticRadius) {
          // Apply magnetic force
          const force = 1 - distance / magneticRadius;
          const moveX = deltaX * magneticStrength * force;
          const moveY = deltaY * magneticStrength * force;

          gsap.to(number, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Return to original position
          gsap.to(number, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });

      animationFrameRef.current = requestAnimationFrame(applyMagnetic);
    };

    applyMagnetic();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, magneticRadius, magneticStrength]);

  // Position ring on active page
  useEffect(() => {
    if (!ringRef.current || !numbersRef.current[currentPage - 1]) return;

    const targetNumber = numbersRef.current[currentPage - 1];
    if (!targetNumber) return;

    const ring = ringRef.current;
    const targetRect = targetNumber.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    const targetX = targetRect.left + targetRect.width / 2 - containerRect.left;
    const targetY = targetRect.top + targetRect.height / 2 - containerRect.top;

    if (isTransitioning) {
      // Get current ring position
      const currentRect = ring.getBoundingClientRect();
      const currentX = currentRect.left + currentRect.width / 2 - containerRect.left;
      const currentY = currentRect.top + currentRect.height / 2 - containerRect.top;

      // Calculate velocity for squash and stretch
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);

      // Animate with squash and stretch
      const timeline = gsap.timeline({
        onComplete: () => setIsTransitioning(false),
      });

      // Stretch phase (oval shape)
      timeline.to(ring, {
        left: targetX,
        top: targetY,
        scaleX: 1 + distance / 200, // Stretch horizontally based on distance
        scaleY: 0.7, // Compress vertically
        rotation: (angle * 180) / Math.PI,
        duration: 0.4,
        ease: "power2.in",
      });

      // Squash and snap phase (return to circle)
      timeline.to(ring, {
        scaleX: 0.8,
        scaleY: 1.2,
        duration: 0.15,
        ease: "power2.out",
      });

      // Return to perfect circle
      timeline.to(ring, {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
      });
    } else {
      // Initial positioning (no animation)
      gsap.set(ring, {
        left: targetX,
        top: targetY,
      });
    }
  }, [currentPage, isTransitioning]);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setIsTransitioning(true);
    onPageChange(page);
  };

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center gap-4 p-8"
    >
      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <div
          key={page}
          ref={(el) => {
            numbersRef.current[index] = el;
          }}
          className="relative cursor-pointer select-none"
          onClick={() => handlePageChange(page)}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-colors duration-300 ${
              page === currentPage
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              background:
                page === currentPage
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(10px)",
            }}
          >
            {page}
          </div>
        </div>
      ))}

      {/* Orbiting ring (active indicator) */}
      <div
        ref={ringRef}
        className="absolute pointer-events-none"
        style={{
          width: "56px",
          height: "56px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="animate-spin-slow"
          style={{ animationDuration: "3s" }}
        >
          <defs>
            <linearGradient
              id="ringGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <stop offset="50%" stopColor={secondaryColor} stopOpacity="1" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="1" />
            </linearGradient>
            <filter id="ringGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="1.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer glow ring */}
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            opacity="0.3"
            filter="url(#ringGlow)"
          />

          {/* Main ring */}
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="3"
            strokeDasharray="150 150"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 28 28"
              to="360 28 28"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Orbiting particles */}
          <circle cx="28" cy="4" r="2" fill={primaryColor} opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 28 28"
              to="360 28 28"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="28" cy="52" r="2" fill={secondaryColor} opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="180 28 28"
              to="540 28 28"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Inner pulse ring */}
          <circle
            cx="28"
            cy="28"
            r="20"
            fill="none"
            stroke={primaryColor}
            strokeWidth="1"
            opacity="0.5"
          >
            <animate
              attributeName="r"
              values="20;22;20"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.2;0.5"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Previous/Next buttons */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${primaryColor}40`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5l-7 7 7 7" />
        </svg>
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${primaryColor}40`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
