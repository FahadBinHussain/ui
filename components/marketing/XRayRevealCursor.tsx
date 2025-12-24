"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Zap, Database, Terminal, Cpu } from "lucide-react";

export default function XRayRevealCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const wireframeLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Normal Layer (Bottom) */}
      <div className="absolute inset-0 z-10">
        <NormalContent />
      </div>

      {/* Wireframe Layer (Top) with circular reveal */}
      <motion.div
        ref={wireframeLayerRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: `circle(200px at ${mousePosition.x}px ${mousePosition.y}px)`,
        }}
      >
        <WireframeContent />
        
        {/* Glass rim effect */}
        <div
          className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 210,
            top: mousePosition.y - 210,
            border: "3px solid rgba(0, 255, 136, 0.4)",
            boxShadow: "0 0 40px rgba(0, 255, 136, 0.3), inset 0 0 40px rgba(0, 255, 136, 0.2)",
            background: "radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Cursor indicator */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-green-400 pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          boxShadow: "0 0 20px rgba(0, 255, 136, 0.8)",
        }}
      />

      {/* Instructions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 text-white text-sm">
        <p>Move your cursor to reveal the X-Ray wireframe view</p>
      </div>
    </div>
  );
}

// Normal styled content
function NormalContent() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Beautiful Design
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            A stunning, polished interface with smooth gradients and elegant typography.
            Move your cursor to see what's underneath.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-2xl">
            Get Started
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Fast", desc: "Lightning quick performance" },
            { icon: Layers, title: "Modular", desc: "Component-based architecture" },
            { icon: Database, title: "Scalable", desc: "Grows with your needs" },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Wireframe/X-Ray content
function WireframeContent() {
  return (
    <div className="h-full w-full bg-black flex items-center justify-center wireframe-layer">
      <style jsx>{`
        .wireframe-layer * {
          border: 1px solid #00ff88 !important;
          color: #00ff88 !important;
          background: transparent !important;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.3) !important;
        }
        .wireframe-layer {
          font-family: 'Courier New', monospace;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-8">
        {/* Hero Section - Wireframe */}
        <div className="text-center mb-16 border-2 border-green-400 p-8">
          <div className="relative">
            <Code2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h1 className="text-7xl font-mono font-bold text-green-400 mb-6">
              &lt;h1&gt; Beautiful Design &lt;/h1&gt;
            </h1>
            <div className="text-xs text-green-400/70 mb-4">
              <code>container max-w-5xl mx-auto px-8</code>
            </div>
          </div>
          
          <p className="text-lg text-green-400 mb-8 max-w-2xl mx-auto font-mono border border-green-400 p-4">
            &lt;p className="text-xl"&gt; A stunning, polished interface... &lt;/p&gt;
          </p>
          
          <button className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-full font-mono text-lg relative">
            &lt;button&gt; Get Started &lt;/button&gt;
            <span className="absolute -top-6 left-0 text-xs text-green-400/70">
              .bg-gradient-to-r .from-purple-500
            </span>
          </button>

          <Terminal className="absolute top-4 right-4 w-6 h-6 text-green-400/50" />
        </div>

        {/* Feature Cards - Wireframe */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Fast", desc: "Lightning quick", id: "card-1" },
            { icon: Layers, title: "Modular", desc: "Component-based", id: "card-2" },
            { icon: Database, title: "Scalable", desc: "Grows with needs", id: "card-3" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="border-2 border-green-400 rounded-3xl p-8 relative"
            >
              <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-green-400/70">
                {feature.id}
              </div>
              <feature.icon className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-mono font-bold text-green-400 mb-2">
                &lt;h3&gt;{feature.title}&lt;/h3&gt;
              </h3>
              <p className="text-green-400/80 font-mono text-sm">
                &lt;p&gt;{feature.desc}&lt;/p&gt;
              </p>
              <Cpu className="absolute bottom-4 right-4 w-4 h-4 text-green-400/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
