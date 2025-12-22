"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import * as THREE from "three";

interface Point {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  pz: number;
  pinned: boolean;
}

interface ClothTypographyProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  windStrength?: number;
  gravity?: number;
  className?: string;
  textColor?: string;
  backgroundColor?: string;
}

function ClothTypographyMesh({
  text,
  fontSize = 120,
  fontFamily = "Arial Black, sans-serif",
  windStrength = 0.3,
  gravity = 0.98,
  textColor = "#ffffff",
  backgroundColor = "transparent",
}: Omit<ClothTypographyProps, "className">) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<Point[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  const gridX = 40;
  const gridY = 20;
  const spacing = 0.15;

  useEffect(() => {
    // Create canvas texture with text
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1024;
    canvas.height = 512;

    // Draw background
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Initialize cloth physics points
    const points: Point[][] = [];
    for (let y = 0; y <= gridY; y++) {
      points[y] = [];
      for (let x = 0; x <= gridX; x++) {
        const posX = (x - gridX / 2) * spacing;
        const posY = (gridY / 2 - y) * spacing;
        points[y][x] = {
          x: posX,
          y: posY,
          z: 0,
          px: posX,
          py: posY,
          pz: 0,
          pinned: y === 0, // Pin top row
        };
      }
    }
    pointsRef.current = points;

    // Update texture on mesh
    if (meshRef.current) {
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      (meshRef.current.material as THREE.MeshBasicMaterial).map = texture;
    }
  }, [text, fontSize, fontFamily, textColor, backgroundColor]);

  useFrame((state) => {
    if (!meshRef.current || pointsRef.current.length === 0) return;

    const points = pointsRef.current;
    timeRef.current += 0.016; // ~60fps

    // Update mouse velocity
    const newMouseX = state.mouse.x * 3;
    const newMouseY = state.mouse.y * 3;
    mouseRef.current.vx = (newMouseX - mouseRef.current.x) * 0.1;
    mouseRef.current.vy = (newMouseY - mouseRef.current.y) * 0.1;
    mouseRef.current.x = newMouseX;
    mouseRef.current.y = newMouseY;

    // Physics simulation
    const iterations = 3;

    for (let iter = 0; iter < iterations; iter++) {
      // Update points with Verlet integration
      for (let y = 0; y <= gridY; y++) {
        for (let x = 0; x <= gridX; x++) {
          const p = points[y][x];
          if (p.pinned) continue;

          const vx = (p.x - p.px) * 0.99;
          const vy = (p.y - p.py) * 0.99;
          const vz = (p.z - p.pz) * 0.99;

          p.px = p.x;
          p.py = p.y;
          p.pz = p.z;

          // Apply forces
          // Gravity
          p.y -= gravity * 0.001;

          // Wind (sine wave)
          const windX = Math.sin(timeRef.current * 2 + y * 0.3) * windStrength * 0.01;
          const windZ = Math.cos(timeRef.current * 1.5 + x * 0.2) * windStrength * 0.01;
          p.x += windX;
          p.z += windZ;

          // Mouse interaction
          const distToMouse = Math.sqrt(
            (p.x - mouseRef.current.x) ** 2 + (p.y - mouseRef.current.y) ** 2
          );
          if (distToMouse < 1.5) {
            p.x += mouseRef.current.vx * 0.1;
            p.y += mouseRef.current.vy * 0.1;
          }

          // Apply velocity
          p.x += vx;
          p.y += vy;
          p.z += vz;
        }
      }

      // Constraint satisfaction (maintain stick lengths)
      const satisfyConstraints = () => {
        for (let y = 0; y <= gridY; y++) {
          for (let x = 0; x <= gridX; x++) {
            const p = points[y][x];

            // Horizontal constraint
            if (x < gridX) {
              const p2 = points[y][x + 1];
              const dx = p2.x - p.x;
              const dy = p2.y - p.y;
              const dz = p2.z - p.z;
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              const diff = (dist - spacing) / dist / 2;

              const offsetX = dx * diff;
              const offsetY = dy * diff;
              const offsetZ = dz * diff;

              if (!p.pinned) {
                p.x += offsetX;
                p.y += offsetY;
                p.z += offsetZ;
              }
              if (!p2.pinned) {
                p2.x -= offsetX;
                p2.y -= offsetY;
                p2.z -= offsetZ;
              }
            }

            // Vertical constraint
            if (y < gridY) {
              const p2 = points[y + 1][x];
              const dx = p2.x - p.x;
              const dy = p2.y - p.y;
              const dz = p2.z - p.z;
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              const diff = (dist - spacing) / dist / 2;

              const offsetX = dx * diff;
              const offsetY = dy * diff;
              const offsetZ = dz * diff;

              if (!p.pinned) {
                p.x += offsetX;
                p.y += offsetY;
                p.z += offsetZ;
              }
              if (!p2.pinned) {
                p2.x -= offsetX;
                p2.y -= offsetY;
                p2.z -= offsetZ;
              }
            }
          }
        }
      };

      satisfyConstraints();
    }

    // Update mesh geometry
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positionAttribute = geometry.getAttribute("position");

    for (let y = 0; y <= gridY; y++) {
      for (let x = 0; x <= gridX; x++) {
        const index = y * (gridX + 1) + x;
        const p = points[y][x];
        positionAttribute.setXYZ(index, p.x, p.y, p.z);
      }
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[gridX * spacing, gridY * spacing, gridX, gridY]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent={backgroundColor === "transparent"} />
    </mesh>
  );
}

export const ClothTypography: React.FC<ClothTypographyProps> = ({
  text,
  fontSize = 120,
  fontFamily = "Arial Black, sans-serif",
  windStrength = 0.3,
  gravity = 0.98,
  className,
  textColor = "#ffffff",
  backgroundColor = "transparent",
}) => {
  return (
    <div className={cn("w-full h-full", className)}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <ClothTypographyMesh
          text={text}
          fontSize={fontSize}
          fontFamily={fontFamily}
          windStrength={windStrength}
          gravity={gravity}
          textColor={textColor}
          backgroundColor={backgroundColor}
        />
      </Canvas>
    </div>
  );
};
