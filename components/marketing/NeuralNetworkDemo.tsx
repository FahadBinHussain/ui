"use client";

import { NeuralNetworkVisualizer, BrainVisualizer, SynapsePulse } from "@/components/ui/neural-network";
import { motion } from "framer-motion";

export function NeuralNetworkDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Neural Network Visualizer
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Interactive neural network visualizations showing data flow, node activations,
            and synaptic connections with beautiful animations and real-time activity.
          </p>
        </motion.div>

        {/* Main Network Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Live Neural Network</h3>
          <div className="relative" style={{ height: "400px" }}>
            <NeuralNetworkVisualizer
              nodeCount={10}
              layers={5}
              animationSpeed={1.5}
            />
          </div>
          <p className="text-slate-400 text-center mt-4">
            Watch as data flows through the network with animated connections and pulsing nodes
          </p>
        </motion.div>

        {/* Complexity Variations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Simple Network</h4>
            <div className="relative" style={{ height: "250px" }}>
              <NeuralNetworkVisualizer
                nodeCount={6}
                layers={3}
                animationSpeed={0.8}
                colors={{
                  node: "#10b981",
                  connection: "#6b7280",
                  active: "#3b82f6",
                }}
              />
            </div>
            <p className="text-slate-400 text-center mt-2 text-sm">3 layers, 6 nodes each</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Medium Network</h4>
            <div className="relative" style={{ height: "250px" }}>
              <NeuralNetworkVisualizer
                nodeCount={8}
                layers={4}
                animationSpeed={1.2}
                colors={{
                  node: "#8b5cf6",
                  connection: "#64748b",
                  active: "#f59e0b",
                }}
              />
            </div>
            <p className="text-slate-400 text-center mt-2 text-sm">4 layers, 8 nodes each</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Complex Network</h4>
            <div className="relative" style={{ height: "250px" }}>
              <NeuralNetworkVisualizer
                nodeCount={12}
                layers={6}
                animationSpeed={2}
                colors={{
                  node: "#ef4444",
                  connection: "#6b7280",
                  active: "#06b6d4",
                }}
              />
            </div>
            <p className="text-slate-400 text-center mt-2 text-sm">6 layers, 12 nodes each</p>
          </div>
        </motion.div>

        {/* Brain Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">3D Brain Visualization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-medium text-cyan-400 mb-4">Simple</h4>
              <div className="relative" style={{ height: "200px" }}>
                <BrainVisualizer complexity="simple" />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-medium text-cyan-400 mb-4">Medium</h4>
              <div className="relative" style={{ height: "200px" }}>
                <BrainVisualizer complexity="medium" />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-medium text-cyan-400 mb-4">Complex</h4>
              <div className="relative" style={{ height: "200px" }}>
                <BrainVisualizer complexity="complex" />
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-center mt-6">
            Multi-layered brain visualization with depth and overlapping networks
          </p>
        </motion.div>

        {/* Synapse Pulses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Synapse Communication</h4>
            <div className="flex justify-center items-center h-48">
              <SynapsePulse pulseCount={6} />
            </div>
            <p className="text-slate-400 text-center mt-2 text-sm">
              Pulsing synaptic connections showing neural activity
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">Colorful Synapses</h4>
            <div className="flex justify-center items-center h-48">
              <SynapsePulse
                pulseCount={4}
                colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]}
              />
            </div>
            <p className="text-slate-400 text-center mt-2 text-sm">
              Custom color schemes for different neural types
            </p>
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
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Basic Network</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<NeuralNetworkVisualizer
  nodeCount={8}
  layers={4}
  animationSpeed={1}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Custom Colors</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<NeuralNetworkVisualizer
  colors={{
    node: "#8b5cf6",
    connection: "#64748b",
    active: "#10b981"
  }}
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Brain Visualizer</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<BrainVisualizer
  complexity="medium"
/>`}
            </pre>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h4 className="text-lg font-medium text-cyan-400 mb-4">Synapse Pulse</h4>
            <pre className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`<SynapsePulse
  pulseCount={5}
  colors={["#3b82f6", "#8b5cf6"]}
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
                <span className="text-3xl">🤖</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">AI/ML Demos</h4>
              <p className="text-slate-400 text-sm">
                Visualize neural network training and inference processes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Brain Interfaces</h4>
              <p className="text-slate-400 text-sm">
                Show neural activity and brain-computer interfaces
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Data Flow</h4>
              <p className="text-slate-400 text-sm">
                Illustrate data processing pipelines and algorithms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎮</span>
              </div>
              <h4 className="text-lg font-medium text-white mb-2">Interactive Apps</h4>
              <p className="text-slate-400 text-sm">
                Create engaging educational tools and games
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}