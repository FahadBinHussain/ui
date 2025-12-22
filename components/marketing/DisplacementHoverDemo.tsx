"use client";

import React from "react";
import {
  DisplacementHover,
  DisplacementPresets,
  DisplacementGrid,
  FullscreenDisplacement,
  DisplacementCard,
} from "@/components/ui/displacement-hover";
import { Image, Sparkles, Layers, Zap } from "lucide-react";

export default function DisplacementHoverDemo() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <FullscreenDisplacement
          image1="https://images.unsplash.com/photo-1557264337-e8a93017fe92?w=1920&h=1080&fit=crop"
          image2="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop"
          displacementImage={DisplacementPresets.clouds}
          title="DISPLACEMENT"
          subtitle="The Awwwards Standard for High-End Hovers"
          intensity={2}
        />
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Displacement Maps?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Organic Movement</h3>
              <p className="text-slate-400 text-sm">
                Fluid, natural warping that feels alive
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Layers className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Texture-Driven</h3>
              <p className="text-slate-400 text-sm">
                Grayscale maps control pixel displacement
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Image className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Smooth Transitions</h3>
              <p className="text-slate-400 text-sm">
                GSAP-powered easing for buttery animations
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Industry Standard</h3>
              <p className="text-slate-400 text-sm">
                Used by top agencies and Awwwards winners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="bg-slate-900 border border-purple-500/50 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-purple-400 font-mono text-3xl font-bold">01</span>
                <h3 className="text-2xl font-bold">Three Images</h3>
              </div>
              
              <p className="text-slate-300 mb-4">
                You need three inputs:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Image A:</strong> Starting image</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Image B:</strong> Ending image</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong className="text-white">Displacement Map:</strong> Grayscale texture</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-blue-500/50 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-blue-400 font-mono text-3xl font-bold">02</span>
                <h3 className="text-2xl font-bold">Shader Logic</h3>
              </div>
              
              <p className="text-slate-300 mb-4">
                The fragment shader reads the displacement map's brightness:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span><strong className="text-white">Dark pixels:</strong> Little to no movement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span><strong className="text-white">White pixels:</strong> Maximum displacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span><strong className="text-white">Gray pixels:</strong> Proportional warping</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-green-500/50 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-green-400 font-mono text-3xl font-bold">03</span>
                <h3 className="text-2xl font-bold">GSAP Animation</h3>
              </div>
              
              <p className="text-slate-300 mb-4">
                GSAP smoothly animates the progress uniform:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span><strong className="text-white">Progress: 0 → 1:</strong> Warps from A to B</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span><strong className="text-white">Easing:</strong> expo.out, power3.out, etc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span><strong className="text-white">Speed:</strong> Customizable in/out timing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Example */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Basic Hover Effect
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Hover over the image to see the displacement in action
          </p>

          <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
            <DisplacementHover
              image1="https://images.unsplash.com/photo-1534088568595-a29ab2a5b6c2?w=1200&h=800&fit=crop"
              image2="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=800&fit=crop"
              displacementImage={DisplacementPresets.clouds}
              intensity={1.2}
              speedIn={1.6}
              speedOut={1.2}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Displacement Presets */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Displacement Map Presets
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Different displacement maps create different warp patterns
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Clouds */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Clouds (Soft & Organic)</h3>
              <div className="aspect-square overflow-hidden rounded-lg">
                <DisplacementHover
                  image1="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"
                  image2="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&h=600&fit=crop"
                  displacementImage={DisplacementPresets.clouds}
                  intensity={1}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Noise */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Noise (Granular & Chaotic)</h3>
              <div className="aspect-square overflow-hidden rounded-lg">
                <DisplacementHover
                  image1="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop"
                  image2="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=600&fit=crop"
                  displacementImage={DisplacementPresets.noise}
                  intensity={0.8}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Water */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Water (Flowing & Liquid)</h3>
              <div className="aspect-square overflow-hidden rounded-lg">
                <DisplacementHover
                  image1="https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=600&fit=crop"
                  image2="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop"
                  displacementImage={DisplacementPresets.water}
                  intensity={1.5}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Portfolio Grid
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Perfect for photography and creative portfolios
          </p>

          <DisplacementGrid
            items={[
              {
                image1: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop",
                image2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop",
                title: "Portrait Series",
                subtitle: "Editorial Photography",
              },
              {
                image1: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
                image2: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
                title: "Landscapes",
                subtitle: "Nature Photography",
              },
              {
                image1: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
                image2: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
                title: "Urban Nights",
                subtitle: "Cityscape Collection",
              },
            ]}
            displacementImage={DisplacementPresets.clouds}
            columns={3}
            intensity={1}
          />
        </div>
      </section>

      {/* Displacement Cards */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Project Cards
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Interactive cards with overlay information
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <DisplacementCard
              image1="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&h=750&fit=crop"
              image2="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&h=750&fit=crop"
              displacementImage={DisplacementPresets.clouds}
              title="Space Exploration"
              description="A visual journey through the cosmos and beyond"
              tag="Featured"
              intensity={1.2}
            />

            <DisplacementCard
              image1="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1000&h=750&fit=crop"
              image2="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=1000&h=750&fit=crop"
              displacementImage={DisplacementPresets.water}
              title="Abstract Forms"
              description="Exploring geometry and minimalist aesthetics"
              tag="New"
              intensity={0.9}
            />
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Technical Deep Dive
          </h2>

          <div className="space-y-8">
            {/* Shader Code */}
            <div className="bg-slate-900 border border-purple-500/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Fragment Shader</h3>
              <p className="text-slate-300 mb-4">
                The heart of the displacement effect:
              </p>
              <div className="bg-black p-6 rounded font-mono text-sm text-green-400 overflow-x-auto">
                <div>// Sample displacement map</div>
                <div>vec4 disp = texture2D(uDisplacement, uv);</div>
                <div className="mt-2">// Calculate distorted positions</div>
                <div>vec2 distortedPosition1 = vec2(</div>
                <div className="ml-4">uv.x + uIntensity * (disp.r - 0.5) * cos(uAngle1),</div>
                <div className="ml-4">uv.y + uIntensity * (disp.r - 0.5) * sin(uAngle1)</div>
                <div>);</div>
                <div className="mt-2">// Apply progress for smooth transition</div>
                <div>vec2 uvDisplaced1 = mix(uv, distortedPosition1, uProgress);</div>
                <div className="mt-2">// Sample textures with displacement</div>
                <div>vec4 color1 = texture2D(uTexture1, uvDisplaced1);</div>
                <div>vec4 color2 = texture2D(uTexture2, uvDisplaced2);</div>
                <div className="mt-2">// Mix based on progress</div>
                <div>vec4 finalColor = mix(color1, color2, uProgress);</div>
              </div>
            </div>

            {/* GSAP Animation */}
            <div className="bg-slate-900 border border-blue-500/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">GSAP Animation</h3>
              <p className="text-slate-300 mb-4">
                Smooth progress animation on hover:
              </p>
              <div className="bg-black p-6 rounded font-mono text-sm text-green-400">
                <div>// Hover in</div>
                <div>gsap.to(material.uniforms.uProgress, {"{"}</div>
                <div className="ml-4">value: 1,</div>
                <div className="ml-4">duration: 1.6,</div>
                <div className="ml-4">ease: "expo.out"</div>
                <div>{"}"});</div>
                <div className="mt-4">// Hover out</div>
                <div>gsap.to(material.uniforms.uProgress, {"{"}</div>
                <div className="ml-4">value: 0,</div>
                <div className="ml-4">duration: 1.2,</div>
                <div className="ml-4">ease: "expo.out"</div>
                <div>{"}"});</div>
              </div>
            </div>

            {/* Displacement Map Tips */}
            <div className="bg-slate-900 border border-green-500/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Choosing Displacement Maps</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">High contrast:</strong>
                    <span className="text-slate-300"> More dramatic warping</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Low contrast:</strong>
                    <span className="text-slate-300"> Subtle, elegant distortion</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Organic patterns:</strong>
                    <span className="text-slate-300"> Clouds, smoke, water for natural feel</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">→</span>
                  <div>
                    <strong className="text-white">Geometric patterns:</strong>
                    <span className="text-slate-300"> Noise, grids for digital aesthetic</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Component Props */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Component API
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-purple-500/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-400 font-mono">&lt;DisplacementHover /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-purple-400 font-mono">image1:</span>
                  <span className="text-slate-300"> string - First image URL</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">image2:</span>
                  <span className="text-slate-300"> string - Second image URL</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">displacementImage:</span>
                  <span className="text-slate-300"> string - Grayscale texture URL</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">intensity:</span>
                  <span className="text-slate-300"> number (default: 1) - Warp strength</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">speedIn:</span>
                  <span className="text-slate-300"> number (default: 1.6) - Hover in duration</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">speedOut:</span>
                  <span className="text-slate-300"> number (default: 1.2) - Hover out duration</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">easing:</span>
                  <span className="text-slate-300"> string (default: "expo.out") - GSAP easing</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-blue-500/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400 font-mono">&lt;DisplacementCard /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-blue-400 font-mono">image1:</span>
                  <span className="text-slate-300"> string - First image</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">image2:</span>
                  <span className="text-slate-300"> string - Second image</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">displacementImage:</span>
                  <span className="text-slate-300"> string - Displacement map</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">title:</span>
                  <span className="text-slate-300"> string - Card title</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">description:</span>
                  <span className="text-slate-300"> string - Card description</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">tag:</span>
                  <span className="text-slate-300"> string (optional) - Badge text</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">intensity:</span>
                  <span className="text-slate-300"> number (default: 0.8)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Perfect For
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">📷</div>
              <h3 className="text-lg font-bold mb-2">Photography Portfolios</h3>
              <p className="text-slate-400 text-sm">
                Showcase your work with elegant, high-end hover effects
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold mb-2">Award-Winning Sites</h3>
              <p className="text-slate-400 text-sm">
                The standard for Awwwards, FWA, and CSS Design Awards
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-lg font-bold mb-2">Creative Agencies</h3>
              <p className="text-slate-400 text-sm">
                Premium feel for agency work and case studies
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🛍️</div>
              <h3 className="text-lg font-bold mb-2">E-Commerce</h3>
              <p className="text-slate-400 text-sm">
                Luxury brand product showcases and lookbooks
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-lg font-bold mb-2">Film & Video</h3>
              <p className="text-slate-400 text-sm">
                Director reels, cinematography portfolios
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🏗️</div>
              <h3 className="text-lg font-bold mb-2">Architecture</h3>
              <p className="text-slate-400 text-sm">
                Project galleries with sophisticated interactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Optimization Tips
          </h2>

          <div className="bg-slate-900 border border-purple-500/50 p-8 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Optimize images:</strong>
                  <span className="text-slate-300"> Use WebP format, compress appropriately (80-90% quality)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Displacement map size:</strong>
                  <span className="text-slate-300"> 512x512px is usually sufficient, no need for 4K</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Lazy load:</strong>
                  <span className="text-slate-300"> Load displacement effects as they enter viewport</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Mobile considerations:</strong>
                  <span className="text-slate-300"> Use lower intensity or disable on touch devices</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Preload textures:</strong>
                  <span className="text-slate-300"> Load all images before initializing Three.js scene</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            Displacement Hover • The Awwwards Standard
          </p>
        </div>
      </section>
    </div>
  );
}
