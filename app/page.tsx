"use client";
import Link from "next/link";
import { Box, Sparkles, Palette, Layers, MessageSquareQuote, Eye, Zap, MousePointer2, ImageIcon, ScrollText, Type, Users, Pencil, Palette as PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const categories = [
    {
      title: "UI Components",
      description: "Basic building blocks - Buttons, Inputs, Cards, etc.",
      icon: Layers,
      href: "/showcase/buttons",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "3D Card Effects",
      description: "CSS 3D perspective cards with hover animations",
      icon: Sparkles,
      href: "/showcase/cards",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Text Animations",
      description: "Dynamic text effects with Framer Motion",
      icon: Palette,
      href: "/showcase/text-animations",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Animated Testimonials",
      description: "Beautiful testimonial carousel with 3D stacking",
      icon: MessageSquareQuote,
      href: "/showcase/testimonials",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Lens Effect",
      description: "Magnifying glass lens effect with smooth zoom",
      icon: Eye,
      href: "/showcase/lens",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Electric Border",
      description: "Animated electric glow border with SVG filters",
      icon: Zap,
      href: "/showcase/electric-border",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Custom Cursor",
      description: "Interactive custom cursor with name tags and colors",
      icon: MousePointer2,
      href: "/showcase/custom-cursor",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Reveal Text",
      description: "Text with hover image reveals and gradient effects",
      icon: ImageIcon,
      href: "/showcase/reveal-text",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Scroll Text Flow",
      description: "Scroll-triggered animated text with floating badges",
      icon: ScrollText,
      href: "/showcase/scroll-text-flow",
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "TypeWriter Effect",
      description: "GSAP-powered typewriter with rotating text animation",
      icon: Type,
      href: "/showcase/typewriter",
      color: "from-blue-500 to-green-500",
    },
    {
      title: "Animated Tooltip",
      description: "Interactive profile tooltips with elastic GSAP animations",
      icon: Users,
      href: "/showcase/animated-tooltip",
      color: "from-emerald-500 to-sky-500",
    },
    {
      title: "SVG Path Drawing",
      description: "Animated SVG path drawing with spring-based transitions",
      icon: Pencil,
      href: "/showcase/path-drawing",
      color: "from-pink-500 to-cyan-500",
    },
    {
      title: "Theme Dropdown",
      description: "Elegant theme selector with smooth transitions and radio inputs",
      icon: PaletteIcon,
      href: "/showcase/theme-dropdown",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "3D Scenes",
      description: "React Three Fiber canvases and 3D experiences",
      icon: Box,
      href: "/showcase/3d-scenes",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="relative mx-auto max-w-4xl p-[2px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <div className="bg-gradient-to-br from-purple-950/90 via-black to-blue-950/90 backdrop-blur-sm p-12 rounded-3xl">
                <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  Design System
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {" "}2025
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl mb-8">
                  Modern, copy-paste compatible component library built with Next.js 16, 
                  TypeScript, Tailwind CSS, GSAP, and React Three Fiber.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/showcase/buttons">
                    <Button variant="sunset">
                      Explore Components
                    </Button>
                  </Link>
                  <Link href="https://github.com" target="_blank">
                    <Button variant="ocean">
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              God Tier Stack
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Next.js 16", sublabel: "App Router", color: "from-blue-500 to-cyan-500" },
                { label: "TypeScript", sublabel: "Type Safety", color: "from-purple-500 to-violet-500" },
                { label: "Tailwind CSS", sublabel: "+ cn() utility", color: "from-pink-500 to-rose-500" },
                { label: "GSAP", sublabel: "Animations", color: "from-green-500 to-emerald-500" },
                { label: "React Three Fiber", sublabel: "3D Graphics", color: "from-orange-500 to-red-500" },
                { label: "Framer Motion", sublabel: "UI Animations", color: "from-violet-500 to-purple-500" },
                { label: "Shadcn UI", sublabel: "Architecture", color: "from-cyan-500 to-blue-500" },
                { label: "Drei", sublabel: "3D Helpers", color: "from-amber-500 to-orange-500" },
              ].map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="relative p-[1px] rounded-lg bg-gradient-to-r overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg h-full">
                    <div className="font-semibold text-white">{tech.label}</div>
                    <div className="text-sm text-gray-400">{tech.sublabel}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Component Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Component Library
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  >
                    <Link href={category.href} className="block group">
                      <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-purple-500/50 to-pink-500/50 group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl h-full group-hover:from-gray-800 group-hover:via-gray-900 group-hover:to-gray-800 transition-all">
                          <div className="mb-4 flex items-center gap-3">
                            <div className={`rounded-lg bg-gradient-to-br ${category.color} p-3 group-hover:scale-110 transition-transform`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                          </div>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative p-[2px] rounded-2xl bg-gradient-to-r from-green-500 to-blue-500"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Features
              </h2>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
                {[
                  "Copy-paste compatible with any Next.js project",
                  "Full TypeScript support with autocomplete",
                  "Pre-installed dependencies for modern UI libraries",
                  "Shadcn architecture for easy component organization",
                  "Ready for 3D experiences with Three.js",
                  "GSAP & Framer Motion animations built-in",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-green-400 text-xl">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
