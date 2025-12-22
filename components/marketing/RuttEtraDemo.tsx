"use client";

import React, { useState } from "react";
import { RuttEtra } from "@/components/ui/rutt-etra";
import { Video, Image as ImageIcon, Cpu, Waves } from "lucide-react";

export default function RuttEtraDemo() {
  const [lineCount, setLineCount] = useState(80);
  const [amplitude, setAmplitude] = useState(2);
  const [rotationSpeed, setRotationSpeed] = useState(0.2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Rutt-Etra Video Synthesis
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              <span className="text-cyan-400">Retro-futuristic topology</span> where images become 3D landscapes.
              Brightness determines the height of scanlines, creating iconic 70s video art aesthetics.
            </p>
          </div>

          {/* Main Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  Interactive Scanline Visualization
                </h3>
                <p className="text-slate-400">
                  Watch as brightness values elevate horizontal lines into 3D space
                </p>
              </div>
              
              <div className="w-full h-[600px] bg-black rounded-xl border border-slate-700/50 overflow-hidden">
                <RuttEtra
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                  lineCount={lineCount}
                  amplitude={amplitude}
                  rotationSpeed={rotationSpeed}
                />
              </div>

              {/* Controls */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Waves className="inline-block w-4 h-4 mr-1" />
                    Line Count: {lineCount}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="10"
                    value={lineCount}
                    onChange={(e) => setLineCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Cpu className="inline-block w-4 h-4 mr-1" />
                    Amplitude: {amplitude.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={amplitude}
                    onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Video className="inline-block w-4 h-4 mr-1" />
                    Rotation Speed: {rotationSpeed.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Different Styles */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Visualization Styles</h2>
            <p className="text-slate-400 text-lg">
              Different configurations create unique topological effects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-cyan-400">High Density</h3>
                <p className="text-sm text-slate-400">150 lines, low amplitude</p>
              </div>
              <div className="w-full h-[400px]">
                <RuttEtra
                  imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
                  lineCount={150}
                  amplitude={1.5}
                  rotationSpeed={0.15}
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-blue-400">Deep Relief</h3>
                <p className="text-sm text-slate-400">60 lines, high amplitude</p>
              </div>
              <div className="w-full h-[400px]">
                <RuttEtra
                  imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                  lineCount={60}
                  amplitude={4}
                  rotationSpeed={0.25}
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-purple-400">Balanced</h3>
                <p className="text-sm text-slate-400">80 lines, medium amplitude</p>
              </div>
              <div className="w-full h-[400px]">
                <RuttEtra
                  imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                  lineCount={80}
                  amplitude={2.5}
                  rotationSpeed={0.2}
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
                <h3 className="text-xl font-bold text-pink-400">Minimal</h3>
                <p className="text-sm text-slate-400">40 lines, subtle depth</p>
              </div>
              <div className="w-full h-[400px]">
                <RuttEtra
                  imageUrl="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80"
                  lineCount={40}
                  amplitude={1.8}
                  rotationSpeed={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Breakdown</h2>
            <p className="text-slate-400 text-lg">
              How scanline displacement creates 3D topography
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                1. Horizontal Scanlines
              </h3>
              <p className="text-slate-300">
                The image is divided into horizontal strips (scanlines). Each line initially 
                exists as a flat 2D curve across the screen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                2. Brightness Sampling
              </h3>
              <p className="text-slate-300">
                For each point along a scanline, the luminance (brightness) of the source image 
                is calculated using: <code className="text-pink-400">L = 0.299R + 0.587G + 0.114B</code>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                3. Z-Axis Displacement
              </h3>
              <p className="text-slate-300">
                The brightness value directly controls the Z position (depth) of each point. 
                Brighter areas push forward, darker areas recede, creating topological relief.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">
                4. 3D Rotation
              </h3>
              <p className="text-slate-300">
                The camera or the geometry slowly rotates, revealing the depth dimension. 
                This transforms the 2D image into a sculptural, relief-like form.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                5. Color Gradient
              </h3>
              <p className="text-slate-300">
                Each scanline is assigned a color based on its vertical position, creating 
                the rainbow gradient effect typical of classic video synthesis.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Historical Context</h3>
            <p className="text-slate-300 mb-4">
              The <strong>Rutt/Etra Video Synthesizer</strong> was invented in the early 1970s 
              by Steve Rutt and Bill Etra. It was one of the first video tools to translate 
              brightness into vertical displacement on an oscilloscope.
            </p>
            <p className="text-slate-300">
              Artists like <strong>Steina and Woody Vasulka</strong> used it to create iconic 
              works that transformed video into sculptural, topographic forms. The aesthetic 
              influenced music videos, album covers, and remains popular in new media art.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Modern Applications</h2>
            <p className="text-slate-400 text-lg">
              Where Rutt-Etra aesthetics shine today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyan-400">Music Videos</h3>
              </div>
              <p className="text-slate-300">
                Create retro-futuristic visuals for electronic, synthwave, or experimental music. 
                The aesthetic immediately signals creativity and technical artistry.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-400">Album Art</h3>
              </div>
              <p className="text-slate-300">
                Transform artist photos or landscapes into striking cover art. The scanline 
                treatment adds depth and nostalgia perfect for vinyl releases.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-400">Data Visualization</h3>
              </div>
              <p className="text-slate-300">
                Represent data landscapes where values become literal heights. Perfect for 
                showing trends, distributions, or intensity maps in memorable ways.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pink-400">Interactive Installations</h3>
              </div>
              <p className="text-slate-300">
                Use webcam input for live Rutt-Etra transformation of visitors. Creates immersive, 
                participatory art experiences in galleries or events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
