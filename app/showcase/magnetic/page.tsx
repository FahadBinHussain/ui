"use client";
import React from "react";
import { MagneticDemo } from "@/components/marketing/MagneticDemo";
import { motion } from "framer-motion";

export default function MagneticPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-24"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Magnetic Elements
                </h1>
                <p className="text-neutral-400 max-w-xl mx-auto text-lg">
                    Add a tactile, physical feel to your UI. Elements attract to the cursor, making the interface feel alive and interactive.
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
                <MagneticDemo />
            </div>

            <div className="mt-32 text-center text-neutral-500 text-sm">
                Hover over the elements to feel the pull.
            </div>
        </div>
    );
}
