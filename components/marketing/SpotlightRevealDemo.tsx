"use client";

import React from "react";
import { SpotlightReveal, WireframeReveal, TextReveal } from "@/components/ui/spotlight-reveal";
import { motion } from "framer-motion";
import { Flashlight, Eye, Lightbulb } from "lucide-react";

export default function SpotlightRevealDemo() {
  return (
    <div className="w-full space-y-12">
      {/* Main Demo - Image Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Flashlight className="w-8 h-8 text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">
            Flashlight Image Reveal
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Move your mouse to reveal the hidden image with a flashlight effect
        </p>
        <div className="flex justify-center">
          <SpotlightReveal
            backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            spotlightSize={180}
            darkOverlay="rgba(0, 0, 0, 0.98)"
            className="w-full h-[500px] rounded-2xl"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/20">
                <h2 className="text-4xl font-bold mb-2">Hidden Beauty</h2>
                <p className="text-xl">Move your mouse to reveal</p>
              </div>
            </div>
          </SpotlightReveal>
        </div>
      </motion.div>

      {/* Wireframe Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-8 h-8 text-green-400" />
          <h3 className="text-2xl font-bold text-white">
            Wireframe Mode
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Start with a wireframe overlay and reveal the full content underneath
        </p>
        <div className="flex justify-center">
          <WireframeReveal
            spotlightSize={150}
            wireframeColor="#00ff00"
            className="w-full h-[400px] rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
              alt="Mountain landscape"
              className="w-full h-full object-cover"
            />
          </WireframeReveal>
        </div>
      </motion.div>

      {/* Text Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">
            Text Spotlight
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Illuminate text to reveal colorful gradients
        </p>
        <div className="flex justify-center">
          <TextReveal
            text="ILLUMINATE"
            spotlightSize={120}
            fontSize="6rem"
            className="w-full h-[300px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl"
          />
        </div>
      </motion.div>

      {/* Small Spotlight Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Flashlight className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">
            Small Torch Effect
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Smaller spotlight for more focused exploration
        </p>
        <div className="flex justify-center">
          <SpotlightReveal
            backgroundImage="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80"
            spotlightSize={100}
            darkOverlay="rgba(0, 0, 0, 0.95)"
            className="w-full h-[400px] rounded-2xl"
            transitionSpeed={0.05}
          />
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h4 className="text-xl font-bold text-white mb-2">CSS Masking</h4>
            <p className="text-gray-300 text-sm">
              Pure CSS mask-image with radial gradients for smooth reveals
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🖱️</div>
            <h4 className="text-xl font-bold text-white mb-2">Mouse Tracking</h4>
            <p className="text-gray-300 text-sm">
              Real-time mouse position updates with smooth transitions
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-white mb-2">Performance</h4>
            <p className="text-gray-300 text-sm">
              Hardware-accelerated CSS for 60fps smooth animations
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
        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🎮</div>
          <h4 className="text-xl font-bold text-white mb-2">Gaming Interfaces</h4>
          <p className="text-gray-300">
            Create fog of war effects or exploration mechanics for web games
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🎨</div>
          <h4 className="text-xl font-bold text-white mb-2">Art Galleries</h4>
          <p className="text-gray-300">
            Interactive art reveals for portfolios and exhibitions
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">📖</div>
          <h4 className="text-xl font-bold text-white mb-2">Storytelling</h4>
          <p className="text-gray-300">
            Create mystery and suspense in interactive narratives
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🔍</div>
          <h4 className="text-xl font-bold text-white mb-2">Product Reveals</h4>
          <p className="text-gray-300">
            Build anticipation for product launches with interactive reveals
          </p>
        </div>
      </motion.div>
    </div>
  );
}
