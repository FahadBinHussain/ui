"use client";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function AuroraPage() {
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4 text-center"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4"
                >
                    Aurora
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-xl md:text-3xl font-light text-blue-100/80 mb-8"
                >
                    Northern Lights in Code
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    className="text-lg text-gray-300/60 max-w-2xl leading-relaxed"
                >
                    Experience the mesmerizing dance of animated gradients,
                    creating a living aurora that shifts and flows like the
                    northern lights themselves.
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 197, 253, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-white font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 shadow-lg"
                >
                    Experience the Aurora
                </motion.button>
            </motion.div>
        </AuroraBackground>
    );
}
