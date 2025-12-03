"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";

interface ThreeSceneProps {
  children: ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
}

/**
 * Base Three.js Canvas wrapper with common configurations
 * Copy-paste ready for any 3D scene
 */
export function ThreeScene({ children, camera }: ThreeSceneProps) {
  return (
    <Canvas
      camera={camera || { position: [0, 0, 5], fov: 75 }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {children}
      <OrbitControls />
    </Canvas>
  );
}
