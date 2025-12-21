"use client";

import React, { useRef, useEffect } from "react";

interface VideoTextMaskingProps {
  text: string;
  videoSrc: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string;
}

// Simple wrapper that uses CanvasVideoTextMask (the real implementation)
export const VideoTextMasking: React.FC<VideoTextMaskingProps> = (props) => {
  return <CanvasVideoTextMask {...props} />;
};

interface SVGVideoTextMaskProps {
  text: string;
  videoSrc: string;
  className?: string;
}

export const SVGVideoTextMask: React.FC<SVGVideoTextMaskProps> = ({
  text,
  videoSrc,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 1200 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="textMask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="120"
              fontWeight="900"
              fill="white"
            >
              {text}
            </text>
          </mask>
        </defs>

        <foreignObject width="100%" height="100%" mask="url(#textMask)">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </foreignObject>
      </svg>
    </div>
  );
};

interface CanvasVideoTextMaskProps {
  text: string;
  videoSrc: string;
  className?: string;
}

export const CanvasVideoTextMask: React.FC<CanvasVideoTextMaskProps> = ({
  text,
  videoSrc,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    video.play().catch(() => {});

    const draw = () => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Draw video
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Set composite operation
        ctx.globalCompositeOperation = "destination-in";

        // Draw text mask
        ctx.font = "900 120px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // Reset composite operation
        ctx.globalCompositeOperation = "source-over";
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    video.addEventListener("loadeddata", draw);
    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, videoSrc]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-64 bg-black"
      />
    </div>
  );
};

interface HeroVideoTextProps {
  text: string;
  videoSrc: string;
  subtitle?: string;
  className?: string;
}

export const HeroVideoText: React.FC<HeroVideoTextProps> = ({
  text,
  videoSrc,
  subtitle,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Use SVG Mask for the hero text */}
        <svg
          width="100%"
          height="400"
          viewBox="0 0 1200 400"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full"
        >
          <defs>
            <mask id={`hero-text-mask-${text}`}>
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="200"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {text}
              </text>
            </mask>
          </defs>

          <foreignObject
            width="100%"
            height="100%"
            mask={`url(#hero-text-mask-${text})`}
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </foreignObject>
        </svg>

        {subtitle && (
          <p className="mt-8 text-2xl text-slate-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
