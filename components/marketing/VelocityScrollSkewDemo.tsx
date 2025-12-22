"use client";

import React from "react";
import {
  VelocityScrollSkew,
  VelocitySkewSubtle,
  VelocitySkewDramatic,
  VelocitySkewSnappy,
  SkewScrollSection,
  ScrollSkewDemoContent,
} from "@/components/ui/velocity-scroll-skew";
import { Zap, TrendingUp, Activity, Eye, Code, Gauge } from "lucide-react";

export default function VelocityScrollSkewDemo() {
  return (
    <VelocityScrollSkew>
      <div className="bg-black text-white">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/20 to-black" />
          <div className="relative z-10 max-w-5xl mx-auto text-center py-32">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium text-white/90">✨ Start scrolling to feel it</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Velocity-Based
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Scroll Skew
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Content that skews diagonally based on scroll speed, giving your website the feeling of weight and momentum like a physical object moving through space
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-white/90">🏋️ Feeling of Weight</span>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-white/90">⚡ Speed Perception</span>
              </div>
              <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-white/90">🔄 Lenis Powered</span>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <div className="w-6 h-10 mx-auto border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
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
                  icon: Zap,
                  title: "Physical Weight",
                  description: "Page feels like a real object with mass responding to scroll velocity",
                  gradient: "from-yellow-500/20 to-orange-500/20",
                },
                {
                  icon: Activity,
                  title: "Velocity Tracking",
                  description: "Calculates scroll speed every frame to determine skew intensity",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                },
                {
                  icon: TrendingUp,
                  title: "Smooth Interpolation",
                  description: "Skew smoothly returns to 0 when velocity decreases, no jarring stops",
                  gradient: "from-purple-500/20 to-pink-500/20",
                },
                {
                  icon: Eye,
                  title: "Lenis Integration",
                  description: "Industry-standard smooth scroll library powers the experience",
                  gradient: "from-pink-500/20 to-rose-500/20",
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
              <p className="text-white/60 text-lg">Four key steps to velocity-based skew</p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Setup Lenis Smooth Scroll",
                  description: "Initialize Lenis for buttery smooth scrolling as the foundation",
                  code: `const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);`,
                  color: "from-blue-600 to-cyan-600",
                },
                {
                  step: "2",
                  title: "Calculate Scroll Velocity",
                  description: "Track scroll position changes to determine speed of scrolling",
                  code: `let lastScrollY = window.scrollY;

function updateSkew() {
  const currentScrollY = window.scrollY;
  const velocity = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;
  
  // velocity is positive when scrolling down, negative when up
}`,
                  color: "from-purple-600 to-pink-600",
                },
                {
                  step: "3",
                  title: "Apply Clamped Skew Transform",
                  description: "Convert velocity to skew with maximum limits to prevent extreme distortion",
                  code: `const targetSkew = Math.max(
  -maxSkew, // e.g., -5deg
  Math.min(maxSkew, velocity * velocityMultiplier) // e.g., 5deg
);

gsap.set(contentRef.current, {
  skewY: targetSkew
});`,
                  color: "from-pink-600 to-orange-600",
                },
                {
                  step: "4",
                  title: "Smooth Interpolation to Zero",
                  description: "Gradually return skew to 0 when velocity drops for natural deceleration",
                  code: `// Smooth lerp instead of instant apply
skewRef.current += (targetSkew - skewRef.current) * smoothSpeed;

gsap.set(contentRef.current, {
  skewY: skewRef.current // Now smoothly interpolated
});`,
                  color: "from-orange-600 to-red-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all group"
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

        {/* Visual Demo Sections */}
        <section className="py-32 px-8 bg-black">
          <div className="max-w-5xl mx-auto space-y-40">
            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Feeling of Weight
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                The skew makes the page feel like a physical object with mass, responding naturally to your scroll velocity
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Speed Perception
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Fast scrolling creates dramatic skew, while slow scrolling keeps content stable and readable
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Smooth Deceleration
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                When you stop scrolling, the skew smoothly returns to 0, mimicking physical momentum
              </p>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-32 px-8 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Works with Any Layout
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4 group-hover:scale-110 transition-transform`}
                  />
                  <h3 className="text-xl font-semibold mb-2">Card {i + 1}</h3>
                  <p className="text-white/60 text-sm">
                    The entire page skews together, creating unified motion and cohesive feel
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preset Variants */}
        <section className="py-24 px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Preset Configurations
              </h2>
              <p className="text-white/60 text-lg">Three ready-to-use skew intensities</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: "VelocitySkewSubtle",
                  description: "Lightweight, barely-there skew for sophisticated sites",
                  props: "maxSkew={3}, velocityMultiplier={0.05}, smoothSpeed={0.12}",
                  gradient: "from-blue-600/30 to-cyan-600/30",
                },
                {
                  name: "VelocityScrollSkew (default)",
                  description: "Balanced skew that's noticeable but not overwhelming",
                  props: "maxSkew={5}, velocityMultiplier={0.1}, smoothSpeed={0.1}",
                  gradient: "from-purple-600/30 to-pink-600/30",
                },
                {
                  name: "VelocitySkewDramatic",
                  description: "Bold, eye-catching skew for creative portfolios",
                  props: "maxSkew={8}, velocityMultiplier={0.15}, smoothSpeed={0.08}",
                  gradient: "from-pink-600/30 to-orange-600/30",
                },
                {
                  name: "VelocitySkewSnappy",
                  description: "Quick response with faster Lenis duration",
                  props: "maxSkew={6}, velocityMultiplier={0.12}, lenisDuration={0.8}",
                  gradient: "from-orange-600/30 to-red-600/30",
                },
              ].map((preset, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${preset.gradient} border border-white/10 backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-4">
                    <Gauge className="w-8 h-8 text-white/80 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 font-mono text-blue-300">
                        &lt;{preset.name} /&gt;
                      </h3>
                      <p className="text-white/70 mb-3">{preset.description}</p>
                      <code className="text-sm text-white/50 block bg-black/30 rounded px-3 py-2 border border-white/10">
                        {preset.props}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">Technical Deep Dive</h2>
              <p className="text-white/60 text-lg">Understanding the math and implementation</p>
            </div>

            <div className="space-y-8">
              {/* Why Lenis */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Why Lenis?</h3>
                <p className="text-white/60 mb-4">
                  Lenis is the industry-standard smooth scroll library (used by Awwwards sites, Apple-like experiences):
                </p>
                <ul className="space-y-2 text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span><strong className="text-white">Smooth interpolation</strong>: No janky native scroll, buttery 60fps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span><strong className="text-white">Easing control</strong>: Customize acceleration curves for natural feel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span><strong className="text-white">Wheel multiplier</strong>: Fine-tune scroll speed on different devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span><strong className="text-white">Touch support</strong>: Works seamlessly on mobile with touch gestures</span>
                  </li>
                </ul>
              </div>

              {/* Velocity Calculation */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Velocity Calculation</h3>
                <p className="text-white/60 mb-4">
                  The key is tracking how scroll position changes frame-by-frame:
                </p>
                <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                  <code className="text-sm text-blue-300">{`let lastScrollY = window.scrollY; // Store previous position

function updateSkew() {
  const currentScrollY = window.scrollY; // Current position
  const velocity = currentScrollY - lastScrollY; // Difference = speed
  lastScrollY = currentScrollY; // Update for next frame
  
  // velocity > 0 = scrolling down
  // velocity < 0 = scrolling up
  // velocity = 0 = stopped
  
  requestAnimationFrame(updateSkew); // Loop every frame (~60fps)
}`}</code>
                </pre>
                <p className="text-white/60 text-sm">
                  <strong className="text-white">Note:</strong> Velocity is in pixels per frame. 
                  Fast scrolling = large numbers (e.g., 50), slow = small numbers (e.g., 2)
                </p>
              </div>

              {/* Clamping */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-pink-400">Clamping for Safety</h3>
                <p className="text-white/60 mb-4">
                  Without limits, extremely fast scrolling would create unreadable distortion:
                </p>
                <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                  <code className="text-sm text-blue-300">{`const maxSkew = 5; // Max degrees of skew
const velocityMultiplier = 0.1; // Sensitivity

const rawSkew = velocity * velocityMultiplier;
// Fast scroll: 50 * 0.1 = 5deg ✅
// Extreme scroll: 200 * 0.1 = 20deg ⚠️ Too much!

const targetSkew = Math.max(
  -maxSkew, // Clamp bottom: -5deg
  Math.min(maxSkew, rawSkew) // Clamp top: 5deg
);
// Now extreme scroll: Math.min(5, 20) = 5deg ✅ Safe!`}</code>
                </pre>
                <p className="text-white/60 text-sm">
                  <strong className="text-white">Adjust these values:</strong> Higher maxSkew = more dramatic, 
                  higher velocityMultiplier = more sensitive to scroll speed
                </p>
              </div>

              {/* Smooth Interpolation */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">Linear Interpolation (Lerp)</h3>
                <p className="text-white/60 mb-4">
                  Instantly snapping to target skew looks robotic. Lerp creates smooth, organic transitions:
                </p>
                <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                  <code className="text-sm text-blue-300">{`let currentSkew = 0;
const smoothSpeed = 0.1; // Lower = smoother but slower

// Each frame:
currentSkew += (targetSkew - currentSkew) * smoothSpeed;

// Example: currentSkew = 0, targetSkew = 5
// Frame 1: 0 + (5 - 0) * 0.1 = 0.5
// Frame 2: 0.5 + (5 - 0.5) * 0.1 = 0.95
// Frame 3: 0.95 + (5 - 0.95) * 0.1 = 1.355
// ... gradually approaches 5

// When user stops (targetSkew = 0):
// currentSkew automatically decays back to 0 smoothly!`}</code>
                </pre>
                <p className="text-white/60 text-sm">
                  <strong className="text-white">Why this works:</strong> Lerp creates exponential easing. 
                  The closer you get to the target, the slower the movement—perfect for natural deceleration!
                </p>
              </div>

              {/* Performance */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Performance Considerations</h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <strong className="text-white">GSAP is GPU-accelerated</strong>
                      <p className="text-sm">Uses CSS transforms which are hardware-accelerated, not repaints</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <strong className="text-white">requestAnimationFrame syncs with display</strong>
                      <p className="text-sm">Updates only when browser is ready to paint (60fps or 120fps on high-refresh displays)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <strong className="text-white">Mobile considerations</strong>
                      <p className="text-sm">Consider reducing maxSkew on mobile devices for less dramatic effect</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <strong className="text-white">Single transform only</strong>
                      <p className="text-sm">Only skewY is applied—no competing transforms causing jank</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Props Documentation */}
        <section className="py-24 px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              VelocityScrollSkew Props
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                {[
                  { prop: "maxSkew", type: "number", default: "5", desc: "Maximum skew angle in degrees (prevents extreme distortion)" },
                  { prop: "velocityMultiplier", type: "number", default: "0.1", desc: "Sensitivity to scroll speed (higher = more skew per pixel scrolled)" },
                  { prop: "smoothSpeed", type: "number", default: "0.1", desc: "Interpolation speed (0-1, lower = smoother but slower response)" },
                  { prop: "enableSmoothScroll", type: "boolean", default: "true", desc: "Enable Lenis smooth scrolling (disable if using another smooth scroll library)" },
                  { prop: "lenisDuration", type: "number", default: "1.2", desc: "Lenis scroll duration in seconds (lower = snappier)" },
                  { prop: "lenisEasing", type: "number", default: "0.1", desc: "Lenis easing intensity (affects scroll smoothness)" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-3 border-b border-white/5 last:border-0">
                    <code className="text-blue-400 font-mono text-sm md:w-48">{item.prop}</code>
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
        <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Perfect Use Cases</h2>
              <p className="text-white/60 text-lg">Where velocity-based skew creates maximum impact</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  emoji: "🎨",
                  title: "Creative Portfolios",
                  description: "Add kinetic energy to showcase projects with dynamic scrolling",
                },
                {
                  emoji: "🏆",
                  title: "Award Sites",
                  description: "Awwwards-level polish with physical scrolling sensation",
                },
                {
                  emoji: "🎬",
                  title: "Product Launches",
                  description: "Make product pages feel alive and interactive",
                },
                {
                  emoji: "📱",
                  title: "Landing Pages",
                  description: "Stand out from generic smooth scroll with velocity physics",
                },
                {
                  emoji: "🎮",
                  title: "Gaming Sites",
                  description: "Match the energy of game content with kinetic scrolling",
                },
                {
                  emoji: "🚀",
                  title: "Tech Startups",
                  description: "Modern, cutting-edge feel for innovative companies",
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

        {/* End Section */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Physical Scrolling
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-8">
              Go beyond standard smooth scrolling with velocity-based physics
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform">
                Copy Component
              </button>
              <button className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all">
                View Docs
              </button>
            </div>
            <div className="mt-12 text-white/40 text-sm">
              Scroll back up to experience it again ↑
            </div>
          </div>
        </section>
      </div>
    </VelocityScrollSkew>
  );
}
