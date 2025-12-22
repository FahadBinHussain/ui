"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface DisplacementHoverProps {
  image1: string;
  image2: string;
  displacementImage: string;
  className?: string;
  intensity?: number;
  speedIn?: number;
  speedOut?: number;
  easing?: string;
}

export const DisplacementHover: React.FC<DisplacementHoverProps> = ({
  image1,
  image2,
  displacementImage,
  className = "",
  intensity = 1,
  speedIn = 1.6,
  speedOut = 1.2,
  easing = "expo.out",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    if (width === 0 || height === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "1";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "anonymous";

    // Load textures
    const texture1 = textureLoader.load(image1);
    const texture2 = textureLoader.load(image2);
    const disp = textureLoader.load(displacementImage);

    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: texture1 },
        uTexture2: { value: texture2 },
        uDisplacement: { value: disp },
        uProgress: { value: 0 },
        uIntensity: { value: intensity },
        uAngle1: { value: Math.PI / 4 },
        uAngle2: { value: -Math.PI / 4 * 3 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture1;
        uniform sampler2D uTexture2;
        uniform sampler2D uDisplacement;
        uniform float uProgress;
        uniform float uIntensity;
        uniform float uAngle1;
        uniform float uAngle2;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          
          // Sample displacement map
          vec4 disp = texture2D(uDisplacement, uv);
          
          // Calculate displacement direction based on angles
          vec2 distortedPosition1 = vec2(uv.x + uIntensity * (disp.r - 0.5) * cos(uAngle1), uv.y + uIntensity * (disp.r - 0.5) * sin(uAngle1));
          vec2 distortedPosition2 = vec2(uv.x + uIntensity * (disp.r - 0.5) * cos(uAngle2), uv.y + uIntensity * (disp.r - 0.5) * sin(uAngle2));
          
          // Apply progress to displacement
          vec2 uvDisplaced1 = mix(uv, distortedPosition1, uProgress);
          vec2 uvDisplaced2 = mix(uv, distortedPosition2, 1.0 - uProgress);
          
          // Sample textures with displacement
          vec4 color1 = texture2D(uTexture1, uvDisplaced1);
          vec4 color2 = texture2D(uTexture2, uvDisplaced2);
          
          // Mix between the two textures
          vec4 finalColor = mix(color1, color2, uProgress);
          
          gl_FragColor = finalColor;
        }
      `,
    });
    materialRef.current = material;

    // Geometry
    const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Hover handlers
    const handleMouseEnter = () => {
      gsap.to(material.uniforms.uProgress, {
        value: 1,
        duration: speedIn,
        ease: easing,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(material.uniforms.uProgress, {
        value: 0,
        duration: speedOut,
        ease: easing,
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture1.dispose();
      texture2.dispose();
      disp.dispose();
      renderer.dispose();
    };
  }, [image1, image2, displacementImage, intensity, speedIn, speedOut, easing]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`} />
  );
};

// Preset displacement images
export const DisplacementPresets = {
  clouds: "https://images.unsplash.com/photo-1534088568595-a29ab2a5b6c2?w=512&h=512&fit=crop&grayscale=1",
  noise: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=512&h=512&fit=crop&grayscale=1",
  brush: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=512&h=512&fit=crop&grayscale=1",
  water: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=512&h=512&fit=crop&grayscale=1",
  fabric: "https://images.unsplash.com/photo-1511715282680-fbf93a50e721?w=512&h=512&fit=crop&grayscale=1",
};

// Grid layout for multiple displacement hovers
interface DisplacementGridProps {
  items: Array<{
    image1: string;
    image2: string;
    title?: string;
    subtitle?: string;
  }>;
  displacementImage: string;
  columns?: number;
  intensity?: number;
}

export const DisplacementGrid: React.FC<DisplacementGridProps> = ({
  items,
  displacementImage,
  columns = 3,
  intensity = 1,
}) => {
  return (
    <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item, index) => (
        <div key={index} className="relative group">
          <div className="aspect-[4/3] overflow-hidden">
            <DisplacementHover
              image1={item.image1}
              image2={item.image2}
              displacementImage={displacementImage}
              intensity={intensity}
              className="w-full h-full"
            />
          </div>
          {(item.title || item.subtitle) && (
            <div className="mt-4">
              {item.title && (
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              )}
              {item.subtitle && (
                <p className="text-sm text-slate-400 mt-1">{item.subtitle}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Full-screen displacement hover
interface FullscreenDisplacementProps {
  image1: string;
  image2: string;
  displacementImage: string;
  title?: string;
  subtitle?: string;
  intensity?: number;
}

export const FullscreenDisplacement: React.FC<FullscreenDisplacementProps> = ({
  image1,
  image2,
  displacementImage,
  title,
  subtitle,
  intensity = 1.5,
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <DisplacementHover
        image1={image1}
        image2={image2}
        displacementImage={displacementImage}
        intensity={intensity}
        speedIn={2}
        speedOut={1.5}
        easing="power3.out"
        className="w-full h-full"
      />
      
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            {title && (
              <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl text-white/90 drop-shadow-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Card with displacement hover
interface DisplacementCardProps {
  image1: string;
  image2: string;
  displacementImage: string;
  title: string;
  description: string;
  tag?: string;
  intensity?: number;
}

export const DisplacementCard: React.FC<DisplacementCardProps> = ({
  image1,
  image2,
  displacementImage,
  title,
  description,
  tag,
  intensity = 0.8,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <DisplacementHover
          image1={image1}
          image2={image2}
          displacementImage={displacementImage}
          intensity={intensity}
          className="w-full h-full"
        />
      </div>
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {tag && (
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-2">
              {tag}
            </span>
          )}
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
