"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface RaymarchingSDFProps {
  /**
   * Shader code for the fragment shader (SDF raymarching logic)
   */
  fragmentShader?: string;
  /**
   * Width of canvas (default: "100%")
   */
  width?: string | number;
  /**
   * Height of canvas (default: "600px")
   */
  height?: string | number;
  /**
   * Enable mouse interaction (default: true)
   */
  enableMouse?: boolean;
  /**
   * Enable auto-rotation (default: true)
   */
  autoRotate?: boolean;
  /**
   * Auto-rotate speed (default: 0.5)
   */
  rotateSpeed?: number;
  /**
   * Custom uniforms to pass to shader
   */
  uniforms?: Record<string, any>;
  /**
   * Custom className
   */
  className?: string;
}

// Default raymarch fragment shader with SDF shapes
const DEFAULT_FRAGMENT_SHADER = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// SDF for sphere
float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}

// SDF for box
float sdBox(vec3 p, vec3 size) {
  vec3 d = abs(p) - size;
  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}

// SDF for torus
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

// Smooth minimum for blending shapes
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * h * k * (1.0 / 6.0);
}

// Rotation matrix
mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

// Scene definition using SDF
float map(vec3 p) {
  // Rotate based on time
  p.xz *= rot(u_time * 0.3);
  p.xy *= rot(u_time * 0.2);
  
  // Create multiple shapes
  float sphere1 = sdSphere(p - vec3(sin(u_time) * 0.5, 0.0, 0.0), 0.5);
  float sphere2 = sdSphere(p - vec3(-sin(u_time) * 0.5, 0.0, 0.0), 0.4);
  float box = sdBox(p, vec3(0.3));
  float torus = sdTorus(p, vec2(0.6, 0.15));
  
  // Blend shapes with smooth minimum
  float result = smin(sphere1, sphere2, 0.5);
  result = smin(result, box, 0.3);
  result = smin(result, torus, 0.4);
  
  return result;
}

// Calculate normal for lighting
vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

// Raymarching function
float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  for(int i = 0; i < 80; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if(d < 0.001 || t > 100.0) break;
    t += d;
  }
  return t;
}

void main() {
  // Normalized pixel coordinates
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  
  // Camera setup
  vec3 ro = vec3(0.0, 0.0, 3.0); // ray origin
  vec3 rd = normalize(vec3(uv, -1.0)); // ray direction
  
  // Apply mouse rotation
  float mouseX = (u_mouse.x / u_resolution.x - 0.5) * 3.14159;
  float mouseY = (u_mouse.y / u_resolution.y - 0.5) * 1.5;
  rd.xz *= rot(mouseX);
  rd.yz *= rot(mouseY);
  
  // Raymarch
  float t = raymarch(ro, rd);
  
  // Color
  vec3 col = vec3(0.0);
  
  if(t < 100.0) {
    vec3 p = ro + rd * t;
    vec3 normal = calcNormal(p);
    
    // Lighting
    vec3 lightPos = vec3(2.0, 3.0, 4.0);
    vec3 lightDir = normalize(lightPos - p);
    float diff = max(dot(normal, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, normal), -rd), 0.0), 32.0);
    
    // Colorful gradient based on position
    vec3 baseColor = 0.5 + 0.5 * cos(u_time + p.xzy + vec3(0, 2, 4));
    
    col = baseColor * diff + vec3(1.0) * spec * 0.5;
    
    // Ambient occlusion (fake)
    float ao = 1.0 - float(t) * 0.01;
    col *= ao;
  }
  
  // Add glow
  col += vec3(0.1, 0.2, 0.4) * exp(-t * 0.1);
  
  // Tone mapping
  col = col / (col + vec3(1.0));
  col = pow(col, vec3(0.4545)); // gamma correction
  
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERTEX_SHADER = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

/**
 * Raymarching / Signed Distance Functions (SDF)
 * 
 * Pure mathematical rendering with infinite resolution and liquid morphing.
 * No polygon meshes—just raymarching through SDF equations.
 * 
 * @example
 * ```tsx
 * <RaymarchingSDF />
 * ```
 */
export function RaymarchingSDF({
  fragmentShader = DEFAULT_FRAGMENT_SHADER,
  width = "100%",
  height = "600px",
  enableMouse = true,
  autoRotate = true,
  rotateSpeed = 0.5,
  uniforms = {},
  className = "",
}: RaymarchingSDFProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shader uniforms
    const shaderUniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(container.clientWidth / 2, container.clientHeight / 2) },
      ...uniforms,
    };

    // Create fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: fragmentShader,
      uniforms: shaderUniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouse) return;
      const rect = container.getBoundingClientRect();
      shaderUniforms.u_mouse.value.x = e.clientX - rect.left;
      shaderUniforms.u_mouse.value.y = container.clientHeight - (e.clientY - rect.top);
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (autoRotate) {
        shaderUniforms.u_time.value += 0.01 * rotateSpeed;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      shaderUniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    setIsReady(true);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [fragmentShader, enableMouse, autoRotate, rotateSpeed, uniforms]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white">
          Loading shader...
        </div>
      )}
    </div>
  );
}

/**
 * Preset: Morphing Spheres
 * Multiple spheres that blend together like liquid mercury
 */
export function RaymarchingMorphingSpheres({ className = "" }: { className?: string }) {
  return <RaymarchingSDF className={className} />;
}

/**
 * Preset: Fractal Landscape
 * Infinite fractal terrain using noise functions
 */
