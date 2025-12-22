"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber";
import { OrthographicCamera, useFBO, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Custom shader material for refraction glass
const GlassRefractionMaterial = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  
  fragmentShader: `
    uniform sampler2D uBackgroundTexture;
    uniform float uRefractionStrength;
    uniform float uThickness;
    uniform float uIOR;
    uniform float uSpecularIntensity;
    uniform float uRoughness;
    uniform vec3 uTint;
    uniform float uOpacity;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    // Fresnel calculation
    float fresnel(vec3 viewDir, vec3 normal, float power) {
      return pow(1.0 - max(0.0, dot(viewDir, normal)), power);
    }
    
    // PBR specular
    float specularPBR(vec3 lightDir, vec3 viewDir, vec3 normal, float roughness) {
      vec3 halfDir = normalize(lightDir + viewDir);
      float NdotH = max(dot(normal, halfDir), 0.0);
      float alpha = roughness * roughness;
      float alpha2 = alpha * alpha;
      float denom = (NdotH * NdotH * (alpha2 - 1.0) + 1.0);
      return alpha2 / (3.14159265359 * denom * denom);
    }
    
    void main() {
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      
      // Calculate refraction offset based on normal and thickness
      vec2 refractionOffset = normal.xy * uRefractionStrength * uThickness;
      
      // Add IOR-based refraction
      float fresnelValue = fresnel(viewDir, normal, 3.0);
      vec3 refractDir = refract(-viewDir, normal, 1.0 / uIOR);
      refractionOffset += refractDir.xy * uRefractionStrength * 0.5;
      
      // Sample background texture with distorted UVs
      vec2 screenUV = gl_FragCoord.xy / uResolution;
      vec2 refractedUV = screenUV + refractionOffset;
      
      // Clamp UVs to prevent edge artifacts
      refractedUV = clamp(refractedUV, 0.01, 0.99);
      
      vec4 refractedColor = texture2D(uBackgroundTexture, refractedUV);
      
      // Apply glass tint
      refractedColor.rgb *= uTint;
      
      // Add PBR specular highlights
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
      float specular = specularPBR(lightDir, viewDir, normal, uRoughness);
      specular *= uSpecularIntensity * fresnelValue;
      
      // Combine refraction and specular
      vec3 finalColor = refractedColor.rgb + vec3(specular);
      
      // Add fresnel rim lighting
      float rim = fresnelValue * 0.3;
      finalColor += vec3(rim);
      
      gl_FragColor = vec4(finalColor, uOpacity);
    }
  `,
};

interface GlassLayerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  refractionStrength?: number;
  thickness?: number;
  ior?: number;
  specularIntensity?: number;
  roughness?: number;
  tint?: [number, number, number];
  opacity?: number;
  geometry?: "plane" | "sphere" | "box" | "torus";
}

