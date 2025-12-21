"use client";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ComponentsListPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const allComponents = [
    {
      title: "3D Card Effects",
      description: "CSS 3D perspective cards with hover animations",
    },
    {
      title: "Animated Testimonials",
      description: "Beautiful testimonial carousel with 3D stacking",
    },
    {
      title: "Animated Tooltip",
      description: "Interactive profile tooltips with elastic GSAP animations",
    },
    {
      title: "Barba.js Transitions",
      description: "Smooth page transitions with Barba.js for SPA-like experience",
    },
    {
      title: "Bento Grid",
      description: "Modern, versatile grid layout for feature showcases",
    },
    {
      title: "Cloud Background",
      description: "Floating animated clouds with backdrop blur effects",
    },
    {
      title: "Crystal Fractal Backgrounds",
      description: "Geometric crystal formations that grow and refract light dynamically",
    },
    {
      title: "Electric Border",
      description: "Animated electric glow border with SVG filters",
    },
    {
      title: "Expanding Search",
      description: "Animated search bar that grows and reveals filters on focus",
    },
    {
      title: "Fluid Cursor",
      description: "Smooth spring-based cursor with trailing effects",
    },
    {
      title: "Global Stats",
      description: "Interactive 3D globe showing real-time data points",
    },
    {
      title: "Holographic Depth-Map Parallax",
      description: "Realistic depth-based parallax effect using static images and depth maps",
    },
    {
      title: "Infinite Marquee",
      description: "Seamlessly looping marquee for logos, text, or images",
    },
    {
      title: "Interactive Grid",
      description: "A grid of dots that react and pulsate as the mouse moves over them",
    },
    {
      title: "Lens Effect",
      description: "Magnifying glass lens effect with smooth zoom",
    },
    {
      title: "Magnetic Elements",
      description: "Tactile, physical 'pull' effect for buttons and objects",
    },
    {
      title: "Magnetic Field Interactions",
      description: "Elements that behave like magnets, attracting and repelling each other",
    },
    {
      title: "Neural Network Visualizer",
      description: "Animated neural networks showing data flow and activations",
    },
    {
      title: "Neumorphic Card",
      description: "Soft UI design with realistic shadows and highlights",
    },
    {
      title: "Particle Wave Interactions",
      description: "Interactive particle systems with wave-like mouse responses",
    },
    {
      title: "Quantum Loading States",
      description: "Electron orbital animations with quantum physics-inspired loading spinners",
    },
    {
      title: "Bio-Organic Growth Loaders",
      description: "SVG-based organic shapes growing like vines using differential growth algorithms",
    },
    {
      title: "Retro CRT",
      description: "Old school monitor effect with scanlines and curvature",
    },
    {
      title: "Bio-Luminescent Glow",
      description: "Organic pulsing glow effects mimicking deep-sea bioluminescence",
    },
    {
      title: "Reveal Text",
      description: "Text with hover image reveals and gradient effects",
    },
    {
      title: "SVG Path Drawing",
      description: "Animated SVG path drawing with spring-based transitions",
    },
    {
      title: "Scroll Text Flow",
      description: "Scroll-triggered animated text with floating badges",
    },
    {
      title: "Text Animations",
      description: "Dynamic text effects with Framer Motion",
    },
    {
      title: "Text Scramble",
      description: "High-energy text transition with scrambling characters",
    },
    {
      title: "Time Warp Transitions",
      description: "Page transitions with time dilation effects, speed lines, and color shifts",
    },
    {
      title: "TypeWriter Effect",
      description: "GSAP-powered typewriter with rotating text animation",
    },
    {
      title: "UI Components",
      description: "Basic building blocks - Buttons, Inputs, Cards, etc.",
    },
  ];

  const markdownList = allComponents
    .map(component => `- **${component.title}**: ${component.description}`)
    .join('\n');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownList);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyComponentToClipboard = async (component: typeof allComponents[0], index: number) => {
    try {
      const componentText = `- **${component.title}**: ${component.description}`;
      await navigator.clipboard.writeText(componentText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/showcase/all">
            <Button variant="blue" className="text-gray-400 hover:text-white bg-transparent border-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Components
            </Button>
          </Link>
          <Button
            onClick={copyToClipboard}
            variant="purple"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </>
            )}
          </Button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Components List
          </h1>
          <p className="text-gray-400 text-lg">
            A complete list of all available UI components with their descriptions
          </p>
        </div>

        {/* Markdown Codeblock */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
          <div className="space-y-2">
            {allComponents.map((component, index) => (
              <div key={index} className="flex items-center justify-between group">
                <pre className="text-gray-300 text-sm leading-relaxed flex-1">
                  <code>- **{component.title}**: {component.description}</code>
                </pre>
                <Button
                  onClick={() => copyComponentToClipboard(component, index)}
                  className="ml-4 bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-800 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center text-gray-400">
          <p>Total Components: <span className="text-white font-semibold">{allComponents.length}</span></p>
        </div>
      </div>
    </div>
  );
}