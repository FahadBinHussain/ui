"use client";
import React, { useState, useEffect } from "react";
import { TextScramble } from "../ui/text-scramble";
import { Button } from "../ui/button";

export function TextScrambleDemo() {
    const words = ["Innovation", "Technology", "Design", "Creativity", "Future"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center gap-12 py-10">
            <div className="text-4xl md:text-6xl font-mono font-bold text-white">
                We Build the{" "}
                <TextScramble
                    text={words[index]}
                    className="text-indigo-500 underline decoration-indigo-500/30"
                />
            </div>

            <div className="flex flex-col gap-4 items-center">
                <p className="text-neutral-400 font-mono">Click buttons to scramble specifically</p>
                <div className="flex gap-4">
                    <Button
                        variant="ocean"
                        onClick={() => setIndex(0)}
                        className="font-mono"
                    >
                        Start
                    </Button>
                    <Button
                        variant="sunset"
                        onClick={() => setIndex(4)}
                        className="font-mono"
                    >
                        End
                    </Button>
                </div>
            </div>
        </div>
    );
}
