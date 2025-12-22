"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

interface DirectionAwareCardProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  animationDuration?: number;
  ease?: string;
}

export const DirectionAwareCard: React.FC<DirectionAwareCardProps> = ({
  children,
  overlay,
  className = "",
  overlayClassName = "",
  animationDuration = 0.3,
  ease = "power2.out",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const getDirection = (e: React.MouseEvent<HTMLDivElement>, element: HTMLDivElement) => {
    // Get bounding rectangle
    const rect = element.getBoundingClientRect();
    
    // Calculate center point
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    // Calculate angle in radians
    const angle = Math.atan2(y, x);
    
    // Convert to degrees
    const degree = angle * (180 / Math.PI);
    
    // Map to direction (0 = top, 1 = right, 2 = bottom, 3 = left)
    // Adjust ranges to match our needs:
    // -45 to 45: right
    // 45 to 135: bottom
    // 135 to -135 (or 135 to 225): left
    // -135 to -45 (or 225 to 315): top
    
    if (degree > -45 && degree <= 45) {
      return 1; // right
    } else if (degree > 45 && degree <= 135) {
      return 2; // bottom
    } else if (degree > 135 || degree <= -135) {
      return 3; // left
    } else {
      return 0; // top
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    
    if (!card || !overlay) return;
    
    const direction = getDirection(e, card);
    setIsHovered(true);
    
    // Set initial position based on direction
    let fromX = 0;
    let fromY = 0;
    
    switch (direction) {
      case 0: // top
        fromY = -100;
        break;
      case 1: // right
        fromX = 100;
        break;
      case 2: // bottom
        fromY = 100;
        break;
      case 3: // left
        fromX = -100;
        break;
    }
    
    // Set initial position
    gsap.set(overlay, {
      x: `${fromX}%`,
      y: `${fromY}%`,
      opacity: 0,
    });
    
    // Animate to center
    gsap.to(overlay, {
      x: "0%",
      y: "0%",
      opacity: 1,
      duration: animationDuration,
      ease: ease,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    
    if (!card || !overlay) return;
    
    const direction = getDirection(e, card);
    setIsHovered(false);
    
    // Set exit position based on direction
    let toX = 0;
    let toY = 0;
    
    switch (direction) {
      case 0: // top
        toY = -100;
        break;
      case 1: // right
        toX = 100;
        break;
      case 2: // bottom
        toY = 100;
        break;
      case 3: // left
        toX = -100;
        break;
    }
    
    // Animate out
    gsap.to(overlay, {
      x: `${toX}%`,
      y: `${toY}%`,
      opacity: 0,
      duration: animationDuration,
      ease: ease,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content */}
      {children}
      
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 opacity-0 pointer-events-none ${overlayClassName}`}
      >
        {overlay}
      </div>
    </div>
  );
};

// Pre-styled variant with gradient overlay
interface DirectionAwareImageCardProps {
  image: string;
  title: string;
  description?: string;
  tag?: string;
  className?: string;
}

export const DirectionAwareImageCard: React.FC<DirectionAwareImageCardProps> = ({
  image,
  title,
  description,
  tag,
  className = "",
}) => {
  return (
    <DirectionAwareCard
      className={`group cursor-pointer aspect-[4/3] ${className}`}
      overlayClassName="bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end"
      animationDuration={0.4}
      overlay={
        <div className="p-6 w-full">
          {tag && (
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-3">
              {tag}
            </span>
          )}
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          {description && (
            <p className="text-white/80 text-sm">{description}</p>
          )}
        </div>
      }
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </DirectionAwareCard>
  );
};

// Grid layout
interface DirectionAwareGridProps {
  items: Array<{
    image: string;
    title: string;
    description?: string;
    tag?: string;
    onClick?: () => void;
  }>;
  columns?: number;
  gap?: string;
}

export const DirectionAwareGrid: React.FC<DirectionAwareGridProps> = ({
  items,
  columns = 3,
  gap = "gap-6",
}) => {
  return (
    <div
      className={`grid ${gap}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {items.map((item, index) => (
        <div key={index} onClick={item.onClick}>
          <DirectionAwareImageCard
            image={item.image}
            title={item.title}
            description={item.description}
            tag={item.tag}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

// Minimal variant with solid color overlay
interface DirectionAwareMinimalCardProps {
  children: React.ReactNode;
  overlayContent: React.ReactNode;
  className?: string;
  overlayColor?: string;
}

export const DirectionAwareMinimalCard: React.FC<DirectionAwareMinimalCardProps> = ({
  children,
  overlayContent,
  className = "",
  overlayColor = "bg-black/80",
}) => {
  return (
    <DirectionAwareCard
      className={`group cursor-pointer ${className}`}
      overlayClassName={`${overlayColor} flex items-center justify-center`}
      animationDuration={0.3}
      overlay={overlayContent}
    >
      {children}
    </DirectionAwareCard>
  );
};

// Icon card variant
interface DirectionAwareIconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  overlayIcon?: React.ReactNode;
  overlayTitle?: string;
  overlayDescription?: string;
  className?: string;
}

export const DirectionAwareIconCard: React.FC<DirectionAwareIconCardProps> = ({
  icon,
  title,
  description,
  overlayIcon,
  overlayTitle,
  overlayDescription,
  className = "",
}) => {
  return (
    <DirectionAwareCard
      className={`group cursor-pointer bg-slate-900 border border-slate-800 rounded-lg p-8 ${className}`}
      overlayClassName="bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col items-center justify-center p-8 text-center"
      animationDuration={0.35}
      overlay={
        <div>
          {overlayIcon && (
            <div className="mb-4 flex justify-center">
              {overlayIcon}
            </div>
          )}
          <h3 className="text-2xl font-bold text-white mb-3">
            {overlayTitle || title}
          </h3>
          <p className="text-white/90 text-sm">
            {overlayDescription || description}
          </p>
        </div>
      }
    >
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </DirectionAwareCard>
  );
};

// Interactive demo card (shows direction)
export const DirectionAwareDebugCard: React.FC = () => {
  const [direction, setDirection] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  const getDirectionName = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const angle = Math.atan2(y, x);
    const degree = angle * (180 / Math.PI);

    if (degree > -45 && degree <= 45) {
      return "RIGHT →";
    } else if (degree > 45 && degree <= 135) {
      return "BOTTOM ↓";
    } else if (degree > 135 || degree <= -135) {
      return "LEFT ←";
    } else {
      return "TOP ↑";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={(e) => setDirection(getDirectionName(e) || "")}
      onMouseLeave={(e) => setDirection(getDirectionName(e) || "")}
      className="relative bg-slate-900 border-2 border-dashed border-cyan-500/50 rounded-lg p-12 cursor-pointer min-h-[300px] flex items-center justify-center"
    >
      <div className="text-center">
        <p className="text-slate-400 mb-4 font-mono text-sm">
          Move your mouse in from different edges
        </p>
        {direction && (
          <div className="text-4xl font-bold text-cyan-400 font-mono animate-pulse">
            {direction}
          </div>
        )}
        {!direction && (
          <div className="text-2xl text-slate-600 font-mono">
            ...
          </div>
        )}
      </div>
    </div>
  );
};
