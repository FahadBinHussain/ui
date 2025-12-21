"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveSceneProps {
  size?: number;
}

export function InteractiveScene({ size = 2 }: InteractiveSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Make the object follow the mouse with some delay
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        mouse.x * viewport.width / 2,
        0.1
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        mouse.y * viewport.height / 2,
        0.1
      );

      // Rotate based on mouse position
      meshRef.current.rotation.x = mouse.y * 0.5;
      meshRef.current.rotation.y = mouse.x * 0.5;

      // Scale based on hover state
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Add some floating animation
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={hovered ? "#ff4757" : "#3742fa"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#ff4757" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {hovered && (
        <Text
          position={[0, size + 1, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Interactive!
        </Text>
      )}
    </group>
  );
}