"use client";

import React, { useState } from "react";
import { GlassmorphismRefraction, glassPresets } from "@/components/ui/glassmorphism-refraction";
import * as THREE from "three";

export default function GlassmorphismRefractionDemo() {
  const [preset, setPreset] = useState<keyof typeof glassPresets>("window");
  const [animateBackground, setAnimateBackground] = useState(true);
  const [glassGeometry, setGlassGeometry] = useState<"plane" | "sphere" | "box" | "torus">("sphere");
  const [layerCount, setLayerCount] = useState(1);

  // Background scene with colorful elements
  const backgroundElements = (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
      
      {/* Animated rotating boxes */}
      {animateBackground && (
        <>
          <mesh position={[-2, 1, -2]} rotation={[0, Date.now() * 0.001, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff6b6b" metalness={0.7} roughness={0.2} />
          </mesh>
          
          <mesh position={[2, -1, -2]} rotation={[Date.now() * 0.001, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4ecdc4" metalness={0.7} roughness={0.2} />
          </mesh>
          
          <mesh position={[0, 0, -3]}>
            <torusGeometry args={[1, 0.3, 16, 100]} />
            <meshStandardMaterial color="#ffe66d" metalness={0.8} roughness={0.1} />
          </mesh>
        </>
      )}
      
      {/* Static colorful spheres */}
      <mesh position={[-1.5, 0.5, -1.5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#a8e6cf" metalness={0.5} roughness={0.3} />
      </mesh>
      
      <mesh position={[1.5, -0.5, -1.5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ff8b94" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Grid floor */}
      <gridHelper args={[10, 10, "#666666", "#444444"]} position={[0, -2, 0]} />
    </>
  );

  // Generate glass layers based on count
  const generateGlassLayers = () => {
    const layers = [];
    const spacing = 0.5;
    
    for (let i = 0; i < layerCount; i++) {
      layers.push({
        position: [0, 0, i * spacing] as [number, number, number],
        rotation: glassGeometry === "plane" ? [0, 0, 0] as [number, number, number] : [0, Date.now() * 0.0005 * (i + 1), 0] as [number, number, number],
        scale: [2, 2, 2] as [number, number, number],
        geometry: glassGeometry,
        ...glassPresets[preset],
      });
    }
    
    return layers;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-white">
            Multi-Layer{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Glassmorphism
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time refraction with Frame Buffer Objects. Glass that actually magnifies and distorts
            content behind it using PBR shading and UV displacement.
          </p>
        </div>

        {/* Main Demo */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Glass Preset</label>
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value as keyof typeof glassPresets)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="window">Window Glass</option>
                <option value="crystal">Crystal</option>
                <option value="water">Water</option>
                <option value="magnifyingGlass">Magnifying Glass</option>
                <option value="frostedGlass">Frosted Glass</option>
                <option value="coloredGlass">Colored Glass</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Geometry</label>
              <select
                value={glassGeometry}
                onChange={(e) => setGlassGeometry(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="plane">Plane</option>
                <option value="sphere">Sphere</option>
                <option value="box">Box</option>
                <option value="torus">Torus</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Layers: {layerCount}</label>
              <input
                type="range"
                min="1"
                max="5"
                value={layerCount}
                onChange={(e) => setLayerCount(parseInt(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setAnimateBackground(!animateBackground)}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                {animateBackground ? "Pause" : "Animate"} Background
              </button>
            </div>
          </div>

          <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/20">
            <GlassmorphismRefraction
              backgroundElements={backgroundElements}
              glassLayers={generateGlassLayers()}
              cameraPosition={[0, 0, 5]}
              cameraFov={75}
            />
          </div>
        </div>

        {/* Technical Explanation */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">1. Frame Buffer Object (FBO)</h3>
                <p>
                  The background scene is rendered to an off-screen texture using WebGL render targets.
                  This texture becomes the "content behind the glass."
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">2. UV Distortion</h3>
                <p>
                  The glass shader samples the background texture with modified UV coordinates based on
                  the surface normal, thickness, and Index of Refraction (IOR). This creates realistic
                  magnification and distortion.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">3. Fresnel &amp; Refraction</h3>
                <p>
                  Uses Snell's law to calculate refraction direction. Fresnel effect makes edges more
                  reflective at grazing angles, just like real glass.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">4. PBR Specular</h3>
                <p>
                  Physically-based rendering adds sharp white highlights based on roughness and light
                  direction, creating the glossy glass surface appearance.
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
                  <strong className="text-white">Product Showcases:</strong> Display products behind
                  realistic glass containers or displays with proper refraction.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Magnifying Effects:</strong> Create interactive
                  magnifying glass tools for images or documents.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">UI Elements:</strong> Premium glass cards and panels
                  that realistically distort content behind them.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Water Effects:</strong> Simulate water surfaces or
                  underwater views with proper light refraction.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Crystal Visualization:</strong> Render precious stones
                  with high IOR for jewelry websites.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Layered Interfaces:</strong> Stack multiple glass
                  layers for depth and visual interest in 3D UIs.
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
              <code>{`import { GlassmorphismRefraction, glassPresets } from "@/components/ui/glassmorphism-refraction";

function MyComponent() {
  // Define your background 3D scene
  const backgroundElements = (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
    </>
  );

  // Configure glass layers
  const glassLayers = [
    {
      position: [0, 0, 0],
      scale: [2, 2, 2],
      geometry: "sphere",
      ...glassPresets.magnifyingGlass, // Use preset
    },
    {
      position: [1, 0, 0.5],
      scale: [1.5, 1.5, 1.5],
      geometry: "plane",
      refractionStrength: 0.15, // Or customize
      thickness: 0.8,
      ior: 1.52,
      specularIntensity: 1.2,
      roughness: 0.05,
      tint: [1, 0.9, 0.9],
      opacity: 0.9,
    },
  ];

  return (
    <div className="w-full h-screen">
      <GlassmorphismRefraction
        backgroundElements={backgroundElements}
        glassLayers={glassLayers}
        cameraPosition={[0, 0, 5]}
        cameraFov={75}
      />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* Preset Showcase */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">Glass Presets</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(glassPresets).map(([name, config]) => (
              <div
                key={name}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3 hover:border-white/30 transition-colors cursor-pointer"
                onClick={() => setPreset(name as keyof typeof glassPresets)}
              >
                <h3 className="text-xl font-bold text-white capitalize">
                  {name.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>IOR:</span>
                    <span className="text-white">{config.ior}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refraction:</span>
                    <span className="text-white">{config.refractionStrength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Roughness:</span>
                    <span className="text-white">{config.roughness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thickness:</span>
                    <span className="text-white">{config.thickness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">Technical Details</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Shader Features</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Custom vertex and fragment shaders</li>
                <li>UV coordinate distortion based on normals</li>
                <li>Fresnel calculation for edge effects</li>
                <li>PBR specular highlights</li>
                <li>Configurable Index of Refraction (IOR)</li>
                <li>Thickness-based magnification</li>
                <li>Color tinting support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Performance</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Real-time 60 FPS rendering</li>
                <li>Efficient FBO texture sampling</li>
                <li>GPU-accelerated shader calculations</li>
                <li>Optimized for multiple layers</li>
                <li>Automatic resolution handling</li>
                <li>Double-sided rendering support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
