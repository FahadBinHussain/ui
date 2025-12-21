"use client";
import { motion } from "framer-motion";
import CrystalFractalBackground from "@/components/ui/crystal-fractal";

export default function CrystalFractalDemo() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <CrystalFractalBackground />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Crystal Fractals
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Geometric crystal formations that grow and refract light dynamically.
            Perfect for luxury brands, jewelry, and premium product showcases.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">WebGL Shaders</h3>
              <p className="text-gray-300">Advanced fragment shaders for real-time fractal rendering</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Crystal Geometry</h3>
              <p className="text-gray-300">Dynamic crystal formations with light refraction effects</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Fractal Algorithms</h3>
              <p className="text-gray-300">Mathematical fractal patterns with animated parameters</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-12 text-sm text-gray-400"
          >
            <p>✨ CSS-powered crystal animations • Fractal-like geometric patterns</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}