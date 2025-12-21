"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const GlitchText = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => {
    return (
        <motion.div
            whileHover="hover"
            className={cn("relative inline-block font-bold text-6xl cursor-pointer", className)}
        >
            <span className="relative z-10">{text}</span>
            <motion.span
                variants={{
                    hover: {
                        opacity: [0.8, 1, 0.4, 0.9, 0.5],
                        x: [-4, 4, -2, 6, -1, 3, 0],
                        y: [2, -2, 4, -4, 1, -3, 0],
                        scale: [1, 1.1, 0.9, 1.05, 1],
                    }
                }}
                initial={{ opacity: 0 }}
                transition={{
                    opacity: { repeat: Infinity, duration: 0.2 },
                    x: { repeat: Infinity, duration: 0.1 },
                    y: { repeat: Infinity, duration: 0.15 },
                    scale: { repeat: Infinity, duration: 0.25 }
                }}
                className="absolute top-0 left-0 z-0 text-red-500"
            >
                {text}
            </motion.span>
            <motion.span
                variants={{
                    hover: {
                        opacity: [0.8, 0.5, 1, 0.6, 0.9],
                        x: [4, -4, 2, -6, 1, -3, 0],
                        y: [-2, 2, -4, 4, -1, 3, 0],
                        scale: [1, 0.9, 1.1, 0.95, 1],
                    }
                }}
                initial={{ opacity: 0 }}
                transition={{
                    opacity: { repeat: Infinity, duration: 0.25 },
                    x: { repeat: Infinity, duration: 0.12 },
                    y: { repeat: Infinity, duration: 0.18 },
                    scale: { repeat: Infinity, duration: 0.2 }
                }}
                className="absolute top-0 left-0 z-0 text-cyan-500"
            >
                {text}
            </motion.span>
        </motion.div>
    );
};
