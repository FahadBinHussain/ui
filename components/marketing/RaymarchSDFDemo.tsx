"use client";

import React from "react";
import {
  RaymarchingSDF,
  RaymarchingMorphingSpheres,
  RaymarchingFractal,
  RaymarchingMetaballs,
} from "@/components/ui/raymarch-sdf";
import { Sparkles, Eye, Zap, Code, Infinity, Droplets, TrendingUp, Cpu } from "lucide-react";

export default function RaymarchSDFDemo() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-blue-950/20 to-black" />
        <div className="relative z-10 max-w-5xl mx-auto text-center py-32">
          <Infinity className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Raymarching SDF
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Pure mathematical rendering with infinite resolution. No polygons—just raymarching
            through Signed Distance Function equations for liquid morphing shapes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">∞ Infinite Resolution</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">💧 Liquid Morphing</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">🔬 Pure Math</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Infinity,
                title: "Infinite Resolution",
                description: "No polygon edges—render at any zoom level perfectly",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: Droplets,
                title: "Liquid Morphing",
                description: "Shapes blend like mercury using smooth minimum functions",
                gradient: "from-pink-500/20 to-orange-500/20",
              },
              {
                icon: Zap,
                title: "Real-Time Rendering",
                description: "60fps shader-based rendering on GPU",
                gradient: "from-orange-500/20 to-red-500/20",
              },
              {
                icon: Code,
                title: "Pure Mathematics",
                description: "Define shapes with SDF equations, not 3D models",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-white/10 backdrop-blur-sm group hover:border-white/20 transition-all`}
              >
                <feature.icon className="w-8 h-8 text-white/80 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Raymarching */}
      <section className="py-24 px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">What is Raymarching?</h2>
            <p className="text-white/60 text-lg">The successor to polygon meshes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3 text-red-400">❌ Traditional Meshes</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Made of triangles/polygons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Visible edges when zooming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Complex math to blend shapes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Large file sizes for detail</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3 text-green-400">✓ Raymarching SDF</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Pure mathematical equations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Infinite resolution (no edges)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Liquid blending with smin()</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Tiny shader code (~1KB)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3 text-purple-300">🔬 How It Works</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              <strong>Raymarching:</strong> Instead of rendering triangles, we shoot rays from the
              camera into the scene. At each step, we query a <strong>Signed Distance Function
              (SDF)</strong> that tells us "how far to the nearest surface." We march the ray
              forward by that distance and repeat until we hit something or reach max distance.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              <strong>SDF:</strong> A function like <code className="text-purple-400">length(p) - radius</code> for
              a sphere. Returns negative inside, positive outside, zero at the surface. This
              mathematical representation allows infinite detail and smooth blending.
            </p>
          </div>
        </div>
      </section>

      {/* How to Build */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Implementation Steps</h2>
            <p className="text-white/60 text-lg">4 steps to raymarching mastery</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Setup: Fullscreen Quad",
                description:
                  "Create a Three.js plane covering the screen. All rendering happens in the fragment shader.",
                code: `const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  fragmentShader: raymarchShader
});`,
                color: "from-purple-600 to-pink-600",
              },
              {
                step: "2",
                title: "Shader: Raymarch Loop",
                description:
                  "In fragment shader, march rays from camera. Query SDF at each step, advance by that distance.",
                code: `float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  for(int i = 0; i < 80; i++) {
    vec3 p = ro + rd * t;
    float d = map(p); // SDF query
    if(d < 0.001) break;
    t += d; // march forward
  }
  return t;
}`,
                color: "from-pink-600 to-orange-600",
              },
              {
                step: "3",
                title: "Math: Define Shapes with SDF",
                description:
                  "Write mathematical functions for shapes. Sphere, box, torus—all just equations.",
                code: `// Sphere SDF
float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

// Box SDF
float sdBox(vec3 p, vec3 size) {
  vec3 d = abs(p) - size;
  return length(max(d, 0.0));
}`,
                color: "from-orange-600 to-red-600",
              },
              {
                step: "4",
                title: "Blend: Smooth Minimum (smin)",
                description:
                  "Use smin() to blend shapes like liquid mercury. The 'k' parameter controls smoothness.",
                code: `float smin(float a, float b, float k) {
  float h = max(k - abs(a-b), 0.0) / k;
  return min(a, b) - h*h*h*k/6.0;
}

