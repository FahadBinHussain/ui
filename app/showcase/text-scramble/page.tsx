"use client";
import React from "react";
import { TextScrambleDemo } from "@/components/marketing/TextScrambleDemo";
import { motion } from "framer-motion";

export default function TextScramblePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Text Scramble Effect
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    High-energy text transition with scrambling characters. Perfect for dynamic headlines,
                    loading states, and attention-grabbing animations.
                </p>
            </motion.div>
            <TextScrambleDemo />
        </div>
    );
}
