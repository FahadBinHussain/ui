"use client";

import { Marquee, MarqueeItem } from "@/components/ui/marquee";
import { motion } from "framer-motion";
import { Star, Award, Users, Zap, Heart, Trophy, Crown, Gem } from "lucide-react";

export default function MarqueeShowcase() {
  // Sample logos/data for marquee
  const logos = [
    { name: "React", color: "text-blue-500" },
    { name: "Next.js", color: "text-gray-900" },
    { name: "TypeScript", color: "text-blue-600" },
    { name: "Tailwind", color: "text-cyan-500" },
    { name: "Framer", color: "text-purple-600" },
    { name: "Three.js", color: "text-gray-700" },
  ];

  const testimonials = [
    { text: "Amazing component library!", author: "John D." },
    { text: "Super smooth animations", author: "Sarah M." },
    { text: "Perfect for modern web apps", author: "Mike R." },
    { text: "Incredible attention to detail", author: "Emma L." },
    { text: "Game-changing UI toolkit", author: "David K." },
  ];

  const features = [
    { icon: Star, text: "Smooth Animations" },
    { icon: Zap, text: "High Performance" },
    { icon: Heart, text: "Easy to Use" },
    { icon: Trophy, text: "Award Winning" },
    { icon: Crown, text: "Premium Quality" },
    { icon: Gem, text: "Beautiful Design" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Infinite Marquee
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Seamlessly looping marquee animations for logos, testimonials, features, and any content.
            Perfect for showcasing partners, reviews, or creating dynamic scrolling effects.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Logo Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Technology Partners</h2>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                Continuous Scroll
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Showcase your technology stack or partners with a smooth scrolling marquee.
            </p>
            <div className="h-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden flex items-center">
              <Marquee speed={30} pauseOnHover={false} className="flex-1">
                {logos.map((logo, index) => (
                  <MarqueeItem key={index} className="mx-6">
                    <div className={`text-lg font-semibold ${logo.color} hover:scale-110 transition-transform`}>
                      {logo.name}
                    </div>
                  </MarqueeItem>
                ))}
              </Marquee>
            </div>
          </motion.div>

          {/* Testimonials Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Customer Testimonials</h2>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                Pauses on Hover
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Display customer reviews in an engaging, continuous scroll format.
            </p>
            <div className="h-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg overflow-hidden flex items-center">
              <Marquee speed={25} direction="right" pauseOnHover={true} className="flex-1">
                {testimonials.map((testimonial, index) => (
                  <MarqueeItem key={index} className="mx-8">
                    <div className="flex items-center gap-3">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white font-medium text-sm">"{testimonial.text}"</span>
                      <span className="text-gray-400 text-xs">- {testimonial.author}</span>
                    </div>
                  </MarqueeItem>
                ))}
              </Marquee>
            </div>
          </motion.div>

          {/* Features Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Feature Highlights</h2>
            <p className="text-gray-400 mb-6">
              Highlight key features with icons and smooth animations.
            </p>
            <div className="h-16 bg-gradient-to-r from-green-900/50 to-teal-900/50 rounded-lg overflow-hidden flex items-center">
              <Marquee speed={35} className="flex-1">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <MarqueeItem key={index} className="mx-6">
                      <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                        <Icon className="w-4 h-4 text-green-400" />
                        <span className="text-white font-medium text-sm">{feature.text}</span>
                      </div>
                    </MarqueeItem>
                  );
                })}
              </Marquee>
            </div>
          </motion.div>

          {/* Variations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">Fast Scroll</h3>
              <p className="text-gray-400 mb-4 text-sm">High-speed marquee for dynamic content</p>
              <div className="h-10 bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-lg overflow-hidden flex items-center">
                <Marquee speed={80} pauseOnHover={false} className="flex-1">
                  <MarqueeItem className="mx-4">
                    <span className="text-red-400 font-semibold text-sm">⚡ FAST ⚡</span>
                  </MarqueeItem>
                  <MarqueeItem className="mx-4">
                    <span className="text-pink-400 font-semibold text-sm">🚀 SPEED 🚀</span>
                  </MarqueeItem>
                  <MarqueeItem className="mx-4">
                    <span className="text-orange-400 font-semibold text-sm">💨 QUICK 💨</span>
                  </MarqueeItem>
                </Marquee>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">Right to Left</h3>
              <p className="text-gray-400 mb-4 text-sm">Alternative direction for variety</p>
              <div className="h-10 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-lg overflow-hidden flex items-center">
                <Marquee speed={40} direction="right" className="flex-1">
                  <MarqueeItem className="mx-4">
                    <span className="text-purple-400 text-sm">← Right</span>
                  </MarqueeItem>
                  <MarqueeItem className="mx-4">
                    <span className="text-indigo-400 text-sm">← Smooth</span>
                  </MarqueeItem>
                  <MarqueeItem className="mx-4">
                    <span className="text-blue-400 text-sm">← Flow</span>
                  </MarqueeItem>
                </Marquee>
              </div>
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Usage</h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`import { Marquee, MarqueeItem } from "@/components/ui/marquee";

export function MyComponent() {
  return (
    <Marquee speed={50} pauseOnHover={true}>
      <MarqueeItem>
        <div>Content 1</div>
      </MarqueeItem>
      <MarqueeItem>
        <div>Content 2</div>
      </MarqueeItem>
      <MarqueeItem>
        <div>Content 3</div>
      </MarqueeItem>
    </Marquee>
  );
}`}
              </pre>
            </div>
            <div className="mt-4 text-gray-400 text-sm">
              <p><strong>Props:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>direction</code>: "left" | "right" (default: "left")</li>
                <li><code>speed</code>: number (pixels per second, default: 50)</li>
                <li><code>pauseOnHover</code>: boolean (default: true) - pauses animation on hover</li>
                <li><code>className</code>: string (additional CSS classes)</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                💡 <strong>Pro tip:</strong> Use <code>pauseOnHover=false</code> for continuous scrolling,
                or <code>pauseOnHover=true</code> to let users read content comfortably.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}