"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Gaussian Splat Loader (flexible version)
class GaussianSplatLoader {
  load(url: string, onLoad: (geometry: THREE.BufferGeometry) => void, onProgress?: (event: ProgressEvent) => void, onError?: (error: any) => void) {
    const loader = new THREE.FileLoader();
    loader.setResponseType('arraybuffer');
    
    loader.load(
      url,
      (data) => {
        try {
          const geometry = this.parse(data as ArrayBuffer);
          onLoad(geometry);
        } catch (error) {
          console.error('Parse error:', error);
          if (onError) onError(error);
        }
      },
      onProgress,
      onError
    );
  }

  parse(buffer: ArrayBuffer): THREE.BufferGeometry {
    // Check buffer size
    if (buffer.byteLength === 0) {
      throw new Error('Empty buffer');
    }

    // Try to detect format
    // Standard .splat format: each splat is typically 44 bytes
    // But let's be flexible and check multiple formats
    
    let rowLength = 44; // Default: 3*4 (pos) + 3*4 (scale) + 4 (rgba) + 4*4 (quat) = 44
    
    // Check if it divides evenly
    if (buffer.byteLength % rowLength !== 0) {
      // Try alternative format: 32 bytes (some splat formats)
      rowLength = 32;
      if (buffer.byteLength % rowLength !== 0) {
        // Try 48 bytes
        rowLength = 48;
        if (buffer.byteLength % rowLength !== 0) {
          throw new Error(`Buffer size ${buffer.byteLength} doesn't match expected splat formats`);
        }
      }
    }
    
    const vertexCount = Math.floor(buffer.byteLength / rowLength);
    
    if (vertexCount === 0) {
      throw new Error('No vertices found in buffer');
    }
    
    console.log(`Loading ${vertexCount} splats with ${rowLength} bytes per splat`);
    
    const positions = new Float32Array(vertexCount * 3);
    const colors = new Float32Array(vertexCount * 4);
    const scales = new Float32Array(vertexCount * 3);
    
    const dataView = new DataView(buffer);
    
    try {
      for (let i = 0; i < vertexCount; i++) {
        const offset = i * rowLength;
        
        // Check if we're within bounds
        if (offset + 24 > buffer.byteLength) {
          console.warn(`Stopping at splat ${i} due to buffer bounds`);
          break;
        }
        
        // Position (always first 12 bytes)
        positions[i * 3] = dataView.getFloat32(offset, true);
        positions[i * 3 + 1] = dataView.getFloat32(offset + 4, true);
        positions[i * 3 + 2] = dataView.getFloat32(offset + 8, true);
        
        // Scale (next 12 bytes) - default to 0.1 if not available
        if (offset + 20 <= buffer.byteLength) {
          scales[i * 3] = Math.abs(dataView.getFloat32(offset + 12, true)) || 0.1;
          scales[i * 3 + 1] = Math.abs(dataView.getFloat32(offset + 16, true)) || 0.1;
          scales[i * 3 + 2] = Math.abs(dataView.getFloat32(offset + 20, true)) || 0.1;
        } else {
          scales[i * 3] = 0.1;
          scales[i * 3 + 1] = 0.1;
          scales[i * 3 + 2] = 0.1;
        }
        
        // Color (RGBA - 4 bytes)
        if (offset + 27 <= buffer.byteLength) {
          colors[i * 4] = dataView.getUint8(offset + 24) / 255;
          colors[i * 4 + 1] = dataView.getUint8(offset + 25) / 255;
          colors[i * 4 + 2] = dataView.getUint8(offset + 26) / 255;
          colors[i * 4 + 3] = dataView.getUint8(offset + 27) / 255;
        } else {
          // Default color: white
          colors[i * 4] = 1.0;
          colors[i * 4 + 1] = 1.0;
          colors[i * 4 + 2] = 1.0;
          colors[i * 4 + 3] = 1.0;
        }
      }
    } catch (error) {
      console.error('Error parsing splat data:', error);
      throw error;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 3));
    
    return geometry;
  }
}

