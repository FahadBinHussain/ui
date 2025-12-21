"use client";

import { LiquidMorph, MorphingBlob, LiquidBackground } from "@/components/ui/liquid-morph";
import { motion } from "framer-motion";

export function LiquidMorphDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Liquid Morphing Shapes
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Organic fluid shapes that morph between different forms, perfect for loading states,
            backgrounds, and interactive elements with smooth SVG animations.
          </p>
        </motion.div>

        {/* Main Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Single Morphing Shape */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Morphing Shape</h3>
            <div className="flex justify-center">
              <LiquidMorph size={250} speed={2} />
            </div>
            <p className="text-slate-400 text-center mt-4">
              Cycles through different geometric shapes with smooth morphing
            </p>
          </div>

          {/* Multiple Blobs */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Morphing Blobs</h3>
            <div className="grid grid-cols-2 gap-4">
              <MorphingBlob size={100} intensity="gentle" color="#3b82f6" />
              <MorphingBlob size={100} intensity="medium" color="#8b5cf6" />
              <MorphingBlob size={100} intensity="intense" color="#06b6d4" />
              <MorphingBlob size={100} intensity="gentle" color="#10b981" />
            </div>
            <p className="text-slate-400 text-center mt-4">
              Different intensities and colors for various use cases
            </p>
          </div>
        </motion.div>

        {/* Interactive Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">Loading State</h4>
            <div className="flex items-center justify-center h-32">
              <LiquidMorph size={80} speed={1.5} />
            </div>
            <p className="text-slate-400 text-sm text-center mt-2">
              Perfect for loading indicators
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">Button Hover</h4>
            <div className="flex items-center justify-center h-32">
              <LiquidMorph
                size={60}
                speed={0.8}
                colors={["#f59e0b", "#ef4444", "#ec4899"]}
              />
            </div>
            <p className="text-slate-400 text-sm text-center mt-2">
              Interactive button effects
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">Background Element</h4>
            <div className="flex items-center justify-center h-32">
              <LiquidMorph
                size={70}
                speed={4}
                colors={["#06b6d4", "#3b82f6", "#8b5cf6"]}
              />
            </div>
            <p className="text-slate-400 text-sm text-center mt-2">
              Ambient background animations
            </p>
          </div>
        </motion.div>

        {/* Liquid Background Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 overflow-hidden"
        >
          <LiquidBackground blobCount={8} />
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Liquid Background</h3>
            <p className="text-slate-300 max-w-md mx-auto">
              Multiple morphing blobs create an organic, fluid background effect.
              Perfect for hero sections or ambient animations.
            </p>
            <div className="mt-6 p-6 bg-slate-900/50 rounded-lg backdrop-blur-sm">
              <p className="text-slate-400">
                This background contains 8 animated morphing blobs with random movement patterns,
                creating a dynamic and organic feel.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Usage Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-cyan-400">Basic Usage</h4>
              <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<LiquidMorph
  size={200}
  speed={3}
  colors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
/>`}
              </pre>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-cyan-400">Morphing Blob</h4>
              <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<MorphingBlob
  size={150}
  intensity="medium"
  color="#3b82f6"
/>`}
              </pre>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-cyan-400">Liquid Background</h4>
              <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<LiquidBackground
  blobCount={5}
  colors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
/>`}
              </pre>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-cyan-400">Custom Shapes</h4>
              <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<LiquidMorph
  shapes={[
    "M50,10 Q90,10 90,50...",
    "M20,20 L80,20 L90,50..."
  ]}
/>`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}