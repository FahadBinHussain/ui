import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatedTooltipDemo } from "@/components/marketing/AnimatedTooltipDemo";

export default function AnimatedTooltipShowcase() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 border border-black/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
          Animated Tooltip
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Interactive profile tooltips with GSAP elastic animations. Features smooth tooltip transitions 
          with rotation effects on mouse movement.
        </p>
      </div>

      {/* Live Demo */}
      <div className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 overflow-x-hidden">
        <AnimatedTooltipDemo />
      </div>

      {/* Documentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Usage */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Usage</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-emerald-500">1. Install Dependencies</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">pnpm add gsap</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-emerald-500">2. Configure Next.js Images</h3>
                <p className="text-gray-600 mb-2">Add Unsplash domain to <code className="text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded">next.config.ts</code>:</p>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
};`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-emerald-500">3. Copy Component</h3>
                <p className="text-gray-600 mb-2">
                  Create <code className="text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded">components/ui/animated-tooltip.tsx</code>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-emerald-500">4. Import and Use</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const items = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-...",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-...",
  },
  // ... more items
];

<AnimatedTooltip items={items} />`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Props */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Props</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-emerald-500">Prop</th>
                    <th className="text-left p-4 font-semibold text-emerald-500">Type</th>
                    <th className="text-left p-4 font-semibold text-emerald-500">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 text-emerald-500 font-mono text-sm">items</td>
                    <td className="p-4 text-gray-600">Array</td>
                    <td className="p-4 text-gray-700">Array of objects with id, name, designation, and image</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-emerald-500 font-mono text-sm">items[].id</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-700">Unique identifier for each item</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-emerald-500 font-mono text-sm">items[].name</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-700">Person's name shown in tooltip</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-emerald-500 font-mono text-sm">items[].designation</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-700">Person's job title shown in tooltip</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-emerald-500 font-mono text-sm">items[].image</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-700">Profile image URL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-emerald-500">Elastic Animation</h3>
                <p className="text-gray-600">
                  Tooltips animate with elastic easing for a smooth, playful bounce effect using GSAP.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-emerald-500">Mouse Tracking</h3>
                <p className="text-gray-600">
                  Tooltips rotate and move based on mouse position within the profile image.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-emerald-500">Smooth Transitions</h3>
                <p className="text-gray-600">
                  Prevents overlapping animations by killing active tweens before starting new ones.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-emerald-500">Gradient Accents</h3>
                <p className="text-gray-600">
                  Features emerald and sky gradient lines at the bottom of tooltips for visual appeal.
                </p>
              </div>
            </div>
          </section>

          {/* Files Location */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Files Location</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-2">
              <p className="text-gray-700">
                <span className="text-emerald-500 font-semibold">Component:</span>{" "}
                <code className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded">components/ui/animated-tooltip.tsx</code>
              </p>
              <p className="text-gray-700">
                <span className="text-emerald-500 font-semibold">Demo:</span>{" "}
                <code className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded">components/marketing/AnimatedTooltipDemo.tsx</code>
              </p>
            </div>
          </section>

          {/* Source Attribution */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Source</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-2">Component adapted from:</p>
              <a
                href="https://ui.unizoy.com/docs/components/animated-tooltip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-600 underline transition-colors"
              >
                Unizoy UI - Animated Tooltip Component
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
