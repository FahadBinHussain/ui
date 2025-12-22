"use client";

import React, { useState } from "react";
import { DitheringShader } from "@/components/ui/dithering-shader";
import { Grid3X3, Palette, Camera, Box } from "lucide-react";

export default function DitheringDemo() {
  const [patternSize, setPatternSize] = useState<4 | 8 | 16>(8);
  const [colorScheme, setColorScheme] = useState<"classic" | "gameboy" | "cyan" | "retro">("classic");
  const [shape, setShape] = useState<"sphere" | "torus" | "box" | "knot">("torus");

  const colorSchemes = {
    classic: ["#000000", "#ffffff"] as [string, string],
    gameboy: ["#0f380f", "#9bbc0f"] as [string, string],
    cyan: ["#1a1a2e", "#00d9ff"] as [string, string],
    retro: ["#2d1b2e", "#ff6b9d"] as [string, string],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
              Dithering & Halftone Shading
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              <span className="text-green-400">Retro dithering patterns</span> using Bayer matrices 
              create a stylish "magazine print" or "Game Boy Camera" aesthetic on 3D objects.
            </p>
          </div>

          {/* Main Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-green-400">
                  Interactive Dithered 3D
                </h3>
                <p className="text-slate-400">
                  Watch smooth lighting transformed into pixelated patterns
                </p>
              </div>
              
              <div className="w-full h-[600px] bg-gray-100 rounded-xl border border-slate-700/50 overflow-hidden">
                <DitheringShader
                  patternSize={patternSize}
                  colors={colorSchemes[colorScheme]}
                  shape={shape}
                />
              </div>

              {/* Controls */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Grid3X3 className="inline-block w-4 h-4 mr-1" />
                    Pattern Size
                  </label>
                  <select
                    value={patternSize}
                    onChange={(e) => setPatternSize(parseInt(e.target.value) as 4 | 8 | 16)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                  >
                    <option value="4">4x4 (Coarse)</option>
                    <option value="8">8x8 (Balanced)</option>
                  </select>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Palette className="inline-block w-4 h-4 mr-1" />
                    Color Scheme
                  </label>
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                  >
                    <option value="classic">Classic B&W</option>
                    <option value="gameboy">Game Boy</option>
                    <option value="cyan">Cyber Cyan</option>
                    <option value="retro">Retro Pink</option>
                  </select>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Box className="inline-block w-4 h-4 mr-1" />
                    Shape
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                  >
                    <option value="sphere">Sphere</option>
                    <option value="torus">Torus</option>
                    <option value="box">Box</option>
                    <option value="knot">Knot</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Style Gallery */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Dithering Styles</h2>
            <p className="text-slate-400 text-lg">
              Different patterns and color schemes create distinct aesthetics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-green-400">Classic Black & White</h3>
                <p className="text-sm text-slate-400">Pure 1-bit dithering</p>
              </div>
              <div className="w-full h-[400px]">
                <DitheringShader
                  patternSize={8}
                  colors={["#000000", "#ffffff"]}
                  shape="sphere"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-green-600">Game Boy Green</h3>
                <p className="text-sm text-slate-400">Iconic handheld aesthetic</p>
              </div>
              <div className="w-full h-[400px]">
                <DitheringShader
                  patternSize={8}
                  colors={["#0f380f", "#9bbc0f"]}
                  shape="torus"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-cyan-400">Cyber Cyan</h3>
                <p className="text-sm text-slate-400">Futuristic digital look</p>
              </div>
              <div className="w-full h-[400px]">
                <DitheringShader
                  patternSize={4}
                  colors={["#1a1a2e", "#00d9ff"]}
                  shape="knot"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-pink-400">Retro Pink</h3>
                <p className="text-sm text-slate-400">Vaporwave vibes</p>
              </div>
              <div className="w-full h-[400px]">
                <DitheringShader
                  patternSize={8}
                  colors={["#2d1b2e", "#ff6b9d"]}
                  shape="box"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">
              The math and magic behind Bayer matrix dithering
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                1. Bayer Matrix
              </h3>
              <p className="text-slate-300">
                A repeating pattern of threshold values (4x4 or 8x8 grid). Each pixel position 
                maps to a specific threshold between 0 and 1. The pattern is designed to minimize 
                visible artifacts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                2. Lighting Calculation
              </h3>
              <p className="text-slate-300">
                Standard Lambert shading calculates how lit each pixel is: 
                <code className="text-pink-400 ml-1">light = max(dot(normal, lightDir), 0)</code>. 
                This gives a smooth gradient from 0 (dark) to 1 (bright).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                3. Threshold Comparison
              </h3>
              <p className="text-slate-300">
                Instead of displaying the light value directly, we compare it to the Bayer threshold: 
                <code className="text-pink-400 ml-1">if (light &gt; threshold) use colorB else use colorA</code>. 
                This creates the dithered pattern.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                4. Screen-Space Sampling
              </h3>
              <p className="text-slate-300">
                The Bayer matrix is tiled across screen space, not object space. This ensures 
                the pattern stays consistent as the object rotates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">
                5. 1-Bit Color Output
              </h3>
              <p className="text-slate-300">
                Every pixel is either colorA or colorB—no in-between. This binary decision creates 
                the halftone effect, similar to newspaper printing or early computer graphics.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl border border-green-500/30 p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Bayer Matrix (4x4)</h3>
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {[0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((val, i) => (
                <div
                  key={i}
                  className="bg-slate-900/50 p-3 rounded text-center font-mono"
                  style={{ opacity: 0.3 + (val / 15) * 0.7 }}
                >
                  {val}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 text-center mt-4">
              Values normalized to 0-1 range become threshold for each pixel
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-slate-400 text-lg">
              Where dithered 3D aesthetics work best
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Retro Games</h3>
              </div>
              <p className="text-slate-300">
                Perfect for indie games going for Game Boy, early PC, or ZX Spectrum aesthetics. 
                Instantly recognizable and nostalgic.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Grid3X3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400">Print Design</h3>
              </div>
              <p className="text-slate-300">
                Simulate newspaper halftones or magazine prints. Great for posters, album art, 
                or zine layouts with a DIY punk aesthetic.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-400">Art Installations</h3>
              </div>
              <p className="text-slate-300">
                Create gallery pieces exploring the intersection of digital and analog. 
                The low-fi rendering makes smooth 3D feel handmade.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-400">Branding</h3>
              </div>
              <p className="text-slate-300">
                Stand out with lo-fi 3D product renders. The dithering adds texture and 
                character that smooth rendering lacks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
