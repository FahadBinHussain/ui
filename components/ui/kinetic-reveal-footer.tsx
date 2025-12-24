"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface KineticRevealFooterProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  footerHeight?: string;
}

export function KineticRevealFooter({
  children,
  footer,
  footerHeight = "100vh",
}: KineticRevealFooterProps) {
  return (
    <div className="relative">
      {/* Main content with bottom margin to allow scroll reveal */}
      <div style={{ marginBottom: footerHeight }}>{children}</div>

      {/* Fixed footer behind content */}
      <footer
        className="fixed bottom-0 left-0 w-full overflow-hidden"
        style={{
          height: footerHeight,
          zIndex: -1,
        }}
      >
        {footer}
      </footer>
    </div>
  );
}

interface KineticFooterTypographyProps {
  children: React.ReactNode;
  className?: string;
  maxSkew?: number;
  maxScale?: number;
  velocityMultiplier?: number;
  springConfig?: {
    tension?: number;
    friction?: number;
  };
}

export function KineticFooterTypography({
  children,
  className = "",
  maxSkew = 15,
  maxScale = 1.3,
  velocityMultiplier = 0.03,
  springConfig = { tension: 120, friction: 14 },
}: KineticFooterTypographyProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    let currentVelocity = 0;
    let targetSkew = 0;
    let targetScale = 1;
    let currentSkew = 0;
    let currentScale = 1;

    const updateTransform = () => {
      if (!textRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Calculate velocity (normalized by screen height for consistency)
      currentVelocity = scrollDelta / window.innerHeight;
      velocity.current = currentVelocity;

      // Calculate target transforms based on velocity
      targetSkew = Math.max(
        -maxSkew,
        Math.min(maxSkew, currentVelocity * velocityMultiplier * 500)
      );

      // Scale increases with absolute velocity (fast scroll = stretch)
      const absVelocity = Math.abs(currentVelocity);
      targetScale = 1 + Math.min(maxScale - 1, absVelocity * velocityMultiplier * 10);

      // Spring physics interpolation for smooth motion
      const dt = 1 / 60; // Assume 60fps
      const tension = springConfig.tension || 120;
      const friction = springConfig.friction || 14;

      // Skew spring
      const skewForce = (targetSkew - currentSkew) * tension;
      const skewDamping = currentSkew * friction;
      currentSkew += (skewForce - skewDamping) * dt;

      // Scale spring
      const scaleForce = (targetScale - currentScale) * tension;
      const scaleDamping = (currentScale - 1) * friction;
      currentScale += (scaleForce - scaleDamping) * dt;

      // Apply transforms
      gsap.set(textRef.current, {
        skewX: currentSkew,
        scaleY: currentScale,
        force3D: true,
      });

      animationFrame.current = requestAnimationFrame(updateTransform);
    };

    // Start animation loop
    animationFrame.current = requestAnimationFrame(updateTransform);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [maxSkew, maxScale, velocityMultiplier, springConfig]);

  return (
    <div
      ref={textRef}
      className={`will-change-transform ${className}`}
      style={{
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}

// Pre-styled variants
export function MassiveKineticText({ children }: { children: React.ReactNode }) {
  return (
    <KineticFooterTypography
      className="text-[15vw] font-black leading-none"
      maxSkew={15}
      maxScale={1.3}
      velocityMultiplier={0.03}
    >
      {children}
    </KineticFooterTypography>
  );
}

export function SubtleKineticText({ children }: { children: React.ReactNode }) {
  return (
    <KineticFooterTypography
      className="text-[10vw] font-bold leading-tight"
      maxSkew={8}
      maxScale={1.15}
      velocityMultiplier={0.02}
    >
      {children}
    </KineticFooterTypography>
  );
}

export function DramaticKineticText({ children }: { children: React.ReactNode }) {
  return (
    <KineticFooterTypography
      className="text-[20vw] font-black leading-none"
      maxSkew={25}
      maxScale={1.5}
      velocityMultiplier={0.05}
      springConfig={{ tension: 100, friction: 12 }}
    >
      {children}
    </KineticFooterTypography>
  );
}

// Complete footer layout example
interface RevealFooterLayoutProps {
  title: string;
  subtitle?: string;
  links?: Array<{ label: string; href: string }>;
  variant?: "massive" | "subtle" | "dramatic";
  backgroundColor?: string;
  textColor?: string;
}

export function RevealFooterLayout({
  title,
  subtitle,
  links = [],
  variant = "massive",
  backgroundColor = "bg-black",
  textColor = "text-white",
}: RevealFooterLayoutProps) {
  const TextComponent =
    variant === "subtle"
      ? SubtleKineticText
      : variant === "dramatic"
      ? DramaticKineticText
      : MassiveKineticText;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${backgroundColor} ${textColor} px-8`}
    >
      <TextComponent>{title}</TextComponent>

      {subtitle && (
        <p className="mt-8 text-2xl md:text-4xl text-center opacity-70 max-w-3xl">
          {subtitle}
        </p>
      )}

      {links.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-xl md:text-2xl hover:opacity-70 transition-opacity underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
