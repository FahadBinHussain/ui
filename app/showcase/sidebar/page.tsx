"use client";
import React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Layout, Smartphone, Monitor, Zap, Palette, Code } from "lucide-react";

export default function SidebarPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
            <Sidebar>
                {/* Main Content */}
                <div className="flex-1 p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-8xl mb-6"
                            >
                                📱
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6"
                            >
                                Smart Sidebar
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                            >
                                Experience the next generation of navigation with collapsible sidebars,
                                smooth animations, and intelligent responsive design that adapts to any screen.
                            </motion.p>
                        </div>

                        {/* Features Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                        >
                            {[
                                {
                                    icon: Layout,
                                    title: "Collapsible Design",
                                    description: "Smoothly collapses to save space while maintaining full functionality",
                                    color: "from-blue-500 to-cyan-500"
                                },
                                {
                                    icon: Smartphone,
                                    title: "Mobile Responsive",
                                    description: "Transforms into an overlay drawer on mobile devices",
                                    color: "from-green-500 to-teal-500"
                                },
                                {
                                    icon: Monitor,
                                    title: "Desktop Optimized",
                                    description: "Expands to full width on larger screens for maximum usability",
                                    color: "from-purple-500 to-pink-500"
                                },
                                {
                                    icon: Zap,
                                    title: "Lightning Fast",
                                    description: "GPU-accelerated animations ensure buttery-smooth transitions",
                                    color: "from-yellow-500 to-orange-500"
                                },
                                {
                                    icon: Palette,
                                    title: "Glass Morphism",
                                    description: "Beautiful backdrop blur effects with translucent design",
                                    color: "from-indigo-500 to-purple-500"
                                },
                                {
                                    icon: Code,
                                    title: "Developer Friendly",
                                    description: "Easy to customize and integrate into any React application",
                                    color: "from-red-500 to-pink-500"
                                }
                            ].map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Demo Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                            className="bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-slate-800 mb-4">Interactive Demo</h2>
                                <p className="text-slate-600 max-w-2xl mx-auto">
                                    Try collapsing and expanding the sidebar to see the smooth animations in action.
                                    On mobile, tap the menu button to see the overlay behavior.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                    <h3 className="font-semibold text-blue-800 mb-2">Desktop Experience</h3>
                                    <p className="text-blue-600 text-sm">
                                        Click the collapse button in the sidebar header to toggle between expanded and collapsed states.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                                    <h3 className="font-semibold text-green-800 mb-2">Mobile Experience</h3>
                                    <p className="text-green-600 text-sm">
                                        On mobile devices, the sidebar becomes an overlay that slides in from the left.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Instructions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0, duration: 0.8 }}
                            className="text-center mt-12"
                        >
                            <p className="text-slate-500 text-sm">
                                Built with Framer Motion for smooth animations and Tailwind CSS for styling
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </Sidebar>
        </div>
    );
}