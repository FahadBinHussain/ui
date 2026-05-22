import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image, Float } from '@react-three/drei';
import * as THREE from 'three';

// Generates some dummy data for floating cards
const items = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  position: [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 4 - 2 // Mostly behind 0
  ] as [number, number, number],
  scale: 0.5 + Math.random() * 0.5,
  color: Math.random() > 0.5 ? '#00ccff' : '#ff00cc',
  img: `https://picsum.photos/400/600?random=${i}`
}));

export const FloatingContent: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    // Slowly rotate the entire "website" cylinder/cloud
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
        {items.map((item, i) => (
          <Float key={item.id} speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={item.position} rotation={[0, 0, Math.random() * 0.2]}>
              <planeGeometry args={[2 * item.scale, 1.5 * item.scale]} />
              <meshBasicMaterial color="#1a1a1a" transparent opacity={0.8} />
              
              {/* Simulated Card Content */}
              <group position={[0, 0, 0.01]}>
                {/* Image Placeholder */}
                <Image 
                  url={item.img} 
                  position={[0, 0.2, 0]} 
                  scale={[1.8 * item.scale, 0.8 * item.scale]}
                  transparent
                  opacity={0.6}
                  toneMapped={false} 
                />
                
                {/* Text Lines */}
                <mesh position={[-0.5 * item.scale, -0.4 * item.scale, 0]}>
                   <planeGeometry args={[0.8 * item.scale, 0.1 * item.scale]} />
                   <meshBasicMaterial color={item.color} />
                </mesh>
                <mesh position={[-0.2 * item.scale, -0.6 * item.scale, 0]}>
                   <planeGeometry args={[1.4 * item.scale, 0.05 * item.scale]} />
                   <meshBasicMaterial color="#555" />
                </mesh>
              </group>

              {/* Border glow */}
              <mesh position={[0,0,-0.01]} scale={[1.05, 1.05, 1]}>
                 <planeGeometry args={[2 * item.scale, 1.5 * item.scale]} />
                 <meshBasicMaterial color={item.color} transparent opacity={0.3} />
              </mesh>
            </mesh>
          </Float>
        ))}

        {/* Big Background Header Text */}
        <Text
          position={[0, 1, -4]}
          fontSize={3}
          color="#222"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.5}
        >
          GRAVITY
        </Text>
    </group>
  );
};
