"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { Home, Briefcase, UserCircle, Mail, Settings } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: UserCircle },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function LiquidMorphingNavigationBar() {
  const [activeId, setActiveId] = useState("home");
  const blobRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement }>({});

  const handleHover = (id: string) => {
    const targetElement = itemRefs.current[id];
    if (!targetElement || !blobRef.current || !navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const x = targetRect.left - navRect.left;
    const width = targetRect.width;

    gsap.to(blobRef.current, {
      x: x,
      width: width,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleClick = (id: string) => {
    setActiveId(id);
    handleHover(id);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* SVG Filter for gooey effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Liquid Morphing Navigation
        </h1>
        <p className="text-white/60 text-lg mb-12">
          Hover over the menu items to see the mercury-like blob morph
        </p>

        {/* Navigation Container with gooey filter */}
        <div
          ref={navRef}
          className="relative inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2"
          style={{ filter: "url(#gooey)" }}
        >
          {/* Morphing blob background */}
          <div
            ref={blobRef}
            className="absolute top-2 left-2 h-[calc(100%-16px)] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{
              width: itemRefs.current[activeId]?.offsetWidth || 100,
            }}
          />

          {/* Navigation Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current[item.id] = el;
                }}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => handleHover(item.id)}
                className={`
                  relative z-10 flex items-center gap-2 px-6 py-3 rounded-full
                  font-medium transition-all duration-300
                  ${
                    activeId === item.id
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }
                `}
                style={{
                  mixBlendMode: activeId === item.id ? "overlay" : "normal",
                }}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active section indicator */}
        <div className="mt-12 text-white/60 text-sm">
          Active: <span className="text-white font-semibold">{activeId}</span>
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 text-white text-sm text-center max-w-2xl">
        <p>
          The blob morphs between menu items like mercury using SVG filters
          (feGaussianBlur + feColorMatrix) and GSAP elastic easing
        </p>
      </div>
    </div>
  );
}
