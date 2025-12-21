"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// Type declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      depthParallaxMaterial: any;
    }
  }
}

// Custom shader material for depth-map parallax
const DepthParallaxMaterial = shaderMaterial(
  {
    colorTexture: null,
    depthTexture: null,
    mousePos: new THREE.Vector2(0.5, 0.5),
    strength: 0.1,
    time: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D colorTexture;
    uniform sampler2D depthTexture;
    uniform vec2 mousePos;
    uniform float strength;
    uniform float time;

    varying vec2 vUv;

    void main() {
      // Sample depth (assuming grayscale)
      float depth = texture2D(depthTexture, vUv).r;

      // Calculate parallax offset based on mouse position
      vec2 center = vec2(0.5, 0.5);
      vec2 offset = (mousePos - center) * depth * strength;

      // Apply offset to UV coordinates
      vec2 parallaxUv = vUv + offset;

      // Sample color texture with parallax UV
      vec4 color = texture2D(colorTexture, parallaxUv);

      // Add subtle animation for holographic feel
      float hologram = sin(time * 2.0 + vUv.y * 10.0) * 0.1 + 0.9;
      color.rgb *= hologram;

      gl_FragColor = color;
    }
  `
);

// Extend Three.js with our custom material
extend({ DepthParallaxMaterial });

interface HolographicDepthParallaxProps {
  colorImage: string;
  depthImage: string;
  strength?: number;
  className?: string;
}

export function HolographicDepthParallax({
  colorImage,
  depthImage,
  strength = 0.1,
  className = "",
}: HolographicDepthParallaxProps) {
  const materialRef = useRef<any>(null);
  const { viewport, pointer } = useThree();

  // Load textures
  const [colorTexture, depthTexture] = useTexture([colorImage, depthImage]);

  // Configure textures
  useMemo(() => {
    if (colorTexture) {
      colorTexture.wrapS = colorTexture.wrapT = THREE.ClampToEdgeWrapping;
      colorTexture.minFilter = THREE.LinearFilter;
    }
    if (depthTexture) {
      depthTexture.wrapS = depthTexture.wrapT = THREE.ClampToEdgeWrapping;
      depthTexture.minFilter = THREE.LinearFilter;
    }
  }, [colorTexture, depthTexture]);

  // Update mouse position and time
  useFrame((state) => {
    if (materialRef.current) {
      // Normalize mouse position to 0-1
      materialRef.current.mousePos.set(
        (pointer.x + 1) * 0.5,
        (pointer.y + 1) * 0.5
      );
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.strength = strength;
      materialRef.current.colorTexture = colorTexture;
      materialRef.current.depthTexture = depthTexture;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive object={new DepthParallaxMaterial()} ref={materialRef} attach="material" />
    </mesh>
  );
}