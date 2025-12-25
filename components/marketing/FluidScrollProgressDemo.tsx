"use client";

import React from "react";
import { FluidScrollProgress } from "@/components/ui/fluid-scroll-progress";

export default function FluidScrollProgressDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      {/* Fluid Scroll Progress Component */}
      <FluidScrollProgress
        position="right"
        width={50}
        height={500}
        fillColor="#00ffff"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        containerSelector="body"
        sectionMarkers={[0.15, 0.35, 0.55, 0.75, 0.95]}
      />

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section - 15% */}
        <section id="hero" className="min-h-screen flex flex-col justify-center mb-32">
          <h1 className="text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fluid SVG Scroll Progress
          </h1>
          <p className="text-3xl text-gray-300 leading-relaxed">
            A liquid thermometer-style progress indicator that ripples, splashes,
            and bulges around section markers as you scroll. Watch the right side
            of your screen!
          </p>
        </section>

        {/* Introduction - 35% */}
        <section id="introduction" className="mb-32">
          <h2 className="text-5xl font-bold mb-8 text-cyan-400">
            Introduction to Fluid Progress
          </h2>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Traditional scroll progress bars are static lines that fill up
            linearly. This component reimagines the progress indicator as a
            living, breathing liquid that reacts to your scrolling behavior.
          </p>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            The "thermometer" on the right side fills up as you scroll down the
            page. But it's not just a simple fill—it's a fluid simulation that
            creates ripples, splashes, and surface tension effects based on your
            scroll velocity.
          </p>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Notice the five section markers (dots) along the tube. When the liquid
            level passes a marker, it bulges outward around it, creating a surface
            tension effect. The tube itself expands and contracts dynamically.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            Scroll faster to see bigger ripples and splashes at the liquid
            surface. The effect uses real physics calculations to make the motion
            feel natural and satisfying.
          </p>
        </section>

        {/* How It Works - 55% */}
        <section id="how-it-works" className="mb-32">
          <h2 className="text-5xl font-bold mb-8 text-purple-400">
            How It Works
          </h2>

          <div className="space-y-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">
                1. Scroll Tracking
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                A scroll listener calculates the scroll percentage (0-100%) by
                dividing the current scroll position by the total scrollable
                height. This value drives the liquid fill level. The component
                tracks both the scroll position and scroll velocity
                (pixels/frame).
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">
                2. SVG Path Generation
              </h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                The liquid is drawn using an SVG path that's regenerated every
                frame. The path starts at the bottom of the tube, traces up the
                left side to the fill level, creates the wavy top surface, then
                traces back down the right side. This closed path is filled with
                the liquid color.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The tube outline is drawn separately as two paths (left and right
                edges) that can bulge independently based on nearby markers or
                scroll events.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">
                3. Surface Ripples (Accelerometer Effect)
              </h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                The top surface of the liquid isn't flat—it ripples based on
                scroll velocity. When you scroll fast, the velocity value spikes.
                This is added to a <code className="px-2 py-1 bg-black/30 rounded">surfaceRipple</code> accumulator that decays over time
                (multiplied by 0.85 each frame).
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The ripple value is used to generate sine waves across the liquid
                surface. Multiple control points are sampled, and each one gets a
                vertical offset based on <code className="px-2 py-1 bg-black/30 rounded">sin(x * 2π + time) * rippleAmplitude</code>. This
                creates the splashing effect.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">
                4. Section Markers & Surface Tension
              </h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                Section markers are positioned at specific scroll percentages
                (0.2, 0.4, 0.6, 0.8 by default). Each marker has a <code className="px-2 py-1 bg-black/30 rounded">bulgeState</code>{" "}
                value (0-1) stored in a Map.
              </p>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                When the liquid level passes within 2% of a marker's position, the
                marker's bulge state is set to 1. This value decays over time
                (multiplied by 0.9 each frame). The bulge state affects the tube
                width near the marker, creating the surface tension effect.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The tube path checks each Y coordinate against all markers. If
                within 20px of a marker, the tube width increases proportionally
                to the marker's bulge state. This creates a smooth, organic
                expansion around the marker.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">
                5. Animation Loop
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                A <code className="px-2 py-1 bg-black/30 rounded">requestAnimationFrame</code> loop runs continuously, updating the
                ripple decay, bulge decay, and triggering SVG re-renders. This
                ensures smooth 60fps animations even though the SVG is
                procedurally generated each frame. React state updates are
                minimized—only scroll progress and velocity are tracked, while
                ripples and bulges use refs for better performance.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details - 75% */}
        <section id="technical" className="mb-32">
          <h2 className="text-5xl font-bold mb-8 text-cyan-400">
            Technical Implementation
          </h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold mb-4 text-cyan-300">
                Performance Optimization
              </h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                SVG path generation happens every frame, but it's highly
                optimized. The tube is split into 50 segments, and each segment's
                position is calculated once per frame. Bulge checks use early
                returns and distance-based culling to avoid unnecessary
                calculations.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Refs are used instead of state for high-frequency values (ripples,
                bulges) to prevent React re-renders. Only the scroll progress
                triggers component updates, and even that is throttled by the
                browser's scroll event handling.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">
                Physics Simulation
              </h3>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                The ripple effect uses damped harmonic motion. Velocity is
                accumulated and then multiplied by a damping factor (0.85-0.9)
                each frame. This creates a natural settling behavior where fast
                scrolls create big ripples that gradually calm down.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Bulges use the same decay principle. When triggered, they start at
                1.0 and decay exponentially. The decay rate is faster (0.9) to
                make bulges feel snappy and responsive rather than slow and
                floaty.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold mb-4 text-green-300">
                SVG Filters & Effects
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                The liquid uses a custom SVG filter (<code className="px-2 py-1 bg-black/30 rounded">liquidGlow</code>) that adds a
                soft glow around the fill. The filter uses <code className="px-2 py-1 bg-black/30 rounded">feGaussianBlur</code> on the
                alpha channel to create a halo effect without affecting the main
                fill color. Section markers have their own glow that intensifies
                when the liquid passes them.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                Percentage Display
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                The percentage text floats above the liquid surface, positioned
                dynamically based on the fill level. It uses the same color as the
                liquid and has a text-shadow glow to ensure visibility against any
                background. The text fades in once the liquid level exceeds 1% to
                avoid awkward positioning at the very bottom.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases - 95% */}
        <section id="use-cases" className="mb-32">
          <h2 className="text-5xl font-bold mb-8 text-purple-400">
            Use Cases & Applications
          </h2>

          <div className="grid gap-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                Long-Form Content
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Blog posts, articles, documentation, and tutorials benefit from
                visual scroll progress. Users can gauge how much content remains
                and navigate back to interesting sections using the marker dots.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">
                Storytelling & Scrollytelling
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Interactive narratives that unfold as you scroll can use the fluid
                progress bar to reinforce the sense of journey. Each section
                marker represents a chapter or milestone in the story.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold mb-4 text-green-300">
                Data Visualization
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Scientific articles, research papers, and data reports can use the
                liquid metaphor to represent progress through complex information.
                The fluid aesthetic works well with chemistry, biology, or
                environmental themes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                Creative Portfolios
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Designers and developers can showcase their work with this
                eye-catching progress indicator. It demonstrates mastery of SVG,
                physics simulation, and creative UI patterns that make portfolios
                memorable.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30">
              <h3 className="text-2xl font-bold mb-4 text-pink-300">
                Product Onboarding
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Multi-step onboarding flows can use the fluid progress bar to show
                completion progress. Each marker represents a step, and users can
                see how far they've come and how much remains.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="mb-32">
          <h2 className="text-5xl font-bold mb-8 text-cyan-400">
            Conclusion
          </h2>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            The Fluid SVG Scroll Progress bar transforms a mundane UI element into
            something delightful and memorable. By adding physics-based ripples,
            surface tension bulges, and smooth animations, it creates an engaging
            experience that keeps users scrolling.
          </p>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            The component is fully customizable—adjust colors, size, position, and
            marker placement to fit your design. The liquid metaphor works well
            with science, nature, or futuristic themes, but it's versatile enough
            for any modern web application.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            You've reached the end! Notice how the liquid is nearly at the top of
            the thermometer. Scroll back up to see the liquid drain and the
            markers light up again. The effect works bidirectionally, responding
            naturally to both forward and backward scrolling.
          </p>
        </section>
      </main>
    </div>
  );
}
