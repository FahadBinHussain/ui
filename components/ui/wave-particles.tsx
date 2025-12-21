"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface WaveParticleSystemProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  waveIntensity?: number;
  mouseRadius?: number;
}

/**
 * Interactive particle wave system that responds to mouse movement
 * Creates wave-like patterns and particle interactions
 */
export function WaveParticleSystem({
  className = "",
  particleCount = 50,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
  waveIntensity = 1,
  mouseRadius = 150
}: WaveParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);

  // Initialize particles once canvas size is known
  const initParticles = (width: number, height: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100 + 50,
        maxLife: Math.random() * 100 + 50,
      });
    }
    particlesRef.current = newParticles;
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mousePos = mousePosRef.current;

      particles.forEach((particle, index) => {
        // Mouse interaction
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);

          // Create wave effect
          const waveOffset = Math.sin(Date.now() * 0.01 + distance * 0.01) * waveIntensity;
          particle.vx += Math.cos(angle) * force * 0.5 + waveOffset * 0.1;
          particle.vy += Math.sin(angle) * force * 0.5 + waveOffset * 0.1;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check with snapping
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx *= -0.8;
        } else if (particle.x > canvas.width) {
          particle.x = canvas.width;
          particle.vx *= -0.8;
        }

        if (particle.y < 0) {
          particle.y = 0;
          particle.vy *= -0.8;
        } else if (particle.y > canvas.height) {
          particle.y = canvas.height;
          particle.vy *= -0.8;
        }

        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        const alpha = particle.life / particle.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const otherParticle = particles[j];
          const dx_conn = particle.x - otherParticle.x;
          const dy_conn = particle.y - otherParticle.y;
          const distance_conn = Math.sqrt(dx_conn * dx_conn + dy_conn * dy_conn);

          if (distance_conn < 100) {
            ctx.globalAlpha = ((100 - distance_conn) / 100) * alpha * 0.3;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
        ctx.restore();

        // Update life
        particle.life--;
        if (particle.life <= 0) {
          // Respawn particle
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
          particle.life = particle.maxLife;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mouseRadius, waveIntensity, particleCount, colors]);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  // Handle canvas resize and particle initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [particleCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: "transparent" }}
    />
  );
}

interface RippleEffectProps {
  className?: string;
  colors?: string[];
  rippleCount?: number;
}

/**
 * Ripple effect that creates expanding circles from mouse position
 */
export function RippleEffect({
  className = "",
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4"],
  rippleCount = 3
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number; color: string }>>([]);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipples = Array.from({ length: rippleCount }, (_, i) => ({
      x,
      y,
      id: rippleIdRef.current++,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setRipples(prev => [...prev, ...newRipples]);

    // Remove ripples after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => !newRipples.find(nr => nr.id === ripple.id)));
    }, 2000);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 300,
            height: 300,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
        <p className="text-center">Click anywhere to create ripple effects</p>
      </div>
    </div>
  );
}

interface WaveBackgroundProps {
  className?: string;
  waveCount?: number;
  colors?: string[];
}

/**
 * Animated wave background with flowing patterns
 */
export function WaveBackground({
  className = "",
  waveCount = 3,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4"]
}: WaveBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {colors.map((color, i) => (
            <linearGradient key={i} id={`waveGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          ))}
        </defs>

        {Array.from({ length: waveCount }, (_, i) => (
          <motion.path
            key={i}
            d={`M0,${200 + i * 100} Q300,${150 + i * 100} 600,${200 + i * 100} T1200,${200 + i * 100} V800 H0 Z`}
            fill={`url(#waveGradient${i % colors.length})`}
            initial={{ d: `M0,${200 + i * 100} Q300,${150 + i * 100} 600,${200 + i * 100} T1200,${200 + i * 100} V800 H0 Z` }}
            animate={{
              d: [
                `M0,${200 + i * 100} Q300,${150 + i * 100} 600,${200 + i * 100} T1200,${200 + i * 100} V800 H0 Z`,
                `M0,${250 + i * 100} Q300,${200 + i * 100} 600,${250 + i * 100} T1200,${250 + i * 100} V800 H0 Z`,
                `M0,${150 + i * 100} Q300,${100 + i * 100} 600,${150 + i * 100} T1200,${150 + i * 100} V800 H0 Z`,
                `M0,${200 + i * 100} Q300,${150 + i * 100} 600,${200 + i * 100} T1200,${200 + i * 100} V800 H0 Z`,
              ],
            }}
            transition={{
              duration: 8 + i * 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse" as const,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}