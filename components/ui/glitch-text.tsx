"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const GlitchText = ({
    text,
    className,
    intensity = "medium",
}: {
    text: string;
    className?: string;
    intensity?: "low" | "medium" | "high";
}) => {
    const [isGlitching, setIsGlitching] = useState(false);

    const getIntensitySettings = () => {
        switch (intensity) {
            case "low":
                return {
                    duration: 0.15,
                    repeatCount: 3,
                    offset: 2,
                };
            case "high":
                return {
                    duration: 0.08,
                    repeatCount: 8,
                    offset: 6,
                };
            default: // medium
                return {
                    duration: 0.1,
                    repeatCount: 5,
                    offset: 4,
                };
        }
    };

    const settings = getIntensitySettings();

    return (
        <motion.div
            className={cn("relative inline-block font-bold cursor-pointer select-none", className)}
            onMouseEnter={() => setIsGlitching(true)}
            onMouseLeave={() => setIsGlitching(false)}
            whileHover={{ scale: 1.02 }}
        >
            {/* Main text */}
            <span className="relative z-10">{text}</span>

            {/* Red glitch layer */}
            <motion.span
                animate={isGlitching ? {
                    x: [-settings.offset, settings.offset, -settings.offset/2, settings.offset/2, 0],
                    y: [settings.offset/2, -settings.offset/2, settings.offset, -settings.offset, 0],
                    skewX: [-2, 2, -1, 1, 0],
                    opacity: [0, 1, 0.7, 1, 0.3, 0],
                } : {}}
                transition={{
                    duration: settings.duration,
                    repeat: isGlitching ? settings.repeatCount : 0,
                    ease: "easeInOut",
                }}
                className="absolute top-0 left-0 z-0 text-red-500"
                style={{
                    filter: isGlitching ? "hue-rotate(90deg) brightness(1.2)" : "none",
                    textShadow: isGlitching ? "2px 0 #ff0000, -2px 0 #ff0000" : "none",
                }}
            >
                {text}
            </motion.span>

            {/* Blue glitch layer */}
            <motion.span
                animate={isGlitching ? {
                    x: [settings.offset, -settings.offset, settings.offset/2, -settings.offset/2, 0],
                    y: [-settings.offset/2, settings.offset/2, -settings.offset, settings.offset, 0],
                    skewY: [1, -1, 2, -2, 0],
                    opacity: [0, 0.8, 1, 0.6, 0.2, 0],
                } : {}}
                transition={{
                    duration: settings.duration * 1.2,
                    repeat: isGlitching ? settings.repeatCount : 0,
                    ease: "easeInOut",
                    delay: 0.05,
                }}
                className="absolute top-0 left-0 z-0 text-cyan-400"
                style={{
                    filter: isGlitching ? "hue-rotate(180deg) brightness(1.3)" : "none",
                    textShadow: isGlitching ? "-2px 0 #00ffff, 2px 0 #00ffff" : "none",
                }}
            >
                {text}
            </motion.span>

            {/* Green glitch layer */}
            <motion.span
                animate={isGlitching ? {
                    x: [0, settings.offset * 1.5, -settings.offset * 1.5, settings.offset * 0.8, 0],
                    y: [0, -settings.offset * 0.8, settings.offset * 0.8, -settings.offset * 0.4, 0],
                    scale: [1, 1.05, 0.95, 1.02, 1],
                    opacity: [0, 1, 0.5, 0.8, 0.3, 0],
                } : {}}
                transition={{
                    duration: settings.duration * 1.5,
                    repeat: isGlitching ? settings.repeatCount : 0,
                    ease: "easeInOut",
                    delay: 0.1,
                }}
                className="absolute top-0 left-0 z-0 text-green-400"
                style={{
                    filter: isGlitching ? "hue-rotate(270deg) brightness(1.1)" : "none",
                    textShadow: isGlitching ? "1px 1px #00ff00, -1px -1px #00ff00" : "none",
                }}
            >
                {text}
            </motion.span>

            {/* Scan lines effect */}
            {isGlitching && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 0.1,
                        repeat: settings.repeatCount,
                    }}
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                        background: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(255, 255, 255, 0.1) 2px,
                            rgba(255, 255, 255, 0.1) 4px
                        )`,
                    }}
                />
            )}
        </motion.div>
    );
};
