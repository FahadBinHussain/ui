"use client";
import React from "react";
import { TreeView } from "@/components/marketing/TreeView";
import { motion } from "framer-motion";

export default function TreeViewPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Animated Tree View
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          An expandable/collapsible tree structure with smooth spring-based animations. 
          Click the icons to expand or collapse nested items.
        </p>
      </motion.div>

      <div className="w-full h-[600px] max-w-4xl mx-auto overflow-auto rounded-2xl">
        <TreeView />
      </div>

      <div className="mt-16 text-center space-y-4">
        <div className="text-neutral-500 text-sm">
          <p className="mb-2">
            🌲 Click icons to expand/collapse • Smooth height animations
          </p>
          <p className="text-xs text-neutral-600">
            Built with React Spring • use-measure • Recursive Components
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
