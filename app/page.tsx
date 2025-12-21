"use client";
import Link from "next/link";
import { Box, Sparkles, Palette, Layers, MessageSquareQuote, Eye, Zap, MousePointer2, ImageIcon, ScrollText, Type, Users, Pencil, Palette as PaletteIcon, ArrowRightLeft, Diamond, Menu, Search, Layout, Activity, Code, Cloud, Cpu, Database, Flag, Globe, Atom, Star, Rocket, Wand2, Target, Play, ChevronRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    {
      title: "3D Card Effects",
      description: "CSS 3D perspective cards with hover animations",
      icon: Sparkles,
      href: "/showcase/cards",
      color: "from-purple-500 to-pink-500",
      category: "3d"
    },
    {
      title: "3D Scenes",
      description: "React Three Fiber canvases and 3D experiences",
      icon: Box,
      href: "/showcase/3d-scenes",
      color: "from-orange-500 to-red-500",
      category: "3d"
    },
    {
      title: "Animated Testimonials",
      description: "Beautiful testimonial carousel with 3D stacking",
      icon: MessageSquareQuote,
      href: "/showcase/testimonials",
      color: "from-pink-500 to-rose-500",
      category: "animation"
    },
    {
      title: "Animated Tooltip",
      description: "Interactive profile tooltips with elastic GSAP animations",
      icon: Users,
      href: "/showcase/animated-tooltip",
      color: "from-emerald-500 to-sky-500",
      category: "ui"
    },
    {
      title: "Aurora Background",
      description: "Silky, animated gradient background for premium feel",
      icon: Sparkles,
      href: "/showcase/aurora",
      color: "from-indigo-600 to-purple-600",
      category: "background"
    },
    {
      title: "Barba.js Transitions",
      description: "Smooth page transitions with Barba.js for SPA-like experience",
      icon: ArrowRightLeft,
      href: "/showcase/barba",
      color: "from-blue-600 to-purple-600",
      category: "animation"
    },
    {
      title: "Bento Grid",
      description: "Modern, versatile grid layout for feature showcases",
      icon: Layers,
      href: "/showcase/bento-grid",
      color: "from-blue-600 to-indigo-600",
      category: "layout"
    },
    {
      title: "Cloud Background",
      description: "Floating animated clouds with backdrop blur effects",
      icon: Cloud,
      href: "/showcase/cloud",
      color: "from-sky-400 to-blue-500",
      category: "background"
    },
    {
      title: "Cloud Sync",
      description: "Animated cloud synchronization state with floating icons",
      icon: Cloud,
      href: "/showcase/cloud",
      color: "from-sky-400 to-blue-500",
      category: "animation"
    },
    {
      title: "Custom Cursor",
      description: "Interactive custom cursor with name tags and colors",
      icon: MousePointer2,
      href: "/showcase/custom-cursor",
      color: "from-violet-500 to-fuchsia-500",
      category: "interactive"
    },
    {
      title: "Electric Border",
      description: "Animated electric glow border with SVG filters",
      icon: Zap,
      href: "/showcase/electric-border",
      color: "from-yellow-500 to-orange-500",
      category: "effects"
    },
    {
      title: "Expanding Search",
      description: "Animated search bar that grows and reveals filters on focus",
      icon: Search,
      href: "/showcase/search",
      color: "from-indigo-500 to-purple-500",
      category: "ui"
    },
    {
      title: "Fluid Cursor",
      description: "Smooth spring-based cursor with trailing effects",
      icon: MousePointer2,
      href: "/showcase/fluid-cursor",
      color: "from-cyan-500 to-blue-500",
      category: "interactive"
    },
    {
      title: "Glass Sidebar",
      description: "Semi-transparent sidebar with sophisticated backdrop blur",
      icon: Menu,
      href: "/showcase/sidebar",
      color: "from-blue-400 to-cyan-300",
      category: "ui"
    },
    {
      title: "Glitch Effect",
      description: "Digital artifact glitch animation for text and images",
      icon: Activity,
      href: "/showcase/glitch",
      color: "from-red-500 via-green-500 to-blue-500",
      category: "effects"
    },
    {
      title: "Global Stats",
      description: "Interactive 3D globe showing real-time data points",
      icon: Globe,
      href: "/showcase/globe",
      color: "from-blue-600 to-indigo-600",
      category: "3d"
    },
    {
      title: "Holographic Card",
      description: "Futuristic iridescent cards with 3D tilt and light reflections",
      icon: Diamond,
      href: "/showcase/holo",
      color: "from-cyan-400 via-white to-purple-400",
      category: "3d"
    },
    {
      title: "Crystal Fractal Backgrounds",
      description: "Geometric crystal formations that grow and refract light dynamically",
      icon: Sparkles,
      href: "/showcase/crystal-fractal",
      color: "from-cyan-400 via-blue-400 to-purple-400",
      category: "scientific"
    },
    {
      title: "Infinite Marquee",
      description: "Seamlessly looping marquee for logos, text, or images",
      icon: ArrowRightLeft,
      href: "/showcase/marquee",
      color: "from-yellow-400 to-orange-500",
      category: "animation"
    },
    {
      title: "Interactive Grid",
      description: "A grid of dots that react and pulsate as the mouse moves over them",
      icon: Layout,
      href: "/showcase/grid",
      color: "from-gray-500 to-gray-800",
      category: "interactive"
    },
    {
      title: "Lens Effect",
      description: "Magnifying glass lens effect with smooth zoom",
      icon: Eye,
      href: "/showcase/lens",
      color: "from-indigo-500 to-purple-500",
      category: "interactive"
    },
    {
      title: "Liquid Morphing Shapes",
      description: "Organic fluid shapes that morph between different forms",
      icon: Sparkles,
      href: "/showcase/liquid-morph",
      color: "from-cyan-400 to-blue-400",
      category: "animation"
    },
    {
      title: "Magnetic Elements",
      description: "Tactile, physical 'pull' effect for buttons and objects",
      icon: MousePointer2,
      href: "/showcase/magnetic",
      color: "from-amber-500 to-yellow-500",
      category: "interactive"
    },
    {
      title: "Neural Network Visualizer",
      description: "Animated neural networks showing data flow and activations",
      icon: Cpu,
      href: "/showcase/neural-network",
      color: "from-purple-400 to-pink-400",
      category: "scientific"
    },
    {
      title: "Neumorphic Card",
      description: "Soft UI design with realistic shadows and highlights",
      icon: Layers,
      href: "/showcase/neumorphic",
      color: "from-gray-300 to-gray-100",
      category: "ui"
    },
    {
      title: "Particle Wave Interactions",
      description: "Interactive particle systems with wave-like mouse responses",
      icon: Zap,
      href: "/showcase/wave-particles",
      color: "from-blue-400 to-purple-400",
      category: "interactive"
    },
    {
      title: "Quantum Loading States",
      description: "Electron orbital animations with quantum physics-inspired loading spinners",
      icon: Atom,
      href: "/showcase/quantum-loading",
      color: "from-cyan-400 to-blue-400",
      category: "scientific"
    },
    {
      title: "Retro CRT",
      description: "Old school monitor effect with scanlines and curvature",
      icon: Cpu,
      href: "/showcase/crt",
      color: "from-green-600 to-green-900",
      category: "effects"
    },
    {
      title: "Reveal Text",
      description: "Text with hover image reveals and gradient effects",
      icon: ImageIcon,
      href: "/showcase/reveal-text",
      color: "from-emerald-500 to-green-500",
      category: "animation"
    },
    {
      title: "SVG Path Drawing",
      description: "Animated SVG path drawing with spring-based transitions",
      icon: Pencil,
      href: "/showcase/path-drawing",
      color: "from-pink-500 to-cyan-500",
      category: "animation"
    },
    {
      title: "Scroll Text Flow",
      description: "Scroll-triggered animated text with floating badges",
      icon: ScrollText,
      href: "/showcase/scroll-text-flow",
      color: "from-rose-500 to-pink-500",
      category: "animation"
    },
    {
      title: "Search Interface",
      description: "Modern search with suggestions, trends, and animations",
      icon: Search,
      href: "/showcase/search",
      color: "from-slate-500 to-gray-600",
      category: "ui"
    },
    {
      title: "Smart Sidebar",
      description: "Collapsible sidebar with smooth animations and glass effects",
      icon: Layout,
      href: "/showcase/sidebar",
      color: "from-slate-500 to-gray-600",
      category: "ui"
    },
    {
      title: "Spotlight Card",
      description: "Interactive cards with a smooth, mouse-following radial glow",
      icon: Zap,
      href: "/showcase/spotlight",
      color: "from-blue-400 to-purple-400",
      category: "interactive"
    },
    {
      title: "Text Animations",
      description: "Dynamic text effects with Framer Motion",
      icon: Palette,
      href: "/showcase/text-animations",
      color: "from-green-500 to-teal-500",
      category: "animation"
    },
    {
      title: "Text Scramble",
      description: "High-energy text transition with scrambling characters",
      icon: Type,
      href: "/showcase/text-scramble",
      color: "from-indigo-400 to-blue-400",
      category: "animation"
    },
    {
      title: "Theme Dropdown",
      description: "Elegant theme selector with smooth transitions and radio inputs",
      icon: PaletteIcon,
      href: "/showcase/theme-dropdown",
      color: "from-purple-500 to-pink-500",
      category: "ui"
    },
    {
      title: "Time Warp Transitions",
      description: "Page transitions with time dilation effects, speed lines, and color shifts",
      icon: Zap,
      href: "/showcase/time-warp",
      color: "from-cyan-400 via-purple-400 to-pink-400",
      category: "animation"
    },
    {
      title: "UI Components",
      description: "Basic building blocks - Buttons, Inputs, Cards, etc.",
      icon: Layers,
      href: "/showcase/buttons",
      color: "from-blue-500 to-cyan-500",
      category: "ui"
    },
  ];

  const categoryGroups = {
    featured: categories.filter(cat => ['3d', 'animation', 'interactive'].includes(cat.category)).slice(0, 6),
    ui: categories.filter(cat => cat.category === 'ui').slice(0, 8),
    effects: categories.filter(cat => cat.category === 'effects').slice(0, 6),
    scientific: categories.filter(cat => cat.category === 'scientific'),
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.05),transparent_50%)]" />

          {/* Floating particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Next-Gen Component Library</span>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Design
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    System 2026
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                  The most advanced component library built with cutting-edge technologies.
                  Copy-paste compatible, fully typed, and ready for production.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              >
                <Link href="/showcase/all">
                  <Button variant="sunset" className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Explore Components
                  </Button>
                </Link>

                <Link href="https://github.com" target="_blank">
                  <Button variant="ocean" className="group border-white/20 hover:bg-white/10 text-white px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm">
                    <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    View Source
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
              >
                {[
                  { name: "Next.js 16", icon: Rocket },
                  { name: "TypeScript", icon: Target },
                  { name: "Tailwind CSS", icon: Palette },
                  { name: "GSAP", icon: Wand2 },
                  { name: "React Three Fiber", icon: Box },
                  { name: "Framer Motion", icon: Zap },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <tech.icon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Featured Components */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Featured Components
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Discover the most impressive and innovative components in our library
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGroups.featured.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <Link href={category.href} className="block">
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-white/20 to-white/5 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300">
                          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-6 rounded-2xl h-full group-hover:from-gray-800/90 group-hover:to-gray-900/90 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`rounded-xl bg-gradient-to-br ${category.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Categories Overview */}
          <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-950/50">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Component Categories
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Organized by functionality for easy discovery and implementation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* UI Components */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-950/50 to-cyan-950/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">UI Components</h3>
                  </div>
                  <p className="text-gray-400 mb-6">Essential building blocks for modern interfaces</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryGroups.ui.slice(0, 6).map((component) => (
                      <Link key={component.title} href={component.href} className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                        {component.title}
                      </Link>
                    ))}
                  </div>
                  <Link href="/showcase/all" className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 transition-colors">
                    View all UI components
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>

                {/* Effects & Animations */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-950/50 to-pink-950/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Effects & Animations</h3>
                  </div>
                  <p className="text-gray-400 mb-6">Stunning visual effects and smooth animations</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryGroups.effects.map((component) => (
                      <Link key={component.title} href={component.href} className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
                        {component.title}
                      </Link>
                    ))}
                  </div>
                  <Link href="/showcase/all" className="inline-flex items-center gap-2 mt-6 text-purple-400 hover:text-purple-300 transition-colors">
                    View all effects
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Built for Scale
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "40+", label: "Components", color: "from-blue-400 to-cyan-400" },
                  { number: "100%", label: "TypeScript", color: "from-purple-400 to-pink-400" },
                  { number: "∞", label: "Possibilities", color: "from-green-400 to-blue-400" },
                  { number: "2026", label: "Future Ready", color: "from-orange-400 to-red-400" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-blue-950/50 to-purple-950/50">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Ready to Build Something Amazing?
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Start using our component library today and ship faster than ever before.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/showcase/buttons">
                    <Button variant="sunset" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25">
                      Get Started
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <Link href="https://github.com" target="_blank">
                    <Button variant="ocean" className="border-white/20 hover:bg-white/10 text-white px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm">
                      <Github className="w-5 h-5 mr-2" />
                      Star on GitHub
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}