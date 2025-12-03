import { ThreeDCardDemo } from "@/components/marketing/ThreeDCardDemo";

export default function CardsShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">3D Card Components</h1>
        <p className="text-muted-foreground mb-12">
          Interactive cards with CSS 3D perspective effects
        </p>
        
        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Live Demo</h2>
          <div className="flex items-center justify-center min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
            <ThreeDCardDemo />
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
                <pre className="text-sm"><code>{`// components/ui/3d-card.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useState, useContext, useRef, useEffect } from "react";

export const CardContainer = ({ children, className, containerClassName }) => {
  // 3D card container with perspective
  // Full code in: components/ui/3d-card.tsx
};

export const CardBody = ({ children, className }) => {
  // Card body wrapper
};

export const CardItem = ({ 
  as = "div", 
  children, 
  className, 
  translateZ = 0,
  // ... other transform props
}) => {
  // Individual card items with 3D transforms
};`}</code></pre>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-lg font-medium mb-2">2. Use in your component</h3>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function MyCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 dark:bg-black border rounded-xl p-6">
        <CardItem
          translateZ="50"
          className="text-xl font-bold"
        >
          Your Title Here
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm mt-2"
        >
          Your description text
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/your-image.jpg"
            className="h-60 w-full object-cover rounded-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}`}</code></pre>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-lg font-medium mb-2">3. Customize transform values</h3>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`<CardItem
  translateZ={100}    // Move forward on Z axis
  translateX={10}     // Move right on X axis
  translateY={-5}     // Move up on Y axis
  rotateX={5}         // Rotate around X axis
  rotateY={10}        // Rotate around Y axis
  className="..."
>
  Content
</CardItem>`}</code></pre>
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
                  <th className="text-left p-4">Component</th>
                  <th className="text-left p-4">Prop</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-mono text-sm">CardContainer</td>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm">string</td>
                  <td className="p-4 text-sm">Additional classes for the card</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">CardContainer</td>
                  <td className="p-4 font-mono text-sm">containerClassName</td>
                  <td className="p-4 text-sm">string</td>
                  <td className="p-4 text-sm">Classes for the outer wrapper</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">CardItem</td>
                  <td className="p-4 font-mono text-sm">translateZ</td>
                  <td className="p-4 text-sm">number</td>
                  <td className="p-4 text-sm">Z-axis translation (depth)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">CardItem</td>
                  <td className="p-4 font-mono text-sm">translateX/Y</td>
                  <td className="p-4 text-sm">number</td>
                  <td className="p-4 text-sm">X/Y-axis translation</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">CardItem</td>
                  <td className="p-4 font-mono text-sm">as</td>
                  <td className="p-4 text-sm">ElementType</td>
                  <td className="p-4 text-sm">Render as different HTML element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Files Location */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">📁 Files Location</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">components/ui/3d-card.tsx</code> - Base component</li>
            <li><code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">components/marketing/ThreeDCardDemo.tsx</code> - Example usage</li>
          </ul>
        </div>

        {/* Source */}
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🔗 Source</h3>
          <p className="text-sm text-muted-foreground mb-2">Original component from:</p>
          <a 
            href="https://ui.aceternity.com/components/3d-card-effect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-green-700 dark:text-green-400 hover:underline"
          >
            Aceternity UI - 3D Card Effect →
          </a>
        </div>
      </div>
    </div>
  );
}