// Blend two spheres
float result = smin(sphere1, sphere2, 0.5);`,
                color: "from-red-600 to-purple-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl font-bold shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 mb-4">{item.description}</p>
                    <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-blue-300">{item.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo 1: Morphing Spheres */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Droplets className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Demo 1: Morphing Spheres</h2>
            <p className="text-white/60 text-lg">
              Liquid mercury blobs that blend together with smooth minimum
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl border border-white/10 p-8 backdrop-blur-sm">
            <RaymarchingMorphingSpheres className="rounded-2xl overflow-hidden shadow-2xl" />
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm mb-2">
                ✨ Pure mathematical rendering—no polygon meshes
              </p>
              <p className="text-white/50 text-xs">
                Move your mouse to rotate • Shapes blend like liquid mercury
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo 2: Fractal Landscape */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Infinity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Demo 2: Fractal Landscape</h2>
            <p className="text-white/60 text-lg">
              Infinite terrain generated with noise functions
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-3xl border border-white/10 p-8 backdrop-blur-sm">
            <RaymarchingFractal className="rounded-2xl overflow-hidden shadow-2xl" />
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm mb-2">
                🌄 Procedurally generated terrain with fractal Brownian motion
              </p>
              <p className="text-white/50 text-xs">
                Infinite detail at any zoom level • Rendered in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo 3: Metaballs */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Droplets className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Demo 3: Metaballs Goop</h2>
            <p className="text-white/60 text-lg">
              Organic blobs with metallic liquid appearance
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl border border-white/10 p-8 backdrop-blur-sm">
            <RaymarchingMetaballs className="rounded-2xl overflow-hidden shadow-2xl" />
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm mb-2">
                💧 Four spheres merging with smooth minimum function
              </p>
              <p className="text-white/50 text-xs">
                Specular reflections create metallic liquid look
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SDF Reference */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">SDF Function Reference</h2>
            <p className="text-white/60 text-lg">Common signed distance functions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Sphere",
                code: "length(p) - radius",
                description: "Perfect sphere at origin",
              },
              {
                name: "Box",
                code: "length(max(abs(p) - size, 0.0))",
                description: "Cube or rectangular box",
              },
              {
                name: "Torus",
                code: "length(vec2(length(p.xz) - r1, p.y)) - r2",
                description: "Donut shape with two radii",
              },
              {
                name: "Cylinder",
                code: "length(p.xz) - radius",
                description: "Infinite cylinder along Y axis",
              },
              {
                name: "Plane",
                code: "p.y",
                description: "Flat ground plane at y=0",
              },
              {
                name: "Capsule",
                code: "length(p - clamp(p, a, b)) - r",
                description: "Pill shape between two points",
              },
            ].map((sdf, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all"
              >
                <h3 className="text-xl font-bold mb-2 text-purple-400">{sdf.name}</h3>
                <pre className="bg-black/60 border border-white/10 rounded-lg p-3 mb-3 overflow-x-auto">
                  <code className="text-sm text-blue-300">{sdf.code}</code>
                </pre>
                <p className="text-white/60 text-sm">{sdf.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-3 text-purple-300">💡 Pro Tip</h3>
            <p className="text-white/60 text-sm">
              Visit <a href="https://iquilezles.org/articles/distfunctions/" target="_blank" className="text-blue-400 hover:text-blue-300 underline">Inigo Quilez's Distance Functions</a> for
              100+ SDF equations including cones, prisms, octahedrons, and more complex shapes.
            </p>
          </div>
        </div>
      </section>

      {/* Component API */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Component API</h2>
            <p className="text-white/60 text-lg">Props and usage</p>
          </div>

          <div className="space-y-8">
            {/* Base Component */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">RaymarchingSDF</h3>
              <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                <code className="text-sm text-blue-300">{`import { RaymarchingSDF } from "@/components/ui/raymarch-sdf";

<RaymarchingSDF
  fragmentShader={customShader}
  width="100%"
  height="600px"
  enableMouse={true}
  autoRotate={true}
  rotateSpeed={0.5}
