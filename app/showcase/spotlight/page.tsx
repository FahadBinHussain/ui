"use client";
import React from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";
import { Zap, Shield, Rocket } from "lucide-react";

export default function SpotlightPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Spotlight Cards
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg"
                    >
                        Interactive cards with a smooth, mouse-following radial glow effect.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <SpotlightCard className="h-full">
                        <div className="flex flex-col h-full">
                            <div className="rounded-full bg-blue-500/10 p-4 w-fit mb-6">
                                <Zap className="h-8 w-8 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Fast Performance</h2>
                            <p className="text-gray-400">
                                Optimized for smooth 60FPS interactions using React refs and native CSS variables.
                            </p>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className="h-full" spotlightColor="rgba(139, 92, 246, 0.15)">
                        <div className="flex flex-col h-full">
                            <div className="rounded-full bg-purple-500/10 p-4 w-fit mb-6">
                                <Shield className="h-8 w-8 text-purple-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Secure Design</h2>
                            <p className="text-gray-400">
                                Built with industry standard practices and high-quality type definitions.
                            </p>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className="h-full" spotlightColor="rgba(236, 72, 153, 0.15)">
                        <div className="flex flex-col h-full">
                            <div className="rounded-full bg-pink-500/10 p-4 w-fit mb-6">
                                <Rocket className="h-8 w-8 text-pink-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Modern Stack</h2>
                            <p className="text-gray-400">
                                Leveraging the latest from Next.js 16, Tailwind CSS, and Framer Motion.
                            </p>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </div>
    );
}
