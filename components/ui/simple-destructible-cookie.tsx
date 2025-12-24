"use client";

import React, { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import { Cookie, X } from "lucide-react";

interface SimpleCookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export function SimpleCookieConsent({
  onAccept,
  onDecline,
}: SimpleCookieConsentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  const handleAccept = () => {
    if (!canvasRef.current || !modalRef.current) return;

    const modalRect = modalRef.current.getBoundingClientRect();
    
    // Hide DOM modal
    modalRef.current.style.display = "none";
    canvasRef.current.style.display = "block";

    // Setup Matter.js
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.5 }
    });
    engineRef.current = engine;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create walls
    const walls = [
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 25,
        window.innerWidth,
        50,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        -25,
        window.innerHeight / 2,
        50,
        window.innerHeight,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth + 25,
        window.innerHeight / 2,
        50,
        window.innerHeight,
        { isStatic: true }
      ),
    ];

    Matter.Composite.add(engine.world, walls);

    // Create shards
    const shardCount = 120; // Way more shards!
    const columns = 15; // Many more columns
    const rows = 8; // Many more rows
    const shardWidth = modalRect.width / columns;
    const shardHeight = modalRect.height / rows;
    const shards: Matter.Body[] = [];

    for (let i = 0; i < shardCount; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);
      const x = modalRect.left + col * shardWidth + shardWidth / 2;
      const y = modalRect.top + row * shardHeight + shardHeight / 2;
      
      const shard = Matter.Bodies.rectangle(x, y, shardWidth - 1, shardHeight - 1, {
        restitution: 0.2,
        friction: 0.95,
        render: {
          fillStyle: i % 4 === 0 ? "#9333ea" : i % 4 === 1 ? "#ec4899" : i % 4 === 2 ? "#8b5cf6" : "#d946ef",
        },
      });

      shards.push(shard);
    }

    Matter.Composite.add(engine.world, shards);

    // Apply explosive force
    const centerX = modalRect.left + modalRect.width / 2;
    const centerY = modalRect.top + modalRect.height / 2;

    shards.forEach((shard) => {
      const dx = shard.position.x - centerX;
      const dy = shard.position.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = 0.02;

      Matter.Body.applyForce(shard, shard.position, {
        x: (dx / distance) * force,
        y: (dy / distance) * force,
      });

      Matter.Body.setAngularVelocity(shard, (Math.random() - 0.5) * 0.3);
    });

    // Animation loop
    let opacity = 1;
    let fadeStart = Date.now() + 2500;

    const animate = () => {
      Matter.Engine.update(engine, 1000 / 60);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw shards
      shards.forEach((shard) => {
        ctx.save();
        ctx.translate(shard.position.x, shard.position.y);
        ctx.rotate(shard.angle);

        ctx.globalAlpha = opacity;
        ctx.fillStyle = (shard.render as any).fillStyle;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        const vertices = shard.vertices;
        ctx.beginPath();
        ctx.moveTo(vertices[0].x - shard.position.x, vertices[0].y - shard.position.y);
        
        for (let i = 1; i < vertices.length; i++) {
          ctx.lineTo(vertices[i].x - shard.position.x, vertices[i].y - shard.position.y);
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Fade out
      if (Date.now() > fadeStart) {
        opacity -= 0.02;
      }

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        setIsVisible(false);
        if (onAccept) onAccept();
      }
    };

    animate();
  };

  const handleDecline = () => {
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={modalRef}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-orange-100">
              <Cookie className="w-6 h-6 text-orange-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">We use cookies</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Click accept to smash this modal into physics debris!
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  Accept & Smash!
                </button>
                <button
                  onClick={handleDecline}
                  className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all"
                >
                  Decline
                </button>
              </div>
            </div>

            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ display: "none" }}
      />
    </>
  );
}
