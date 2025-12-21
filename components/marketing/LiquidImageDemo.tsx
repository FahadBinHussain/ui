"use client";

import React from "react";
import { LiquidImage, LiquidImageGrid } from "@/components/ui/liquid-image";
import { motion } from "framer-motion";
import { Droplets, Waves, Sparkles } from "lucide-react";

export default function LiquidImageDemo() {
  const sampleImages = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      alt: "Mountain landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      alt: "Forest path",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      alt: "Nature scene",
    },
  ];

  return (
    <div className="w-full space-y-16">
      {/* Hero Demo - Large Single Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Droplets className="w-8 h-8 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">
            Liquid Distortion Effect
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Hover over the image to see the mesmerizing liquid ripple effect
        </p>
        <div className="flex justify-center">
          <LiquidImage
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80"
            alt="Mountain vista"
            width={800}
            height={500}
            intensity={0.25}
          />
        </div>
      </motion.div>

      {/* Medium Intensity Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Waves className="w-8 h-8 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">
            High Intensity Ripples
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          More dramatic water-like distortion with increased intensity
        </p>
        <div className="flex justify-center">
          <LiquidImage
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
            alt="Mountain peaks"
            width={700}
            height={450}
            intensity={0.5}
          />
        </div>
      </motion.div>

      {/* Grid Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">
            Image Gallery
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Multiple images with synchronized liquid effects
        </p>
        <div className="flex justify-center">
          <LiquidImageGrid
            images={sampleImages}
            columns={3}
            imageWidth={300}
            imageHeight={200}
            gap={20}
          />
        </div>
      </motion.div>

      {/* Technical Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-xl font-bold text-white mb-2">WebGL Shaders</h4>
            <p className="text-gray-300 text-sm">
              Custom GLSL shaders for realistic liquid distortion effects
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🌊</div>
            <h4 className="text-xl font-bold text-white mb-2">Ripple Physics</h4>
            <p className="text-gray-300 text-sm">
              Realistic wave propagation based on mouse interaction
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-white mb-2">GPU Accelerated</h4>
            <p className="text-gray-300 text-sm">
              Hardware-accelerated rendering for smooth 60fps animations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Shader Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8"
      >
        <h4 className="text-2xl font-bold text-white mb-4">Shader Breakdown</h4>
        <div className="space-y-4 text-gray-300">
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              1. Displacement Map
            </h5>
            <p className="leading-relaxed">
              Uses procedural noise to create organic displacement patterns that simulate
              water turbulence and flow
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              2. Ripple Effect
            </h5>
            <p className="leading-relaxed">
              Calculates distance from mouse position and creates concentric waves with
              time-based animation for natural movement
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              3. UV Distortion
            </h5>
            <p className="leading-relaxed">
              Modifies texture coordinates based on displacement and ripples, controlled
              by hover state for smooth transitions
            </p>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              4. Color Enhancement
            </h5>
            <p className="leading-relaxed">
              Subtle color shifts during interaction enhance the liquid effect and add
              depth to the distortion
            </p>
          </div>
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🖼️</div>
          <h4 className="text-xl font-bold text-white mb-2">Portfolio Sites</h4>
          <p className="text-gray-300">
            Create stunning visual experiences for photography and design portfolios
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🎭</div>
          <h4 className="text-xl font-bold text-white mb-2">Creative Galleries</h4>
          <p className="text-gray-300">
            Enhance image galleries with interactive liquid distortion effects
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🌟</div>
          <h4 className="text-xl font-bold text-white mb-2">Landing Pages</h4>
          <p className="text-gray-300">
            Add unique visual interest to hero sections and feature showcases
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-lg border border-orange-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🎨</div>
          <h4 className="text-xl font-bold text-white mb-2">Art Exhibitions</h4>
          <p className="text-gray-300">
            Digital art presentations with immersive interactive elements
          </p>
        </div>
      </motion.div>
    </div>
  );
}
