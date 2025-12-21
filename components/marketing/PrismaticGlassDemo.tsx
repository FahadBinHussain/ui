"use client";

import {
  PrismaticGlass,
  PrismaticCard,
  SVGPrismatic,
  PrismEffect,
} from "@/components/ui/prismatic-glass";

export default function PrismaticGlassDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8 space-y-20">
      {/* Prismatic Cards */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Prismatic Glass Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PrismaticCard intensity={4} glowColor="rgba(236, 72, 153, 0.5)">
            <h3 className="text-2xl font-bold mb-4 text-pink-300">Chromatic</h3>
            <p className="text-gray-300">
              Hover to see RGB channel separation creating a prismatic effect at the edges.
            </p>
          </PrismaticCard>

          <PrismaticCard intensity={5} glowColor="rgba(147, 51, 234, 0.5)">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Dispersion</h3>
            <p className="text-gray-300">
              Light splits into its component colors like passing through a prism.
            </p>
          </PrismaticCard>

          <PrismaticCard intensity={6} glowColor="rgba(6, 182, 212, 0.5)">
            <h3 className="text-2xl font-bold mb-4 text-cyan-300">Aberration</h3>
            <p className="text-gray-300">
              RGB layers offset dynamically based on mouse position and distance.
            </p>
          </PrismaticCard>
        </div>
      </section>

      {/* Prism Rainbow Effect */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
          Rainbow Prism Effect
        </h2>
        <div className="max-w-4xl mx-auto">
          <PrismEffect className="p-12 bg-black/40 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <h3 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Light Dispersion
              </h3>
              <p className="text-xl text-gray-300">
                Move your mouse to see rainbow colors disperse from the focal point
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <div className="px-6 py-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">
                  Feature One
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">
                  Feature Two
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">
                  Feature Three
                </div>
              </div>
            </div>
          </PrismEffect>
        </div>
      </section>

      {/* RGB Channel Separation */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-white">
          RGB Channel Separation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-4 text-white">Normal Glass</h3>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-center">
              <p className="text-2xl font-bold">Standard Blur Effect</p>
              <p className="mt-4">Traditional glassmorphism with simple backdrop blur</p>
            </div>
          </div>

          <div className="relative">
            <h3 className="text-2xl font-bold mb-4 text-white">Prismatic Glass</h3>
            <PrismaticGlass intensity={4} blurAmount={15} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-center">
                <p className="text-2xl font-bold">Chromatic Aberration</p>
                <p className="mt-4">RGB channels offset for a prismatic effect</p>
              </div>
            </PrismaticGlass>
          </div>
        </div>
      </section>

      {/* Large Hero Section */}
      <section className="space-y-8">
        <div className="relative max-w-7xl mx-auto">
          <PrismEffect className="min-h-[600px] flex items-center justify-center bg-black/30">
            <div className="text-center space-y-8 p-12">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Prismatic UI
              </h1>
              <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
                Experience glassmorphism with chromatic aberration and light dispersion effects
              </p>
              <div className="flex gap-6 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full font-bold text-lg border border-white/20 hover:scale-105 transition-transform">
                  Learn More
                </button>
              </div>
            </div>
          </PrismEffect>
        </div>
      </section>

      {/* Card Grid */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-white">
          Feature Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { title: "Refraction", color: "rgba(239, 68, 68, 0.5)", icon: "🔴" },
            { title: "Dispersion", color: "rgba(59, 130, 246, 0.5)", icon: "🔵" },
            { title: "Aberration", color: "rgba(34, 197, 94, 0.5)", icon: "🟢" },
            { title: "Spectrum", color: "rgba(168, 85, 247, 0.5)", icon: "🟣" },
          ].map((item, index) => (
            <PrismaticCard
              key={index}
              intensity={3 + index}
              glowColor={item.color}
              className="h-64"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="text-6xl">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">
                    Interactive prismatic effect {index + 1}
                  </p>
                </div>
              </div>
            </PrismaticCard>
          ))}
        </div>
      </section>

      {/* SVG Filter Demo */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-white">
          SVG Filter Approach
        </h2>
        <div className="max-w-4xl mx-auto">
          <SVGPrismatic offsetAmount={10} className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10">
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-bold">SVG Chromatic Effect</h3>
              <p className="text-xl text-gray-300">
                Using SVG filters for hardware-accelerated RGB channel separation
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="aspect-square bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-bold">R</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-bold">G</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-bold">B</span>
                </div>
              </div>
            </div>
          </SVGPrismatic>
        </div>
      </section>
    </div>
  );
}
