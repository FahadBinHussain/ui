"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Vertex {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}

interface SoftBodyUIProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  gridSize?: number;
  stiffness?: number;
  damping?: number;
  mouseRadius?: number;
}

export const SoftBodyUI: React.FC<SoftBodyUIProps> = ({
  children,
  className,
  width = 400,
  height = 300,
  gridSize = 15,
  stiffness = 0.15,
  damping = 0.85,
  mouseRadius = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verticesRef = useRef<Vertex[][]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Initialize grid of vertices
    const vertices: Vertex[][] = [];
    for (let i = 0; i <= gridSize; i++) {
      vertices[i] = [];
      for (let j = 0; j <= gridSize; j++) {
        vertices[i][j] = {
          x: (width / gridSize) * j,
          y: (height / gridSize) * i,
          originalX: (width / gridSize) * j,
          originalY: (height / gridSize) * i,
          vx: 0,
          vy: 0,
        };
      }
    }
    verticesRef.current = vertices;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update vertices
      for (let i = 0; i <= gridSize; i++) {
        for (let j = 0; j <= gridSize; j++) {
          const vertex = vertices[i][j];

          // Calculate distance from mouse
          const dx = mouseRef.current.x - vertex.x;
          const dy = mouseRef.current.y - vertex.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply force if within mouse radius
          if (distance < mouseRadius && distance > 0) {
            const force = (mouseRadius - distance) / mouseRadius;
            vertex.vx -= (dx / distance) * force * 2;
            vertex.vy -= (dy / distance) * force * 2;
          }

          // Spring back to original position
          const springX = (vertex.originalX - vertex.x) * stiffness;
          const springY = (vertex.originalY - vertex.y) * stiffness;
          vertex.vx += springX;
          vertex.vy += springY;

          // Apply damping
          vertex.vx *= damping;
          vertex.vy *= damping;

          // Update position
          vertex.x += vertex.vx;
          vertex.y += vertex.vy;
        }
      }

      // Draw mesh
      ctx.strokeStyle = "rgba(100, 200, 255, 0.3)";
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(vertices[i][0].x, vertices[i][0].y);
        for (let j = 1; j <= gridSize; j++) {
          ctx.lineTo(vertices[i][j].x, vertices[i][j].y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let j = 0; j <= gridSize; j++) {
        ctx.beginPath();
        ctx.moveTo(vertices[0][j].x, vertices[0][j].y);
        for (let i = 1; i <= gridSize; i++) {
          ctx.lineTo(vertices[i][j].x, vertices[i][j].y);
        }
        ctx.stroke();
      }

      // Fill with gradient
      const centerX = vertices[Math.floor(gridSize / 2)][Math.floor(gridSize / 2)].x;
      const centerY = vertices[Math.floor(gridSize / 2)][Math.floor(gridSize / 2)].y;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width / 2);
      gradient.addColorStop(0, "rgba(100, 200, 255, 0.15)");
      gradient.addColorStop(1, "rgba(100, 200, 255, 0.05)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(vertices[0][0].x, vertices[0][0].y);
      
      for (let j = 0; j <= gridSize; j++) {
        ctx.lineTo(vertices[0][j].x, vertices[0][j].y);
      }
      for (let i = 0; i <= gridSize; i++) {
        ctx.lineTo(vertices[i][gridSize].x, vertices[i][gridSize].y);
      }
      for (let j = gridSize; j >= 0; j--) {
        ctx.lineTo(vertices[gridSize][j].x, vertices[gridSize][j].y);
      }
      for (let i = gridSize; i >= 0; i--) {
        ctx.lineTo(vertices[i][0].x, vertices[i][0].y);
      }
      ctx.closePath();
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, gridSize, stiffness, damping, mouseRadius]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};

export const JellyCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
}> = ({ children, className, title }) => {
  return (
    <SoftBodyUI
      width={350}
      height={200}
      gridSize={12}
      stiffness={0.12}
      damping={0.88}
      mouseRadius={120}
      className={cn(
        "rounded-2xl border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      <div className="p-6 text-center">
        {title && <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>}
        <div className="text-slate-300">{children}</div>
      </div>
    </SoftBodyUI>
  );
};

export const JellyButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className="group relative">
      <SoftBodyUI
        width={200}
        height={60}
        gridSize={8}
        stiffness={0.2}
        damping={0.82}
        mouseRadius={80}
        className={cn(
          "rounded-full border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50",
          className
        )}
      >
        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
          {children}
        </div>
      </SoftBodyUI>
    </button>
  );
};

export const JellyPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <SoftBodyUI
      width={600}
      height={400}
      gridSize={18}
      stiffness={0.1}
      damping={0.9}
      mouseRadius={150}
      className={cn(
        "rounded-3xl border border-purple-500/30 bg-slate-900/40 backdrop-blur-sm",
        className
      )}
    >
      <div className="p-8 w-full h-full overflow-auto">
        {children}
      </div>
    </SoftBodyUI>
  );
};
