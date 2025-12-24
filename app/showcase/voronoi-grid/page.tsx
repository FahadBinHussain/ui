'use client';

import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}

export default function VoronoiGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initializePoints = () => {
      const numPoints = 60; // Reduced from 80 for better performance
      pointsRef.current = [];
      
      // Generate initial random points
      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        pointsRef.current.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: 0,
          vy: 0
        });
      }

      // Lloyd's relaxation for uniform distribution - reduced iterations
      for (let iteration = 0; iteration < 3; iteration++) {
        const voronoi = computeVoronoi(pointsRef.current, canvas.width, canvas.height);
        pointsRef.current = pointsRef.current.map((point, i) => {
          const cell = voronoi[i];
          if (cell && cell.length > 0) {
            const centroidX = cell.reduce((sum, p) => sum + p.x, 0) / cell.length;
            const centroidY = cell.reduce((sum, p) => sum + p.y, 0) / cell.length;
            return {
              ...point,
              x: centroidX,
              y: centroidY,
              originalX: centroidX,
              originalY: centroidY
            };
          }
          return point;
        });
      }
    };

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializePoints();
    };

    const computeVoronoi = (points: Point[], width: number, height: number) => {
      const cells: { x: number; y: number }[][] = points.map(() => []);
      const step = 10; // Increased from 5 to 10 for better performance

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          let minDist = Infinity;
          let closestIndex = 0;

          points.forEach((point, i) => {
            const dist = Math.hypot(x - point.x, y - point.y);
            if (dist < minDist) {
              minDist = dist;
              closestIndex = i;
            }
          });

          cells[closestIndex].push({ x, y });
        }
      }

      return cells;
    };

    const drawVoronoi = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simplified grain noise - only apply to small portion for performance
      if (Math.random() > 0.9) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 40) { // Skip more pixels
          const noise = (Math.random() - 0.5) * 8;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      const points = pointsRef.current;
      const voronoi = computeVoronoi(points, canvas.width, canvas.height);

      // Draw cells
      voronoi.forEach((cell, i) => {
        if (cell.length === 0) return;

        // Check if this cell is under cursor
        const point = points[i];
        const distToCursor = Math.hypot(mouseRef.current.x - point.x, mouseRef.current.y - point.y);
        const isActive = distToCursor < 100;

        // Draw cell fill
        if (isActive) {
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 100
          );
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
          ctx.fillStyle = gradient;
          
          ctx.beginPath();
          cell.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.closePath();
          ctx.fill();
        }

        // Draw cell borders
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        const hull = getConvexHull(cell);
        hull.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.stroke();

        // Draw seed point
        ctx.fillStyle = isActive ? 'rgba(139, 92, 246, 0.8)' : 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, isActive ? 4 : 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const getConvexHull = (points: { x: number; y: number }[]) => {
      if (points.length < 3) return points;
      
      const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
      const lower: { x: number; y: number }[] = [];
      
      for (const point of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
          lower.pop();
        }
        lower.push(point);
      }
      
      const upper: { x: number; y: number }[] = [];
      for (let i = sorted.length - 1; i >= 0; i--) {
        const point = sorted[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
          upper.pop();
        }
        upper.push(point);
      }
      
      upper.pop();
      lower.pop();
      return lower.concat(upper);
    };

    const cross = (o: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) => {
      return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    };

    const updatePhysics = () => {
      const points = pointsRef.current;
      const mouse = mouseRef.current;
      const repulsionRadius = 150;
      const repulsionForce = 0.5;
      const springForce = 0.05;
      const damping = 0.9;

      points.forEach(point => {
        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        // Repulsion from cursor
        if (dist < repulsionRadius && dist > 0) {
          const force = (1 - dist / repulsionRadius) * repulsionForce;
          point.vx += (dx / dist) * force;
          point.vy += (dy / dist) * force;
        }

        // Spring back to original position
        const springDx = point.originalX - point.x;
        const springDy = point.originalY - point.y;
        point.vx += springDx * springForce;
        point.vy += springDy * springForce;

        // Apply velocity with damping
        point.vx *= damping;
        point.vy *= damping;
        point.x += point.vx;
        point.y += point.vy;
      });
    };

    const animate = () => {
      updatePhysics();
      drawVoronoi();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      <div className="absolute top-8 left-8 z-10 max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4">Voronoi Cell Grid</h1>
        <p className="text-purple-300 text-sm leading-relaxed">
          Move your cursor to interact with the cellular structure. Cells dynamically resize and push their neighbors based on proximity.
        </p>
        <div className="mt-4 space-y-2 text-xs text-purple-400">
          <p>• Lloyd's relaxation for uniform distribution</p>
          <p>• Real-time Voronoi diagram calculation</p>
          <p>• Spring physics with dampening</p>
          <p>• Grain noise overlay</p>
        </div>
      </div>
    </div>
  );
}
