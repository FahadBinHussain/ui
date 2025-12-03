import { ContainerTextFlipDemo } from "@/components/marketing/ContainerTextFlipDemo";

export default function TextAnimationsShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Text Animations</h1>
        <p className="text-muted-foreground mb-12">
          Dynamic text animations with Motion (Framer Motion)
        </p>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Live Demo</h2>
          <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
            <ContainerTextFlipDemo />
          </div>
        </div>

        {/* Usage */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <p className="text-muted-foreground mb-4">
            Copy the component files and use them in your project:
          </p>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="text-lg font-medium mb-2">1. Copy the base component</h3>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`// components/ui/container-text-flip.tsx
"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}) {
  // Animated text flip with dynamic width
  // Full code in: components/ui/container-text-flip.tsx
};`}</code></pre>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-lg font-medium mb-2">2. Use in your component</h3>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`"use client";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export function MyComponent() {
  return (
    <ContainerTextFlip
      words={["better", "modern", "awesome"]}
    />
  );
}`}</code></pre>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-lg font-medium mb-2">3. Customize props</h3>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`<ContainerTextFlip
  words={["fast", "reliable", "scalable"]}
  interval={2000}
  animationDuration={500}
  className="text-2xl"
  textClassName="font-black"
/>`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Props Reference */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Props Reference</h2>
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Prop</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Default</th>
                  <th className="text-left p-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-mono text-sm">words</td>
                  <td className="p-4 text-sm">string[]</td>
                  <td className="p-4 text-sm">["better", "modern", ...]</td>
                  <td className="p-4 text-sm">Array of words to cycle through</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">interval</td>
                  <td className="p-4 text-sm">number</td>
                  <td className="p-4 text-sm">3000</td>
                  <td className="p-4 text-sm">Time in ms between transitions</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">animationDuration</td>
                  <td className="p-4 text-sm">number</td>
                  <td className="p-4 text-sm">700</td>
                  <td className="p-4 text-sm">Duration of transition animation in ms</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional classes for container</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">textClassName</td>
                  <td className="p-4 text-sm">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional classes for text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Files Location */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">📁 Files Location</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">components/ui/container-text-flip.tsx</code> - Base component</li>
            <li><code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">components/marketing/ContainerTextFlipDemo.tsx</code> - Example usage</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
