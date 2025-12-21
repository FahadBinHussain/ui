"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface PixelatedTransitionProps {
  imageSrc: string;
  nextImageSrc?: string;
  pixelSize?: number;
  duration?: number;
  onTransitionComplete?: () => void;
  className?: string;
  enableChromaticAberration?: boolean;
}

export const PixelatedTransition: React.FC<PixelatedTransitionProps> = ({
  imageSrc,
  nextImageSrc,
  pixelSize = 100,
  duration = 2,
  onTransitionComplete,
  className = "",
  enableChromaticAberration = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic camera for 2D rendering
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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader with pixelation and chromatic aberration
    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uNextTexture;
      uniform float uPixelSize;
      uniform float uProgress;
      uniform float uChromaticAberration;
      uniform vec2 uResolution;
      
      varying vec2 vUv;
      
      vec4 getPixelatedColor(sampler2D tex, vec2 uv, float pixelSize) {
        vec2 pixelatedUV = floor(uv * uResolution / pixelSize) * pixelSize / uResolution;
        return texture2D(tex, pixelatedUV);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Calculate pixelated UVs
        vec2 pixelatedUV = floor(uv * uResolution / uPixelSize) * uPixelSize / uResolution;
        
        // Sample current texture
        vec4 currentColor;
        if (uChromaticAberration > 0.0) {
          // Chromatic aberration effect
          float offset = uChromaticAberration * uPixelSize / 100.0;
          float r = texture2D(uTexture, pixelatedUV + vec2(offset, 0.0)).r;
          float g = texture2D(uTexture, pixelatedUV).g;
          float b = texture2D(uTexture, pixelatedUV - vec2(offset, 0.0)).b;
          currentColor = vec4(r, g, b, 1.0);
        } else {
          currentColor = texture2D(uTexture, pixelatedUV);
        }
        
        // Sample next texture if transitioning
        vec4 nextColor;
        if (uProgress > 0.0) {
          if (uChromaticAberration > 0.0) {
            float offset = uChromaticAberration * uPixelSize / 100.0;
            float r = texture2D(uNextTexture, pixelatedUV + vec2(offset, 0.0)).r;
            float g = texture2D(uNextTexture, pixelatedUV).g;
            float b = texture2D(uNextTexture, pixelatedUV - vec2(offset, 0.0)).b;
            nextColor = vec4(r, g, b, 1.0);
          } else {
            nextColor = texture2D(uNextTexture, pixelatedUV);
          }
          
          // Mix between current and next image based on progress
          currentColor = mix(currentColor, nextColor, uProgress);
        }
        
        gl_FragColor = currentColor;
      }
    `;

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc);
    const nextTexture = nextImageSrc ? textureLoader.load(nextImageSrc) : texture;

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uNextTexture: { value: nextTexture },
        uPixelSize: { value: 1.0 },
        uProgress: { value: 0.0 },
        uChromaticAberration: { value: enableChromaticAberration ? 1.0 : 0.0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
    });
    materialRef.current = material;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      material.uniforms.uResolution.value.set(newWidth, newHeight);

      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      if (nextTexture !== texture) nextTexture.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [imageSrc, nextImageSrc, enableChromaticAberration]);

  const startTransition = (targetPixelSize: number = pixelSize) => {
    if (!materialRef.current || isTransitioning) return;

    setIsTransitioning(true);

    const material = materialRef.current;

    // Animate pixelation in (high pixel size = blocky)
    gsap.to(material.uniforms.uPixelSize, {
      value: targetPixelSize,
      duration: duration / 2,
      ease: "power2.in",
      onComplete: () => {
        // If there's a next image, start transitioning to it
        if (nextImageSrc) {
          gsap.to(material.uniforms.uProgress, {
            value: 1.0,
            duration: 0.3,
            ease: "none",
            onComplete: () => {
              // Animate pixelation out (low pixel size = sharp)
              gsap.to(material.uniforms.uPixelSize, {
                value: 1.0,
                duration: duration / 2,
                ease: "power2.out",
                onComplete: () => {
                  setIsTransitioning(false);
                  onTransitionComplete?.();
                },
              });
            },
          });
        } else {
          // No next image, just resolve back to sharp
          gsap.to(material.uniforms.uPixelSize, {
            value: 1.0,
            duration: duration / 2,
            ease: "power2.out",
            onComplete: () => {
              setIsTransitioning(false);
              onTransitionComplete?.();
            },
          });
        }
      },
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      {!isTransitioning && (
        <button
          onClick={() => startTransition()}
          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Pixelate
        </button>
      )}
    </div>
  );
};

// Hover variant - pixelates on hover
interface PixelatedHoverProps {
  imageSrc: string;
  pixelSize?: number;
  className?: string;
  enableChromaticAberration?: boolean;
}

export const PixelatedHover: React.FC<PixelatedHoverProps> = ({
  imageSrc,
  pixelSize = 50,
  className = "",
  enableChromaticAberration = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Shaders (same as above)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uPixelSize;
      uniform float uChromaticAberration;
      uniform vec2 uResolution;
      varying vec2 vUv;
      
      void main() {
        vec2 pixelatedUV = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
        
        vec4 color;
        if (uChromaticAberration > 0.0) {
          float offset = uChromaticAberration * uPixelSize / 100.0;
          float r = texture2D(uTexture, pixelatedUV + vec2(offset, 0.0)).r;
          float g = texture2D(uTexture, pixelatedUV).g;
          float b = texture2D(uTexture, pixelatedUV - vec2(offset, 0.0)).b;
          color = vec4(r, g, b, 1.0);
        } else {
          color = texture2D(uTexture, pixelatedUV);
        }
        
        gl_FragColor = color;
      }
    `;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uPixelSize: { value: 1.0 },
        uChromaticAberration: { value: enableChromaticAberration ? 1.0 : 0.0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [imageSrc, enableChromaticAberration]);

  const handleMouseEnter = () => {
    if (!materialRef.current) return;
    gsap.to(materialRef.current.uniforms.uPixelSize, {
      value: pixelSize,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!materialRef.current) return;
    gsap.to(materialRef.current.uniforms.uPixelSize, {
      value: 1.0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

// Image carousel with pixelated transitions
interface PixelatedCarouselProps {
  images: string[];
  pixelSize?: number;
  duration?: number;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  enableChromaticAberration?: boolean;
}

export const PixelatedCarousel: React.FC<PixelatedCarouselProps> = ({
  images,
  pixelSize = 80,
  duration = 2,
  autoPlay = false,
  interval = 5000,
  className = "",
  enableChromaticAberration = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current || images.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uNextTexture;
      uniform float uPixelSize;
      uniform float uProgress;
      uniform float uChromaticAberration;
      uniform vec2 uResolution;
      varying vec2 vUv;
      
      void main() {
        vec2 pixelatedUV = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
        
        vec4 currentColor;
        vec4 nextColor;
        
        if (uChromaticAberration > 0.0) {
          float offset = uChromaticAberration * uPixelSize / 100.0;
          
          float r1 = texture2D(uTexture, pixelatedUV + vec2(offset, 0.0)).r;
          float g1 = texture2D(uTexture, pixelatedUV).g;
          float b1 = texture2D(uTexture, pixelatedUV - vec2(offset, 0.0)).b;
          currentColor = vec4(r1, g1, b1, 1.0);
          
          float r2 = texture2D(uNextTexture, pixelatedUV + vec2(offset, 0.0)).r;
          float g2 = texture2D(uNextTexture, pixelatedUV).g;
          float b2 = texture2D(uNextTexture, pixelatedUV - vec2(offset, 0.0)).b;
          nextColor = vec4(r2, g2, b2, 1.0);
        } else {
          currentColor = texture2D(uTexture, pixelatedUV);
          nextColor = texture2D(uNextTexture, pixelatedUV);
        }
        
        gl_FragColor = mix(currentColor, nextColor, uProgress);
      }
    `;

    const textureLoader = new THREE.TextureLoader();
    const textures = images.map((img) => textureLoader.load(img));
    texturesRef.current = textures;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: textures[0] },
        uNextTexture: { value: textures[1] || textures[0] },
        uPixelSize: { value: 1.0 },
        uProgress: { value: 0.0 },
        uChromaticAberration: { value: enableChromaticAberration ? 1.0 : 0.0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(width, height);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      geometry.dispose();
      material.dispose();
      textures.forEach((tex) => tex.dispose());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [images, enableChromaticAberration]);

  const transitionToNext = () => {
    if (!materialRef.current || isTransitioning || images.length <= 1) return;

    setIsTransitioning(true);
    const material = materialRef.current;
    const nextIndex = (currentIndex + 1) % images.length;

    material.uniforms.uTexture.value = texturesRef.current[currentIndex];
    material.uniforms.uNextTexture.value = texturesRef.current[nextIndex];
    material.uniforms.uProgress.value = 0;

    // Pixelate in
    gsap.to(material.uniforms.uPixelSize, {
      value: pixelSize,
      duration: duration / 3,
      ease: "power2.in",
      onComplete: () => {
        // Cross-fade between images
        gsap.to(material.uniforms.uProgress, {
          value: 1.0,
          duration: duration / 3,
          ease: "none",
          onComplete: () => {
            // Resolve back to sharp
            gsap.to(material.uniforms.uPixelSize, {
              value: 1.0,
              duration: duration / 3,
              ease: "power2.out",
              onComplete: () => {
                setCurrentIndex(nextIndex);
                setIsTransitioning(false);
              },
            });
          },
        });
      },
    });
  };

  const transitionToPrev = () => {
    if (!materialRef.current || isTransitioning || images.length <= 1) return;

    setIsTransitioning(true);
    const material = materialRef.current;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    material.uniforms.uTexture.value = texturesRef.current[currentIndex];
    material.uniforms.uNextTexture.value = texturesRef.current[prevIndex];
    material.uniforms.uProgress.value = 0;

    gsap.to(material.uniforms.uPixelSize, {
      value: pixelSize,
      duration: duration / 3,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(material.uniforms.uProgress, {
          value: 1.0,
          duration: duration / 3,
          ease: "none",
          onComplete: () => {
            gsap.to(material.uniforms.uPixelSize, {
              value: 1.0,
              duration: duration / 3,
              ease: "power2.out",
              onComplete: () => {
                setCurrentIndex(prevIndex);
                setIsTransitioning(false);
              },
            });
          },
        });
      },
    });
  };

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      intervalRef.current = setInterval(() => {
        transitionToNext();
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, currentIndex, interval, images.length]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={transitionToPrev}
            disabled={isTransitioning}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Previous
          </button>
          <button
            onClick={transitionToNext}
            disabled={isTransitioning}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Next
          </button>
        </div>
      )}
      {/* Indicator dots */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-purple-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
