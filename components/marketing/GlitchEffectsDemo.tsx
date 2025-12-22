"use client";

import React from "react";
import {
  GlitchText,
  RGBGlitchText,
  GlitchImage,
  GlitchButton,
  GlitchCard,
  CorruptText,
} from "@/components/ui/glitch-effects";
import { Zap, Eye, Cpu, Radio } from "lucide-react";

export default function GlitchEffectsDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <RGBGlitchText text="GLITCH" fontSize="6rem" fontWeight="900" />
          </div>
          <p className="text-xl text-cyan-400 mb-4 font-mono">
            <CorruptText text="DIGITAL CHAOS UNLEASHED" />
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12">
            RGB channel splitting, horizontal slicing, and data corruption effects for that authentic cyberpunk aesthetic.
            Different from analog CRT — this is pure digital mayhem.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <GlitchButton>INITIALIZE</GlitchButton>
            <GlitchButton>EXECUTE</GlitchButton>
          </div>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-cyan-500/50" />
        <div className="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-magenta-500/50" />
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; SYSTEM_FEATURES
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-cyan-500/30 p-6 text-center">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-cyan-300">RGB Split</h3>
              <p className="text-slate-400 text-sm">
                Separate color channels for authentic digital corruption
              </p>
            </div>
            
            <div className="bg-slate-900 border border-magenta-500/30 p-6 text-center">
              <Eye className="w-12 h-12 text-magenta-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-magenta-300">Horizontal Slicing</h3>
              <p className="text-slate-400 text-sm">
                clip-path strips create digital scan line artifacts
              </p>
            </div>
            
            <div className="bg-slate-900 border border-cyan-500/30 p-6 text-center">
              <Cpu className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-cyan-300">Pure CSS</h3>
              <p className="text-slate-400 text-sm">
                No WebGL or shaders required — just CSS chaos
              </p>
            </div>
            
            <div className="bg-slate-900 border border-magenta-500/30 p-6 text-center">
              <Radio className="w-12 h-12 text-magenta-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-magenta-300">Multiple Triggers</h3>
              <p className="text-slate-400 text-sm">
                Hover, continuous, or random activation modes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; HOW_IT_WORKS
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Method 1: CSS Pseudo-elements */}
            <div className="bg-slate-900 border border-cyan-500/50 p-8">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300 font-mono">
                METHOD_1: Pseudo-Elements
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-400 font-mono">01.</span>
                    <h4 className="font-bold text-white">Create Copies</h4>
                  </div>
                  <p className="text-slate-400 text-sm ml-8">
                    Use ::before and ::after to create two text copies positioned absolutely over the original
                  </p>
                  <div className="mt-2 ml-8 bg-black p-3 rounded text-xs font-mono text-green-400">
                    position: absolute;<br/>
                    top: 0; left: 0;
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-400 font-mono">02.</span>
                    <h4 className="font-bold text-white">RGB Channels</h4>
                  </div>
                  <p className="text-slate-400 text-sm ml-8">
                    Apply red to ::before, blue to ::after, cyan/green to base
                  </p>
                  <div className="mt-2 ml-8 bg-black p-3 rounded text-xs font-mono text-green-400">
                    text-shadow: -5px 0 red;<br/>
                    text-shadow: 5px 0 blue;
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-400 font-mono">03.</span>
                    <h4 className="font-bold text-white">Animate</h4>
                  </div>
                  <p className="text-slate-400 text-sm ml-8">
                    Random translate (2-5px) with clip-path: inset() for horizontal slicing
                  </p>
                  <div className="mt-2 ml-8 bg-black p-3 rounded text-xs font-mono text-green-400">
                    transform: translate(-5px, 2px);<br/>
                    clip-path: inset(20% 0 60% 0);
                  </div>
                </div>
              </div>
            </div>

            {/* Method 2: Image channels */}
            <div className="bg-slate-900 border border-magenta-500/50 p-8">
              <h3 className="text-2xl font-bold mb-6 text-magenta-300 font-mono">
                METHOD_2: Image Layers
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-magenta-400 font-mono">01.</span>
                    <h4 className="font-bold text-white">Duplicate Images</h4>
                  </div>
                  <p className="text-slate-400 text-sm ml-8">
                    Stack three identical images with absolute positioning
                  </p>
                  <div className="mt-2 ml-8 bg-black p-3 rounded text-xs font-mono text-green-400">
                    position: absolute;<br/>
                    mix-blend-mode: screen;
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-magenta-400 font-mono">02.</span>
                    <h4 className="font-bold text-white">Color Shift</h4>
                  </div>
                  <p className="text-slate-400 text-sm ml-8">
                    Use hue-rotate and saturate filters for RGB separation
                  </p>
                  <div className="mt-2 ml-8 bg-black p-3 rounded text-xs font-mono text-green-400">
                    filter: hue-rotate(0deg);<br/>
                    filter: hue-rotate(180deg);
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-magenta-400 font-mono">03.</span>
                    <h4 className="font-bold text-white">Slice & Shift</h4>
                  </div>
                  <p className="text-slate-400 text-sm ml-8">
                    Apply clip-path strips and translate on trigger
                  </p>
                  <div className="mt-2 ml-8 bg-black p-3 rounded text-xs font-mono text-green-400">
                    transform: translate(-5px, 0);<br/>
                    clip-path: inset(20% 0 60% 0);
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Glitch Demos */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; TEXT_GLITCH_VARIANTS
          </h2>

          <div className="space-y-16">
            {/* Hover trigger */}
            <div className="bg-slate-900 border border-cyan-500/50 p-12">
              <h3 className="text-xl font-bold mb-6 text-cyan-300 font-mono">HOVER_TRIGGER</h3>
              <p className="text-slate-400 mb-8 text-sm">Hover over the text to activate glitch</p>
              <div className="text-center">
                <GlitchText 
                  text="CYBERPUNK 2077" 
                  className="text-6xl font-black text-cyan-400"
                  glitchIntensity="high"
                  triggerMode="hover"
                />
              </div>
            </div>

            {/* Continuous glitch */}
            <div className="bg-slate-900 border border-magenta-500/50 p-12">
              <h3 className="text-xl font-bold mb-6 text-magenta-300 font-mono">CONTINUOUS_MODE</h3>
              <p className="text-slate-400 mb-8 text-sm">Always glitching — pure chaos</p>
              <div className="text-center">
                <RGBGlitchText 
                  text="ERROR_404" 
                  fontSize="5rem"
                  fontWeight="900"
                />
              </div>
            </div>

            {/* Random trigger */}
            <div className="bg-slate-900 border border-cyan-500/50 p-12">
              <h3 className="text-xl font-bold mb-6 text-cyan-300 font-mono">RANDOM_ACTIVATION</h3>
              <p className="text-slate-400 mb-8 text-sm">Glitches randomly every 2-5 seconds</p>
              <div className="text-center">
                <GlitchText 
                  text="SIGNAL LOST" 
                  className="text-5xl font-black text-red-400"
                  glitchIntensity="medium"
                  triggerMode="random"
                />
              </div>
            </div>

            {/* Data corruption */}
            <div className="bg-slate-900 border border-magenta-500/50 p-12">
              <h3 className="text-xl font-bold mb-6 text-magenta-300 font-mono">DATA_CORRUPTION</h3>
              <p className="text-slate-400 mb-8 text-sm">Random character replacement</p>
              <div className="text-center text-4xl font-mono text-green-400">
                <CorruptText text="MEMORY CORRUPTED SYSTEM FAILURE IMMINENT" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Glitch */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; IMAGE_GLITCH
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-300 font-mono">HOVER_GLITCH</h3>
              <p className="text-slate-400 mb-6 text-sm">Hover to trigger RGB channel split</p>
              <GlitchImage
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"
                alt="Cyberpunk cityscape"
                className="w-full h-80"
                triggerMode="hover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-magenta-300 font-mono">CONTINUOUS_GLITCH</h3>
              <p className="text-slate-400 mb-6 text-sm">Always active for maximum chaos</p>
              <GlitchImage
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
                alt="Digital technology"
                className="w-full h-80"
                triggerMode="continuous"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Buttons */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; INTERACTIVE_ELEMENTS
          </h2>

          <div className="bg-slate-900 border border-cyan-500/50 p-12">
            <h3 className="text-xl font-bold mb-6 text-cyan-300 font-mono">GLITCH_BUTTONS</h3>
            <p className="text-slate-400 mb-8 text-sm">Hover to activate cyberpunk button effects</p>
            
            <div className="flex gap-6 flex-wrap justify-center">
              <GlitchButton onClick={() => console.log("Clicked!")}>
                EXECUTE
              </GlitchButton>
              <GlitchButton onClick={() => console.log("Clicked!")}>
                DOWNLOAD
              </GlitchButton>
              <GlitchButton onClick={() => console.log("Clicked!")}>
                CONNECT
              </GlitchButton>
              <GlitchButton onClick={() => console.log("Clicked!")}>
                INITIALIZE
              </GlitchButton>
            </div>
          </div>
        </div>
      </section>

      {/* Glitch Cards */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; GLITCH_CARDS
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <GlitchCard
              title="NEURAL NET"
              description="AI-powered decision making with quantum encryption protocols."
            />
            <GlitchCard
              title="CYBERSPACE"
              description="Navigate the digital frontier with enhanced security measures."
            />
            <GlitchCard
              title="BLOCKCHAIN"
              description="Decentralized ledger technology for immutable transactions."
            />
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; TECHNICAL_IMPLEMENTATION
          </h2>

          <div className="space-y-8">
            {/* clip-path explanation */}
            <div className="bg-slate-900 border border-cyan-500/50 p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-300 font-mono">
                clip-path: inset()
              </h3>
              <p className="text-slate-400 mb-4">
                The key to horizontal slicing. inset() takes 4 values: top, right, bottom, left.
              </p>
              <div className="bg-black p-6 rounded font-mono text-sm text-green-400">
                <div className="mb-2">/* Hide top 20% and bottom 60% */</div>
                <div>clip-path: inset(20% 0 60% 0);</div>
                <div className="mt-4 mb-2">/* Only show middle 20% strip */</div>
                <div>clip-path: inset(40% 0 40% 0);</div>
                <div className="mt-4 mb-2">/* Animated slicing */</div>
                <div>@keyframes slice {"{"}</div>
                <div className="ml-4">0% {"{"} clip-path: inset(0 0 0 0); {"}"}</div>
                <div className="ml-4">25% {"{"} clip-path: inset(20% 0 60% 0); {"}"}</div>
                <div className="ml-4">50% {"{"} clip-path: inset(60% 0 20% 0); {"}"}</div>
                <div className="ml-4">75% {"{"} clip-path: inset(40% 0 40% 0); {"}"}</div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* RGB separation */}
            <div className="bg-slate-900 border border-magenta-500/50 p-8">
              <h3 className="text-2xl font-bold mb-4 text-magenta-300 font-mono">
                RGB Channel Split
              </h3>
              <p className="text-slate-400 mb-4">
                Create the chromatic aberration effect using text-shadow or multiple elements.
              </p>
              <div className="bg-black p-6 rounded font-mono text-sm text-green-400">
                <div className="mb-2">/* Method 1: text-shadow */</div>
                <div>color: cyan;</div>
                <div>text-shadow: -5px 0 red, 5px 0 blue;</div>
                <div className="mt-4 mb-2">/* Method 2: Pseudo-elements */</div>
                <div>::before {"{"}</div>
                <div className="ml-4">content: attr(data-text);</div>
                <div className="ml-4">position: absolute;</div>
                <div className="ml-4">color: red;</div>
                <div className="ml-4">transform: translateX(-5px);</div>
                <div className="ml-4">clip-path: inset(20% 0 60% 0);</div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Animation timing */}
            <div className="bg-slate-900 border border-cyan-500/50 p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-300 font-mono">
                Animation Timing
              </h3>
              <p className="text-slate-400 mb-4">
                Use steps() for choppy digital glitch feel instead of smooth transitions.
              </p>
              <div className="bg-black p-6 rounded font-mono text-sm text-green-400">
                <div className="mb-2">/* Smooth (analog) */</div>
                <div>animation: glitch 0.3s ease infinite;</div>
                <div className="mt-4 mb-2">/* Choppy (digital) */</div>
                <div>animation: glitch 0.3s steps(5) infinite;</div>
                <div className="mt-4 mb-2">/* Very choppy */</div>
                <div>animation: glitch 0.2s steps(2) infinite;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Props */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; COMPONENT_API
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* GlitchText */}
            <div className="bg-slate-900 border border-cyan-500/50 p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-300 font-mono">&lt;GlitchText /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-cyan-400 font-mono">text:</span>
                  <span className="text-slate-400"> string - The text to display</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">glitchIntensity:</span>
                  <span className="text-slate-400"> "low" | "medium" | "high"</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">triggerMode:</span>
                  <span className="text-slate-400"> "hover" | "continuous" | "random"</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">className:</span>
                  <span className="text-slate-400"> string (optional)</span>
                </div>
              </div>
            </div>

            {/* RGBGlitchText */}
            <div className="bg-slate-900 border border-magenta-500/50 p-6">
              <h3 className="text-xl font-bold mb-4 text-magenta-300 font-mono">&lt;RGBGlitchText /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-magenta-400 font-mono">text:</span>
                  <span className="text-slate-400"> string - Text content</span>
                </div>
                <div>
                  <span className="text-magenta-400 font-mono">fontSize:</span>
                  <span className="text-slate-400"> string - Default "4rem"</span>
                </div>
                <div>
                  <span className="text-magenta-400 font-mono">fontWeight:</span>
                  <span className="text-slate-400"> string - Default "900"</span>
                </div>
                <div>
                  <span className="text-magenta-400 font-mono">className:</span>
                  <span className="text-slate-400"> string (optional)</span>
                </div>
              </div>
            </div>

            {/* GlitchImage */}
            <div className="bg-slate-900 border border-cyan-500/50 p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-300 font-mono">&lt;GlitchImage /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-cyan-400 font-mono">src:</span>
                  <span className="text-slate-400"> string - Image URL</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">alt:</span>
                  <span className="text-slate-400"> string - Alt text</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">triggerMode:</span>
                  <span className="text-slate-400"> "hover" | "continuous"</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-mono">className:</span>
                  <span className="text-slate-400"> string (optional)</span>
                </div>
              </div>
            </div>

            {/* GlitchButton */}
            <div className="bg-slate-900 border border-magenta-500/50 p-6">
              <h3 className="text-xl font-bold mb-4 text-magenta-300 font-mono">&lt;GlitchButton /&gt;</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-magenta-400 font-mono">children:</span>
                  <span className="text-slate-400"> ReactNode - Button content</span>
                </div>
                <div>
                  <span className="text-magenta-400 font-mono">onClick:</span>
                  <span className="text-slate-400"> () =&gt; void (optional)</span>
                </div>
                <div>
                  <span className="text-magenta-400 font-mono">className:</span>
                  <span className="text-slate-400"> string (optional)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; USE_CASES
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-cyan-500/30 p-6">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-lg font-bold mb-2 text-cyan-300">Gaming Sites</h3>
              <p className="text-slate-400 text-sm">
                Perfect for cyberpunk, sci-fi, or dystopian game marketing
              </p>
            </div>

            <div className="bg-slate-900 border border-magenta-500/30 p-6">
              <div className="text-4xl mb-3">🎵</div>
              <h3 className="text-lg font-bold mb-2 text-magenta-300">Music Artists</h3>
              <p className="text-slate-400 text-sm">
                Electronic, synthwave, or industrial music portfolios
              </p>
            </div>

            <div className="bg-slate-900 border border-cyan-500/30 p-6">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-bold mb-2 text-cyan-300">Tech Products</h3>
              <p className="text-slate-400 text-sm">
                Cutting-edge tech launches, hackathons, dev conferences
              </p>
            </div>

            <div className="bg-slate-900 border border-magenta-500/30 p-6">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-lg font-bold mb-2 text-magenta-300">Creative Portfolios</h3>
              <p className="text-slate-400 text-sm">
                Digital artists, VFX designers, creative technologists
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance & Best Practices */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 font-mono">
            &gt; OPTIMIZATION_TIPS
          </h2>

          <div className="bg-slate-900 border border-cyan-500/50 p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-xl">→</span>
                <div>
                  <strong className="text-white">Use CSS over JavaScript:</strong>
                  <span className="text-slate-400"> CSS animations are GPU-accelerated and more performant</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-xl">→</span>
                <div>
                  <strong className="text-white">Limit simultaneous glitches:</strong>
                  <span className="text-slate-400"> Don't have more than 3-5 elements glitching at once</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-xl">→</span>
                <div>
                  <strong className="text-white">Use will-change sparingly:</strong>
                  <span className="text-slate-400"> Add will-change: transform on elements that glitch frequently</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-xl">→</span>
                <div>
                  <strong className="text-white">Prefer transform over top/left:</strong>
                  <span className="text-slate-400"> transform: translate() is more performant than position changes</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-xl">→</span>
                <div>
                  <strong className="text-white">Test on mobile:</strong>
                  <span className="text-slate-400"> Reduce animation complexity on lower-powered devices</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-mono text-xl">→</span>
                <div>
                  <strong className="text-white">Accessibility:</strong>
                  <span className="text-slate-400"> Respect prefers-reduced-motion for users sensitive to animations</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-4 border-t border-cyan-500/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 font-mono">
            &gt; END_TRANSMISSION_
          </p>
        </div>
      </section>
    </div>
  );
}
