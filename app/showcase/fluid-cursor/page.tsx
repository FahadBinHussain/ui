"use client";
import React from "react";
import { FluidCursor, FluidCursorElement } from "@/components/ui/fluid-cursor";
import { motion } from "framer-motion";
import { Heart, Star, Zap, Sparkles } from "lucide-react";

export default function FluidCursorPage() {
    const interactiveElements = [
        { icon: Heart, color: "text-red-500", bgColor: "bg-red-50", hoverColor: "hover:bg-red-100" },
        { icon: Star, color: "text-yellow-500", bgColor: "bg-yellow-50", hoverColor: "hover:bg-yellow-100" },
        { icon: Zap, color: "text-blue-500", bgColor: "bg-blue-50", hoverColor: "hover:bg-blue-100" },
        { icon: Sparkles, color: "text-purple-500", bgColor: "bg-purple-50", hoverColor: "hover:bg-purple-100" },
    ];

    return (
        <FluidCursor>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 flex flex-col items-center justify-center">
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
                        🖱️
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6"
                    >
                        Fluid Cursor
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Experience buttery-smooth cursor interactions with spring-based animations,
                        trailing effects, and responsive hover states that make every movement feel
                        organic and delightful.
                    </motion.p>
                </motion.div>

                {/* Interactive Grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                >
                    {interactiveElements.map((element, index) => {
                        const IconComponent = element.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                            >
                                <FluidCursorElement className="group">
                                    <div className={`w-32 h-32 ${element.bgColor} ${element.hoverColor} rounded-3xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50 backdrop-blur-sm`}>
                                        <IconComponent className={`w-12 h-12 ${element.color} group-hover:scale-110 transition-transform duration-300`} />
                                    </div>
                                </FluidCursorElement>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
                >
                    {[
                        {
                            title: "Spring Physics",
                            description: "Smooth spring-based animations that feel natural and responsive",
                            icon: "🎯"
                        },
                        {
                            title: "Trailing Effects",
                            description: "Beautiful trailing particles that follow your cursor movement",
                            icon: "✨"
                        },
                        {
                            title: "Interactive States",
                            description: "Dynamic cursor changes based on hover and interaction states",
                            icon: "🎨"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                            className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">{feature.title}</h3>
                            <p className="text-slate-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Instructions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-slate-500 text-sm">
                        Move your cursor around to see the fluid animations in action
                    </p>
                </motion.div>
            </div>
        </FluidCursor>
    );
}