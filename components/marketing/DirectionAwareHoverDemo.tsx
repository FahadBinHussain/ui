"use client";

import React from "react";
import {
  DirectionAwareCard,
  DirectionAwareImageCard,
  DirectionAwareGrid,
  DirectionAwareMinimalCard,
  DirectionAwareIconCard,
  DirectionAwareDebugCard,
} from "@/components/ui/direction-aware-hover";
import { Compass, Sparkles, Zap, Target, Eye, MousePointer2 } from "lucide-react";

export default function DirectionAwareHoverDemo() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Compass className="w-24 h-24 text-purple-400 mx-auto mb-6" />
            <h1 className="text-7xl font-bold mb-6">
              Direction-Aware
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Hover Effect
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Overlays that intelligently enter from the exact edge where your mouse approached,
              adding next-level polish to any grid.
            </p>
          </div>

          {/* Interactive Demo Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {["TOP", "RIGHT", "BOTTOM", "LEFT", "CENTER", "CORNERS"].map((position, index) => (
              <DirectionAwareMinimalCard
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-lg p-12"
                overlayColor="bg-gradient-to-br from-purple-600 to-blue-600"
                overlayContent={
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white">
                      {position}
                    </h3>
                  </div>
                }
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Hover Me</h3>
                  <p className="text-slate-400 text-sm">Enter from {position.toLowerCase()}</p>
                </div>
              </DirectionAwareMinimalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Direction-Aware?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <MousePointer2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Natural Motion</h3>
              <p className="text-slate-400 text-sm">
                Follows your mouse's entry point intuitively
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Feel</h3>
              <p className="text-slate-400 text-sm">
                Adds sophisticated polish to any grid layout
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Eye className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Attention Grabbing</h3>
              <p className="text-slate-400 text-sm">
                Draws focus with fluid, directional animations
              </p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 text-center rounded-lg">
              <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Integration</h3>
              <p className="text-slate-400 text-sm">
                Works with any content - images, text, or icons
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
                <h3 className="text-2xl font-bold">Calculate Position</h3>
              </div>
              
              <p className="text-slate-300 mb-4">
                On mouseenter, get mouse coordinates relative to element center:
              </p>
              <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                <div>const rect = element.getBoundingClientRect();</div>
                <div>const centerX = rect.left + rect.width / 2;</div>
                <div>const centerY = rect.top + rect.height / 2;</div>
                <div className="mt-2">const x = e.clientX - centerX;</div>
                <div>const y = e.clientY - centerY;</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-blue-500/50 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-blue-400 font-mono text-3xl font-bold">02</span>
                <h3 className="text-2xl font-bold">Find Direction</h3>
              </div>
              
              <p className="text-slate-300 mb-4">
                Use Math.atan2() to calculate entry angle:
              </p>
              <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                <div>const angle = Math.atan2(y, x);</div>
                <div>const degree = angle * (180 / Math.PI);</div>
                <div className="mt-2">// Map to sides:</div>
                <div>// -45 to 45°: right</div>
                <div>// 45 to 135°: bottom</div>
                <div>// 135 to -135°: left</div>
                <div>// -135 to -45°: top</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-green-500/50 p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-green-400 font-mono text-3xl font-bold">03</span>
                <h3 className="text-2xl font-bold">Animate Overlay</h3>
              </div>
              
              <p className="text-slate-300 mb-4">
                GSAP animates overlay from detected edge:
              </p>
              <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                <div>// Set initial position</div>
                <div>gsap.set(overlay, {"{"}</div>
                <div className="ml-2">x: `${"{"}fromX{"}"}%`,</div>
                <div className="ml-2">y: `${"{"}fromY{"}"}%`,</div>
                <div className="ml-2">opacity: 0</div>
                <div>{"}"});</div>
                <div className="mt-2">// Animate to center</div>
                <div>gsap.to(overlay, {"{"}</div>
                <div className="ml-2">x: "0%", y: "0%", opacity: 1</div>
                <div>{"}"});</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Debug Demo */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Direction Detection Demo
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Move your mouse from different edges to see the direction calculation in real-time
          </p>

          <DirectionAwareDebugCard />
        </div>
      </section>

      {/* Image Grid Example */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Portfolio Grid
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Perfect for photography, creative work, and project showcases
          </p>

          <DirectionAwareGrid
            items={[
              {
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
                title: "Mountain Peaks",
                description: "Landscape Photography",
                tag: "Featured",
              },
              {
                image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop",
                title: "Portrait Series",
                description: "Editorial Photography",
                tag: "New",
              },
              {
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
                title: "Urban Nights",
                description: "Cityscape Collection",
              },
              {
                image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
                title: "Forest Paths",
                description: "Nature Photography",
              },
              {
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
                title: "Digital Abstract",
                description: "Conceptual Art",
                tag: "Popular",
              },
              {
                image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
                title: "Ocean Views",
                description: "Seascape Photography",
              },
            ]}
            columns={3}
          />
        </div>
      </section>

      {/* Icon Cards */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Icon Card Variant
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Service cards, feature showcases, and more
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <DirectionAwareIconCard
              icon={<Zap className="w-16 h-16 text-yellow-400" />}
              title="Fast Performance"
              description="Optimized animations for smooth 60fps experiences"
              overlayIcon={<Zap className="w-16 h-16 text-white" />}
              overlayTitle="Lightning Speed"
              overlayDescription="GSAP-powered animations ensure buttery smooth performance on all devices"
            />

            <DirectionAwareIconCard
              icon={<Target className="w-16 h-16 text-red-400" />}
              title="Precision Tracking"
              description="Accurate mouse position detection and angle calculation"
              overlayIcon={<Target className="w-16 h-16 text-white" />}
              overlayTitle="Pixel Perfect"
              overlayDescription="Math.atan2() provides precise angle detection for flawless direction awareness"
            />

            <DirectionAwareIconCard
              icon={<Sparkles className="w-16 h-16 text-purple-400" />}
              title="Polish & Detail"
              description="Elevate your UI with sophisticated micro-interactions"
              overlayIcon={<Sparkles className="w-16 h-16 text-white" />}
              overlayTitle="Premium Feel"
              overlayDescription="Small details that make a huge difference in perceived quality and polish"
            />
          </div>
        </div>
      </section>

      {/* Custom Content Example */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Custom Content
          </h2>
          <p className="text-center text-slate-400 mb-12">
            Use the base component with any content you want
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <DirectionAwareCard
              className="bg-slate-900 border border-slate-800 rounded-lg p-12"
              overlayClassName="bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center p-8"
              overlay={
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    🔥 Hot Deal!
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    Limited time offer - 50% off all products
                  </p>
                  <button className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors">
                    Shop Now
                  </button>
                </div>
              }
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Special Offer
                </h3>
                <p className="text-slate-400">
                  Hover to reveal exclusive deal
                </p>
              </div>
            </DirectionAwareCard>

            <DirectionAwareCard
              className="bg-slate-900 border border-slate-800 rounded-lg p-12"
              overlayClassName="bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center p-8"
              overlay={
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    ✓ Success!
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    Your message has been sent successfully
                  </p>
                  <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors">
                    Send Another
                  </button>
                </div>
              }
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Contact Us
                </h3>
                <p className="text-slate-400">
                  Hover to see confirmation
                </p>
              </div>
            </DirectionAwareCard>
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
            {/* Math Explanation */}
            <div className="bg-slate-900 border border-purple-500/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">The Math Behind It</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-2">atan2() Function</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    Returns the angle in radians between the positive x-axis and the point (x, y).
                  </p>
                  <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                    <div>// Returns angle from -π to π</div>
                    <div>const angle = Math.atan2(y, x);</div>
                    <div className="mt-2">// Convert to degrees</div>
                    <div>const degree = angle * (180 / Math.PI);</div>
                    <div className="mt-2">// Range: -180° to 180°</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">Direction Mapping</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    Map angle ranges to the four sides of the element:
                  </p>
                  <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                    <div>if (degree {">"} -45 && degree {"<"}= 45)</div>
                    <div className="ml-2">return RIGHT;</div>
                    <div>else if (degree {">"} 45 && degree {"<"}= 135)</div>
                    <div className="ml-2">return BOTTOM;</div>
                    <div>else if (degree {">"} 135 || degree {"<"}= -135)</div>
                    <div className="ml-2">return LEFT;</div>
                    <div>else return TOP;</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animation Details */}
            <div className="bg-slate-900 border border-blue-500/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">GSAP Animation Flow</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white mb-2">1. Set Initial Position</h4>
                  <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                    <div>gsap.set(overlay, {"{"}</div>
                    <div className="ml-2">x: direction === "top" ? "0%" : direction === "right" ? "100%" : ...,</div>
                    <div className="ml-2">y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : ...,</div>
                    <div className="ml-2">opacity: 0</div>
                    <div>{"}"});</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">2. Animate to Center</h4>
                  <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                    <div>gsap.to(overlay, {"{"}</div>
                    <div className="ml-2">x: "0%",</div>
                    <div className="ml-2">y: "0%",</div>
                    <div className="ml-2">opacity: 1,</div>
                    <div className="ml-2">duration: 0.3,</div>
                    <div className="ml-2">ease: "power2.out"</div>
                    <div>{"}"});</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">3. Exit on Mouse Leave</h4>
                  <div className="bg-black p-4 rounded font-mono text-xs text-green-400">
                    <div>// Calculate exit direction same way</div>
                    <div>gsap.to(overlay, {"{"}</div>
                    <div className="ml-2">x: `${"{"}toX{"}"}%`,</div>
                    <div className="ml-2">y: `${"{"}toY{"}"}%`,</div>
                    <div className="ml-2">opacity: 0</div>
                    <div>{"}"});</div>
                  </div>
                </div>
              </div>
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
              <h3 className="text-xl font-bold mb-4 text-purple-400 font-mono">&lt;DirectionAwareCard /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-purple-400 font-mono">children:</span>
                  <span className="text-slate-300"> ReactNode - Main content</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">overlay:</span>
                  <span className="text-slate-300"> ReactNode - Overlay content</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">overlayClassName:</span>
                  <span className="text-slate-300"> string - Overlay styling</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">animationDuration:</span>
                  <span className="text-slate-300"> number (default: 0.3) - seconds</span>
                </div>
                <div>
                  <span className="text-purple-400 font-mono">ease:</span>
                  <span className="text-slate-300"> string (default: "power2.out") - GSAP easing</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-blue-500/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400 font-mono">&lt;DirectionAwareImageCard /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-blue-400 font-mono">image:</span>
                  <span className="text-slate-300"> string - Image URL</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">title:</span>
                  <span className="text-slate-300"> string - Card title</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">description:</span>
                  <span className="text-slate-300"> string (optional) - Description</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">tag:</span>
                  <span className="text-slate-300"> string (optional) - Badge text</span>
                </div>
                <div>
                  <span className="text-blue-400 font-mono">className:</span>
                  <span className="text-slate-300"> string - Additional classes</span>
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
              <h3 className="text-lg font-bold mb-2">Portfolio Grids</h3>
              <p className="text-slate-400 text-sm">
                Photography, design work, and project showcases
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🛍️</div>
              <h3 className="text-lg font-bold mb-2">Product Catalogs</h3>
              <p className="text-slate-400 text-sm">
                E-commerce grids with smooth hover states
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">📰</div>
              <h3 className="text-lg font-bold mb-2">Blog & News</h3>
              <p className="text-slate-400 text-sm">
                Article cards with engaging hover interactions
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-lg font-bold mb-2">Service Cards</h3>
              <p className="text-slate-400 text-sm">
                Feature showcases with directional reveals
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-lg font-bold mb-2">Team Members</h3>
              <p className="text-slate-400 text-sm">
                Staff grids with bio overlays
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Call-to-Actions</h3>
              <p className="text-slate-400 text-sm">
                Interactive CTAs with directional emphasis
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
                  <strong className="text-white">GSAP is lightweight:</strong>
                  <span className="text-slate-300"> Only ~19KB gzipped, highly optimized for performance</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Use will-change:</strong>
                  <span className="text-slate-300"> Add will-change: transform to overlays for better performance</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Limit simultaneous animations:</strong>
                  <span className="text-slate-300"> Don't animate 50 cards at once - lazy load or stagger</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Mobile considerations:</strong>
                  <span className="text-slate-300"> Disable on touch devices or use onClick instead</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">→</span>
                <div>
                  <strong className="text-white">Opacity + Transform:</strong>
                  <span className="text-slate-300"> We only animate these GPU-accelerated properties</span>
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
            Direction-Aware Hover • Next-Level Polish
          </p>
        </div>
      </section>
    </div>
  );
}
