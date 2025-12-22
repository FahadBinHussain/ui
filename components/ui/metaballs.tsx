"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface MetaballsProps {
  className?: string;
  ballCount?: number;
  color?: string;
  useColor?: boolean;
}

// CSS-only version using blur + contrast (black & white)
export const Metaballs: React.FC<MetaballsProps> = ({
  className = "",
  ballCount = 5,
  color = "#000000",
  useColor = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const balls = ballsRef.current.filter(Boolean);

    // Initialize ball positions randomly
    balls.forEach((ball, index) => {
      const angle = (index / ballCount) * Math.PI * 2;
      const radius = 100 + Math.random() * 50;
      const x = 50 + Math.cos(angle) * radius / 4;
      const y = 50 + Math.sin(angle) * radius / 4;

      gsap.set(ball, {
        x: `${x}%`,
        y: `${y}%`,
        xPercent: -50,
        yPercent: -50,
      });

      // Animate each ball with random movement
      gsap.to(ball, {
        x: `${x + (Math.random() - 0.5) * 30}%`,
        y: `${y + (Math.random() - 0.5) * 30}%`,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    });

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };

    const handleMouseEnter = () => setIsMouseInside(true);
    const handleMouseLeave = () => setIsMouseInside(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ballCount]);

  // Animate balls toward mouse when inside
  useEffect(() => {
    if (!isMouseInside || ballsRef.current.length === 0) return;

    const interval = setInterval(() => {
      ballsRef.current.forEach((ball) => {
        if (!ball) return;
        
        const currentX = parseFloat(ball.style.left || "50") || 50;
        const currentY = parseFloat(ball.style.top || "50") || 50;
        
        // Move toward mouse position
        const targetX = currentX + (mousePos.current.x - currentX) * 0.1;
        const targetY = currentY + (mousePos.current.y - currentY) * 0.1;
        
        gsap.to(ball, {
          x: `${targetX}%`,
          y: `${targetY}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isMouseInside]);

  if (useColor) {
    return (
      <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="goop">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goop"
              />
            </filter>
          </defs>
          <g filter="url(#goop)">
            {Array.from({ length: ballCount }).map((_, index) => (
              <circle
                key={index}
                ref={(el) => {
                  if (el) ballsRef.current[index] = el as any;
                }}
                r="60"
                fill={color}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-white ${className}`}
      style={{ filter: "contrast(30)" }}
    >
      {Array.from({ length: ballCount }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) ballsRef.current[index] = el;
          }}
          className="absolute w-32 h-32 rounded-full bg-black"
          style={{
            filter: "blur(20px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

// Interactive cursor follower with goop effect
interface GoopCursorProps {
  className?: string;
  color?: string;
}

export const GoopCursor: React.FC<GoopCursorProps> = ({
  className = "",
  color = "#8b5cf6",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add to trail
      trailPositions.current.unshift({ x, y });
      if (trailPositions.current.length > ballsRef.current.length) {
        trailPositions.current.pop();
      }

      // Update ball positions with delay
      ballsRef.current.forEach((ball, index) => {
        if (!ball || !trailPositions.current[index]) return;

        const { x: targetX, y: targetY } = trailPositions.current[index];
        
        gsap.to(ball, {
          x: targetX,
          y: targetY,
          duration: 0.2 + index * 0.05,
          ease: "power2.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-slate-900 ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="goop-cursor">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goop"
            />
          </filter>
        </defs>
        <g filter="url(#goop-cursor)">
          {Array.from({ length: 8 }).map((_, index) => (
            <circle
              key={index}
              ref={(el) => {
                if (el) ballsRef.current[index] = el as any;
              }}
              r="30"
              fill={color}
              opacity={1 - index * 0.1}
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold">
        Move your mouse
      </div>
    </div>
  );
};

// Hover cards with goop connection effect
interface GoopCardProps {
  title: string;
  description: string;
  className?: string;
}

export const GoopCard: React.FC<GoopCardProps> = ({
  title,
  description,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Goop Effect */}
      <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]">
        <defs>
          <filter id={`goop-card-${title}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goop"
            />
          </filter>
        </defs>
        <g filter={`url(#goop-card-${title})`}>
          {/* Card background blob */}
          <rect
            x="16"
            y="16"
            width="calc(100% - 32)"
            height="calc(100% - 32)"
            rx="12"
            fill="#8b5cf6"
            opacity={isHovered ? "1" : "0.8"}
            style={{
              transition: "opacity 0.3s ease",
            }}
          />
          {/* Hover blob that grows */}
          {isHovered && (
            <circle
              cx="50%"
              cy="50%"
              r="40"
              fill="#a78bfa"
              style={{
                animation: "goopPulse 2s ease-in-out infinite",
              }}
            />
          )}
        </g>
      </svg>

      {/* Card Content */}
      <div className="relative z-10 p-6 bg-transparent">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-purple-200">{description}</p>
      </div>

      <style jsx>{`
        @keyframes goopPulse {
          0%, 100% { r: 40; opacity: 0.5; }
          50% { r: 60; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// Magnetic goop effect - balls attracted to each other and mouse
interface MagneticGoopProps {
  className?: string;
  ballCount?: number;
}

export const MagneticGoop: React.FC<MagneticGoopProps> = ({
  className = "",
  ballCount = 6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = containerRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Initialize balls
    ballsRef.current = Array.from({ length: ballCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update ball positions
      ballsRef.current.forEach((ball, i) => {
        // Apply velocity
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off walls
        if (ball.x < 50 || ball.x > canvas.width - 50) ball.vx *= -1;
        if (ball.y < 50 || ball.y > canvas.height - 50) ball.vy *= -1;

        // Attraction to mouse
        if (mousePos.current.x > 0) {
          const dx = mousePos.current.x - ball.x;
          const dy = mousePos.current.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            ball.vx += (dx / dist) * 0.3;
            ball.vy += (dy / dist) * 0.3;
          }
        }

        // Attraction to other balls
        ballsRef.current.forEach((otherBall, j) => {
          if (i === j) return;
          
          const dx = otherBall.x - ball.x;
          const dy = otherBall.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150 && dist > 0) {
            ball.vx += (dx / dist) * 0.1;
            ball.vy += (dy / dist) * 0.1;
          }
        });

        // Damping
        ball.vx *= 0.98;
        ball.vy *= 0.98;

        // Limit speed
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (speed > 3) {
          ball.vx = (ball.vx / speed) * 3;
          ball.vy = (ball.vy / speed) * 3;
        }
      });

      // Draw with goop effect using contrast
      ctx.save();
      ctx.filter = "blur(20px) contrast(30)";
      
      ballsRef.current.forEach((ball) => {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 50, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ballCount]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
