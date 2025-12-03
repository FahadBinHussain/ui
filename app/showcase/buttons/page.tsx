import { ButtonDemo } from "@/components/marketing/ButtonDemo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ButtonsShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Button Components
          </h1>
          <p className="text-xl text-gray-300">
            Three animated button variants using GSAP for smooth, professional interactions. Each with unique hover effects.
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Live Demo
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <ButtonDemo />
          </div>
        </div>

        {/* Usage */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">Usage</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">
                    Install dependencies
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`pnpm add gsap @gsap/react class-variance-authority`}
                    </code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">
                    Import the components
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`import { Button, Button2, Button3 } from "@/components/ui/button";`}
                    </code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white mb-2">
                    Use in your components
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`// Button with animated circle fill
<Button variant="blue">Click Me</Button>

// Button with bounce and slide
<Button2 hoverColor="bg-green-600">Hover</Button2>

// Button with arrow reveal
<Button3>Get Started</Button3>`}
                    </code>
                  </pre>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Component Details */}
        <div className="mb-16 space-y-8">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Component Details
          </h2>

          {/* Button */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">Button - Animated Circle Fill</h3>
            <p className="text-gray-300 mb-4">
              Tracks mouse position and reveals a colored circle that follows the cursor on hover. Uses GSAP for smooth animations.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="p-3 font-mono text-purple-300">variant</td>
                    <td className="p-3 text-gray-300">string</td>
                    <td className="p-3 text-gray-400">"blue"</td>
                    <td className="p-3 text-gray-300">Color variant (blue, purple, pink, green, sunset, ocean, galaxy, etc.)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-300">intent</td>
                    <td className="p-3 text-gray-300">string</td>
                    <td className="p-3 text-gray-400">"small"</td>
                    <td className="p-3 text-gray-300">Size variant (small, medium, large)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Button2 */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">Button2 - Bounce & Slide</h3>
            <p className="text-gray-300 mb-4">
              Features a bounce scale animation combined with a sliding background color reveal from bottom to top.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="p-3 font-mono text-purple-300">hoverColor</td>
                    <td className="p-3 text-gray-300">string</td>
                    <td className="p-3 text-gray-400">-</td>
                    <td className="p-3 text-gray-300">Tailwind class for hover background color (e.g., "bg-green-600")</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Button3 */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">Button3 - Arrow Reveal</h3>
            <p className="text-gray-300 mb-4">
              Reveals an arrow icon while sliding the dot and text on hover. Background changes to blue with white text.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="p-3 font-mono text-purple-300">initialDotTranslate</td>
                    <td className="p-3 text-gray-300">number</td>
                    <td className="p-3 text-gray-400">-100</td>
                    <td className="p-3 text-gray-300">Dot exit animation translate %</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-300">initialArrowTranslate</td>
                    <td className="p-3 text-gray-300">number</td>
                    <td className="p-3 text-gray-400">-100</td>
                    <td className="p-3 text-gray-300">Arrow entry animation translate %</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-300">initialTextTranslate</td>
                    <td className="p-3 text-gray-300">number</td>
                    <td className="p-3 text-gray-400">-30</td>
                    <td className="p-3 text-gray-300">Text shift on hover %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Files Location */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Files Location
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📄</span>
                <code className="bg-gray-900 px-3 py-1 rounded text-sm">
                  /components/ui/button.tsx
                </code>
                <span className="text-gray-400">- All button components</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📄</span>
                <code className="bg-gray-900 px-3 py-1 rounded text-sm">
                  /components/marketing/ButtonDemo.tsx
                </code>
                <span className="text-gray-400">- Demo implementation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Source Attribution */}
        <div className="mb-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <h3 className="text-xl font-semibold mb-2 text-green-300">
            Component Source
          </h3>
          <p className="text-gray-300 mb-4">
            These button components are adapted from Unizoy UI
          </p>
          <a
            href="https://ui.unizoy.com/docs/components/button"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            View Original Component →
          </a>
        </div>

        {/* Technologies */}
        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-xl font-semibold mb-2 text-blue-300">
            Technologies Used
          </h3>
          <ul className="text-gray-300 space-y-1">
            <li>• GSAP - Professional-grade animation library</li>
            <li>• @gsap/react - React hooks for GSAP</li>
            <li>• class-variance-authority - Type-safe variant styling</li>
            <li>• Lucide React - Arrow icon</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
