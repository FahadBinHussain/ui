"use client";

import React, { useState } from "react";
import { PhysicsSandbox, tagElements, iconElements, PhysicsElement } from "@/components/ui/physics-sandbox";
import { motion } from "framer-motion";
import { Box, Sparkles, Smartphone } from "lucide-react";

export default function PhysicsSandboxDemo() {
  const [customElements, setCustomElements] = useState<PhysicsElement[]>([
    { id: "custom1", content: "Drag Me!", color: "bg-gradient-to-r from-purple-500 to-pink-500", width: 120 },
    { id: "custom2", content: "Physics!", color: "bg-gradient-to-r from-cyan-500 to-blue-500", width: 110 },
    { id: "custom3", content: "Gravity", color: "bg-gradient-to-r from-green-500 to-emerald-500", width: 100 },
    { id: "custom4", content: "Bounce", color: "bg-gradient-to-r from-orange-500 to-red-500", width: 90 },
  ]);

  return (
    <div className="w-full space-y-12">
      {/* Main Demo - Tech Stack Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Box className="w-8 h-8 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">
            Tech Stack Sandbox
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Drag and throw technology tags around with realistic physics
        </p>
        <div className="flex justify-center">
          <PhysicsSandbox
            elements={tagElements}
            width={800}
            height={500}
            gravity={{ x: 0, y: 1 }}
          />
        </div>
      </motion.div>

      {/* Icon Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">
            Icon Physics
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Square icons that stack and bounce with satisfying physics
        </p>
        <div className="flex justify-center">
          <PhysicsSandbox
            elements={iconElements}
            width={700}
            height={400}
            gravity={{ x: 0, y: 1.5 }}
          />
        </div>
      </motion.div>

      {/* Mobile Orientation Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="w-8 h-8 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">
            Device Orientation (Mobile)
          </h3>
        </div>
        <p className="text-gray-300 mb-6">
          Tilt your device to change gravity direction - works on mobile devices
        </p>
        <div className="flex justify-center">
          <PhysicsSandbox
            elements={customElements}
            width={600}
            height={400}
            enableDeviceOrientation={true}
          />
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
      >
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h4 className="text-xl font-bold text-white mb-2">Matter.js Engine</h4>
            <p className="text-gray-300 text-sm">
              Powerful 2D physics engine with realistic collision detection
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-bold text-white mb-2">Interactive Dragging</h4>
            <p className="text-gray-300 text-sm">
              Pick up, throw, and interact with elements naturally
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-xl font-bold text-white mb-2">Mobile Support</h4>
            <p className="text-gray-300 text-sm">
              Device orientation changes gravity direction on mobile
            </p>
          </div>
        </div>
      </motion.div>

      {/* Physics Properties */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-8"
      >
        <h4 className="text-2xl font-bold text-white mb-4">Physics Properties</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              Restitution (Bounciness)
            </h5>
            <p className="leading-relaxed">
              Controls how bouncy objects are. Value of 0.6 gives a nice balance
              between realistic and playful bouncing.
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              Friction
            </h5>
            <p className="leading-relaxed">
              Simulates surface friction when objects slide against each other,
              making stacking behavior more realistic.
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              Air Resistance
            </h5>
            <p className="leading-relaxed">
              Slight air friction prevents perpetual motion and makes movement
              feel more natural and damped.
            </p>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-2">
              Mouse Constraint
            </h5>
            <p className="leading-relaxed">
              Allows users to pick up and throw objects with realistic spring-based
              attachment and release mechanics.
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
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🏷️</div>
          <h4 className="text-xl font-bold text-white mb-2">Tag Clouds</h4>
          <p className="text-gray-300">
            Interactive tag displays for skills, technologies, or categories
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🎮</div>
          <h4 className="text-xl font-bold text-white mb-2">Gamification</h4>
          <p className="text-gray-300">
            Add playful physics interactions to reward systems and achievements
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">🎨</div>
          <h4 className="text-xl font-bold text-white mb-2">Creative Portfolios</h4>
          <p className="text-gray-300">
            Unique way to showcase projects or skills with physical interactions
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-lg border border-orange-500/20 rounded-2xl p-6">
          <div className="text-4xl mb-4">📊</div>
          <h4 className="text-xl font-bold text-white mb-2">Data Visualization</h4>
          <p className="text-gray-300">
            Interactive data elements that users can manipulate and explore
          </p>
        </div>
      </motion.div>
    </div>
  );
}
