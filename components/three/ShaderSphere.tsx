"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// Type declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidShaderMaterial: any;
    }
  }
}

// Custom shader material
const LiquidShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.8, 1.0),
  },
  // Vertex shader
  `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float time;

    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;

      vec3 pos = position;
      pos.z += sin(pos.x * 10.0 + time) * 0.1;
      pos.z += cos(pos.y * 8.0 + time * 1.5) * 0.1;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform float time;
    uniform vec3 color;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));

      float diff = max(dot(normal, lightDir), 0.0);
      float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.0);

      vec3 finalColor = color + vec3(fresnel * 0.5);
      finalColor *= diff * 0.8 + 0.2;

      // Add some noise for liquid effect
      float noise = sin(vUv.x * 20.0 + time) * sin(vUv.y * 15.0 + time * 0.7) * 0.1;
      finalColor += vec3(noise);

      gl_FragColor = vec4(finalColor, 0.8);
    }
  `
);

// Extend Three.js with our custom material
extend({ LiquidShaderMaterial });

// Type declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidShaderMaterial: any;
    }
  }
}

interface ShaderSphereProps {
  size?: number;
}

export function ShaderSphere({ size = 2 }: ShaderSphereProps) {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[size, 64, 64]} />
      <primitive object={new LiquidShaderMaterial()} ref={materialRef} />
    </mesh>
  );
}