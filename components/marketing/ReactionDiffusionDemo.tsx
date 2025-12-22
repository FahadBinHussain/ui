"use client";

import React, { useState } from "react";
import { ReactionDiffusion } from "@/components/ui/reaction-diffusion";
import { Beaker, Waves, Zap, Palette } from "lucide-react";

export default function ReactionDiffusionDemo() {
  const [preset, setPreset] = useState<"coral" | "spots" | "waves" | "maze">("coral");

  const presets = {
    coral: { feed: 0.055, kill: 0.062, dA: 1.0, dB: 0.5 },
    spots: { feed: 0.039, kill: 0.058, dA: 1.0, dB: 0.5 },
    waves: { feed: 0.014, kill: 0.054, dA: 1.0, dB: 0.5 },
    maze: { feed: 0.029, kill: 0.057, dA: 1.0, dB: 0.5 },
  };

  const currentPreset = presets[preset];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Reaction-Diffusion Patterns
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Biological growth patterns that <span className="text-cyan-400">generate and evolve in real-time</span>.
              Watch zebra stripes, coral formations, and organic patterns emerge from mathematical equations.
            </p>
          </div>

          {/* Main Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  Interactive Pattern Generator
                </h3>
                <p className="text-slate-400">
                  Click and drag to paint chemical concentrations and disturb the growth
                </p>
              </div>
              <div className="flex justify-center mb-6">
                <ReactionDiffusion
                  width={800}
                  height={600}
                  feedRate={currentPreset.feed}
                  killRate={currentPreset.kill}
                  diffusionRateA={currentPreset.dA}
                  diffusionRateB={currentPreset.dB}
                  className="shadow-2xl shadow-cyan-500/20"
                />
              </div>

              {/* Preset Controls */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setPreset("coral")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    preset === "coral"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Waves className="inline-block mr-2 w-5 h-5" />
                  Coral (f=0.055, k=0.062)
                </button>
                <button
                  onClick={() => setPreset("spots")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    preset === "spots"
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Palette className="inline-block mr-2 w-5 h-5" />
                  Spots (f=0.039, k=0.058)
                </button>
                <button
                  onClick={() => setPreset("waves")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    preset === "waves"
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Zap className="inline-block mr-2 w-5 h-5" />
                  Waves (f=0.014, k=0.054)
                </button>
                <button
                  onClick={() => setPreset("maze")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    preset === "maze"
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Beaker className="inline-block mr-2 w-5 h-5" />
                  Maze (f=0.029, k=0.057)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Gray-Scott Algorithm</h2>
            <p className="text-slate-400 text-lg">
              Mathematical beauty inspired by nature's patterns
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                1. Two Chemical Species
              </h3>
              <p className="text-slate-300">
                The simulation tracks two chemicals: <strong>A</strong> (substrate) and <strong>B</strong> (catalyst).
                Chemical A is constantly fed into the system, while B is removed (killed) at different rates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                2. Reaction Equation
              </h3>
              <p className="text-slate-300 mb-2">
                The chemicals interact: <code className="text-pink-400">A + 2B → 3B</code>
              </p>
              <p className="text-slate-300">
                When A meets two B molecules, they react to produce an additional B molecule. 
                This autocatalytic reaction creates the growth patterns.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                3. Diffusion
              </h3>
              <p className="text-slate-300">
                Both chemicals spread out through diffusion. The <strong>Laplacian operator</strong> calculates 
                how much chemical flows from neighboring cells, creating smooth gradients.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">
                4. WebGL Ping-Pong Buffers
              </h3>
              <p className="text-slate-300">
                Two textures alternate roles: one stores the current state while the other calculates 
                the next frame. After each computation, they swap, creating a continuous loop at 60fps.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                5. Mouse Interaction
              </h3>
              <p className="text-slate-300">
                Clicking adds chemical B to the simulation, disturbing the equilibrium and creating 
                new growth patterns that propagate and evolve organically.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Mathematical Equations</h3>
            <div className="space-y-4 text-center">
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">Rate of change for A:</p>
                <code className="text-cyan-400 text-lg">dA/dt = D_A × ∇²A - AB² + f(1-A)</code>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <p className="text-slate-300 mb-2">Rate of change for B:</p>
                <code className="text-blue-400 text-lg">dB/dt = D_B × ∇²B + AB² - (k+f)B</code>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <span className="text-purple-400 font-mono text-sm">D_A, D_B</span>
                  <p className="text-xs text-slate-400 mt-1">Diffusion rates</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <span className="text-pink-400 font-mono text-sm">∇²</span>
                  <p className="text-xs text-slate-400 mt-1">Laplacian operator</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <span className="text-green-400 font-mono text-sm">f</span>
                  <p className="text-xs text-slate-400 mt-1">Feed rate</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg">
                  <span className="text-yellow-400 font-mono text-sm">k</span>
                  <p className="text-xs text-slate-400 mt-1">Kill rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pattern Varieties</h2>
            <p className="text-slate-400 text-lg">
              Different parameter combinations produce vastly different patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400">Coral Patterns</h3>
                  <p className="text-sm text-slate-400">f=0.055, k=0.062</p>
                </div>
              </div>
              <p className="text-slate-300">
                Resembles coral growth with branching structures. High feed rate creates 
                dense formations that spread organically across the surface.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400">Spotted Patterns</h3>
                  <p className="text-sm text-slate-400">f=0.039, k=0.058</p>
                </div>
              </div>
              <p className="text-slate-300">
                Creates leopard-like spots or zebra stripes. Lower feed rate produces 
                isolated spots that maintain stable sizes and spacing.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400">Wave Patterns</h3>
                  <p className="text-sm text-slate-400">f=0.014, k=0.054</p>
                </div>
              </div>
              <p className="text-slate-300">
                Produces traveling waves and spiral formations. Very low feed rate creates 
                dynamic, ever-changing patterns that never settle.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <Beaker className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pink-400">Maze Patterns</h3>
                  <p className="text-sm text-slate-400">f=0.029, k=0.057</p>
                </div>
              </div>
              <p className="text-slate-300">
                Creates winding, maze-like structures. Medium feed rate produces connected 
                networks of channels reminiscent of biological tissue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Examples Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nature's Patterns</h2>
            <p className="text-slate-400 text-lg">
              These patterns appear throughout the natural world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Animal Markings</h3>
              <p className="text-slate-300">
                Zebra stripes, leopard spots, and fish patterns form through similar 
                reaction-diffusion processes during embryonic development.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Marine Life</h3>
              <p className="text-slate-300">
                Coral formations, sea anemones, and shell patterns grow following 
                reaction-diffusion-like chemical gradients.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Plant Growth</h3>
              <p className="text-slate-300">
                Leaf vein networks, moss colonies, and bacterial cultures exhibit 
                branching patterns governed by diffusion-limited aggregation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Creative Applications</h2>
            <p className="text-slate-400 text-lg">
              How to use reaction-diffusion in your projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Generative Art</h3>
              <p className="text-slate-300">
                Create unique, organic backgrounds and textures that are never the same twice. 
                Perfect for NFTs, album covers, and digital installations.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Interactive Backgrounds</h3>
              <p className="text-slate-300">
                Use as hero section backgrounds that respond to user interaction, creating 
                memorable first impressions for landing pages.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Data Visualization</h3>
              <p className="text-slate-300">
                Represent network spread, heat diffusion, or social media virality with 
                visually stunning, scientifically-grounded animations.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-3">Loading States</h3>
              <p className="text-slate-300">
                Replace boring spinners with mesmerizing pattern generation that keeps 
                users engaged during wait times.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
