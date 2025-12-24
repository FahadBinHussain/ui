"use client";

import React from "react";
import {
  KineticRevealFooter,
  MassiveKineticText,
  SubtleKineticText,
  DramaticKineticText,
  RevealFooterLayout,
} from "@/components/ui/kinetic-reveal-footer";
import { ArrowDown, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function KineticRevealFooterDemo() {
  return (
    <div className="bg-white text-black">
      <KineticRevealFooter
        footerHeight="100vh"
        footer={
          <div className="w-full h-full bg-black relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950 opacity-80" />
            
            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 text-center">
              <MassiveKineticText>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  LET'S TALK
                </span>
              </MassiveKineticText>
              
              <p className="mt-8 text-2xl md:text-3xl text-gray-300 max-w-2xl">
                Ready to build something extraordinary?
              </p>
              
              {/* Social links with icons */}
              <div className="mt-12 flex flex-wrap gap-6 justify-center">
                {[
                  { icon: <Twitter className="w-6 h-6" />, label: "Twitter", href: "#", color: "hover:text-sky-400" },
                  { icon: <Github className="w-6 h-6" />, label: "GitHub", href: "#", color: "hover:text-gray-300" },
                  { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", href: "#", color: "hover:text-blue-400" },
                  { icon: <Mail className="w-6 h-6" />, label: "Email", href: "mailto:hello@example.com", color: "hover:text-purple-400" },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className={`group flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${link.color} transition-all hover:scale-105 hover:bg-white/10`}
                  >
                    <span className="transition-transform group-hover:scale-110">{link.icon}</span>
                    <span className="text-lg font-medium text-white">{link.label}</span>
                  </a>
                ))}
              </div>
              
              {/* Bottom tagline */}
              <div className="absolute bottom-12 left-0 right-0 text-center">
                <p className="text-sm text-gray-500">© 2025 Your Company · Crafted with passion</p>
              </div>
            </div>
          </div>
        }
      >
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto text-center py-32">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-black/5 border border-black/10">
              <span className="text-sm font-medium">✨ Scroll down to reveal</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Kinetic Reveal
              <br />
              Footer
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A massive footer that stays fixed at the bottom while the page content scrolls up like a curtain to reveal it, featuring huge typography that reacts to your scroll velocity
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "Velocity Reactive",
                  description: "Typography skews and scales based on scroll speed",
                  icon: "⚡",
                },
                {
                  title: "Spring Physics",
                  description: "Smooth snap-back with configurable spring tension",
                  icon: "🔄",
                },
                {
                  title: "Fixed Behind",
                  description: "Footer stays fixed at z-index: -1 while content scrolls over",
                  icon: "📍",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ArrowDown className="w-8 h-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Scroll to see the effect</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center">How It Works</h2>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Fixed Footer Behind Content",
                  description:
                    "The footer is positioned fixed at the bottom with z-index: -1, so it sits behind the page content",
                  code: `<footer className="fixed bottom-0 left-0 w-full" 
  style={{ zIndex: -1, height: "100vh" }}>
  {/* Footer content */}
</footer>`,
                },
                {
                  step: "02",
                  title: "Content Margin for Scroll Space",
                  description:
                    "Main content has margin-bottom equal to footer height, creating scroll space to reveal it",
                  code: `<div style={{ marginBottom: "100vh" }}>
  {/* Main page content */}
</div>`,
                },
                {
                  step: "03",
                  title: "Track Scroll Velocity",
                  description:
                    "Calculate scroll velocity by measuring position delta between animation frames",
                  code: `const currentScrollY = window.scrollY;
const scrollDelta = currentScrollY - lastScrollY;
const velocity = scrollDelta / window.innerHeight;
lastScrollY = currentScrollY;`,
                },
                {
                  step: "04",
                  title: "Apply Velocity-Based Transforms",
                  description:
                    "Map velocity to skewX (up to 15deg) and scaleY (up to 1.3x) for dramatic effect",
                  code: `const targetSkew = clamp(
  velocity * velocityMultiplier * 500,
  -15, 15
);
const targetScale = 1 + 
  Math.abs(velocity) * velocityMultiplier * 10;`,
                },
                {
                  step: "05",
                  title: "Spring Physics Snap-Back",
                  description:
                    "Use spring physics to smoothly interpolate back to normal when velocity decreases",
                  code: `const skewForce = (targetSkew - currentSkew) * tension;
const skewDamping = currentSkew * friction;
currentSkew += (skewForce - skewDamping) * dt;

gsap.set(element, { 
  skewX: currentSkew, 
  scaleY: currentScale 
});`,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border-l-4 border-purple-500 pl-8 hover:border-purple-600 transition-colors"
                >
                  <div className="text-sm font-bold text-purple-500 mb-2">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border border-gray-700">
                    <code>{item.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Variants Demo */}
        <section className="py-32 px-8 bg-gradient-to-b from-white to-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-6 text-center">Three Variants</h2>
            <p className="text-xl text-gray-600 text-center mb-16">
              Different configurations for different use cases
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Subtle",
                  description: "Gentle effect for elegant designs",
                  specs: ["8° max skew", "1.15x max scale", "10vw text size"],
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Massive",
                  description: "Balanced default configuration",
                  specs: ["15° max skew", "1.3x max scale", "15vw text size"],
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Dramatic",
                  description: "Extreme motion for bold statements",
                  specs: ["25° max skew", "1.5x max scale", "20vw text size"],
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((variant, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${variant.gradient} mb-6 group-hover:scale-110 transition-transform`}
                  />
                  <h3 className="text-2xl font-bold mb-2">{variant.title}</h3>
                  <p className="text-gray-600 mb-6">{variant.description}</p>
                  <ul className="space-y-2">
                    {variant.specs.map((spec, j) => (
                      <li key={j} className="text-sm text-gray-500 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beautiful Footer Design Examples */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-6 text-center">Beautiful Footer Designs</h2>
            <p className="text-xl text-gray-600 text-center mb-16">
              Choose from these stunning pre-built layouts or create your own
            </p>

            <div className="space-y-8">
              {/* Design 1: Minimalist Gradient */}
              <div className="relative h-96 rounded-3xl overflow-hidden border-2 border-gray-200 group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }} />
                  <div className="h-full flex flex-col items-center justify-center px-8 text-center">
                    <h3 className="text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                      CREATE
                    </h3>
                    <p className="text-xl text-gray-300 mb-8">Minimalist gradient with dot pattern</p>
                    <div className="flex gap-4">
                      <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                        Portfolio
                      </div>
                      <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                        Agency
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design 2: Neon Cyberpunk */}
              <div className="relative h-96 rounded-3xl overflow-hidden border-2 border-gray-200 group">
                <div className="absolute inset-0 bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/20" />
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                  }} />
                  <div className="h-full flex flex-col items-center justify-center px-8 text-center relative z-10">
                    <h3 className="text-7xl font-black mb-6 text-transparent" style={{
                      WebkitTextStroke: '2px cyan',
                      textShadow: '0 0 20px cyan, 0 0 40px cyan, 0 0 60px cyan'
                    }}>
                      FUTURE
                    </h3>
                    <p className="text-xl text-cyan-300 mb-8 font-mono">Neon cyberpunk with glow effects</p>
                    <div className="flex gap-4">
                      {['Tech', 'Gaming', 'Crypto'].map((tag) => (
                        <div key={tag} className="px-6 py-3 rounded-lg bg-cyan-500/10 border-2 border-cyan-500 text-cyan-300 text-sm font-mono">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Design 3: Elegant Glassmorphism */}
              <div className="relative h-96 rounded-3xl overflow-hidden border-2 border-gray-200 group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                  <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-40" />
                  <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-40" />
                  <div className="h-full flex flex-col items-center justify-center px-8 text-center relative z-10">
                    <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl px-12 py-8 shadow-2xl">
                      <h3 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ELEGANT
                      </h3>
                      <p className="text-lg text-gray-700 mb-6">Glassmorphism with floating blobs</p>
                      <div className="flex justify-center gap-3">
                        {[
                          { icon: <Twitter className="w-5 h-5" />, color: "hover:bg-sky-500" },
                          { icon: <Github className="w-5 h-5" />, color: "hover:bg-gray-800" },
                          { icon: <Linkedin className="w-5 h-5" />, color: "hover:bg-blue-600" },
                        ].map((social, i) => (
                          <button key={i} className={`p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 ${social.color} hover:text-white transition-all`}>
                            {social.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design 4: Bold Gradient Mesh */}
              <div className="relative h-96 rounded-3xl overflow-hidden border-2 border-gray-200 group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
                  <div className="absolute inset-0 mix-blend-overlay opacity-50" style={{
                    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.3) 0%, transparent 50%)'
                  }} />
                  <div className="h-full flex flex-col items-center justify-center px-8 text-center">
                    <h3 className="text-8xl font-black mb-6 text-white drop-shadow-2xl">
                      BOLD
                    </h3>
                    <p className="text-2xl text-white/90 mb-8 font-semibold">Vibrant gradient mesh design</p>
                    <button className="px-10 py-4 rounded-full bg-white text-red-600 font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* Design 5: Professional Dark */}
              <div className="relative h-96 rounded-3xl overflow-hidden border-2 border-gray-200 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                  }} />
                  <div className="h-full flex items-center justify-between px-16">
                    <div>
                      <h3 className="text-6xl font-bold mb-4 text-white">Let's Connect</h3>
                      <p className="text-xl text-gray-400">Professional · Minimalist · Clean</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      {['Contact', 'Portfolio', 'About'].map((item) => (
                        <a key={item} href="#" className="px-8 py-3 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-300 hover:text-white transition-all text-center font-medium">
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-32 px-8 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-12 text-center">Technical Details</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Transform Properties",
                  items: [
                    "skewX: -15deg to +15deg based on velocity",
                    "scaleY: 1x to 1.3x based on absolute velocity",
                    "transformOrigin: center center",
                    "will-change: transform for GPU acceleration",
                  ],
                },
                {
                  title: "Spring Physics",
                  items: [
                    "Tension: 120 (stiffness of the spring)",
                    "Friction: 14 (damping force)",
                    "60fps assumed for time delta calculations",
                    "Smooth interpolation prevents jarring stops",
                  ],
                },
                {
                  title: "Performance",
                  items: [
                    "GSAP for optimal transform performance",
                    "requestAnimationFrame for smooth 60fps",
                    "force3D: true for hardware acceleration",
                    "Cleanup on component unmount",
                  ],
                },
                {
                  title: "Customization",
                  items: [
                    "maxSkew: max diagonal skew angle",
                    "maxScale: max vertical stretch factor",
                    "velocityMultiplier: sensitivity tuning",
                    "springConfig: tension & friction control",
                  ],
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-gray-300 text-sm flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black mb-16 text-center">Perfect For</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Portfolio Contact Sections",
                  description:
                    "Make your contact footer unforgettable with massive typography that demands attention",
                  emoji: "💼",
                },
                {
                  title: "Landing Page CTAs",
                  description:
                    "Create anticipation as users scroll down, revealing a powerful call-to-action",
                  emoji: "🎯",
                },
                {
                  title: "Agency Websites",
                  description:
                    "Show off your attention to detail with kinetic micro-interactions",
                  emoji: "🚀",
                },
                {
                  title: "Product Launch Pages",
                  description:
                    "Build excitement with physics-based motion that feels premium and polished",
                  emoji: "✨",
                },
              ].map((useCase, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="text-5xl mb-4">{useCase.emoji}</div>
                  <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Section Before Footer */}
        <section className="py-48 px-8 bg-gradient-to-b from-white via-purple-50 to-purple-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Keep Scrolling
            </h2>
            <p className="text-2xl text-gray-700 mb-12">
              Watch how the content scrolls up like a curtain to reveal the massive footer below
            </p>
            <div className="animate-bounce">
              <ArrowDown className="w-12 h-12 mx-auto text-purple-500" />
            </div>
          </div>
        </section>

        {/* More content to enable scrolling */}
        <section className="py-32 px-8 bg-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-8">
              Notice how the footer stays fixed at the bottom...
            </p>
            <p className="text-xl text-gray-700">
              While this content scrolls up and away...
            </p>
          </div>
        </section>

        <section className="py-32 px-8 bg-purple-200">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl font-bold text-gray-800 mb-8">
              The footer is revealed curtain-style! 🎭
            </p>
            <p className="text-lg text-gray-700">
              Scroll faster or slower to see the typography react to your velocity
            </p>
          </div>
        </section>

        {/* Final push section */}
        <section className="py-48 px-8 bg-gradient-to-b from-purple-200 to-purple-300">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-5xl font-black mb-6 text-purple-900">Almost There!</h3>
            <p className="text-xl text-purple-800 mb-12">
              Try scrolling at different speeds to see the skew and scale effects
            </p>
            <div className="flex justify-center gap-8 text-purple-700">
              <div className="text-center">
                <div className="text-4xl mb-2">🐌</div>
                <div className="text-sm font-medium">Slow = Subtle</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-sm font-medium">Fast = Dramatic</div>
              </div>
            </div>
          </div>
        </section>
      </KineticRevealFooter>
    </div>
  );
}
