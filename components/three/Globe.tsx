"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

interface GlobeProps {
  radius?: number;
  rotationSpeed?: number;
  showMarkers?: boolean;
}

/**
 * Interactive 3D Globe component with earth texture
 * Features smooth rotation and optional data markers
 */
export function Globe({ radius = 2, rotationSpeed = 0.005, showMarkers = true }: GlobeProps) {
  const globeRef = useRef<THREE.Mesh>(null);

  // Load earth texture with error handling
  const earthTexture = useLoader(
    TextureLoader,
    "/earth-texture.jpg",
    undefined,
    (error) => {
      console.warn("Failed to load earth texture, using fallback:", error);
    }
  );

  // Rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed;
    }
  });

  // Sample data points (latitude, longitude, size)
  const dataPoints = [
    { lat: 40.7128, lng: -74.0060, size: 0.05 }, // New York
    { lat: 51.5074, lng: -0.1278, size: 0.04 },  // London
    { lat: 35.6762, lng: 139.6503, size: 0.04 }, // Tokyo
    { lat: -33.8688, lng: 151.2093, size: 0.03 }, // Sydney
    { lat: 55.7558, lng: 37.6173, size: 0.03 },  // Moscow
  ];

  const createDataMarker = (lat: number, lng: number, size: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius + 0.01) * Math.sin(phi) * Math.cos(theta);
    const z = (radius + 0.01) * Math.sin(phi) * Math.sin(theta);
    const y = (radius + 0.01) * Math.cos(phi);

    return (
      <mesh position={[x, y, z]} key={`${lat}-${lng}`}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>
    );
  };

  return (
    <group>
      {/* Main globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        {earthTexture ? (
          <meshPhongMaterial
            map={earthTexture}
            shininess={10}
            specular={new THREE.Color(0x111111)}
          />
        ) : (
          <meshPhongMaterial
            color="#1e3a5f"
            shininess={30}
            specular={new THREE.Color(0x223344)}
            emissive={new THREE.Color(0x001122)}
          />
        )}
      </mesh>

      {/* Atmosphere glow - commented out due to shader issues */}
      {/* <mesh>
        <sphereGeometry args={[radius * 1.05, 64, 64]} />
        <meshBasicMaterial
          color="#4a90e2"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh> */}

      {/* Data markers */}
      {showMarkers && dataPoints.map(point => createDataMarker(point.lat, point.lng, point.size))}
    </group>
  );
}