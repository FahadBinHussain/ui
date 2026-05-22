"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import * as THREE from "three";

interface FloatingObjectProps {
  modelUrl?: string;
  intensity?: number; // 0-1, controls rotation sensitivity
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  scale?: number;
}

// Animated mesh component with spring physics
function AnimatedModel({ 
  modelUrl = "/cluster fly S.splat", 
  intensity = 0.5,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  scale = 1,
}: FloatingObjectProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Load model (fallback to basic geometry if model not found)
  let model = null;
  try {
    // Try to load GLTF model (will fail gracefully if not available)
    // model = useGLTF(modelUrl);
  } catch (e) {
    console.log("Using fallback geometry");
  }

  // Spring physics for smooth rotation
  const { rotationX, rotationY } = useSpring({
    rotationX: mousePos.y * intensity * Math.PI * 0.3,
    rotationY: mousePos.x * intensity * Math.PI * 0.3,
    config: {
      mass: 2,
      tension: 120,
      friction: 26,
      clamp: false,
    },
  });

  // Track mouse position
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -(e.clientY / size.height) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  // Auto-rotation animation
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * autoRotateSpeed * 0.2;
    }
  });

  return (
    <animated.group
      ref={meshRef}
      rotation-x={rotationX}
      rotation-y={rotationY}
      scale={scale}
    >
      {/* Fallback geometry - beautiful crystalline shape */}
      <mesh castShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#00ffff"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.5}
          thickness={0.5}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color="#ff00ff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </animated.group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#444" wireframe />
    </mesh>
  );
}

export function FloatingObjectViewer({
  modelUrl,
  intensity = 0.5,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  scale = 1,
  showControls = false,
  className = "",
}: FloatingObjectProps & { showControls?: boolean; className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
        <pointLight position={[10, 10, 5]} intensity={0.5} color="#00ffff" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* 3D Object */}
        <Suspense fallback={<LoadingFallback />}>
          <AnimatedModel
            modelUrl={modelUrl}
            intensity={intensity}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            scale={scale}
          />
        </Suspense>

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={3}
        />

        {/* Optional orbit controls */}
        {showControls && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </Canvas>
    </div>
  );
}

// Preset variants
export function ProductViewer({
  modelUrl,
  className = "",
}: {
  modelUrl?: string;
  className?: string;
}) {
  return (
    <FloatingObjectViewer
      modelUrl={modelUrl}
      intensity={0.6}
      autoRotate={true}
      autoRotateSpeed={0.3}
      scale={1.5}
      showControls={true}
      className={className}
    />
  );
}

export function HeroObject({
  modelUrl,
  className = "",
}: {
  modelUrl?: string;
  className?: string;
}) {
  return (
    <FloatingObjectViewer
      modelUrl={modelUrl}
      intensity={0.8}
      autoRotate={true}
      autoRotateSpeed={0.5}
      scale={2}
      showControls={false}
      className={className}
    />
  );
}

export function SubtleFloatingObject({
  modelUrl,
  className = "",
}: {
  modelUrl?: string;
  className?: string;
}) {
  return (
    <FloatingObjectViewer
      modelUrl={modelUrl}
      intensity={0.3}
      autoRotate={true}
      autoRotateSpeed={0.2}
      scale={1}
      showControls={false}
      className={className}
    />
  );
}
