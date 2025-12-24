"use client";

import React, { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import html2canvas from "html2canvas";
import { Delaunay } from "d3-delaunay";
import { Cookie, X } from "lucide-react";

interface DestructibleCookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
  title?: string;
  description?: string;
  acceptText?: string;
  declineText?: string;
}

export function DestructibleCookieConsent({
  onAccept,
  onDecline,
  title = "We use cookies",
  description = "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept', you consent to our use of cookies.",
  acceptText = "Accept All",
  declineText = "Decline",
}: DestructibleCookieConsentProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDestroying, setIsDestroying] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const handleAccept = async () => {
    console.log("=== BEFORE TRY BLOCK ===");
    
    try {
      console.log("=== handleAccept START ===");
      console.log("modalRef:", modalRef);
      console.log("modalRef.current:", modalRef.current);
      console.log("canvasRef:", canvasRef);
      console.log("canvasRef.current:", canvasRef.current);
      
      if (!modalRef.current || !canvasRef.current) {
        console.error("Refs check failed!");
        console.error("modalRef.current is null:", !modalRef.current);
        console.error("canvasRef.current is null:", !canvasRef.current);
        return;
      }

      console.log("Refs validated, setting isDestroying...");
      setIsDestroying(true);
      console.log("isDestroying set to true");

      console.log("About to call html2canvas...");
      
      // Step 1: Capture the modal as an image
      const canvas = await html2canvas(modalRef.current, {
        backgroundColor: "#ffffff",
        scale: 1,
        logging: true,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          // Ignore elements that might have unsupported CSS
          const style = window.getComputedStyle(element);
          const color = style.color || "";
          const backgroundColor = style.backgroundColor || "";
          const background = style.background || "";
          
          // Check if any color property contains "lab"
          return (
            color.includes("lab") ||
            backgroundColor.includes("lab") ||
            background.includes("lab")
          );
        },
      });

      console.log("html2canvas completed, canvas:", canvas);

      const imageData = canvas.toDataURL("image/png");
      console.log("Image data URL created");
      
      const img = new Image();
      img.src = imageData;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          console.log("Image loaded");
          resolve();
        };
        img.onerror = (e) => {
          console.error("Image load error:", e);
          reject(e);
        };
        setTimeout(() => reject(new Error("Image load timeout")), 5000);
      });

      console.log("Image loaded successfully");

      // Step 2: Hide the DOM modal and show physics canvas
      if (modalRef.current) {
        modalRef.current.style.display = "none";
      }

      if (canvasRef.current) {
        canvasRef.current.style.display = "block";
      }

      // Step 3: Setup Matter.js physics
      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 1, scale: 0.002 },
      });
      engineRef.current = engine;

      const render = Matter.Render.create({
        canvas: canvasRef.current,
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          background: "transparent",
        },
      });
      renderRef.current = render;

      // Step 4: Create screen boundaries
      const wallThickness = 50;
      const walls = [
        // Bottom
        Matter.Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight + wallThickness / 2,
          window.innerWidth,
          wallThickness,
          { isStatic: true, render: { visible: false } }
        ),
        // Left
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight,
          { isStatic: true, render: { visible: false } }
        ),
        // Right
        Matter.Bodies.rectangle(
          window.innerWidth + wallThickness / 2,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight,
          { isStatic: true, render: { visible: false } }
        ),
      ];

      Matter.Composite.add(engine.world, walls);

      // Step 5: Create Voronoi shards
      const modalRect = modalRef.current.getBoundingClientRect();
      const numShards = 15;
      const points: [number, number][] = [];

      // Generate random points for Voronoi
      for (let i = 0; i < numShards; i++) {
        points.push([
          Math.random() * modalRect.width,
          Math.random() * modalRect.height,
        ]);
      }

      // Create Voronoi diagram
      const delaunay = Delaunay.from(points);
      const voronoi = delaunay.voronoi([0, 0, modalRect.width, modalRect.height]);

      const shards: Matter.Body[] = [];

      // Create physics bodies for each Voronoi cell
      for (let i = 0; i < numShards; i++) {
        const cell = voronoi.cellPolygon(i);
        if (!cell) continue;

        const vertices = cell.map(([x, y]: [number, number]) => ({
          x: modalRect.left + x,
          y: modalRect.top + y,
        }));

        const centerX = vertices.reduce((sum: number, v: { x: number; y: number }) => sum + v.x, 0) / vertices.length;
        const centerY = vertices.reduce((sum: number, v: { x: number; y: number }) => sum + v.y, 0) / vertices.length;

        const body = Matter.Bodies.fromVertices(
          centerX,
          centerY,
          [vertices],
          {
            render: {
              fillStyle: "#ffffff",
              strokeStyle: "#000000",
              lineWidth: 2,
              sprite: {
                texture: imageData,
                xScale: 1,
                yScale: 1,
              },
            },
            restitution: 0.5,
            friction: 0.8,
            density: 0.001,
          },
          true
        );

        shards.push(body);
      }

      Matter.Composite.add(engine.world, shards);

      // Step 6: Apply explosive force from center
      const centerX = modalRect.left + modalRect.width / 2;
      const centerY = modalRect.top + modalRect.height / 2;

      shards.forEach((shard) => {
        const dx = shard.position.x - centerX;
        const dy = shard.position.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = 0.015;

        Matter.Body.applyForce(shard, shard.position, {
          x: (dx / distance) * force,
          y: (dy / distance) * force,
        });

        // Add random rotation
        Matter.Body.setAngularVelocity(shard, (Math.random() - 0.5) * 0.2);
      });

      // Step 7: Start physics simulation
      Matter.Render.run(render);
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // Step 8: Fade out after settling
      setTimeout(() => {
        const fadeInterval = setInterval(() => {
          if (canvasRef.current) {
            const currentOpacity = parseFloat(
              canvasRef.current.style.opacity || "1"
            );
            if (currentOpacity > 0) {
              canvasRef.current.style.opacity = (currentOpacity - 0.05).toString();
            } else {
              clearInterval(fadeInterval);
              setIsVisible(false);
              if (onAccept) onAccept();
            }
          }
        }, 50);
      }, 3000);
    } catch (error) {
      console.error("=== ERROR CAUGHT ===");
      console.error("Error object:", error);
      console.error("Error type:", typeof error);
      console.error("Error constructor:", error?.constructor?.name);
      
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      
      console.error("Ref states:", {
        modalRefExists: !!modalRef.current,
        canvasRefExists: !!canvasRef.current,
      });
      
      // Fallback: just hide the modal
      console.log("Executing fallback...");
      setIsDestroying(false);
      setIsVisible(false);
      if (onAccept) {
        console.log("Calling onAccept callback");
        onAccept();
      }
    }
  };

  const handleDecline = () => {
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  useEffect(() => {
    return () => {
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Original DOM Modal */}
      <div
        ref={modalRef}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
        style={{ display: isDestroying ? "none" : "block" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8" style={{ willChange: 'transform' }}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef3c7' }}>
              <Cookie className="w-6 h-6" style={{ color: '#d97706' }} />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#111827' }}>{title}</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#4b5563' }}>{description}</p>

              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="px-8 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
                  style={{ 
                    backgroundColor: '#9333ea',
                    border: 'none'
                  }}
                >
                  {acceptText}
                </button>
                <button
                  onClick={handleDecline}
                  className="px-8 py-3 font-semibold rounded-xl transition-all"
                  style={{ 
                    backgroundColor: '#e5e7eb',
                    color: '#1f2937',
                    border: 'none'
                  }}
                >
                  {declineText}
                </button>
              </div>
            </div>

            <button
              onClick={handleDecline}
              className="flex-shrink-0 p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'transparent' }}
            >
              <X className="w-5 h-5" style={{ color: '#6b7280' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ display: "none", opacity: 1 }}
      />
    </>
  );
}

// Pre-configured variants
export function MinimalCookieConsent(props: Partial<DestructibleCookieConsentProps>) {
  return (
    <DestructibleCookieConsent
      title="Cookies"
      description="This site uses cookies for analytics and user experience."
      acceptText="Got it"
      declineText="No thanks"
      {...props}
    />
  );
}

export function DetailedCookieConsent(props: Partial<DestructibleCookieConsentProps>) {
  return (
    <DestructibleCookieConsent
      title="Cookie Policy"
      description="We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking 'Accept', you agree to our website's cookie use as described in our Cookie Policy."
      acceptText="Accept All Cookies"
      declineText="Essential Only"
      {...props}
    />
  );
}

export function PlayfulCookieConsent(props: Partial<DestructibleCookieConsentProps>) {
  return (
    <DestructibleCookieConsent
      title="Nom nom cookies! 🍪"
      description="We promise these cookies won't make you gain weight! They just help us remember you and show you cool stuff. Smash the button to accept!"
      acceptText="SMASH & ACCEPT"
      declineText="No cookies for me"
      {...props}
    />
  );
}
