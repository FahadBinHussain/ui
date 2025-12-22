"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ReactionDiffusionProps {
  width?: number;
  height?: number;
  feedRate?: number;
  killRate?: number;
  diffusionRateA?: number;
  diffusionRateB?: number;
  className?: string;
  autoPlay?: boolean;
}

export const ReactionDiffusion: React.FC<ReactionDiffusionProps> = ({
  width = 800,
  height = 600,
  feedRate = 0.055,
  killRate = 0.062,
  diffusionRateA = 1.0,
  diffusionRateB = 0.5,
  className,
  autoPlay = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<{
    gl: WebGLRenderingContext;
    programs: { render: WebGLProgram; compute: WebGLProgram };
    buffers: { front: WebGLFramebuffer; back: WebGLFramebuffer };
    textures: { front: WebGLTexture; back: WebGLTexture };
  } | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1, y: -1, isDown: false });
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { 
      preserveDrawingBuffer: true,
      antialias: false 
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    canvas.width = width;
    canvas.height = height;

    // Check for float texture support
    const floatExt = gl.getExtension("OES_texture_float");
    const floatLinearExt = gl.getExtension("OES_texture_float_linear");
    if (!floatExt) {
      console.error("Float textures not supported");
      return;
    }

    // Vertex shader (shared)
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader for computing reaction-diffusion
    const computeShaderSource = `
      precision highp float;
      
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_feed;
      uniform float u_kill;
      uniform float u_dA;
      uniform float u_dB;
      uniform vec2 u_mouse;
      uniform bool u_mouseDown;
      
      varying vec2 v_uv;
      
      void main() {
        vec2 pixel = 1.0 / u_resolution;
        
        // Sample current state
        vec2 state = texture2D(u_texture, v_uv).rg;
        float a = state.r;
        float b = state.g;
        
        // Laplacian (discrete diffusion operator)
        vec2 laplacian = vec2(0.0);
        laplacian += texture2D(u_texture, v_uv + vec2(-pixel.x, 0.0)).rg * 0.2;
        laplacian += texture2D(u_texture, v_uv + vec2(pixel.x, 0.0)).rg * 0.2;
        laplacian += texture2D(u_texture, v_uv + vec2(0.0, -pixel.y)).rg * 0.2;
        laplacian += texture2D(u_texture, v_uv + vec2(0.0, pixel.y)).rg * 0.2;
        laplacian += texture2D(u_texture, v_uv + vec2(-pixel.x, -pixel.y)).rg * 0.05;
        laplacian += texture2D(u_texture, v_uv + vec2(pixel.x, -pixel.y)).rg * 0.05;
        laplacian += texture2D(u_texture, v_uv + vec2(-pixel.x, pixel.y)).rg * 0.05;
        laplacian += texture2D(u_texture, v_uv + vec2(pixel.x, pixel.y)).rg * 0.05;
        laplacian -= state * 1.0;
        
        // Gray-Scott reaction-diffusion equations
        float reaction = a * b * b;
        float da = u_dA * laplacian.r - reaction + u_feed * (1.0 - a);
        float db = u_dB * laplacian.g + reaction - (u_kill + u_feed) * b;
        
        // Update state
        a += da;
        b += db;
        
        // Mouse interaction - add chemical B
        if (u_mouseDown) {
          float dist = distance(v_uv * u_resolution, u_mouse);
          if (dist < 30.0) {
            b += 0.5 * (1.0 - dist / 30.0);
          }
        }
        
        // Clamp values
        a = clamp(a, 0.0, 1.0);
        b = clamp(b, 0.0, 1.0);
        
        gl_FragColor = vec4(a, b, 0.0, 1.0);
      }
    `;

    // Fragment shader for rendering
    const renderShaderSource = `
      precision highp float;
      
      uniform sampler2D u_texture;
      varying vec2 v_uv;
      
      void main() {
        vec2 state = texture2D(u_texture, v_uv).rg;
        float a = state.r;
        float b = state.g;
        
        // Color mapping
        vec3 color = vec3(0.0);
        
        // Create gradient based on concentration
        float value = b - a;
        
        // Cyan to purple gradient
        if (value > 0.0) {
          color = mix(
            vec3(0.1, 0.8, 0.9), // Cyan
            vec3(0.6, 0.2, 0.9), // Purple
            smoothstep(0.0, 0.5, value)
          );
        } else {
          color = vec3(0.05, 0.05, 0.15); // Dark blue background
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Helper to compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Helper to create program
    const createProgram = (vertSource: string, fragSource: string) => {
      const vertShader = compileShader(vertSource, gl.VERTEX_SHADER);
      const fragShader = compileShader(fragSource, gl.FRAGMENT_SHADER);
      if (!vertShader || !fragShader) return null;

      const program = gl.createProgram();
      if (!program) return null;

      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return null;
      }

      return program;
    };

    // Create programs
    const computeProgram = createProgram(vertexShaderSource, computeShaderSource);
    const renderProgram = createProgram(vertexShaderSource, renderShaderSource);

    if (!computeProgram || !renderProgram) {
      console.error("Failed to create shader programs");
      return;
    }

    // Create full-screen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Create textures for ping-pong buffering
    const createTexture = () => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Initialize with pattern
      const data = new Float32Array(width * height * 4);
      for (let i = 0; i < width * height; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        const centerX = width / 2;
        const centerY = height / 2;
        const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        // Initialize A to 1, B to small random values near center
        data[i * 4] = 1.0; // A
        data[i * 4 + 1] = dist < 50 ? Math.random() * 0.5 : 0.0; // B
        data[i * 4 + 2] = 0.0;
        data[i * 4 + 3] = 1.0;
      }

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.FLOAT,
        data
      );

      return texture;
    };

    const frontTexture = createTexture();
    const backTexture = createTexture();

    // Create framebuffers
    const createFramebuffer = (texture: WebGLTexture) => {
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      return fbo;
    };

    const frontFBO = createFramebuffer(frontTexture);
    const backFBO = createFramebuffer(backTexture);

    // Store WebGL context
    webglRef.current = {
      gl,
      programs: { render: renderProgram, compute: computeProgram },
      buffers: { front: frontFBO!, back: backFBO! },
      textures: { front: frontTexture!, back: backTexture! },
    };

    // Animation loop
    const animate = () => {
      if (!webglRef.current) return;

      const { gl, programs, buffers, textures } = webglRef.current;

      // Compute step (ping-pong)
      gl.useProgram(programs.compute);
      gl.bindFramebuffer(gl.FRAMEBUFFER, buffers.back);
      gl.viewport(0, 0, width, height);

      // Set uniforms
      const computeLocs = {
        position: gl.getAttribLocation(programs.compute, "a_position"),
        texture: gl.getUniformLocation(programs.compute, "u_texture"),
        resolution: gl.getUniformLocation(programs.compute, "u_resolution"),
        feed: gl.getUniformLocation(programs.compute, "u_feed"),
        kill: gl.getUniformLocation(programs.compute, "u_kill"),
        dA: gl.getUniformLocation(programs.compute, "u_dA"),
        dB: gl.getUniformLocation(programs.compute, "u_dB"),
        mouse: gl.getUniformLocation(programs.compute, "u_mouse"),
        mouseDown: gl.getUniformLocation(programs.compute, "u_mouseDown"),
      };

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(computeLocs.position);
      gl.vertexAttribPointer(computeLocs.position, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures.front);
      gl.uniform1i(computeLocs.texture, 0);
      gl.uniform2f(computeLocs.resolution, width, height);
      gl.uniform1f(computeLocs.feed, feedRate);
      gl.uniform1f(computeLocs.kill, killRate);
      gl.uniform1f(computeLocs.dA, diffusionRateA);
      gl.uniform1f(computeLocs.dB, diffusionRateB);
      gl.uniform2f(computeLocs.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1i(computeLocs.mouseDown, mouseRef.current.isDown ? 1 : 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Render step
      gl.useProgram(programs.render);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      const renderLocs = {
        position: gl.getAttribLocation(programs.render, "a_position"),
        texture: gl.getUniformLocation(programs.render, "u_texture"),
      };

      gl.enableVertexAttribArray(renderLocs.position);
      gl.vertexAttribPointer(renderLocs.position, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures.back);
      gl.uniform1i(renderLocs.texture, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Swap textures and framebuffers
      const tempTexture = textures.front;
      textures.front = textures.back;
      textures.back = tempTexture;

      const tempFBO = buffers.front;
      buffers.front = buffers.back;
      buffers.back = tempFBO;

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, feedRate, killRate, diffusionRateA, diffusionRateB, isPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = height - (e.clientY - rect.top); // Flip Y
  };

  const handleMouseDown = () => {
    mouseRef.current.isDown = true;
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isDown = false;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="rounded-lg cursor-crosshair"
        style={{ width, height }}
      />
      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 px-4 py-2 bg-cyan-500/80 hover:bg-cyan-400 text-white rounded-lg backdrop-blur-sm transition-colors"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};
