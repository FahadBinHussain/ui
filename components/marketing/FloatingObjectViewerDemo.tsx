"use client";

import React from "react";
import {
  FloatingObjectViewer,
  ProductViewer,
  HeroObject,
  SubtleFloatingObject,
} from "@/components/ui/floating-object-viewer";
import { Box, MousePointer2, Sparkles, Package } from "lucide-react";

export default function FloatingObjectViewerDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            3D Object Viewer
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive floating 3D objects with spring physics—rotate with your
            mouse and watch them elastically return to center when you stop
          </p>
        </div>

        {/* Main Demo */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Interactive 3D Crystal
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-cyan-500/30 overflow-hidden">
            <div className="h-[600px]">
              <HeroObject />
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-300 text-lg">
                Move your mouse to rotate • Auto-rotates when idle • Spring
                physics for smooth motion
              </p>
            </div>
          </div>
        </div>

        {/* Variants Grid */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
            Intensity Variants
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className="h-80">
                  <SubtleFloatingObject />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">
                  Subtle
                </h3>
                <p className="text-gray-400 text-sm">
                  Low sensitivity (30%), gentle auto-rotate, minimal spring
                  bounce
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className="h-80">
                  <FloatingObjectViewer intensity={0.5} autoRotateSpeed={0.5} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-purple-400">
                  Standard
                </h3>
                <p className="text-gray-400 text-sm">
                  Balanced sensitivity (50%), moderate rotation, smooth spring
                  physics
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className="h-80">
                  <FloatingObjectViewer intensity={0.9} autoRotateSpeed={0.8} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-pink-400">
                  Intense
                </h3>
                <p className="text-gray-400 text-sm">
                  High sensitivity (90%), fast rotation, dramatic spring motion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Viewer Demo */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Product Viewer Mode
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden">
            <div className="h-[500px]">
              <ProductViewer />
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-300 text-lg">
                Includes orbit controls • Zoom & rotate • Perfect for e-commerce
                product showcases
              </p>
            </div>
          </div>
        </div>

        {/* Technical Breakdown */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                🎯 Mouse Tracking
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Mouse position is normalized to -1 to 1 coordinates relative to
                the canvas center. This drives the target rotation values for the
                3D object.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`const x = (clientX / width) * 2 - 1;
const y = -(clientY / height) * 2 + 1;
rotationY = x * intensity * π * 0.3;`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                🌊 Spring Physics
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                @react-spring/three provides physics-based animations. The object
                smoothly interpolates to target rotation with realistic mass,
                tension, and friction.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`useSpring({
  rotationX: targetX,
  config: {
    mass: 2,
    tension: 120,
    friction: 26
  }
})`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                🔄 Auto-Rotation
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                useFrame hook from React Three Fiber runs on every render frame,
                adding continuous rotation on the Y-axis for an idle animation
                loop.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`useFrame((state, delta) => {
  mesh.rotation.y += delta * speed;
});`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                💎 Physical Materials
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                MeshPhysicalMaterial with transmission, clearcoat, and metalness
                creates realistic glass/metal surfaces that reflect the
                environment.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`<meshPhysicalMaterial
  metalness={0.9}
  transmission={0.5}
  clearcoat={1}
/>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Perfect Use Cases
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
              <Package className="w-12 h-12 mb-4 text-cyan-400" />
              <h3 className="text-xl font-bold mb-3 text-cyan-300">
                E-Commerce
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Product showcases for shoes, electronics, furniture—let customers
                explore items from every angle
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <Sparkles className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-3 text-purple-300">
                Hero Sections
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Eye-catching landing page heroes with floating logos, mascots, or
                geometric shapes
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30">
              <Box className="w-12 h-12 mb-4 text-pink-400" />
              <h3 className="text-xl font-bold mb-3 text-pink-300">
                Portfolios
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                3D artists and designers can showcase models with interactive
                controls and lighting
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
              <MousePointer2 className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-3 text-green-300">
                Interactive UI
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Add depth to dashboards, data visualizations, or any UI that
                needs a premium touch
              </p>
            </div>
          </div>
        </div>

        {/* Customization */}
        <div>
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
            Customization Options
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Load Custom Models
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Pass a <code className="px-2 py-1 bg-black/30 rounded">modelUrl</code> prop
                with a path to your GLTF/GLB file. The component automatically
                falls back to a beautiful crystalline geometry if the model fails
                to load.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`<FloatingObjectViewer modelUrl="/models/shoe.glb" />`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Adjust Spring Physics
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Modify the spring config in the component code:{" "}
                <code className="px-2 py-1 bg-black/30 rounded">mass</code> controls
                weight,{" "}
                <code className="px-2 py-1 bg-black/30 rounded">tension</code> affects
                stiffness, and{" "}
                <code className="px-2 py-1 bg-black/30 rounded">friction</code> controls
                damping. Higher tension = snappier, lower friction = more bounce.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Lighting & Materials
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Adjust the{" "}
                <code className="px-2 py-1 bg-black/30 rounded">Environment</code> preset
                (city, sunset, forest, studio) for different reflections. Tweak
                MeshPhysicalMaterial properties like metalness, roughness, and
                transmission for different surface finishes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
