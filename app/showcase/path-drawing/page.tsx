import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PathDrawingDemo } from "@/components/marketing/PathDrawingDemo";

export default function PathDrawingShowcase() {
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
          SVG Path Drawing
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Animated SVG path drawing with Framer Motion. Features spring animations and sequential 
          path length transitions for smooth, organic drawing effects.
        </p>
      </div>

      {/* Live Demo */}
      <div className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 overflow-x-hidden">
        <PathDrawingDemo />
      </div>

      {/* Documentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Usage */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Usage</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-500">1. Install Dependencies</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">pnpm add motion framer-motion</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-500">2. Copy Component</h3>
                <p className="text-gray-600 mb-2">
                  Create <code className="text-pink-500 bg-pink-50 px-1 py-0.5 rounded">components/ui/path-drawing.tsx</code>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-500">3. Import and Use</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`import { PathDrawing } from "@/components/ui/path-drawing";

<PathDrawing />`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Customization */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Customization</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-pink-500">Animation Variants</h3>
                <p className="text-gray-700 mb-2">The component uses Framer Motion variants for path drawing:</p>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    }
  },
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-pink-500">Custom Shapes</h3>
                <p className="text-gray-700 mb-2">Add your own SVG shapes with custom delays:</p>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`<motion.circle
  cx="100"
  cy="100"
  r="80"
  stroke="#ff0088"
  variants={draw}
  custom={1} // Delay multiplier
  style={shape}
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-pink-500">Colors</h3>
                <p className="text-gray-700 mb-2">The component uses three accent colors:</p>
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#ff0088" }}></div>
                    <span className="text-sm text-gray-600">#ff0088 (Pink)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#8df0cc" }}></div>
                    <span className="text-sm text-gray-600">#8df0cc (Cyan)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#0d63f8" }}></div>
                    <span className="text-sm text-gray-600">#0d63f8 (Blue)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-pink-500">Spring Animation</h3>
                <p className="text-gray-600">
                  Uses spring-based transitions for natural, physics-based drawing animations.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-cyan-500">Sequential Drawing</h3>
                <p className="text-gray-600">
                  Each shape draws sequentially with customizable delays using the custom prop.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">Path Length Animation</h3>
                <p className="text-gray-600">
                  Animates the pathLength property from 0 to 1 for smooth drawing effects.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-pink-500">Responsive SVG</h3>
                <p className="text-gray-600">
                  SVG scales responsively with maxWidth: 80vw for all screen sizes.
                </p>
              </div>
            </div>
          </section>

          {/* Files Location */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Files Location</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-2">
              <p className="text-gray-700">
                <span className="text-pink-500 font-semibold">Component:</span>{" "}
                <code className="text-pink-500 bg-pink-50 px-2 py-1 rounded">components/ui/path-drawing.tsx</code>
              </p>
              <p className="text-gray-700">
                <span className="text-pink-500 font-semibold">Demo:</span>{" "}
                <code className="text-pink-500 bg-pink-50 px-2 py-1 rounded">components/marketing/PathDrawingDemo.tsx</code>
              </p>
            </div>
          </section>

          {/* Source Attribution */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Source</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-2">Component adapted from:</p>
              <a
                href="https://motion.dev/docs/react-path-drawing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 underline transition-colors"
              >
                Motion (Framer Motion) - SVG Path Drawing
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
