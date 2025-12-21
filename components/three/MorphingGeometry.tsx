"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MorphingGeometryProps {
  size?: number;
}

export function MorphingGeometry({ size = 2 }: MorphingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    // Start with a sphere geometry
    return new THREE.SphereGeometry(size, 32, 32);
  }, [size]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      // Create morphing effect by modifying vertices
      const positions = meshRef.current.geometry.attributes.position;
      const originalPositions = positions.array.slice();

      for (let i = 0; i < positions.count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        // Apply wave-like morphing
        const wave1 = Math.sin(x * 3 + time) * 0.3;
        const wave2 = Math.cos(y * 2 + time * 1.5) * 0.2;
        const wave3 = Math.sin((x + y) * 2 + time * 0.8) * 0.15;

        positions.setZ(i, z + wave1 + wave2 + wave3);
      }

      positions.needsUpdate = true;

      // Rotate the mesh
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#ff6b6b"
        metalness={0.7}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}