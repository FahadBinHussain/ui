"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite Marquee component with smooth scrolling animation
 * Perfect for logos, testimonials, or any repeating content
 */
export function Marquee({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  className = ""
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate animation duration based on content width and speed
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    // Estimate duration based on speed (pixels per second)
    // This is approximate and will be adjusted by the actual content
    setDuration(100 / speed);
  }, [speed]);

  const marqueeVariants = {
    animate: {
      x: direction === "left" ? "-50%" : "50%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: duration,
          ease: "linear" as const,
        },
      },
    },
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      <motion.div
        className="flex items-center whitespace-nowrap h-full"
        variants={marqueeVariants}
        animate={isHovered ? undefined : "animate"}
        style={{ width: "200%" }} // Duplicate content width
      >
        {/* First set of content */}
        <div className="flex items-center gap-8 px-4 flex-shrink-0">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-8 px-4 flex-shrink-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

interface MarqueeItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper for individual marquee items
 */
export function MarqueeItem({ children, className = "" }: MarqueeItemProps) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
}