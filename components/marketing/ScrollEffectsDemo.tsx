"use client";

import React from "react";
import {
  ImageSequenceScroll,
  ProductRotateScroll,
} from "@/components/ui/image-sequence-scroll";
import {
  StickyStackingCards,
  FeatureStack,
  PortfolioStack,
  TimelineStack,
} from "@/components/ui/sticky-stacking-cards";

export default function ScrollEffectsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
            Scroll-Driven Effects
          </h1>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
            Apple-style <span className="text-purple-400">image sequence scrolling</span> and{" "}
            <span className="text-pink-400">sticky stacking cards</span> for premium storytelling experiences
          </p>
          <p className="text-slate-400 text-lg">
            Scroll down to experience both effects ↓
          </p>
        </div>
      </section>

      {/* Image Sequence Section Intro */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">Image Sequence Scroll</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Control a 3D product rotation or video strictly through scroll progress.
              The ultimate <span className="text-cyan-400">"Scrollytelling"</span> technique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Preload Frames</h3>
              <p className="text-slate-400 text-sm">
                100-200 optimized JPG/WebP frames loaded into memory to prevent flickering
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">GSAP ScrollTrigger</h3>
              <p className="text-slate-400 text-sm">
                Tween frame index from 0 to totalFrames based on scroll position with scrub
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-400">Canvas Rendering</h3>
              <p className="text-slate-400 text-sm">
                Draw current frame to canvas in onUpdate callback for smooth playback
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Demo: Scroll to Animate
              <span className="block text-sm text-slate-400 mt-2">
                (Using placeholder images - replace with actual frame exports)
              </span>
            </h3>
            <div className="bg-slate-950 rounded-xl overflow-hidden">
              <ImageSequenceScroll
                images={Array.from(
                  { length: 60 },
                  (_, i) => `https://picsum.photos/800/600?random=${i + 100}`
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Cards Section Intro */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">Sticky Stacking Cards</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Cards enter from the bottom and stack on top of each other, staying fixed until the section ends.
              A huge <span className="text-purple-400">UX trend</span> for condensing information.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Stack Demo */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Feature Showcase</h3>
            <p className="text-slate-400">
              Scroll to see features stack on top of each other
            </p>
          </div>
          <FeatureStack />
        </div>
      </section>

      {/* Portfolio Stack Demo */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Portfolio Projects</h3>
            <p className="text-slate-400">
              Showcase work with image backgrounds
            </p>
          </div>
          <PortfolioStack />
        </div>
      </section>

      {/* Timeline Stack Demo */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Company Timeline</h3>
            <p className="text-slate-400">
              Tell your story with chronological stacking
            </p>
          </div>
          <TimelineStack />
        </div>
      </section>

      {/* Technical Comparison */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Overview</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Sequence */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-cyan-500/30 p-8">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
                Image Sequence Scroll
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-white mb-2">Best For:</p>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li>3D product rotations (AirPods, phones)</li>
                    <li>Complex animations exported from Blender/Cinema4D</li>
                    <li>Video-like experiences with scroll control</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Performance:</p>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li>Preload all frames (10-50MB typical)</li>
                    <li>Use WebP for better compression</li>
                    <li>Canvas rendering is GPU-accelerated</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Implementation:</p>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li>Export 100-200 frames from 3D software</li>
                    <li>Optimize with ImageOptim or Squoosh</li>
                    <li>GSAP ScrollTrigger with scrub: 0.5</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sticky Cards */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-purple-500/30 p-8">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">
                Sticky Stacking Cards
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-white mb-2">Best For:</p>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li>Feature lists and product benefits</li>
                    <li>Portfolio project showcases</li>
                    <li>Company timelines and roadmaps</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Performance:</p>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li>Lightweight (CSS position: sticky)</li>
                    <li>No heavy assets or preloading</li>
                    <li>Smooth with native browser optimization</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Implementation:</p>
                  <ul className="text-slate-400 space-y-1 list-disc list-inside">
                    <li>Each card pinned at offset (20px, 40px, etc.)</li>
                    <li>Scale down previous cards for depth</li>
                    <li>Z-index stacking for proper overlap</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Usage Examples</h2>
          </div>

          <div className="space-y-8">
            {/* Image Sequence Code */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                Image Sequence Scroll
              </h3>
              <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`import { ImageSequenceScroll } from "@/components/ui/image-sequence-scroll";

// Generate frame URLs (replace with your actual frames)
const frames = Array.from(
  { length: 120 },
  (_, i) => \`/frames/airpods_\${String(i).padStart(4, "0")}.jpg\`
);

<div style={{ height: "400vh" }}>
  <ImageSequenceScroll 
    images={frames}
    preloadProgress={(progress) => console.log(\`\${progress * 100}%\`)}
  />
</div>
`}</code>
                </pre>
              </div>
            </div>

            {/* Sticky Cards Code */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Sticky Stacking Cards
              </h3>
              <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  <code>{`import { StickyStackingCards } from "@/components/ui/sticky-stacking-cards";

const cards = [
  {
    id: 1,
    title: "Feature One",
    description: "Incredible functionality that users will love",
    color: "bg-gradient-to-br from-cyan-600 to-blue-600",
  },
  {
    id: 2,
    title: "Feature Two",
    description: "Even more amazing capabilities",
    image: "/path/to/image.jpg",  // Optional background image
  },
];

<StickyStackingCards 
  cards={cards}
  cardHeight={500}  // Height in pixels
  gap={20}          // Gap between stacked cards
/>
`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Props Tables */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Component Props</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Sequence Props */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                ImageSequenceScroll
              </h3>
              <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-slate-700/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-cyan-400">Prop</th>
                      <th className="px-4 py-3 text-left text-cyan-400">Type</th>
                      <th className="px-4 py-3 text-left text-cyan-400">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    <tr>
                      <td className="px-4 py-3 font-mono text-purple-400">images</td>
                      <td className="px-4 py-3 text-slate-300">string[]</td>
                      <td className="px-4 py-3 text-slate-300">Array of image URLs</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-purple-400">preloadProgress</td>
                      <td className="px-4 py-3 text-slate-300">function</td>
                      <td className="px-4 py-3 text-slate-300">Callback with 0-1 progress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sticky Cards Props */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-400">
                StickyStackingCards
              </h3>
              <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-slate-700/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-purple-400">Prop</th>
                      <th className="px-4 py-3 text-left text-purple-400">Type</th>
                      <th className="px-4 py-3 text-left text-purple-400">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    <tr>
                      <td className="px-4 py-3 font-mono text-cyan-400">cards</td>
                      <td className="px-4 py-3 text-slate-300">Card[]</td>
                      <td className="px-4 py-3 text-slate-300">Array of card objects</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-cyan-400">cardHeight</td>
                      <td className="px-4 py-3 text-slate-300">number</td>
                      <td className="px-4 py-3 text-slate-300">Height in pixels (default: 500)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-cyan-400">gap</td>
                      <td className="px-4 py-3 text-slate-300">number</td>
                      <td className="px-4 py-3 text-slate-300">Gap between cards (default: 20)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-semibold mb-3">Product Launches</h3>
              <p className="text-slate-400">
                Apple-style reveals with 3D rotations and detailed feature exploration.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 p-8">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold mb-3">Portfolio Sites</h3>
              <p className="text-slate-400">
                Showcase projects and case studies with stacking card transitions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl border border-pink-500/30 p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold mb-3">SaaS Landing Pages</h3>
              <p className="text-slate-400">
                Feature highlights and benefit lists with scroll-driven storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
