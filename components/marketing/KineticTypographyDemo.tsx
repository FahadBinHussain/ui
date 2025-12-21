"use client";

import { KineticTypography, RopeText, ElasticHeadline, ChainReactionText, StiffRope, LooseRope } from "@/components/ui/kinetic-typography";

export default function KineticTypographyDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Kinetic Typography
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
              Interactive text where letters are connected by elastic physics strings
            </p>
            <p className="text-lg text-gray-500">
              Drag any letter to create a chain reaction of movement
            </p>
          </div>
          
          {/* Interactive Hero Demo */}
          <div className="w-full h-[400px] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl border border-purple-500/20 overflow-hidden">
            <RopeText text="DRAG ME AROUND" fontSize={80} />
          </div>
        </div>
      </section>

      {/* Variants Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Typography Variations</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Elastic Headline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Elastic Headline</h3>
                <span className="text-sm text-gray-500 px-3 py-1 bg-gray-800 rounded-full">
                  Medium Stiffness
                </span>
              </div>
              <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-2xl">
                <ElasticHeadline text="ELASTIC" />
              </div>
              <p className="text-gray-400">
                Gradient text with bouncy physics and moderate spring constraints
              </p>
            </div>

            {/* Chain Reaction */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Chain Reaction</h3>
                <span className="text-sm text-gray-500 px-3 py-1 bg-gray-800 rounded-full">
                  Rectangular Bodies
                </span>
              </div>
              <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-2xl border border-emerald-500/20">
                <ChainReactionText text="CHAIN REACTION" />
              </div>
              <p className="text-gray-400">
                Rectangle-based physics with glowing text effect and chain links
              </p>
            </div>
          </div>

          {/* Stiffness Comparison */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Spring Stiffness Comparison</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Stiff Rope */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-bold text-amber-400">Stiff Rope</h4>
                  <code className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded">
                    stiffness: 0.8
                  </code>
                </div>
                <div className="w-full h-[200px] bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl overflow-hidden border border-amber-500/30">
                  <StiffRope text="STIFF" />
                </div>
                <p className="text-gray-400 text-sm">
                  High stiffness creates tight connections. Letters stay close together and respond quickly.
                </p>
              </div>

              {/* Loose Rope */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-bold text-pink-400">Loose Rope</h4>
                  <code className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded">
                    stiffness: 0.15
                  </code>
                </div>
                <div className="w-full h-[200px] bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-xl overflow-hidden border border-pink-500/30">
                  <LooseRope text="LOOSE" />
                </div>
                <p className="text-gray-400 text-sm">
                  Low stiffness allows dramatic stretching. Letters can pull far apart with elastic motion.
                </p>
              </div>
            </div>
          </div>

          {/* Custom Examples */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center mb-8">Custom Configurations</h3>
            
            {/* Large Interactive */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-2xl font-bold">Interactive Headline</h4>
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">fontSize: 72px</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">stiffness: 0.4</span>
                </div>
              </div>
              <div className="w-full h-[350px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <KineticTypography
                  text="INTERACTIVE TEXT"
                  fontSize={72}
                  fontWeight={800}
                  color="#a78bfa"
                  stiffness={0.4}
                  anchorStiffness={0.02}
                />
              </div>
              <p className="text-gray-400">
                Balanced physics with medium spring stiffness and gentle anchor constraints
              </p>
            </div>

            {/* Compact Version */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-2xl font-bold">Compact Mode</h4>
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">fontSize: 48px</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">tight spacing</span>
                </div>
              </div>
              <div className="w-full h-[250px] bg-gradient-to-br from-cyan-950 to-blue-950 rounded-xl overflow-hidden border border-cyan-800">
                <KineticTypography
                  text="COMPACT"
                  fontSize={48}
                  fontWeight={700}
                  color="#22d3ee"
                  stiffness={0.6}
                  anchorStiffness={0.025}
                />
              </div>
              <p className="text-gray-400">
                Smaller font size with tighter springs for subtle interactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-3">Physics Bodies</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Each letter is converted into a rigid body in a Matter.js physics world. 
                Circular bodies provide smooth rotation and natural movement.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-3">Spring Constraints</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Letters are connected with spring constraints (stiffness &lt; 1). 
                This creates the elastic rope effect where pulling one letter affects its neighbors.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Anchor Springs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Each letter has a weak spring attached to its home position. 
                When released, letters snap back smoothly to their original locations.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🖱️</div>
              <h3 className="text-xl font-bold mb-3">Mouse Constraint</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Matter.js mouse constraint allows users to grab and drag any letter. 
                The physics engine handles collision detection and interaction automatically.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3">Sync Loop</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every frame, CSS transforms (translate & rotate) are updated to match 
                the physics body positions and angles, creating seamless DOM synchronization.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Customizable</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adjust stiffness, anchor strength, font size, colors, and gravity to create 
                unique typography behaviors from bouncy to dramatic stretching effects.
              </p>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-12 bg-slate-950 rounded-xl p-8 border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💻</span> Usage Example
            </h3>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`import { KineticTypography } from "@/components/ui/kinetic-typography";

<KineticTypography
  text="DRAG ME"
  fontSize={72}
  fontWeight={800}
  color="#a78bfa"
  stiffness={0.4}
  anchorStiffness={0.02}
/>`}</code>
            </pre>
          </div>

          {/* Props Table */}
          <div className="mt-8 bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <h3 className="text-xl font-bold mb-6">Component Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="pb-3 font-semibold">Prop</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Default</th>
                    <th className="pb-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-3"><code className="text-purple-400">text</code></td>
                    <td className="py-3">string</td>
                    <td className="py-3">"KINETIC"</td>
                    <td className="py-3">The text content to render</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3"><code className="text-purple-400">fontSize</code></td>
                    <td className="py-3">number</td>
                    <td className="py-3">72</td>
                    <td className="py-3">Font size in pixels</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3"><code className="text-purple-400">stiffness</code></td>
                    <td className="py-3">number</td>
                    <td className="py-3">0.4</td>
                    <td className="py-3">Spring stiffness between letters (0-1)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3"><code className="text-purple-400">anchorStiffness</code></td>
                    <td className="py-3">number</td>
                    <td className="py-3">0.02</td>
                    <td className="py-3">Anchor spring stiffness (lower = more drift)</td>
                  </tr>
                  <tr>
                    <td className="py-3"><code className="text-purple-400">color</code></td>
                    <td className="py-3">string</td>
                    <td className="py-3">"#000000"</td>
                    <td className="py-3">Text color (hex or CSS color)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Try It Yourself</h2>
            <p className="text-gray-400 text-lg">
              Click and drag any letter to see the elastic rope physics in action
            </p>
          </div>
          
          <div className="w-full h-[500px] bg-gradient-to-br from-violet-950 via-fuchsia-950 to-pink-950 rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl">
            <KineticTypography
              text="PHYSICS IS FUN"
              fontSize={64}
              fontWeight={900}
              color="#ffffff"
              stiffness={0.35}
              anchorStiffness={0.018}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