export function RaymarchingFractal({ className = "" }: { className?: string }) {
  const fractalShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    // Noise function
    float hash(float n) {
      return fract(sin(n) * 43758.5453);
    }

    float noise(vec3 x) {
      vec3 p = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      float n = p.x + p.y * 57.0 + 113.0 * p.z;
      return mix(
        mix(mix(hash(n+0.0), hash(n+1.0), f.x),
            mix(hash(n+57.0), hash(n+58.0), f.x), f.y),
        mix(mix(hash(n+113.0), hash(n+114.0), f.x),
            mix(hash(n+170.0), hash(n+171.0), f.x), f.y), f.z);
    }

    float fbm(vec3 p) {
      float f = 0.0;
      float a = 0.5;
      for(int i = 0; i < 5; i++) {
        f += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return f;
    }

    float map(vec3 p) {
      return p.y - fbm(p * 2.0 + u_time * 0.1) * 0.5;
    }

    vec3 calcNormal(vec3 p) {
      vec2 e = vec2(0.001, 0.0);
      return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
      ));
    }

    float raymarch(vec3 ro, vec3 rd) {
      float t = 0.0;
      for(int i = 0; i < 100; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        if(d < 0.001 || t > 100.0) break;
        t += d * 0.5;
      }
      return t;
    }

    mat2 rot(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
      
      vec3 ro = vec3(0.0, 2.0, u_time * 0.5);
      vec3 rd = normalize(vec3(uv, -1.0));
      
      float mouseX = (u_mouse.x / u_resolution.x - 0.5) * 3.14159;
      float mouseY = (u_mouse.y / u_resolution.y - 0.5) * 1.5;
      rd.xz *= rot(mouseX);
      rd.yz *= rot(mouseY);
      
      float t = raymarch(ro, rd);
      
      vec3 col = vec3(0.0);
      
      if(t < 100.0) {
        vec3 p = ro + rd * t;
        vec3 normal = calcNormal(p);
        
        vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
        float diff = max(dot(normal, lightDir), 0.0);
        
        vec3 baseColor = vec3(0.2, 0.4, 0.8) + 0.3 * cos(p.y * 2.0 + vec3(0, 2, 4));
        col = baseColor * diff;
        
        float fog = exp(-t * 0.05);
        col = mix(vec3(0.5, 0.7, 1.0), col, fog);
      } else {
        col = vec3(0.5, 0.7, 1.0);
      }
      
      col = pow(col, vec3(0.4545));
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return <RaymarchingSDF fragmentShader={fractalShader} className={className} />;
}

/**
 * Preset: Metaball Goop
 * Organic liquid blobs that merge smoothly
 */
export function RaymarchingMetaballs({ className = "" }: { className?: string }) {
  const metaballShader = `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    float sdSphere(vec3 p, float radius) {
      return length(p) - radius;
    }

    float smin(float a, float b, float k) {
      float h = max(k - abs(a - b), 0.0) / k;
      return min(a, b) - h * h * h * k * (1.0 / 6.0);
    }

    mat2 rot(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }

    float map(vec3 p) {
      p.xz *= rot(u_time * 0.2);
      
      float ball1 = sdSphere(p - vec3(sin(u_time) * 0.8, 0.0, 0.0), 0.4);
      float ball2 = sdSphere(p - vec3(-sin(u_time) * 0.8, 0.0, 0.0), 0.4);
      float ball3 = sdSphere(p - vec3(0.0, cos(u_time) * 0.8, 0.0), 0.35);
      float ball4 = sdSphere(p - vec3(0.0, -cos(u_time) * 0.8, 0.0), 0.35);
      
      float result = smin(ball1, ball2, 0.8);
      result = smin(result, ball3, 0.8);
      result = smin(result, ball4, 0.8);
      
      return result;
    }

    vec3 calcNormal(vec3 p) {
      vec2 e = vec2(0.001, 0.0);
      return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
      ));
    }

    float raymarch(vec3 ro, vec3 rd) {
      float t = 0.0;
      for(int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        if(d < 0.001 || t > 100.0) break;
        t += d;
      }
      return t;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
      
      vec3 ro = vec3(0.0, 0.0, 3.0);
      vec3 rd = normalize(vec3(uv, -1.0));
      
      float mouseX = (u_mouse.x / u_resolution.x - 0.5) * 3.14159;
      float mouseY = (u_mouse.y / u_resolution.y - 0.5) * 1.5;
      rd.xz *= rot(mouseX);
      rd.yz *= rot(mouseY);
      
      float t = raymarch(ro, rd);
      
      vec3 col = vec3(0.0);
      
      if(t < 100.0) {
        vec3 p = ro + rd * t;
        vec3 normal = calcNormal(p);
        
        vec3 lightPos = vec3(2.0, 3.0, 4.0);
        vec3 lightDir = normalize(lightPos - p);
        float diff = max(dot(normal, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, normal), -rd), 0.0), 64.0);
        
        // Metallic liquid look
        vec3 reflectDir = reflect(rd, normal);
        vec3 envColor = 0.5 + 0.5 * cos(u_time + reflectDir + vec3(0, 2, 4));
        
        col = envColor * 0.3 + vec3(0.8, 0.9, 1.0) * diff + vec3(1.0) * spec;
      }
      
      col += vec3(0.2, 0.3, 0.5) * exp(-t * 0.1);
      col = col / (col + vec3(1.0));
      col = pow(col, vec3(0.4545));
      
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return <RaymarchingSDF fragmentShader={metaballShader} className={className} />;
}
