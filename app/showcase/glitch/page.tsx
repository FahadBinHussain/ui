"use client";
import React from "react";
import { GlitchText } from "@/components/ui/glitch-text";
import { motion } from "framer-motion";
import { Zap, AlertTriangle, Skull } from "lucide-react";

export default function GlitchPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-8xl mb-6"
                    >
                        ⚡
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-6"
                    >
                        GLITCH
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Experience the digital chaos with multi-layered glitch effects,
                        RGB color separation, and cyberpunk-inspired animations that
                        bring your text to life.
                    </motion.p>
                </motion.div>

                {/* Intensity Levels */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {[
                        {
                            intensity: "low" as const,
                            title: "Low Intensity",
                            description: "Subtle glitch effects for elegant disruption",
                            icon: Zap,
                            color: "from-green-500 to-teal-500",
                            example: "HACKED"
                        },
                        {
                            intensity: "medium" as const,
                            title: "Medium Intensity",
                            description: "Balanced chaos with noticeable distortion",
                            icon: AlertTriangle,
                            color: "from-yellow-500 to-orange-500",
                            example: "ERROR"
                        },
                        {
                            intensity: "high" as const,
                            title: "High Intensity",
                            description: "Maximum digital corruption and mayhem",
                            icon: Skull,
                            color: "from-red-500 to-pink-500",
                            example: "CORRUPTED"
                        }
                    ].map((level, index) => {
                        const IconComponent = level.icon;
                        return (
                            <motion.div
                                key={level.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${level.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{level.title}</h3>
                                <p className="text-gray-400 mb-4">{level.description}</p>
                                <div className="text-center">
                                    <GlitchText
                                        text={level.example}
                                        intensity={level.intensity}
                                        className="text-2xl font-bold"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Interactive Demo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-3xl p-8 mb-16"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Interactive Glitch</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Hover over the text below to trigger the glitch effects.
                            Each text element has different colors and intensities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center">
                            <GlitchText
                                text="CYBERPUNK"
                                className="text-6xl font-black text-white mb-2"
                                intensity="high"
                            />
                            <p className="text-gray-500 text-sm">High Intensity</p>
                        </div>

                        <div className="text-center">
                            <GlitchText
                                text="NEURAL"
                                className="text-5xl font-bold text-cyan-400 mb-2"
                                intensity="medium"
                            />
                            <p className="text-gray-500 text-sm">Medium Intensity</p>
                        </div>

                        <div className="text-center">
                            <GlitchText
                                text="MATRIX"
                                className="text-4xl font-semibold text-purple-400 mb-2"
                                intensity="low"
                            />
                            <p className="text-gray-500 text-sm">Low Intensity</p>
                        </div>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {[
                        {
                            title: "RGB Color Separation",
                            description: "Classic glitch effect with red, green, and blue channel separation"
                        },
                        {
                            title: "Dynamic Positioning",
                            description: "Text layers shift and distort with organic, chaotic movement"
                        },
                        {
                            title: "Scan Lines",
                            description: "Retro CRT monitor scan lines appear during glitch sequences"
                        },
                        {
                            title: "Intensity Levels",
                            description: "Three different intensity modes for varying levels of corruption"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                            className="bg-gray-800/20 backdrop-blur-md border border-gray-700/50 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 text-sm">
                        Built with Framer Motion for smooth animations and CSS filters for authentic glitch effects
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