/>`}</code>
              </pre>

              <div className="space-y-2">
                <h4 className="font-semibold text-white/80 mb-3">Props:</h4>
                {[
                  {
                    prop: "fragmentShader",
                    type: "string",
                    desc: "Custom GLSL fragment shader code with raymarching logic",
                  },
                  { prop: "width", type: "string | number", desc: "Canvas width (default: 100%)" },
                  { prop: "height", type: "string | number", desc: "Canvas height (default: 600px)" },
                  { prop: "enableMouse", type: "boolean", desc: "Enable mouse camera rotation (default: true)" },
                  { prop: "autoRotate", type: "boolean", desc: "Auto-rotate when not interacting (default: true)" },
                  { prop: "rotateSpeed", type: "number", desc: "Rotation speed multiplier (default: 0.5)" },
                  { prop: "uniforms", type: "Record<string, any>", desc: "Custom uniforms for shader" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
                    <code className="text-purple-400 font-mono w-48 flex-shrink-0">{item.prop}</code>
                    <span className="text-blue-400 w-40 flex-shrink-0">{item.type}</span>
                    <span className="text-white/60">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Presets</h3>
              <div className="space-y-4">
                <div>
                  <code className="text-blue-300 text-lg">RaymarchingMorphingSpheres</code>
                  <p className="text-white/60 text-sm mt-1">
                    Multiple spheres blending like liquid mercury with smin()
                  </p>
                </div>
                <div>
                  <code className="text-blue-300 text-lg">RaymarchingFractal</code>
                  <p className="text-white/60 text-sm mt-1">
                    Infinite fractal terrain using noise functions and fbm
                  </p>
                </div>
                <div>
                  <code className="text-blue-300 text-lg">RaymarchingMetaballs</code>
                  <p className="text-white/60 text-sm mt-1">
                    Organic metaball goop with metallic reflections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Perfect Use Cases</h2>
            <p className="text-white/60 text-lg">Where raymarching shines</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🎮",
                title: "Game Menus",
                description: "Dynamic liquid backgrounds for UI/menus",
              },
              {
                emoji: "🎨",
                title: "Creative Portfolios",
                description: "Showcase artistic technical skill",
              },
              {
                emoji: "🔬",
                title: "Scientific Visualization",
                description: "Molecular structures, fluid dynamics",
              },
              {
                emoji: "🎬",
                title: "Loading Screens",
                description: "Mesmerizing wait-time animations",
              },
              {
                emoji: "💎",
                title: "Product Showcases",
                description: "Futuristic liquid crystal effects",
              },
              {
                emoji: "🌌",
                title: "Space/Sci-Fi Themes",
                description: "Nebulas, wormholes, alien landscapes",
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
              >
                <div className="text-4xl mb-4">{useCase.emoji}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-white/60 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Performance Tips</h2>

          <div className="space-y-6">
            {[
              {
                title: "⚡ Limit Raymarch Steps",
                description:
                  "Use 64-100 steps max. More = better quality but slower. Find the sweet spot.",
                color: "blue",
              },
              {
                title: "🎯 Early Exit Conditions",
                description:
                  "Break loop when distance < 0.001 (hit surface) or t > 100 (max distance)",
                color: "purple",
              },
              {
                title: "📱 Mobile Optimization",
                description:
                  "Reduce raymarch steps to 40-60 on mobile. Lower resolution with pixelRatio",
                color: "pink",
              },
              {
                title: "🔧 Simplified Shaders",
                description:
                  "Fewer shapes = faster. Start simple, add complexity if performance allows",
                color: "orange",
              },
              {
                title: "💡 GPU Acceleration",
                description:
                  "Everything runs on GPU—still avoid nested loops or complex conditional logic",
                color: "red",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className={`bg-${tip.color}-500/10 border border-${tip.color}-500/20 rounded-2xl p-6`}
              >
                <h3 className={`text-xl font-bold mb-3 text-${tip.color}-300`}>{tip.title}</h3>
                <p className="text-white/60 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Learning Resources</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">📚 Essential Reads</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  • <a href="https://iquilezles.org/articles/raymarchingdf/" target="_blank" className="text-blue-400 hover:text-blue-300">Inigo Quilez - Raymarching Distance Fields</a>
                </li>
                <li>
                  • <a href="https://www.shadertoy.com/" target="_blank" className="text-blue-400 hover:text-blue-300">Shadertoy</a> - Browse thousands of examples
                </li>
                <li>
                  • <a href="https://thebookofshaders.com/" target="_blank" className="text-blue-400 hover:text-blue-300">The Book of Shaders</a> - Learn GLSL
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">🎥 Video Tutorials</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Art of Code - YouTube channel with raymarching tutorials</li>
                <li>• Kishimisu - Shader programming for beginners</li>
                <li>• SimonDev - Advanced graphics techniques</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Infinite Resolution
          </h2>
          <p className="text-xl text-white/70 mb-8">
            No polygons, just pure mathematics rendering liquid morphing shapes
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform">
              Copy Component
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all">
              View on Shadertoy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
