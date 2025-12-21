"use client";

import { BioOrganicGrowthLoader } from "@/components/ui/bio-organic-growth-loader";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BioOrganicGrowthLoaderDemo() {
  const [growthSpeed, setGrowthSpeed] = useState(0.02);
  const [maxIterations, setMaxIterations] = useState(100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Bio-Organic Growth Loaders
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            SVG-based organic shapes that grow like vines or crystalline structures using
            Differential Growth algorithms. Each pattern is uniquely alive and never repeats.
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
            <h3 className="text-2xl font-semibold text-white mb-4">Interactive Growth Simulation</h3>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-slate-300 text-sm">Growth Speed:</label>
                <input
                  type="range"
                  min="0.005"
                  max="0.05"
                  step="0.005"
                  value={growthSpeed}
                  onChange={(e) => setGrowthSpeed(parseFloat(e.target.value))}
                  className="w-20"
                />
                <span className="text-slate-400 text-xs">{growthSpeed.toFixed(3)}</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-slate-300 text-sm">Max Iterations:</label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(parseInt(e.target.value))}
                  className="w-20"
                />
                <span className="text-slate-400 text-xs">{maxIterations}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <BioOrganicGrowthLoader
              size={400}
              growthSpeed={growthSpeed}
              maxIterations={maxIterations}
            />
          </div>

          <div className="text-center mt-6">
            <div className="text-sm text-slate-400">
              Differential growth creates organic patterns that evolve uniquely each time
            </div>
          </div>
        </motion.div>

        {/* Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Vine Growth</h4>
            <div className="flex justify-center mb-4">
              <BioOrganicGrowthLoader
                size={180}
                growthSpeed={0.015}
                maxIterations={80}
                colors={['#10b981', '#059669', '#047857']}
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              Slow, steady growth mimicking plant vines
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Crystal Formation</h4>
            <div className="flex justify-center mb-4">
              <BioOrganicGrowthLoader
                size={180}
                growthSpeed={0.03}
                maxIterations={60}
                colors={['#06b6d4', '#0891b2', '#0e7490']}
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              Rapid crystalline structure development
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Neural Network</h4>
            <div className="flex justify-center mb-4">
              <BioOrganicGrowthLoader
                size={180}
                growthSpeed={0.025}
                maxIterations={120}
                colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
              />
            </div>
            <p className="text-xs text-slate-400 text-center">
              Complex branching like neural connections
            </p>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Technical Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-emerald-400 font-semibold mb-2">SVG Path Manipulation</div>
              <p className="text-slate-300 text-sm">
                Dynamic path generation using Bézier curves and point interpolation
              </p>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-semibold mb-2">Differential Growth</div>
              <p className="text-slate-300 text-sm">
                Algorithm that adds points between existing vertices and moves them outward
              </p>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-semibold mb-2">Recursive Algorithms</div>
              <p className="text-slate-300 text-sm">
                Iterative growth process with controlled complexity and performance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}