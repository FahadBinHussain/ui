"use client";
import React from "react";
import { HoloCard } from "@/components/ui/holo-card";
import { motion } from "framer-motion";

export default function HoloPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent"
                    >
                        Holographic Cards
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        A futuristic UI component with iridescent reflections, 3D tilt, and dynamic lighting.
                    </motion.p>
                </div>

                <div className="flex flex-wrap justify-center gap-12">
                    <HoloCard>
                        <div className="text-4xl mb-4">💎</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Cyber Artifact</h3>
                        <p className="text-gray-400 text-sm">
                            Level 99 Rare Item. Encrypted with advanced holographic lattices.
                        </p>
                    </HoloCard>

                    <HoloCard>
                        <div className="text-4xl mb-4">☄️</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Stellar Core</h3>
                        <p className="text-gray-400 text-sm">
                            Captured energy from a dying star. Pulsating with iridescent light.
                        </p>
                    </HoloCard>

                    <HoloCard>
                        <div className="text-4xl mb-4">🌀</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Void Fragment</h3>
                        <p className="text-gray-400 text-sm">
                            A piece of the digital void. Blends reality with digital artifacts.
                        </p>
                    </HoloCard>
                </div>
            </div>
        </div>
    );
}
