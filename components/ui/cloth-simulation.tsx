"use client";

import React, { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

interface Stick {
  p1: Point;
  p2: Point;
  length: number;
}

interface ClothProps {
  width?: number;
  height?: number;
  spacing?: number;
  gravity?: number;
  imageUrl?: string;
  className?: string;
}

export const Cloth: React.FC<ClothProps> = ({
  width = 40,
  height = 30,
  spacing = 10,
  gravity = 0.5,
  imageUrl,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[][]>([]);
  const sticksRef = useRef<Stick[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, down: false, radius: 25 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width * spacing + 100;
    canvas.height = height * spacing + 200;

    // Load image if provided
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imageRef.current = img;
      };
      img.src = imageUrl;
    }

    // Initialize points
    const points: Point[][] = [];
    for (let y = 0; y < height; y++) {
      points[y] = [];
      for (let x = 0; x < width; x++) {
        const point: Point = {
          x: 50 + x * spacing,
          y: 50 + y * spacing,
          oldX: 50 + x * spacing,
          oldY: 50 + y * spacing,
          pinned: y === 0, // Pin top row
        };
        points[y][x] = point;
      }
    }
    pointsRef.current = points;

    // Create sticks (constraints)
    const sticks: Stick[] = [];

    // Horizontal sticks
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width - 1; x++) {
        const p1 = points[y][x];
        const p2 = points[y][x + 1];
        sticks.push({ p1, p2, length: spacing });
      }
    }

    // Vertical sticks
    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width; x++) {
        const p1 = points[y][x];
        const p2 = points[y + 1][x];
        sticks.push({ p1, p2, length: spacing });
      }
    }

    sticksRef.current = sticks;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouseRef.current.down = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);

    // Physics simulation
    const updatePoints = () => {
      points.forEach((row) => {
        row.forEach((point) => {
          if (point.pinned) return;

          // Verlet integration
          const vx = point.x - point.oldX;
          const vy = point.y - point.oldY;

          point.oldX = point.x;
          point.oldY = point.y;

          // Apply gravity and damping
          point.x += vx * 0.99;
          point.y += vy * 0.99 + gravity;

          // Keep within canvas bounds
          if (point.y > canvas.height - 10) {
            point.y = canvas.height - 10;
            point.oldY = point.y + vy * 0.5;
          }
          if (point.x < 10) {
            point.x = 10;
            point.oldX = point.x - vx * 0.5;
          }
          if (point.x > canvas.width - 10) {
            point.x = canvas.width - 10;
            point.oldX = point.x - vx * 0.5;
          }
        });
      });
    };

    const applyConstraints = () => {
      // Solve stick constraints
      for (let i = 0; i < 3; i++) {
        // Multiple iterations for stability
        sticksRef.current.forEach((stick) => {
          const dx = stick.p2.x - stick.p1.x;
          const dy = stick.p2.y - stick.p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const difference = stick.length - distance;
          const percent = difference / distance / 2;
          const offsetX = dx * percent;
          const offsetY = dy * percent;

          if (!stick.p1.pinned) {
            stick.p1.x -= offsetX;
            stick.p1.y -= offsetY;
          }
          if (!stick.p2.pinned) {
            stick.p2.x += offsetX;
            stick.p2.y += offsetY;
          }
        });
      }

      // Mouse interaction
      if (mouseRef.current.down) {
        points.forEach((row) => {
          row.forEach((point) => {
            const dx = point.x - mouseRef.current.x;
            const dy = point.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRef.current.radius) {
              point.x = mouseRef.current.x;
              point.y = mouseRef.current.y;
            }
          });
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cloth as triangles
      if (imageRef.current) {
        // Draw with texture
        const img = imageRef.current;
        for (let y = 0; y < height - 1; y++) {
          for (let x = 0; x < width - 1; x++) {
            const p1 = points[y][x];
            const p2 = points[y][x + 1];
            const p3 = points[y + 1][x];
            const p4 = points[y + 1][x + 1];

            // UV coordinates
            const u1 = x / (width - 1);
            const v1 = y / (height - 1);
            const u2 = (x + 1) / (width - 1);
            const v2 = (y + 1) / (height - 1);

            // Draw two triangles per quad
            drawTexturedTriangle(
              ctx,
              img,
              p1.x,
              p1.y,
              p2.x,
              p2.y,
              p3.x,
              p3.y,
              u1 * img.width,
              v1 * img.height,
              u2 * img.width,
              v1 * img.height,
              u1 * img.width,
              v2 * img.height
            );

            drawTexturedTriangle(
              ctx,
              img,
              p2.x,
              p2.y,
              p4.x,
              p4.y,
              p3.x,
              p3.y,
              u2 * img.width,
              v1 * img.height,
              u2 * img.width,
              v2 * img.height,
              u1 * img.width,
              v2 * img.height
            );
          }
        }
      } else {
        // Draw as lines if no image
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;

        sticksRef.current.forEach((stick) => {
          ctx.beginPath();
          ctx.moveTo(stick.p1.x, stick.p1.y);
          ctx.lineTo(stick.p2.x, stick.p2.y);
          ctx.stroke();
        });

        // Draw points
        ctx.fillStyle = "#00ffff";
        points.forEach((row) => {
          row.forEach((point) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      }

      // Draw mouse cursor
      if (mouseRef.current.down) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    };

    const drawTexturedTriangle = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      u0: number,
      v0: number,
      u1: number,
      v1: number,
      u2: number,
      v2: number
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.clip();

      // Calculate transformation matrix
      const denom = u0 * (v2 - v1) - u1 * v2 + u2 * v1 + (u1 - u2) * v0;
      if (Math.abs(denom) < 0.0001) {
        ctx.restore();
        return;
      }

      const m11 = -(v0 * (x2 - x1) - v1 * x2 + v2 * x1 + (v1 - v2) * x0) / denom;
      const m12 = (v1 * y2 + v0 * (y1 - y2) - v2 * y1 + (v2 - v1) * y0) / denom;
      const m21 = (u0 * (x2 - x1) - u1 * x2 + u2 * x1 + (u1 - u2) * x0) / denom;
      const m22 = -(u1 * y2 + u0 * (y1 - y2) - u2 * y1 + (u2 - u1) * y0) / denom;
      const dx = (u0 * (v2 * x1 - v1 * x2) + v0 * (u1 * x2 - u2 * x1) + (u2 * v1 - u1 * v2) * x0) / denom;
      const dy = (u0 * (v2 * y1 - v1 * y2) + v0 * (u1 * y2 - u2 * y1) + (u2 * v1 - u1 * v2) * y0) / denom;

      ctx.transform(m11, m12, m21, m22, dx, dy);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
    };

    const animate = () => {
      updatePoints();
      applyConstraints();
      render();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width, height, spacing, gravity, imageUrl]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gradient-to-br from-slate-950 to-slate-900"
      />
    </div>
  );
};

interface FlagSimulationProps {
  imageUrl?: string;
  className?: string;
}

export const FlagSimulation: React.FC<FlagSimulationProps> = ({
  imageUrl = "https://picsum.photos/id/1015/400/300",
  className = "",
}) => {
  return (
    <div className={className}>
      <Cloth width={50} height={35} spacing={8} gravity={0.6} imageUrl={imageUrl} />
    </div>
  );
};

interface SilkCurtainProps {
  className?: string;
}

export const SilkCurtain: React.FC<SilkCurtainProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Cloth
        width={60}
        height={50}
        spacing={6}
        gravity={0.4}
        imageUrl="https://picsum.photos/id/1018/600/500"
      />
    </div>
  );
};
