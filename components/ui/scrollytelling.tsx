"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollytellingStep {
  /**
   * Content to display in the text panel
   */
  content: ReactNode;
  /**
   * Animation to apply to sticky element when this step is active
   */
  onEnter?: (element: HTMLElement) => void;
  /**
   * Optional custom background for this step
   */
  background?: string;
}

interface ScrollytellingProps {
  /**
   * Array of steps with content and animations
   */
  steps: ScrollytellingStep[];
  /**
   * Sticky visual element (3D model, image, video, etc.)
   */
  stickyElement: ReactNode;
  /**
   * Height multiplier for scroll area (default: 3 = 300vh)
   */
  heightMultiplier?: number;
  /**
   * Enable smooth scrub animation (default: true)
   */
  scrub?: boolean | number;
  /**
   * Custom className for container
   */
  className?: string;
  /**
   * Position of text panel: "left" | "right" | "center" (default: "right")
   */
  textPosition?: "left" | "right" | "center";
  /**
   * Background color/gradient
   */
  backgroundColor?: string;
}

/**
 * Scrollytelling / Sticky Pinning Component
 * 
 * Creates an immersive narrative where a visual element stays pinned
 * while text scrolls alongside, triggering animations.
 * 
 * @example
 * ```tsx
 * <Scrollytelling
 *   stickyElement={<YourVisual />}
 *   steps={[
 *     { content: <h2>Step 1</h2>, onEnter: (el) => gsap.to(el, { rotation: 90 }) },
 *     { content: <h2>Step 2</h2>, onEnter: (el) => gsap.to(el, { scale: 1.5 }) }
 *   ]}
 * />
 * ```
 */
