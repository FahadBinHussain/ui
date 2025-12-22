"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import * as THREE from "three";

interface RuttEtraProps {
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
  lineCount?: number;
  amplitude?: number;
  rotationSpeed?: number;
}

function RuttEtraMesh({
  imageUrl,
  videoUrl,
  lineCount = 80,
  amplitude = 2,
  rotationSpeed = 0.2,
}: Omit<RuttEtraProps, "className">) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Line[]>([]);
  const textureRef = useRef<THREE.Texture | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { camera } = useThree();

  useEffect(() => {
    // Set camera position
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    if (videoUrl) {
      // Create video element
      const video = document.createElement("video");
      video.src = videoUrl;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play();
      videoRef.current = video;

      // Create video texture
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureRef.current = texture;
    } else if (imageUrl) {
      // Load image texture
      const loader = new THREE.TextureLoader();
      loader.load(imageUrl, (texture) => {
        textureRef.current = texture;
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current = null;
      }
    };
  }, [imageUrl, videoUrl]);

  useFrame((state) => {
    if (!groupRef.current || !textureRef.current) return;

    // Rotate for 3D effect
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.3;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * rotationSpeed * 0.5) * 0.15;

    // Update line geometry based on texture brightness
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 256;

    // Draw texture to canvas to sample pixel data
    const image = textureRef.current.image as HTMLImageElement | HTMLVideoElement;
    if (image && (("videoWidth" in image && image.videoWidth) || ("width" in image && image.width))) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Update each line based on brightness
      linesRef.current.forEach((line, lineIndex) => {
        const geometry = line.geometry as THREE.BufferGeometry;
        const positions = geometry.getAttribute("position") as THREE.BufferAttribute;

        const y = (lineIndex / lineCount - 0.5) * 6;

        for (let i = 0; i < positions.count; i++) {
          const x = (i / (positions.count - 1) - 0.5) * 8;

          // Sample texture at this position
          const u = i / (positions.count - 1);
          const v = lineIndex / lineCount;

          const pixelX = Math.floor(u * canvas.width);
          const pixelY = Math.floor(v * canvas.height);
          const pixelIndex = (pixelY * canvas.width + pixelX) * 4;

          // Calculate luminance (brightness)
          const r = imageData.data[pixelIndex];
          const g = imageData.data[pixelIndex + 1];
          const b = imageData.data[pixelIndex + 2];
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Set Z position based on brightness
          const z = luminance * amplitude;

          positions.setXYZ(i, x, y, z);
        }

        positions.needsUpdate = true;
      });
    }
  });

  // Create scanlines
  useEffect(() => {
    if (!groupRef.current) return;

    const lines: THREE.Line[] = [];
    const pointsPerLine = 100;

    for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
      const points: THREE.Vector3[] = [];
      const y = (lineIndex / lineCount - 0.5) * 6;

      for (let i = 0; i < pointsPerLine; i++) {
        const x = (i / (pointsPerLine - 1) - 0.5) * 8;
        points.push(new THREE.Vector3(x, y, 0));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(lineIndex / lineCount, 0.8, 0.6),
        linewidth: 1,
      });

      const line = new THREE.Line(geometry, material);
      groupRef.current.add(line);
      lines.push(line);
    }

    linesRef.current = lines;

    return () => {
      lines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
        groupRef.current?.remove(line);
      });
    };
  }, [lineCount, amplitude]);

  return <group ref={groupRef} />;
}

export const RuttEtra: React.FC<RuttEtraProps> = ({
  imageUrl,
  videoUrl,
  className,
  lineCount = 80,
  amplitude = 2,
  rotationSpeed = 0.2,
}) => {
  return (
    <div className={cn("w-full h-full bg-black", className)}>
      <Canvas>
        <RuttEtraMesh
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          lineCount={lineCount}
          amplitude={amplitude}
          rotationSpeed={rotationSpeed}
        />
      </Canvas>
    </div>
  );
};
