"use client";

import React from "react";
import {
  Metaballs,
  GoopCursor,
  GoopCard,
  MagneticGoop,
} from "@/components/ui/metaballs";
import { Droplets, Sparkles, Zap, Layers } from "lucide-react";

export default function MetaballsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
            <span className="text-purple-300 font-semibold">CSS Filters + SVG Magic</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
            Interactive Metaballs
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Organic <span className="text-purple-400 font-semibold">"goop"</span> effects that snap together like{" "}
            <span className="text-pink-400 font-semibold">liquid mercury</span>. Pure CSS or SVG filters for stunning visual effects.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Droplets className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Liquid Mercury
              </h3>
              <p className="text-slate-400 text-sm">
                Shapes blend together organically when they get close
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="text-pink-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                CSS or SVG
              </h3>
              <p className="text-slate-400 text-sm">
                Pure CSS for B&W, SVG filters for full color effects
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Interactive
              </h3>
              <p className="text-slate-400 text-sm">
                Mouse tracking, magnetic attraction, cursor followers
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-orange-500/30 p-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Layers className="text-orange-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">
                High-End Feel
              </h3>
              <p className="text-slate-400 text-sm">
                Organic, premium aesthetic for modern web experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Magic Behind It</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Two powerful techniques for creating organic blob effects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CSS Method */}
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-purple-600/20 rounded-lg border border-purple-500/30 mb-4">
                  <span className="text-purple-300 font-semibold">Method 1: CSS Only</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Blur + Contrast Filter</h3>
                <p className="text-slate-300 mb-6">
                  Black & white only, but incredibly simple and performant
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-purple-400">Container with Contrast</h4>
                      <code className="text-xs text-slate-400">filter: contrast(30)</code>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-pink-400">Blurred Elements</h4>
                      <code className="text-xs text-slate-400">filter: blur(20px)</code>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-cyan-400">The Magic</h4>
                      <p className="text-xs text-slate-400">
                        High contrast forces blurred gray pixels to become sharp black, creating organic connections!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <pre className="mt-6 bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                <code className="text-green-400">{`<div style={{ filter: 'contrast(30)' }}>
  <div style={{ 
    filter: 'blur(20px)',
    background: 'black'
  }} />
</div>`}</code>
              </pre>
            </div>

            {/* SVG Method */}
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-pink-600/20 rounded-lg border border-pink-500/30 mb-4">
                  <span className="text-pink-300 font-semibold">Method 2: SVG Filters</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">feGaussianBlur + feColorMatrix</h3>
                <p className="text-slate-300 mb-6">
                  Full color support with precise control over the effect
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-purple-400">Gaussian Blur</h4>
                      <code className="text-xs text-slate-400">{'<feGaussianBlur stdDeviation="10" />'}</code>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-pink-400">Color Matrix</h4>
                      <code className="text-xs text-slate-400">Amplify alpha channel</code>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-cyan-400">Full Color</h4>
                      <p className="text-xs text-slate-400">
                        Works with any color! Purple, pink, gradients, you name it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <pre className="mt-6 bg-slate-950 p-4 rounded-lg text-xs overflow-x-auto">
                <code className="text-green-400">{`<filter id="goop">
  <feGaussianBlur stdDeviation="10" />
  <feColorMatrix values=
    "1 0 0 0 0
     0 1 0 0 0
     0 0 1 0 0
     0 0 0 18 -7" />
</filter>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Demo: Basic Metaballs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Basic Metaballs</h3>
            <p className="text-slate-400 text-lg">
              CSS-only version with blur + contrast. Black & white, but super simple!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8">
              <h4 className="text-2xl font-bold mb-4 text-purple-400">Animated Blobs</h4>
              <p className="text-slate-400 mb-6">
                Watch them merge and separate automatically
              </p>
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700">
                <Metaballs ballCount={5} useColor={false} />
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8">
              <h4 className="text-2xl font-bold mb-4 text-pink-400">Mouse Interactive</h4>
              <p className="text-slate-400 mb-6">
                Move your mouse to attract the blobs
              </p>
              <div className="w-full h-[400px] rounded-xl overflow-hidden border border-slate-700">
                <Metaballs ballCount={4} useColor={false} />
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-950 rounded-xl p-6 max-w-4xl mx-auto">
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`<Metaballs 
  ballCount={5} 
  useColor={false}  // CSS-only B&W version
/>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Demo: Color Metaballs with SVG */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">SVG Color Metaballs</h3>
            <p className="text-slate-400 text-lg">
              Full color support using SVG filters
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h4 className="text-xl font-bold mb-4 text-purple-400">Purple Goop</h4>
              <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <Metaballs ballCount={4} color="#8b5cf6" useColor={true} />
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h4 className="text-xl font-bold mb-4 text-pink-400">Pink Goop</h4>
              <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <Metaballs ballCount={4} color="#ec4899" useColor={true} />
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h4 className="text-xl font-bold mb-4 text-cyan-400">Cyan Goop</h4>
              <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <Metaballs ballCount={4} color="#06b6d4" useColor={true} />
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-950 rounded-xl p-6 max-w-4xl mx-auto">
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`<Metaballs 
  ballCount={4} 
  color="#8b5cf6"  // Any hex color!
  useColor={true}  // SVG filter version
