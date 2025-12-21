"use client";

import { QuantumLoading } from "@/components/ui/quantum-loading";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function QuantumLoadingDemo() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  const resetLoading = () => {
    setProgress(0);
    setIsLoading(true);
  };

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
            Quantum Loading States
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Electron orbital animations inspired by quantum physics. Perfect for loading screens,
            progress indicators, and scientific applications with mathematical precision.
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
            <h3 className="text-2xl font-semibold text-white mb-4">Interactive Quantum Loader</h3>
            <button
              onClick={resetLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              Reset Loading
            </button>
          </div>

          <div className="flex justify-center">
            <QuantumLoading
              size={300}
              progress={progress}
              showProgress={true}
              variant="orbital"
              electronCount={8}
            />
          </div>

          <div className="text-center mt-6">
            <div className="text-lg text-slate-300">
              Status: {isLoading ? "Loading..." : "Complete! 🎉"}
            </div>
            <div className="text-sm text-slate-400 mt-2">
              Electrons orbit at different energy levels with quantum-inspired animations
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
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Orbital Motion</h4>
            <div className="flex justify-center mb-4">
              <QuantumLoading
                size={180}
                progress={75}
                showProgress={false}
                variant="orbital"
                electronCount={6}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Classical orbital paths with precise electron positioning
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Probability Clouds</h4>
            <div className="flex justify-center mb-4">
              <QuantumLoading
                size={180}
                progress={60}
                showProgress={false}
                variant="probability"
                electronCount={6}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Quantum probability distributions around atomic orbitals
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Wave Functions</h4>
            <div className="flex justify-center mb-4">
              <QuantumLoading
                size={180}
                progress={85}
                showProgress={false}
                variant="wave"
                electronCount={6}
              />
            </div>
            <p className="text-slate-400 text-center text-sm">
              Wave-particle duality with electron trail effects
            </p>
          </div>
        </motion.div>

        {/* Size Variations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Size Variations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mb-4">
                <QuantumLoading
                  size={120}
                  progress={50}
                  showProgress={false}
                  variant="orbital"
                  electronCount={4}
                />
              </div>
              <p className="text-slate-400 text-sm">Small (120px)</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <QuantumLoading
                  size={160}
                  progress={50}
                  showProgress={false}
                  variant="orbital"
                  electronCount={5}
                />
              </div>
              <p className="text-slate-400 text-sm">Medium (160px)</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <QuantumLoading
                  size={200}
                  progress={50}
                  showProgress={false}
                  variant="orbital"
                  electronCount={6}
                />
              </div>
              <p className="text-slate-400 text-sm">Large (200px)</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <QuantumLoading
                  size={240}
                  progress={50}
                  showProgress={false}
                  variant="orbital"
                  electronCount={7}
                />
              </div>
              <p className="text-slate-400 text-sm">Extra Large (240px)</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">With Progress Text</h4>
            <div className="flex justify-center">
              <QuantumLoading
                size={200}
                progress={67}
                showProgress={true}
                variant="probability"
                electronCount={6}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Progress Only</h4>
            <div className="flex justify-center">
              <QuantumLoading
                size={200}
                progress={33}
                showProgress={false}
                variant="wave"
                electronCount={6}
              />
            </div>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold text-cyan-400">33%</div>
              <div className="text-sm text-slate-400">External progress display</div>
            </div>
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Basic Usage</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<QuantumLoading
  size={200}
  progress={75}
  variant="orbital"
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Custom Colors</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<QuantumLoading
  colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
  variant="probability"
  electronCount={8}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Progress Indicator</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<QuantumLoading
  progress={progress}
  showProgress={true}
  variant="wave"
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Minimal Loader</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<QuantumLoading
  size={120}
  showProgress={false}
  electronCount={4}
/>`}
            </pre>
          </div>
        </motion.div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚛️</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Scientific Apps</h4>
              <p className="text-slate-400 text-sm">
                Perfect for physics simulations, quantum computing interfaces, and educational tools
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Research Tools</h4>
              <p className="text-slate-400 text-sm">
                Loading states for data analysis, computational chemistry, and research applications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Tech Startups</h4>
              <p className="text-slate-400 text-sm">
                Modern loading animations for AI, machine learning, and quantum computing companies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Progressive Web Apps</h4>
              <p className="text-slate-400 text-sm">
                Engaging loading states for web applications with scientific or technical themes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}