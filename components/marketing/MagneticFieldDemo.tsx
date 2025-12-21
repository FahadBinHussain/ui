"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const GRID_GAP = 30;
const INFLUENCE_RADIUS = 150;

export function MagneticFieldDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [elements, setElements] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        const updateGrid = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const newElements = [];
            const cols = Math.floor(rect.width / GRID_GAP);
            const rows = Math.floor(rect.height / GRID_GAP);

            for (let i = 0; i <= rows; i++) {
                for (let j = 0; j <= cols; j++) {
                    newElements.push({
                        x: j * GRID_GAP + (rect.width % GRID_GAP) / 2,
                        y: i * GRID_GAP + (rect.height % GRID_GAP) / 2,
                    });
                }
            }
            setElements(newElements);
        };

        updateGrid();
        window.addEventListener("resize", updateGrid);
        return () => window.removeEventListener("resize", updateGrid);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[700px] bg-[#030303] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -inset-[100%] opacity-30 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,transparent_50%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay" />
            </div>

            {/* Elements Grid */}
            <div className="absolute inset-0 p-8">
                {elements.map((pos, i) => (
                    <MagneticElement key={`${pos.x}-${pos.y}-${i}`} basePos={pos} containerRef={containerRef} />
                ))}
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    <h2 className="text-6xl font-black text-white tracking-tighter sm:text-7xl">
                        MAGNETIC
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            FIELD
                        </span>
                    </h2>
                    <p className="text-neutral-500 mt-6 text-lg font-medium tracking-wide uppercase">
                        Interactive Physics Simulation
                    </p>
                </motion.div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/10 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/10 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/10 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/10 rounded-br-lg" />
        </div>
    );
}

function MagneticElement({ basePos, containerRef }: { basePos: { x: number; y: number }, containerRef: React.RefObject<HTMLDivElement | null> }) {
    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);
    const scale = useSpring(1, springConfig);
    const rotate = useSpring(0, springConfig);

    // Color based on displacement
    const color = useTransform(
        [springX, springY],
        ([x, y]) => {
            const dist = Math.sqrt((x as number) ** 2 + (y as number) ** 2);
            const ratio = Math.min(dist / 40, 1);
            return `rgba(${60 + ratio * 195}, ${130 + ratio * 25}, ${246 + ratio * 9}, ${0.3 + ratio * 0.7})`;
        }
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            const dx = relX - basePos.x;
            const dy = relY - basePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < INFLUENCE_RADIUS) {
                const angle = Math.atan2(dy, dx);
                const force = Math.pow(1 - distance / INFLUENCE_RADIUS, 2);

                // Repulsion/Attraction logic
                const pushLimit = 40;
                springX.set(Math.cos(angle) * pushLimit * force);
                springY.set(Math.sin(angle) * pushLimit * force);
                scale.set(1 + force * 1.5);
                rotate.set(angle * (180 / Math.PI));
            } else {
                springX.set(0);
                springY.set(0);
                scale.set(1);
                rotate.set(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [basePos, containerRef, springX, springY, scale, rotate]);

    return (
        <motion.div
            style={{
                position: "absolute",
                left: basePos.x,
                top: basePos.y,
                x: springX,
                y: springY,
                scale: scale,
                rotate: rotate,
                backgroundColor: color,
            }}
            className="w-1 h-3 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
        />
    );
}