interface GlassmorphismRefractionSceneProps {
  backgroundElements: React.ReactNode;
  glassLayers: GlassLayerProps[];
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

function GlassLayerWithRef({
  index,
  onRef,
  ...props
}: GlassLayerProps & { index: number; onRef: (ref: THREE.Mesh | null, index: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, gl, scene, camera } = useThree();
  
  // Create FBO for background rendering
  const fbo = useFBO(size.width, size.height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
  });
  
  const {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    refractionStrength = 0.1,
    thickness = 0.5,
    ior = 1.45,
    specularIntensity = 1.0,
    roughness = 0.1,
    tint = [1, 1, 1],
    opacity = 0.9,
    geometry = "plane",
  } = props;
  
  const uniforms = useMemo(
    () => ({
      uBackgroundTexture: { value: fbo.texture },
      uRefractionStrength: { value: refractionStrength },
      uThickness: { value: thickness },
      uIOR: { value: ior },
      uSpecularIntensity: { value: specularIntensity },
      uRoughness: { value: roughness },
      uTint: { value: new THREE.Vector3(...tint) },
      uOpacity: { value: opacity },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [refractionStrength, thickness, ior, specularIntensity, roughness, tint, opacity, size, fbo.texture]
  );
  
  React.useEffect(() => {
    onRef(meshRef.current, index);
  }, [onRef, index]);
  
  // Update resolution on resize and add rotation animation
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
    
    // Auto-rotate glass if not plane geometry
    if (meshRef.current && geometry !== "plane") {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * (index + 1);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });
  
  // Render geometry based on type
  const renderGeometry = () => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[1, 64, 64]} />;
      case "box":
        return <boxGeometry args={[1, 1, 1, 32, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 32, 100]} />;
      default:
        return <planeGeometry args={[1, 1, 64, 64]} />;
    }
  };
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {renderGeometry()}
      <shaderMaterial
        ref={materialRef}
        vertexShader={GlassRefractionMaterial.vertexShader}
        fragmentShader={GlassRefractionMaterial.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GlassmorphismRefractionScene({
  backgroundElements,
  glassLayers,
  cameraPosition = [0, 0, 5],
  cameraFov = 75,
}: GlassmorphismRefractionSceneProps) {
  const { gl, scene, camera, size } = useThree();
  const glassRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  // Create FBO for background
  const backgroundFBO = useFBO(size.width, size.height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
  });
  
  // Create scene for background elements
  const backgroundScene = useMemo(() => new THREE.Scene(), []);
  
  const handleRef = (ref: THREE.Mesh | null, index: number) => {
    glassRefs.current[index] = ref;
  };
  
  useFrame(() => {
    // Hide glass layers
    glassRefs.current.forEach((mesh) => {
      if (mesh) mesh.visible = false;
    });
    
    // Render background to FBO
    gl.setRenderTarget(backgroundFBO);
    gl.render(backgroundScene, camera);
    gl.setRenderTarget(null);
    
    // Show glass layers and update their textures
    glassRefs.current.forEach((mesh) => {
      if (mesh) {
        mesh.visible = true;
        const material = mesh.material as THREE.ShaderMaterial;
        if (material.uniforms) {
          material.uniforms.uBackgroundTexture.value = backgroundFBO.texture;
        }
      }
    });
  });
  
  return (
    <>
      {/* Render background elements to separate scene */}
      {createPortal(backgroundElements, backgroundScene)}
      
      {/* Render glass layers in main scene */}
      {glassLayers.map((props, index) => (
        <GlassLayerWithRef key={index} index={index} onRef={handleRef} {...props} />
      ))}
    </>
  );
}

interface GlassmorphismRefractionProps {
  backgroundElements: React.ReactNode;
  glassLayers: GlassLayerProps[];
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  className?: string;
}

export function GlassmorphismRefraction({
  backgroundElements,
  glassLayers,
  cameraPosition = [0, 0, 5],
  cameraFov = 75,
  className = "",
}: GlassmorphismRefractionProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: cameraPosition, fov: cameraFov }}>
        <GlassmorphismRefractionScene
          backgroundElements={backgroundElements}
          glassLayers={glassLayers}
          cameraPosition={cameraPosition}
          cameraFov={cameraFov}
        />
      </Canvas>
    </div>
  );
}

// Preset configurations
export const glassPresets = {
  window: {
    refractionStrength: 0.05,
    thickness: 0.3,
    ior: 1.52,
    specularIntensity: 0.8,
    roughness: 0.05,
    tint: [1, 1, 1] as [number, number, number],
    opacity: 0.95,
  },
  crystal: {
    refractionStrength: 0.15,
    thickness: 0.8,
    ior: 2.4,
    specularIntensity: 1.5,
    roughness: 0.02,
    tint: [0.9, 0.95, 1] as [number, number, number],
    opacity: 0.85,
  },
  water: {
    refractionStrength: 0.12,
    thickness: 0.6,
    ior: 1.33,
    specularIntensity: 0.6,
    roughness: 0.15,
    tint: [0.8, 0.9, 1] as [number, number, number],
    opacity: 0.7,
  },
  magnifyingGlass: {
    refractionStrength: 0.25,
    thickness: 1.2,
    ior: 1.6,
    specularIntensity: 1.2,
    roughness: 0.03,
    tint: [1, 1, 1] as [number, number, number],
    opacity: 0.9,
  },
  frostedGlass: {
    refractionStrength: 0.08,
    thickness: 0.4,
    ior: 1.45,
    specularIntensity: 0.5,
    roughness: 0.3,
    tint: [0.95, 0.95, 0.95] as [number, number, number],
    opacity: 0.8,
  },
  coloredGlass: {
    refractionStrength: 0.1,
    thickness: 0.5,
    ior: 1.5,
    specularIntensity: 1.0,
    roughness: 0.08,
    tint: [1, 0.7, 0.8] as [number, number, number],
    opacity: 0.85,
  },
};

export default GlassmorphismRefraction;
