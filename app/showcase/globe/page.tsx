"use client";

import { ThreeScene } from "@/components/three/ThreeScene";
import { Globe } from "@/components/three/Globe";
import { motion } from "framer-motion";

export default function GlobeShowcase() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Interactive 3D Globe
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A stunning 3D globe component with earth texture, smooth rotation, and interactive data markers.
            Perfect for displaying global statistics, locations, or creating immersive data visualizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Main Globe Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Earth Globe</h2>
            <p className="text-gray-400 mb-4">
              Interactive 3D globe with realistic earth texture, atmospheric glow, and data markers
              showing major cities around the world.
            </p>
            <div className="h-96 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 6], fov: 45 }}>
                <Globe radius={2.5} rotationSpeed={0.003} showMarkers={true} />
              </ThreeScene>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-white">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Realistic earth texture mapping
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Smooth rotation animation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Atmospheric glow effect
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Interactive data markers
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Customizable radius and speed
                </li>
              </ul>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-white">Use Cases</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Global data visualization</li>
                <li>• Location-based dashboards</li>
                <li>• Interactive world maps</li>
                <li>• Geographic presentations</li>
                <li>• Real-time statistics display</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Variations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 text-white">Fast Rotation</h3>
            <p className="text-gray-400 mb-4 text-sm">Quick rotation for dynamic displays</p>
            <div className="h-48 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 5], fov: 50 }}>
                <Globe radius={1.5} rotationSpeed={0.02} showMarkers={false} />
              </ThreeScene>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 text-white">No Markers</h3>
            <p className="text-gray-400 mb-4 text-sm">Clean globe without data points</p>
            <div className="h-48 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 5], fov: 50 }}>
                <Globe radius={1.5} rotationSpeed={0.005} showMarkers={false} />
              </ThreeScene>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 text-white">Large Scale</h3>
            <p className="text-gray-400 mb-4 text-sm">Bigger globe for hero sections</p>
            <div className="h-48 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 8], fov: 40 }}>
                <Globe radius={3} rotationSpeed={0.002} showMarkers={true} />
              </ThreeScene>
            </div>
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Usage</h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import { ThreeScene } from "@/components/three/ThreeScene";
import { Globe } from "@/components/three/Globe";

export function MyComponent() {
  return (
    <ThreeScene camera={{ position: [0, 0, 6], fov: 45 }}>
      <Globe
        radius={2.5}
        rotationSpeed={0.005}
        showMarkers={true}
      />
    </ThreeScene>
  );
}`}
            </pre>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Built with React Three Fiber for optimal performance and smooth 60fps animations.
            Add an earth texture image to your public folder as "earth-texture.jpg" for the full effect.
          </p>
        </motion.div>
      </div>
    </div>
  );
}