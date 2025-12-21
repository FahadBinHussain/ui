"use client";
import React from "react";
import { SearchInterface } from "@/components/ui/search-interface";
import { motion } from "framer-motion";

export default function SearchPage() {
    return (
        <SearchInterface>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-6xl mb-4"
                >
                    🔍
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-slate-700 mb-4"
                >
                    Intelligent Search
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    className="text-lg text-slate-600 max-w-2xl"
                >
                    Experience next-generation search with AI-powered suggestions,
                    real-time results, and beautiful interactions that make finding
                    what you need effortless.
                </motion.p>
            </motion.div>
        </SearchInterface>
    );
}