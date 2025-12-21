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
        <main className="aurora-container">
            <div
                className={cn(
                    "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-slate-950 transition-bg",
                    className
                )}
                {...props}
            >
                <div className="aurora-bg"></div>
                {children}
            </div>
        </main>
    );
};
