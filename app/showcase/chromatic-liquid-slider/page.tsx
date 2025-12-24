'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uVelocity;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Global distortion based on progress
    float globalDistortion = uProgress * (1.0 - uProgress) * 4.0;
    
    // Center-based radial distortion
    vec2 center = vec2(0.5, 0.5);
    float distFromCenter = distance(uv, center);
    float radialDistortion = (1.0 - distFromCenter * 2.0) * globalDistortion * 0.2;
    vec2 centerDirection = normalize(uv - center);
    
    // Horizontal wave distortion across entire image
    float wave = sin(uv.y * 10.0 + uProgress * 6.28) * globalDistortion * 0.05;
    vec2 distortedUV = vec2(
      uv.x + wave + centerDirection.x * radialDistortion, 
      uv.y + centerDirection.y * radialDistortion
    );
    
    // Add vertical displacement based on progress
    float verticalDisplace = (uv.x - 0.5) * globalDistortion * 0.1;
    distortedUV.y += verticalDisplace;
    
    // Chromatic aberration - stronger at center
    float centerAberration = (1.0 - distFromCenter) * globalDistortion * 0.025;
    float velocityAberration = uVelocity * globalDistortion * 0.015;
    float totalAberration = centerAberration + velocityAberration + globalDistortion * 0.01;
    
    // Sample RGB channels separately with offset
    float r1 = texture2D(uTexture1, distortedUV + vec2(totalAberration, 0.0)).r;
    float g1 = texture2D(uTexture1, distortedUV).g;
    float b1 = texture2D(uTexture1, distortedUV - vec2(totalAberration, 0.0)).b;
    
    float r2 = texture2D(uTexture2, distortedUV + vec2(totalAberration, 0.0)).r;
    float g2 = texture2D(uTexture2, distortedUV).g;
    float b2 = texture2D(uTexture2, distortedUV - vec2(totalAberration, 0.0)).b;
    
    vec3 color1 = vec3(r1, g1, b1);
    vec3 color2 = vec3(r2, g2, b2);
    
    // Mix based on progress with liquid transition
    float mixFactor = smoothstep(0.0, 1.0, uProgress);
    vec3 finalColor = mix(color1, color2, mixFactor);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function LiquidSlider({ currentIndex, nextIndex, progress, mousePos, velocity }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  
  const [texture1] = useState(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(images[currentIndex]);
  });
  
  const [texture2] = useState(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(images[nextIndex]);
  });

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uProgress.value = progress;
      material.uniforms.uMouse.value = mousePos;
      material.uniforms.uVelocity.value = velocity;
      material.uniforms.uResolution.value = [size.width, size.height];
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 6]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture1: { value: texture1 },
          uTexture2: { value: texture2 },
          uProgress: { value: 0 },
          uMouse: { value: [0.5, 0.5] },
          uVelocity: { value: 0 },
          uResolution: { value: [size.width, size.height] }
        }}
      />
    </mesh>
  );
}

export default function ChromaticLiquidSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState([0.5, 0.5]);
  const [velocity, setVelocity] = useState(0);
  const [springVelocity, setSpringVelocity] = useState(0);
  
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationRef = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos([x, y]);

    if (isDragging) {
      const deltaX = e.clientX - startXRef.current;
      const deltaTime = Date.now() - lastTimeRef.current;
      const vel = Math.abs((e.clientX - lastXRef.current) / Math.max(deltaTime, 1));
      
      setVelocity(Math.min(vel * 10, 5));
      lastXRef.current = e.clientX;
      lastTimeRef.current = Date.now();

      const newProgress = Math.max(0, Math.min(1, deltaX / 300));
      setProgress(newProgress);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Spring physics for snap back or complete
    const threshold = 0.5;
    const targetProgress = progress > threshold ? 1 : 0;
    
    const animate = () => {
      setProgress(prev => {
        const diff = targetProgress - prev;
        const springForce = diff * 0.1;
        const newVel = springVelocity + springForce;
        const dampedVel = newVel * 0.85;
        setSpringVelocity(dampedVel);
        
        const newProgress = prev + dampedVel;
        
        if (Math.abs(diff) < 0.01 && Math.abs(dampedVel) < 0.01) {
          if (targetProgress === 1) {
            // Move to next image
            setCurrentIndex(nextIndex);
            setNextIndex((nextIndex + 1) % images.length);
          }
          setVelocity(0);
          return targetProgress;
        }
        
        animationRef.current = requestAnimationFrame(animate);
        return newProgress;
      });
    };
    
    animate();
  };

  return (
    <div 
      className="w-full h-screen bg-black relative overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <LiquidSlider 
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          progress={progress}
          mousePos={mousePos}
          velocity={velocity}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 max-w-md pointer-events-none">
        <h1 className="text-4xl font-bold text-white mb-4">Chromatic Liquid Slider</h1>
        <p className="text-purple-300 text-sm leading-relaxed mb-4">
          Drag horizontally to transition between images with liquid distortion and chromatic aberration.
        </p>
        <div className="space-y-2 text-xs text-purple-400">
          <p>• Drag &lt; 50%: Snaps back</p>
          <p>• Drag &gt; 50%: Transitions to next</p>
          <p>• RGB channel separation on distortion</p>
          <p>• Spring physics for smooth release</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex ? 'bg-purple-500 w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Drag Hint */}
      {!isDragging && progress === 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse pointer-events-none">
          ← Drag to explore →
        </div>
      )}
    </div>
  );
}
