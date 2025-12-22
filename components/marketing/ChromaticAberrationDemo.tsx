"use client";

import React from "react";
import { ChromaticAberration, ChromaticText } from "@/components/ui/chromatic-aberration";
import { Eye, MousePointer2, ArrowDown, Sparkles } from "lucide-react";

export default function ChromaticAberrationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center mb-12">
            <ChromaticText text="GLITCH" intensity={8} trigger="always" className="mb-6" />
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">
              Chromatic Aberration Distortion
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The "Bad TV" look. <span className="text-red-400">RGB channels split</span> aggressively 
              on interactions, creating that iconic digital glitch aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
              <MousePointer2 className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <ChromaticText text="HOVER" intensity={5} trigger="hover" />
              <p className="text-sm text-slate-400 mt-2">Hover to activate</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
              <ArrowDown className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <ChromaticText text="SCROLL" intensity={10} trigger="scroll" />
              <p className="text-sm text-slate-400 mt-2">Scroll to see effect</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
              <Eye className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <ChromaticText text="MOUSE" intensity={8} trigger="mouse" />
              <p className="text-sm text-slate-400 mt-2">Move mouse fast</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
              <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <ChromaticText text="ALWAYS" intensity={4} trigger="always" />
              <p className="text-sm text-slate-400 mt-2">Constant effect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Section */}
      <section className="py-40 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <ChromaticAberration intensity={15} trigger="scroll">
            <h2 className="text-7xl font-bold mb-6">SCROLL DOWN</h2>
          </ChromaticAberration>
          <p className="text-xl text-slate-300">
            The faster you scroll, the more the colors split apart
          </p>
        </div>
      </section>

      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ChromaticAberration intensity={15} trigger="scroll">
            <h2 className="text-7xl font-bold mb-6 text-cyan-400">CYBERPUNK</h2>
          </ChromaticAberration>
          <p className="text-xl text-slate-300">
            Perfect for sci-fi and tech-themed designs
          </p>
        </div>
      </section>

      {/* Large Interactive Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <ChromaticAberration intensity={6} trigger="mouse" className="w-full">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-16 text-center">
              <h3 className="text-8xl font-bold mb-6 bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
                MOVE YOUR MOUSE
              </h3>
              <p className="text-2xl text-slate-300">
                Fast movements create intense distortion
              </p>
            </div>
          </ChromaticAberration>
        </div>
      </section>

      <div className="h-96" />
    </div>
  );
}
