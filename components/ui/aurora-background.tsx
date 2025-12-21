"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                "relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Aurora Layer 1 */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-aurora-1"></div>
            </div>

            {/* Aurora Layer 2 */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 animate-aurora-2"></div>
            </div>

            {/* Aurora Layer 3 */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-aurora-3"></div>
            </div>

            {/* Subtle noise overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <div className="w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
