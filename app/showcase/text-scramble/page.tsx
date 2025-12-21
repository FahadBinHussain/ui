"use client";
import React from "react";
import { TextScrambleDemo } from "@/components/marketing/TextScrambleDemo";
import { motion } from "framer-motion";

export default function TextScramblePage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Text Scramble
                </h1>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    A high-energy text transition effect that scrambles characters before settling on the final word. Ideal for headlines and hero sections.
                </p>
            </motion.div>
            <TextScrambleDemo />
        </div>
    );
}
