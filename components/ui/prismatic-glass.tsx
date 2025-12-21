"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PrismaticGlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  blurAmount?: number;
}

export const PrismaticGlass: React.FC<PrismaticGlassProps> = ({
  children,
  className = "",
  intensity = 5,
  blurAmount = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Red channel */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          transform: `translate(${mousePos.x * intensity}px, ${mousePos.y * intensity}px)`,
          filter: `blur(${blurAmount}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(255, 0, 0, 0.3)",
          }}
        >
          {children}
        </div>
      </div>

      {/* Green channel */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          filter: `blur(${blurAmount}px)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0, 255, 0, 0.3)",
          }}
        >
          {children}
        </div>
      </div>

      {/* Blue channel */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          transform: `translate(${-mousePos.x * intensity}px, ${-mousePos.y * intensity}px)`,
          filter: `blur(${blurAmount}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0, 0, 255, 0.3)",
          }}
        >
          {children}
        </div>
      </div>

      {/* Main content with backdrop blur */}
      <div
        className="relative z-10"
        style={{
          backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Card variant with glassmorphism
interface PrismaticCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export const PrismaticCard: React.FC<PrismaticCardProps> = ({
  children,
  className = "",
  intensity = 3,
  glowColor = "rgba(147, 51, 234, 0.5)",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/20 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chromatic aberration layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Red channel */}
        <motion.div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          animate={{
            x: isHovered ? mousePos.x * intensity : 0,
            y: isHovered ? mousePos.y * intensity : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255, 0, 0, 0.5)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>

        {/* Blue channel */}
        <motion.div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          animate={{
            x: isHovered ? -mousePos.x * intensity : 0,
            y: isHovered ? -mousePos.y * intensity : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 255, 0.5)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      </div>

      {/* Glass layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          boxShadow: `0 0 60px ${glowColor}`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  );
};

// SVG Filter approach
interface SVGPrismaticProps {
  children: React.ReactNode;
  className?: string;
  offsetAmount?: number;
}

export const SVGPrismatic: React.FC<SVGPrismaticProps> = ({
  children,
  className = "",
  offsetAmount = 5,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * offsetAmount;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * offsetAmount;

    setMousePos({ x, y });
  };

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="chromatic-aberration">
            <feComponentTransfer in="SourceGraphic" result="red">
              <feFuncR type="identity" />
              <feFuncG type="discrete" tableValues="0" />
              <feFuncB type="discrete" tableValues="0" />
            </feComponentTransfer>

            <feComponentTransfer in="SourceGraphic" result="green">
              <feFuncR type="discrete" tableValues="0" />
              <feFuncG type="identity" />
              <feFuncB type="discrete" tableValues="0" />
            </feComponentTransfer>

            <feComponentTransfer in="SourceGraphic" result="blue">
              <feFuncR type="discrete" tableValues="0" />
              <feFuncG type="discrete" tableValues="0" />
              <feFuncB type="identity" />
            </feComponentTransfer>

            <feOffset in="red" dx="-2" dy="0" result="redShift" />
            <feOffset in="blue" dx="2" dy="0" result="blueShift" />

            <feBlend in="redShift" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueShift" mode="screen" result="rgb" />

            <feGaussianBlur in="rgb" stdDeviation="1" result="blur" />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className={`relative ${className}`}
        onMouseMove={handleMouseMove}
        style={{
          filter: "url(#chromatic-aberration)",
        }}
      >
        {children}
      </div>
    </>
  );
};

// Prism effect with rainbow dispersion
interface PrismEffectProps {
  children: React.ReactNode;
  className?: string;
}

export const PrismEffect: React.FC<PrismEffectProps> = ({
  children,
  className = "",
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Rainbow gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-color-dodge"
        style={{
          background: `radial-gradient(
            circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(255, 0, 0, 0.8) 0%,
            rgba(255, 127, 0, 0.6) 10%,
            rgba(255, 255, 0, 0.5) 20%,
            rgba(0, 255, 0, 0.4) 30%,
            rgba(0, 0, 255, 0.3) 40%,
            rgba(75, 0, 130, 0.2) 50%,
            rgba(148, 0, 211, 0.1) 60%,
            transparent 70%
          )`,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Glass layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px) saturate(200%)",
          WebkitBackdropFilter: "blur(20px) saturate(200%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
