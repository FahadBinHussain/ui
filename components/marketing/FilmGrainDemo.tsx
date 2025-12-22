"use client";

import React, { useState } from "react";
import {
  FilmGrain,
  FilmGrainSubtle,
  FilmGrainClassic,
  FilmGrainVHS,
  FilmGrainSecurity,
  FilmGrainStatic,
  FilmGrainPhotographic,
  FilmGrainWithVignette,
  FilmGrainColored,
} from "@/components/ui/film-grain";
import { Film, Sparkles, Eye, Code, Palette, Zap } from "lucide-react";

export default function FilmGrainDemo() {
  const [activePreset, setActivePreset] = useState<string>("classic");

  const renderGrain = () => {
    switch (activePreset) {
      case "subtle": return <FilmGrainSubtle />;
      case "classic": return <FilmGrainClassic />;
      case "vhs": return <FilmGrainVHS />;
      case "security": return <FilmGrainSecurity />;
      case "static": return <FilmGrainStatic />;
      case "photo": return <FilmGrainPhotographic />;
      case "vignette": return <FilmGrainWithVignette />;
      case "colored": return <FilmGrainColored color="#ff00ff" opacity={0.08} />;
      default: return <FilmGrainClassic />;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Apply selected grain */}
      {renderGrain()}

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
        <div className="relative z-10 max-w-5xl mx-auto text-center py-32">
          <Film className="w-16 h-16 text-white/80 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white/60 bg-clip-text text-transparent">
              Film Grain Overlay
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Subtle static grain texture that kills the "flat digital" look, making websites feel tactile, retro, and cinematic
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">🎬 Cinematic Feel</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">📺 Retro Texture</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">✨ SVG Filter</span>
            </div>
          </div>

          {/* Interactive Preset Switcher */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Try Different Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "subtle", label: "Subtle" },
                { id: "classic", label: "Classic" },
                { id: "vhs", label: "VHS" },
                { id: "security", label: "Security" },
                { id: "static", label: "Static" },
                { id: "photo", label: "Photo" },
                { id: "vignette", label: "Vignette" },
                { id: "colored", label: "Colored" },
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id)}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    activePreset === preset.id
                      ? "bg-white/20 border-white/40 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-4">
              Current: <span className="text-white font-semibold">{activePreset.charAt(0).toUpperCase() + activePreset.slice(1)}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Film,
                title: "Kills Flat Digital",
                description: "Adds organic texture that makes screens feel less sterile and more tactile",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: Sparkles,
                title: "SVG feTurbulence",
                description: "Procedurally generated noise using SVG filters for infinite resolution",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: Eye,
                title: "Animated Grain",
                description: "TV static effect with CSS step animations for living, breathing texture",
                gradient: "from-pink-500/20 to-orange-500/20",
              },
              {
                icon: Palette,
                title: "Blend Modes",
                description: "Overlay, multiply, hard-light for different grain intensities",
                gradient: "from-orange-500/20 to-red-500/20",
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

      {/* How It Works */}
      <section className="py-24 px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-white/60 text-lg">Three key techniques for film grain overlays</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "SVG feTurbulence Filter",
                description: "Create procedural noise with infinite resolution using SVG filters",
                code: `<svg width="0" height="0">
  <defs>
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.9"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>
</svg>`,
                color: "from-blue-600 to-cyan-600",
              },
              {
                step: "2",
                title: "Fixed Full-Screen Overlay",
                description: "Position grain over entire screen with pointer-events: none",
                code: `<div
  className="fixed inset-0 pointer-events-none"
  style={{
    zIndex: 9999,
    filter: "url(#grain)",
    opacity: 0.05,
    mixBlendMode: "overlay"
  }}
/>`,
                color: "from-purple-600 to-pink-600",
              },
              {
                step: "3",
                title: "Animated Step Keyframes",
                description: "Create TV static effect with rapid position shifts",
                code: `@keyframes grain-shift {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  // ... more steps
}

animation: grain-shift 0.5s steps(5) infinite;`,
                color: "from-pink-600 to-orange-600",
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

      {/* Visual Comparison */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Before & After
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Without Grain */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">Without Grain</h3>
                  <p className="text-white/80">Flat, sterile, too digital</p>
                </div>
              </div>
            </div>

            {/* With Grain */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                <FilmGrainClassic />
                <div className="text-center relative z-10">
                  <h3 className="text-3xl font-bold mb-2">With Grain</h3>
                  <p className="text-white/80">Tactile, cinematic, alive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preset Showcase */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Preset Styles
            </h2>
            <p className="text-white/60 text-lg">8 ready-to-use film grain configurations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Subtle", component: <FilmGrainSubtle />, desc: "Barely-there for clean sites", opacity: "3%" },
              { name: "Classic", component: <FilmGrainClassic />, desc: "Traditional film grain", opacity: "8%" },
              { name: "VHS", component: <FilmGrainVHS />, desc: "Heavy retro texture", opacity: "12%" },
              { name: "Security", component: <FilmGrainSecurity />, desc: "Surveillance camera feel", opacity: "15%" },
              { name: "Static", component: <FilmGrainStatic />, desc: "No animation, pure texture", opacity: "5%" },
              { name: "Photo", component: <FilmGrainPhotographic />, desc: "Soft grain for portfolios", opacity: "6%" },
              { name: "Vignette", component: <FilmGrainWithVignette />, desc: "Grain + edge darkening", opacity: "5%+vignette" },
              { name: "Colored", component: <FilmGrainColored />, desc: "Creative color tints", opacity: "8%+color" },
            ].map((preset, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden border border-white/10 group"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  {preset.component}
                  <div className="text-center relative z-10">
                    <h3 className="text-xl font-bold mb-1">{preset.name}</h3>
                    <p className="text-white/60 text-sm mb-2">{preset.desc}</p>
                    <code className="text-xs text-white/50 bg-black/40 px-2 py-1 rounded">
                      {preset.opacity}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Technical Deep Dive</h2>
            <p className="text-white/60 text-lg">Understanding SVG filters and blend modes</p>
          </div>

          <div className="space-y-8">
            {/* feTurbulence */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">SVG feTurbulence Explained</h3>
              <p className="text-white/60 mb-4">
                The <code className="text-purple-400">feTurbulence</code> filter generates Perlin noise:
              </p>
              <ul className="space-y-2 text-white/60 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span><strong className="text-white">type="fractalNoise"</strong>: Creates organic, natural-looking grain (vs "turbulence" which is sharper)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">baseFrequency="0.9"</strong>: Controls grain size (0.1 = large blobs, 2.0 = fine dust)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  <span><strong className="text-white">numOctaves="4"</strong>: Layers of detail (higher = more complex, slower)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong className="text-white">stitchTiles="stitch"</strong>: Ensures seamless tiling when animated</span>
                </li>
              </ul>
              <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-blue-300">{`<feColorMatrix type="saturate" values="0" />
// Removes all color, making noise grayscale (black/white grain)`}</code>
              </pre>
            </div>

            {/* Blend Modes */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Blend Mode Guide</h3>
              <div className="space-y-3 text-white/60">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📽️</span>
                  <div>
                    <strong className="text-white">overlay</strong>
                    <p className="text-sm">Most versatile: Darkens darks, lightens lights (best for general use)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🎬</span>
                  <div>
                    <strong className="text-white">hard-light</strong>
                    <p className="text-sm">More intense contrast: Great for VHS/retro effects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">📸</span>
                  <div>
                    <strong className="text-white">soft-light</strong>
                    <p className="text-sm">Subtle, gentle: Perfect for photography sites</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">📹</span>
                  <div>
                    <strong className="text-white">multiply</strong>
                    <p className="text-sm">Darkens overall: Security camera/surveillance feel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">✨</span>
                  <div>
                    <strong className="text-white">screen</strong>
                    <p className="text-sm">Lightens overall: For colored grain effects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Animation Steps */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Step Animation Magic</h3>
              <p className="text-white/60 mb-4">
                The <code className="text-purple-400">steps()</code> timing function creates choppy TV static:
              </p>
              <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                <code className="text-sm text-blue-300">{`animation: grain-shift 0.5s steps(5) infinite;

// Without steps: smooth, slow morphing (doesn't look like grain)
// With steps(5): 5 sudden jumps (looks like static TV noise)

// Lower steps = choppier (steps(3) = very jumpy)
// Higher steps = smoother (steps(10) = rapid flicker)`}</code>
              </pre>
              <p className="text-white/60 text-sm">
                <strong className="text-white">Pro tip:</strong> Combine low animation speed (0.3s) with high steps (8-10) for authentic VHS glitch feel
              </p>
            </div>

            {/* Performance */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Performance Optimization</h3>
              <ul className="space-y-3 text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <strong className="text-white">SVG filters are GPU-accelerated</strong>
                    <p className="text-sm">Modern browsers handle feTurbulence efficiently on graphics card</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🚫</span>
                  <div>
                    <strong className="text-white">pointer-events: none is crucial</strong>
                    <p className="text-sm">Prevents grain from blocking clicks/hovers on content below</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <strong className="text-white">Reduce opacity on mobile</strong>
                    <p className="text-sm">Smaller screens + lower DPI = grain can look too heavy (use 0.03 instead of 0.05)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <strong className="text-white">Alternative: PNG texture</strong>
                    <p className="text-sm">For very old devices, pre-rendered noise image can be faster than SVG filter</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Props Documentation */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            FilmGrain Props
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { prop: "opacity", type: "number", default: "0.05", desc: "Transparency of grain effect (0-1, lower = more subtle)" },
                { prop: "blendMode", type: "string", default: '"overlay"', desc: 'CSS mix-blend-mode: "overlay", "hard-light", "soft-light", etc.' },
                { prop: "animate", type: "boolean", default: "true", desc: "Enable animated TV static effect (false = static texture)" },
                { prop: "animationSpeed", type: "number", default: "0.5", desc: "Animation duration in seconds (lower = faster flicker)" },
                { prop: "animationSteps", type: "number", default: "5", desc: "Number of step keyframes (higher = smoother, lower = choppier)" },
                { prop: "baseFrequency", type: "number", default: "0.9", desc: "SVG grain size (0.1 = large, 2.0 = fine dust)" },
                { prop: "octaves", type: "number", default: "4", desc: "Complexity layers (higher = more detail, slower performance)" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-3 border-b border-white/5 last:border-0">
                  <code className="text-blue-400 font-mono text-sm md:w-40">{item.prop}</code>
                  <span className="text-purple-400 text-sm md:w-24">{item.type}</span>
                  <span className="text-white/40 text-sm md:w-24">{item.default}</span>
                  <span className="text-white/60 text-sm flex-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Perfect Use Cases</h2>
            <p className="text-white/60 text-lg">Where film grain adds maximum value</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🎬",
                title: "Film/Video Sites",
                description: "Cinematic grain for production companies and showreels",
              },
              {
                emoji: "📸",
                title: "Photography",
                description: "Add analog warmth to digital photo portfolios",
              },
              {
                emoji: "🎨",
                title: "Creative Studios",
                description: "Sophisticated texture for agency and design sites",
              },
              {
                emoji: "🎮",
                title: "Gaming",
                description: "Retro CRT/VHS aesthetic for indie games",
              },
              {
                emoji: "🎵",
                title: "Music Artists",
                description: "Lo-fi, vintage vibe for musicians and labels",
              },
              {
                emoji: "📰",
                title: "Editorial",
                description: "Newspaper/magazine texture for content sites",
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
              >
                <div className="text-4xl mb-4">{useCase.emoji}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-white/60 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Kill the Flat Look
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Add cinematic texture that makes your site feel tactile and alive
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform">
              Copy Component
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
