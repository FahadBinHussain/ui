"use client";

import React from "react";
import { HolographicGlassTabs } from "@/components/ui/holographic-glass-tabs";
import { Code, Palette, Zap, Sparkles, Box, Eye } from "lucide-react";

export default function HolographicGlassTabsDemo() {
  const demoTabs = [
    {
      id: "features",
      label: "Features",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Amazing Features</h3>
          <p className="text-white/70">
            Real glass transmission material with chromatic aberration and realistic refraction
          </p>
        </div>
      ),
    },
    {
      id: "design",
      label: "Design",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Beautiful Design</h3>
          <p className="text-white/70">
            Glassmorphism effect with smooth spring-based transitions and tilting animation
          </p>
        </div>
      ),
    },
    {
      id: "performance",
      label: "Performance",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Optimized Performance</h3>
          <p className="text-white/70">
            GPU-accelerated WebGL rendering with react-three-fiber for smooth 60fps animations
          </p>
        </div>
      ),
    },
  ];

  const productTabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-3">
          <Sparkles className="w-12 h-12 mx-auto text-purple-400" />
          <h3 className="text-xl font-bold text-white">Product Overview</h3>
          <p className="text-sm text-white/60">
            Next-generation interface with holographic effects
          </p>
        </div>
      ),
    },
    {
      id: "specs",
      label: "Specifications",
      content: (
        <div className="space-y-3">
          <Box className="w-12 h-12 mx-auto text-pink-400" />
          <h3 className="text-xl font-bold text-white">Technical Specs</h3>
          <p className="text-sm text-white/60">
            React Three Fiber · MeshTransmissionMaterial · Spring Physics
          </p>
        </div>
      ),
    },
    {
      id: "preview",
      label: "Preview",
      content: (
        <div className="space-y-3">
          <Eye className="w-12 h-12 mx-auto text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Live Preview</h3>
          <p className="text-sm text-white/60">
            Watch the glass pane slide and tilt with realistic physics
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <span className="text-sm font-medium text-purple-300">✨ Three.js Powered</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Holographic
            </span>
            <br />
            <span className="text-white">Glass Tabs</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tab switching with a sliding pane of refractive glass using transmission materials,
            chromatic aberration, and realistic physics-based tilting animation
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {[
              { icon: <Box className="w-5 h-5" />, text: "3D Glass Material" },
              { icon: <Zap className="w-5 h-5" />, text: "Spring Physics" },
              { icon: <Palette className="w-5 h-5" />, text: "Chromatic Aberration" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                {feature.icon}
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Demo */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Interactive Demo</h2>
            <p className="text-gray-400">Click tabs to see the holographic glass slide and tilt</p>
          </div>
          <HolographicGlassTabs tabs={demoTabs} />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">How It Works</h2>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "MeshTransmissionMaterial",
                description:
                  "Use Three.js MeshPhysicalMaterial with transmission: 1.0 for realistic glass that refracts light and distorts content underneath",
                code: `<MeshTransmissionMaterial
  transmission={1.0}
  roughness={0.1}
  thickness={1.5}
  chromaticAberration={0.05}
  distortion={0.2}
/>`,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: "02",
                title: "React Spring Animation",
                description:
                  "Use @react-spring/three to smoothly animate the glass pane position when switching tabs",
                code: `const { position, rotationY } = useSpring({
  position: [targetX, 0, 0.5],
  rotationY: direction === 'right' ? 0.15 : -0.15,
  config: { tension: 120, friction: 14 }
});`,
                gradient: "from-pink-500 to-orange-500",
              },
              {
                step: "03",
                title: "Physics-Based Tilting",
                description:
                  "Rotate the glass pane on Y-axis based on movement direction to simulate air resistance and inertia",
                code: `// Tilt right when moving right, left when moving left
const tilt = direction === 'right' ? 0.15 : -0.15;

// Apply to mesh rotation
<animated.mesh rotation={[0, rotationY, 0]}>
  <planeGeometry args={[2.5, 1.5, 32, 32]} />
</animated.mesh>`,
                gradient: "from-orange-500 to-red-500",
              },
              {
                step: "04",
                title: "Chromatic Aberration",
                description:
                  "Add RGB channel separation (chromaticAberration: 0.05) for that premium glass prism effect",
                code: `<MeshTransmissionMaterial
  chromaticAberration={0.05}
  anisotropicBlur={0.1}
  distortion={0.2}
  distortionScale={0.5}
  temporalDistortion={0.1}
/>`,
                gradient: "from-red-500 to-purple-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl font-black shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                    <pre className="bg-black/60 border border-white/10 rounded-xl p-4 overflow-x-auto">
                      <code className="text-sm text-cyan-300">{item.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Demo - Product Style */}
      <section className="px-8 py-32 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Product Showcase Style</h2>
            <p className="text-gray-400">
              Perfect for product pages and feature showcases
            </p>
          </div>
          <HolographicGlassTabs tabs={productTabs} />
        </div>
      </section>

      {/* Technical Details */}
      <section className="px-8 py-32 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Technical Details</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Material Properties",
                icon: <Palette className="w-6 h-6" />,
                items: [
                  "transmission: 1.0 for full glass effect",
                  "roughness: 0.1 for smooth surface",
                  "thickness: 1.5 for refraction depth",
                  "chromaticAberration: 0.05 for RGB split",
                ],
              },
              {
                title: "Animation Config",
                icon: <Zap className="w-6 h-6" />,
                items: [
                  "tension: 120 for spring stiffness",
                  "friction: 14 for smooth damping",
                  "rotationY: ±0.15 rad tilt angle",
                  "Auto-reset rotation on completion",
                ],
              },
              {
                title: "Performance",
                icon: <Code className="w-6 h-6" />,
                items: [
                  "WebGL GPU acceleration",
                  "60fps smooth animations",
                  "Efficient re-renders with React Three Fiber",
                  "Optimized geometry with 32x32 segments",
                ],
              },
              {
                title: "Customization",
                icon: <Box className="w-6 h-6" />,
                items: [
                  "Configurable tab count and content",
                  "Adjustable glass properties",
                  "Custom spring physics settings",
                  "Responsive layout support",
                ],
              },
            ].map((section, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-gray-400 text-sm flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-8 py-32 bg-gradient-to-t from-gray-950 to-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-6 text-center">Perfect For</h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Where holographic glass tabs shine brightest
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Product Showcases",
                description:
                  "Display product features, specifications, and previews with premium glass transitions",
                emoji: "✨",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Portfolio Sections",
                description:
                  "Organize projects, skills, and experience with eye-catching 3D glass effects",
                emoji: "💼",
                gradient: "from-pink-500/20 to-orange-500/20",
              },
              {
                title: "Dashboard Navigation",
                description:
                  "Create premium admin panels with holographic tab switching between analytics views",
                emoji: "📊",
                gradient: "from-orange-500/20 to-cyan-500/20",
              },
              {
                title: "Landing Pages",
                description:
                  "Make feature comparisons and pricing tiers stand out with refractive glass materials",
                emoji: "🚀",
                gradient: "from-cyan-500/20 to-purple-500/20",
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${useCase.gradient} border border-white/10 backdrop-blur-sm hover:scale-[1.02] transition-all group`}
              >
                <div className="text-5xl mb-4">{useCase.emoji}</div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-32 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to Integrate?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Copy the component and start creating stunning holographic interfaces
          </p>
          <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-2xl shadow-purple-500/50">
            View Documentation →
          </button>
        </div>
      </section>
    </div>
  );
}
