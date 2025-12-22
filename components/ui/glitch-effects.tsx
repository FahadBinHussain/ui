"use client";

import React, { useRef, useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: "low" | "medium" | "high";
  triggerMode?: "hover" | "continuous" | "random";
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "",
  glitchIntensity = "medium",
  triggerMode = "hover",
}) => {
  const [isGlitching, setIsGlitching] = useState(triggerMode === "continuous");
  const [glitchClipId, setGlitchClipId] = useState("");

  useEffect(() => {
    // Generate ID only on client side to avoid hydration mismatch
    setGlitchClipId(`glitch-clip-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  useEffect(() => {
    if (triggerMode === "random") {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }, 2000 + Math.random() * 3000);

      return () => clearInterval(interval);
    }
  }, [triggerMode]);

  const intensityValues = {
    low: { offset: 2, duration: 0.3 },
    medium: { offset: 4, duration: 0.2 },
    high: { offset: 6, duration: 0.15 },
  };

  const { offset, duration } = intensityValues[glitchIntensity];

  // Don't render animation until we have a client-side ID
  if (!glitchClipId) {
    return (
      <span className={`relative inline-block ${className}`}>
        <span className="relative z-10">{text}</span>
      </span>
    );
  }

  return (
    <>
      <style>{`
        @keyframes ${glitchClipId} {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(20% 0 60% 0); }
          20% { clip-path: inset(60% 0 20% 0); }
          30% { clip-path: inset(40% 0 40% 0); }
          40% { clip-path: inset(10% 0 70% 0); }
          50% { clip-path: inset(70% 0 10% 0); }
          60% { clip-path: inset(30% 0 50% 0); }
          70% { clip-path: inset(50% 0 30% 0); }
          80% { clip-path: inset(15% 0 65% 0); }
          90% { clip-path: inset(65% 0 15% 0); }
        }
      `}</style>
      <span
        className={`relative inline-block ${className}`}
        onMouseEnter={() => triggerMode === "hover" && setIsGlitching(true)}
        onMouseLeave={() => triggerMode === "hover" && setIsGlitching(false)}
      >
        <span className="relative z-10">{text}</span>
        
        {/* Red Channel */}
        <span
          className="absolute top-0 left-0 z-0 pointer-events-none"
          style={{
            color: "transparent",
            textShadow: isGlitching ? `${-offset}px 0 red` : "0 0 red",
            transition: `text-shadow ${duration}s ease`,
            ...(isGlitching && {
              animation: `${glitchClipId} ${duration}s steps(5) infinite`,
            }),
          }}
          aria-hidden="true"
        >
          {text}
        </span>
        
        {/* Blue Channel */}
        <span
          className="absolute top-0 left-0 z-0 pointer-events-none"
          style={{
            color: "transparent",
            textShadow: isGlitching ? `${offset}px 0 blue` : "0 0 blue",
            transition: `text-shadow ${duration}s ease`,
            ...(isGlitching && {
              animation: `${glitchClipId} ${duration}s 0.05s steps(5) infinite`,
            }),
          }}
          aria-hidden="true"
        >
          {text}
        </span>
      </span>
    </>
  );
};

// Advanced glitch with full RGB channel separation
interface RGBGlitchTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string;
}

export const RGBGlitchText: React.FC<RGBGlitchTextProps> = ({
  text,
  className = "",
  fontSize = "4rem",
  fontWeight = "900",
}) => {
  return (
    <>
      <style>{`
        @keyframes rgb-glitch {
          0% {
            transform: translate(0);
            clip-path: inset(0 0 0 0);
          }
          10% {
            transform: translate(-5px, 2px);
            clip-path: inset(10% 0 60% 0);
          }
          20% {
            transform: translate(3px, -1px);
            clip-path: inset(60% 0 20% 0);
          }
          30% {
            transform: translate(-2px, 3px);
            clip-path: inset(30% 0 50% 0);
          }
          40% {
            transform: translate(4px, -2px);
            clip-path: inset(70% 0 10% 0);
          }
          50% {
            transform: translate(-3px, 1px);
            clip-path: inset(20% 0 70% 0);
          }
          60% {
            transform: translate(2px, -3px);
            clip-path: inset(50% 0 30% 0);
          }
          70% {
            transform: translate(-4px, 2px);
            clip-path: inset(15% 0 65% 0);
          }
          80% {
            transform: translate(3px, -1px);
            clip-path: inset(65% 0 15% 0);
          }
          90% {
            transform: translate(-2px, 2px);
            clip-path: inset(35% 0 45% 0);
          }
          100% {
            transform: translate(0);
            clip-path: inset(0 0 0 0);
          }
        }

        .rgb-glitch-layer {
          opacity: 0.8;
          animation: rgb-glitch 0.3s infinite;
        }

        .rgb-glitch-red {
          animation-delay: 0s;
        }

        .rgb-glitch-blue {
          animation-delay: 0.1s;
        }
      `}</style>
      <div className={`relative inline-block ${className}`} style={{ fontSize, fontWeight }}>
        {/* Green/Cyan base */}
        <span className="relative z-10 text-cyan-400">{text}</span>
        
        {/* Red channel with pseudo-element for slicing */}
        <span
          className="absolute top-0 left-0 text-red-500 rgb-glitch-layer rgb-glitch-red"
          aria-hidden="true"
        >
          {text}
        </span>
        
        {/* Blue channel with pseudo-element for slicing */}
        <span
          className="absolute top-0 left-0 text-blue-500 rgb-glitch-layer rgb-glitch-blue"
          aria-hidden="true"
        >
          {text}
        </span>
      </div>
    </>
  );
};

// Image glitch effect
interface GlitchImageProps {
  src: string;
  alt: string;
  className?: string;
  triggerMode?: "hover" | "continuous";
}

export const GlitchImage: React.FC<GlitchImageProps> = ({
  src,
  alt,
  className = "",
  triggerMode = "hover",
}) => {
  const [glitchId, setGlitchId] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Generate ID only on client side to avoid hydration mismatch
    const id = `image-glitch-${Math.random().toString(36).substr(2, 9)}`;
    setGlitchId(id);
    
    // Set glitching state after ID is generated for continuous mode
    if (triggerMode === "continuous") {
      setIsGlitching(true);
    }
  }, [triggerMode]);

  // Don't render animations until we have a client-side ID
  if (!glitchId) {
    return (
      <div className={`relative inline-block overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="relative z-10 w-full h-full object-cover block" />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes ${glitchId}-red {
          0%, 100% {
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
          20% {
            transform: translate(-5px, 0);
            clip-path: inset(15% 0 65% 0);
          }
          40% {
            transform: translate(-3px, 0);
            clip-path: inset(60% 0 20% 0);
          }
          60% {
            transform: translate(-4px, 0);
            clip-path: inset(35% 0 45% 0);
          }
          80% {
            transform: translate(-6px, 0);
            clip-path: inset(10% 0 70% 0);
          }
        }

        @keyframes ${glitchId}-cyan {
          0%, 100% {
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
          20% {
            transform: translate(5px, 0);
            clip-path: inset(60% 0 20% 0);
          }
          40% {
            transform: translate(4px, 0);
            clip-path: inset(20% 0 60% 0);
          }
          60% {
            transform: translate(6px, 0);
            clip-path: inset(45% 0 35% 0);
          }
          80% {
            transform: translate(3px, 0);
            clip-path: inset(70% 0 10% 0);
          }
        }

        .${glitchId}-active-red {
          animation: ${glitchId}-red 0.3s infinite;
        }

        .${glitchId}-active-cyan {
          animation: ${glitchId}-cyan 0.3s infinite;
        }
      `}</style>
      <div
        className={`relative inline-block overflow-hidden ${className}`}
        onMouseEnter={() => triggerMode === "hover" && setIsGlitching(true)}
        onMouseLeave={() => triggerMode === "hover" && setIsGlitching(false)}
      >
        {/* Original image - reduce opacity when glitching */}
        <img 
          src={src} 
          alt={alt} 
          className="relative z-10 w-full h-full object-cover block" 
          style={{
            opacity: isGlitching ? 0.6 : 1,
          }}
        />
        
        {/* Red channel */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-20 ${
            isGlitching ? `${glitchId}-active-red` : ""
          }`}
          style={{
            mixBlendMode: "lighten",
            filter: "sepia(1) hue-rotate(-50deg) saturate(5) contrast(1.5)",
            opacity: isGlitching ? 1 : 0,
            transition: isGlitching ? "none" : "opacity 0.3s ease",
          }}
        />
        
        {/* Cyan/Blue channel */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-20 ${
            isGlitching ? `${glitchId}-active-cyan` : ""
          }`}
          style={{
            mixBlendMode: "lighten",
            filter: "sepia(1) hue-rotate(130deg) saturate(5) contrast(1.5)",
            opacity: isGlitching ? 1 : 0,
            transition: isGlitching ? "none" : "opacity 0.3s ease",
          }}
        />
      </div>
    </>
  );
};

// Cyberpunk button with glitch effect
interface GlitchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GlitchButton: React.FC<GlitchButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes button-glitch {
          0%, 100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); }
          25% { transform: translate(-3px, 1px); clip-path: inset(40% 0 40% 0); }
          50% { transform: translate(3px, -1px); clip-path: inset(20% 0 60% 0); }
          75% { transform: translate(-2px, 2px); clip-path: inset(60% 0 20% 0); }
        }

        .glitch-button-layer {
          animation: button-glitch 0.2s infinite;
          opacity: 0.7;
          pointer-events: none;
        }
      `}</style>
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-lg overflow-hidden transition-colors hover:text-black ${className}`}
      >
        {/* Background that slides in */}
        <span
          className="absolute inset-0 bg-cyan-400 transition-transform duration-300"
          style={{
            transform: isHovered ? "translateX(0)" : "translateX(-100%)",
          }}
        />
        
        {/* Text with glitch */}
        <span className="relative z-10">{children}</span>
        
        {/* Glitch layers */}
        {isHovered && (
          <>
            <span
              className="absolute inset-0 flex items-center justify-center text-red-500 glitch-button-layer"
              aria-hidden="true"
            >
              {children}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center text-blue-500 glitch-button-layer"
              style={{ animationDelay: "0.05s" }}
              aria-hidden="true"
            >
              {children}
            </span>
          </>
        )}
      </button>
    </>
  );
};

// Glitch card with digital chaos effect
interface GlitchCardProps {
  title: string;
  description: string;
  className?: string;
}

export const GlitchCard: React.FC<GlitchCardProps> = ({
  title,
  description,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
      <div
        className={`relative bg-slate-900 border-2 border-cyan-500/50 p-8 overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scanline effect */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, transparent 1px, transparent 2px, rgba(0,255,255,0.03) 3px)",
              animation: "scanline 8s linear infinite",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">
            {isHovered ? <RGBGlitchText text={title} fontSize="2rem" fontWeight="700" /> : <span className="text-cyan-400">{title}</span>}
          </h3>
          <p className="text-slate-300">{description}</p>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-magenta-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-magenta-500" />
      </div>
    </>
  );
};

// Data corruption text effect
interface CorruptTextProps {
  text: string;
  className?: string;
}

export const CorruptText: React.FC<CorruptTextProps> = ({
  text,
  className = "",
}) => {
  const [corruptedText, setCorruptedText] = useState(text);
  const originalText = useRef(text);

  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let frame = 0;

    const interval = setInterval(() => {
      setCorruptedText(
        originalText.current
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            if (Math.random() < 0.1 && frame % 3 === 0) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join("")
      );
      
      frame++;
      
      // Occasionally restore original
      if (frame % 30 === 0) {
        setCorruptedText(originalText.current);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`font-mono ${className}`}>
      {corruptedText}
    </span>
  );
};
