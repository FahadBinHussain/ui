"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SpotlightRevealProps {
  children?: React.ReactNode;
  backgroundImage?: string;
  spotlightSize?: number;
  darkOverlay?: string;
  className?: string;
  transitionSpeed?: number;
}

export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({
  children,
  backgroundImage = "/api/placeholder/1920/1080",
  spotlightSize = 150,
  darkOverlay = "rgba(0, 0, 0, 0.95)",
  className = "",
  transitionSpeed = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [mousePixels, setMousePixels] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    setMousePixels({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "none" }}
    >
      {/* Full Color Bottom Layer */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Full color content"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
            {children}
          </div>
        )}
      </div>

      {/* Dark Overlay with Spotlight Mask */}
      <div
        className="absolute inset-0 transition-all pointer-events-none"
        style={{
          background: darkOverlay,
          maskImage: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, black 100%)`,
          transition: `mask-position ${transitionSpeed}s ease-out`,
        }}
      />

      {/* Content Layer (visible in spotlight) */}
      {children && (
        <div className="relative z-10 pointer-events-none">
          {children}
        </div>
      )}

      {/* Custom Cursor - Flashlight */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePixels.x,
            top: mousePixels.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div
              className="absolute rounded-full border-4 border-yellow-400/50"
              style={{
                width: spotlightSize * 2,
                height: spotlightSize * 2,
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
              }}
            />
            <div className="text-4xl">🔦</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wireframe variant
interface WireframeRevealProps {
  children?: React.ReactNode;
  spotlightSize?: number;
  wireframeColor?: string;
  revealColor?: string;
  className?: string;
}

export const WireframeReveal: React.FC<WireframeRevealProps> = ({
  children,
  spotlightSize = 200,
  wireframeColor = "#00ff00",
  revealColor = "#ffffff",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [mousePixels, setMousePixels] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
    setMousePixels({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "none" }}
    >
      {/* Full Color Bottom Layer */}
      <div className="absolute inset-0">
        {children}
      </div>

      {/* Wireframe Overlay with Spotlight Hole */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 19px, " + wireframeColor + " 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, " + wireframeColor + " 20px), #000",
          maskImage: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`,
        }}
      />

      {/* Flashlight Cursor */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePixels.x,
            top: mousePixels.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="rounded-full border-2"
            style={{
              width: spotlightSize * 2,
              height: spotlightSize * 2,
              borderColor: wireframeColor,
              boxShadow: `0 0 20px ${wireframeColor}`,
            }}
          />
        </div>
      )}
    </div>
  );
};

// Text Reveal variant
interface TextRevealProps {
  text: string;
  revealedText?: string;
  spotlightSize?: number;
  fontSize?: string;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  revealedText,
  spotlightSize = 100,
  fontSize = "4rem",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [mousePixels, setMousePixels] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
    setMousePixels({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "none" }}
    >
      {/* Hidden/Dark Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="font-bold text-gray-800"
          style={{ fontSize }}
        >
          {text}
        </h1>
      </div>

      {/* Revealed Text with Spotlight Mask */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${spotlightSize}px at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent 100%)`,
        }}
      >
        <h1
          className="font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          style={{ fontSize }}
        >
          {revealedText || text}
        </h1>
      </div>

      {/* Torch Cursor */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50 text-3xl"
          style={{
            left: mousePixels.x,
            top: mousePixels.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          🔦
        </div>
      )}
    </div>
  );
};
