"use client";

import React from "react";
import {
  StickyStackingCards,
  FeatureStack,
  PortfolioStack,
  TimelineStack,
} from "@/components/ui/sticky-stacking-cards";

export default function StickyStackingCardsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-transparent bg-clip-text">
            Sticky Stacking Cards
          </h1>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto mb-8">
            Cards enter from the bottom and <span className="text-purple-400">stack on top of each other</span>,
            staying fixed until the section ends. A huge <span className="text-pink-400">UX trend</span> for
            condensing information in portfolios and feature lists.
          </p>
          <p className="text-slate-400 text-lg">
            Scroll down to see the effect ↓
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Mostly CSS magic with optional GSAP enhancements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Position: Sticky
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Each card uses <code className="bg-slate-950 px-2 py-1 rounded text-purple-300">position: sticky</code> to stick to the viewport as you scroll
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-purple-300">
                <div>position: sticky;</div>
                <div>top: 0;</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-pink-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                Offset Stacking
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Increasing <code className="bg-slate-950 px-2 py-1 rounded text-pink-300">top</code> values reveal cards behind
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-pink-300">
                <div>Card 1: top: 20px;</div>
                <div>Card 2: top: 40px;</div>
                <div>Card 3: top: 60px;</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-orange-500/30 p-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">
                Scale & Depth (Optional)
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                GSAP ScrollTrigger to scale down and darken previous cards
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-orange-300">
                <div>scale: 1 - index * 0.05</div>
                <div>// 0.95, 0.90, 0.85...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Stack Demo */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Feature Showcase</h3>
            <p className="text-slate-400 text-lg">
              Perfect for product features and benefits
            </p>
          </div>
          <FeatureStack />
        </div>
      </section>

      {/* Portfolio Stack Demo */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Portfolio Projects</h3>
            <p className="text-slate-400 text-lg">
              Showcase work with image backgrounds and descriptions
            </p>
          </div>
          <PortfolioStack />
        </div>
      </section>

      {/* Timeline Stack Demo */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Company Timeline</h3>
            <p className="text-slate-400 text-lg">
              Tell your story chronologically with stacking
            </p>
          </div>
          <TimelineStack />
        </div>
      </section>

      {/* Custom Example */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Custom Cards</h3>
            <p className="text-slate-400 text-lg">
              Build your own with custom content
            </p>
          </div>
          <StickyStackingCards
            cards={[
              {
                id: 1,
                title: "Custom Card 1",
                description: "You can pass custom content and styling",
                color: "bg-gradient-to-br from-cyan-600 to-blue-700",
              },
              {
                id: 2,
                title: "Custom Card 2",
                description: "Or use image backgrounds with overlays",
                image: "https://picsum.photos/id/1043/1200/800",
              },
              {
                id: 3,
                title: "Custom Card 3",
                description: "Full control over height, gap, and scale",
                color: "bg-gradient-to-br from-purple-600 to-pink-700",
              },
            ]}
            cardHeight={500}
            gap={25}
          />
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Implementation</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  CSS Foundation
                </h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">position: sticky</code> - 
                    Stick to viewport while scrolling
                  </p>
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">top: 20px * index</code> - 
                    Offset each card for visibility
                  </p>
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">z-index: cards.length - index</code> - 
                    Correct stacking order
                  </p>
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">pinSpacing: false</code> - 
                    No extra spacing during pin
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-400">
                  GSAP Enhancement
                </h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">ScrollTrigger.create()</code> - 
                    Pin cards at specific scroll positions
                  </p>
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">scale: 1 - index * 0.05</code> - 
                    Subtle scale reduction for depth
                  </p>
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">scrub: true</code> - 
                    Smooth scroll-linked animations
                  </p>
                  <p>
                    <code className="bg-slate-950 px-2 py-1 rounded">start: "top 20px"</code> - 
                    Dynamic trigger points per card
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Usage Example</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`import { StickyStackingCards } from "@/components/ui/sticky-stacking-cards";

const cards = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Optimized performance with millisecond response times",
    color: "bg-gradient-to-br from-cyan-600 to-blue-600",
  },
  {
    id: 2,
    title: "Secure by Default",
    description: "Enterprise-grade security with end-to-end encryption",
    color: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Portfolio Project",
    description: "Showcase with image background",
    image: "https://example.com/project.jpg",  // Optional
  },
];

<StickyStackingCards 
  cards={cards}
  cardHeight={500}  // Height in pixels (default: 500)
  gap={20}          // Gap between stacked cards (default: 20)
/>
`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Component Props</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-purple-400">Prop</th>
                  <th className="px-6 py-4 text-left text-purple-400">Type</th>
                  <th className="px-6 py-4 text-left text-purple-400">Default</th>
                  <th className="px-6 py-4 text-left text-purple-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-cyan-400">cards</td>
                  <td className="px-6 py-4 text-sm text-slate-300">Card[]</td>
                  <td className="px-6 py-4 text-sm text-slate-400">required</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Array of card objects with id, title, description, color/image
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-cyan-400">cardHeight</td>
                  <td className="px-6 py-4 text-sm text-slate-300">number</td>
                  <td className="px-6 py-4 text-sm text-slate-400">500</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Height of each card in pixels
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-cyan-400">gap</td>
                  <td className="px-6 py-4 text-sm text-slate-300">number</td>
                  <td className="px-6 py-4 text-sm text-slate-400">20</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Gap between stacked cards in pixels (20px, 40px, 60px...)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-cyan-400">className</td>
                  <td className="px-6 py-4 text-sm text-slate-300">string</td>
                  <td className="px-6 py-4 text-sm text-slate-400">""</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Additional CSS classes for container
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Card Object Structure</h3>
            <div className="bg-slate-950 rounded p-4 font-mono text-sm text-slate-300">
              <div>{"interface Card {"}</div>
              <div className="ml-4">id: string | number;</div>
              <div className="ml-4">title: string;</div>
              <div className="ml-4">description: string;</div>
              <div className="ml-4">image?: string;        <span className="text-slate-500">// Background image URL</span></div>
              <div className="ml-4">color?: string;        <span className="text-slate-500">// Tailwind gradient class</span></div>
              <div className="ml-4">content?: ReactNode;   <span className="text-slate-500">// Custom JSX content</span></div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 p-8">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold mb-3">Feature Lists</h3>
              <p className="text-slate-400">
                SaaS product features, app capabilities, service benefits condensed elegantly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl border border-pink-500/30 p-8">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold mb-3">Portfolio Projects</h3>
              <p className="text-slate-400">
                Case studies, work samples, client projects with images and descriptions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30 p-8">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold mb-3">Timelines</h3>
              <p className="text-slate-400">
                Company history, product roadmaps, career milestones, chronological stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Note */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
              <span>⚡</span>
              Performance Benefits
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Lightweight:</strong> Native CSS <code className="bg-slate-950 px-2 py-1 rounded">position: sticky</code> with no heavy assets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>GPU Accelerated:</strong> GSAP scale transforms use hardware acceleration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Mobile Friendly:</strong> Works perfectly on touch devices with smooth scrolling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>No Preloading:</strong> Unlike image sequences, loads instantly with minimal memory</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
