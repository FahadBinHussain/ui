import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface DistortionPassProps {
  texture: THREE.Texture;
  isOpen: boolean;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform float uDistortion; // 0.0 to 1.0
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 uv = vUv;
    
    // Calculate distance from center
    vec2 diff = uv - center;
    float dist = length(diff);
    
    // Mouse Interaction:
    // We warp the center slightly towards the mouse when active
    vec2 targetCenter = center - (uMouse - center) * 0.1 * uDistortion;
    vec2 mouseDiff = uv - targetCenter;
    float mouseDist = length(mouseDiff);

    // Dynamic Swirl Parameters
    // As uDistortion increases, the black hole forms
    float strength = uDistortion * 2.5; 
    float radius = 1.0 - uDistortion * 0.1; // Slight zoom out

    // The Event Horizon Effect
    // 1. Angular distortion (Swirl)
    float angle = atan(mouseDiff.y, mouseDiff.x);
    // The closer to center, the faster the rotation
    float spiral = strength / (mouseDist + 0.05); 
    angle += spiral;

    // 2. Radial distortion (Gravity Pull)
    // Pull pixels towards center
    float pinch = uDistortion * 0.3 * exp(-mouseDist * 3.0);
    float newDist = mouseDist * (1.0 - pinch);

    // Reconstruct UVs
    vec2 distortedUV = targetCenter + vec2(cos(angle), sin(angle)) * newDist;

    // Chromatic Aberration at the event horizon
    float shift = uDistortion * 0.02 * (1.0 / (mouseDist + 0.1));
    float r = texture2D(tDiffuse, distortedUV + vec2(shift, 0.0)).r;
    float g = texture2D(tDiffuse, distortedUV).g;
    float b = texture2D(tDiffuse, distortedUV - vec2(shift, 0.0)).b;
    vec3 color = vec3(r, g, b);

    // Singularity (Black Center)
    // Smooth circle in the middle that grows with distortion
    float holeRadius = 0.15 * uDistortion;
    float holeEdge = 0.05;
    float hole = smoothstep(holeRadius, holeRadius + holeEdge, mouseDist);

    // Apply hole darkness
    color *= hole;

    // Add an "Accretion Disk" glow
    float glow = exp(-mouseDist * 4.0) * uDistortion * 0.5;
    color += vec3(0.4, 0.6, 1.0) * glow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const DistortionPass: React.FC<DistortionPassProps> = ({ texture, isOpen }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: texture },
      uTime: { value: 0 },
      uDistortion: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Update time
    uniforms.uTime.value = state.clock.elapsedTime;

    // Update texture if it changed (unlikely with FBO, but safe)
    uniforms.tDiffuse.value = texture;

    // Animate Distortion Strength
    // Lerp towards target: 1.0 if open, 0.0 if closed
    const targetDistortion = isOpen ? 1.0 : 0.0;
    uniforms.uDistortion.value = THREE.MathUtils.lerp(
      uniforms.uDistortion.value,
      targetDistortion,
      delta * 2.5 // Speed of transition
    );

    // Map pointer (-1 to 1) to UV space (0 to 1) for shader
    // Clamp slightly so it doesn't go too wild
    const targetMouse = new THREE.Vector2(
      (pointer.x + 1) / 2,
      (pointer.y + 1) / 2
    );
    
    // Smooth mouse movement in shader
    uniforms.uMouse.value.lerp(targetMouse, 0.1);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};
