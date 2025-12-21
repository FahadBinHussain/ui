"use client";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const InteractiveGrid = ({
    className,
    dotColor = "rgba(255, 255, 255, 0.2)",
    activeColor = "#3b82f6",
}: {
    className?: string;
    dotColor?: string;
    activeColor?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: -1000, y: -1000 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("relative h-[400px] w-full bg-black overflow-hidden rounded-xl border border-white/10 cursor-none", className)}
        >
            <div
                className="absolute inset-0"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(20px, 1fr))',
                    gap: '12px',
                    padding: '24px',
                }}
            >
                {Array.from({ length: 400 }).map((_, i) => (
                    <Dot key={i} index={i} mousePos={mousePos} dotColor={dotColor} activeColor={activeColor} />
                ))}
            </div>
        </div>
    );
};

const Dot = ({ index, mousePos, dotColor, activeColor }: { index: number, mousePos: { x: number, y: number }, dotColor: string, activeColor: string }) => {
    // Approximate position based on index since we have a fixed grid layout
    // But a better way is to use the actual position.
    // We'll use a ref to get the initial position once.
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if (!ref.current) return;
        const parent = ref.current.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const rect = ref.current.getBoundingClientRect();
        setPos({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top + rect.height / 2,
        });
    }, []);

    const d = Math.sqrt(Math.pow(mousePos.x - pos.x, 2) + Math.pow(mousePos.y - pos.y, 2));
    const scale = Math.max(0.5, 1.5 - d / 150);
    const opacity = Math.max(0.2, 1 - d / 250);

    return (
        <div
            ref={ref}
            className="w-1 h-1 rounded-full transition-all duration-300 ease-out"
            style={{
                backgroundColor: d < 100 ? activeColor : dotColor,
                transform: `scale(${scale})`,
                opacity,
                boxShadow: d < 100 ? `0 0 15px ${activeColor}` : 'none',
                transition: 'background-color 0.3s, transform 0.3s, opacity 0.3s, box-shadow 0.3s',
            }}
        />
    );
};
