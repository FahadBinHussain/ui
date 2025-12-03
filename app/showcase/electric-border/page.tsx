import { ElectricBorderDemo } from "@/components/marketing/ElectricBorderDemo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ElectricBorderShowcase() {
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
            Electric Border Component
          </h1>
          <p className="text-xl text-gray-300">
            A dramatic animated border effect with electric glow using SVG filters and CSS blend modes. Perfect for emphasizing important content.
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Live Demo
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <ElectricBorderDemo />
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
                      {`import { ElectricBorder } from "@/components/ui/electric-border";`}
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
                    Use with default styling
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`<ElectricBorder />`}
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
                    Customize with props
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`<ElectricBorder 
  title="Custom Title"
  description="Your description"
  borderColor="#8b5cf6"
  glowColor="#a78bfa"
  backgroundColor="#1e1b4b"
  labelVisible={true}
  label="Featured"
/>`}
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
                  <td className="p-4 font-mono text-purple-300">title</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"Electric Border"</td>
                  <td className="p-4 text-gray-300">Main title text</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">titleVisible</td>
                  <td className="p-4 text-gray-300">boolean</td>
                  <td className="p-4 text-gray-400">true</td>
                  <td className="p-4 text-gray-300">Show/hide title</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">titleColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#ffffff"</td>
                  <td className="p-4 text-gray-300">Title text color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">description</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"In case you'd like..."</td>
                  <td className="p-4 text-gray-300">Description text</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">descriptionVisible</td>
                  <td className="p-4 text-gray-300">boolean</td>
                  <td className="p-4 text-gray-400">true</td>
                  <td className="p-4 text-gray-300">Show/hide description</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">descriptionColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#ffffff80"</td>
                  <td className="p-4 text-gray-300">Description text color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">label</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"Dramatic"</td>
                  <td className="p-4 text-gray-300">Label badge text</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">labelVisible</td>
                  <td className="p-4 text-gray-300">boolean</td>
                  <td className="p-4 text-gray-400">false</td>
                  <td className="p-4 text-gray-300">Show/hide label</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">labelColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#ffffff80"</td>
                  <td className="p-4 text-gray-300">Label text color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">borderColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#dd8448"</td>
                  <td className="p-4 text-gray-300">Main border color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">glowColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#dd8448"</td>
                  <td className="p-4 text-gray-300">Glow effect color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">backgroundColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#252525"</td>
                  <td className="p-4 text-gray-300">Card background</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">gradientColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"#dd8448"</td>
                  <td className="p-4 text-gray-300">Gradient overlay color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">shadowColor</td>
                  <td className="p-4 text-gray-300">string</td>
                  <td className="p-4 text-gray-400">"rgba(0,0,0,0.5)"</td>
                  <td className="p-4 text-gray-300">Box shadow color</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">borderRadius</td>
                  <td className="p-4 text-gray-300">number</td>
                  <td className="p-4 text-gray-400">24</td>
                  <td className="p-4 text-gray-300">Border radius in pixels</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">width</td>
                  <td className="p-4 text-gray-300">string | number</td>
                  <td className="p-4 text-gray-400">"350px"</td>
                  <td className="p-4 text-gray-300">Card width</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">height</td>
                  <td className="p-4 text-gray-300">string | number</td>
                  <td className="p-4 text-gray-400">"500px"</td>
                  <td className="p-4 text-gray-300">Card height</td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">children</td>
                  <td className="p-4 text-gray-300">ReactNode</td>
                  <td className="p-4 text-gray-400">-</td>
                  <td className="p-4 text-gray-300">Custom content to render</td>
                </tr>
              </tbody>
            </table>
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
                  /components/ui/electric-border.tsx
                </code>
                <span className="text-gray-400">- Main component</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📄</span>
                <code className="bg-gray-900 px-3 py-1 rounded text-sm">
                  /components/marketing/ElectricBorderDemo.tsx
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
            This component is adapted from Framer's Electric Border component
          </p>
          <a
            href="https://www.framer.com/marketplace/components/electric-border-card/"
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
