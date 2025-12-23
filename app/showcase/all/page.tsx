"use client";
import Link from "next/link";
import { Box, Sparkles, Palette, Layers, MessageSquareQuote, Eye, Zap, MousePointer2, ImageIcon, ScrollText, Type, Users, Pencil, Palette as PaletteIcon, ArrowRightLeft, Diamond, Menu, Search, Layout, Activity, Code, Cloud, Cpu, Database, Flag, Globe, Atom, Star, Rocket, Wand2, Target, Play, ChevronRight, Github, ExternalLink, ArrowLeft, Filter, Grid3X3, List, Droplets, Terminal, Boxes, Move, Shirt, Compass, Film, BookOpen, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function AllComponentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allComponents = [
    {
      title: "3D Card Effects",
      description: "CSS 3D perspective cards with hover animations",
      icon: Sparkles,
      href: "/showcase/cards",
      color: "from-purple-500 to-pink-500",
      category: "3d",
      componentFile: "ThreeDCardDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Animated Testimonials",
      description: "Beautiful testimonial carousel with 3D stacking",
      icon: MessageSquareQuote,
      href: "/showcase/testimonials",
      color: "from-pink-500 to-rose-500",
      category: "animation",
      componentFile: "AnimatedTestimonialsDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Animated Tooltip",
      description: "Interactive profile tooltips with elastic GSAP animations",
      icon: Users,
      href: "/showcase/animated-tooltip",
      color: "from-emerald-500 to-sky-500",
      category: "ui",
      componentFile: "AnimatedTooltipDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "ASCII Live Render",
      description: "Real-time video, image, or webcam feed rendered entirely out of text characters",
      icon: Terminal,
      href: "/showcase/ascii-render",
      color: "from-green-500 to-emerald-500",
      category: "effects",
      componentFile: "AsciiRenderDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Barba.js Transitions",
      description: "Smooth page transitions with Barba.js for SPA-like experience",
      icon: ArrowRightLeft,
      href: "/showcase/barba",
      color: "from-blue-600 to-purple-600",
      category: "animation",
      componentFile: "BarbaDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Bento Grid",
      description: "Modern, versatile grid layout for feature showcases",
      icon: Layers,
      href: "/showcase/bento-grid",
      color: "from-blue-600 to-indigo-600",
      category: "layout",
      componentFile: "BentoGridDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Cloud Background",
      description: "Floating animated clouds with backdrop blur effects",
      icon: Cloud,
      href: "/showcase/cloud",
      color: "from-sky-400 to-blue-500",
      category: "background",
      componentFile: "cloud-background.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Crystal Fractal Backgrounds",
      description: "Geometric crystal formations that grow and refract light dynamically",
      icon: Sparkles,
      href: "/showcase/crystal-fractal",
      color: "from-cyan-400 via-blue-400 to-purple-400",
      category: "scientific",
      componentFile: "CrystalFractalDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Electric Border",
      description: "Animated electric glow border with SVG filters",
      icon: Zap,
      href: "/showcase/electric-border",
      color: "from-yellow-500 to-orange-500",
      category: "effects",
      componentFile: "ElectricBorderDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Expanding Search",
      description: "Animated search bar that grows and reveals filters on focus",
      icon: Search,
      href: "/showcase/search",
      color: "from-indigo-500 to-purple-500",
      category: "ui",
      componentFile: "search-interface.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Liquid Lens Search",
      description: "Orb-based liquid search that morphs into a glassmorphism bar",
      icon: Eye,
      href: "/showcase/liquid-lens",
      color: "from-cyan-500 to-indigo-500",
      category: "ui",
      componentFile: "LiquidLensDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Film Grain Overlay",
      description: "Subtle static grain texture that kills flat digital look for cinematic feel",
      icon: Film,
      href: "/showcase/film-grain",
      color: "from-gray-600 via-gray-500 to-gray-400",
      category: "effects",
      componentFile: "FilmGrainDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Fluid Cursor",
      description: "Smooth spring-based cursor with trailing effects",
      icon: MousePointer2,
      href: "/showcase/fluid-cursor",
      color: "from-cyan-500 to-blue-500",
      category: "interactive",
      componentFile: "fluid-cursor.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Global Stats",
      description: "Interactive 3D globe showing real-time data points",
      icon: Globe,
      href: "/showcase/globe",
      color: "from-blue-600 to-indigo-600",
      category: "3d",
      componentFile: "ThreeScene.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Holographic Depth-Map Parallax",
      description: "Realistic depth-based parallax effect using static images and depth maps",
      icon: Eye,
      href: "/showcase/holographic-depth-parallax",
      color: "from-cyan-500 via-blue-500 to-purple-500",
      category: "3d",
      componentFile: "HolographicDepthParallaxDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Infinite Marquee",
      description: "Seamlessly looping marquee for logos, text, or images",
      icon: ArrowRightLeft,
      href: "/showcase/marquee",
      color: "from-yellow-400 to-orange-500",
      category: "animation",
      componentFile: "marquee.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Interactive Grid",
      description: "A grid of dots that react and pulsate as the mouse moves over them",
      icon: Layout,
      href: "/showcase/grid",
      color: "from-gray-500 to-gray-800",
      category: "interactive",
      componentFile: "interactive-grid.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Lens Effect",
      description: "Magnifying glass lens effect with smooth zoom",
      icon: Eye,
      href: "/showcase/lens",
      color: "from-indigo-500 to-purple-500",
      category: "interactive",
      componentFile: "LensDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Liquid Image Distortion",
      description: "Images that liquefy and ripple like water on hover with WebGL shaders",
      icon: Droplets,
      href: "/showcase/liquid-image",
      color: "from-cyan-400 to-blue-500",
      category: "interactive",
      componentFile: "LiquidImageDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Magnetic Elements",
      description: "Tactile, physical 'pull' effect for buttons and objects",
      icon: MousePointer2,
      href: "/showcase/magnetic",
      color: "from-amber-500 to-yellow-500",
      category: "interactive",
      componentFile: "MagneticDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Magnetic Field Interactions",
      description: "Elements that behave like magnets, attracting and repelling each other",
      icon: Zap,
      href: "/showcase/magnetic-field",
      color: "from-red-500 to-blue-500",
      category: "scientific",
      componentFile: "MagneticFieldDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Neural Network Visualizer",
      description: "Animated neural networks showing data flow and activations",
      icon: Cpu,
      href: "/showcase/neural-network",
      color: "from-purple-400 to-pink-400",
      category: "scientific",
      componentFile: "NeuralNetworkDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Neumorphic Card",
      description: "Soft UI design with realistic shadows and highlights",
      icon: Layers,
      href: "/showcase/neumorphic",
      color: "from-gray-300 to-gray-100",
      category: "ui",
      componentFile: "neumorphic.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Particle Wave Interactions",
      description: "Interactive particle systems with wave-like mouse responses",
      icon: Zap,
      href: "/showcase/wave-particles",
      color: "from-blue-400 to-purple-400",
      category: "interactive",
      componentFile: "WaveParticlesDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Physics Gravity Sandbox",
      description: "UI elements that fall, stack, and bounce with realistic 2D physics",
      icon: Box,
      href: "/showcase/physics-sandbox",
      color: "from-indigo-500 to-purple-500",
      category: "interactive",
      componentFile: "PhysicsSandboxDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Chromatic Aberration",
      description: "Bad TV look with aggressive RGB channel splitting triggered by scroll or mouse speed",
      icon: Zap,
      href: "/showcase/chromatic-aberration",
      color: "from-red-500 via-purple-500 to-cyan-500",
      category: "effects",
      componentFile: "ChromaticAberrationDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Prismatic Dispersion Glass",
      description: "Glassmorphism with chromatic aberration and RGB channel separation effects",
      icon: Diamond,
      href: "/showcase/prismatic-glass",
      color: "from-pink-400 via-purple-400 to-cyan-400",
      category: "effects",
      componentFile: "PrismaticGlassDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Quantum Loading States",
      description: "Electron orbital animations with quantum physics-inspired loading spinners",
      icon: Atom,
      href: "/showcase/quantum-loading",
      color: "from-cyan-400 to-blue-400",
      category: "scientific",
      componentFile: "QuantumLoadingDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Reaction-Diffusion Patterns",
      description: "Biological growth patterns like zebra stripes and coral that evolve in real-time",
      icon: Activity,
      href: "/showcase/reaction-diffusion",
      color: "from-cyan-400 via-purple-400 to-pink-400",
      category: "scientific",
      componentFile: "ReactionDiffusionDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Raymarching / SDF",
      description: "Pure mathematical rendering with infinite resolution and liquid morphing",
      icon: Infinity,
      href: "/showcase/raymarch-sdf",
      color: "from-purple-500 via-pink-500 to-blue-500",
      category: "3d",
      componentFile: "RaymarchSDFDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Rutt-Etra Video Synthesis",
      description: "Retro 70s video art where brightness becomes 3D height in scanline topology",
      icon: Activity,
      href: "/showcase/rutt-etra",
      color: "from-cyan-500 via-pink-500 to-purple-500",
      category: "3d",
      componentFile: "RuttEtraDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Bio-Organic Growth Loaders",
      description: "SVG-based organic shapes growing like vines using differential growth algorithms",
      icon: Activity,
      href: "/showcase/bio-organic-growth-loader",
      color: "from-emerald-400 to-cyan-400",
      category: "scientific",
      componentFile: "BioOrganicGrowthLoaderDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Retro CRT",
      description: "Old school monitor effect with scanlines and curvature",
      icon: Cpu,
      href: "/showcase/crt",
      color: "from-green-600 to-green-900",
      category: "effects",
      componentFile: "crt.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Dithering & Halftone",
      description: "Bayer matrix dithering on 3D objects for Game Boy Camera or magazine print look",
      icon: Grid3X3,
      href: "/showcase/dithering",
      color: "from-green-500 via-cyan-500 to-blue-500",
      category: "effects",
      componentFile: "DitheringDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Glassmorphism Refraction",
      description: "Real-time refraction with FBO rendering that actually magnifies and distorts content",
      icon: Boxes,
      href: "/showcase/glassmorphism-refraction",
      color: "from-cyan-400 via-blue-500 to-purple-500",
      category: "3d",
      componentFile: "GlassmorphismRefractionDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Gaussian Splatting",
      description: "Photorealistic 3D rendering using real-world scans with hologram-like interaction",
      icon: Atom,
      href: "/showcase/gaussian-splatting",
      color: "from-cyan-400 via-indigo-500 to-purple-600",
      category: "3d",
      componentFile: "GaussianSplattingDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Ferrofluid Typography",
      description: "Magnetic liquid text with spikes that follow your cursor using GPGPU simulations",
      icon: Droplets,
      href: "/showcase/ferrofluid-typography",
      color: "from-blue-500 via-purple-600 to-pink-600",
      category: "text",
      componentFile: "FerrofluidTypographyDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Bio-Luminescent Glow",
      description: "Organic pulsing glow effects mimicking deep-sea bioluminescence",
      icon: Sparkles,
      href: "/showcase/bio-luminescent",
      color: "from-cyan-400 to-blue-400",
      category: "effects",
      componentFile: "BioLuminescentDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Reveal Text",
      description: "Text with hover image reveals and gradient effects",
      icon: ImageIcon,
      href: "/showcase/reveal-text",
      color: "from-emerald-500 to-green-500",
      category: "animation",
      componentFile: "RevealTextDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "SVG Path Drawing",
      description: "Animated SVG path drawing with spring-based transitions",
      icon: Pencil,
      href: "/showcase/path-drawing",
      color: "from-pink-500 to-cyan-500",
      category: "animation",
      componentFile: "PathDrawingDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Spotlight Torch Reveal",
      description: "Flashlight effect that reveals hidden content as you move the mouse",
      icon: Wand2,
      href: "/showcase/spotlight-reveal",
      color: "from-yellow-400 to-orange-500",
      category: "interactive",
      componentFile: "SpotlightRevealDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Scroll Text Flow",
      description: "Scroll-triggered animated text with floating badges",
      icon: ScrollText,
      href: "/showcase/scroll-text-flow",
      color: "from-rose-500 to-pink-500",
      category: "animation",
      componentFile: "ScrollTextFlowDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Scrollytelling / Sticky Pinning",
      description: "Immersive narratives with sticky visuals and scroll-triggered animations",
      icon: BookOpen,
      href: "/showcase/scrollytelling",
      color: "from-purple-500 via-pink-500 to-blue-500",
      category: "animation",
      componentFile: "ScrollytellingDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Text Animations",
      description: "Dynamic text effects with Framer Motion",
      icon: Palette,
      href: "/showcase/text-animations",
      color: "from-green-500 to-teal-500",
      category: "animation",
      componentFile: "ContainerTextFlipDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Text Scramble",
      description: "High-energy text transition with scrambling characters",
      icon: Type,
      href: "/showcase/text-scramble",
      color: "from-indigo-400 to-blue-400",
      category: "animation",
      componentFile: "TextScrambleDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Time Warp Transitions",
      description: "Page transitions with time dilation effects, speed lines, and color shifts",
      icon: Zap,
      href: "/showcase/time-warp",
      color: "from-cyan-400 via-purple-400 to-pink-400",
      category: "animation",
      componentFile: "TimeWarpDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "TypeWriter Effect",
      description: "GSAP-powered typewriter with rotating text animation",
      icon: Type,
      href: "/showcase/typewriter",
      color: "from-blue-500 to-green-500",
      category: "animation",
      componentFile: "TypeWriterDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "UI Components",
      description: "Basic building blocks - Buttons, Inputs, Cards, etc.",
      icon: Layers,
      href: "/showcase/buttons",
      color: "from-blue-500 to-cyan-500",
      category: "ui",
      componentFile: "ButtonDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Variable Font Interaction",
      description: "Typography that changes weight, width dynamically based on mouse proximity or scroll speed",
      icon: Type,
      href: "/showcase/variable-font",
      color: "from-purple-600 via-pink-500 to-orange-500",
      category: "interactive",
      componentFile: "VariableFontDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Voxel Terrain",
      description: "Isometric 3D landscape made of cubes with Perlin noise and interactive wave propagation",
      icon: Boxes,
      href: "/showcase/voxel-terrain",
      color: "from-green-600 via-teal-500 to-cyan-500",
      category: "3d",
      componentFile: "VoxelTerrainDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Kinetic Typography",
      description: "Interactive text where letters are connected by elastic physics strings with chain reaction",
      icon: Move,
      href: "/showcase/kinetic-typography",
      color: "from-purple-600 via-fuchsia-500 to-pink-500",
      category: "interactive",
      componentFile: "KineticTypographyDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Cloth-Simulated Typography",
      description: "Text that acts like a hanging flag or cloth, reacting to wind and cursor with physics",
      icon: Type,
      href: "/showcase/cloth-typography",
      color: "from-cyan-600 via-blue-500 to-purple-600",
      category: "interactive",
      componentFile: "ClothTypographyDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Cloth Simulation",
      description: "Realistic fabric physics using Verlet integration for draggable silk flags and curtains",
      icon: Shirt,
      href: "/showcase/cloth-simulation",
      color: "from-teal-600 via-cyan-500 to-blue-500",
      category: "interactive",
      componentFile: "ClothSimulationDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Soft Body UI (Jelly Physics)",
      description: "UI elements that squish, stretch, and deform like jelly with spring physics",
      icon: Droplets,
      href: "/showcase/soft-body-ui",
      color: "from-cyan-400 via-blue-500 to-purple-500",
      category: "interactive",
      componentFile: "SoftBodyUIDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Image Sequence Scroll",
      description: "Apple-style 3D product rotation controlled through scroll with canvas rendering",
      icon: ScrollText,
      href: "/showcase/scroll-effects",
      color: "from-cyan-600 via-blue-500 to-purple-500",
      category: "interactive",
      componentFile: "image-sequence-scroll.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Sticky Stacking Cards",
      description: "Cards enter from bottom and stack on top, staying fixed until section ends",
      icon: Layers,
      href: "/showcase/sticky-stacking-cards",
      color: "from-purple-600 via-pink-500 to-orange-500",
      category: "interactive",
      componentFile: "StickyStackingCardsDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Video Text Masking",
      description: "Bold typography with playing video as the text fill for high-impact hero sections",
      icon: Play,
      href: "/showcase/video-text-masking",
      color: "from-pink-600 via-rose-500 to-red-500",
      category: "effects",
      componentFile: "VideoTextMaskingDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Velocity-Based Scroll Skew",
      description: "Content skews based on scroll speed for feeling of weight and momentum",
      icon: Activity,
      href: "/showcase/velocity-scroll-skew",
      color: "from-cyan-500 via-blue-500 to-purple-500",
      category: "effects",
      componentFile: "VelocityScrollSkewDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Pixelated Transition",
      description: "Retro-futuristic WebGL image transitions with chromatic aberration effects",
      icon: Boxes,
      href: "/showcase/pixelated-transition",
      color: "from-indigo-600 via-purple-500 to-pink-500",
      category: "effects",
      componentFile: "PixelatedTransitionDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Metaballs / Goop",
      description: "Organic liquid mercury blobs that merge together using CSS or SVG filters",
      icon: Droplets,
      href: "/showcase/metaballs",
      color: "from-purple-600 via-pink-500 to-purple-600",
      category: "effects",
      componentFile: "MetaballsDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "RGB / Cyberpunk Glitch",
      description: "Digital chaos with RGB channel splitting and horizontal slicing",
      icon: Zap,
      href: "/showcase/glitch-effects",
      color: "from-cyan-500 via-purple-500 to-magenta-500",
      category: "effects",
      componentFile: "GlitchEffectsDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Displacement Hover",
      description: "Awwwards-standard image warping with displacement maps",
      icon: ImageIcon,
      href: "/showcase/displacement-hover",
      color: "from-purple-600 via-blue-500 to-indigo-600",
      category: "effects",
      componentFile: "DisplacementHoverDemo.tsx",
      showcaseFile: "page.tsx"
    },
    {
      title: "Direction-Aware Hover",
      description: "Overlays that enter from the edge where mouse approached",
      icon: Compass,
      href: "/showcase/direction-aware-hover",
      color: "from-purple-500 via-pink-500 to-rose-500",
      category: "effects",
      componentFile: "DirectionAwareHoverDemo.tsx",
      showcaseFile: "page.tsx"
    },
  ];

  const categories = [
    { id: 'all', name: 'All Components', count: allComponents.length },
    { id: 'ui', name: 'UI Components', count: allComponents.filter(c => c.category === 'ui').length },
    { id: 'animation', name: 'Animations', count: allComponents.filter(c => c.category === 'animation').length },
    { id: 'interactive', name: 'Interactive', count: allComponents.filter(c => c.category === 'interactive').length },
    { id: '3d', name: '3D Effects', count: allComponents.filter(c => c.category === '3d').length },
    { id: 'effects', name: 'Visual Effects', count: allComponents.filter(c => c.category === 'effects').length },
    { id: 'scientific', name: 'Scientific', count: allComponents.filter(c => c.category === 'scientific').length },
    { id: 'background', name: 'Backgrounds', count: allComponents.filter(c => c.category === 'background').length },
    { id: 'layout', name: 'Layout', count: allComponents.filter(c => c.category === 'layout').length },
    { id: 'text', name: 'Text Effects', count: allComponents.filter(c => c.category === 'text').length },
  ];

  const filteredComponents = useMemo(() => {
    return allComponents
      .filter(component => {
        const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             component.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [allComponents, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                All Components
              </h1>
              <Link
                href="/showcase/list"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                View as List
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredComponents.length} of {allComponents.length} components
          </p>
        </div>

        {/* Components Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component, index) => {
              const Icon = component.icon;
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={component.href} className="block group">
                    <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-white/20 to-white/5 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300">
                      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-6 rounded-xl h-full group-hover:from-gray-800/90 group-hover:to-gray-900/90 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`rounded-xl bg-gradient-to-br ${component.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {component.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed mb-3">
                          {component.description}
                        </p>
                        {component.componentFile && component.showcaseFile && (
                          <div className="text-xs text-gray-500 space-y-1 mb-3">
                            <div>Component: <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-400">{component.componentFile}</code></div>
                            <div>Showcase: <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-400">{component.showcaseFile}</code></div>
                          </div>
                        )}
                        <div>
                          <span className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full capitalize">
                            {component.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComponents.map((component, index) => {
              const Icon = component.icon;
              return (
                <motion.div
                  key={component.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={component.href} className="block group">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`rounded-lg bg-gradient-to-br ${component.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {component.title}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm mb-2">
                            {component.description}
                          </p>
                          {component.componentFile && component.showcaseFile && (
                            <div className="text-xs text-gray-500 space-y-1 mb-2">
                              <div>Component: <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-400">{component.componentFile}</code></div>
                              <div>Showcase: <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-400">{component.showcaseFile}</code></div>
                            </div>
                          )}
                          <div>
                            <span className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full capitalize">
                              {component.category}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No components found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}