/>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Demo: Goop Cursor */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Goop Cursor Trail</h3>
            <p className="text-slate-400 text-lg">
              Liquid cursor follower with trailing blobs
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8 max-w-4xl mx-auto">
            <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-700">
              <GoopCursor color="#a78bfa" />
            </div>

            <div className="mt-8 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Usage</h4>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<GoopCursor color="#a78bfa" />`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Demo: Magnetic Goop */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Magnetic Attraction</h3>
            <p className="text-slate-400 text-lg">
              Blobs attracted to each other and your mouse using Canvas + physics
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-8 max-w-5xl mx-auto">
            <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-700">
              <MagneticGoop ballCount={6} />
            </div>

            <div className="mt-8 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">How It Works</h4>
              <ul className="text-slate-300 space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span><strong>Canvas rendering</strong> with blur + contrast filter applied</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span><strong>Physics simulation</strong>: velocity, attraction forces, wall bouncing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span><strong>Mouse tracking</strong>: balls attracted within 200px radius</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span><strong>Inter-ball attraction</strong>: balls pull toward each other when close</span>
                </li>
              </ul>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<MagneticGoop ballCount={6} />`}</code>
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* Metaballs */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="bg-purple-600/20 border-b border-purple-500/30 px-6 py-4">
                <h3 className="text-xl font-bold text-purple-400">Metaballs</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">ballCount</span>
                    <span className="text-slate-400">- Number of blobs (default: 5)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">color</span>
                    <span className="text-slate-400">- Hex color for SVG mode (default: #000000)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">useColor</span>
                    <span className="text-slate-400">- Use SVG filters for color (default: false)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono">className</span>
                    <span className="text-slate-400">- Additional CSS classes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* GoopCursor */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="bg-pink-600/20 border-b border-pink-500/30 px-6 py-4">
                <h3 className="text-xl font-bold text-pink-400">GoopCursor</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-mono">color</span>
                    <span className="text-slate-400">- Hex color for trail (default: #8b5cf6)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 font-mono">className</span>
                    <span className="text-slate-400">- Additional CSS classes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* MagneticGoop */}
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="bg-cyan-600/20 border-b border-cyan-500/30 px-6 py-4">
                <h3 className="text-xl font-bold text-cyan-400">MagneticGoop</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">ballCount</span>
                    <span className="text-slate-400">- Number of magnetic blobs (default: 6)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">className</span>
                    <span className="text-slate-400">- Additional CSS classes</span>
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
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-3">Premium Brands</h3>
              <p className="text-slate-400 text-sm">
                High-end, organic aesthetic for luxury product sites
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Creative Portfolios</h3>
              <p className="text-slate-400 text-sm">
                Unique cursor effects and interactive elements
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Product Launches</h3>
              <p className="text-slate-400 text-sm">
                Eye-catching hero sections with organic movement
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-orange-500/30 p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Loading States</h3>
              <p className="text-slate-400 text-sm">
                Beautiful animated loaders instead of boring spinners
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
                    <span><strong className="text-purple-300">CSS Method:</strong> Most performant! Pure CSS filters, no JavaScript calculations needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">SVG Method:</strong> Slightly more expensive but enables full color. Still GPU-accelerated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Ball Count:</strong> Keep it under 8 for smooth 60fps. More blobs = more overlap calculations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Blur Amount:</strong> Higher blur = softer goop effect but more GPU work. Sweet spot is 15-25px</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">→</span>
                    <span><strong className="text-purple-300">Mobile:</strong> Reduce ball count by 50% on mobile devices for best performance</span>
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
