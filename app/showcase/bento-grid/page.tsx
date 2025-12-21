"use client";
import React from "react";
import { BentoGridDemo } from "@/components/marketing/BentoGridDemo";
import { motion } from "framer-motion";

export default function BentoGridPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Bento Grid
                </h1>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    A versatile, modern grid layout inspired by Apple and Linear. Perfect
                    for feature showcases and dashboard layouts.
                </p>
            </motion.div>
            <BentoGridDemo />
        </div>
    );
}
