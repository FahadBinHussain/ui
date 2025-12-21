"use client";
import React from "react";
import { CloudBackground } from "@/components/ui/cloud-background";
import { motion } from "framer-motion";

export default function CloudPage() {
    return (
        <CloudBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-6 items-center justify-center px-4 text-center max-w-4xl"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-5xl md:text-9xl font-bold bg-gradient-to-r from-white via-blue-50 to-indigo-100 bg-clip-text text-transparent mb-4 drop-shadow-lg"
                >
                    ☁️
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-3xl md:text-6xl font-light text-slate-700 mb-6"
                >
                    Cloud Computing
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="text-xl md:text-2xl font-light text-slate-600 mb-8 max-w-3xl leading-relaxed"
                >
                    Experience the future of distributed computing with our
                    cloud-native architecture. Seamlessly scalable, infinitely
                    reliable, and beautifully designed.
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-slate-700 font-medium hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        🚀 Deploy Now
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md border border-blue-300/30 rounded-full text-slate-700 font-medium hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        📊 View Analytics
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-slate-600 font-medium hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        ⚙️ Configure
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 1.0 }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
                >
                    {[
                        { icon: "⚡", title: "Lightning Fast", desc: "Sub-millisecond response times globally" },
                        { icon: "🔒", title: "Enterprise Security", desc: "Bank-grade encryption and compliance" },
                        { icon: "🌍", title: "Global Scale", desc: "200+ regions worldwide" }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">{feature.title}</h3>
                            <p className="text-slate-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </CloudBackground>
    );
}