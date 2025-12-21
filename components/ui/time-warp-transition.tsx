"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TimeWarpTransitionProps {
  isActive?: boolean;
  duration?: number;
  onComplete?: () => void;
  children?: React.ReactNode;
}

const TimeWarpTransition = ({
  isActive = false,
  duration = 2,
  onComplete,
  children
}: TimeWarpTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isActive && !isTransitioning) {
      startTransition();
    }
  }, [isActive, isTransitioning]);

  const startTransition = () => {
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        onComplete?.();
      }
    });

    // Phase 1: Initial distortion and color shift
    tl.to(overlayRef.current, {
      duration: duration * 0.2,
      background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
      opacity: 0.8,
      filter: 'blur(0px) hue-rotate(0deg)',
      ease: 'power2.in'
    })
    .to(containerRef.current, {
      duration: duration * 0.2,
      scale: 1.05,
      filter: 'blur(2px) brightness(1.2) saturate(1.5)',
      ease: 'power2.in'
    }, 0);

    // Phase 2: Speed lines appear and time dilation effect
    tl.to(speedLinesRef.current, {
      duration: duration * 0.3,
      opacity: 1,
      scale: 1,
      ease: 'power2.inOut'
    }, duration * 0.1)
    .to(speedLinesRef.current?.children || [], {
      duration: duration * 0.3,
      x: 'random(-200, 200)',
      y: 'random(-200, 200)',
      rotation: 'random(-180, 180)',
      ease: 'power2.inOut',
      stagger: 0.02
    }, duration * 0.1);

    // Phase 3: Peak distortion and color cycling
    tl.to(overlayRef.current, {
      duration: duration * 0.3,
      filter: 'blur(5px) hue-rotate(180deg) brightness(1.5) contrast(1.2)',
      background: 'linear-gradient(45deg, #ffbe0b, #fb5607, #ff006e, #8338ec)',
      ease: 'power2.inOut'
    }, duration * 0.3)
    .to(containerRef.current, {
      duration: duration * 0.3,
      scale: 0.95,
      filter: 'blur(4px) brightness(1.8) saturate(2)',
      ease: 'power2.inOut'
    }, duration * 0.3);

    // Phase 4: Resolution and return to normal
    tl.to(speedLinesRef.current, {
      duration: duration * 0.2,
      opacity: 0,
      scale: 0.8,
      ease: 'power2.out'
    }, duration * 0.6)
    .to(overlayRef.current, {
      duration: duration * 0.2,
      opacity: 0,
      filter: 'blur(0px) hue-rotate(0deg)',
      ease: 'power2.out'
    }, duration * 0.6)
    .to(containerRef.current, {
      duration: duration * 0.2,
      scale: 1,
      filter: 'blur(0px) brightness(1) saturate(1)',
      ease: 'power2.out'
    }, duration * 0.6);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Speed Lines Overlay */}
      <div
        ref={speedLinesRef}
        className="absolute inset-0 pointer-events-none opacity-0 scale-75 z-20"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              height: `${20 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Color Distortion Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none opacity-0 z-10"
        style={{
          background: 'linear-gradient(45deg, transparent, transparent)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};

// Hook for managing time warp transitions
export const useTimeWarpTransition = () => {
  const [isActive, setIsActive] = useState(false);

  const triggerTransition = (callback?: () => void) => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      callback?.();
    }, 2000);
  };

  return { isActive, triggerTransition };
};

export default TimeWarpTransition;