"use client";
import { useEffect, useRef } from 'react';

interface BioLuminescentGlowProps {
  intensity?: number;
  color?: string;
  size?: number;
  speed?: number;
  children?: React.ReactNode;
  className?: string;
}

const BioLuminescentGlow = ({
  intensity = 1,
  color = '#00ffff',
  size = 200,
  speed = 1,
  children,
  className = ''
}: BioLuminescentGlowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    let animationId: number;

    const animate = () => {
      const time = Date.now() * 0.001 * speed;

      // Create organic pulsing using multiple sine waves
      const pulse1 = Math.sin(time * 0.5) * 0.5 + 0.5;
      const pulse2 = Math.sin(time * 0.7 + Math.PI * 0.3) * 0.3 + 0.7;
      const pulse3 = Math.sin(time * 1.1 + Math.PI * 0.7) * 0.2 + 0.8;

      // Combine pulses for organic feel
      const combinedPulse = (pulse1 + pulse2 + pulse3) / 3;

      // Apply intensity multiplier
      const finalIntensity = combinedPulse * intensity;

      // Update CSS custom properties
      element.style.setProperty('--glow-intensity', finalIntensity.toString());
      element.style.setProperty('--glow-color', color);
      element.style.setProperty('--glow-size', `${size}px`);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [intensity, color, size, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        '--glow-intensity': '0.5',
        '--glow-color': color,
        '--glow-size': `${size}px`,
      } as React.CSSProperties}
    >
      {/* Main glow effect */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color} calc(var(--glow-intensity) * 30%), transparent calc(var(--glow-intensity) * 70%))`,
          filter: 'blur(calc(var(--glow-size) * 0.1))',
          opacity: 'calc(var(--glow-intensity) * 0.8)',
          transform: 'scale(calc(1 + var(--glow-intensity) * 0.2))',
          transition: 'all 0.1s ease-out',
        }}
      />

      {/* Secondary glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, transparent calc(var(--glow-intensity) * 40%), ${color} calc(var(--glow-intensity) * 60%), transparent calc(var(--glow-intensity) * 90%))`,
          filter: 'blur(calc(var(--glow-size) * 0.05))',
          opacity: 'calc(var(--glow-intensity) * 0.4)',
          transform: 'scale(calc(1.2 + var(--glow-intensity) * 0.1))',
          animation: `pulseRing ${4 / speed}s ease-in-out infinite`,
        }}
      />

      {/* Inner core */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color} calc(var(--glow-intensity) * 20%), transparent calc(var(--glow-intensity) * 50%))`,
          opacity: 'calc(var(--glow-intensity) * 0.6)',
          transform: 'scale(calc(0.8 + var(--glow-intensity) * 0.1))',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes pulseRing {
          0%, 100% {
            transform: scale(calc(1.2 + var(--glow-intensity) * 0.1)) rotate(0deg);
          }
          50% {
            transform: scale(calc(1.4 + var(--glow-intensity) * 0.15)) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

// Preset configurations for different bioluminescent effects
export const BioLuminescentPresets = {
  deepSea: {
    color: '#00ffff',
    intensity: 1.2,
    size: 250,
    speed: 0.8
  },
  firefly: {
    color: '#ffff00',
    intensity: 0.8,
    size: 150,
    speed: 1.5
  },
  jellyfish: {
    color: '#ff6b9d',
    intensity: 1.0,
    size: 200,
    speed: 0.6
  },
  plankton: {
    color: '#4ecdc4',
    intensity: 0.6,
    size: 100,
    speed: 2.0
  },
  anglerfish: {
    color: '#ff4757',
    intensity: 1.5,
    size: 300,
    speed: 0.4
  }
};

export default BioLuminescentGlow;