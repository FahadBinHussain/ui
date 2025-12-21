"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceScrollProps {
  images: string[];
  className?: string;
  preloadProgress?: (progress: number) => void;
}

export const ImageSequenceScroll: React.FC<ImageSequenceScrollProps> = ({
  images,
  className = "",
  preloadProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ value: 0 });

  useEffect(() => {
    if (!images.length) return;

    // Preload all images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (preloadProgress) {
          preloadProgress(loadedCount / images.length);
        }
        if (loadedCount === images.length) {
          setIsLoaded(true);
        }
      };
      img.src = src;
      loadedImages[index] = img;
    });

    imagesRef.current = loadedImages;
  }, [images, preloadProgress]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match first image
    const firstImg = imagesRef.current[0];
    canvas.width = firstImg.width;
    canvas.height = firstImg.height;

    // Draw first frame
    ctx.drawImage(firstImg, 0, 0);

    // Create scroll animation
    const tween = gsap.to(frameRef.current, {
      value: images.length - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: canvas,
      },
      onUpdate: () => {
        const frameIndex = Math.round(frameRef.current.value);
        const img = imagesRef.current[frameIndex];
        if (img) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded, images.length]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400">Loading frames...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
};

interface AirPodsScrollProps {
  className?: string;
}

export const AirPodsScroll: React.FC<AirPodsScrollProps> = ({ className = "" }) => {
  // Generate placeholder images (in real use, these would be actual frame exports)
  const frames = Array.from(
    { length: 100 },
    (_, i) => `https://picsum.photos/800/600?random=${i}`
  );

  return (
    <div className={className} style={{ height: "300vh" }}>
      <ImageSequenceScroll images={frames} />
    </div>
  );
};

interface ProductRotateScrollProps {
  frameCount?: number;
  frameFolder?: string;
  framePrefix?: string;
  frameExtension?: string;
  className?: string;
}

export const ProductRotateScroll: React.FC<ProductRotateScrollProps> = ({
  frameCount = 120,
  frameFolder = "/frames",
  framePrefix = "frame_",
  frameExtension = "jpg",
  className = "",
}) => {
  const [loadProgress, setLoadProgress] = useState(0);

  // Generate frame URLs
  const frames = Array.from(
    { length: frameCount },
    (_, i) => `${frameFolder}/${framePrefix}${String(i).padStart(4, "0")}.${frameExtension}`
  );

  return (
    <div className={className}>
      {loadProgress < 1 && (
        <div className="fixed top-4 right-4 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg border border-slate-700 z-50">
          <p className="text-sm text-slate-300">
            Loading: {Math.round(loadProgress * 100)}%
          </p>
          <div className="w-48 h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${loadProgress * 100}%` }}
            />
          </div>
        </div>
      )}
      <div style={{ height: "400vh" }}>
        <ImageSequenceScroll
          images={frames}
          preloadProgress={setLoadProgress}
        />
      </div>
    </div>
  );
};

interface VideoScrollProps {
  videoSrc: string;
  className?: string;
}

export const VideoScroll: React.FC<VideoScrollProps> = ({
  videoSrc,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const video = videoRef.current;

    const tween = gsap.to(video, {
      currentTime: video.duration || 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: video,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: "300vh" }}>
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-auto"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};
