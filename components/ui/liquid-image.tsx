"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LiquidImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  intensity?: number;
  className?: string;
}

export const LiquidImage: React.FC<LiquidImageProps> = ({
  src,
  alt = "Liquid Image",
  width = 600,
  height = 400,
  intensity = 0.3,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const threeRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let THREE: any;
    let scene: any;
    let camera: any;
    let renderer: any;
    let mesh: any;
    let texture: any;
    let hoverProgress = 0;

    const initThree = async () => {
      // Dynamic import Three.js
      THREE = await import("three");

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Load texture
      const textureLoader = new THREE.TextureLoader();
      texture = textureLoader.load(src);

      // Vertex Shader
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      // Fragment Shader with liquid distortion
      const fragmentShader = `
        uniform sampler2D uTexture;
        uniform float uHover;
        uniform vec2 uMouse;
        uniform float uTime;
        uniform float uIntensity;
        varying vec2 vUv;

        // Noise function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = vUv;
          
          // Calculate distance from mouse
          float dist = distance(uv, uMouse);
          float influence = smoothstep(0.5, 0.0, dist);
          
          // Create ripple effect
          float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.5 + 0.5;
          ripple *= influence;
          
          // Create noise-based displacement
          float noiseValue = noise(uv * 10.0 + uTime * 0.5);
          
          // Combine effects
          vec2 displacement = vec2(
            cos(uv.y * 10.0 + uTime) * noiseValue,
            sin(uv.x * 10.0 + uTime) * noiseValue
          );
          
          displacement += vec2(
            cos(dist * 10.0 - uTime * 2.0),
            sin(dist * 10.0 - uTime * 2.0)
          ) * ripple;
          
          // Apply displacement based on hover
          vec2 distortedUv = uv + displacement * uHover * uIntensity;
          
          // Sample texture
          vec4 color = texture2D(uTexture, distortedUv);
          
          // Add slight color shift on hover
          color.rgb += vec3(ripple * uHover * 0.1);
          
          gl_FragColor = color;
        }
      `;

      // Create shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uHover: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uIntensity: { value: intensity },
        },
        vertexShader,
        fragmentShader,
      });

      // Create plane geometry
      const geometry = new THREE.PlaneGeometry(2, 2);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      threeRef.current = {
        THREE,
        scene,
        camera,
        renderer,
        mesh,
        material,
      };

      // Animation loop
      const animate = (time: number) => {
        if (!mesh) return;

        // Update hover progress
        if (isHovered) {
          hoverProgress = Math.min(hoverProgress + 0.05, 1);
        } else {
          hoverProgress = Math.max(hoverProgress - 0.05, 0);
        }

        // Update uniforms
        mesh.material.uniforms.uHover.value = hoverProgress;
        mesh.material.uniforms.uTime.value = time * 0.001;

        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate(0);
    };

    initThree();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (threeRef.current) {
        const { renderer, scene, mesh } = threeRef.current;
        if (mesh) {
          mesh.geometry.dispose();
          mesh.material.dispose();
          scene.remove(mesh);
        }
        if (renderer) {
          renderer.dispose();
        }
      }
    };
  }, [src, width, height, intensity, isHovered]);

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !threeRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });

    if (threeRef.current.mesh) {
      threeRef.current.mesh.material.uniforms.uMouse.value.set(x, y);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

// Grid component for multiple liquid images
interface LiquidImageGridProps {
  images: Array<{ src: string; alt?: string }>;
  columns?: number;
  imageWidth?: number;
  imageHeight?: number;
  gap?: number;
  className?: string;
}

export const LiquidImageGrid: React.FC<LiquidImageGridProps> = ({
  images,
  columns = 3,
  imageWidth = 300,
  imageHeight = 200,
  gap = 16,
  className = "",
}) => {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, ${imageWidth}px)`,
        gap: `${gap}px`,
      }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <LiquidImage
            src={image.src}
            alt={image.alt}
            width={imageWidth}
            height={imageHeight}
          />
        </motion.div>
      ))}
    </div>
  );
};
