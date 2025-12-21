"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";

export interface PhysicsElement {
  id: string;
  content: React.ReactNode;
  color: string;
  width?: number;
  height?: number;
}

interface PhysicsSandboxProps {
  elements: PhysicsElement[];
  width?: number;
  height?: number;
  gravity?: { x: number; y: number };
  enableDeviceOrientation?: boolean;
  className?: string;
}

export const PhysicsSandbox: React.FC<PhysicsSandboxProps> = ({
  elements,
  width = 800,
  height = 600,
  gravity = { x: 0, y: 1 },
  enableDeviceOrientation = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elementRefs] = useState<Map<string, HTMLDivElement>>(new Map());
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);
  const bodiesRef = useRef<Map<string, any>>(new Map());
  const mouseConstraintRef = useRef<any>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: gravity,
    });
    const world = engine.world;

    // Create renderer - but don't use it, we'll render manually
    engineRef.current = engine;

    // Create walls
    const wallThickness = 50;
    const walls = [
      // Bottom
      Matter.Bodies.rectangle(width / 2, height - wallThickness / 2, width, wallThickness, {
        isStatic: true,
        label: "bottom",
      }),
      // Left
      Matter.Bodies.rectangle(wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
        label: "left",
      }),
      // Right
      Matter.Bodies.rectangle(width - wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
        label: "right",
      }),
    ];

    Matter.World.add(world, walls);

    // Create physics bodies for elements
    elements.forEach((element, index) => {
      const elementWidth = element.width || 100;
      const elementHeight = element.height || 40;
      
      const body = Matter.Bodies.rectangle(
        Math.random() * (width - elementWidth - 100) + 50 + elementWidth / 2,
        -50 - index * 80,
        elementWidth,
        elementHeight,
        {
          restitution: 0.5,
          friction: 0.3,
          frictionAir: 0.02,
          label: element.id,
        }
      );

      bodiesRef.current.set(element.id, body);
      Matter.World.add(world, body);
    });

    // Add mouse constraint for dragging
    const mouse = Matter.Mouse.create(canvas);
    mouse.pixelRatio = window.devicePixelRatio || 1;
    
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    Matter.World.add(world, mouseConstraint);

    // Keep canvas mouse in sync
    canvas.addEventListener("mousemove", () => {
      const bounds = canvas.getBoundingClientRect();
      const mousePosition = mouseConstraint.mouse.position;
      // Update if needed
    });

    // Run the engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Update HTML elements to follow physics bodies
    const updateElements = () => {
      bodiesRef.current.forEach((body, id) => {
        const htmlElement = elementRefs.get(id);
        if (htmlElement && body) {
          const { x, y } = body.position;
          const angle = body.angle;
          
          htmlElement.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) translate(-50%, -50%)`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(updateElements);
    };

    updateElements();

    // Device orientation
    if (enableDeviceOrientation && typeof window !== "undefined" && window.DeviceOrientationEvent) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.beta !== null && event.gamma !== null) {
          const gravityX = (event.gamma / 90) * 1;
          const gravityY = (event.beta / 90) * 1;
          engine.gravity.x = gravityX;
          engine.gravity.y = gravityY;
        }
      };

      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);
        Matter.Runner.stop(runner);
      };
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
    };
  }, [elements, width, height, gravity.x, gravity.y, enableDeviceOrientation, elementRefs]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-white/10 select-none ${className}`}
      style={{ width, height, userSelect: "none" }}
    >
      {/* Physics canvas - visible for debugging or set to opacity-0 */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 pointer-events-auto"
        style={{ 
          userSelect: "none",
          background: "transparent",
          zIndex: 10,
        }}
      />

      {/* HTML elements that follow physics */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 20 }}>
        {elements.map((element) => (
          <div
            key={element.id}
            ref={(el) => {
              if (el) elementRefs.set(element.id, el);
            }}
            className="absolute pointer-events-none select-none"
            style={{
              width: element.width || 100,
              height: element.height || 40,
              userSelect: "none",
            }}
          >
            <div
              className={`w-full h-full flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white shadow-lg select-none ${element.color}`}
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              {element.content}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm">
        <p>🖱️ Click and drag elements</p>
        {enableDeviceOrientation && (
          <p className="mt-1">📱 Tilt device to change gravity</p>
        )}
      </div>
    </div>
  );
};

// Preset element collections
export const tagElements: PhysicsElement[] = [
  { id: "react", content: "React", color: "bg-blue-500", width: 80 },
  { id: "nextjs", content: "Next.js", color: "bg-gray-800", width: 90 },
  { id: "typescript", content: "TypeScript", color: "bg-blue-600", width: 120 },
  { id: "tailwind", content: "Tailwind", color: "bg-cyan-500", width: 100 },
  { id: "framer", content: "Framer Motion", color: "bg-pink-500", width: 140 },
  { id: "three", content: "Three.js", color: "bg-purple-500", width: 100 },
  { id: "gsap", content: "GSAP", color: "bg-green-500", width: 80 },
  { id: "matter", content: "Matter.js", color: "bg-orange-500", width: 110 },
];

export const iconElements: PhysicsElement[] = [
  { id: "icon1", content: "⚡", color: "bg-yellow-500", width: 60, height: 60 },
  { id: "icon2", content: "🎨", color: "bg-purple-500", width: 60, height: 60 },
  { id: "icon3", content: "🚀", color: "bg-red-500", width: 60, height: 60 },
  { id: "icon4", content: "💎", color: "bg-cyan-500", width: 60, height: 60 },
  { id: "icon5", content: "🌟", color: "bg-pink-500", width: 60, height: 60 },
  { id: "icon6", content: "🔥", color: "bg-orange-500", width: 60, height: 60 },
];
