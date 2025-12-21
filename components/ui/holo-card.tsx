"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const HoloCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [reflection, setReflection] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const dx = x - xc;
        const dy = y - yc;

        setRotation({
            x: -dy / 10,
            y: dx / 10,
        });

        setReflection({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setReflection({ x: 50, y: 50 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative h-[400px] w-[300px] rounded-2xl transition-all duration-200 ease-out preserve-3d group cursor-pointer",
                className
            )}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
        >
            {/* Background with shifting holographic gradient */}
            <div
                className="absolute inset-0 rounded-2xl bg-neutral-900 overflow-hidden"
                style={{
                    background: `linear-gradient(${135 + rotation.y * 2}deg, #1a1a1a 0%, #2a2a2a 100%)`,
                }}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at ${reflection.x}% ${reflection.y}%, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4), transparent 70%)`,
                        mixBlendMode: 'screen',
                    }}
                />

                {/* Iridescent overlay */}
                <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                        backgroundImage: `linear-gradient(${reflection.x}deg, transparent 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 100%)`,
                        backgroundSize: '200% 200%',
                        backgroundPosition: `${reflection.x}% ${reflection.y}%`,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
                {children}
            </div>

            {/* Border glow */}
            <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                    background: `linear-gradient(${reflection.x}deg, #00ffff, #ff00ff)`,
                    filter: 'blur(1px)',
                }}
            />
        </div>
    );
};
