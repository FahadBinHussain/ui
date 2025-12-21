"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Droplet } from "lucide-react";
import Link from "next/link";
import LiquidImageDemo from "@/components/marketing/LiquidImageDemo";

export default function LiquidImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-8">
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
            <Droplet className="w-20 h-20 text-cyan-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Liquid Image Distortion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your images into mesmerizing liquid surfaces that ripple, flow,
            and distort with mouse interaction. Powered by WebGL shaders and Three.js
            for stunning visual effects that captivate your audience.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              "Three.js",
              "WebGL",
              "GLSL Shaders",
              "GPU Acceleration",
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
          <LiquidImageDemo />
        </motion.div>

        {/* Implementation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Implementation Steps</h2>
          <div className="space-y-6 text-gray-300">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  WebGL Canvas Setup
                </h3>
                <p className="leading-relaxed">
                  Create a WebGL canvas using Three.js and load your image as a texture.
                  Set up the orthographic camera and renderer with proper sizing and pixel ratio.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Custom Shader Creation
                </h3>
                <p className="leading-relaxed">
                  Write GLSL vertex and fragment shaders. The fragment shader handles the
                  distortion using displacement maps generated from procedural noise functions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  UV Coordinate Manipulation
                </h3>
                <p className="leading-relaxed">
                  In the fragment shader, calculate pixel colors based on modified texture
                  coordinates (UVs) combined with displacement map values for the liquid effect.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Interactive Uniforms
                </h3>
                <p className="leading-relaxed">
                  Update shader uniforms (uHover, uMouse, uTime) from JavaScript based on
                  mouse interaction. Animate the hover value from 0 to 1 for smooth transitions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Distortion Control
                </h3>
                <p className="leading-relaxed">
                  Multiply the displacement effect by the hover uniform so distortion only
                  happens during interaction, creating a responsive and engaging user experience.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2">
            <span>⚡</span>
            Performance Optimization
          </h3>
          <p className="text-gray-300 leading-relaxed">
            The liquid distortion effect is GPU-accelerated through WebGL, ensuring smooth
            60fps animations even with multiple images. The shaders run entirely on the GPU,
            minimizing CPU usage. For best performance, use appropriately sized images and
            consider implementing lazy loading for image galleries.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
