"use client";

import { NeumorphicCard, NeumorphicButton, NeumorphicInput } from "@/components/ui/neumorphic";
import { motion } from "framer-motion";
import { Heart, Star, User, Settings, Play, Pause, Volume2, Search } from "lucide-react";
import { useState } from "react";

export default function NeumorphicShowcase() {
  const [inputValue, setInputValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            Neumorphic Design
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Soft UI components with realistic shadows and highlights. The classic neumorphic design
            creates tactile, button-like interfaces that feel soft and modern.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Basic Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Basic Cards</h2>
            <p className="text-gray-600 mb-6">
              Essential neumorphic cards with different intensity levels and variants.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NeumorphicCard className="p-6">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-700 mb-2">Soft Card</h3>
                  <p className="text-sm text-gray-600">Gentle shadows for subtle depth</p>
                </div>
              </NeumorphicCard>

              <NeumorphicCard intensity="medium" className="p-6">
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-700 mb-2">Medium Card</h3>
                  <p className="text-sm text-gray-600">Balanced shadows for clarity</p>
                </div>
              </NeumorphicCard>

              <NeumorphicCard intensity="strong" className="p-6">
                <div className="text-center">
                  <User className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-700 mb-2">Strong Card</h3>
                  <p className="text-sm text-gray-600">Bold shadows for emphasis</p>
                </div>
              </NeumorphicCard>
            </div>
          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Interactive Elements</h2>
            <p className="text-gray-600 mb-6">
              Clickable neumorphic components with hover and press effects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <NeumorphicButton onClick={() => alert("Raised clicked!")}>
                    Raised
                  </NeumorphicButton>
                  <NeumorphicButton variant="pressed" onClick={() => alert("Pressed clicked!")}>
                    Pressed
                  </NeumorphicButton>
                  <NeumorphicButton variant="flat" onClick={() => alert("Flat clicked!")}>
                    Flat
                  </NeumorphicButton>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700 mb-4">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <NeumorphicButton size="sm" onClick={() => alert("Small!")}>
                    Small
                  </NeumorphicButton>
                  <NeumorphicButton size="md" onClick={() => alert("Medium!")}>
                    Medium
                  </NeumorphicButton>
                  <NeumorphicButton size="lg" onClick={() => alert("Large!")}>
                    Large
                  </NeumorphicButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Input Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Input Fields</h2>
            <p className="text-gray-600 mb-6">
              Soft, inset neumorphic input fields with focus states.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <NeumorphicInput
                  placeholder="Search..."
                  value={inputValue}
                  onChange={setInputValue}
                />
                <NeumorphicInput
                  type="email"
                  placeholder="Enter your email"
                />
                <NeumorphicInput
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-center justify-center">
                <NeumorphicCard inset className="p-8 w-full max-w-sm">
                  <div className="text-center">
                    <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-700 mb-2">Inset Card</h3>
                    <p className="text-sm text-gray-600">Pressed-in effect for containers</p>
                  </div>
                </NeumorphicCard>
              </div>
            </div>
          </motion.div>

          {/* Media Controls Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Media Controls</h2>
            <p className="text-gray-600 mb-6">
              A neumorphic media player interface demonstrating practical usage.
            </p>
            <div className="max-w-md mx-auto">
              <NeumorphicCard className="p-6 mb-6">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-700">Now Playing</h3>
                  <p className="text-sm text-gray-600">Soft Piano - Ambient Dreams</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                  <div className="bg-gray-600 h-2 rounded-full w-1/3"></div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <NeumorphicButton
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </NeumorphicButton>
                  <NeumorphicButton
                    variant="flat"
                    size="sm"
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>
            </div>
          </motion.div>

          {/* Dashboard Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Widgets</h2>
            <p className="text-gray-600 mb-6">
              Neumorphic dashboard components for data visualization and controls.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NeumorphicCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Users</h3>
                    <p className="text-2xl font-bold text-blue-600">1,234</p>
                  </div>
                  <User className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-green-600">+12% from last month</p>
              </NeumorphicCard>

              <NeumorphicCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Revenue</h3>
                    <p className="text-2xl font-bold text-green-600">$45.2K</p>
                  </div>
                  <Star className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-green-600">+8% from last month</p>
              </NeumorphicCard>

              <NeumorphicCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Settings</h3>
                    <p className="text-sm text-gray-600">System preferences</p>
                  </div>
                  <Settings className="w-8 h-8 text-gray-500" />
                </div>
                <NeumorphicButton size="sm" className="w-full mt-2">
                  Configure
                </NeumorphicButton>
              </NeumorphicCard>
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Usage</h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`import { NeumorphicCard, NeumorphicButton, NeumorphicInput } from "@/components/ui/neumorphic";

export function MyComponent() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-8">
      <NeumorphicCard className="p-6">
        <h2>Neumorphic Card</h2>
        <p>Soft, tactile design</p>
      </NeumorphicCard>

      <NeumorphicButton onClick={() => console.log("clicked")}>
        Click me
      </NeumorphicButton>

      <NeumorphicInput
        placeholder="Type something..."
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}`}
              </pre>
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              <p><strong>Props:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>intensity</code>: "soft" | "medium" | "strong" (default: "medium")</li>
                <li><code>inset</code>: boolean for pressed-in effect (default: false)</li>
                <li><code>variant</code>: "raised" | "pressed" | "flat" for buttons</li>
                <li><code>size</code>: "sm" | "md" | "lg" for buttons</li>
              </ul>
              <p className="mt-3 text-xs">
                💡 <strong>Best practices:</strong> Use on light backgrounds (gray-100 to gray-200)
                for the best neumorphic effect. Avoid dark backgrounds.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}