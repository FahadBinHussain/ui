"use client";

import React, { useState } from "react";
import { ClothTypography } from "@/components/ui/cloth-typography";
import { Wind, Type, Waves, Flag } from "lucide-react";

export default function ClothTypographyDemo() {
  const [windStrength, setWindStrength] = useState(0.3);
  const [gravity, setGravity] = useState(0.98);
  const [customText, setCustomText] = useState("CLOTH");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Cloth-Simulated Typography
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Text that <span className="text-cyan-400">acts like a hanging flag or cloth</span>, 
              reacting to wind and cursor movements with realistic physics.
            </p>
          </div>

          {/* Main Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  Interactive Cloth Text
                </h3>
                <p className="text-slate-400">
                  Move your mouse to interact with the cloth. The text sways with wind and responds to your cursor
                </p>
              </div>
              
              <div className="w-full h-[500px] bg-slate-950/50 rounded-xl border border-slate-700/50 overflow-hidden">
                <ClothTypography
                  text={customText}
                  fontSize={140}
                  windStrength={windStrength}
                  gravity={gravity}
                  textColor="#60a5fa"
                  backgroundColor="transparent"
                />
              </div>

              {/* Controls */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Type className="inline-block w-4 h-4 mr-1" />
                    Text
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase().slice(0, 15))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter text..."
                  />
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Wind className="inline-block w-4 h-4 mr-1" />
                    Wind Strength: {windStrength.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={windStrength}
                    onChange={(e) => setWindStrength(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Waves className="inline-block w-4 h-4 mr-1" />
                    Gravity: {gravity.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={gravity}
                    onChange={(e) => setGravity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Examples Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Different Styles</h2>
            <p className="text-slate-400 text-lg">
              Various configurations for different effects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-cyan-400">Gentle Breeze</h3>
                <p className="text-sm text-slate-400">Low wind, normal gravity</p>
              </div>
              <div className="w-full h-[300px]">
                <ClothTypography
                  text="HELLO"
                  fontSize={100}
                  windStrength={0.15}
                  gravity={0.98}
                  textColor="#22d3ee"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-blue-400">Strong Wind</h3>
                <p className="text-sm text-slate-400">High wind, normal gravity</p>
              </div>
              <div className="w-full h-[300px]">
                <ClothTypography
                  text="WAVE"
                  fontSize={100}
                  windStrength={0.6}
                  gravity={0.98}
                  textColor="#3b82f6"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-purple-400">Zero Gravity</h3>
                <p className="text-sm text-slate-400">Medium wind, low gravity</p>
              </div>
              <div className="w-full h-[300px]">
                <ClothTypography
                  text="FLOAT"
                  fontSize={100}
                  windStrength={0.3}
                  gravity={0.5}
                  textColor="#a855f7"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-pink-400">Heavy Cloth</h3>
                <p className="text-sm text-slate-400">Low wind, high gravity</p>
              </div>
              <div className="w-full h-[300px]">
                <ClothTypography
                  text="HEAVY"
                  fontSize={100}
                  windStrength={0.2}
                  gravity={1.3}
                  textColor="#ec4899"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Implementation</h2>
            <p className="text-slate-400 text-lg">
              The physics and rendering behind cloth typography
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                1. Canvas Text Rendering
              </h3>
              <p className="text-slate-300">
                Text is first rendered to an HTML Canvas 2D context with customizable font, 
                size, and color. This canvas becomes the texture for the 3D mesh.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                2. Three.js Plane Geometry
              </h3>
              <p className="text-slate-300">
                The canvas texture is mapped onto a Three.js PlaneGeometry with a high-resolution 
                grid (40×20 segments). Each vertex in the grid becomes a physics point.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                3. Verlet Integration
              </h3>
              <p className="text-slate-300">
                Each point stores its current and previous position. Velocity is implicit: 
                <code className="text-pink-400 ml-1">velocity = position - previousPosition</code>. 
                This creates stable, physics-based motion.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">
                4. Constraint Satisfaction
              </h3>
              <p className="text-slate-300">
                "Sticks" connect adjacent points. After forces are applied, the system iteratively 
                adjusts points to maintain correct distances, creating cloth-like behavior.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                5. Wind Simulation
              </h3>
              <p className="text-slate-300">
                Sine waves modulate the X and Z coordinates of points over time, creating 
                organic, flowing wind patterns. Mouse velocity adds interactive disturbances.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                6. Pinned Points
              </h3>
              <p className="text-slate-300">
                The top row of points is "pinned" (fixed in space), creating the hanging cloth 
                effect where only the bottom portion moves freely.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Key Parameters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <span className="text-cyan-400 font-mono text-sm">gridX/Y</span>
                <p className="text-xs text-slate-400 mt-1">Resolution of cloth mesh</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <span className="text-blue-400 font-mono text-sm">spacing</span>
                <p className="text-xs text-slate-400 mt-1">Distance between points</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <span className="text-purple-400 font-mono text-sm">iterations</span>
                <p className="text-xs text-slate-400 mt-1">Constraint solving steps</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg">
                <span className="text-pink-400 font-mono text-sm">damping</span>
                <p className="text-xs text-slate-400 mt-1">Energy loss per frame</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Creative Applications</h2>
            <p className="text-slate-400 text-lg">
              Where to use cloth-simulated typography
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400">Hero Sections</h3>
              </div>
              <p className="text-slate-300">
                Create unforgettable first impressions with animated typography that immediately 
                engages visitors and demonstrates technical sophistication.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-400">Brand Identity</h3>
              </div>
              <p className="text-slate-300">
                Use for logo animations, brand names, or taglines that need to feel organic, 
                fluid, and memorable. Perfect for fashion and creative industries.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-400">Event Promotions</h3>
              </div>
              <p className="text-slate-300">
                Make event titles, dates, or announcements stand out with dynamic motion 
                that captures attention in crowded digital spaces.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pink-400">Interactive Art</h3>
              </div>
              <p className="text-slate-300">
                Create generative art installations or portfolio pieces where viewers can 
                interact with typography as if it were a physical object.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Notes Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/30 p-8">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">⚡ Performance Considerations</h3>
            <div className="space-y-3 text-slate-300">
              <p>
                • <strong>Grid Resolution:</strong> Higher resolution (more segments) creates smoother cloth 
                but requires more computation. Balance visual quality with frame rate.
              </p>
              <p>
                • <strong>Multiple Instances:</strong> Each cloth simulation runs independently. 
                Limit to 2-3 visible instances on mobile devices.
              </p>
              <p>
                • <strong>Text Complexity:</strong> Shorter text with bold fonts works best. 
                Very detailed or thin text may not deform visibly enough.
              </p>
              <p>
                • <strong>Canvas Size:</strong> Use power-of-2 texture sizes (512, 1024, 2048) 
                for optimal GPU performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
