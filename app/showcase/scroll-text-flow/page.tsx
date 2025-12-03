import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollTextFlowDemo } from "@/components/marketing/ScrollTextFlowDemo";

export default function ScrollTextFlowShowcase() {
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
          Scroll Text Flow
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Scroll-triggered animated text and floating badge groups powered by GSAP ScrollTrigger. 
          Features pinning, word fade-in stagger, and sliding badge animations.
        </p>
      </div>

      {/* Live Demo */}
      <div className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 overflow-x-hidden">
        <ScrollTextFlowDemo />
      </div>

      {/* Documentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Usage */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Usage</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-rose-500">1. Install Dependencies</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">pnpm add gsap @gsap/react</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-rose-500">2. Copy Component</h3>
                <p className="text-gray-600 mb-2">
                  Create <code className="text-pink-500 bg-pink-50 px-1 py-0.5 rounded">components/ui/scroll-text-flow.tsx</code>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-rose-500">3. Import and Use</h3>
                <pre className="bg-white border border-gray-200 rounded p-4 overflow-x-auto">
                  <code className="text-sm text-gray-800">{`import ScrollTextFlow from "@/components/ui/scroll-text-flow";

const slideGroups = [
  [
    { name: "Innovation", style: "bg-[#CBBEDC] mt-2" },
    { name: "Excellence", style: "bg-[#F5CC53] ml-5" },
  ],
  [
    { name: "Growth", style: "bg-[#FF6B6B]" },
    { name: "Impact", style: "bg-[#4ECDC4]" },
  ],
];

<ScrollTextFlow
  heading="Design System 2025 — Success Designed Differently."
  subheading="We Spread the Innovation."
  slideGroups={slideGroups}
  topGroupCount={2}
  scrollTriggerStart="top top"
  scrollTriggerEnd="+=1500"
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
                    <th className="text-left p-4 font-semibold text-rose-500">Prop</th>
                    <th className="text-left p-4 font-semibold text-rose-500">Type</th>
                    <th className="text-left p-4 font-semibold text-rose-500">Default</th>
                    <th className="text-left p-4 font-semibold text-rose-500">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">heading</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">-</td>
                    <td className="p-4 text-gray-700">Main heading text (animates with word fade-in)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">subheading</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">-</td>
                    <td className="p-4 text-gray-700">Subheading text (animates with word fade-in)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">slideGroups</td>
                    <td className="p-4 text-gray-600">SlideItem[][]</td>
                    <td className="p-4 text-gray-600">-</td>
                    <td className="p-4 text-gray-700">2D array of badge objects with name and style</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">topGroupCount</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-600">2</td>
                    <td className="p-4 text-gray-700">Number of badge groups to show at top</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">scrollTriggerStart</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">"top 20%"</td>
                    <td className="p-4 text-gray-700">ScrollTrigger start position</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">scrollTriggerEnd</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">"+=1500"</td>
                    <td className="p-4 text-gray-700">ScrollTrigger end position</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">scrollScrub</td>
                    <td className="p-4 text-gray-600">number</td>
                    <td className="p-4 text-gray-600">1</td>
                    <td className="p-4 text-gray-700">ScrollTrigger scrub smoothness</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">scrollPin</td>
                    <td className="p-4 text-gray-600">boolean</td>
                    <td className="p-4 text-gray-600">true</td>
                    <td className="p-4 text-gray-700">Pin container during scroll</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">scrollPinSpacing</td>
                    <td className="p-4 text-gray-600">boolean</td>
                    <td className="p-4 text-gray-600">true</td>
                    <td className="p-4 text-gray-700">Add spacing for pinned element</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">groupsFromX</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">"0vw"</td>
                    <td className="p-4 text-gray-700">Initial x position for badge groups</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-pink-500 font-mono text-sm">groupsToX</td>
                    <td className="p-4 text-gray-600">string</td>
                    <td className="p-4 text-gray-600">"-100vw"</td>
                    <td className="p-4 text-gray-700">Final x position for badge groups</td>
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
                <h3 className="text-xl font-semibold mb-3 text-rose-500">GSAP ScrollTrigger</h3>
                <p className="text-gray-600">
                  Powered by GSAP ScrollTrigger for smooth scroll-based animations with pinning support.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-rose-500">Word Stagger Animation</h3>
                <p className="text-gray-600">
                  Heading and subheading words fade in sequentially with 0.3s stagger for dramatic effect.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-rose-500">Floating Badge Groups</h3>
                <p className="text-gray-600">
                  Badge groups slide left/right based on index with different speeds for depth perception.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-rose-500">Customizable Positioning</h3>
                <p className="text-gray-600">
                  Control top/bottom badge placement, scroll range, scrub speed, and animation distances.
                </p>
              </div>
            </div>
          </section>

          {/* Files Location */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Files Location</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-2">
              <p className="text-gray-700">
                <span className="text-rose-500 font-semibold">Component:</span>{" "}
                <code className="text-pink-500 bg-pink-50 px-2 py-1 rounded">components/ui/scroll-text-flow.tsx</code>
              </p>
              <p className="text-gray-700">
                <span className="text-rose-500 font-semibold">Demo:</span>{" "}
                <code className="text-pink-500 bg-pink-50 px-2 py-1 rounded">components/marketing/ScrollTextFlowDemo.tsx</code>
              </p>
            </div>
          </section>

          {/* Source Attribution */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-black">Source</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-2">Component adapted from:</p>
              <a
                href="https://ui.unizoy.com/docs/components/scroll-text-flow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-500 hover:text-rose-600 underline transition-colors"
              >
                Unizoy UI - Scroll Text Flow Component
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
