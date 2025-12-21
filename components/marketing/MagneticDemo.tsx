"use client";
import React from "react";
import { Magnetic } from "../ui/magnetic";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function MagneticDemo() {
    return (
        <div className="flex flex-col items-center gap-12">
            <div className="flex gap-8 items-center">
                <Magnetic strength={0.2}>
                    <Button variant="sunset" className="px-8 py-6 text-lg">
                        Soft Magnetic
                    </Button>
                </Magnetic>

                <Magnetic strength={0.5}>
                    <Button variant="ocean" className="px-8 py-6 text-lg">
                        Medium Magnetic
                    </Button>
                </Magnetic>

                <Magnetic strength={1}>
                    <Button variant="galaxy" className="px-8 py-6 text-lg border border-white/20">
                        Strong Magnetic
                    </Button>
                </Magnetic>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <Magnetic key={i} strength={0.3}>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold cursor-pointer">
                            Orb {i}
                        </div>
                    </Magnetic>
                ))}
            </div>
        </div>
    );
}
