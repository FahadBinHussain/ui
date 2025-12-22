"use client";

import React, { useState } from "react";
import { SoftBodyUI, JellyCard, JellyButton, JellyPanel } from "@/components/ui/soft-body-ui";

export default function SoftBodyUIDemo() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Soft Body UI (Jelly Physics)
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              UI elements that <span className="text-cyan-400">squish, stretch, and deform like jelly</span> when you interact with them.
              Built with Canvas 2D and spring physics for smooth, organic animations.
            </p>
          </div>

          {/* Main Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  Interactive Jelly Surface
                </h3>
                <p className="text-slate-400">
                  Move your mouse over the surface to create deformations
                </p>
              </div>
              <div className="flex justify-center">
                <SoftBodyUI
                  width={700}
                  height={400}
                  gridSize={20}
                  stiffness={0.12}
                  damping={0.88}
                  mouseRadius={120}
                  className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 text-white">
                      Jelly Physics
                    </h2>
                    <p className="text-lg text-slate-300">
                      Hover anywhere to see the mesh deform
                    </p>
                  </div>
                </SoftBodyUI>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jelly Cards Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Jelly Cards</h2>
            <p className="text-slate-400 text-lg">
              Cards with soft body physics that react to your cursor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <JellyCard title="Feature One" className="shadow-lg shadow-cyan-500/20">
              <p>Smooth deformation with spring physics creates organic motion</p>
            </JellyCard>

            <JellyCard title="Feature Two" className="shadow-lg shadow-blue-500/20">
              <p>Real-time vertex manipulation for responsive interactions</p>
            </JellyCard>

            <JellyCard title="Feature Three" className="shadow-lg shadow-purple-500/20">
              <p>Lightweight canvas-based rendering with zero WebGL overhead</p>
            </JellyCard>

            <JellyCard title="Customizable" className="shadow-lg shadow-pink-500/20">
              <p>Adjust stiffness, damping, and grid density for different feels</p>
            </JellyCard>

            <JellyCard title="Interactive" className="shadow-lg shadow-indigo-500/20">
              <p>Mouse proximity detection creates natural push-away effects</p>
            </JellyCard>

            <JellyCard title="Performant" className="shadow-lg shadow-emerald-500/20">
              <p>Optimized animation loop with requestAnimationFrame</p>
            </JellyCard>
          </div>
        </div>
      </section>

      {/* Jelly Buttons Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Jelly Buttons</h2>
            <p className="text-slate-400 text-lg">
              Buttons that squish and bounce when you hover over them
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center">
            <JellyButton onClick={() => setClickCount(clickCount + 1)}>
              Click Me!
            </JellyButton>

            <JellyButton className="border-purple-500/50">
              Hover Effect
            </JellyButton>

            <JellyButton className="border-pink-500/50">
              Jelly Action
            </JellyButton>

            <JellyButton className="border-green-500/50">
              Submit
            </JellyButton>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400">
              Button clicked: <span className="text-cyan-400 font-bold text-2xl">{clickCount}</span> times
            </p>
          </div>
        </div>
      </section>

      {/* Jelly Panel Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Jelly Panel</h2>
            <p className="text-slate-400 text-lg">
              Large interactive surfaces with fine-grained mesh deformation
            </p>
          </div>

          <div className="flex justify-center">
            <JellyPanel className="shadow-2xl shadow-purple-500/30">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6 text-purple-400">
                  Interactive Dashboard
                </h3>
                <p className="text-lg text-slate-300 mb-8">
                  This panel uses an 18×18 vertex grid for smoother deformations.
                  The physics simulation runs at 60fps for buttery smooth interactions.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-2xl font-bold text-cyan-400">20×20</div>
                    <div className="text-sm text-slate-400">Vertex Grid</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-2xl font-bold text-blue-400">60 FPS</div>
                    <div className="text-sm text-slate-400">Smooth Animation</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-2xl font-bold text-purple-400">Spring</div>
                    <div className="text-sm text-slate-400">Physics Model</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-2xl font-bold text-pink-400">Canvas</div>
                    <div className="text-sm text-slate-400">2D Rendering</div>
                  </div>
                </div>
                <p className="text-slate-400">
                  Move your cursor around to feel the jelly-like physics in action!
                </p>
              </div>
            </JellyPanel>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">
              The technical magic behind the jelly physics
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">
                  1. Vertex Grid
                </h3>
                <p className="text-slate-300">
                  A grid of vertices (e.g., 15×15) is created across the UI element, 
                  each storing its position, original position, and velocity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  2. Mouse Interaction
                </h3>
                <p className="text-slate-300">
                  When the cursor approaches a vertex, the distance is calculated. 
                  Vertices within the mouse radius are pushed away based on proximity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  3. Spring Physics
                </h3>
                <p className="text-slate-300">
                  Each vertex has a "spring" connecting it to its original position. 
                  The spring force pulls it back: <code className="text-pink-400">force = (original - current) × stiffness</code>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">
                  4. Damping
                </h3>
                <p className="text-slate-300">
                  Velocity is multiplied by a damping factor (0.85-0.9) each frame 
                  to prevent endless oscillation and create natural settling.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  5. Rendering
                </h3>
                <p className="text-slate-300">
                  The deformed mesh is drawn using Canvas 2D, with lines connecting 
                  adjacent vertices and a gradient fill for visual depth.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/30 p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Configuration Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <span className="text-cyan-400 font-mono">stiffness</span>
                <p className="text-slate-400 mt-1">Controls spring strength (0.1-0.2)</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <span className="text-blue-400 font-mono">damping</span>
                <p className="text-slate-400 mt-1">Reduces oscillation (0.8-0.95)</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <span className="text-purple-400 font-mono">mouseRadius</span>
                <p className="text-slate-400 mt-1">Interaction range (50-200px)</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <span className="text-pink-400 font-mono">gridSize</span>
                <p className="text-slate-400 mt-1">Vertex density (8-25)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-slate-400 text-lg">
              Where soft body physics can enhance your UI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Interactive Cards</h3>
              <p className="text-slate-300">
                Product cards, portfolio items, or feature showcases that respond 
                organically to user interaction, creating memorable experiences.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Playful Buttons</h3>
              <p className="text-slate-300">
                Call-to-action buttons that squish and bounce, providing tactile 
                feedback and encouraging user engagement.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Hero Sections</h3>
              <p className="text-slate-300">
                Landing page heroes with interactive backgrounds that create 
                immediate visual interest and user engagement.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-3">Modals & Overlays</h3>
              <p className="text-slate-300">
                Dialog boxes and popups with soft body effects that feel less rigid 
                and more inviting to interact with.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
