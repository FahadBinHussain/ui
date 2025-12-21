"use client";
import React from "react";
import { MagneticFieldDemo } from "@/components/marketing/MagneticFieldDemo";
import { motion } from "framer-motion";

export default function MagneticFieldPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-24"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Magnetic Field Interactions
                </h1>
                <p className="text-neutral-400 max-w-xl mx-auto text-lg">
                    Elements that behave like magnets, attracting and repelling each other. Physics-based interactions powered by Matter.js and Framer Motion.
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
                <MagneticFieldDemo />
            </div>

            <div className="mt-32 text-center text-neutral-500 text-sm">
                Watch the elements interact with magnetic forces.
            </div>
        </div>
    );
}