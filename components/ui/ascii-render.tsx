"use client";

import React, { useRef, useState, useEffect } from "react";

interface AsciiRendererProps {
  source: "webcam" | "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  charSet?: string;
  fontSize?: number;
  blockSize?: number;
  className?: string;
  width?: number;
  height?: number;
  inverted?: boolean;
}

export const AsciiRenderer: React.FC<AsciiRendererProps> = ({
  source,
  imageUrl,
  videoUrl,
  charSet = " .:-=+*#%@",
  fontSize = 10,
  blockSize = 8,
  className = "",
  width = 640,
  height = 480,
  inverted = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const initSource = async () => {
      if (source === "webcam") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width, height },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsReady(true);
          }
        } catch (err) {
          setError("Could not access webcam");
          console.error(err);
        }
      } else if (source === "video" && videoUrl && videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
        setIsReady(true);
      } else if (source === "image" && imageUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          imageRef.current = img;
          setIsReady(true);
        };
        img.onerror = () => {
          setError("Failed to load image");
        };
        img.src = imageUrl;
      }
    };

    initSource();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (source === "webcam" && videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [source, imageUrl, videoUrl, width, height]);

  useEffect(() => {
    if (!isReady) return;

    const render = () => {
      const canvas = canvasRef.current;
      const hiddenCanvas = hiddenCanvasRef.current;
      if (!canvas || !hiddenCanvas) return;

      const ctx = canvas.getContext("2d");
      const hiddenCtx = hiddenCanvas.getContext("2d");
      if (!ctx || !hiddenCtx) return;

      // Clear canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get source element
      let sourceElement: HTMLImageElement | HTMLVideoElement | null = null;

      if (source === "webcam" || source === "video") {
        sourceElement = videoRef.current;
      } else if (source === "image") {
        sourceElement = imageRef.current;
      }

      if (sourceElement) {
        // Check if video is ready
        if (sourceElement instanceof HTMLVideoElement && sourceElement.readyState < 2) {
          animationFrameRef.current = requestAnimationFrame(render);
          return;
        }

        try {
          hiddenCtx.drawImage(sourceElement, 0, 0, width, height);
          const imageData = hiddenCtx.getImageData(0, 0, width, height);
          const pixels = imageData.data;

          // ASCII rendering
          ctx.fillStyle = "lime";
          ctx.font = `${fontSize}px monospace`;

          for (let y = 0; y < height; y += blockSize) {
            for (let x = 0; x < width; x += blockSize) {
              const pixelIndex = (y * width + x) * 4;
              const r = pixels[pixelIndex];
              const g = pixels[pixelIndex + 1];
              const b = pixels[pixelIndex + 2];

              // Calculate brightness
              const brightness = (r + g + b) / 3;
              const normalizedBrightness = inverted
                ? 1 - brightness / 255
                : brightness / 255;

              // Map to character
              const charIndex = Math.floor(
                normalizedBrightness * (charSet.length - 1)
              );
              const char = charSet[charIndex];

              // Draw character
              ctx.fillText(char, x, y + fontSize);
            }
          }
        } catch (err) {
          console.error("Rendering error:", err);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReady, source, imageUrl, charSet, fontSize, blockSize, width, height, inverted]);

  return (
    <div className={`relative ${className}`}>
      {error && (
        <div className="text-red-500 text-center p-4">{error}</div>
      )}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-green-500 bg-black"
      />
      <canvas
        ref={hiddenCanvasRef}
        width={width}
        height={height}
        className="hidden"
      />
      {(source === "webcam" || source === "video") && (
        <video ref={videoRef} className="hidden" />
      )}
    </div>
  );
};

// Text-based ASCII renderer using <pre> tag
interface AsciiTextRendererProps {
  source: "webcam" | "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  charSet?: string;
  blockSize?: number;
  className?: string;
  width?: number;
  height?: number;
  inverted?: boolean;
  color?: string;
}

export const AsciiTextRenderer: React.FC<AsciiTextRendererProps> = ({
  source,
  imageUrl,
  videoUrl,
  charSet = " .:-=+*#%@",
  blockSize = 8,
  className = "",
  width = 320,
  height = 240,
  inverted = false,
  color = "#00ff00",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [asciiText, setAsciiText] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const initSource = async () => {
      if (source === "webcam") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width, height },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsReady(true);
          }
        } catch (err) {
          setError("Could not access webcam");
          console.error(err);
        }
      } else if (source === "video" && videoUrl && videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
        setIsReady(true);
      } else if (source === "image" && imageUrl) {
        setIsReady(true);
      }
    };

    initSource();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (source === "webcam" && videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [source, imageUrl, videoUrl, width, height]);

  useEffect(() => {
    if (!isReady) return;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let sourceElement: HTMLImageElement | HTMLVideoElement | null = null;

      if (source === "webcam" || source === "video") {
        sourceElement = videoRef.current;
      } else if (source === "image" && imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = "anonymous";
        sourceElement = img;
      }

      if (sourceElement && (sourceElement as HTMLVideoElement).readyState >= 2) {
        ctx.drawImage(sourceElement, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        let ascii = "";
        for (let y = 0; y < height; y += blockSize) {
          for (let x = 0; x < width; x += blockSize) {
            const pixelIndex = (y * width + x) * 4;
            const r = pixels[pixelIndex];
            const g = pixels[pixelIndex + 1];
            const b = pixels[pixelIndex + 2];

            const brightness = (r + g + b) / 3;
            const normalizedBrightness = inverted
              ? 1 - brightness / 255
              : brightness / 255;

            const charIndex = Math.floor(
              normalizedBrightness * (charSet.length - 1)
            );
            ascii += charSet[charIndex];
          }
          ascii += "\n";
        }

        setAsciiText(ascii);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReady, source, imageUrl, charSet, blockSize, width, height, inverted]);

  return (
    <div className={`relative ${className}`}>
      {error && (
        <div className="text-red-500 text-center p-4">{error}</div>
      )}
      <pre
        className="font-mono leading-none overflow-hidden"
        style={{
          color,
          fontSize: "8px",
          lineHeight: "8px",
          letterSpacing: "1px",
        }}
      >
        {asciiText}
      </pre>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="hidden"
      />
      {(source === "webcam" || source === "video") && (
        <video ref={videoRef} className="hidden" />
      )}
    </div>
  );
};

// Static Image ASCII converter
interface StaticAsciiProps {
  imageUrl: string;
  charSet?: string;
  blockSize?: number;
  className?: string;
  width?: number;
  inverted?: boolean;
  color?: string;
}

export const StaticAscii: React.FC<StaticAsciiProps> = ({
  imageUrl,
  charSet = " .:-=+*#%@",
  blockSize = 4,
  className = "",
  width = 400,
  inverted = false,
  color = "#00ff00",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [asciiText, setAsciiText] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const aspectRatio = img.height / img.width;
      const height = Math.floor(width * aspectRatio);

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      let ascii = "";
      for (let y = 0; y < height; y += blockSize) {
        for (let x = 0; x < width; x += blockSize) {
          const pixelIndex = (y * width + x) * 4;
          const r = pixels[pixelIndex];
          const g = pixels[pixelIndex + 1];
          const b = pixels[pixelIndex + 2];

          const brightness = (r + g + b) / 3;
          const normalizedBrightness = inverted
            ? 1 - brightness / 255
            : brightness / 255;

          const charIndex = Math.floor(
            normalizedBrightness * (charSet.length - 1)
          );
          ascii += charSet[charIndex];
        }
        ascii += "\n";
      }

      setAsciiText(ascii);
    };
  }, [imageUrl, charSet, blockSize, width, inverted]);

  return (
    <div className={`relative ${className}`}>
      <pre
        className="font-mono leading-none overflow-hidden"
        style={{
          color,
          fontSize: "6px",
          lineHeight: "6px",
          letterSpacing: "0px",
        }}
      >
        {asciiText}
      </pre>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
