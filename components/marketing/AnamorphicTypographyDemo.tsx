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
      const segmentsPerLetter = 8;

      for (let i = 0; i < segmentsPerLetter; i++) {
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL((letterIndex + i * 0.1) / segmentCount, 0.9, 0.6),
          metalness: 0.9,
          roughness: 0.1,
          emissive: new THREE.Color().setHSL((letterIndex + i * 0.1) / segmentCount, 0.9, 0.4),
          emissiveIntensity: 0.6,
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Position segments to roughly form a letter shape when aligned
        const angle = (i / segmentsPerLetter) * Math.PI * 2;
        const targetX = (letterIndex - segmentCount / 2) * 2.5;
        const targetY = Math.cos(angle) * 0.8;
        const targetZ = 0;

        // Initial scattered/distorted positions (3D space all around)
        const scatterRadius = 8;
        const scatterAngle1 = (letterIndex * segmentCount + i) * 0.5;
        const scatterAngle2 = (letterIndex + i) * 0.8;

        mesh.position.x = targetX + Math.cos(scatterAngle1) * scatterRadius;
        mesh.position.y = targetY + Math.sin(scatterAngle2) * scatterRadius;
        mesh.position.z = Math.sin(scatterAngle1) * scatterRadius + (i - segmentsPerLetter / 2) * 2;

        // Initial wild rotations
        mesh.rotation.x = Math.random() * Math.PI * 2;
        mesh.rotation.y = Math.random() * Math.PI * 2;
        mesh.rotation.z = Math.random() * Math.PI * 2;

        // Store userData for animation
        (mesh as any).userData = {
          initialPosition: mesh.position.clone(),
          initialRotation: mesh.rotation.clone(),
          targetPosition: new THREE.Vector3(targetX, targetY, targetZ),
          targetRotation: new THREE.Euler(0, 0, 0),
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

      // Check if we're in the "sweet spot" (around 50%)
      const sweetSpot = Math.abs(progress - 0.5) < 0.05;
      setIsAligned(sweetSpot);

      // Update text meshes based on scroll
      if (textGroup) {
        textGroup.children.forEach((letterGroup) => {
          (letterGroup as THREE.Group).children.forEach((child) => {
            const mesh = child as THREE.Mesh;
            const userData = (mesh as any).userData;

            // Easing function for smooth transition
            const easeInOutCubic = (t: number) => {
              return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            const easedProgress = easeInOutCubic(progress);

            // Interpolate position
            mesh.position.lerpVectors(
              userData.initialPosition,
              userData.targetPosition,
              easedProgress
            );

            // Interpolate rotation
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

            // Pulse effect at sweet spot
            if (sweetSpot) {
              const scale = 1 + Math.sin(Date.now() * 0.01 + mesh.id) * 0.08;
              mesh.scale.set(scale, scale, scale);
            } else {
              mesh.scale.set(1, 1, 1);
            }
          });
        });

        // Camera movement along bezier curve
        const cameraPath = new THREE.CubicBezierCurve3(
          new THREE.Vector3(0, 5, 15),
          new THREE.Vector3(-8, 2, 10),
          new THREE.Vector3(8, -2, 10),
          new THREE.Vector3(0, 0, 8)
        );

        const cameraPosition = cameraPath.getPoint(progress);
        camera.position.copy(cameraPosition);
        camera.lookAt(0, 0, 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle rotation
      if (textGroup) {
        textGroup.rotation.y = Math.sin(Date.now() * 0.0002) * 0.05;
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
              ALIGNED
            </motion.div>
            <p className="text-cyan-300 text-lg mt-4">Sweet spot reached!</p>
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
            Scroll to reveal the hidden message. The text appears distorted until you reach the 
            <span className="text-cyan-300 font-semibold"> sweet spot </span>
            where perspective aligns perfectly.
          </p>
        </div>
      </motion.div>

      {/* Spacer for scroll */}
      <div className="h-[400vh]" />
    </div>
  );
}
