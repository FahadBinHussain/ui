"use client";
import { useState, useEffect } from 'react';

// Simple CSS-based crystal fractal effect
const CSSCrystalFractal = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated crystal-like shapes */}
      <div className="absolute inset-0">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${10 + (i * 11) % 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            <div
              className="w-40 h-40 bg-gradient-to-br from-cyan-400/80 via-blue-500/70 to-purple-600/80 rounded-lg transform rotate-45 blur-sm border-2 border-cyan-300/50 shadow-lg shadow-cyan-400/30"
              style={{
                transform: `rotate(${i * 30}deg) scale(${0.8 + (i % 3) * 0.2})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Fractal-like overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse"
           style={{ animationDelay: '1s' }} />

      {/* Sparkle effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-3 h-3 bg-cyan-200 rounded-full animate-ping shadow-xl shadow-cyan-400/60"
            style={{
              left: `${10 + (i * 11) % 80}%`,
              top: `${10 + (i * 13) % 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${1.5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Additional crystal facets */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={`facet-${i}`}
            className="absolute w-20 h-20 bg-gradient-to-br from-blue-400/60 to-purple-500/60 transform rotate-45 animate-bounce border border-blue-300/40"
            style={{
              left: `${15 + (i * 17) % 70}%`,
              top: `${20 + (i * 19) % 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// WebGL version (if supported)
const WebGLCrystalFractal = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simple WebGL check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setError(true);
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return <CSSCrystalFractal />;
  }

  // For now, just return the CSS version until we get WebGL working
  return <CSSCrystalFractal />;
};

const CrystalFractalBackground = () => {
  return <CSSCrystalFractal />;
};

export default CrystalFractalBackground;