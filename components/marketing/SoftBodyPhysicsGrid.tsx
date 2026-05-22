"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: number;
  image: string;
  title: string;
  category: string;
  color: string;
}

const cards: Card[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    title: "Abstract Art",
    category: "Design",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop",
    title: "Nature",
    category: "Photography",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop",
    title: "Neon Vibes",
    category: "Art",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop",
    title: "Fluid Shapes",
    category: "3D",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop",
    title: "Minimalism",
    category: "Design",
    color: "from-gray-500 to-slate-500",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&h=400&fit=crop",
    title: "Gradient",
    category: "Abstract",
    color: "from-violet-500 to-purple-500",
  },
];

export default function SoftBodyPhysicsGrid() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const softBodiesRef = useRef<Matter.Composite[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    if (!sceneRef.current || !canvasRef.current) return;

    // Module aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Composites = Matter.Composites;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const Events = Matter.Events;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.5, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Create walls
    const wallThickness = 50;
    const walls = [
      Bodies.rectangle(render.canvas.width / 2, -wallThickness / 2, render.canvas.width, wallThickness, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      Bodies.rectangle(render.canvas.width / 2, render.canvas.height + wallThickness / 2, render.canvas.width, wallThickness, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      Bodies.rectangle(-wallThickness / 2, render.canvas.height / 2, wallThickness, render.canvas.height, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      Bodies.rectangle(render.canvas.width + wallThickness / 2, render.canvas.height / 2, wallThickness, render.canvas.height, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
    ];
    Composite.add(engine.world, walls);

    // Create soft body cards
    const cardWidth = 180;
    const cardHeight = 220;
    const cols = 3;
    const rows = 2;
    const spacing = 40;
    const startX = (render.canvas.width - (cols * (cardWidth + spacing) - spacing)) / 2;
    const startY = 100;

    softBodiesRef.current = [];

    cards.forEach((card, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (cardWidth + spacing) + cardWidth / 2;
      const y = startY + row * (cardHeight + spacing) + cardHeight / 2;

      // Create soft body as a grid of particles
      const particleOptions = {
        friction: 0.8,
        frictionStatic: 0.5,
        render: {
          visible: false,
        },
      };

      const constraintOptions = {
        stiffness: 0.4,
        damping: 0.1,
        render: {
          visible: false,
        },
      };

      // Create a soft body rectangle
      const softBody = Composites.softBody(
        x - cardWidth / 2,
        y - cardHeight / 2,
        5, // columns
        6, // rows
        0,
        0,
        true,
        cardWidth / 4,
        particleOptions,
        constraintOptions
      );

      // Store card data on the soft body
      (softBody as any).cardData = card;
      (softBody as any).cardIndex = index;

      softBodiesRef.current.push(softBody);
      Composite.add(engine.world, softBody);
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    mouseConstraintRef.current = mouseConstraint;
    Composite.add(engine.world, mouseConstraint);

    // Mouse events
    Events.on(mouseConstraint, "mousedown", () => {
      const bodies = Matter.Query.point(Composite.allBodies(engine.world), mouse.position);
      bodies.forEach((body) => {
        // Find which soft body this particle belongs to
        softBodiesRef.current.forEach((softBody, idx) => {
          if (softBody.bodies.includes(body)) {
            setSelectedCard(idx);
          }
        });
      });
    });

    Events.on(mouseConstraint, "mouseup", () => {
      setSelectedCard(null);
    });

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Custom render loop for drawing cards
    const customRender = () => {
      const ctx = render.canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, render.canvas.width, render.canvas.height);

      // Draw each soft body as a card
      softBodiesRef.current.forEach((softBody) => {
        const bodies = softBody.bodies;
        const cardData = (softBody as any).cardData;

        if (bodies.length === 0) return;

        // Calculate bounding box
        let minX = Infinity,
          minY = Infinity,
          maxX = -Infinity,
          maxY = -Infinity;
        bodies.forEach((body) => {
          minX = Math.min(minX, body.position.x);
          minY = Math.min(minY, body.position.y);
          maxX = Math.max(maxX, body.position.x);
          maxY = Math.max(maxY, body.position.y);
        });

        const width = maxX - minX;
        const height = maxY - minY;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Draw card background
        ctx.save();
        ctx.beginPath();

        // Create soft-body deformed shape
        bodies.forEach((body, idx) => {
          if (idx === 0) {
            ctx.moveTo(body.position.x, body.position.y);
          } else {
            ctx.lineTo(body.position.x, body.position.y);
          }
        });
        ctx.closePath();

        // Fill with gradient
        const gradient = ctx.createLinearGradient(minX, minY, maxX, maxY);
        gradient.addColorStop(0, `rgba(147, 51, 234, 0.1)`);
        gradient.addColorStop(1, `rgba(236, 72, 153, 0.1)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw card content
        ctx.fillStyle = "white";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(cardData.title, centerX, centerY);

        ctx.font = "14px sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(cardData.category, centerX, centerY + 25);

        ctx.restore();

        // Draw particles (for debug)
        // Commented out for production
        /*
        if (false && ctx) {
          bodies.forEach((body) => {
            ctx.beginPath();
            ctx.arc(body.position.x, body.position.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fill();
          });
        }
        */
      });

      requestAnimationFrame(customRender);
    };

    customRender();

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0" ref={sceneRef}>
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      {/* Instructions */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3"
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            Soft-Body Physics Grid 🍮
          </h1>
          <p className="text-sm text-white/60">
            Drag the jelly cards around. They squish and deform on collision!
          </p>
        </motion.div>
      </div>

      {/* Selected card info */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 text-white"
          >
            <p className="text-sm">
              <span className="font-semibold">{cards[selectedCard].title}</span> •{" "}
              {cards[selectedCard].category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
