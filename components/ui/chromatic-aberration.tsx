"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ChromaticAberrationProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
  trigger?: "hover" | "scroll" | "mouse" | "always";
}

export const ChromaticAberration: React.FC<ChromaticAberrationProps> = ({
  children,
  intensity = 3,
  className,
  trigger = "hover",
}) => {
  const [offset, setOffset] = useState(trigger === "always" ? intensity : 0);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Scroll-based chromatic aberration
  useEffect(() => {
    if (trigger !== "scroll") return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const velocity = Math.abs(currentScroll - lastScrollRef.current);
      scrollVelocityRef.current = velocity;
      lastScrollRef.current = currentScroll;

      const newOffset = Math.min(velocity / 20, intensity);
      setOffset(newOffset);

      // Decay
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const decay = () => {
        scrollVelocityRef.current *= 0.9;
        const decayedOffset = Math.min(scrollVelocityRef.current / 20, intensity);
        setOffset(decayedOffset);

        if (scrollVelocityRef.current > 0.1) {
          animationRef.current = requestAnimationFrame(decay);
        } else {
          setOffset(0);
        }
      };

      setTimeout(() => {
        animationRef.current = requestAnimationFrame(decay);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, intensity]);

  // Mouse-based chromatic aberration
  useEffect(() => {
    if (trigger !== "mouse") return;

    const handleMouseMove = (e: MouseEvent) => {
      const velocityX = e.clientX - lastMouseRef.current.x;
      const velocityY = e.clientY - lastMouseRef.current.y;
      const speed = Math.sqrt(velocityX ** 2 + velocityY ** 2);

      mouseVelocityRef.current = { x: velocityX, y: velocityY };
      lastMouseRef.current = { x: e.clientX, y: e.clientY };

      const newOffset = Math.min(speed / 10, intensity);
      setOffset(newOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Decay loop
    const decayLoop = () => {
      setOffset((prev) => {
        const decayed = prev * 0.95;
        return decayed > 0.1 ? decayed : 0;
      });
      animationRef.current = requestAnimationFrame(decayLoop);
    };
    animationRef.current = requestAnimationFrame(decayLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, intensity]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      setOffset(intensity);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setOffset(0);
    }
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: "transform",
      }}
    >
      {/* Red channel */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${offset}px, 0)`,
          mixBlendMode: "screen",
          transition: trigger === "hover" ? "transform 0.2s ease-out" : "none",
        }}
      >
        <div style={{ filter: "brightness(0) saturate(100%) invert(30%) sepia(99%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(123%)", opacity: 0.8 }}>
          {children}
        </div>
      </div>

      {/* Green channel (original position) */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Blue channel */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${-offset}px, 0)`,
          mixBlendMode: "screen",
          transition: trigger === "hover" ? "transform 0.2s ease-out" : "none",
        }}
      >
        <div style={{ filter: "brightness(0) saturate(100%) invert(29%) sepia(99%) saturate(4587%) hue-rotate(217deg) brightness(101%) contrast(147%)", opacity: 0.8 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const ChromaticText: React.FC<{
  text: string;
  className?: string;
  intensity?: number;
  trigger?: "hover" | "scroll" | "mouse" | "always";
}> = ({ text, className, intensity = 3, trigger = "hover" }) => {
  return (
    <ChromaticAberration intensity={intensity} trigger={trigger} className={className}>
      <span className="text-white font-bold text-6xl tracking-tight">{text}</span>
    </ChromaticAberration>
  );
};
