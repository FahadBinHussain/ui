"use client";

import React from "react";
import { PerspectiveToastProvider, toast } from "./perspective-toast";

export default function PerspectiveToastDemo() {
  return (
    <PerspectiveToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Perspective Skew Toasts
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              3D toast notifications that enter from the corner like hanging
              signs, tilting and swinging based on your mouse movement with
              glossy sheen effects.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="mb-32">
            <h2 className="text-4xl font-bold mb-8 text-center text-cyan-400">
              Try It Out
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Info Toast */}
              <button
                onClick={() =>
                  toast.info(
                    "New Message",
                    "You have 3 unread messages in your inbox"
                  )
                }
                className="group relative p-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">ℹ️</div>
                  <h3 className="text-xl font-bold mb-2">Info Toast</h3>
                  <p className="text-sm opacity-80">
                    Click to trigger an informational notification
                  </p>
                </div>
              </button>

              {/* Success Toast */}
              <button
                onClick={() =>
                  toast.success(
                    "Success!",
                    "Your changes have been saved successfully"
                  )
                }
                className="group relative p-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-xl font-bold mb-2">Success Toast</h3>
                  <p className="text-sm opacity-80">
                    Click to trigger a success notification
                  </p>
                </div>
              </button>

              {/* Warning Toast */}
              <button
                onClick={() =>
                  toast.warning(
                    "Warning",
                    "Your session will expire in 5 minutes"
                  )
                }
                className="group relative p-8 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">⚠️</div>
                  <h3 className="text-xl font-bold mb-2">Warning Toast</h3>
                  <p className="text-sm opacity-80">
                    Click to trigger a warning notification
                  </p>
                </div>
              </button>

              {/* Error Toast */}
              <button
                onClick={() =>
                  toast.error(
                    "Error",
                    "Failed to connect to the server. Please try again."
                  )
                }
                className="group relative p-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">❌</div>
                  <h3 className="text-xl font-bold mb-2">Error Toast</h3>
                  <p className="text-sm opacity-80">
                    Click to trigger an error notification
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-8 text-center text-gray-400 text-sm">
              💡 Move your mouse around to see the toasts tilt in 3D space!
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-32 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-purple-400">
              How It Works
            </h2>

            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  1. 3D Perspective Container
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The toast container has <code className="px-2 py-1 bg-black/30 rounded">perspective: 1000px</code> applied,
                  creating a 3D space. All child toasts exist in this 3D
                  environment, allowing them to rotate and tilt realistically.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  2. Entry Animation - Hanging Sign Effect
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  When a toast enters, it starts with <code className="px-2 py-1 bg-black/30 rounded">rotateX(90deg)</code> (completely
                  flat, invisible from the front). It animates to{" "}
                  <code className="px-2 py-1 bg-black/30 rounded">rotateX(0deg)</code> using GSAP with a back-easing for overshoot.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  After entering, it swings like a hanging sign: rotates to
                  -5deg, then +3deg, then -1deg, and finally settles at 0deg.
                  This creates a damped oscillation effect using multiple
                  sequential tweens with decreasing magnitudes.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  3. Mouse-Based 3D Tilt
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  A global mousemove listener tracks the cursor position. The X
                  and Y coordinates are normalized (0 to 1) and centered around
                  0.5. These values are mapped to <code className="px-2 py-1 bg-black/30 rounded">rotateY</code> and{" "}
                  <code className="px-2 py-1 bg-black/30 rounded">rotateX</code> transforms:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Mouse left/right → rotateY (-15deg to +15deg)</li>
                  <li>Mouse up/down → rotateX (-15deg to +15deg, inverted)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-3">
                  This allows the user to "look around" the sides of the toast
                  as if examining a physical object in 3D space.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  4. Glossy Sheen Gradient
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  A radial gradient overlay moves in the <em>opposite</em>{" "}
                  direction of the mouse. When you move the mouse right, the
                  sheen moves left. This creates a parallax effect that enhances
                  the perception of depth, making the toast feel like a glossy,
                  reflective surface catching light from different angles.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  5. Auto-Dismiss & Exit Animation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Each toast auto-dismisses after 5 seconds (configurable). The
                  progress bar shrinks from 100% to 0% using CSS animation. On
                  close, the toast animates out by rotating back to{" "}
                  <code className="px-2 py-1 bg-black/30 rounded">rotateX(-90deg)</code> (flat upward), scaling down, and fading out.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  6. 3D Shadow Plane
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  A duplicate element positioned at <code className="px-2 py-1 bg-black/30 rounded">translateZ(-20px)</code> creates a
                  shadow plane in 3D space. This shadow moves naturally as the
                  toast rotates, enhancing the illusion that the notification
                  is a physical object floating above the page.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-32 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-purple-400">
              Technical Implementation
            </h2>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Provider Pattern
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The component uses a Provider pattern to manage toast state
                globally. The <code className="px-2 py-1 bg-black/30 rounded">PerspectiveToastProvider</code> wraps your app and
                exposes a <code className="px-2 py-1 bg-black/30 rounded">toast</code> function on the window object. This allows you
                to trigger toasts from anywhere:
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-green-400">{`toast.success("Saved!", "Your work has been saved")
toast.error("Failed", "Could not connect to server")
toast.info("Tip", "Press Ctrl+S to save")
toast.warning("Low Space", "Only 10MB remaining")`}</code>
              </pre>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mt-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Type System
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Each toast type (info, success, warning, error) has associated
                colors, icons, and styling defined in a <code className="px-2 py-1 bg-black/30 rounded">typeStyles</code> object. This
                makes it easy to add new toast types by extending the object.
                Icons come from <code className="px-2 py-1 bg-black/30 rounded">lucide-react</code> for consistency.
              </p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 mt-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                Performance
              </h3>
              <p className="text-gray-300 leading-relaxed">
                GSAP handles all animations with GPU acceleration. The mousemove
                listener is throttled by GSAP's tweening system (500ms
                duration). React state updates are minimized—only the mouse
                position and toast list are tracked. The component unmounts
                cleanly, removing event listeners and clearing timeouts to
                prevent memory leaks.
              </p>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-32 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-cyan-400">
              Use Cases
            </h2>

            <div className="grid gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold mb-2 text-purple-300">
                  Modern Web Apps
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Replace boring alert() dialogs with these eye-catching 3D
                  toasts. Perfect for SaaS dashboards, admin panels, and
                  productivity apps where you want to communicate status without
                  being intrusive.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <h3 className="text-xl font-bold mb-2 text-cyan-300">
                  Gaming Interfaces
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The 3D effect fits perfectly with game UIs. Use it for
                  achievement unlocks, level-up notifications, or in-game alerts.
                  The hanging sign aesthetic works great with fantasy or RPG
                  themes.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
                <h3 className="text-xl font-bold mb-2 text-green-300">
                  E-Commerce
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Show "Added to cart" or "Order confirmed" messages with flair.
                  The 3D effect makes notifications feel premium, reinforcing a
                  high-quality brand perception.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
                <h3 className="text-xl font-bold mb-2 text-yellow-300">
                  Creative Portfolios
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Designers and developers can showcase their skills with this
                  component. It's a conversation starter that demonstrates
                  mastery of 3D CSS, GSAP, and creative UI patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-purple-400">
              Customization
            </h2>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">
                  Custom Duration
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Pass a <code className="px-2 py-1 bg-black/30 rounded">duration</code> prop (in milliseconds) to control how long
                  the toast stays visible. Set it to <code className="px-2 py-1 bg-black/30 rounded">0</code> to disable auto-dismiss and
                  require manual closing.
                </p>
                <pre className="bg-black/50 p-4 rounded-lg text-sm">
                  <code className="text-green-400">{`toast.info("Never dismiss", { duration: 0 })`}</code>
                </pre>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">
                  Position
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The container is positioned <code className="px-2 py-1 bg-black/30 rounded">top-8 right-8</code>. You can easily
                  change this to <code className="px-2 py-1 bg-black/30 rounded">bottom-8 left-8</code> for bottom-left toasts, or
                  center them. The 3D effect works from any corner or edge.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">
                  Custom Colors
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Extend the <code className="px-2 py-1 bg-black/30 rounded">typeStyles</code> object to add your own toast types with
                  custom colors and icons. Or override the default colors by
                  modifying the gradient definitions in the component.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">
                  Stacking Behavior
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Toasts stack vertically with 1rem margin between them. You can
                  modify the stacking to be horizontal, or implement a smarter
                  queue system that only shows one toast at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PerspectiveToastProvider>
  );
}
