'use client';

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
    IconSparkles,
    IconRocket,
    IconBrain,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export function BentoGridDemo() {
    return (
        <BentoGrid className="max-w-7xl mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={item.className}
                />
            ))}
        </BentoGrid>
    );
}

const AnimatedGradient = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
            animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
            }}
            style={{
                backgroundSize: '200% 200%'
            }}
        />
        <div className="absolute inset-0 bg-black/20" />
    </div>
);

const ParticleField = () => {
    const particles = Array.from({ length: 30 });
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: 0
                    }}
                    animate={{
                        y: [null, '-20%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
};

const WavePattern = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute inset-0 bg-white/10"
                style={{
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)'
                }}
                animate={{
                    y: ['0%', '-100%', '0%']
                }}
                transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                }}
            />
        ))}
    </div>
);

const GridPattern = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
            {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="bg-white/20 rounded"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: i * 0.01,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
            ))}
        </div>
    </div>
);

const PulsingOrb = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-900 to-purple-900 relative overflow-hidden items-center justify-center">
        <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
        <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-purple-400/30"
            animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    </div>
);

const CodeStream = () => {
    const code = ['const', 'function', 'return', 'import', 'export', 'async'];
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden p-4">
            {code.map((word, i) => (
                <motion.div
                    key={i}
                    className="absolute text-green-400 font-mono text-sm"
                    initial={{ x: '100%', y: i * 20 }}
                    animate={{ x: '-100%' }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                    }}
                >
                    {word}
                </motion.div>
            ))}
        </div>
    );
};

const RippleEffect = () => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        
        setRipples(prev => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id));
        }, 1000);
    };

    return (
        <div 
            className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden cursor-pointer"
            onClick={handleClick}
        >
            {ripples.map(ripple => (
                <motion.div
                    key={ripple.id}
                    className="absolute w-4 h-4 border-2 border-white rounded-full"
                    style={{ left: ripple.x, top: ripple.y }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 10, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            ))}
            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                Click me
            </div>
        </div>
    );
};

const items = [
    {
        title: "Animated Gradients",
        description: "Dynamic color transitions that bring your UI to life with smooth gradient animations.",
        header: <AnimatedGradient />,
        icon: <IconSparkles className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2"
    },
    {
        title: "Particle Systems",
        description: "Mesmerizing particle effects that create depth and visual interest.",
        header: <ParticleField />,
        icon: <IconRocket className="h-4 w-4 text-neutral-500" />,
        className: ""
    },
    {
        title: "Wave Animations",
        description: "Fluid wave patterns that add organic motion to your designs.",
        header: <WavePattern />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
        className: ""
    },
    {
        title: "Interactive Ripples",
        description: "Click to create beautiful ripple effects that respond to user interaction.",
        header: <RippleEffect />,
        icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2"
    },
    {
        title: "Grid Patterns",
        description: "Geometric grid animations that showcase modern design principles.",
        header: <GridPattern />,
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
        className: ""
    },
    {
        title: "Pulsing Elements",
        description: "Breathing animations that draw attention to key features.",
        header: <PulsingOrb />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
        className: ""
    },
    {
        title: "Code Streaming",
        description: "Matrix-style code streams for that authentic developer aesthetic.",
        header: <CodeStream />,
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2"
    },
];
