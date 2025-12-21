"use client";

import { WaveParticleSystem, RippleEffect, WaveBackground } from "@/components/ui/wave-particles";
import { motion } from "framer-motion";

export function WaveParticlesDemo() {
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
            Particle Wave Interactions
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Interactive particle systems that create wave-like patterns and respond to mouse movement
            with fluid animations and dynamic connections.
          </p>
        </motion.div>

        {/* Main Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12 overflow-hidden"
          style={{ height: "500px" }}
        >
          <WaveBackground waveCount={3} />
          <WaveParticleSystem
            particleCount={60}
            waveIntensity={1.5}
            mouseRadius={200}
            className="absolute inset-0"
          />
          <div className="absolute top-4 left-4 z-10">
            <h3 className="text-2xl font-semibold text-white mb-2">Interactive Particle System</h3>
            <p className="text-slate-300 text-sm max-w-md">
              Move your mouse around to see particles respond with wave-like patterns.
              Particles connect to nearby particles and create dynamic networks.
            </p>
          </div>
        </motion.div>

        {/* Demo Variations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Gentle Waves */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Gentle Waves</h3>
            <div className="relative rounded-lg overflow-hidden" style={{ height: "300px" }}>
              <WaveParticleSystem
                particleCount={30}
                waveIntensity={0.5}
                mouseRadius={120}
                colors={["#10b981", "#06b6d4", "#3b82f6"]}
              />
            </div>
            <p className="text-slate-400 text-center mt-4 text-sm">
              Subtle, calming particle interactions
            </p>
          </div>

          {/* Intense Waves */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Intense Waves</h3>
            <div className="relative rounded-lg overflow-hidden" style={{ height: "300px" }}>
              <WaveParticleSystem
                particleCount={80}
                waveIntensity={2.5}
                mouseRadius={250}
                colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
              />
            </div>
            <p className="text-slate-400 text-center mt-4 text-sm">
              High-energy, dramatic particle effects
            </p>
          </div>
        </motion.div>

        {/* Ripple Effect Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Ripple Effects</h3>
          <div className="relative rounded-lg overflow-hidden" style={{ height: "300px" }}>
            <WaveBackground waveCount={2} colors={["#3b82f6", "#06b6d4"]} />
            <RippleEffect
              className="absolute inset-0"
              colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]}
              rippleCount={2}
            />
          </div>
          <p className="text-slate-400 text-center mt-4">
            Click anywhere to create expanding ripple effects with multiple concentric circles
          </p>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Particle System</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<WaveParticleSystem
  particleCount={50}
  waveIntensity={1}
  mouseRadius={150}
  colors={["#3b82f6", "#8b5cf6"]}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Ripple Effect</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<RippleEffect
  colors={["#3b82f6", "#06b6d4"]}
  rippleCount={3}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Wave Background</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<WaveBackground
  waveCount={3}
  colors={["#3b82f6", "#8b5cf6"]}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Customization</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`// Adjust wave intensity
waveIntensity={0.5} // Gentle
waveIntensity={2.0} // Intense

// Control particle count
particleCount={30} // Minimal
particleCount={100} // Dense`}
            </pre>
          </div>
        </motion.div>

        {/* Performance Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Performance & Usage Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Performance</h4>
              <p className="text-slate-400 text-sm">
                Reduce particle count for better performance on mobile devices.
                Use requestAnimationFrame for smooth 60fps animations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Interactivity</h4>
              <p className="text-slate-400 text-sm">
                Mouse radius controls interaction area. Higher values create
                more widespread wave effects.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Customization</h4>
              <p className="text-slate-400 text-sm">
                Easily customize colors, wave intensity, and particle behavior
                to match your design system.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}