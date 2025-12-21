"use client";
import React, { useState, useEffect } from "react";
import { TextScramble } from "../ui/text-scramble";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function TextScrambleDemo() {
    const words = ["Innovation", "Technology", "Design", "Creativity", "Future"];
    const [index, setIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const scrambleToWord = (wordIndex: number) => {
        setIndex(wordIndex);
        setIsAutoPlaying(false);
        // Resume auto-play after 5 seconds
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            {/* Main Demo */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
            >
                <div className="text-4xl md:text-6xl font-mono font-bold text-white mb-8">
                    We Build the{" "}
                    <TextScramble
                        text={words[index]}
                        className="text-indigo-500 underline decoration-indigo-500/30"
                        speed={30}
                        scrambleCount={5}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {words.map((word, i) => (
                        <Button
                            key={word}
                            variant={index === i ? "sunset" : "ocean"}
                            onClick={() => scrambleToWord(i)}
                            className="font-mono text-sm px-4 py-2"
                        >
                            {word}
                        </Button>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        variant="ocean"
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="font-mono"
                    >
                        {isAutoPlaying ? "Pause Auto" : "Resume Auto"}
                    </Button>
                    <Button
                        variant="sunset"
                        onClick={() => {
                            setIndex(0);
                            setIsAutoPlaying(true);
                        }}
                        className="font-mono"
                    >
                        Reset
                    </Button>
                </div>
            </motion.div>

            {/* Speed Variations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold mb-3 text-white">Slow & Dramatic</h3>
                    <p className="text-gray-400 mb-4 text-sm">For cinematic reveals</p>
                    <div className="text-center">
                        <TextScramble
                            text="SLOW"
                            speed={80}
                            scrambleCount={8}
                            className="text-2xl font-mono font-bold text-blue-400"
                        />
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold mb-3 text-white">Medium Pace</h3>
                    <p className="text-gray-400 mb-4 text-sm">Balanced animation</p>
                    <div className="text-center">
                        <TextScramble
                            text="MEDIUM"
                            speed={40}
                            scrambleCount={5}
                            className="text-2xl font-mono font-bold text-green-400"
                        />
                    </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold mb-3 text-white">Fast & Furious</h3>
                    <p className="text-gray-400 mb-4 text-sm">High-energy transitions</p>
                    <div className="text-center">
                        <TextScramble
                            text="FAST"
                            speed={20}
                            scrambleCount={3}
                            className="text-2xl font-mono font-bold text-red-400"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Usage Example */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
                <h2 className="text-2xl font-semibold mb-4 text-white">Usage</h2>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`import { TextScramble } from "@/components/ui/text-scramble";

export function MyComponent() {
  const [currentText, setCurrentText] = useState("Hello");

  return (
    <TextScramble
      text={currentText}
      speed={40}           // Animation speed (ms per frame)
      scrambleCount={5}    // Number of scramble iterations
      className="text-4xl font-bold text-blue-500"
    />
  );
}`}
                    </pre>
                </div>
                <div className="mt-4 text-gray-400 text-sm">
                    <p><strong>Props:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><code>text</code>: string - The text to display</li>
                        <li><code>speed</code>: number (default: 40) - Milliseconds between frames</li>
                        <li><code>scrambleCount</code>: number (default: 3) - Scramble iterations</li>
                        <li><code>className</code>: string - Additional CSS classes</li>
                    </ul>
                    <p className="mt-3 text-xs text-indigo-400">
                        💡 <strong>Pro tip:</strong> Lower speed values = faster animation.
                        Higher scrambleCount = more dramatic effect.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
