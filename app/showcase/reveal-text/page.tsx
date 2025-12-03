import { RevealTextDemo } from "@/components/marketing/RevealTextDemo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RevealTextShowcase() {
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
            Reveal Text Component
          </h1>
          <p className="text-xl text-gray-300">
            Interactive text with hover image reveals and gradient effects. Images animate smoothly with GSAP elastic animations.
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Live Demo
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <RevealTextDemo />
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
                    Import the component
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`import { RevealText } from "@/components/ui/reveal-text";`}
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
                    Use with gradient variants
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`<RevealText variant="gradient1">
  Hover Me
</RevealText>`}
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
                    Add image reveal and link
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`<RevealText 
  variant="gradient7"
  image="/your-image.jpg"
  href="https://example.com"
  hoverImageClass="border-green-400"
>
  Visit Us
</RevealText>`}
                    </code>
                  </pre>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Props Reference */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Props Reference
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20">
            <table className="w-full">
              <thead className="bg-purple-900/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Default</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/20">
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">children</td>
                  <td className="p-4 text-gray-300">ReactNode</td>
                  <td className="p-4 text-gray-400">-</td>
                  <td className="p-4 text-gray-300">Text content to display</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">variant</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"black"</td>
                  <td className="p-4 text-gray-300">Color variant (black, gradient0-8)</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">className</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">""</td>
                  <td className="p-4 text-gray-300">Additional CSS classes</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">image</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">undefined</td>
                  <td className="p-4 text-gray-300">Image URL to reveal on hover</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">hoverImageClass</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">undefined</td>
                  <td className="p-4 text-gray-300">Custom classes for hover image (e.g., border color)</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">href</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">undefined</td>
                  <td className="p-4 text-gray-300">URL to link to (opens in new tab)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Gradient Variants */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Available Gradients
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient0:</span>
                <span className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 text-transparent bg-clip-text font-bold">Gray Scale</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient1:</span>
                <span className="bg-gradient-to-br from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">Purple Pink</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient2:</span>
                <span className="bg-gradient-to-r from-blue-500 via-green-400 to-teal-500 text-transparent bg-clip-text font-bold">Blue Teal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient3:</span>
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text font-bold">Sunset</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient4:</span>
                <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-transparent bg-clip-text font-bold">Fire</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient5:</span>
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">Indigo Purple</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient6:</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text font-bold">Ocean</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient7:</span>
                <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500 text-transparent bg-clip-text font-bold">Forest</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-purple-300">gradient8:</span>
                <span className="bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 text-transparent bg-clip-text font-bold">Rose</span>
              </div>
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
                  /components/ui/reveal-text.tsx
                </code>
                <span className="text-gray-400">- Main component</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📄</span>
                <code className="bg-gray-900 px-3 py-1 rounded text-sm">
                  /components/marketing/RevealTextDemo.tsx
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
            href="https://ui.unizoy.com/docs/components/reveal-text"
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
