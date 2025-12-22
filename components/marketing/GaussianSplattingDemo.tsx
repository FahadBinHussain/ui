"use client";

import React, { useState } from "react";
import { GaussianSplatting } from "@/components/ui/gaussian-splatting";

export default function GaussianSplattingDemo() {
  const [scale, setScale] = useState(1);
  const [cameraDistance, setCameraDistance] = useState(5);
  const [cameraSensitivity, setCameraSensitivity] = useState(2);
  const [enableMouseControl, setEnableMouseControl] = useState(true);
  const [enableOrbitControls, setEnableOrbitControls] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-white">
            3D{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Gaussian Splatting
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The successor to Photogrammetry. Render real-world 3D objects with photorealistic
            lighting and reflections, faster than traditional meshes.
          </p>
        </div>

        {/* Main Demo */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Scale: {scale.toFixed(2)}</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Camera Distance: {cameraDistance}</label>
              <input
                type="range"
                min="2"
                max="10"
                step="0.5"
                value={cameraDistance}
                onChange={(e) => setCameraDistance(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Sensitivity: {cameraSensitivity}</label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={cameraSensitivity}
                onChange={(e) => setCameraSensitivity(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Background Color</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                setEnableMouseControl(!enableMouseControl);
                if (!enableMouseControl) setEnableOrbitControls(false);
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                enableMouseControl
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              Mouse Control
            </button>

            <button
              onClick={() => {
                setEnableOrbitControls(!enableOrbitControls);
                if (!enableOrbitControls) setEnableMouseControl(false);
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                enableOrbitControls
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              Orbit Controls
            </button>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                showGrid
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              Show Grid
            </button>
          </div>

          <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/20 relative">
            <GaussianSplatting
              scale={scale}
              cameraDistance={cameraDistance}
              cameraSensitivity={cameraSensitivity}
              enableMouseControl={enableMouseControl}
              enableOrbitControls={enableOrbitControls}
              backgroundColor={backgroundColor}
              showGrid={showGrid}
            />
            
            {enableMouseControl && !enableOrbitControls && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                Move your mouse to rotate the camera
              </div>
            )}
          </div>
        </div>

        {/* Technical Explanation */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 space-y-4">
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">1. Gaussian Splat Format</h3>
                <p>
                  Each splat is a 3D Gaussian ellipsoid with position, scale, color (RGBA), and rotation
                  (quaternion). The .splat file stores millions of these points efficiently.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">2. Custom Shader Rendering</h3>
                <p>
                  A custom vertex shader applies quaternion rotation and scale to each splat, while the
                  fragment shader creates the Gaussian falloff for smooth blending.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">3. Real-time Performance</h3>
                <p>
                  Unlike traditional meshes, splats render faster because they're point-based with no
                  triangulation. Each point is rendered as a billboard with GPU acceleration.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">4. Photorealistic Quality</h3>
                <p>
                  Captures lighting, reflections, and material properties directly from real-world scans,
                  resulting in infinitely more realistic visuals than manually modeled 3D objects.
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
                  <strong className="text-white">Product Showcases:</strong> Display shoes, jewelry,
                  food, or electronics with photorealistic detail far beyond traditional 3D models.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Museum Artifacts:</strong> Create interactive
                  exhibits of historical objects with accurate lighting and material properties.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Real Estate:</strong> Hologram-like property tours
                  with realistic lighting that changes based on viewing angle.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">E-commerce:</strong> Let customers examine products
                  from all angles with authentic reflections and materials.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Character Scans:</strong> Photorealistic human or
                  creature renders for games, films, or AR experiences.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Scientific Visualization:</strong> Display
                  microscopic or astronomical objects with accurate scale and detail.
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
              <code>{`import { GaussianSplatting } from "@/components/ui/gaussian-splatting";

function MyComponent() {
  return (
    <div className="w-full h-screen">
      <GaussianSplatting
        splatUrl="/your-object.splat"
        scale={1.5}
        cameraDistance={5}
        cameraSensitivity={2}
        enableMouseControl={true}
        enableOrbitControls={false}
        backgroundColor="#000000"
        showGrid={false}
      />
    </div>
  );
}

// With orbit controls for manual rotation
function InteractiveVersion() {
  return (
    <GaussianSplatting
      splatUrl="/product.splat"
      enableOrbitControls={true}
      enableMouseControl={false}
      backgroundColor="#1a1a2e"
    />
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">
            Gaussian Splatting vs Traditional 3D
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-cyan-400">Gaussian Splatting</h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Photorealistic lighting and reflections</li>
                <li>Captured directly from real objects</li>
                <li>Faster rendering (point-based)</li>
                <li>No manual texturing needed</li>
                <li>Perfect for product showcases</li>
                <li>Smaller file size than 4K textures</li>
                <li>View-dependent effects baked in</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-purple-400">Traditional Meshes</h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Manually modeled or scanned</li>
                <li>Requires texturing and UV mapping</li>
                <li>Triangle-based geometry</li>
                <li>More control over topology</li>
                <li>Better for animation and rigging</li>
                <li>Can be modified post-creation</li>
                <li>Standard in game engines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">Technical Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-bold text-cyan-400">File Format</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong className="text-white">Position:</strong> 3 × 32-bit floats (xyz)</p>
                <p><strong className="text-white">Scale:</strong> 3 × 32-bit floats (xyz)</p>
                <p><strong className="text-white">Color:</strong> 4 × 8-bit (RGBA)</p>
                <p><strong className="text-white">Rotation:</strong> 4 × 32-bit floats (quaternion)</p>
                <p className="pt-2 border-t border-white/10">
                  <strong className="text-white">Total:</strong> 44 bytes per splat
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-bold text-purple-400">Rendering</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong className="text-white">Points:</strong> GPU-accelerated billboards</p>
                <p><strong className="text-white">Blending:</strong> Alpha transparency</p>
                <p><strong className="text-white">Falloff:</strong> Gaussian distribution</p>
                <p><strong className="text-white">Shading:</strong> Custom GLSL shaders</p>
                <p><strong className="text-white">Performance:</strong> 60 FPS with millions of points</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3">
              <h3 className="text-xl font-bold text-pink-400">Interaction</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong className="text-white">Mouse Control:</strong> Camera follows cursor</p>
                <p><strong className="text-white">Orbit Controls:</strong> Click and drag rotation</p>
                <p><strong className="text-white">Zoom:</strong> Scroll wheel or pinch</p>
                <p><strong className="text-white">Auto-rotate:</strong> Optional animation</p>
                <p><strong className="text-white">Hologram Feel:</strong> Smooth 3D parallax</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">📸 Creating Your Own Splats</h3>
          <div className="text-gray-300 space-y-3">
            <p>
              <strong className="text-cyan-400">1. Capture:</strong> Use a smartphone or camera to
              take 50-200 photos of an object from all angles.
            </p>
            <p>
              <strong className="text-cyan-400">2. Process:</strong> Use tools like Luma AI, Polycam,
              or open-source NeRF/Gaussian Splatting trainers.
            </p>
            <p>
              <strong className="text-cyan-400">3. Export:</strong> Export as .splat or .ply format
              (typically 5-50MB depending on detail).
            </p>
            <p>
              <strong className="text-cyan-400">4. Optimize:</strong> Use compression tools to reduce
              file size for web delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