// Custom shader for Gaussian Splatting
const GaussianSplatMaterial = {
  vertexShader: `
    attribute vec3 scale;
    attribute vec4 color;
    
    varying vec4 vColor;
    varying vec2 vUv;
    
    void main() {
      vColor = color;
      vUv = position.xy;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation for splats based on scale and distance
      float avgScale = (scale.x + scale.y + scale.z) / 3.0;
      gl_PointSize = max(2.0, 50.0 * avgScale / -mvPosition.z);
    }
  `,
  
  fragmentShader: `
    varying vec4 vColor;
    varying vec2 vUv;
    
    void main() {
      // Circular gaussian falloff
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float dist = dot(cxy, cxy);
      
      if (dist > 1.0) discard;
      
      float gaussian = exp(-dist * 4.0);
      
      gl_FragColor = vec4(vColor.rgb, vColor.a * gaussian);
    }
  `,
};

interface GaussianSplatMeshProps {
  url: string;
  scale?: number;
  onLoad?: () => void;
}

function GaussianSplatMesh({ url, scale = 1, onLoad }: GaussianSplatMeshProps) {
  const meshRef = useRef<THREE.Points>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loader = new GaussianSplatLoader();
    
    loader.load(
      url,
      (loadedGeometry) => {
        setGeometry(loadedGeometry);
        setLoading(false);
        if (onLoad) onLoad();
      },
      undefined,
      (err) => {
        console.error('Error loading splat:', err);
        setError('Failed to load splat file');
        setLoading(false);
      }
    );
  }, [url, onLoad]);
  
  const material = new THREE.ShaderMaterial({
    vertexShader: GaussianSplatMaterial.vertexShader,
    fragmentShader: GaussianSplatMaterial.fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.NormalBlending,
  });
  
  if (loading || error || !geometry) return null;
  
  return (
    <points ref={meshRef} geometry={geometry} material={material} scale={scale}>
      {/* Geometry and material are set via refs */}
    </points>
  );
}

interface MouseControlledCameraProps {
  children?: React.ReactNode;
  sensitivity?: number;
  distance?: number;
  enableRotation?: boolean;
}

function MouseControlledCamera({ 
  children, 
  sensitivity = 2,
  distance = 5,
  enableRotation = true 
}: MouseControlledCameraProps) {
  const { camera } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!enableRotation) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableRotation]);
  
  useFrame(() => {
    if (enableRotation) {
      const targetX = mousePos.y * sensitivity * 0.3;
      const targetY = mousePos.x * sensitivity * 0.5;
      
      camera.position.x += (Math.sin(targetY) * distance - camera.position.x) * 0.05;
      camera.position.y += (targetX * 2 - camera.position.y) * 0.05;
      camera.position.z += (Math.cos(targetY) * distance - camera.position.z) * 0.05;
      
      camera.lookAt(0, 0, 0);
    }
  });
  
  return <>{children}</>;
}

interface GaussianSplattingProps {
  splatUrl?: string;
  scale?: number;
  cameraDistance?: number;
  cameraSensitivity?: number;
  enableMouseControl?: boolean;
  enableOrbitControls?: boolean;
  backgroundColor?: string;
  showGrid?: boolean;
  className?: string;
}

export function GaussianSplatting({
  splatUrl = "/cluster fly S.splat",
  scale = 1,
  cameraDistance = 5,
  cameraSensitivity = 2,
  enableMouseControl = true,
  enableOrbitControls = false,
  backgroundColor = "#000000",
  showGrid = false,
  className = "",
}: GaussianSplattingProps) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`w-full h-full ${className}`} style={{ backgroundColor }}>
      <Canvas camera={{ position: [0, 0, cameraDistance], fov: 75 }}>
        <Suspense fallback={null}>
          {enableMouseControl && !enableOrbitControls && (
            <MouseControlledCamera 
              sensitivity={cameraSensitivity} 
              distance={cameraDistance}
              enableRotation={!loaded ? false : true}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              
              {showGrid && <gridHelper args={[10, 10]} />}
              
              <GaussianSplatMesh 
                url={splatUrl} 
                scale={scale}
                onLoad={() => setLoaded(true)}
              />
            </MouseControlledCamera>
          )}
          
          {enableOrbitControls && (
            <>
              <OrbitControls 
                enableDamping
                dampingFactor={0.05}
                minDistance={2}
                maxDistance={10}
              />
              
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              
              {showGrid && <gridHelper args={[10, 10]} />}
              
              <GaussianSplatMesh 
                url={splatUrl} 
                scale={scale}
                onLoad={() => setLoaded(true)}
              />
            </>
          )}
        </Suspense>
      </Canvas>
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">Loading Gaussian Splat...</div>
        </div>
      )}
    </div>
  );
}

export default GaussianSplatting;
