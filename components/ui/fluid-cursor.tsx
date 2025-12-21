"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FluidCursorProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

export const FluidCursor = ({
    className,
    children,
    ...props
}: FluidCursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);

    // Motion values for smooth cursor movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animations for fluid movement
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    // Trail spring (slower for trailing effect)
    const trailSpringX = useSpring(mouseX, { stiffness: 150, damping: 25 });
    const trailSpringY = useSpring(mouseY, { stiffness: 150, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = "1";
            }
            if (trailRef.current) {
                trailRef.current.style.opacity = "1";
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = "0";
            }
            if (trailRef.current) {
                trailRef.current.style.opacity = "0";
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <div
            className={cn(
                "relative min-h-screen cursor-none overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Main Cursor */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className="relative">
                    {/* Outer ring */}
                    <motion.div
                        className="w-8 h-8 border-2 border-white rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Inner dot */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>

            {/* Cursor Trail */}
            <motion.div
                ref={trailRef}
                className="fixed top-0 left-0 pointer-events-none z-40"
                style={{
                    x: trailSpringX,
                    y: trailSpringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="w-4 h-4 bg-blue-400/30 rounded-full blur-sm"
                    animate={{
                        scale: [0.5, 1.5, 0.5],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            {/* Interactive Elements */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// Interactive element that responds to cursor
export const FluidCursorElement = ({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) => {
    return (
        <motion.div
            className={cn("cursor-none", className)}
            whileHover={{
                scale: 1.05,
                rotate: 2,
            }}
            whileTap={{
                scale: 0.95,
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
            }}
        >
            {children}
        </motion.div>
    );
};