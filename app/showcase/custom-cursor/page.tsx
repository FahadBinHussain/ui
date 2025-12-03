import { CustomCursorDemo } from "@/components/marketing/CustomCursorDemo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CustomCursorShowcase() {
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
            Custom Cursor Component
          </h1>
          <p className="text-xl text-gray-300">
            Interactive custom cursor with animated pointer icon and name tags. Changes colors on each hover with smooth GSAP animations.
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Live Demo
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <CustomCursorDemo />
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
                    Import the components
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`import { CustomCursor, CursorIcon, NameTag } from "@/components/ui/custom-pointer";`}
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
                    Add to your container (requires cursor-none and relative)
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`<div className="cursor-none relative">
  {/* Your content */}
  
  <CustomCursor>
    <NameTag name="John" src="/avatar.png" />
  </CustomCursor>
</div>`}
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
                    Use default cursor (no children) or custom icon
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`// Default pointer
<CustomCursor />

// With custom icon
<CustomCursor>
  <CursorIcon>
    <YourIcon />
  </CursorIcon>
</CustomCursor>`}
                    </code>
                  </pre>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Component Reference */}
        <div className="mb-16 space-y-8">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Component Reference
          </h2>

          {/* CustomCursor */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">CustomCursor</h3>
            <p className="text-gray-300 mb-4">
              The main component that tracks mouse movement and displays custom cursor with random color changes.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="p-3 font-mono text-purple-300">children</td>
                    <td className="p-3 text-gray-300">ReactNode</td>
                    <td className="p-3 text-gray-300">CursorIcon or NameTag components</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-300">className</td>
                    <td className="p-3 text-gray-300">string</td>
                    <td className="p-3 text-gray-300">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* NameTag */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">NameTag</h3>
            <p className="text-gray-300 mb-4">
              Displays a name and/or avatar image that follows the cursor with scale animation.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="p-3 font-mono text-purple-300">name</td>
                    <td className="p-3 text-gray-300">string</td>
                    <td className="p-3 text-gray-300">Name to display on the tag</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-purple-300">src</td>
                    <td className="p-3 text-gray-300">string</td>
                    <td className="p-3 text-gray-300">Avatar image URL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CursorIcon */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-white">CursorIcon</h3>
            <p className="text-gray-300 mb-4">
              Wrapper for custom cursor icons. If not provided, uses default pointer icon.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-900/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Prop</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="p-3 font-mono text-purple-300">children</td>
                    <td className="p-3 text-gray-300">ReactNode</td>
                    <td className="p-3 text-gray-300">Custom icon/SVG to display</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Features
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Random color pairs from predefined palette on each hover</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Smooth GSAP animations for cursor movement and scaling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Border color changes on hover matching cursor color</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Support for custom icons via CursorIcon component</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>NameTag with avatar and name display</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">✓</span>
                <span>Dark mode aware border styling</span>
              </li>
            </ul>
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
                  /components/ui/custom-pointer.tsx
                </code>
                <span className="text-gray-400">- Main component</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📄</span>
                <code className="bg-gray-900 px-3 py-1 rounded text-sm">
                  /components/marketing/CustomCursorDemo.tsx
                </code>
                <span className="text-gray-400">- Demo implementation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Source Attribution */}
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <h3 className="text-xl font-semibold mb-2 text-green-300">
            Component Source
          </h3>
          <p className="text-gray-300 mb-4">
            This component is adapted from Unizoy UI
          </p>
          <a
            href="https://ui.unizoy.com/docs/components/custom-pointer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            View Original Component →
          </a>
        </div>
      </div>
    </div>
  );
}
