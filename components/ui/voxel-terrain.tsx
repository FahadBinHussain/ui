"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface VoxelTerrainProps {
  gridSize?: number;
  cubeSize?: number;
  className?: string;
  noiseScale?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
}

export const VoxelTerrain: React.FC<VoxelTerrainProps> = ({
  gridSize = 80,
  cubeSize = 1,
  className = "",
  noiseScale = 0.05,
  waveSpeed = 2,
  waveAmplitude = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const mouseRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const timeRef = useRef(0);
  const heightMapRef = useRef<Float32Array>(new Float32Array(gridSize * gridSize));

  // Simplified Perlin-like noise function
  const noise2D = (x: number, y: number): number => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const rand = Math.sin(X * 12.9898 + Y * 78.233) * 43758.5453;
    return (rand - Math.floor(rand)) * 2 - 1;
  };

  const perlinNoise = (x: number, y: number): number => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;

    const n00 = noise2D(xi, yi);
    const n01 = noise2D(xi, yi + 1);
    const n10 = noise2D(xi + 1, yi);
    const n11 = noise2D(xi + 1, yi + 1);

    const u = xf * xf * (3.0 - 2.0 * xf);
    const v = yf * yf * (3.0 - 2.0 * yf);

    const nx0 = n00 * (1 - u) + n10 * u;
    const nx1 = n01 * (1 - u) + n11 * u;

    return nx0 * (1 - v) + nx1 * v;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(gridSize * 1.5, gridSize * 1.5, gridSize * 1.5);
    camera.lookAt(gridSize / 2, 0, gridSize / 2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 50);
    scene.add(directionalLight);

    // Create instanced mesh
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      emissive: 0x002211,
      shininess: 100,
    });

    const instanceCount = gridSize * gridSize;
    const instancedMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
    meshRef.current = instancedMesh;

    // Initialize heights with Perlin noise
    const dummy = new THREE.Object3D();
    let index = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const noiseValue = perlinNoise(x * noiseScale, z * noiseScale);
        const height = noiseValue * 10 + 5;
        heightMapRef.current[index] = height;

        dummy.position.set(
          x * cubeSize * 1.1 - (gridSize * cubeSize * 1.1) / 2,
          height / 2,
          z * cubeSize * 1.1 - (gridSize * cubeSize * 1.1) / 2
        );
        dummy.scale.set(1, height, 1);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(index, dummy.matrix);

        // Color variation based on height
        const color = new THREE.Color();
        const hue = 0.5 + (noiseValue * 0.2);
        color.setHSL(hue, 0.8, 0.5);
        instancedMesh.setColorAt(index, color);

        index++;
      }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    scene.add(instancedMesh);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedMesh);

      if (intersects.length > 0) {
        const instanceId = intersects[0].instanceId;
        if (instanceId !== undefined) {
          const x = Math.floor(instanceId / gridSize);
          const z = instanceId % gridSize;
          mouseRef.current.set(x, 0, z);
        }
      }
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016 * waveSpeed;

      const dummy = new THREE.Object3D();
      let index = 0;

      for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
          const baseHeight = heightMapRef.current[index];

          // Calculate wave effect
          const dx = x - mouseRef.current.x;
          const dz = z - mouseRef.current.z;
          const distance = Math.sqrt(dx * dx + dz * dz);
          const wave = Math.sin(distance * 0.5 - timeRef.current) * waveAmplitude;

          // Decay wave over distance
          const decay = Math.max(0, 1 - distance / 30);
          const finalHeight = baseHeight + wave * decay;

          dummy.position.set(
            x * cubeSize * 1.1 - (gridSize * cubeSize * 1.1) / 2,
            finalHeight / 2,
            z * cubeSize * 1.1 - (gridSize * cubeSize * 1.1) / 2
          );
          dummy.scale.set(1, Math.max(0.1, finalHeight), 1);
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(index, dummy.matrix);

          // Update color based on height
          const color = new THREE.Color();
          const intensity = (finalHeight / 20) * decay;
          color.setHSL(0.5 + intensity * 0.3, 0.8, 0.4 + intensity * 0.3);
          instancedMesh.setColorAt(index, color);

          index++;
        }
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }

      // Rotate camera slowly
      const time = Date.now() * 0.0001;
      camera.position.x = Math.cos(time) * gridSize * 1.5;
      camera.position.z = Math.sin(time) * gridSize * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [gridSize, cubeSize, noiseScale, waveSpeed, waveAmplitude]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

// Static voxel terrain (no animation)
interface StaticVoxelProps {
  gridSize?: number;
  cubeSize?: number;
  className?: string;
  colorScheme?: "green" | "blue" | "purple" | "rainbow";
}

export const StaticVoxel: React.FC<StaticVoxelProps> = ({
  gridSize = 50,
  cubeSize = 1,
  className = "",
  colorScheme = "green",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(gridSize, gridSize, gridSize);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 50);
    scene.add(directionalLight);

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    let baseColor;
    switch (colorScheme) {
      case "blue": baseColor = 0x0088ff; break;
      case "purple": baseColor = 0x8800ff; break;
      case "rainbow": baseColor = 0xff0088; break;
      default: baseColor = 0x00ff88;
    }

    const material = new THREE.MeshPhongMaterial({ color: baseColor });
    const instancedMesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize);

    const dummy = new THREE.Object3D();
    let index = 0;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const height = Math.random() * 15 + 2;
        dummy.position.set(
          x * cubeSize * 1.1 - (gridSize * cubeSize * 1.1) / 2,
          height / 2,
          z * cubeSize * 1.1 - (gridSize * cubeSize * 1.1) / 2
        );
        dummy.scale.set(1, height, 1);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(index, dummy.matrix);
        index++;
      }
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);

    renderer.render(scene, camera);

    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [gridSize, cubeSize, colorScheme]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
