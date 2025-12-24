"use client";

import { BreathingSearch } from "@/components/ui/breathing-search";
import { useState } from "react";

export default function BreathingSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulate search results
    if (query.trim()) {
      setSearchResults([
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
        `Result 4 for "${query}"`,
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Breathing Search */}
      <div className="h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-6xl space-y-8">
          {/* Title */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Breathing Search
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Typography-led design where the font reacts to your typing speed.
              Fast typing creates bold, urgent text. Slow typing creates thin,
              exploratory text. Watch the fluid cursor trail follow your input.
            </p>
          </div>

          {/* Main Search Input - 50% of screen height */}
          <div className="w-full" style={{ height: "50vh" }}>
            <BreathingSearch
              placeholder="Start typing..."
              onSearch={handleSearch}
              minWeight={200}
              maxWeight={900}
            />
          </div>

          {/* Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-violet-400 font-bold mb-2">Fast Typing</h3>
              <p className="text-gray-400 text-sm">
                Type quickly to see bold, italic text with glowing effects -
                perfect for urgent searches
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-violet-400 font-bold mb-2">Fluid Cursor</h3>
              <p className="text-gray-400 text-sm">
                A gooey, fluid cursor trail follows the text caret, creating a
                satisfying typing experience
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🌊</div>
              <h3 className="text-violet-400 font-bold mb-2">Slow Typing</h3>
              <p className="text-gray-400 text-sm">
                Type slowly for thin, elegant text - ideal for thoughtful,
                exploratory searches
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-black to-gray-950">
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-300">
              Search Results for "{searchQuery}"
            </h2>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-violet-500/50 transition-all duration-300 cursor-pointer group"
                >
                  <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                    {result}
                  </h3>
                  <p className="text-gray-400 mt-2">
                    This is a sample search result demonstrating the breathing
                    search component in action.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technical Details */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-200">
              Technical Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge web technologies for a truly interactive
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Variable Font Weight */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-violet-400 mb-4">
                Variable Font Weight
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Real-time font weight calculation (200-900) based on typing
                    velocity
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Automatic italic transformation for fast typing (&gt;60%
                    speed)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Smooth transitions with 200ms ease-out animations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>Letter spacing adjustment for better readability</span>
                </li>
              </ul>
            </div>

            {/* Fluid Cursor Trail */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">💧</div>
              <h3 className="text-2xl font-bold text-violet-400 mb-4">
                Fluid Cursor Trail
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Dynamic caret position tracking with text width measurement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    15-point trail history with gradual opacity decay
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Radial gradient glow with blur effects for &quot;gooey&quot;
                    feeling
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>1-second animation lifecycle per trail point</span>
                </li>
              </ul>
            </div>

            {/* Visual Feedback */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-violet-400 mb-4">
                Visual Feedback
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Real-time typing mode indicator (URGENT / MODERATE /
                    EXPLORATORY)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Color-coded speed bar (red → yellow → green gradient)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>Font weight progress indicator (200-900 range)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Dynamic search icon scaling and glow based on typing speed
                  </span>
                </li>
              </ul>
            </div>

            {/* Responsive Design */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-violet-400 mb-4">
                Responsive Design
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Fluid typography with clamp() for perfect scaling (2rem -
                    6rem)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>Animated background grid with pulsing effect</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>Text shadow effects for high-speed typing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 mt-1">→</span>
                  <span>
                    Gradient borders and modern glassmorphic aesthetics
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 overflow-hidden">
            <h3 className="text-2xl font-bold text-violet-400 mb-6">
              Usage Example
            </h3>
            <pre className="text-gray-300 text-sm overflow-x-auto">
              <code>{`import { BreathingSearch } from "@/components/ui/breathing-search";

export default function Page() {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Your search logic here
  };

  return (
    <div style={{ height: "50vh" }}>
      <BreathingSearch
        placeholder="Start typing..."
        onSearch={handleSearch}
        minWeight={200}
        maxWeight={900}
      />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center text-gray-500 border-t border-gray-900">
        <p className="text-sm">
          Built with Next.js, TypeScript, Framer Motion, and Tailwind CSS
        </p>
        <p className="text-xs mt-2 text-gray-600">
          Variable Font Interaction + Fluid Cursor Technology
        </p>
      </div>
    </div>
  );
}
