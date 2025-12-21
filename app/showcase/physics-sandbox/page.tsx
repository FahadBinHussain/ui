"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Box } from "lucide-react";
import Link from "next/link";
import PhysicsSandboxDemo from "@/components/marketing/PhysicsSandboxDemo";

export default function PhysicsSandboxPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/showcase/all"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Showcase
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="inline-flex items-center justify-center mb-6"
          >
            <Box className="w-20 h-20 text-blue-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Physics Gravity Sandbox
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            UI elements that fall, stack, and bounce off each other with realistic
            2D physics. Powered by Matter.js for authentic gravity simulation,
            collision detection, and interactive drag-and-drop mechanics.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              "Matter.js",
              "2D Physics Engine",
              "Collision Detection",
              "Device Orientation",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-gray-200"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <PhysicsSandboxDemo />
        </motion.div>

        {/* Implementation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Implementation Steps</h2>
          <div className="space-y-6 text-gray-300">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Initialize Matter.js
                </h3>
                <p className="leading-relaxed">
                  Create the Matter.js Engine, Render, and World. Configure gravity and
                  rendering options including canvas size and background transparency.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Create Boundaries
                </h3>
                <p className="leading-relaxed">
                  Add static bodies for walls and floor to contain the physics simulation.
                  These invisible boundaries prevent elements from falling off screen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Generate Physics Bodies
                </h3>
                <p className="leading-relaxed">
                  Create dynamic bodies (rectangles/circles) for each UI element with
                  customizable properties like restitution, friction, and air resistance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Sync HTML with Physics
                </h3>
                <p className="leading-relaxed">
                  Map HTML elements to physics bodies' positions and rotations in a
                  requestAnimationFrame loop for smooth 60fps synchronization.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Add Mouse Interaction
                </h3>
                <p className="leading-relaxed">
                  Implement MouseConstraint to allow users to pick up, drag, and throw
                  elements with realistic spring-based physics attachment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Device Orientation (Optional)
                </h3>
                <p className="leading-relaxed">
                  Add device orientation listener to dynamically change gravity direction
                  when users tilt their mobile devices, creating an immersive experience.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tips & Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-green-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
              <span>✅</span>
              Best Practices
            </h3>
            <ul className="text-gray-300 leading-relaxed space-y-2">
              <li>• Balance restitution for playful yet realistic bouncing</li>
              <li>• Use appropriate friction to prevent endless sliding</li>
              <li>• Set reasonable gravity values (0-2 for Earth-like)</li>
              <li>• Limit the number of bodies for better performance</li>
            </ul>
          </div>

          <div className="bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span>⚡</span>
              Performance Tips
            </h3>
            <ul className="text-gray-300 leading-relaxed space-y-2">
              <li>• Use sleeping bodies for inactive elements</li>
              <li>• Optimize collision detection with proper bounds</li>
              <li>• Clean up physics world on unmount</li>
              <li>• Consider using Web Workers for complex simulations</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
