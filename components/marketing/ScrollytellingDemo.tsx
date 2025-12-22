"use client";

import React from "react";
import {
  Scrollytelling,
  ScrollytellingApple,
  ScrollytellingSideBySide,
  ScrollytellingProduct,
  Scrollytelling3DRotation,
  createFadeStep,
  createRotateStep,
  createScaleStep,
} from "@/components/ui/scrollytelling";
import { BookOpen, Smartphone, Zap, Eye, Code, TrendingUp, Layers } from "lucide-react";

export default function ScrollytellingDemo() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="text-center max-w-4xl">
          <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Scrollytelling
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
            Create immersive narratives with sticky pinning. Visual elements stay pinned while text
            scrolls alongside, triggering animations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">📍 Sticky Pinning</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">🎬 Scroll Animations</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/90">✨ Apple-Style</span>
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
                icon: Smartphone,
                title: "Apple Product Pages",
                description: "Sticky visuals with scrolling text—the Apple way",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: Eye,
                title: "Immersive Stories",
                description: "Keep attention with pinned visuals during narrative",
                gradient: "from-pink-500/20 to-orange-500/20",
              },
              {
                icon: Zap,
                title: "GSAP ScrollTrigger",
                description: "Smooth scrub animations tied to scroll progress",
                gradient: "from-orange-500/20 to-red-500/20",
              },
              {
                icon: Layers,
                title: "Flexible Layouts",
                description: "Left/right/center text positions, custom animations",
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

      {/* What is Scrollytelling */}
      <section className="py-24 px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">What is Scrollytelling?</h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            A storytelling technique where a visual element (image, 3D model, video) stays{" "}
            <strong className="text-purple-400">pinned/stuck</strong> in the viewport while text
            content scrolls alongside it. As you scroll through different text sections, the pinned
            element animates (rotates, scales, changes) to match the narrative.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
              <h3 className="text-xl font-bold mb-3 text-purple-300">🔧 How It Works</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• Tall container (300vh+) holds content</li>
                <li>• Visual element: <code className="text-purple-400">position: sticky</code></li>
                <li>• Text steps scroll through viewport</li>
                <li>• ScrollTrigger detects step entry</li>
                <li>• Animations trigger on pinned element</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
              <h3 className="text-xl font-bold mb-3 text-pink-300">🎯 Why It Works</h3>
              <ul className="text-white/60 text-sm space-y-2">
                <li>• Keeps user's attention focused</li>
                <li>• Visual changes reinforce narrative</li>
                <li>• Feels interactive without clicks</li>
                <li>• Used by Apple, Stripe, NYT</li>
                <li>• Perfect for product launches</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Build */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">How to Build It</h2>
            <p className="text-white/60 text-lg">4 steps to create scrollytelling</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Structure: Tall Container",
                description:
                  "Create a section with high min-height (300vh = 3x viewport). This gives room to scroll.",
                code: `<div style={{ minHeight: '300vh' }}>
  {/* Sticky visual + text steps */}
</div>`,
                color: "from-purple-600 to-pink-600",
              },
              {
                step: "2",
                title: "CSS: Sticky Positioning",
                description:
                  "Pin the visual element with position: sticky, top: 0, height: 100vh. It stays while text scrolls.",
                code: `<div className="sticky top-0 h-screen">
  <YourVisual />
</div>`,
                color: "from-pink-600 to-orange-600",
              },
              {
                step: "3",
                title: "GSAP: ScrollTrigger Setup",
                description:
                  "Use ScrollTrigger to detect when text steps enter viewport. Set trigger to each step.",
                code: `ScrollTrigger.create({
  trigger: stepElement,
  start: "top center",
  end: "bottom center",
  scrub: true,
  onEnter: () => animateVisual()
});`,
                color: "from-orange-600 to-red-600",
              },
              {
                step: "4",
                title: "Animation: Trigger Changes",
                description:
                  "On step enter, animate the sticky element: rotate, scale, change color, etc.",
                code: `onEnter: (stickyElement) => {
  gsap.to(stickyElement, {
    rotation: 90,
    scale: 1.5,
    duration: 1
  });
}`,
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

      {/* Live Demo 1: Apple Style */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Demo 1: Apple Product Style</h2>
            <p className="text-white/60 text-lg">
              Centered text overlaying full-screen sticky visual
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <ScrollytellingApple
              stickyElement={
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-3xl flex items-center justify-center">
                  <div className="text-9xl font-black text-white/20">📱</div>
                </div>
              }
              steps={[
                createFadeStep(
                  <div className="text-center">
                    <h2 className="text-6xl font-bold mb-4">Stunning Display</h2>
                    <p className="text-xl text-white/70">Super Retina XDR technology</p>
                  </div>
                ),
                createScaleStep(
                  <div className="text-center">
                    <h2 className="text-6xl font-bold mb-4">Powerful Performance</h2>
                    <p className="text-xl text-white/70">A17 Pro chip inside</p>
                  </div>,
                  1.2
                ),
                createRotateStep(
                  <div className="text-center">
                    <h2 className="text-6xl font-bold mb-4">All-Day Battery</h2>
                    <p className="text-xl text-white/70">Up to 29 hours video playback</p>
                  </div>,
                  360
                ),
              ]}
            />
          </div>
        </div>
      </section>

      {/* Live Demo 2: Side-by-Side */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Demo 2: Side-by-Side Narrative</h2>
            <p className="text-white/60 text-lg">Text scrolls on right, visual pinned on left</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <ScrollytellingSideBySide
              stickyElement={
                <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
                  <div className="text-9xl font-black text-white/20">🚀</div>
                </div>
              }
              steps={[
                createFadeStep(
                  <div>
                    <h3 className="text-4xl font-bold mb-4 text-blue-400">Chapter 1: Launch</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Our journey begins with a simple idea: make the web more interactive. Scroll
                      down to continue the story.
                    </p>
                  </div>
                ),
                createScaleStep(
                  <div>
                    <h3 className="text-4xl font-bold mb-4 text-purple-400">Chapter 2: Growth</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      As we scroll, the visual element scales up, representing our expansion and
                      evolution.
                    </p>
                  </div>,
                  1.3
                ),
                createRotateStep(
                  <div>
                    <h3 className="text-4xl font-bold mb-4 text-pink-400">Chapter 3: Transform</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Finally, we reach transformation—a complete rotation symbolizing full-circle
                      innovation.
                    </p>
                  </div>,
                  180
                ),
              ]}
            />
          </div>
        </div>
      </section>

      {/* Component API */}
      <section className="py-24 px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Component API</h2>
            <p className="text-white/60 text-lg">Props and usage</p>
          </div>

          <div className="space-y-8">
            {/* Base Component */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">
                Scrollytelling (Base Component)
              </h3>
              <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
                <code className="text-sm text-blue-300">{`import { Scrollytelling } from "@/components/ui/scrollytelling";

<Scrollytelling
  stickyElement={<YourVisual />}
  steps={[
    {
      content: <h2>Step 1</h2>,
      onEnter: (el) => gsap.to(el, { rotation: 90 })
    }
  ]}
  heightMultiplier={3}
  textPosition="right"
  scrub={true}
/>`}</code>
              </pre>

              <div className="space-y-2">
                <h4 className="font-semibold text-white/80 mb-3">Props:</h4>
                {[
                  {
                    prop: "stickyElement",
                    type: "ReactNode",
                    desc: "Visual element to pin (image, 3D model, video)",
                  },
                  {
                    prop: "steps",
                    type: "ScrollytellingStep[]",
                    desc: "Array of steps with content and onEnter animations",
                  },
                  {
                    prop: "heightMultiplier",
                    type: "number",
                    desc: "Height multiplier for scroll area (default: 3 = 300vh)",
                  },
                  {
                    prop: "textPosition",
                    type: '"left" | "right" | "center"',
                    desc: "Position of text panel (default: right)",
                  },
                  { prop: "scrub", type: "boolean | number", desc: "Enable smooth scrub animation" },
                  { prop: "backgroundColor", type: "string", desc: "Background color/gradient" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
                    <code className="text-purple-400 font-mono w-40 flex-shrink-0">{item.prop}</code>
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
                  <code className="text-blue-300 text-lg">ScrollytellingApple</code>
                  <p className="text-white/60 text-sm mt-1">
                    Centered text, full-screen sticky visual (Apple product page style)
                  </p>
                </div>
                <div>
                  <code className="text-blue-300 text-lg">ScrollytellingSideBySide</code>
                  <p className="text-white/60 text-sm mt-1">
                    Text on right, visual pinned on left (or reverse)
                  </p>
                </div>
                <div>
                  <code className="text-blue-300 text-lg">ScrollytellingProduct</code>
                  <p className="text-white/60 text-sm mt-1">
                    Product feature reveals with scaling animations
                  </p>
                </div>
                <div>
                  <code className="text-blue-300 text-lg">Scrollytelling3DRotation</code>
                  <p className="text-white/60 text-sm mt-1">
                    Rotates 3D model progressively as user scrolls
                  </p>
                </div>
              </div>
            </div>

            {/* Helper Functions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Helper Functions</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-black/40 rounded-lg p-4">
                  <code className="text-blue-300">createFadeStep(content, duration?)</code>
                  <p className="text-white/60 mt-2">Creates step with fade-in animation</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <code className="text-blue-300">createRotateStep(content, rotation, duration?)</code>
                  <p className="text-white/60 mt-2">Creates step with rotation animation</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <code className="text-blue-300">createScaleStep(content, scale, duration?)</code>
                  <p className="text-white/60 mt-2">Creates step with scale animation</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <code className="text-blue-300">
                    create3DStep(content, rotateX, rotateY, rotateZ?, duration?)
                  </code>
                  <p className="text-white/60 mt-2">Creates step with 3D transform</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <code className="text-blue-300">createColorStep(content, backgroundColor, duration?)</code>
                  <p className="text-white/60 mt-2">Creates step with background color change</p>
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
            <p className="text-white/60 text-lg">Where scrollytelling shines</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "📱",
                title: "Product Launches",
                description: "Showcase features as user scrolls (Apple, Samsung, Tesla)",
              },
              {
                emoji: "📖",
                title: "Editorial Stories",
                description: "New York Times-style interactive journalism",
              },
              {
                emoji: "🎓",
                title: "Educational Content",
                description: "Explain concepts with visual progression",
              },
              {
                emoji: "🚗",
                title: "Automotive Sites",
                description: "Rotate car models, highlight features",
              },
              {
                emoji: "🏠",
                title: "Real Estate",
                description: "Tour properties with pinned floor plans",
              },
              {
                emoji: "💼",
                title: "SaaS Landing Pages",
                description: "Walk through product workflow step-by-step",
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
                title: "🎯 Use will-change",
                description:
                  "Add will-change: transform to sticky element for GPU acceleration",
                color: "blue",
              },
              {
                title: "⚡ Optimize Scrub",
                description:
                  "Set scrub: 1 instead of scrub: true for 1-second smooth scrub (less janky)",
                color: "purple",
              },
              {
                title: "📱 Mobile Considerations",
                description:
                  "Reduce heightMultiplier on mobile (2 instead of 3) for shorter scroll distance",
                color: "pink",
              },
              {
                title: "🎬 Lazy Load Media",
                description:
                  "If sticky element is video/3D, lazy load it to improve initial page load",
                color: "orange",
              },
              {
                title: "🧹 Cleanup ScrollTriggers",
                description:
                  "Always kill() ScrollTriggers on component unmount to prevent memory leaks",
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

      {/* Final CTA */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Tell Your Story
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Create immersive narratives that keep users engaged
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform">
              Copy Component
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 font-semibold hover:bg-white/20 transition-all">
              View on GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
