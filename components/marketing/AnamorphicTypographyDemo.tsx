"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "gsap";

export default function AnamorphicTypographyDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const textMeshesRef = useRef<THREE.Group | null>(null);
  const scrollProgressRef = useRef(0);
  const [isAligned, setIsAligned] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create anamorphic text meshes
    const textGroup = new THREE.Group();
    textMeshesRef.current = textGroup;
    scene.add(textGroup);

    // Word segments - create actual letter-like shapes
    const word = "CREATE";
    const segmentCount = word.length;

    // Function to create letter geometry based on character
    const createLetterSegments = (letter: string, letterIndex: number) => {
      const letterGroup = new THREE.Group();
      const segments: THREE.Mesh[] = [];

      // Each letter is made of multiple small cubes/segments
      const segmentsPerLetter = 12;

      for (let i = 0; i < segmentsPerLetter; i++) {
        const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL((letterIndex + i * 0.1) / segmentCount, 0.9, 0.6),
          metalness: 0.9,
          roughness: 0.1,
          emissive: new THREE.Color().setHSL((letterIndex + i * 0.1) / segmentCount, 0.9, 0.4),
          emissiveIntensity: 0.6,
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Create a circular/spiral pattern as the final formation
        const radius = 3;
        const spiralTurns = 2;
        const angle = ((letterIndex * segmentsPerLetter + i) / (segmentCount * segmentsPerLetter)) * Math.PI * 2 * spiralTurns;
        const heightOffset = ((letterIndex * segmentsPerLetter + i) / (segmentCount * segmentsPerLetter)) * 4 - 2;

        const targetX = Math.cos(angle) * radius;
        const targetY = heightOffset;
        const targetZ = Math.sin(angle) * radius;

        // Initial scattered/distorted positions (explosive 3D scatter)
        const scatterRadius = 15;
        const scatterAngle1 = (letterIndex * segmentCount + i) * 0.7 + Math.random() * 0.5;
        const scatterAngle2 = (letterIndex + i) * 1.2 + Math.random() * 0.5;
        const scatterAngle3 = (letterIndex * i) * 0.3 + Math.random() * 0.5;

        mesh.position.x = Math.cos(scatterAngle1) * Math.sin(scatterAngle2) * scatterRadius;
        mesh.position.y = Math.sin(scatterAngle3) * scatterRadius;
        mesh.position.z = Math.cos(scatterAngle2) * Math.sin(scatterAngle1) * scatterRadius;

        // Initial wild rotations
        mesh.rotation.x = Math.random() * Math.PI * 4;
        mesh.rotation.y = Math.random() * Math.PI * 4;
        mesh.rotation.z = Math.random() * Math.PI * 4;

        // Store userData for animation
        (mesh as any).userData = {
          initialPosition: mesh.position.clone(),
          initialRotation: mesh.rotation.clone(),
          targetPosition: new THREE.Vector3(targetX, targetY, targetZ),
          targetRotation: new THREE.Euler(angle, 0, 0), // Rotate to face outward from center
          // Final formation - sphere/galaxy
          finalPosition: new THREE.Vector3(
            Math.cos(angle) * Math.sin(heightOffset) * 5,
            Math.sin(angle) * 5,
            Math.cos(heightOffset) * Math.cos(angle) * 5
          ),
          finalRotation: new THREE.Euler(angle * 2, heightOffset, angle),
        };

        segments.push(mesh);
        letterGroup.add(mesh);
      }

      return letterGroup;
    };

    // Create all letters
    word.split("").forEach((letter, index) => {
      const letterGroup = createLetterSegments(letter, index);
      textGroup.add(letterGroup);
    });

    // Handle scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      
      scrollProgressRef.current = progress;
      setScrollProgress(progress);

      // Multi-stage animation logic
      let particleProgress = 0;
      let isScattered = false;
      let useSecondFormation = false;
      let sweetSpot = false;
      let cameraZ = 15;
      
      // Easing function for smooth transition
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      if (progress < 0.25) {
        // Stage 1: Scatter → Spiral (0-25%)
        particleProgress = progress / 0.25;
        cameraZ = 15 - (7 * easeInOutCubic(particleProgress)); // 15 to 8
      } else if (progress < 0.5) {
        // Stage 2: Hold spiral + zoom in (25-50%)
        particleProgress = 1; // Stay in spiral
        sweetSpot = true;
        const zoomProgress = (progress - 0.25) / 0.25;
        cameraZ = 8 - (4 * easeInOutCubic(zoomProgress)); // 8 to 4
      } else if (progress < 0.75) {
        // Stage 3: Scatter again (50-75%)
        const scatterProgress = (progress - 0.5) / 0.25;
        particleProgress = 1 - scatterProgress; // Go back towards 0
        isScattered = true;
        cameraZ = 4 + (4 * easeInOutCubic(scatterProgress)); // 4 to 8
      } else {
        // Stage 4: Form sphere/galaxy (75-100%)
        const finalProgress = (progress - 0.75) / 0.25;
        particleProgress = finalProgress;
        useSecondFormation = true;
        cameraZ = 8 - (2 * easeInOutCubic(finalProgress)); // 8 to 6
        if (finalProgress > 0.4 && finalProgress < 0.6) {
          sweetSpot = true;
        }
      }

      setIsAligned(sweetSpot);

      const easedProgress = easeInOutCubic(particleProgress);

      // Update text meshes based on scroll
      if (textGroup) {
        textGroup.children.forEach((letterGroup) => {
          (letterGroup as THREE.Group).children.forEach((child) => {
            const mesh = child as THREE.Mesh;
            const userData = (mesh as any).userData;

            if (useSecondFormation) {
              // Animate from spiral to final sphere
              mesh.position.lerpVectors(
                userData.targetPosition,
                userData.finalPosition,
                easedProgress
              );
              mesh.rotation.x = THREE.MathUtils.lerp(
                userData.targetRotation.x,
                userData.finalRotation.x,
                easedProgress
              );
              mesh.rotation.y = THREE.MathUtils.lerp(
                userData.targetRotation.y,
                userData.finalRotation.y,
                easedProgress
              );
              mesh.rotation.z = THREE.MathUtils.lerp(
                userData.targetRotation.z,
                userData.finalRotation.z,
                easedProgress
              );
            } else if (isScattered) {
              // Animate from spiral back to scatter
              mesh.position.lerpVectors(
                userData.targetPosition,
                userData.initialPosition,
                1 - easedProgress
              );
              mesh.rotation.x = THREE.MathUtils.lerp(
                userData.targetRotation.x,
                userData.initialRotation.x,
                1 - easedProgress
              );
              mesh.rotation.y = THREE.MathUtils.lerp(
                userData.targetRotation.y,
                userData.initialRotation.y,
                1 - easedProgress
              );
              mesh.rotation.z = THREE.MathUtils.lerp(
                userData.targetRotation.z,
                userData.initialRotation.z,
                1 - easedProgress
              );
            } else {
              // Animate from scatter to spiral
              mesh.position.lerpVectors(
                userData.initialPosition,
                userData.targetPosition,
                easedProgress
              );
              mesh.rotation.x = THREE.MathUtils.lerp(
                userData.initialRotation.x,
                userData.targetRotation.x,
                easedProgress
              );
              mesh.rotation.y = THREE.MathUtils.lerp(
                userData.initialRotation.y,
                userData.targetRotation.y,
                easedProgress
              );
              mesh.rotation.z = THREE.MathUtils.lerp(
                userData.initialRotation.z,
                userData.targetRotation.z,
                easedProgress
              );
            }

            // Pulse effect at sweet spot
            if (sweetSpot) {
              const scale = 1 + Math.sin(Date.now() * 0.01 + mesh.id) * 0.08;
              mesh.scale.set(scale, scale, scale);
            } else {
              mesh.scale.set(1, 1, 1);
            }
          });
        });

        // Dynamic camera positioning based on stage
        camera.position.x = Math.sin(progress * Math.PI * 2) * 1.5;
        camera.position.y = Math.cos(progress * Math.PI) * 1;
        camera.position.z = cameraZ;
        camera.lookAt(0, 0, 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Continuous spiral rotation - more dramatic
      if (textGroup) {
        textGroup.rotation.y += 0.005; // Constant rotation
        textGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15; // Gentle tilt
        textGroup.rotation.z = Math.cos(Date.now() * 0.0003) * 0.1; // Slight wobble
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-full px-6 py-3">
          <p className="text-cyan-400 text-sm font-mono">
            Scroll to align perspective
          </p>
        </div>
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed top-8 right-8 z-20">
        <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-3">
          <p className="text-cyan-400 text-xs font-mono mb-2">
            Scroll Progress
          </p>
          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <p className="text-cyan-400 text-xs font-mono mt-2 text-center">
            {Math.round(scrollProgress * 100)}%
          </p>
        </div>
      </div>

      {/* Sweet spot indicator */}
      {isAligned && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            >
              PERFECT
            </motion.div>
            <p className="text-cyan-300 text-lg mt-4">Spiral formation complete!</p>
          </div>
        </motion.div>
      )}

      {/* Info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed bottom-8 left-8 z-20 max-w-md"
      >
        <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">
            Anamorphic Typography
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Scroll to watch chaotic 3D particles coalesce into a beautiful 
            <span className="text-cyan-300 font-semibold"> spiral formation</span>.
            Perfect alignment occurs at the sweet spot!
          </p>
        </div>
      </motion.div>

      {/* Spacer for scroll */}
      <div className="h-[400vh]" />
    </div>
  );
}
