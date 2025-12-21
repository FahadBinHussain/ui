"use client";

import React from "react";
import { Cloth, FlagSimulation, SilkCurtain } from "@/components/ui/cloth-simulation";

export default function ClothSimulationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              Interactive Cloth Simulation
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Realistic fabric physics using <span className="text-cyan-400">Verlet Integration</span>.
              Create silk flags, curtains, and draggable cloth with natural draping and interaction.
            </p>
          </div>

          {/* Main Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  Drag the Fabric
                </h3>
                <p className="text-slate-400">
                  Click and drag anywhere on the cloth to interact with it
                </p>
              </div>
              <FlagSimulation className="w-full h-[500px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simulation Variants</h2>
            <p className="text-slate-400 text-lg">
              Different configurations for various use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fine Mesh */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Fine Mesh (High Detail)
              </h3>
              <div className="bg-slate-950 rounded-xl overflow-hidden mb-4">
                <Cloth
                  width={60}
                  height={45}
                  spacing={6}
                  gravity={0.5}
                  imageUrl="https://picsum.photos/id/1019/600/450"
                />
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>• 60×45 point grid (2,700 points)</p>
                <p>• Spacing: 6px for smooth deformation</p>
                <p>• Best for detailed textures</p>
              </div>
            </div>

            {/* Coarse Mesh */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                Coarse Mesh (Performance)
              </h3>
              <div className="bg-slate-950 rounded-xl overflow-hidden mb-4">
                <Cloth
                  width={30}
                  height={20}
                  spacing={12}
                  gravity={0.5}
                  imageUrl="https://picsum.photos/id/1020/300/200"
                />
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>• 30×20 point grid (600 points)</p>
                <p>• Spacing: 12px for better performance</p>
                <p>• Best for mobile/low-end devices</p>
              </div>
            </div>

            {/* Light Fabric */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                Light Fabric (Low Gravity)
              </h3>
              <div className="bg-slate-950 rounded-xl overflow-hidden mb-4">
                <Cloth
                  width={45}
                  height={35}
                  spacing={8}
                  gravity={0.2}
                  imageUrl="https://picsum.photos/id/1021/450/350"
                />
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>• Gravity: 0.2 (gentle fall)</p>
                <p>• Floaty, silk-like behavior</p>
                <p>• Great for banners and flags</p>
              </div>
            </div>

            {/* Heavy Fabric */}
            <div className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">
                Heavy Fabric (High Gravity)
              </h3>
              <div className="bg-slate-950 rounded-xl overflow-hidden mb-4">
                <Cloth
                  width={45}
                  height={35}
                  spacing={8}
                  gravity={1.2}
                  imageUrl="https://picsum.photos/id/1022/450/350"
                />
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>• Gravity: 1.2 (strong pull)</p>
                <p>• Heavy, denim-like behavior</p>
                <p>• Realistic curtain draping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">
              Understanding Verlet Integration and constraint solving
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Grid Setup
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Create a 2D array of Point objects with position and old position.
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-cyan-300">
                <div>{"point = {"}</div>
                <div className="ml-2">x, y,</div>
                <div className="ml-2">oldX, oldY,</div>
                <div className="ml-2">pinned: y === 0</div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Verlet Integration
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Calculate velocity implicitly from position history.
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-purple-300">
                <div>vx = x - oldX</div>
                <div>vy = y - oldY</div>
                <div className="mt-2">oldX = x</div>
                <div>oldY = y</div>
                <div className="mt-2">x += vx * 0.99</div>
                <div>y += vy * 0.99 + g</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-blue-500/30 p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Constraints
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Maintain fixed distance between connected points.
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-blue-300">
                <div>dx = p2.x - p1.x</div>
                <div>dy = p2.y - p1.y</div>
                <div>dist = sqrt(dx² + dy²)</div>
                <div className="mt-2">diff = len - dist</div>
                <div>offset = diff / dist / 2</div>
                <div className="mt-2">p1 -= offset * dx</div>
                <div>p2 += offset * dx</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-green-500/30 p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-400">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Mouse Interaction
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Find nearest point within radius and override position.
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-green-300">
                <div>dx = p.x - mouse.x</div>
                <div>dy = p.y - mouse.y</div>
                <div>dist = sqrt(dx² + dy²)</div>
                <div className="mt-2">if (dist {"<"} radius) {"{"}</div>
                <div className="ml-2">p.x = mouse.x</div>
                <div className="ml-2">p.y = mouse.y</div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Usage Example</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`import { Cloth, FlagSimulation } from "@/components/ui/cloth-simulation";

// Basic cloth with custom parameters
<Cloth
  width={50}        // Grid width (points)
  height={35}       // Grid height (points)
  spacing={8}       // Distance between points (px)
  gravity={0.6}     // Gravity strength
  imageUrl="/flag.jpg"  // Texture image
/>

// Pre-configured flag simulation
<FlagSimulation imageUrl="/logo.png" />

// Without texture (wireframe mode)
<Cloth width={40} height={30} spacing={10} gravity={0.5} />
`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Component Props</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-cyan-400">Prop</th>
                  <th className="px-6 py-4 text-left text-cyan-400">Type</th>
                  <th className="px-6 py-4 text-left text-cyan-400">Default</th>
                  <th className="px-6 py-4 text-left text-cyan-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-purple-400">width</td>
                  <td className="px-6 py-4 text-sm text-slate-300">number</td>
                  <td className="px-6 py-4 text-sm text-slate-400">40</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Grid width (number of points horizontally)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-purple-400">height</td>
                  <td className="px-6 py-4 text-sm text-slate-300">number</td>
                  <td className="px-6 py-4 text-sm text-slate-400">30</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Grid height (number of points vertically)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-purple-400">spacing</td>
                  <td className="px-6 py-4 text-sm text-slate-300">number</td>
                  <td className="px-6 py-4 text-sm text-slate-400">10</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Distance between points in pixels
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-purple-400">gravity</td>
                  <td className="px-6 py-4 text-sm text-slate-300">number</td>
                  <td className="px-6 py-4 text-sm text-slate-400">0.5</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Gravity force (higher = heavier fabric)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-purple-400">imageUrl</td>
                  <td className="px-6 py-4 text-sm text-slate-300">string</td>
                  <td className="px-6 py-4 text-sm text-slate-400">undefined</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Image URL for texture mapping (wireframe if omitted)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-sm text-purple-400">className</td>
                  <td className="px-6 py-4 text-sm text-slate-300">string</td>
                  <td className="px-6 py-4 text-sm text-slate-400">""</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Additional CSS classes for container
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/30 p-8">
              <div className="text-4xl mb-4">🚩</div>
              <h3 className="text-2xl font-semibold mb-3">Hero Flags</h3>
              <p className="text-slate-400">
                Dynamic brand flags and banners that respond to user interaction with realistic physics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30 p-8">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold mb-3">Creative Portfolios</h3>
              <p className="text-slate-400">
                Interactive gallery with draggable fabric reveals and artistic cloth transitions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl border border-blue-500/30 p-8">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-2xl font-semibold mb-3">Game Interfaces</h3>
              <p className="text-slate-400">
                Immersive UI elements like curtains, capes, and dynamic backgrounds with physics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
