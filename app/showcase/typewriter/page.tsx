import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TypeWriterDemo } from "@/components/marketing/TypeWriterDemo";

export default function TypeWriterShowcase() {
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          TypeWriter Effect
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Animated typewriter effect with GSAP and ScrollTrigger. Features both static and dynamic rotating text 
          with customizable typing and deletion speeds.
        </p>
      </div>

      {/* Live Demo */}
      <div className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 overflow-x-hidden">
        <TypeWriterDemo />
      </div>

      {/* Documentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Usage */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Usage</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-500">1. Install Dependencies</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">pnpm add gsap @gsap/react</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-500">2. Add Animation to globals.css</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`@keyframes blink-border {
  0%, 70%, 100% {
    border-color: white;
  }
  20%, 50% {
    border-color: black;
  }
}

--animate-blink-border: blink-border 1s infinite;`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-500">3. Add mergeRefs to utils</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && "current" in ref) {
        ;(ref as React.MutableRefObject<T | null>).current = node
      }
    })
  }
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-500">4. Copy Component</h3>
                <p className="text-gray-600 mb-2">
                  Create <code className="text-blue-500 bg-blue-50 px-1 py-0.5 rounded">components/ui/typewriter.tsx</code>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-500">5. Import and Use</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`import { TypeWriter } from "@/components/ui/typewriter";

const staticText = [
  { text: "We are" },
  { text: "Unizoy", className: "text-green-500" },
];

const dynamicText = [
  { text: "Passionately", className: "text-blue-500" },
  { text: "Eagerly", className: "text-blue-500" },
];

<TypeWriter
  className="text-5xl font-bold"
  staticText={staticText}
  textArray={dynamicText}
  arrayInterval={3000}
  deleteSpeed={0.1}
/>`}</code>
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
                    <th className="text-left p-4 font-semibold text-blue-500">Prop</th>
                    <th className="text-left p-4 font-semibold text-blue-500">Type</th>
                    <th className="text-left p-4 font-semibold text-blue-500">Default</th>
                    <th className="text-left p-4 font-semibold text-blue-500">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">staticText</td>
                    <td className="p-4 text-gray-600">TextAndClass[]</td>
                    <td className="p-4 text-gray-600">-</td>
                    <td className="p-4 text-gray-700">Array of static text with optional className</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">textArray</td>
                    <td className="p-4 text-gray-600">TextAndClass[]</td>
                    <td className="p-4 text-gray-600">undefined</td>
                    <td className="p-4 text-gray-700">Array of dynamic rotating text with optional className</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">delay</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-600">0</td>
                    <td className="p-4 text-gray-700">Delay before animation starts (seconds)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">duration</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-600">0.5</td>
                    <td className="p-4 text-gray-700">Duration for static text reveal animation</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">ease</td>
                    <td className="p-4 text-gray-600">gsap.EaseString</td>
                    <td className="p-4 text-gray-600">"none"</td>
                    <td className="p-4 text-gray-700">GSAP easing function</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">arrayInterval</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-600">3000</td>
                    <td className="p-4 text-gray-700">Time between text rotations (milliseconds)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">deleteSpeed</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-600">0.1</td>
                    <td className="p-4 text-gray-700">Speed of typing/deleting characters (seconds)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">start</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">"top 90%"</td>
                    <td className="p-4 text-gray-700">ScrollTrigger start position</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-blue-500 font-mono text-sm">end</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">"top"</td>
                    <td className="p-4 text-gray-700">ScrollTrigger end position</td>
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
                <h3 className="text-xl font-semibold mb-3 text-blue-500">GSAP Powered</h3>
                <p className="text-gray-600">
                  Uses GSAP and ScrollTrigger for smooth, performant animations with scroll-based activation.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">Rotating Text</h3>
                <p className="text-gray-600">
                  Support for dynamic rotating text that types, pauses, and deletes automatically.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">Custom Styling</h3>
                <p className="text-gray-600">
                  Apply different className to each text segment for colored, styled text effects.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">Blinking Cursor</h3>
                <p className="text-gray-600">
                  Animated border cursor that blinks to simulate a real typewriter effect.
                </p>
              </div>
            </div>
          </section>

          {/* Files Location */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Files Location</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-2">
              <p className="text-gray-700">
                <span className="text-blue-500 font-semibold">Component:</span>{" "}
                <code className="text-blue-500 bg-blue-50 px-2 py-1 rounded">components/ui/typewriter.tsx</code>
              </p>
              <p className="text-gray-700">
                <span className="text-blue-500 font-semibold">Demo:</span>{" "}
                <code className="text-blue-500 bg-blue-50 px-2 py-1 rounded">components/marketing/TypeWriterDemo.tsx</code>
              </p>
            </div>
          </section>

          {/* Source Attribution */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Source</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-2">Component adapted from:</p>
              <a
                href="https://ui.unizoy.com/docs/components/typewriter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline transition-colors"
              >
                Unizoy UI - TypeWriter Component
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
