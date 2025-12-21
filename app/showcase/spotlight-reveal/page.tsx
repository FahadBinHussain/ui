"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Flashlight } from "lucide-react";
import Link from "next/link";
import SpotlightRevealDemo from "@/components/marketing/SpotlightRevealDemo";

export default function SpotlightRevealPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
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
            <Flashlight className="w-20 h-20 text-yellow-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Spotlight Torch Reveal
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your cursor into a flashlight that reveals hidden content.
            The screen stays dark or shows wireframes until you illuminate areas
            with your mouse, creating an engaging exploration experience.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              "CSS Mask-Image",
              "Radial Gradients",
              "Mouse Tracking",
              "Custom Properties",
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
          <SpotlightRevealDemo />
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
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Layer Stacking
                </h3>
                <p className="leading-relaxed">
                  Create two absolutely positioned layers: Bottom layer with full-color content,
                  top layer with dark overlay or wireframe effect.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  CSS Masking
                </h3>
                <p className="leading-relaxed">
                  Apply CSS mask-image with radial gradient to the top layer. Use transparent
                  at center to create a "hole" effect: <code className="text-cyan-400">mask-image: radial-gradient(circle 150px at var(--x) var(--y), transparent 0%, black 100%)</code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Mouse Tracking
                </h3>
                <p className="leading-relaxed">
                  Add mousemove event listener to the container. Calculate mouse position
                  relative to the container as percentage values for responsive behavior.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Dynamic Updates
                </h3>
                <p className="leading-relaxed">
                  Update CSS custom properties (--x, --y) with mouse coordinates in real-time.
                  This drives the radial gradient position for the spotlight effect.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Smooth Transitions
                </h3>
                <p className="leading-relaxed">
                  Add CSS transition for mask-position with short duration (0.1s) to create
                  a slight lag effect, making the flashlight feel more realistic.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customization Options */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Customization Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Spotlight Size</h4>
              <p className="leading-relaxed">
                Adjust the circle radius to create narrow torch beams or wide illumination
                areas based on your design needs.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Overlay Darkness</h4>
              <p className="leading-relaxed">
                Control the opacity of the dark overlay to balance between mystery and
                visibility of unlit areas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Transition Speed</h4>
              <p className="leading-relaxed">
                Faster transitions feel more responsive, slower ones create a heavier
                flashlight effect with inertia.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Gradient Falloff</h4>
              <p className="leading-relaxed">
                Modify the gradient stops to create soft or hard edges on your spotlight,
                affecting the light's realism.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
