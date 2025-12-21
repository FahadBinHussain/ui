"use client";

import React from "react";
import {
  PixelatedTransition,
  PixelatedHover,
  PixelatedCarousel,
} from "@/components/ui/pixelated-transition";
import { Zap, Layers, Sparkles, Cpu } from "lucide-react";

export default function PixelatedTransitionDemo() {
  const demoImages = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800&h=600&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
            <span className="text-purple-300 font-semibold">WebGL + GLSL Shaders</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Pixelated Transitions
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Retro-futuristic image transitions that{" "}
            <span className="text-purple-400 font-semibold">pixelate and resolve</span> with chromatic aberration.
            Pure WebGL shaders for buttery-smooth 60fps animations.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                GPU Accelerated
              </h3>
              <p className="text-slate-400 text-sm">
                WebGL shaders run on GPU for 60fps animations even on mobile devices
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="text-pink-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                Chromatic Aberration
              </h3>
              <p className="text-slate-400 text-sm">
                RGB channel separation during pixelation for retro CRT aesthetic
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Layers className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Multiple Variants
              </h3>
              <p className="text-slate-400 text-sm">
                Click-to-pixelate, hover effects, and automatic carousels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Three.js + custom GLSL shaders for pixel-perfect control
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl font-black shadow-lg shadow-purple-500/50">
                1
              </div>
              <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8 pt-12 h-full">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">UV Division</h3>
                <p className="text-slate-300 mb-4">
                  Fragment shader divides UV coordinates by <code className="bg-slate-950 px-2 py-1 rounded text-pink-400">pixelSize</code> uniform, 
                  then uses <code className="bg-slate-950 px-2 py-1 rounded text-pink-400">floor()</code> to snap to pixel grid
                </p>
                <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                  <code className="text-green-400">{`vec2 pixelatedUV = 
  floor(vUv * resolution / pixelSize) 
  * pixelSize / resolution;`}</code>
                </pre>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-2xl font-black shadow-lg shadow-pink-500/50">
                2
              </div>
              <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8 pt-12 h-full">
                <h3 className="text-2xl font-bold mb-4 text-pink-400">Chromatic Aberration</h3>
                <p className="text-slate-300 mb-4">
                  Sample R, G, B channels at <span className="text-pink-400 font-semibold">offset positions</span> for 
                  retro CRT glitch effect during pixelation phase
                </p>
                <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                  <code className="text-green-400">{`float r = texture2D(tex, uv + offset).r;
float g = texture2D(tex, uv).g;
float b = texture2D(tex, uv - offset).b;`}</code>
                </pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-2xl font-black shadow-lg shadow-cyan-500/50">
                3
              </div>
              <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8 pt-12 h-full">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">GSAP Animation</h3>
                <p className="text-slate-300 mb-4">
                  Tween <code className="bg-slate-950 px-2 py-1 rounded text-cyan-400">pixelSize</code> from 
                  high (blocky) → low (sharp) with easing for smooth transitions
                </p>
                <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                  <code className="text-green-400">{`gsap.to(uniforms.uPixelSize, {
  value: 1.0, // sharp
  duration: 1,
  ease: "power2.out"
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo: Click to Pixelate */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Pixelation Effects</h3>
            <p className="text-slate-400 text-lg">
              Two modes: Pixelate effect or Reveal from pixelated
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pixelate Mode */}
            <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8">
              <h4 className="text-2xl font-bold mb-4 text-purple-400">Click to Pixelate</h4>
              <p className="text-slate-400 mb-6">
                Image starts sharp, click to pixelate → resolve
              </p>
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700">
                <PixelatedTransition
                  imageSrc={demoImages[0]}
                  pixelSize={100}
                  duration={2}
                  enableChromaticAberration={true}
                  startPixelated={false}
                />
              </div>
            </div>

            {/* Reveal Mode */}
            <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8">
              <h4 className="text-2xl font-bold mb-4 text-pink-400">Click to Reveal</h4>
              <p className="text-slate-400 mb-6">
                Image starts pixelated, click to reveal sharp details
              </p>
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700">
                <PixelatedTransition
                  imageSrc={demoImages[1]}
                  pixelSize={120}
                  duration={2}
                  enableChromaticAberration={true}
                  startPixelated={true}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-950 rounded-xl p-6 max-w-5xl mx-auto">
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400 mb-2">Pixelate Effect:</p>
                <pre className="text-xs text-slate-300 overflow-x-auto bg-slate-900 p-4 rounded">
                  <code>{`<PixelatedTransition
  imageSrc="/image.jpg"
  pixelSize={100}
  duration={2}
  startPixelated={false}
/>`}</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">Reveal Effect:</p>
                <pre className="text-xs text-slate-300 overflow-x-auto bg-slate-900 p-4 rounded">
                  <code>{`<PixelatedTransition
  imageSrc="/image.jpg"
  pixelSize={120}
  duration={2}
  startPixelated={true}
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo: Image Transition */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Image Transition</h3>
            <p className="text-slate-400 text-lg">
              Transition between two images with pixelation
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8 max-w-4xl mx-auto">
            <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-700">
              <PixelatedTransition
                imageSrc={demoImages[0]}
                nextImageSrc={demoImages[1]}
                pixelSize={100}
                duration={2}
                enableChromaticAberration={true}
                startPixelated={false}
              />
            </div>

            <div className="mt-8 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<PixelatedTransition
  imageSrc="/image1.jpg"
  nextImageSrc="/image2.jpg"
  pixelSize={100}
  duration={2}
  enableChromaticAberration={true}
  onTransitionComplete={() => console.log('Done!')}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Demo: Hover Effect */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Hover to Pixelate</h3>
            <p className="text-slate-400 text-lg">
              Hover over the image to trigger pixelation effect. Great for galleries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700">
                <PixelatedHover
                  imageSrc={demoImages[2]}
                  pixelSize={40}
                  enableChromaticAberration={true}
                />
              </div>
              <p className="mt-4 text-center text-slate-400">Hover me!</p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700">
                <PixelatedHover
                  imageSrc={demoImages[3]}
                  pixelSize={60}
                  enableChromaticAberration={false}
                />
              </div>
              <p className="mt-4 text-center text-slate-400">No chromatic aberration</p>
            </div>
          </div>

          <div className="mt-12 bg-slate-950 rounded-xl p-6 max-w-3xl mx-auto">
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`<PixelatedHover
  imageSrc="/image.jpg"
  pixelSize={50}
  enableChromaticAberration={true}
/>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Demo: Carousel */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Pixelated Carousel</h3>
            <p className="text-slate-400 text-lg">
              Auto-playing carousel with pixelated transitions between images
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8 max-w-5xl mx-auto">
            <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-700">
              <PixelatedCarousel
                images={demoImages}
                pixelSize={80}
                duration={2}
                autoPlay={false}
                interval={5000}
                enableChromaticAberration={true}
              />
            </div>

            <div className="mt-8 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<PixelatedCarousel
  images={['/img1.jpg', '/img2.jpg', '/img3.jpg']}
  pixelSize={80}
  duration={2}
  autoPlay={true}
  interval={5000}
  enableChromaticAberration={true}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Technical Implementation</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Under the hood: WebGL shaders, Three.js, and GSAP
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fragment Shader */}
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="text-purple-400" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-purple-400">Fragment Shader</h3>
              </div>
              <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                <code className="text-green-400">{`uniform sampler2D uTexture;
uniform float uPixelSize;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  // Snap UV to pixel grid
  vec2 pixelatedUV = 
    floor(vUv * uResolution / uPixelSize) 
    * uPixelSize / uResolution;
  
  // Chromatic aberration
  float offset = uPixelSize / 100.0;
  float r = texture2D(
    uTexture, 
    pixelatedUV + vec2(offset, 0.0)
  ).r;
  float g = texture2D(
    uTexture, 
    pixelatedUV
  ).g;
  float b = texture2D(
    uTexture, 
    pixelatedUV - vec2(offset, 0.0)
  ).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}`}</code>
              </pre>
            </div>

            {/* Animation */}
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="text-pink-400" size={20} />
                </div>
                <h3 className="text-2xl font-bold text-pink-400">GSAP Animation</h3>
              </div>
              <pre className="bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                <code className="text-green-400">{`// Pixelate IN (blocky)
gsap.to(material.uniforms.uPixelSize, {
  value: 100, // high = blocky
  duration: 1,
  ease: "power2.in",
  onComplete: () => {
    // Swap images...
    
    // Pixelate OUT (sharp)
    gsap.to(material.uniforms.uPixelSize, {
      value: 1.0, // low = sharp
      duration: 1,
      ease: "power2.out"
    });
  }
});

// RequestAnimationFrame loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Props Reference */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">Component Props</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* PixelatedTransition */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="bg-purple-600/20 border-b border-purple-500/30 px-6 py-4">
                <h3 className="text-xl font-bold text-purple-400">PixelatedTransition</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">imageSrc</span>
                    <span className="text-slate-400">- Current image URL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">nextImageSrc</span>
                    <span className="text-slate-400">- Next image URL (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">pixelSize</span>
                    <span className="text-slate-400">- Max pixel size (default: 100)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">duration</span>
                    <span className="text-slate-400">- Animation duration (default: 2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">enableChromaticAberration</span>
                    <span className="text-slate-400">- RGB split (default: true)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">startPixelated</span>
                    <span className="text-slate-400">- Start pixelated for reveal (default: false)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* PixelatedHover */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="bg-pink-600/20 border-b border-pink-500/30 px-6 py-4">
                <h3 className="text-xl font-bold text-pink-400">PixelatedHover</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-mono">imageSrc</span>
                    <span className="text-slate-400">- Image URL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-mono">pixelSize</span>
                    <span className="text-slate-400">- Max pixel size (default: 50)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-mono">className</span>
                    <span className="text-slate-400">- Custom CSS classes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-mono">enableChromaticAberration</span>
                    <span className="text-slate-400">- RGB split (default: true)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* PixelatedCarousel */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="bg-cyan-600/20 border-b border-cyan-500/30 px-6 py-4">
                <h3 className="text-xl font-bold text-cyan-400">PixelatedCarousel</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">images</span>
                    <span className="text-slate-400">- Array of image URLs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">pixelSize</span>
                    <span className="text-slate-400">- Max pixel size (default: 80)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">autoPlay</span>
                    <span className="text-slate-400">- Auto advance (default: false)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">interval</span>
                    <span className="text-slate-400">- Time between slides (default: 5000)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">enableChromaticAberration</span>
                    <span className="text-slate-400">- RGB split (default: true)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Perfect For</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-3">Gaming Websites</h3>
              <p className="text-slate-400 text-sm">
                Retro-futuristic transitions for game screenshots and trailers
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Creative Portfolios</h3>
              <p className="text-slate-400 text-sm">
                Stand out with unique hover effects on project thumbnails
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-3">E-commerce</h3>
              <p className="text-slate-400 text-sm">
                Eye-catching product image carousels with pixel transitions
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-orange-500/30 p-6">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-3">Media Sites</h3>
              <p className="text-slate-400 text-sm">
                Cinematic transitions for video thumbnails and galleries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur rounded-3xl border border-purple-500/30 p-12">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap className="text-purple-400" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Performance Tips</h2>
                <ul className="space-y-4 text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">GPU Rendering:</strong> All pixelation happens on GPU via shaders - 60fps even on mobile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Optimize Images:</strong> Use WebP format, max 1920px width, compress with tools like TinyPNG</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Pixel Size:</strong> Higher pixel size = more blocky but same performance. Start at 80-100.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Memory:</strong> Dispose textures and geometries on unmount to prevent memory leaks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Device Pixel Ratio:</strong> Capped at 2 to avoid rendering 4K+ on high-DPI displays</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
