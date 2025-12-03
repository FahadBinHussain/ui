import { AnimatedTestimonialsDemo } from "@/components/marketing/AnimatedTestimonialsDemo";

export default function TestimonialsShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">Animated Testimonials</h1>
        <p className="text-muted-foreground mb-12">
          Beautiful testimonial carousel with 3D card stacking animations
        </p>

        {/* Live Demo */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Live Demo</h2>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg">
            <AnimatedTestimonialsDemo />
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
                <pre className="text-sm"><code>{`// components/ui/animated-testimonials.tsx
"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  // Animated testimonials carousel with 3D stacking
  // Full code in: components/ui/animated-testimonials.tsx
};`}</code></pre>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-lg font-medium mb-2">2. Use in your component</h3>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote: "This is amazing!",
    name: "John Doe",
    designation: "CEO at Company",
    src: "/image.jpg",
  },
  // Add more testimonials...
];

export function MyTestimonials() {
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}`}</code></pre>
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
                  <td className="p-4 font-mono text-sm">testimonials</td>
                  <td className="p-4 text-sm">Testimonial[]</td>
                  <td className="p-4 text-sm">required</td>
                  <td className="p-4 text-sm">Array of testimonial objects</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">autoplay</td>
                  <td className="p-4 text-sm">boolean</td>
                  <td className="p-4 text-sm">false</td>
                  <td className="p-4 text-sm">Auto-advance testimonials (5s interval)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Files Location */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">📁 Files Location</h3>
          <ul className="space-y-2 text-sm">
            <li><code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">components/ui/animated-testimonials.tsx</code> - Base component</li>
            <li><code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">components/marketing/AnimatedTestimonialsDemo.tsx</code> - Example usage</li>
          </ul>
        </div>

        {/* Source */}
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🔗 Source</h3>
          <p className="text-sm text-muted-foreground mb-2">Original component from:</p>
          <a 
            href="https://ui.aceternity.com/components/animated-testimonials"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-green-700 dark:text-green-400 hover:underline"
          >
            Aceternity UI - Animated Testimonials →
          </a>
        </div>
      </div>
    </div>
  );
}
