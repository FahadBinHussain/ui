"use client";

import React, { useState } from "react";
import { FerrofluidMagneticTypography } from "@/components/ui/ferrofluid-typography";

export default function FerrofluidTypographyDemo() {
  const [text, setText] = useState("FERRO");
  const [strength, setStrength] = useState(0.5);
  const [radius, setRadius] = useState(2);
  const [noiseScale, setNoiseScale] = useState(2);
  const [noiseStrength, setNoiseStrength] = useState(0.5);
  const [color, setColor] = useState("#1a1a2e");
  const [spikeColor, setSpikeColor] = useState("#16213e");
  const [backgroundColor, setBackgroundColor] = useState("#0a0a0f");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-white">
            Ferrofluid{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Magnetic Typography
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Large typography that behaves like ferrofluid (magnetic liquid). Letters sprout spikes
            and deform magnetically towards your cursor using GPGPU simulations.
          </p>
        </div>

        {/* Main Demo */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                maxLength={12}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Spike Strength: {strength.toFixed(2)}</label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={strength}
                onChange={(e) => setStrength(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Magnetic Radius: {radius.toFixed(1)}</label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Noise Scale: {noiseScale.toFixed(1)}</label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={noiseScale}
                onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Noise Strength: {noiseStrength.toFixed(2)}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={noiseStrength}
                onChange={(e) => setNoiseStrength(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Base Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Spike Color</label>
              <input
                type="color"
                value={spikeColor}
                onChange={(e) => setSpikeColor(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Background</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/20 relative">
            <FerrofluidMagneticTypography
              text={text}
              strength={strength}
              radius={radius}
              noiseScale={noiseScale}
              noiseStrength={noiseStrength}
              color={color}
              spikeColor={spikeColor}
              backgroundColor={backgroundColor}
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              Move your mouse near the text to create magnetic spikes
            </div>
          </div>
        </div>

        {/* Technical Explanation */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">1. Text Geometry</h3>
                <p>
                  Creates 3D text geometry using Three.js TextGeometry with high vertex density
                  for smooth deformation. Each letter is a mesh with hundreds of vertices.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">2. Mouse Raycasting</h3>
                <p>
                  Tracks mouse position in 3D space using raycasting. The mouse position is
                  projected onto a plane at z=0 to get accurate 3D coordinates.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">3. Vertex Displacement</h3>
                <p>
                  In the vertex shader, each vertex calculates its distance to the mouse. Vertices
                  within the magnetic radius are displaced outward along their normal vector.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">4. Simplex Noise</h3>
                <p>
                  3D Simplex noise is applied to the displacement to create organic, liquid-like
                  spikes rather than uniform geometric protrusions. The noise animates over time.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold text-white">Use Cases</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Hero Sections:</strong> Create stunning landing page
                  headers with interactive, sci-fi typography that responds to user input.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Logo Animations:</strong> Brand logos that come alive
                  with magnetic properties, perfect for tech or science companies.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Music Visualizers:</strong> Sync the spike intensity
                  with audio frequencies for reactive music player interfaces.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Product Launches:</strong> Attention-grabbing product
                  names with futuristic, high-tech aesthetics.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Gaming Interfaces:</strong> Dynamic title screens
                  and menu systems with sci-fi or cyberpunk themes.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Exhibition Displays:</strong> Interactive art
                  installations and museum exhibits with magnetic fluid simulations.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">Implementation</h2>
          <div className="bg-black/50 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`import { FerrofluidMagneticTypography } from "@/components/ui/ferrofluid-typography";

function MyComponent() {
  return (
    <div className="w-full h-screen">
      <FerrofluidMagneticTypography
        text="MAGNETIC"
        strength={0.8}           // Spike intensity (0.1-2)
        radius={2.5}             // Magnetic field radius (0.5-5)
        noiseScale={2}           // Noise frequency (0.5-5)
        noiseStrength={0.5}      // Noise intensity (0-1)
        color="#1a1a2e"          // Base text color
        spikeColor="#16213e"     // Color of magnetic spikes
        metalness={0.8}          // PBR metalness (0-1)
        roughness={0.2}          // PBR roughness (0-1)
        backgroundColor="#0a0a0f"
      />
    </div>
  );
}

// Custom styling
function StyledVersion() {
  return (
    <FerrofluidMagneticTypography
      text="FERROFLUID"
      strength={1.2}
      radius={3}
      color="#ff00ff"
      spikeColor="#00ffff"
      backgroundColor="#000000"
    />
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">Effect Presets</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3 hover:border-white/30 transition-colors cursor-pointer"
              onClick={() => {
                setStrength(0.5);
                setRadius(2);
                setNoiseScale(2);
                setNoiseStrength(0.5);
                setColor("#1a1a2e");
                setSpikeColor("#16213e");
              }}
            >
              <h3 className="text-xl font-bold text-white">Subtle Magnetic</h3>
              <p className="text-sm text-gray-400">
                Gentle spikes with smooth organic movement. Perfect for elegant, professional designs.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3 hover:border-white/30 transition-colors cursor-pointer"
              onClick={() => {
                setStrength(1.2);
                setRadius(3);
                setNoiseScale(3);
                setNoiseStrength(0.8);
                setColor("#0a0a1e");
                setSpikeColor("#1a0a3e");
              }}
            >
              <h3 className="text-xl font-bold text-white">Aggressive Spikes</h3>
              <p className="text-sm text-gray-400">
                Large, dramatic spikes with intense noise. Ideal for sci-fi and action themes.
              </p>
            </div>

            <div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3 hover:border-white/30 transition-colors cursor-pointer"
              onClick={() => {
                setStrength(0.8);
                setRadius(4);
                setNoiseScale(1);
                setNoiseStrength(0.3);
                setColor("#1e1e2e");
                setSpikeColor("#2e2e4e");
              }}
            >
              <h3 className="text-xl font-bold text-white">Wide Field</h3>
              <p className="text-sm text-gray-400">
                Large magnetic radius with smooth, flowing deformation. Great for ambient effects.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">Technical Details</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Shader Features</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Custom vertex shader for displacement</li>
                <li>Distance-based influence calculation</li>
                <li>3D Simplex noise for organic spikes</li>
                <li>Normal-based directional displacement</li>
                <li>Smooth interpolation with smoothstep</li>
                <li>PBR lighting with metalness/roughness</li>
                <li>Color mixing based on displacement</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Performance</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Real-time 60 FPS rendering</li>
                <li>GPU-accelerated displacement</li>
                <li>Efficient raycasting for mouse tracking</li>
                <li>Optimized noise calculations</li>
                <li>Minimal CPU overhead</li>
                <li>Scales well with text complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
