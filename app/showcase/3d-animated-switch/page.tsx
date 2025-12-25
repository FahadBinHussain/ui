"use client";
import React from "react";
import { AnimatedSwitch3D } from "@/components/marketing/AnimatedSwitch3D";
import { motion } from "framer-motion";

export default function AnimatedSwitch3DPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          3D Animated Switch
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          An interactive 3D toggle switch powered by Three.js, React Three Fiber, and React Spring. 
          Click the sphere to toggle between states and watch the smooth animations blend DOM and WebGL.
        </p>
      </motion.div>

      <div className="w-full h-[600px] max-w-5xl mx-auto">
        <AnimatedSwitch3D />
      </div>

      <div className="mt-16 text-center space-y-4">
        <div className="text-neutral-500 text-sm">
          <p className="mb-2">
            ✨ Click the sphere to toggle • Synchronized DOM and Canvas animations
          </p>
          <p className="text-xs text-neutral-600">
            Built with React Three Fiber • React Spring • Three.js • GLTF Models
          </p>
          <p className="text-xs text-neutral-600 mt-4">
            Source:{" "}
            <a
              href="https://www.react-spring.dev/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              React Spring Examples
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
