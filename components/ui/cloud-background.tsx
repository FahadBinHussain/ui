"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface CloudBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    cloudCount?: number;
}

export const CloudBackground = ({
    className,
    children,
    cloudCount = 8,
    ...props
}: CloudBackgroundProps) => {
    const clouds = Array.from({ length: cloudCount }, (_, i) => ({
        id: i,
        size: Math.random() * 200 + 100, // 100-300px
        top: Math.random() * 80 + 10, // 10-90%
        left: Math.random() * 100, // 0-100%
        delay: Math.random() * 20, // 0-20s delay
        duration: Math.random() * 30 + 40, // 40-70s duration
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
    }));

    return (
        <div
            className={cn(
                "relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Animated Clouds */}
            {clouds.map((cloud) => (
                <div
                    key={cloud.id}
                    className="absolute pointer-events-none animate-float"
                    style={{
                        top: `${cloud.top}%`,
                        left: `${cloud.left}%`,
                        width: `${cloud.size}px`,
                        height: `${cloud.size * 0.6}px`,
                        opacity: cloud.opacity,
                        animationDelay: `${cloud.delay}s`,
                        animationDuration: `${cloud.duration}s`,
                    }}
                >
                    <div className="relative w-full h-full">
                        {/* Cloud shape made of multiple circles */}
                        <div className="absolute bg-white/80 backdrop-blur-sm rounded-full"
                             style={{ width: '60%', height: '80%', left: '20%', top: '10%' }}></div>
                        <div className="absolute bg-white/60 backdrop-blur-sm rounded-full"
                             style={{ width: '40%', height: '60%', left: '10%', top: '20%' }}></div>
                        <div className="absolute bg-white/70 backdrop-blur-sm rounded-full"
                             style={{ width: '50%', height: '70%', left: '50%', top: '15%' }}></div>
                        <div className="absolute bg-white/50 backdrop-blur-sm rounded-full"
                             style={{ width: '35%', height: '50%', left: '70%', top: '25%' }}></div>
                        <div className="absolute bg-white/90 backdrop-blur-sm rounded-full"
                             style={{ width: '45%', height: '65%', left: '35%', top: '5%' }}></div>
                    </div>
                </div>
            ))}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 via-transparent to-white/10 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};