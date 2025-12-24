"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Boid class representing a single agent
class Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  angle: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 1;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
  }

  // Calculate distance to another boid
  distance(other: Boid): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Cohesion: move towards the average position of nearby boids
  cohesion(boids: Boid[], radius: number): { x: number; y: number } {
    let avgX = 0;
    let avgY = 0;
    let count = 0;

    boids.forEach(other => {
      const dist = this.distance(other);
      if (other !== this && dist < radius) {
        avgX += other.x;
        avgY += other.y;
        count++;
      }
    });

    if (count > 0) {
      avgX /= count;
      avgY /= count;
      return { x: avgX - this.x, y: avgY - this.y };
    }
    return { x: 0, y: 0 };
  }

  // Alignment: match velocity with nearby boids
  alignment(boids: Boid[], radius: number): { x: number; y: number } {
    let avgVx = 0;
    let avgVy = 0;
    let count = 0;

    boids.forEach(other => {
      const dist = this.distance(other);
      if (other !== this && dist < radius) {
        avgVx += other.vx;
        avgVy += other.vy;
        count++;
      }
    });

    if (count > 0) {
      avgVx /= count;
      avgVy /= count;
      return { x: avgVx - this.vx, y: avgVy - this.vy };
    }
    return { x: 0, y: 0 };
  }

  // Separation: avoid crowding neighbors
  separation(boids: Boid[], radius: number): { x: number; y: number } {
    let moveX = 0;
    let moveY = 0;

    boids.forEach(other => {
      const dist = this.distance(other);
      if (other !== this && dist < radius && dist > 0) {
        moveX += (this.x - other.x) / dist;
        moveY += (this.y - other.y) / dist;
      }
    });

    return { x: moveX, y: moveY };
  }

  // Move towards mouse cursor (attractor)
  seek(targetX: number, targetY: number, force: number): { x: number; y: number } {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      return { x: (dx / dist) * force, y: (dy / dist) * force };
    }
    return { x: 0, y: 0 };
  }

  // Orbit around a point when mouse is stationary
  orbit(targetX: number, targetY: number, radius: number, force: number): { x: number; y: number } {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Tangent direction for orbiting
    const tangentX = -dy;
    const tangentY = dx;
    const tangentDist = Math.sqrt(tangentX * tangentX + tangentY * tangentY);

    if (tangentDist > 0) {
      // Mix seeking and orbiting
      const seekForce = dist > radius ? force : force * 0.3;
      const orbitForce = force * 0.7;

      return {
        x: (dx / dist) * seekForce + (tangentX / tangentDist) * orbitForce,
        y: (dy / dist) * seekForce + (tangentY / tangentDist) * orbitForce,
      };
    }
    return { x: 0, y: 0 };
  }

  // Update boid position and velocity
  update(
    boids: Boid[],
    mouseX: number,
    mouseY: number,
    isMouseMoving: boolean,
    width: number,
    height: number
  ) {
    // Flocking behavior weights
    const cohesionForce = this.cohesion(boids, 100);
    const alignmentForce = this.alignment(boids, 80);
    const separationForce = this.separation(boids, 40);

    // Mouse influence
    let mouseForce;
    if (isMouseMoving) {
      mouseForce = this.seek(mouseX, mouseY, 0.5);
    } else {
      mouseForce = this.orbit(mouseX, mouseY, 80, 0.4);
    }

    // Apply forces with weights
    this.vx += cohesionForce.x * 0.001 + alignmentForce.x * 0.05 + separationForce.x * 0.05 + mouseForce.x;
    this.vy += cohesionForce.y * 0.001 + alignmentForce.y * 0.05 + separationForce.y * 0.05 + mouseForce.y;

    // Limit speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = 6;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Update angle for drawing (banking effect)
    this.angle = Math.atan2(this.vy, this.vx);
    this.speed = speed;
  }

  // Draw the boid as a triangle
  draw(ctx: CanvasRenderingContext2D) {
    const size = 8;

    // Color based on speed (blue to cyan to white)
    const hue = 180 + (this.speed / 6) * 60; // 180-240 (blue to cyan)
    const lightness = 50 + (this.speed / 6) * 30; // 50-80 (dim to bright)
    ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
    ctx.shadowBlur = 10 + this.speed * 2;
    ctx.shadowColor = ctx.fillStyle;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Draw triangle (arrow shape)
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size, size / 2);
    ctx.lineTo(-size, -size / 2);
    ctx.closePath();
    ctx.fill();

    // Trail effect
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(-size * 2, 0);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

export default function BoidFlockingCursorDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, moving: false });
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize boids
    const boidCount = 50;
    boidsRef.current = Array.from(
      { length: boidCount },
      () => new Boid(Math.random() * canvas.width, Math.random() * canvas.height)
    );

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moving = true;
      setMousePos({ x: e.clientX, y: e.clientY });

      // Clear previous timer
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current);
      }

      // Set mouse as stationary after 200ms
      mouseTimerRef.current = setTimeout(() => {
        mouseRef.current.moving = false;
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trail fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw all boids
      boidsRef.current.forEach(boid => {
        boid.update(
          boidsRef.current,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.moving,
          canvas.width,
          canvas.height
        );
        boid.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      if (mouseTimerRef.current) {
        clearTimeout(mouseTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "none" }}
      />
      
      {/* Custom cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePos.x - 12,
          y: mousePos.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-6 h-6 rounded-full bg-cyan-400/60 blur-sm" />
        <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-cyan-400" />
        <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300/40 to-transparent" />
      </motion.div>
      
      {/* Info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 z-10 max-w-md"
      >
        <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6">
          <h2 className="text-3xl font-bold text-cyan-400 mb-3">
            Boid Flocking Cursor
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Move your mouse to see a swarm of intelligent agents follow using flocking algorithms: 
            <span className="text-cyan-300 font-semibold"> cohesion, alignment, and separation</span>.
          </p>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Moving cursor → Agents seek and chase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Stationary cursor → Agents orbit chaotically</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Color shifts with speed intensity</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-10"
      >
        <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg px-6 py-3">
          <p className="text-cyan-400 text-sm font-mono">
            <span className="text-gray-400">Agents:</span> 50 
            <span className="mx-2">|</span>
            <span className="text-gray-400">Algorithm:</span> Boids
          </p>
        </div>
      </motion.div>
    </div>
  );
}
