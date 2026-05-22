"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

interface ScratchCardProps {
  prize: React.ReactNode;
  scratchColor?: string;
  scratchTexture?: string;
  brushSize?: number;
  revealThreshold?: number; // 0-1, percentage of area to scratch before auto-reveal
  enableAutoReveal?: boolean; // Toggle auto-reveal feature
  onReveal?: () => void;
  className?: string;
}

export function ScratchCard({
  prize,
  scratchColor = "#cccccc",
  scratchTexture,
  brushSize = 30,
  revealThreshold = 0.7,
  enableAutoReveal = false, // Disabled by default
  onReveal,
  className = "",
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const scratchedPixelsRef = useRef(0);
  const totalPixelsRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size to match container - use ResizeObserver for proper sizing
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width || 400; // Fallback dimensions
      canvas.height = rect.height || 300;

      totalPixelsRef.current = canvas.width * canvas.height;

      // Redraw scratch layer after resize
      drawScratchLayer(ctx, canvas.width, canvas.height);
    };

    // Initial sizing
    updateCanvasSize();

    // Watch for resize
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [scratchColor, scratchTexture]);

  const drawScratchLayer = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Fill canvas with scratch-off layer
    if (scratchTexture) {
      const img = new Image();
      img.src = scratchTexture;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
      };
    } else {
      // Solid color with noise texture
      ctx.fillStyle = scratchColor;
      ctx.fillRect(0, 0, width, height);

      // Add texture
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1;
    }

    // Add "SCRATCH HERE" text
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH HERE", width / 2, height / 2);
    ctx.restore();
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    // Set composite mode to erase
    ctx.globalCompositeOperation = "destination-out";

    // Draw eraser circle
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, brushSize, 0, Math.PI * 2);
    ctx.fill();

    // Reset composite mode
    ctx.globalCompositeOperation = "source-over";

    // More accurate calculation - only add if not already scratched
    // Use smaller increment to avoid over-counting
    const area = Math.PI * brushSize * brushSize * 0.5;
    scratchedPixelsRef.current += area;

    // Check threshold only if auto-reveal is enabled
    if (
      enableAutoReveal &&
      scratchedPixelsRef.current > totalPixelsRef.current * revealThreshold
    ) {
      revealAll();
    }
  };

  const revealAll = () => {
    if (isRevealed) return;

    setIsRevealed(true);
    if (onReveal) onReveal();

    // Fade out canvas
    gsap.to(canvasRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isScratching) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full ${className}`}
      style={{ cursor: isScratching ? "grabbing" : "grab", minHeight: "200px" }}
    >
      {/* Prize Layer */}
      <div className="absolute inset-0 w-full h-full">{prize}</div>

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ display: "block" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}

// Preset variant for coupons
export function ScratchCoupon({
  code,
  discount,
  className = "",
  onReveal,
  enableAutoReveal = false,
}: {
  code: string;
  discount: string;
  className?: string;
  onReveal?: () => void;
  enableAutoReveal?: boolean;
}) {
  return (
    <ScratchCard
      prize={
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 flex flex-col items-center justify-center p-8 text-white">
          <div className="text-center">
            <h3 className="text-6xl font-bold mb-4">{discount}</h3>
            <p className="text-2xl mb-6">OFF YOUR ORDER!</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-white border-dashed">
              <p className="text-sm font-semibold mb-1">PROMO CODE</p>
              <p className="text-3xl font-bold tracking-wider">{code}</p>
            </div>
          </div>
        </div>
      }
      scratchColor="#999999"
      brushSize={40}
      revealThreshold={0.75}
      enableAutoReveal={enableAutoReveal}
      onReveal={onReveal}
      className={className}
    />
  );
}

// Preset variant for gift reveals
export function ScratchGift({
  image,
  title,
  description,
  className = "",
  onReveal,
  enableAutoReveal = false,
}: {
  image?: string;
  title: string;
  description: string;
  className?: string;
  onReveal?: () => void;
  enableAutoReveal?: boolean;
}) {
  return (
    <ScratchCard
      prize={
        <div
          className="w-full h-full flex flex-col items-center justify-center p-8 text-white"
          style={{
            background: image
              ? `url(${image}) center/cover`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="text-center bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-5xl font-bold mb-4">🎉</h3>
            <h3 className="text-4xl font-bold mb-3">{title}</h3>
            <p className="text-xl text-gray-200">{description}</p>
          </div>
        </div>
      }
      scratchColor="#cccccc"
      brushSize={35}
      revealThreshold={0.75}
      enableAutoReveal={enableAutoReveal}
      onReveal={onReveal}
      className={className}
    />
  );
}

// Preset variant for mystery boxes
export function ScratchMystery({
  prize,
  scratchTexture,
  className = "",
  onReveal,
  enableAutoReveal = false,
}: {
  prize: React.ReactNode;
  scratchTexture?: string;
  className?: string;
  onReveal?: () => void;
  enableAutoReveal?: boolean;
}) {
  return (
    <ScratchCard
      prize={prize}
      scratchColor="#1a1a2e"
      scratchTexture={scratchTexture}
      brushSize={45}
      revealThreshold={0.8}
      enableAutoReveal={enableAutoReveal}
      onReveal={onReveal}
      className={className}
    />
  );
}
