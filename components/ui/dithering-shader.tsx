"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import * as THREE from "three";

interface DitheringProps {
  className?: string;
  patternSize?: 4 | 8 | 16;
  colors?: [string, string];
  shape?: "sphere" | "torus" | "box" | "knot";
}

function DitheredMesh({
  patternSize = 8,
  colors = ["#000000", "#ffffff"],
  shape = "sphere",
}: Omit<DitheringProps, "className">) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Bayer matrix patterns
  const bayerMatrix4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  const bayerMatrix8 = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ];

  const matrix = patternSize === 4 ? bayerMatrix4 : bayerMatrix8;
  const maxValue = patternSize === 4 ? 15 : 63;

  // Create Bayer texture
  const bayerTexture = React.useMemo(() => {
    const size = patternSize;
    const data = new Uint8Array(size * size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        data[y * size + x] = (matrix[y][x] / maxValue) * 255;
      }
    }

    const texture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RedFormat,
      THREE.UnsignedByteType
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;

    return texture;
  }, [patternSize, matrix, maxValue]);

  // Custom shader material
  const shaderMaterial = React.useMemo(() => {
    const color1 = new THREE.Color(colors[0]);
    const color2 = new THREE.Color(colors[1]);

    return new THREE.ShaderMaterial({
      uniforms: {
        bayerMatrix: { value: bayerTexture },
        colorA: { value: color1 },
        colorB: { value: color2 },
        lightPosition: { value: new THREE.Vector3(5, 5, 5) },
        resolution: { value: new THREE.Vector2(800, 600) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vScreenCoord;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vec4 screenPos = projectionMatrix * vec4(vPosition, 1.0);
          vScreenCoord = (screenPos.xy / screenPos.w) * 0.5 + 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D bayerMatrix;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 lightPosition;
        uniform vec2 resolution;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vScreenCoord;
        
        void main() {
          // Lambert lighting
          vec3 lightDir = normalize(lightPosition - vPosition);
          float diffuse = max(dot(vNormal, lightDir), 0.0);
          
          // Add ambient
          float light = diffuse * 0.8 + 0.2;
          
          // Sample Bayer matrix using screen coordinates
          vec2 bayerCoord = fract(vScreenCoord * resolution / ${patternSize}.0);
          float threshold = texture2D(bayerMatrix, bayerCoord).r;
          
          // Dithering decision
          vec3 color = light > threshold ? colorB : colorA;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, [bayerTexture, colors, patternSize]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;

      // Update light position to orbit
      const time = state.clock.elapsedTime;
      const lightPos = new THREE.Vector3(
        Math.cos(time) * 5,
        3,
        Math.sin(time) * 5
      );
      shaderMaterial.uniforms.lightPosition.value = lightPos;
    }
  });

  const geometry = React.useMemo(() => {
    switch (shape) {
      case "torus":
        return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case "box":
        return <boxGeometry args={[2, 2, 2, 32, 32, 32]} />;
      case "knot":
        return <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
      default:
        return <sphereGeometry args={[1.5, 64, 64]} />;
    }
  }, [shape]);

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      {geometry}
    </mesh>
  );
}

export const DitheringShader: React.FC<DitheringProps> = ({
  className,
  patternSize = 8,
  colors = ["#000000", "#ffffff"],
  shape = "sphere",
}) => {
  return (
    <div className={cn("w-full h-full bg-gray-100", className)}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <DitheredMesh patternSize={patternSize} colors={colors} shape={shape} />
      </Canvas>
    </div>
  );
};
