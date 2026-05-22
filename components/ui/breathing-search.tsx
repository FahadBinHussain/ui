"use client";

import React, { useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";

interface BreathingSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  urgentStyle?: React.CSSProperties;
  exploratoryStyle?: React.CSSProperties;
}

export const BreathingSearch: React.FC<BreathingSearchProps> = ({
  placeholder = "Type to search...",
  onSearch,
  className = "",
  minWeight = 200,
  maxWeight = 900,
  urgentStyle = {},
  exploratoryStyle = {},
}) => {
  const [value, setValue] = useState("");
  const [fontWeight, setFontWeight] = useState(minWeight);
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">("normal");
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [caretPosition, setCaretPosition] = useState({ x: 0, y: 0 });
  const [fluidTrail, setFluidTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastKeyTime = useRef(Date.now());
  const trailIdCounter = useRef(0);

  // Track typing speed
  useEffect(() => {
    const decayTimers = new Set<number>();

    const handleKeyPress = () => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastKeyTime.current;

      // Calculate typing speed (lower timeDiff = faster typing)
      const speed = Math.max(0, 1 - timeDiff / 500); // Normalize to 0-1
      setTypingSpeed(speed);

      // Map speed to font weight
      // Fast typing (speed close to 1) = bold/italic (urgent)
      // Slow typing (speed close to 0) = thin (exploratory)
      const weight = minWeight + speed * (maxWeight - minWeight);
      setFontWeight(weight);

      // Set italic for fast typing (>0.6 speed)
      setFontStyle(speed > 0.6 ? "italic" : "normal");

      lastKeyTime.current = currentTime;

      // Decay speed over time
      const decayTimer = window.setTimeout(() => {
        setTypingSpeed((prev) => Math.max(0, prev - 0.1));
        setFontWeight((prev) => Math.max(minWeight, prev - 50));
        setFontStyle("normal");
        decayTimers.delete(decayTimer);
      }, 300);
      decayTimers.add(decayTimer);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      decayTimers.forEach(clearTimeout);
    };
  }, [minWeight, maxWeight]);

  // Track caret position and create fluid trail
  useEffect(() => {
    if (!inputRef.current) return;
    const trailTimers = new Set<number>();

    const updateCaretPosition = () => {
      const input = inputRef.current;
      if (!input) return;
      let span: HTMLSpanElement | null = null;

      // Create a temporary span to measure text width
      try {
        span = document.createElement("span");
        span.style.font = window.getComputedStyle(input).font;
        span.style.fontSize = window.getComputedStyle(input).fontSize;
        span.style.fontWeight = String(fontWeight);
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.textContent = value.substring(0, input.selectionStart || 0);
        document.body.appendChild(span);

        const rect = input.getBoundingClientRect();
        const textWidth = span.offsetWidth;

        // Calculate caret position
        const x = rect.left + textWidth + 20; // 20px padding
        const y = rect.top + rect.height / 2;

        setCaretPosition({ x, y });

        // Add to fluid trail
        if (value.length > 0) {
          const newTrail = {
            x,
            y,
            id: trailIdCounter.current++,
          };

          setFluidTrail((prev) => {
            const updated = [...prev, newTrail];
            // Keep only last 15 positions
            return updated.slice(-15);
          });

          // Remove trail after animation
          const trailTimer = window.setTimeout(() => {
            setFluidTrail((prev) => prev.filter((t) => t.id !== newTrail.id));
            trailTimers.delete(trailTimer);
          }, 1000);
          trailTimers.add(trailTimer);
        }
      } finally {
        span?.remove();
      }
    };

    updateCaretPosition();

    return () => {
      trailTimers.forEach(clearTimeout);
    };
  }, [value, fontWeight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Fluid Cursor Trails */}
      {fluidTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="pointer-events-none absolute"
          style={{
            left: trail.x,
            top: trail.y,
            width: 20 - index * 0.5,
            height: 20 - index * 0.5,
            transform: "translate(-50%, -50%)",
            animation: "fluidPulse 1s ease-out forwards",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle,
                rgba(139, 92, 246, ${0.6 - index * 0.04}) 0%,
                rgba(59, 130, 246, ${0.4 - index * 0.03}) 50%,
                transparent 100%)`,
              filter: "blur(8px)",
            }}
          />
        </div>
      ))}

      {/* Main Search Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black rounded-3xl border border-gray-800 overflow-hidden">
        {/* Animated Background Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "gridPulse 3s ease-in-out infinite",
          }}
        />

        {/* Speed Indicator */}
        <div className="absolute top-8 right-8 flex items-center gap-3 text-gray-400 text-sm font-mono">
          <div className="flex flex-col items-end">
            <span className="text-xs opacity-60">TYPING MODE</span>
            <span
              className="text-lg font-bold transition-all duration-200"
              style={{
                color: typingSpeed > 0.6 ? "#ef4444" : typingSpeed > 0.3 ? "#f59e0b" : "#10b981",
              }}
            >
              {typingSpeed > 0.6 ? "URGENT" : typingSpeed > 0.3 ? "MODERATE" : "EXPLORATORY"}
            </span>
          </div>
          <div className="w-2 h-20 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 transition-all duration-200 rounded-full"
              style={{
                height: `${typingSpeed * 100}%`,
                transform: "translateY(100%)",
                animation: `slideUp 0.3s ease-out forwards`,
              }}
            />
          </div>
        </div>

        {/* Font Weight Indicator */}
        <div className="absolute bottom-8 left-8 text-gray-500 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-200 rounded-full"
                style={{
                  width: `${((fontWeight - minWeight) / (maxWeight - minWeight)) * 100}%`,
                }}
              />
            </div>
            <span>WEIGHT: {Math.round(fontWeight)}</span>
          </div>
        </div>

        {/* Search Icon */}
        <div
          className="absolute left-8 transition-all duration-300"
          style={{
            transform: `scale(${1 + typingSpeed * 0.3})`,
            opacity: 0.3 + typingSpeed * 0.4,
          }}
        >
          <Search
            size={48}
            className="text-violet-500"
            strokeWidth={1 + typingSpeed * 2}
          />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none text-white px-24 text-center transition-all duration-200"
          style={{
            fontSize: "clamp(2rem, 8vw, 6rem)",
            fontWeight: fontWeight,
            fontStyle: fontStyle,
            letterSpacing: typingSpeed > 0.5 ? "-0.02em" : "0.02em",
            fontFamily: '"Inter", system-ui, sans-serif',
            textShadow:
              typingSpeed > 0.6
                ? "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)"
                : "none",
          }}
        />

        {/* Placeholder hint */}
        {!value && (
          <div className="absolute bottom-16 text-center text-gray-600 text-sm font-mono animate-pulse">
            <p>Type fast for urgent • Type slow for exploratory</p>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fluidPulse {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
