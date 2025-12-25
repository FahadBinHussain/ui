"use client";
import React from "react";
import { DragViewpager } from "@/components/marketing/DragViewpager";
import { motion } from "framer-motion";

export default function DragViewpagerPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Drag Viewpager
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          A smooth, gesture-based image carousel with scale animations. 
          Drag horizontally to navigate through images with physics-based motion.
        </p>
      </motion.div>

      <div className="w-full h-[600px] max-w-4xl mx-auto relative overflow-hidden rounded-2xl">
        <DragViewpager />
      </div>

      <div className="mt-16 text-center space-y-4">
        <div className="text-neutral-500 text-sm">
          <p className="mb-2">
            👆 Drag horizontally to swipe • Pinch-to-zoom effect on drag
          </p>
          <p className="text-xs text-neutral-600">
            Built with React Spring • use-gesture • React Use Measure
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
