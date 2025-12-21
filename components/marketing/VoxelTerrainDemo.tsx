"use client";

import { VoxelTerrain, StaticVoxel } from "@/components/ui/voxel-terrain";

export default function VoxelTerrainDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Interactive Voxel Terrain */}
      <section className="h-screen relative">
        <VoxelTerrain
          gridSize={60}
          cubeSize={1}
          noiseScale={0.05}
          waveSpeed={2}
          waveAmplitude={6}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 backdrop-blur-sm bg-black/30 p-12 rounded-2xl">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Voxel Terrain
            </h1>
            <p className="text-2xl text-gray-300">
              Move your mouse to create ripple waves
            </p>
          </div>
        </div>
      </section>

      {/* Different Configurations */}
      <section className="py-20 px-8 space-y-16">
        <h2 className="text-4xl font-bold text-center">
          Different Terrain Types
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-400">Small Grid - Fast Waves</h3>
            <div className="h-96 rounded-2xl overflow-hidden border border-cyan-500/30">
              <VoxelTerrain
                gridSize={40}
                cubeSize={1}
                noiseScale={0.08}
                waveSpeed={4}
                waveAmplitude={8}
              />
            </div>
            <p className="text-gray-400">
              40x40 grid with faster wave propagation and higher amplitude
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400">Dense Grid - Subtle Waves</h3>
            <div className="h-96 rounded-2xl overflow-hidden border border-purple-500/30">
              <VoxelTerrain
                gridSize={80}
                cubeSize={0.8}
                noiseScale={0.03}
                waveSpeed={1}
                waveAmplitude={3}
              />
            </div>
            <p className="text-gray-400">
              80x80 dense grid with slow, subtle wave effects
            </p>
          </div>
        </div>
      </section>

      {/* Static Variations */}
      <section className="py-20 px-8 bg-gray-900/50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Static Voxel Landscapes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="h-64 rounded-xl overflow-hidden border border-green-500/30">
              <StaticVoxel
                gridSize={40}
                cubeSize={1}
                colorScheme="green"
              />
            </div>
            <h4 className="text-lg font-bold text-green-400">Matrix Green</h4>
            <p className="text-sm text-gray-400">Classic green voxel grid</p>
          </div>

          <div className="space-y-4">
            <div className="h-64 rounded-xl overflow-hidden border border-blue-500/30">
              <StaticVoxel
                gridSize={40}
                cubeSize={1}
                colorScheme="blue"
              />
            </div>
            <h4 className="text-lg font-bold text-blue-400">Ocean Blue</h4>
            <p className="text-sm text-gray-400">Cool blue landscape</p>
          </div>

          <div className="space-y-4">
            <div className="h-64 rounded-xl overflow-hidden border border-purple-500/30">
              <StaticVoxel
                gridSize={40}
                cubeSize={1}
                colorScheme="purple"
              />
            </div>
            <h4 className="text-lg font-bold text-purple-400">Mystic Purple</h4>
            <p className="text-sm text-gray-400">Purple dreamscape</p>
          </div>

          <div className="space-y-4">
            <div className="h-64 rounded-xl overflow-hidden border border-pink-500/30">
              <StaticVoxel
                gridSize={40}
                cubeSize={1}
                colorScheme="rainbow"
              />
            </div>
            <h4 className="text-lg font-bold text-pink-400">Hot Pink</h4>
            <p className="text-sm text-gray-400">Vibrant pink terrain</p>
          </div>
        </div>
      </section>

      {/* Large Interactive Demo */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Full Interactive Experience</h2>
            <p className="text-xl text-gray-400">
              Large-scale voxel terrain with Perlin noise and wave propagation
            </p>
          </div>

          <div className="h-[600px] rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            <VoxelTerrain
              gridSize={70}
              cubeSize={1}
              noiseScale={0.04}
              waveSpeed={2.5}
              waveAmplitude={7}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold mb-2 text-cyan-400">Perlin Noise</h4>
              <p className="text-sm text-gray-400">
                Terrain height generated using 2D Perlin noise algorithm for natural-looking landscapes
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold mb-2 text-purple-400">Wave Propagation</h4>
              <p className="text-sm text-gray-400">
                Sine wave ripples emanate from mouse position with distance-based decay
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold mb-2 text-pink-400">Instanced Rendering</h4>
              <p className="text-sm text-gray-400">
                Uses Three.js InstancedMesh for efficient rendering of thousands of cubes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Info */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-center">How It Works</h2>

          <div className="space-y-6">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-cyan-400">1. Instancing</h4>
              <p className="text-gray-300">
                Creates one BoxGeometry and uses InstancedMesh to render thousands of copies efficiently.
                Each cube is positioned in a grid pattern with individual transformations.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-purple-400">2. Perlin Noise</h4>
              <p className="text-gray-300">
                Maps the height (Y-scale) of each cube to a 2D Perlin noise function to create
                organic, rolling hills that look natural and continuous.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-pink-400">3. Wave Interaction</h4>
              <p className="text-gray-300">
                On mouse movement, calculates distance from cursor to every cube and applies a
                sine wave function: y = sin(distance - time) * decay
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold mb-3 text-green-400">4. Color Animation</h4>
              <p className="text-gray-300">
                Each cube's color is dynamically updated based on its current height and proximity
                to the wave, creating a glowing effect as the wave passes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
