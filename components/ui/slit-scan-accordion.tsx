"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface SlitScanAccordionProps {
  items: AccordionItem[];
  primaryColor?: string;
  secondaryColor?: string;
}

export function SlitScanAccordion({
  items,
  primaryColor = "#00ffff",
  secondaryColor = "#ff00ff",
}: SlitScanAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <SlitScanAccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </div>
  );
}

interface SlitScanAccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  primaryColor: string;
  secondaryColor: string;
}

function SlitScanAccordionItem({
  item,
  isOpen,
  onToggle,
  primaryColor,
  secondaryColor,
}: SlitScanAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const progressRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Vertex shader
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader with slit-scan effect
  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    uniform float u_progress;
    
    void main() {
      vec2 uv = v_texCoord;
      
      // Slit-scan effect: stretch UVs vertically based on inverse progress
      float stretch = 1.0 - u_progress;
      float stretchFactor = 1.0 + stretch * 50.0;
      
      // Calculate stretched UV
      float centerY = 0.5;
      float offsetY = (uv.y - centerY) * stretchFactor;
      float newY = centerY + offsetY;
      
      // Add scanline glitch effect
      float scanline = sin(uv.y * 100.0 + u_progress * 10.0) * 0.01 * (1.0 - u_progress);
      newY += scanline;
      
      // Clamp to valid range
      newY = clamp(newY, 0.0, 1.0);
      
      vec2 stretchedUV = vec2(uv.x, newY);
      
      // Sample texture
      vec4 color = texture2D(u_texture, stretchedUV);
      
      // Add chromatic aberration during stretch
      if (stretch > 0.1) {
        float aberration = stretch * 0.02;
        float r = texture2D(u_texture, stretchedUV + vec2(aberration, 0.0)).r;
        float g = texture2D(u_texture, stretchedUV).g;
        float b = texture2D(u_texture, stretchedUV - vec2(aberration, 0.0)).b;
        color = vec4(r, g, b, color.a);
      }
      
      // Fade in as progress increases
      color.a *= u_progress;
      
      gl_FragColor = color;
    }
  `;

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    programRef.current = program;

    // Setup geometry (full-screen quad)
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);

    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

    // Position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // TexCoord buffer
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Create texture
    const texture = gl.createTexture();
    textureRef.current = texture;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }, []);

  // Handle open/close animation
  useEffect(() => {
    if (!contentRef.current || !containerRef.current || !canvasRef.current)
      return;

    const content = contentRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (isOpen) {
      // Measure content height
      content.style.display = "block";
      content.style.visibility = "hidden";
      const height = content.scrollHeight;
      content.style.visibility = "";
      content.style.display = "none";

      // Set canvas size
      canvas.width = container.offsetWidth;
      canvas.height = height;

      // Capture content as texture
      captureContentAsTexture();

      // Animate container height
      gsap.to(container, {
        height: height,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate slit-scan effect
      gsap.to(progressRef, {
        current: 1,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          renderWebGL();
        },
        onComplete: () => {
          // Show actual content after animation
          if (canvasRef.current) canvasRef.current.style.opacity = "0";
          if (contentRef.current) {
            contentRef.current.style.display = "block";
            contentRef.current.style.opacity = "1";
          }
        },
      });

      // Start rendering
      canvas.style.opacity = "1";
      content.style.display = "none";
    } else {
      // Close animation
      gsap.to(container, {
        height: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      gsap.to(progressRef, {
        current: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      if (contentRef.current) {
        contentRef.current.style.display = "none";
        contentRef.current.style.opacity = "0";
      }
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "0";
      }
    }
  }, [isOpen]);

  // Capture content as WebGL texture
  const captureContentAsTexture = () => {
    if (
      !contentRef.current ||
      !glRef.current ||
      !textureRef.current ||
      !canvasRef.current
    )
      return;

    const content = contentRef.current;
    const gl = glRef.current;

    // Temporarily show content to render it
    content.style.display = "block";
    content.style.position = "absolute";
    content.style.visibility = "hidden";

    // Use html2canvas alternative: render to offscreen canvas
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvasRef.current.width;
    offscreenCanvas.height = canvasRef.current.height;
    const ctx = offscreenCanvas.getContext("2d");

    if (ctx) {
      // Fill background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      // Draw text content
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px sans-serif";

      const text = content.textContent || "";
      const words = text.split(" ");
      let line = "";
      let y = 30;
      const lineHeight = 24;
      const maxWidth = offscreenCanvas.width - 40;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, 20, y);
          line = words[i] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 20, y);

      // Upload to WebGL texture
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        offscreenCanvas
      );
    }

    content.style.display = "none";
    content.style.position = "";
    content.style.visibility = "";
  };

  // Render WebGL frame
  const renderWebGL = () => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set progress uniform
    const progressLocation = gl.getUniformLocation(program, "u_progress");
    gl.uniform1f(progressLocation, progressRef.current);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  return (
    <div
      className="rounded-xl overflow-hidden border transition-all duration-300"
      style={{
        borderColor: isOpen ? primaryColor : "rgba(255, 255, 255, 0.1)",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Question header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
      >
        <span className="text-lg font-semibold text-white">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: primaryColor }}
        />
      </button>

      {/* Content container */}
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        style={{ height: 0 }}
      >
        {/* WebGL Canvas for slit-scan effect */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Actual content (hidden during animation) */}
        <div
          ref={contentRef}
          className="px-6 py-4 text-gray-300 leading-relaxed transition-opacity duration-300"
          style={{ display: "none", opacity: 0 }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}
