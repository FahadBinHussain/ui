"use client";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

export default function ComponentsListPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      title: "ASCII Live Render",
      description: "Real-time video, image, or webcam feed rendered entirely out of text characters",
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
      title: "Bio-Luminescent Glow",
      description: "Organic pulsing glow effects mimicking deep-sea bioluminescence",
    },
    {
      title: "Bio-Organic Growth Loaders",
      description: "SVG-based organic shapes growing like vines using differential growth algorithms",
    },
    {
      title: "Cloth Simulation",
      description: "Realistic fabric physics using Verlet integration for draggable silk flags and curtains",
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
      title: "Direction-Aware Hover",
      description: "Card overlays that intelligently enter from the exact edge where mouse approached using Math.atan2() angle detection",
    },
    {
      title: "Displacement Hover",
      description: "Awwwards-standard image hover with texture-driven warping using Three.js shaders and displacement maps",
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
      title: "Film Grain Overlay",
      description: "Subtle static grain texture using SVG feTurbulence that kills flat digital look for cinematic, retro feel",
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
      title: "Image Sequence Scroll",
      description: "Apple-style 3D product rotation controlled strictly through scroll progress with canvas rendering",
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
      title: "Kinetic Typography",
      description: "Interactive text where letters are connected by elastic physics strings with chain reaction drag",
    },
    {
      title: "Lens Effect",
      description: "Magnifying glass lens effect with smooth zoom",
    },
    {
      title: "Liquid Image Distortion",
      description: "Images that liquefy and ripple like water on hover with WebGL shaders",
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
      title: "Metaballs / Goop",
      description: "Organic liquid mercury blobs that snap together when close, using CSS blur+contrast or SVG filters",
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
      title: "Physics Gravity Sandbox",
      description: "UI elements that fall, stack, and bounce with realistic 2D physics",
    },
    {
      title: "Pixelated Transition",
      description: "Retro-futuristic WebGL transitions that pixelate images with chromatic aberration for gaming/tech aesthetics",
    },
    {
      title: "Prismatic Dispersion Glass",
      description: "Glassmorphism with chromatic aberration and RGB channel separation effects",
    },
    {
      title: "Quantum Loading States",
      description: "Electron orbital animations with quantum physics-inspired loading spinners",
    },
    {
      title: "Raymarching / Signed Distance Functions",
      description: "Pure mathematical rendering with infinite resolution—no polygons, just raymarching through SDF equations for liquid morphing shapes",
    },
    {
      title: "Retro CRT",
      description: "Old school monitor effect with scanlines and curvature",
    },
    {
      title: "Reveal Text",
      description: "Text with hover image reveals and gradient effects",
    },
    {
      title: "RGB / Cyberpunk Glitch",
      description: "Digital chaos with RGB channel splitting, horizontal slicing, and data corruption for cyberpunk aesthetic",
    },
    {
      title: "Scroll Text Flow",
      description: "Scroll-triggered animated text with floating badges",
    },
    {
      title: "Scrollytelling / Sticky Pinning",
      description: "Immersive narratives with sticky visuals that stay pinned while text scrolls alongside, triggering animations (Apple-style product pages)",
    },
    {
      title: "Spotlight Torch Reveal",
      description: "Flashlight effect that reveals hidden content as you move the mouse",
    },
    {
      title: "Sticky Stacking Cards",
      description: "Cards enter from the bottom and stack on top of each other, staying fixed until section ends",
    },
    {
      title: "SVG Path Drawing",
      description: "Animated SVG path drawing with spring-based transitions",
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
    {
      title: "Variable Font Interaction",
      description: "Typography that changes weight, width dynamically based on mouse proximity or scroll speed",
    },
    {
      title: "Velocity-Based Scroll Skew",
      description: "Content skews diagonally based on scroll speed for feeling of weight and momentum using Lenis smooth scroll",
    },
    {
      title: "Video Text Masking",
      description: "Big, bold typography where the ink of the text is actually a playing video for high-impact heroes",
    },
    {
      title: "Voxel Terrain",
      description: "Isometric 3D landscape made of cubes with Perlin noise and wave propagation effects",
    },
  ].sort((a, b) => a.title.localeCompare(b.title));

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return allComponents;
    const query = searchQuery.toLowerCase();
    return allComponents.filter(
      component =>
        component.title.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const markdownList = filteredComponents
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <Link href="/showcase/all">
            <Button 
              className="bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button
            onClick={copyToClipboard}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 text-blue-200 hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-400/40 transition-all"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied All!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </>
            )}
          </Button>
        </div>

        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Component Library
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Explore our collection of advanced UI components and effects
          </p>
          
          {/* Stats Bar */}
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-gray-400">Total Components:</span>
              <span className="text-white font-semibold text-lg">{allComponents.length}</span>
            </div>
            {searchQuery && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-gray-400">Filtered:</span>
                <span className="text-white font-semibold text-lg">{filteredComponents.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        {/* Component List */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="divide-y divide-white/5">
            {filteredComponents.map((component, index) => (
              <div 
                key={index} 
                className="group hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-start gap-4 p-5 md:p-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 flex items-center justify-center text-blue-300 text-sm font-semibold group-hover:border-blue-400/40 transition-all">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-300 transition-colors">
                      {component.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {component.description}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <Button
                    onClick={() => copyComponentToClipboard(component, index)}
                    className="flex-shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white p-2 h-9 w-9 opacity-0 group-hover:opacity-100 transition-all"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No components found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Click the copy button next to any component to copy its markdown format</p>
        </div>
      </div>
    </div>
  );
}