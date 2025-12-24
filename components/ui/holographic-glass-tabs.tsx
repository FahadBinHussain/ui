"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

interface GlassPaneProps {
  targetPosition: [number, number, number];
  targetRotation: number;
}

function GlassPane({ targetPosition, targetRotation }: GlassPaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Use spring animation inside the component
  const { position, rotationY } = useSpring({
    position: targetPosition,
    rotationY: targetRotation,
    config: { tension: 120, friction: 14 },
  });

  return (
    // @ts-ignore - animated components have complex types
    <animated.mesh ref={meshRef} position={position} rotation-y={rotationY}>
      <planeGeometry args={[2.5, 1.5, 32, 32]} />
      <MeshTransmissionMaterial
        transmission={1.0}
        roughness={0.1}
        thickness={1.5}
        chromaticAberration={0.05}
        anisotropicBlur={0.1}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
        transparent
        opacity={0.8}
      />
    </animated.mesh>
  );
}

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface HolographicGlassTabsProps {
  tabs: Tab[];
  className?: string;
}

export function HolographicGlassTabs({ tabs, className = "" }: HolographicGlassTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? "right" : "left");
    setActiveTab(index);
  };

  // Calculate glass pane position based on active tab
  const glassPosition: [number, number, number] = [-3 + activeTab * 2.5, 0, 0.5];
  const glassRotation = direction === "right" ? 0.15 : -0.15;

  return (
    <div className={`relative ${className}`}>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 relative z-20">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            className={`
              relative px-6 py-3 rounded-lg font-medium transition-all
              ${
                activeTab === index
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3D Glass Effect */}
      <div className="relative w-full h-[400px] bg-black rounded-2xl overflow-hidden border border-white/10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="absolute inset-0"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          {/* Background content planes */}
          {tabs.map((tab, index) => (
            <group key={tab.id} position={[-3 + index * 2.5, 0, -0.5]}>
              <mesh>
                <planeGeometry args={[2.2, 1.2]} />
                <meshStandardMaterial
                  color={index === 0 ? "#8b5cf6" : index === 1 ? "#ec4899" : "#06b6d4"}
                  opacity={0.8}
                  transparent
                />
              </mesh>
              <Text
                position={[0, 0, 0.1]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {tab.label}
              </Text>
            </group>
          ))}

          {/* Animated glass pane */}
          <GlassPane
            targetPosition={glassPosition}
            targetRotation={glassRotation}
          />
        </Canvas>

        {/* Content overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-center text-white/80 max-w-md px-8">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
}

// Pre-configured variants
export function SimpleGlassTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <HolographicGlassTabs
      tabs={tabs}
      className="w-full max-w-4xl mx-auto"
    />
  );
}

export function CompactGlassTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <HolographicGlassTabs tabs={tabs} />
    </div>
  );
}

export function WideGlassTabs({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="w-full">
      <HolographicGlassTabs tabs={tabs} />
    </div>
  );
}
