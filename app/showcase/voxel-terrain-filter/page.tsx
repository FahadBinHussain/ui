'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Perlin-like noise function
function noise(x: number, z: number, seed: number = 0): number {
  const X = Math.floor(x) & 255;
  const Z = Math.floor(z) & 255;
  const hash = (X * 374761393 + Z * 668265263 + seed * 123456789) & 0x7fffffff;
  return (hash / 0x7fffffff) * 2 - 1;
}

function smoothNoise(x: number, z: number, seed: number = 0): number {
  const corners = (noise(x - 1, z - 1, seed) + noise(x + 1, z - 1, seed) + 
                   noise(x - 1, z + 1, seed) + noise(x + 1, z + 1, seed)) / 16;
  const sides = (noise(x - 1, z, seed) + noise(x + 1, z, seed) + 
                 noise(x, z - 1, seed) + noise(x, z + 1, seed)) / 8;
  const center = noise(x, z, seed) / 4;
  return corners + sides + center;
}

interface VoxelTerrainProps {
  searchTerm: string;
}

function VoxelTerrain({ searchTerm }: VoxelTerrainProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const gridSize = 30;
  const voxelSize = 1;
  const [heights, setHeights] = useState<number[][]>([]);
  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (!meshRef.current) return;

    const keyword = searchTerm.toLowerCase();
    let heightMultiplier = 1;
    let waveIntensity = 0;
    let peakIntensity = 0;
    
    if (keyword.includes('mountain') || keyword.includes('peak')) {
      peakIntensity = 3;
      heightMultiplier = 2;
    } else if (keyword.includes('ocean') || keyword.includes('wave') || keyword.includes('water')) {
      waveIntensity = 2;
      heightMultiplier = 0.5;
    } else if (keyword.includes('valley') || keyword.includes('canyon')) {
      heightMultiplier = 0.3;
      peakIntensity = -1;
    } else if (keyword.includes('plateau') || keyword.includes('flat')) {
      heightMultiplier = 0.8;
    } else if (keyword.includes('hill')) {
      heightMultiplier = 1.2;
      peakIntensity = 1;
    }

    const dummy = new THREE.Object3D();
    let idx = 0;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const nx = x / gridSize - 0.5;
        const nz = z / gridSize - 0.5;
        
        let height = smoothNoise(nx * 5, nz * 5, 42) * heightMultiplier;
        
        // Add animated wave effect
        if (waveIntensity > 0) {
          height += Math.sin(nx * 10 + timeRef.current * 2) * Math.cos(nz * 10 + timeRef.current * 2) * waveIntensity;
        }
        
        // Add peak effect
        if (peakIntensity !== 0) {
          const dist = Math.sqrt(nx * nx + nz * nz);
          height += (1 - dist * 2) * peakIntensity;
        }
        
        // Data cluster visualization
        const resultCount = searchTerm.length * 10;
        height += (resultCount / 100) * 0.5;
        
        height = Math.max(0.1, height + 2);
        
        for (let y = 0; y < Math.ceil(height); y++) {
          dummy.position.set(
            (x - gridSize / 2) * voxelSize,
            y * voxelSize,
            (z - gridSize / 2) * voxelSize
          );
          
          // Color based on height
          const color = new THREE.Color();
          if (y < height * 0.3) {
            color.setHSL(0.55, 0.7, 0.3); // Deep blue-green
          } else if (y < height * 0.6) {
            color.setHSL(0.3, 0.6, 0.4); // Green
          } else if (y < height * 0.8) {
            color.setHSL(0.15, 0.5, 0.5); // Yellow-green
          } else {
            color.setHSL(0.0, 0.0, 0.8); // White peaks
          }
          
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(idx, dummy.matrix);
          meshRef.current.setColorAt(idx, color);
          idx++;
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  const maxInstances = gridSize * gridSize * 10;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, maxInstances]}>
      <boxGeometry args={[voxelSize * 0.95, voxelSize * 0.95, voxelSize * 0.95]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}

export default function VoxelTerrainFilter() {
  const [searchValue, setSearchValue] = useState('');
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    // Simulate result count based on search term
    setResultCount(searchValue.length * 10 + Math.floor(Math.random() * 20));
  }, [searchValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* 3D Voxel Terrain Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [20, 15, 20], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4080ff" />
          <VoxelTerrain searchTerm={searchValue} />
          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minDistance={15}
            maxDistance={40}
            maxPolarAngle={Math.PI / 2.2}
          />
          <gridHelper args={[50, 50, '#333', '#222']} position={[0, 0, 0]} />
        </Canvas>
      </div>

      {/* Floating Search Bar */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Voxel Terrain Filter</h1>
            <p className="text-blue-300 text-lg">
              Watch the landscape transform as you search
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Try: mountain, ocean, valley, plateau..."
              className="w-full bg-white/10 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl px-8 py-6 text-white text-2xl placeholder-blue-300/50 focus:outline-none focus:border-blue-400 transition-all shadow-2xl shadow-blue-500/20"
            />
            
            {/* Result Counter */}
            {searchValue && (
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <div className="inline-block bg-blue-500/20 backdrop-blur-lg border border-blue-400/30 rounded-full px-6 py-2">
                  <span className="text-blue-300 text-sm">
                    ~{resultCount} results in data cluster
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Keyword Suggestions */}
          <div className="flex flex-wrap gap-3 justify-center mt-16">
            {['mountain', 'ocean', 'valley', 'plateau', 'hill', 'wave'].map((keyword) => (
              <button
                key={keyword}
                onClick={() => setSearchValue(keyword)}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-full text-blue-300 text-sm transition-all hover:scale-105"
              >
                {keyword}
              </button>
            ))}
          </div>

          {/* Info Panel */}
          <div className="mt-12 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">How it works:</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li>• <strong>Mountain/Peak:</strong> Terrain grows into tall peaks</li>
              <li>• <strong>Ocean/Wave:</strong> Voxels create flowing waves</li>
              <li>• <strong>Valley/Canyon:</strong> Terrain dips into low valleys</li>
              <li>• <strong>Plateau:</strong> Creates flat elevated surfaces</li>
              <li>• <strong>Height = Data Density:</strong> Taller terrain = more results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
