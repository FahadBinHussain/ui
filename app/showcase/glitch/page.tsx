"use client";
import React from "react";
import { GlitchText } from "@/components/ui/glitch-text";
import { motion } from "framer-motion";

export default function GlitchPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-12 text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-8"
            >
                <h2 className="text-gray-500 uppercase tracking-widest mb-2">Hover to trigger</h2>
                <GlitchText text="CYBERPUNK" className="text-8xl" />
            </motion.div>

            <div className="flex flex-col gap-4 items-center">
                <GlitchText text="ERROR 404" className="text-4xl text-red-500" />
                <GlitchText text="SYSTEM OVERRIDE" className="text-4xl text-blue-500" />
                <GlitchText text="FUTURE IS NOW" className="text-4xl text-purple-500" />
            </div>
        </div>
    );
}
