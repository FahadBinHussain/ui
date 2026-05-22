"use client";

import React, { useState } from "react";
import { MagneticPagination } from "@/components/ui/magnetic-pagination";

export default function MagneticPaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Magnetic Black Hole Pagination
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pagination numbers act as gravity wells, pulling towards your cursor.
            The active page features an orbiting ring that physically flies between
            numbers with squash and stretch physics.
          </p>
        </div>

        {/* Demo Section */}
        <div className="mb-32">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-16 border border-white/10">
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">
              Interactive Demo
            </h2>

            {/* Current page display */}
            <div className="text-center mb-12">
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Page {currentPage}
              </div>
              <div className="text-gray-400">
                of {totalPages} • Move your mouse near the numbers!
              </div>
            </div>

            {/* Pagination component */}
            <div className="flex justify-center">
              <MagneticPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                primaryColor="#00ffff"
                secondaryColor="#ff00ff"
                magneticRadius={100}
                magneticStrength={0.3}
              />
            </div>

            {/* Instructions */}
            <div className="mt-12 text-center text-gray-400 text-sm space-y-2">
              <p>💡 Move your cursor near any number to see the magnetic effect</p>
              <p>🎯 Click a number to watch the ring fly with squash & stretch</p>
              <p>🌌 The ring orbits continuously with particle trails</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-purple-400">
            How the Black Hole Effect Works
          </h2>

          <div className="grid gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                1. Gravity Well Physics
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Each pagination number tracks the mouse position in real-time. When
                the cursor enters a 100px radius, a magnetic force is calculated
                based on distance. The closer the cursor, the stronger the pull.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The formula is: <code className="px-2 py-1 bg-black/30 rounded">force = (1 - distance / radius) * strength</code>.
                Numbers translate towards the cursor using <code className="px-2 py-1 bg-black/30 rounded">deltaX * force</code> and{" "}
                <code className="px-2 py-1 bg-black/30 rounded">deltaY * force</code>. When the cursor leaves, numbers spring back to
                their original position with elastic easing.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                2. Orbiting Ring System
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                The active page indicator is an SVG ring with multiple layers:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 ml-4">
                <li>Outer glow ring with Gaussian blur filter</li>
                <li>Main gradient ring with dash array animation</li>
                <li>Two orbiting particles (cyan and magenta)</li>
                <li>Pulsing inner ring for depth</li>
              </ul>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                All layers rotate continuously using CSS animations and SVG{" "}
                <code className="px-2 py-1 bg-black/30 rounded">animateTransform</code> for that signature orbital effect.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                3. Squash & Stretch Animation
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                When changing pages, the ring doesn't fade or teleport—it physically
                flies to the new number. This uses the classic animation principle
                of squash and stretch:
              </p>
              <ol className="list-decimal list-inside text-lg text-gray-300 space-y-2 ml-4">
                <li>
                  <strong>Stretch Phase:</strong> Ring elongates into an oval shape
                  based on travel distance and direction. <code className="px-2 py-1 bg-black/30 rounded">scaleX</code> increases,{" "}
                  <code className="px-2 py-1 bg-black/30 rounded">scaleY</code> decreases. Ring rotates to align with motion vector.
                </li>
                <li>
                  <strong>Squash Phase:</strong> Upon arrival, ring compresses
                  horizontally and expands vertically (overshoot).
                </li>
                <li>
                  <strong>Settle Phase:</strong> Ring bounces back to perfect circle
                  with elastic easing.
                </li>
              </ol>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                This creates a sense of weight and momentum, making the digital
                element feel like a physical object obeying real-world physics.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                4. Performance Optimization
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Magnetic calculations run in a <code className="px-2 py-1 bg-black/30 rounded">requestAnimationFrame</code> loop for
                smooth 60fps tracking. GSAP handles all transforms with GPU
                acceleration. The ring's SVG animations use CSS and SVG SMIL, which
                are highly optimized by browsers. Mouse tracking is passive and
                doesn't block scrolling.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400">
            Technical Implementation
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                Real-Time Position Tracking
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Each number element stores a ref to its DOM node. In the animation
                loop, <code className="px-2 py-1 bg-black/30 rounded">getBoundingClientRect()</code> retrieves the current position
                accounting for transforms. This ensures the magnetic effect works
                even as numbers move, creating recursive interactions where numbers
                can pull each other when clustering near the cursor.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">
                SVG Gradient Animations
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                The ring uses a linear gradient that transitions from cyan to
                magenta and back. Combined with rotation, this creates a continuous
                color-shifting effect. The gradient definition lives in SVG{" "}
                <code className="px-2 py-1 bg-black/30 rounded">&lt;defs&gt;</code> and is referenced via <code className="px-2 py-1 bg-black/30 rounded">url(#ringGradient)</code>,
                allowing multiple elements to share the same gradient with zero
                performance cost.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold mb-4 text-green-300">
                GSAP Timeline for Squash & Stretch
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                The page transition uses a GSAP timeline to sequence the stretch,
                squash, and settle phases. Each phase has specific easing
                functions: <code className="px-2 py-1 bg-black/30 rounded">power2.in</code> for acceleration, <code className="px-2 py-1 bg-black/30 rounded">power2.out</code> for
                deceleration, and <code className="px-2 py-1 bg-black/30 rounded">elastic.out</code> for the bouncy settle. The
                timeline's <code className="px-2 py-1 bg-black/30 rounded">onComplete</code> callback resets the transition state,
                allowing the ring to respond to clicks again.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                Particle Orbit Mechanics
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                The two orbiting particles use SVG <code className="px-2 py-1 bg-black/30 rounded">animateTransform</code> with{" "}
                <code className="px-2 py-1 bg-black/30 rounded">type="rotate"</code>. They start 180° apart (one at top, one at
                bottom) and rotate around the ring's center. Duration is synced to
                the ring's main rotation for visual harmony. Opacity is set to 0.8
                to create trailing effects as they move.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-purple-400">
            Perfect Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-3 text-cyan-300">
                🎮 Gaming Portals
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Perfect for game lobbies, leaderboards, or matchmaking screens
                where playful interactions enhance the gaming vibe.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-3 text-purple-300">
                🎨 Creative Portfolios
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Showcase your work with pagination that demonstrates mastery of
                physics, animations, and creative UI patterns.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold mb-3 text-green-300">
                🛍️ E-Commerce Product Lists
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Make browsing product pages memorable and engaging. The magnetic
                effect encourages exploration and interaction.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                📱 SaaS Dashboards
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Add personality to data tables and list views. The sci-fi aesthetic
                works great for tech-forward SaaS products.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold mb-3 text-red-300">
                📰 Content Sites
              </h3>
              <p className="text-gray-300 leading-relaxed">
                News sites, blogs, and media platforms can use this to make article
                navigation more engaging and less utilitarian.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
              <h3 className="text-xl font-bold mb-3 text-indigo-300">
                🎓 Educational Platforms
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Lesson pagination or quiz navigation becomes more playful and
                engaging, especially for younger audiences.
              </p>
            </div>
          </div>
        </div>

        {/* Customization */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400">
            Customization Options
          </h2>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Magnetic Strength
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Adjust <code className="px-2 py-1 bg-black/30 rounded">magneticStrength</code> (0-1) to control how far numbers move
                towards the cursor. Lower values create subtle effects, higher
                values create dramatic pulls.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Magnetic Radius
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Set <code className="px-2 py-1 bg-black/30 rounded">magneticRadius</code> (in pixels) to define the influence zone.
                Larger radius means the magnetic effect starts from farther away.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Colors</h3>
              <p className="text-gray-300 leading-relaxed">
                Pass <code className="px-2 py-1 bg-black/30 rounded">primaryColor</code> and <code className="px-2 py-1 bg-black/30 rounded">secondaryColor</code> hex values to
                match your brand. The gradient automatically interpolates between
                them for the ring effect.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Page Range Display
              </h3>
              <p className="text-gray-300 leading-relaxed">
                For large page counts (50+), implement ellipsis logic to show
                surrounding pages only (e.g., "1 ... 5 6 7 ... 50"). The magnetic
                effect still works on visible numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
