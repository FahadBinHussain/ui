import { LensDemo } from "@/components/marketing/LensDemo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LensShowcase() {
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
            Lens Component
          </h1>
          <p className="text-xl text-gray-300">
            A beautiful magnifying glass lens effect with smooth animations. Hover over the image to zoom in with a lens effect.
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-purple-300">
            Live Demo
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <LensDemo />
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
                      {`import { Lens } from "@/components/ui/lens";`}
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
                    Use in your component
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`const [hovering, setHovering] = useState(false);

<Lens hovering={hovering} setHovering={setHovering}>
  <img src="/your-image.jpg" alt="demo" />
</Lens>`}
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
                    Customize with props (all optional)
                  </p>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300">
                      {`<Lens 
  zoomFactor={2} 
  lensSize={200}
  isStatic={false}
>
  {children}
</Lens>`}
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
                  <td className="p-4 text-gray-300">
                    Content to display inside the lens
                  </td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">zoomFactor</td>
                  <td className="p-4 text-gray-300">number</td>
                  <td className="p-4 text-gray-400">1.5</td>
                  <td className="p-4 text-gray-300">
                    The zoom level of the lens effect
                  </td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">lensSize</td>
                  <td className="p-4 text-gray-300">number</td>
                  <td className="p-4 text-gray-400">170</td>
                  <td className="p-4 text-gray-300">
                    The diameter of the lens in pixels
                  </td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">position</td>
                  <td className="p-4 text-gray-300">{`{ x: number; y: number }`}</td>
                  <td className="p-4 text-gray-400">{`{ x: 200, y: 150 }`}</td>
                  <td className="p-4 text-gray-300">
                    Static lens position (only used when isStatic is true)
                  </td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">isStatic</td>
                  <td className="p-4 text-gray-300">boolean</td>
                  <td className="p-4 text-gray-400">false</td>
                  <td className="p-4 text-gray-300">
                    If true, lens stays at fixed position; if false, follows mouse
                  </td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">hovering</td>
                  <td className="p-4 text-gray-300">boolean</td>
                  <td className="p-4 text-gray-400">undefined</td>
                  <td className="p-4 text-gray-300">
                    Controlled hover state (use with setHovering)
                  </td>
                </tr>
                <tr className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-mono text-purple-300">setHovering</td>
                  <td className="p-4 text-gray-300">{`(hovering: boolean) => void`}</td>
                  <td className="p-4 text-gray-400">undefined</td>
                  <td className="p-4 text-gray-300">
                    Callback for controlled hover state
                  </td>
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
                  /components/ui/lens.tsx
                </code>
                <span className="text-gray-400">- Main component</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">📄</span>
                <code className="bg-gray-900 px-3 py-1 rounded text-sm">
                  /components/marketing/LensDemo.tsx
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
            This component is inspired by and adapted from Aceternity UI
          </p>
          <a
            href="https://ui.aceternity.com/components/lens"
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