export function Scrollytelling({
  steps,
  stickyElement,
  heightMultiplier = 3,
  scrub = true,
  className = "",
  textPosition = "right",
  backgroundColor = "transparent",
}: ScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const container = containerRef.current;
    const sticky = stickyRef.current;

    // Create ScrollTrigger for each step
    stepsRef.current.forEach((stepEl, index) => {
      if (!stepEl) return;

      ScrollTrigger.create({
        trigger: stepEl,
        start: "top center",
        end: "bottom center",
        scrub: scrub,
        onEnter: () => {
          if (steps[index].onEnter && sticky) {
            steps[index].onEnter!(sticky);
          }
        },
        onEnterBack: () => {
          if (steps[index].onEnter && sticky) {
            steps[index].onEnter!(sticky);
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [steps, scrub]);

  const getLayoutClass = () => {
    switch (textPosition) {
      case "left":
        return "flex-row-reverse";
      case "center":
        return "flex-col";
      default:
        return "flex-row";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        minHeight: textPosition === "center" ? `${(steps.length + 1) * 100}vh` : `${heightMultiplier * 100}vh`,
        backgroundColor,
      }}
    >
      {textPosition === "center" ? (
        /* Center Layout: Sticky background with overlaid text */
        <>
          {/* Sticky Visual Background */}
          <div className="w-full h-screen sticky top-0 z-0">
            <div ref={stickyRef} className="w-full h-full flex items-center justify-center">
              {stickyElement}
            </div>
          </div>

          {/* Centered Text Steps (absolute positioned to overlay) */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className="h-screen flex items-center justify-center pointer-events-auto flex-shrink-0"
                style={{
                  background: step.background || "transparent",
                }}
              >
                <div className="max-w-2xl px-8">{step.content}</div>
              </div>
            ))}
            {/* Extra space at the end */}
            <div className="h-screen flex-shrink-0"></div>
          </div>
        </>
      ) : (
        /* Side-by-Side Layout */
        <div className={`flex ${getLayoutClass()} gap-8 relative`}>
          {/* Sticky Visual Element */}
          <div className="w-1/2 h-screen flex items-center justify-center sticky top-0">
            <div ref={stickyRef} className="w-full h-full flex items-center justify-center">
              {stickyElement}
            </div>
          </div>

          {/* Text Steps */}
          <div className="w-1/2 flex flex-col justify-around py-20">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el;
                }}
                className="min-h-screen flex items-center justify-center"
                style={{
                  background: step.background || "transparent",
                }}
              >
                <div className="max-w-lg px-8">{step.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Preset: Apple-style Product Scrollytelling
 * 
 * Centered text with full-screen sticky visual
 */
export function ScrollytellingApple({
  steps,
  stickyElement,
  className = "",
}: {
  steps: ScrollytellingStep[];
  stickyElement: ReactNode;
  className?: string;
}) {
  return (
    <Scrollytelling
      steps={steps}
      stickyElement={stickyElement}
      heightMultiplier={steps.length}
      textPosition="center"
      backgroundColor="black"
      className={className}
    />
  );
}

/**
 * Preset: Side-by-Side Narrative
 * 
 * Text on right, visual pinned on left
 */
export function ScrollytellingSideBySide({
  steps,
  stickyElement,
  textPosition = "right",
  className = "",
}: {
  steps: ScrollytellingStep[];
  stickyElement: ReactNode;
  textPosition?: "left" | "right";
  className?: string;
}) {
  return (
    <Scrollytelling
      steps={steps}
      stickyElement={stickyElement}
      heightMultiplier={steps.length + 1}
      textPosition={textPosition}
      scrub={1}
      className={className}
    />
  );
}

/**
 * Helper: Create step with fade-in animation
 */
export function createFadeStep(content: ReactNode, duration: number = 0.5): ScrollytellingStep {
  return {
    content,
    onEnter: (el) => {
      gsap.fromTo(
        el,
        { opacity: 0.3 },
        { opacity: 1, duration, ease: "power2.out" }
      );
    },
  };
}

/**
 * Helper: Create step with rotation animation
 */
export function createRotateStep(
  content: ReactNode,
  rotation: number,
  duration: number = 1
): ScrollytellingStep {
  return {
    content,
    onEnter: (el) => {
      gsap.to(el, { rotation, duration, ease: "power2.inOut" });
    },
  };
}

/**
 * Helper: Create step with scale animation
 */
export function createScaleStep(
  content: ReactNode,
  scale: number,
  duration: number = 1
): ScrollytellingStep {
  return {
    content,
    onEnter: (el) => {
      gsap.to(el, { scale, duration, ease: "back.out(1.2)" });
    },
  };
}

/**
 * Helper: Create step with 3D transform
 */
export function create3DStep(
  content: ReactNode,
  rotateX: number,
  rotateY: number,
  rotateZ: number = 0,
  duration: number = 1
): ScrollytellingStep {
  return {
    content,
    onEnter: (el) => {
      gsap.to(el, {
        rotateX,
        rotateY,
        rotateZ,
        duration,
        ease: "power2.inOut",
        transformPerspective: 1000,
      });
    },
  };
}

/**
 * Helper: Create step with color change
 */
export function createColorStep(
  content: ReactNode,
  backgroundColor: string,
  duration: number = 0.8
): ScrollytellingStep {
  return {
    content,
    background: backgroundColor,
    onEnter: (el) => {
      gsap.to(el, { backgroundColor, duration, ease: "power2.out" });
    },
  };
}

/**
 * Preset: Product Feature Reveal
 * 
 * Optimized for product pages with feature highlights
 */
export function ScrollytellingProduct({
  features,
  productVisual,
  className = "",
}: {
  features: Array<{
    title: string;
    description: string;
    color?: string;
  }>;
  productVisual: ReactNode;
  className?: string;
}) {
  const steps = features.map((feature, index) =>
    createScaleStep(
      <div className="text-center px-8">
        <h2
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ color: feature.color || "white" }}
        >
          {feature.title}
        </h2>
        <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
          {feature.description}
        </p>
      </div>,
      1 + index * 0.1
    )
  );

  return (
    <ScrollytellingApple
      steps={steps}
      stickyElement={productVisual}
      className={className}
    />
  );
}

/**
 * Preset: 3D Model Rotation Story
 * 
 * Rotates 3D model as user scrolls through narrative
 */
export function Scrollytelling3DRotation({
  steps,
  model3D,
  rotationPerStep = 45,
  className = "",
}: {
  steps: Array<{ title: string; description: string }>;
  model3D: ReactNode;
  rotationPerStep?: number;
  className?: string;
}) {
  const animatedSteps = steps.map((step, index) =>
    createRotateStep(
      <div className="text-white text-center px-8">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">{step.title}</h2>
        <p className="text-lg md:text-xl text-white/60">{step.description}</p>
      </div>,
      index * rotationPerStep
    )
  );

  return (
    <ScrollytellingSideBySide
      steps={animatedSteps}
      stickyElement={model3D}
      textPosition="right"
      className={className}
    />
  );
}
