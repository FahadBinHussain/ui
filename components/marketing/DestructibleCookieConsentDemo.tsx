"use client";

import React, { useState } from "react";
import { SimpleCookieConsent } from "@/components/ui/simple-destructible-cookie";
import { Sparkles, Zap, Cookie, Hammer } from "lucide-react";

export default function DestructibleCookieConsentDemo() {
  const [showCookie, setShowCookie] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showFlash, setShowFlash] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const triggerDemo = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    
    // Muzzle flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 100);
    
    setShowCookie(false);
    setTimeout(() => setShowCookie(true), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
            <span className="text-sm font-medium text-orange-300">🍪 Physics-Based Destruction</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Destructible
            </span>
            <br />
            <span className="text-white">Cookie Consent</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Instead of clicking "Accept", users smash the modal into physics debris that falls and settles at the bottom. Built with Matter.js, html2canvas, and Voronoi tessellation.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {[
              { icon: <Hammer className="w-5 h-5" />, text: "Smashable UI" },
              { icon: <Zap className="w-5 h-5" />, text: "Matter.js Physics" },
              { icon: <Sparkles className="w-5 h-5" />, text: "Voronoi Shards" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                {feature.icon}
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Section */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Try It Out</h2>
            <p className="text-gray-400">Click a button below to trigger the destructible cookie consent</p>
          </div>

          <div className="grid md:grid-cols-1 gap-6 justify-center max-w-sm mx-auto relative">
            {/* Muzzle Flash Effect */}
            {showFlash && (
              <div 
                className="absolute inset-0 pointer-events-none flex items-center justify-center animate-pulse"
              >
                <div className="w-32 h-32 rounded-full bg-orange-500/50 blur-3xl" />
              </div>
            )}
            
            <button
              ref={buttonRef}
              onClick={triggerDemo}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all hover:scale-105 relative"
              style={{ 
                cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'10\' fill=\'none\' stroke=\'red\' stroke-width=\'2\'/%3E%3Cline x1=\'16\' y1=\'0\' x2=\'16\' y2=\'12\' stroke=\'red\' stroke-width=\'2\'/%3E%3Cline x1=\'16\' y1=\'20\' x2=\'16\' y2=\'32\' stroke=\'red\' stroke-width=\'2\'/%3E%3Cline x1=\'0\' y1=\'16\' x2=\'12\' y2=\'16\' stroke=\'red\' stroke-width=\'2\'/%3E%3Cline x1=\'20\' y1=\'16\' x2=\'32\' y2=\'16\' stroke=\'red\' stroke-width=\'2\'/%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'2\' fill=\'red\'/%3E%3C/svg%3E") 16 16, crosshair'
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2">🎯 Shoot It!</h3>
              <p className="text-sm text-gray-400">Click to destroy the cookie consent</p>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">How It Works</h2>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "DOM Modal Capture",
                description:
                  "Use html2canvas to capture the cookie consent modal as a high-resolution image",
                code: `const canvas = await html2canvas(modalRef.current, {
  backgroundColor: null,
  scale: 2
});
const imageData = canvas.toDataURL();`,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: "02",
                title: "Voronoi Tessellation",
                description:
                  "Generate 10-20 random points and create Voronoi cells using d3-delaunay for realistic shattering",
                code: `const points = Array.from({ length: 15 }, () => [
  Math.random() * width,
  Math.random() * height
]);
const delaunay = Delaunay.from(points);
const voronoi = delaunay.voronoi([0, 0, width, height]);`,
                gradient: "from-pink-500 to-orange-500",
              },
              {
                step: "03",
                title: "Physics Bodies",
                description:
                  "Create Matter.js bodies for each Voronoi shard with the captured image as texture",
                code: `const body = Matter.Bodies.fromVertices(
  centerX, centerY, [vertices],
  {
    render: {
      sprite: { texture: imageData }
    },
    restitution: 0.5,
    friction: 0.8
  }
);`,
                gradient: "from-orange-500 to-red-500",
              },
              {
                step: "04",
                title: "Explosive Force",
                description:
                  "Apply outward force from the center to all shards with random rotation for dramatic effect",
                code: `shards.forEach(shard => {
  const dx = shard.position.x - centerX;
  const dy = shard.position.y - centerY;
  const force = 0.015;
  
  Matter.Body.applyForce(shard, shard.position, {
    x: (dx / distance) * force,
    y: (dy / distance) * force
  });
  
  Matter.Body.setAngularVelocity(
    shard, 
    (Math.random() - 0.5) * 0.2
  );
});`,
                gradient: "from-red-500 to-purple-500",
              },
              {
                step: "05",
                title: "Screen Boundaries",
                description:
                  "Add invisible walls at screen edges so shards collide and settle at the bottom",
                code: `const walls = [
  // Bottom wall
  Matter.Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight + 25,
    window.innerWidth,
    50,
    { isStatic: true }
  ),
  // Side walls...
];
Matter.Composite.add(engine.world, walls);`,
                gradient: "from-purple-500 to-blue-500",
              },
              {
                step: "06",
                title: "Fade Out",
                description:
                  "After 3 seconds, gradually fade out the debris over 2 seconds before cleanup",
                code: `setTimeout(() => {
  const fadeInterval = setInterval(() => {
    const opacity = parseFloat(canvas.style.opacity);
    if (opacity > 0) {
      canvas.style.opacity = (opacity - 0.05).toString();
    } else {
      clearInterval(fadeInterval);
      cleanup();
    }
  }, 50);
}, 3000);`,
                gradient: "from-blue-500 to-cyan-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl font-black shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                    <pre className="bg-black/60 border border-white/10 rounded-xl p-4 overflow-x-auto">
                      <code className="text-sm text-cyan-300">{item.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="px-8 py-32 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-12 text-center">Technical Details</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Physics Configuration",
                icon: <Zap className="w-6 h-6" />,
                items: [
                  "Matter.js 2D physics engine",
                  "Gravity: { x: 0, y: 1, scale: 0.002 }",
                  "Restitution: 0.5 (bounciness)",
                  "Friction: 0.8 (surface resistance)",
                ],
              },
              {
                title: "Voronoi Settings",
                icon: <Sparkles className="w-6 h-6" />,
                items: [
                  "10-20 random seed points",
                  "d3-delaunay for tessellation",
                  "Clipped to modal bounds",
                  "Each cell becomes a physics body",
                ],
              },
              {
                title: "Rendering",
                icon: <Cookie className="w-6 h-6" />,
                items: [
                  "html2canvas for DOM capture",
                  "2x scale for retina displays",
                  "Transparent background",
                  "Image texture applied to shards",
                ],
              },
              {
                title: "Performance",
                icon: <Hammer className="w-6 h-6" />,
                items: [
                  "Canvas-based rendering",
                  "Cleanup after animation",
                  "Optimized body count (10-20)",
                  "Smooth 60fps physics",
                ],
              },
            ].map((section, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-gray-400 text-sm flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
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
      <section className="px-8 py-32 bg-gradient-to-t from-gray-950 to-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-6 text-center">Perfect For</h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Where destructible UI makes an impact
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Cookie Consent",
                description:
                  "Make cookie acceptance memorable and fun instead of annoying",
                emoji: "🍪",
                gradient: "from-orange-500/20 to-amber-500/20",
              },
              {
                title: "Promotional Modals",
                description:
                  "Let users smash through promotional overlays for a satisfying interaction",
                emoji: "💥",
                gradient: "from-red-500/20 to-pink-500/20",
              },
              {
                title: "Achievement Unlocks",
                description:
                  "Celebrate milestones by letting users destroy achievement cards",
                emoji: "🏆",
                gradient: "from-yellow-500/20 to-orange-500/20",
              },
              {
                title: "Game Interfaces",
                description:
                  "Add physicality to gaming UIs with destructible menus and dialogs",
                emoji: "🎮",
                gradient: "from-purple-500/20 to-blue-500/20",
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${useCase.gradient} border border-white/10 backdrop-blur-sm hover:scale-[1.02] transition-all group`}
              >
                <div className="text-5xl mb-4">{useCase.emoji}</div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render cookie consent */}
      {showCookie && (
        <SimpleCookieConsent
          onAccept={() => console.log("Accepted!")}
          onDecline={() => console.log("Declined")}
          buttonPosition={buttonPosition}
        />
      )}
    </div>
  );
}
