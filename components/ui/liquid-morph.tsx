"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LiquidMorphProps {
  className?: string;
  size?: number;
  speed?: number;
  colors?: string[];
  shapes?: string[];
}

/**
 * Liquid Morphing Shapes - Organic fluid shapes that morph between different forms
 * Perfect for loading states, backgrounds, and interactive elements
 */
export function LiquidMorph({
  className = "",
  size = 200,
  speed = 3,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4"],
  shapes = [
    "M50,10 Q90,10 90,50 Q90,90 50,90 Q10,90 10,50 Q10,10 50,10 Z", // Circle-like
    "M20,20 L80,20 L90,50 L80,80 L20,80 L10,50 Z", // Hexagon
    "M50,10 L90,40 L70,90 L30,90 L10,40 Z", // Pentagon
    "M30,10 Q70,10 90,30 Q90,70 50,90 Q10,70 10,30 Q30,10 30,10 Z", // Organic blob
  ]
}: LiquidMorphProps) {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
      setCurrentColor((prev) => (prev + 1) % colors.length);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [shapes.length, colors.length, speed]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[currentColor]} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors[(currentColor + 1) % colors.length]} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors[(currentColor + 2) % colors.length]} stopOpacity="0.8" />
          </linearGradient>

          <filter id="liquidGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={shapes[currentShape]}
          fill="url(#liquidGradient)"
          filter="url(#liquidGlow)"
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{
            scale: [0.8, 1.1, 0.9, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: speed,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        />

        {/* Inner highlight */}
        <motion.circle
          cx="30"
          cy="30"
          r="8"
          fill="rgba(255,255,255,0.3)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0.8, 1] }}
          transition={{
            duration: speed,
            delay: speed * 0.2,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}

interface MorphingBlobProps {
  className?: string;
  size?: number;
  intensity?: "gentle" | "medium" | "intense";
  color?: string;
}

/**
 * Single morphing blob with customizable intensity
 */
export function MorphingBlob({
  className = "",
  size = 150,
  intensity = "medium",
  color = "#3b82f6"
}: MorphingBlobProps) {
  const intensitySettings = {
    gentle: { scale: [1, 1.05, 0.95, 1], duration: 4 },
    medium: { scale: [1, 1.15, 0.85, 1], duration: 3 },
    intense: { scale: [1, 1.25, 0.75, 1], duration: 2 },
  };

  const settings = intensitySettings[intensity];

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      animate={{
        scale: settings.scale,
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: settings.duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <motion.path
          d="M50,10 Q80,10 90,40 Q90,70 60,90 Q30,90 10,60 Q10,30 40,10 Q50,10 50,10 Z"
          fill={color}
          opacity={0.8}
          animate={{
            d: [
              "M50,10 Q80,10 90,40 Q90,70 60,90 Q30,90 10,60 Q10,30 40,10 Q50,10 50,10 Z",
              "M50,15 Q75,5 95,35 Q95,65 70,95 Q25,95 5,65 Q5,35 25,5 Q50,15 50,15 Z",
              "M50,10 Q85,15 85,50 Q85,85 50,90 Q15,85 15,50 Q15,15 50,10 Z",
              "M50,10 Q80,10 90,40 Q90,70 60,90 Q30,90 10,60 Q10,30 40,10 Q50,10 50,10 Z",
            ],
          }}
          transition={{
            duration: settings.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const,
          }}
        />
      </svg>
    </motion.div>
  );
}

interface LiquidBackgroundProps {
  className?: string;
  blobCount?: number;
  colors?: string[];
}

/**
 * Animated liquid background with multiple morphing blobs
 */
export function LiquidBackground({
  className = "",
  blobCount = 5,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
}: LiquidBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: blobCount }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const,
            delay: Math.random() * 2,
          }}
        >
          <MorphingBlob
            size={80 + Math.random() * 40}
            intensity={["gentle", "medium", "intense"][Math.floor(Math.random() * 3)] as any}
            color={colors[Math.floor(Math.random() * colors.length)]}
          />
        </motion.div>
      ))}
    </div>
  );
}