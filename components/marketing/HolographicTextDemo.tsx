"use client";

import { HolographicText } from "@/components/ui/holographic-text";
import { motion } from "framer-motion";
import { useState } from "react";

export function HolographicTextDemo() {
  const [selectedVariant, setSelectedVariant] = useState<'classic' | 'rainbow' | 'cyber' | 'neon'>('classic');
  const [fontSize, setFontSize] = useState(48);
  const [depth, setDepth] = useState(20);
  const [speed, setSpeed] = useState(1);

  const variants = [
    { name: 'Classic', value: 'classic' as const, description: 'Traditional holographic colors' },
    { name: 'Rainbow', value: 'rainbow' as const, description: 'Full spectrum rainbow effect' },
    { name: 'Cyber', value: 'cyber' as const, description: 'High-tech cyan and magenta' },
    { name: 'Neon', value: 'neon' as const, description: 'Bright neon color palette' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Holographic Text Projections
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            3D text that appears to float in space with dynamic holographic color shifting.
            Perfect for futuristic interfaces, logos, and immersive digital experiences.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <HolographicText
                text="HOLOGRAPHIC"
                fontSize={fontSize}
                depth={depth}
                speed={speed}
                variant={selectedVariant}
                glowIntensity={1.5}
              />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Variant</label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                >
                  {variants.map(variant => (
                    <option key={variant.value} value={variant.value}>{variant.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Depth: {depth}</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Speed: {speed.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Variant Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {variants.map((variant, index) => (
            <motion.div
              key={variant.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
            >
              <h4 className="text-lg font-semibold text-white mb-4 text-center">{variant.name}</h4>
              <div className="flex justify-center mb-4">
                <HolographicText
                  text="FUTURE"
                  fontSize={36}
                  variant={variant.value}
                  depth={15}
                />
              </div>
              <p className="text-slate-400 text-center text-sm">{variant.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Size Variations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Size Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mb-4">
                <HolographicText text="XS" fontSize={24} variant="cyber" />
              </div>
              <p className="text-slate-400 text-sm">24px - Small labels</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <HolographicText text="MD" fontSize={36} variant="rainbow" />
              </div>
              <p className="text-slate-400 text-sm">36px - Headlines</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <HolographicText text="LG" fontSize={48} variant="neon" />
              </div>
              <p className="text-slate-400 text-sm">48px - Hero text</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <HolographicText text="XL" fontSize={64} variant="classic" />
              </div>
              <p className="text-slate-400 text-sm">64px - Display</p>
            </div>
          </div>
        </motion.div>

        {/* Real-world Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Brand Logo</h4>
            <div className="flex justify-center mb-4">
              <HolographicText
                text="NEXUS"
                fontSize={42}
                variant="cyber"
                depth={25}
                speed={0.8}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Perfect for tech company branding with deep 3D projection
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Sci-Fi Interface</h4>
            <div className="flex justify-center mb-4">
              <HolographicText
                text="SYSTEM ONLINE"
                fontSize={28}
                variant="neon"
                depth={15}
                speed={1.5}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Status displays and interface elements in futuristic UIs
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Gaming Title</h4>
            <div className="flex justify-center mb-4">
              <HolographicText
                text="LEVEL UP"
                fontSize={38}
                variant="rainbow"
                depth={20}
                speed={2}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Dynamic game interfaces and achievement notifications
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Data Stream</h4>
            <div className="flex justify-center mb-4">
              <HolographicText
                text="PROCESSING..."
                fontSize={32}
                variant="classic"
                depth={18}
                speed={1.2}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Loading states and data processing indicators
            </p>
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Basic Usage</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<HolographicText
  text="HELLO WORLD"
  fontSize={48}
  variant="classic"
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Advanced Configuration</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<HolographicText
  text="FUTURE"
  fontSize={64}
  depth={30}
  speed={1.5}
  variant="rainbow"
  glowIntensity={2}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Custom Colors</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<HolographicText
  text="CUSTOM"
  colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
  variant="classic"
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Minimal Setup</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<HolographicText
  text="SIMPLE"
  floating={false}
/>`}
            </pre>
          </div>
        </motion.div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Tech Brands</h4>
              <p className="text-slate-400 text-sm">
                Modern tech companies and startups looking for cutting-edge visual identity
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎮</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Gaming</h4>
              <p className="text-slate-400 text-sm">
                Game interfaces, loading screens, and sci-fi themed gaming experiences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎬</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Digital Media</h4>
              <p className="text-slate-400 text-sm">
                Movie titles, music videos, and digital art installations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Sci-Fi Interfaces</h4>
              <p className="text-slate-400 text-sm">
                Futuristic dashboards, control panels, and immersive user experiences
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}