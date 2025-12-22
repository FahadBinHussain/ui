"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";

interface VelocityScrollSkewProps {
  children: ReactNode;
  /**
   * Maximum skew amount in degrees (default: 5)
   */
  maxSkew?: number;
  /**
   * Velocity multiplier for skew intensity (default: 0.1)
   */
  velocityMultiplier?: number;
  /**
   * Smoothing speed for skew interpolation (default: 0.1)
   */
  smoothSpeed?: number;
  /**
   * Enable smooth scrolling with Lenis (default: true)
   */
  enableSmoothScroll?: boolean;
  /**
   * Lenis scroll duration (default: 1.2)
   */
  lenisDuration?: number;
  /**
   * Lenis easing (default: 0.1)
   */
  lenisEasing?: number;
  /**
   * Custom class for the wrapper
   */
  className?: string;
}

/**
 * Velocity-Based Scroll Skew
 * 
 * Content skews diagonally based on scroll speed, giving the website 
 * a feeling of weight and speed like a physical object moving through space
 */
export function VelocityScrollSkew({
  children,
  maxSkew = 5,
  velocityMultiplier = 0.1,
  smoothSpeed = 0.1,
  enableSmoothScroll = true,
  lenisDuration = 1.2,
  lenisEasing = 0.1,
  className = "",
}: VelocityScrollSkewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    if (enableSmoothScroll) {
      // Initialize Lenis smooth scroll
      lenis = new Lenis({
        duration: lenisDuration,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Scroll update loop
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    // Velocity-based skew calculation
    let lastScrollY = window.scrollY;
    
    function updateSkew() {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Calculate target skew with clamping
      velocityRef.current = velocity;
      const targetSkew = Math.max(
        -maxSkew,
        Math.min(maxSkew, velocity * velocityMultiplier)
      );

      // Smooth interpolation
      skewRef.current += (targetSkew - skewRef.current) * smoothSpeed;

      // Apply skew transform
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          skewY: skewRef.current,
        });
      }

      requestAnimationFrame(updateSkew);
    }

    updateSkew();

    return () => {
      lenis?.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxSkew, velocityMultiplier, smoothSpeed, enableSmoothScroll, lenisDuration, lenisEasing]);

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Preset: Subtle skew for lightweight feel
 */
export function VelocitySkewSubtle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <VelocityScrollSkew
      maxSkew={3}
      velocityMultiplier={0.05}
      smoothSpeed={0.12}
      className={className}
    >
      {children}
    </VelocityScrollSkew>
  );
}

/**
 * Preset: Dramatic skew for bold effect
 */
export function VelocitySkewDramatic({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <VelocityScrollSkew
      maxSkew={8}
      velocityMultiplier={0.15}
      smoothSpeed={0.08}
      className={className}
    >
      {children}
    </VelocityScrollSkew>
  );
}

/**
 * Preset: Snappy skew with quick response
 */
export function VelocitySkewSnappy({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <VelocityScrollSkew
      maxSkew={6}
      velocityMultiplier={0.12}
      smoothSpeed={0.2}
      lenisDuration={0.8}
      className={className}
    >
      {children}
    </VelocityScrollSkew>
  );
}

/**
 * Individual element that skews on scroll
 * Use this for specific sections instead of entire page
 */
export function SkewScrollSection({
  children,
  maxSkew = 5,
  velocityMultiplier = 0.1,
  className = "",
}: {
  children: ReactNode;
  maxSkew?: number;
  velocityMultiplier?: number;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number;

    function updateSkew() {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Calculate target skew with clamping
      const targetSkew = Math.max(
        -maxSkew,
        Math.min(maxSkew, velocity * velocityMultiplier)
      );

      // Smooth interpolation
      skewRef.current += (targetSkew - skewRef.current) * 0.1;

      // Apply skew transform
      if (sectionRef.current) {
        gsap.set(sectionRef.current, {
          skewY: skewRef.current,
        });
      }

      rafId = requestAnimationFrame(updateSkew);
    }

    rafId = requestAnimationFrame(updateSkew);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxSkew, velocityMultiplier]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Demo content with scroll indicator
 */
export function ScrollSkewDemoContent() {
  return (
    <div className="min-h-[300vh] bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-sm font-medium text-white/90">Scroll to see the effect</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            Scroll
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              With Physics
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-8">
            Watch the content skew as you scroll, creating the feeling of weight and momentum
          </p>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/60 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto space-y-32">
          {[
            {
              title: "Feeling of Weight",
              description: "The skew effect makes the page feel like a physical object with mass, responding to your scroll velocity.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "Speed Perception",
              description: "Fast scrolling creates dramatic skew, while slow scrolling keeps the content stable and readable.",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              title: "Smooth Interpolation",
              description: "The skew smoothly returns to 0 when you stop scrolling, creating natural deceleration.",
              gradient: "from-pink-500 to-orange-500",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                {item.title}
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Works with Any Content
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Card {i + 1}</h3>
                <p className="text-white/60 text-sm">
                  The entire page skews together, creating unified motion
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End Section */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Physical Scrolling
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Go beyond standard smooth scrolling with velocity-based skew
          </p>
          <div className="text-white/40 text-sm">
            Scroll back up to see it again
          </div>
        </div>
      </section>
    </div>
  );
}
