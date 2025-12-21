"use client";

import { ThreeScene } from "@/components/three/ThreeScene";
import { ParticleSystem } from "@/components/three/ParticleSystem";
import { MorphingGeometry } from "@/components/three/MorphingGeometry";
import { ShaderSphere } from "@/components/three/ShaderSphere";
import { InteractiveScene } from "@/components/three/InteractiveScene";

export default function ThreeDScenesShowcase() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Next-Gen 3D Scenes
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Cutting-edge 3D components built with React Three Fiber, featuring advanced shaders,
          morphing geometries, particle systems, and interactive elements.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Particle System */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Particle System</h2>
            <p className="text-gray-400 mb-4">
              Dynamic particle system with spherical distribution and animated colors.
            </p>
            <div className="h-96 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 8], fov: 60 }}>
                <ParticleSystem count={2000} radius={4} />
              </ThreeScene>
            </div>
          </div>

          {/* Morphing Geometry */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Morphing Geometry</h2>
            <p className="text-gray-400 mb-4">
              Shape-shifting geometry that smoothly transitions between sphere, cube, and torus.
            </p>
            <div className="h-96 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [3, 3, 3], fov: 50 }}>
                <MorphingGeometry size={1.5} />
              </ThreeScene>
            </div>
          </div>

          {/* Shader Sphere */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Liquid Shader</h2>
            <p className="text-gray-400 mb-4">
              Custom GLSL shader creating a liquid-like surface with dynamic waves and lighting.
            </p>
            <div className="h-96 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 4], fov: 45 }}>
                <ShaderSphere size={1.8} />
              </ThreeScene>
            </div>
          </div>

          {/* Interactive Scene */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Interactive Scene</h2>
            <p className="text-gray-400 mb-4">
              Mouse-responsive 3D object with hover effects, scaling, and floating animation.
            </p>
            <div className="h-96 rounded-xl overflow-hidden">
              <ThreeScene camera={{ position: [0, 0, 5], fov: 50 }}>
                <InteractiveScene size={1.2} />
              </ThreeScene>
            </div>
          </div>
        </div>

        {/* Combined Scene */}
        <div className="mt-12 bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-3xl font-semibold mb-4 text-white">Combined Scene</h2>
          <p className="text-gray-400 mb-6">
            All effects combined in a single immersive 3D environment.
          </p>
          <div className="h-[600px] rounded-xl overflow-hidden">
            <ThreeScene camera={{ position: [0, 0, 8], fov: 60 }}>
              <ParticleSystem count={1000} radius={6} />
              <group position={[-3, 0, 0]}>
                <MorphingGeometry size={1} />
              </group>
              <group position={[3, 0, 0]}>
                <ShaderSphere size={1.2} />
              </group>
              <group position={[0, -2, 0]}>
                <InteractiveScene size={0.8} />
              </group>
            </ThreeScene>
          </div>
        </div>
      </div>
    </div>
  );
}
