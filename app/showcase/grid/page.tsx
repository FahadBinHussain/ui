"use client";
import React from "react";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { motion } from "framer-motion";

export default function GridPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-8"
                >
                    Interactive Grid
                </motion.h1>
                <p className="text-gray-400 mb-16 text-lg">
                    A responsive grid of reactive points that pulse and change color based on mouse proximity.
                </p>

                <div className="grid gap-8">
                    <InteractiveGrid />
                    <InteractiveGrid activeColor="#10b981" />
                    <InteractiveGrid activeColor="#ec4899" />
                </div>
            </div>
        </div>
    );
}
