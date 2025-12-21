"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticElement {
    id: number;
    x: number;
    y: number;
    pole: 'north' | 'south';
    vx: number; // velocity x
    vy: number; // velocity y
}

export function MagneticFieldDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const [elements, setElements] = useState<MagneticElement[]>([
        { id: 1, x: 150, y: 120, pole: 'north', vx: 0, vy: 0 },
        { id: 2, x: 450, y: 120, pole: 'south', vx: 0, vy: 0 },
        { id: 3, x: 300, y: 280, pole: 'north', vx: 0, vy: 0 },
    ]);

    const [isPlaying, setIsPlaying] = useState(true);
    const [draggedElement, setDraggedElement] = useState<number | null>(null);

    // Physics constants
    const MAGNETIC_CONSTANT = 500; // Strength of magnetic force
    const DAMPING = 0.98; // Velocity damping
    const MIN_DISTANCE = 40; // Minimum distance to prevent elements from getting too close

    useEffect(() => {
        if (!isPlaying) return;

        const animate = () => {
            setElements(prevElements => {
                return prevElements.map(element => {
                    if (element.id === draggedElement) {
                        // Don't apply physics to dragged element
                        return element;
                    }

                    let forceX = 0;
                    let forceY = 0;

                    // Calculate magnetic forces from other elements
                    prevElements.forEach(other => {
                        if (element.id === other.id) return;

                        const dx = other.x - element.x;
                        const dy = other.y - element.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < MIN_DISTANCE) return; // Too close, skip

                        // Magnetic poles: North = +1, South = -1
                        const pole1 = element.pole === 'north' ? 1 : -1;
                        const pole2 = other.pole === 'north' ? 1 : -1;

                        // Force magnitude: F = k * (q1 * q2) / r^2
                        // Like poles repel (positive * positive = positive = repulsive)
                        // Opposite poles attract (positive * negative = negative = attractive)
                        const forceMagnitude = (MAGNETIC_CONSTANT * pole1 * pole2) / (distance * distance);

                        // Normalize direction vector
                        const dirX = dx / distance;
                        const dirY = dy / distance;

                        // Apply force
                        forceX += dirX * forceMagnitude;
                        forceY += dirY * forceMagnitude;
                    });

                    // Update velocity with force and damping
                    let newVx = (element.vx + forceX * 0.016) * DAMPING; // 0.016 ≈ 1/60 for 60fps
                    let newVy = (element.vy + forceY * 0.016) * DAMPING;

                    // Update position
                    let newX = element.x + newVx;
                    let newY = element.y + newVy;

                    // Boundary constraints
                    const maxX = 550;
                    const maxY = 330;
                    const minX = 30;
                    const minY = 30;

                    if (newX < minX) {
                        newX = minX;
                        newVx = Math.abs(newVx) * 0.5; // Bounce with energy loss
                    } else if (newX > maxX) {
                        newX = maxX;
                        newVx = -Math.abs(newVx) * 0.5;
                    }

                    if (newY < minY) {
                        newY = minY;
                        newVy = Math.abs(newVy) * 0.5;
                    } else if (newY > maxY) {
                        newY = maxY;
                        newVy = -Math.abs(newVy) * 0.5;
                    }

                    return {
                        ...element,
                        x: newX,
                        y: newY,
                        vx: newVx,
                        vy: newVy
                    };
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, draggedElement]);

    const handleDragStart = (id: number) => {
        setDraggedElement(id);
        setElements(prev => prev.map(el =>
            el.id === id ? { ...el, vx: 0, vy: 0 } : el // Reset velocity when dragging starts
        ));
    };

    const handleDrag = (id: number, event: any, info: any) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const newX = Math.max(30, Math.min(550, info.point.x - rect.left));
            const newY = Math.max(30, Math.min(330, info.point.y - rect.top));

            setElements(prev => prev.map(el =>
                el.id === id ? { ...el, x: newX, y: newY, vx: 0, vy: 0 } : el
            ));
        }
    };

    const handleDragEnd = () => {
        setDraggedElement(null);
    };

    // Calculate interaction lines for visualization
    const getInteractions = () => {
        const interactions = [];
        for (let i = 0; i < elements.length; i++) {
            for (let j = i + 1; j < elements.length; j++) {
                const elem1 = elements[i];
                const elem2 = elements[j];

                const dx = elem2.x - elem1.x;
                const dy = elem2.y - elem1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 250) continue; // Don't show lines for very distant elements

                const pole1 = elem1.pole === 'north' ? 1 : -1;
                const pole2 = elem2.pole === 'north' ? 1 : -1;
                const attractive = pole1 * pole2 < 0; // Opposite signs = attraction

                interactions.push({
                    x1: elem1.x,
                    y1: elem1.y,
                    x2: elem2.x,
                    y2: elem2.y,
                    attractive,
                    strength: Math.max(0.1, Math.min(1, 1 - distance / 200))
                });
            }
        }
        return interactions;
    };

    const interactions = getInteractions();

    return (
        <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-blue-900/20 to-black rounded-xl overflow-hidden border border-gray-700">
            <div ref={containerRef} className="relative w-full h-full">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                <circle cx="15" cy="15" r="1" fill="currentColor" className="text-blue-400" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Force field lines */}
                <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    {interactions.map((interaction, index) => (
                        <g key={index}>
                            <line
                                x1={interaction.x1}
                                y1={interaction.y1}
                                x2={interaction.x2}
                                y2={interaction.y2}
                                stroke={interaction.attractive ? '#10b981' : '#ef4444'}
                                strokeWidth={interaction.strength * 3 + 1}
                                opacity={interaction.strength * 0.7}
                                strokeDasharray={interaction.attractive ? "8,4" : "4,4"}
                            />
                            {/* Direction arrows */}
                            {interaction.strength > 0.3 && (
                                <polygon
                                    points={`${interaction.x2 - 8},${interaction.y2} ${interaction.x2 - 16},${interaction.y2 - 4} ${interaction.x2 - 16},${interaction.y2 + 4}`}
                                    fill={interaction.attractive ? '#10b981' : '#ef4444'}
                                    opacity={interaction.strength * 0.7}
                                    transform={`rotate(${Math.atan2(interaction.y2 - interaction.y1, interaction.x2 - interaction.x1) * 180 / Math.PI}, ${interaction.x2}, ${interaction.y2})`}
                                />
                            )}
                        </g>
                    ))}
                </svg>

                {/* Magnetic elements */}
                {elements.map((element) => (
                    <motion.div
                        key={element.id}
                        className={`absolute w-16 h-16 rounded-full cursor-move flex items-center justify-center text-white font-bold text-lg border-3 shadow-lg ${
                            element.pole === 'north'
                                ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400 shadow-red-500/50'
                                : 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400 shadow-blue-500/50'
                        }`}
                        style={{
                            left: element.x - 32,
                            top: element.y - 32,
                        }}
                        drag
                        dragMomentum={false}
                        dragConstraints={containerRef}
                        onDragStart={() => handleDragStart(element.id)}
                        onDrag={(event, info) => handleDrag(element.id, event, info)}
                        onDragEnd={handleDragEnd}
                        whileHover={{ scale: 1.1, boxShadow: element.pole === 'north'
                            ? '0 0 30px rgba(239, 68, 68, 0.6)'
                            : '0 0 30px rgba(59, 130, 246, 0.6)' }}
                        whileDrag={{ scale: 1.2, zIndex: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold">{element.pole === 'north' ? 'N' : 'S'}</span>
                            <div className={`w-6 h-1 rounded-full mt-1 ${
                                element.pole === 'north' ? 'bg-red-200' : 'bg-blue-200'
                            }`}></div>
                        </div>
                    </motion.div>
                ))}

                {/* Controls */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-black/80 transition-colors"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                        onClick={() => {
                            setElements(prev => prev.map(el => ({ ...el, vx: 0, vy: 0 })));
                        }}
                        className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-black/80 transition-colors"
                    >
                        Reset
                    </button>
                </div>

                {/* Legend */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500 border border-red-400"></div>
                            <span>North Pole (+)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500 border border-blue-400"></div>
                            <span>South Pole (-)</span>
                        </div>
                        <div className="text-xs text-gray-300 mt-2">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-0.5 bg-green-500"></div>
                                <span>Attraction</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-0.5 bg-red-500"></div>
                                <span>Repulsion</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
                    <p className="text-gray-300">
                        Drag magnets to reposition them. Physics simulates real magnetic forces:
                        opposite poles attract, like poles repel.
                    </p>
                </div>
            </div>
        </div>
    );
}