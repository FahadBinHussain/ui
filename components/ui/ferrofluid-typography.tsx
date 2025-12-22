"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// Simplex noise implementation
class SimplexNoise {
  private grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  ];
  private p: number[] = [];
  private perm: number[] = [];

  constructor() {
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  private dot(g: number[], x: number, y: number, z: number) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  noise3d(xin: number, yin: number, zin: number): number {
    let n0, n1, n2, n3;
    const F3 = 1.0 / 3.0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const G3 = 1.0 / 6.0;
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;

    let i1, j1, k1;
    let i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0.0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0.0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0.0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0.0;
    else {
      t3 *= t3;
      n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
    }
    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

const simplex = new SimplexNoise();

// Ferrofluid shader material
const FerrofluidShader = {
  vertexShader: `
    uniform vec3 uMouse;
    uniform float uTime;
    uniform float uStrength;
    uniform float uRadius;
    uniform float uNoiseScale;
    uniform float uNoiseStrength;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;
    
    // Simplex noise function (simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vPosition = worldPosition.xyz;
      
      // Calculate distance to mouse
      float dist = distance(worldPosition.xyz, uMouse);
      float influence = smoothstep(uRadius, 0.0, dist);
      
      // Direction to mouse
      vec3 direction = normalize(uMouse - worldPosition.xyz);
      
      // Add noise for organic effect
      float noise = snoise(worldPosition.xyz * uNoiseScale + uTime * 0.5);
      noise = noise * 0.5 + 0.5; // Remap to 0-1
      
      // Spike displacement
      float displacement = influence * uStrength * (1.0 + noise * uNoiseStrength);
      vDisplacement = displacement;
      
      // Displace along normal for spike effect
      vec3 newPosition = position + normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uSpikeColor;
    uniform float uMetalness;
    uniform float uRoughness;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;
    
    void main() {
      // Lighting
      vec3 lightDir = normalize(vec3(5.0, 5.0, 10.0) - vPosition);
      float diff = max(dot(vNormal, lightDir), 0.0);
      
      // Specular
      vec3 viewDir = normalize(cameraPosition - vPosition);
      vec3 reflectDir = reflect(-lightDir, vNormal);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
      
      // Mix base color with spike color based on displacement
      vec3 color = mix(uColor, uSpikeColor, smoothstep(0.0, 0.5, vDisplacement));
      
      // Apply lighting
      vec3 ambient = color * 0.3;
      vec3 diffuse = color * diff * 0.7;
      vec3 specular = vec3(1.0) * spec * uMetalness;
      
      vec3 finalColor = ambient + diffuse + specular;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

interface FerrofluidTextProps {
  text: string;
  font?: string;
  size?: number;
  strength?: number;
  radius?: number;
  noiseScale?: number;
  noiseStrength?: number;
  color?: string;
  spikeColor?: string;
  metalness?: number;
  roughness?: number;
}

function FerrofluidText({
  text,
  font = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
  size = 1,
  strength = 0.5,
  radius = 2,
  noiseScale = 2,
  noiseStrength = 0.5,
  color = "#1a1a2e",
  spikeColor = "#16213e",
  metalness = 0.8,
  roughness = 0.2,
}: FerrofluidTextProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef(new THREE.Vector3(0, 0, 5));
  const { camera, raycaster, size: canvasSize } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector3(0, 0, 5) },
      uTime: { value: 0 },
      uStrength: { value: strength },
      uRadius: { value: radius },
      uNoiseScale: { value: noiseScale },
      uNoiseStrength: { value: noiseStrength },
      uColor: { value: new THREE.Color(color) },
      uSpikeColor: { value: new THREE.Color(spikeColor) },
      uMetalness: { value: metalness },
      uRoughness: { value: roughness },
    }),
    []
  );
  
  // Update uniforms when props change
  React.useEffect(() => {
    uniforms.uStrength.value = strength;
    uniforms.uRadius.value = radius;
    uniforms.uNoiseScale.value = noiseScale;
    uniforms.uNoiseStrength.value = noiseStrength;
    uniforms.uColor.value.set(color);
    uniforms.uSpikeColor.value.set(spikeColor);
    uniforms.uMetalness.value = metalness;
    uniforms.uRoughness.value = roughness;
  }, [uniforms, strength, radius, noiseScale, noiseStrength, color, spikeColor, metalness, roughness]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Update time
      uniforms.uTime.value = state.clock.elapsedTime;
      
      // Update mouse position in 3D space
      uniforms.uMouse.value.copy(mousePos.current);
    }
  });
  
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update raycaster
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      
      // Create a plane at z=0 to raycast against
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersect);
      
      if (intersect) {
        mousePos.current.copy(intersect);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, raycaster]);
  
  return (
    <Center>
      <Text3D
        ref={meshRef}
        font={font}
        size={size}
        height={0.2}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={8}
      >
        {text}
        <shaderMaterial
          vertexShader={FerrofluidShader.vertexShader}
          fragmentShader={FerrofluidShader.fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </Text3D>
    </Center>
  );
}

interface FerrofluidMagneticTypographyProps {
  text?: string;
  font?: string;
  size?: number;
  strength?: number;
  radius?: number;
  noiseScale?: number;
  noiseStrength?: number;
  color?: string;
  spikeColor?: string;
  metalness?: number;
  roughness?: number;
  backgroundColor?: string;
  className?: string;
}

export function FerrofluidMagneticTypography({
  text = "FERROFLUID",
  font,
  size = 1,
  strength = 0.5,
  radius = 2,
  noiseScale = 2,
  noiseStrength = 0.5,
  color = "#1a1a2e",
  spikeColor = "#16213e",
  metalness = 0.8,
  roughness = 0.2,
  backgroundColor = "#0a0a0f",
  className = "",
}: FerrofluidMagneticTypographyProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ backgroundColor }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0066ff" />
        
        <FerrofluidText
          text={text}
          font={font}
          size={size}
          strength={strength}
          radius={radius}
          noiseScale={noiseScale}
          noiseStrength={noiseStrength}
          color={color}
          spikeColor={spikeColor}
          metalness={metalness}
          roughness={roughness}
        />
      </Canvas>
    </div>
  );
}

export default FerrofluidMagneticTypography;
