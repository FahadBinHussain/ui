"use client";

import { HolographicDepthParallax } from "@/components/ui/holographic-depth-parallax";
import { motion } from "framer-motion";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";

export function HolographicDepthParallaxDemo() {
  const [strength, setStrength] = useState(0.1);

  // Sample images - in a real app, you'd use actual color and depth map images
  const colorImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"; // Mountain landscape
  const depthImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=-100&bri=50"; // Simulated depth map (grayscale version)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Holographic Depth-Map Parallax
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Using a static 2D image and grayscale depth map, this component creates a realistic
            "looking through a window" effect. Move your mouse to see the parallax distortion
            that reveals what's "behind" foreground objects.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <div className="text-center mb-8">
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-slate-600/50">
              <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <HolographicDepthParallax
                  colorImage={colorImage}
                  depthImage={depthImage}
                  strength={strength}
                />
              </Canvas>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-slate-300 font-medium">Parallax Strength:</label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={strength}
                onChange={(e) => setStrength(parseFloat(e.target.value))}
                className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-cyan-400 font-mono text-sm">{strength.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Features</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• WebGL shader-based rendering</li>
                <li>• Real-time mouse coordinate interpolation</li>
                <li>• Depth-map driven parallax displacement</li>
                <li>• Configurable parallax strength</li>
                <li>• Holographic animation overlay</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Requirements</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Color image texture</li>
                <li>• Grayscale depth map texture</li>
                <li>• WebGL capable browser</li>
                <li>• React Three Fiber setup</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}