"use client";

import React, { useState } from "react";
import {
  ScratchCard,
  ScratchCoupon,
  ScratchGift,
  ScratchMystery,
} from "@/components/ui/scratch-card";
import { Gift, Tag, Sparkles } from "lucide-react";

export default function ScratchCardDemo() {
  const [revealed1, setRevealed1] = useState(false);
  const [revealed2, setRevealed2] = useState(false);
  const [revealed3, setRevealed3] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            Scratch-to-Reveal Cards
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive scratch cards using Canvas API—drag to erase and reveal
            hidden prizes, coupons, or messages
          </p>
        </div>

        {/* Coupon Demo */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-yellow-400">
            Promo Code Coupon
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-yellow-500/30 overflow-hidden">
              <div className="h-96">
                <ScratchCoupon
                  code="SAVE50NOW"
                  discount="50%"
                  onReveal={() => {
                    setRevealed1(true);
                    console.log("Coupon revealed!");
                  }}
                  className="rounded-xl"
                />
              </div>
              <div className="p-8 text-center">
                <p className="text-gray-300 text-lg">
                  {revealed1
                    ? "🎉 Coupon revealed! Copy the code above"
                    : "Scratch away the grey layer to reveal your discount code"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gift Reveal Demo */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
            Gift Reveal
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="h-80">
                <ScratchGift
                  title="FREE UPGRADE"
                  description="Premium plan for 3 months"
                  onReveal={() => setRevealed2(true)}
                  className="rounded-xl"
                />
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-400 text-sm">
                  {revealed2 ? "Gift unlocked!" : "Scratch to reveal your gift"}
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="h-80">
                <ScratchMystery
                  prize={
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-8 text-white">
                      <Sparkles className="w-16 h-16 mb-4" />
                      <h3 className="text-4xl font-bold mb-2">JACKPOT!</h3>
                      <p className="text-xl">You won $100 credit</p>
                    </div>
                  }
                  onReveal={() => setRevealed3(true)}
                  className="rounded-xl"
                />
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-400 text-sm">
                  {revealed3
                    ? "Mystery revealed!"
                    : "Scratch to uncover the mystery"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Breakdown */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                🎨 Canvas Layers
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Two layers: a hidden prize div underneath, and an HTML5 Canvas
                on top filled with a solid color or texture. The canvas starts
                opaque, hiding the prize.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`<div className="prize">Prize!</div>
<canvas className="scratch-layer" />`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                ✏️ Destination-Out Compositing
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                globalCompositeOperation = 'destination-out' makes drawing erase
                instead of adding pixels. We draw circles at cursor position to
                create the scratch effect.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`ctx.globalCompositeOperation = 
  'destination-out';
ctx.arc(x, y, brushSize, 0, 2π);
ctx.fill();`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                👆 Touch & Mouse Events
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Track mousemove/touchmove events, get coordinates relative to
                canvas bounds, and draw eraser circles at those positions. Works
                seamlessly on desktop and mobile.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`onMouseMove={(e) => {
  const x = e.clientX - rect.left;
  scratch(x, y);
}}`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                📊 Auto-Reveal Threshold
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Track scratched area by accumulating brush circle areas. When
                scratched pixels exceed threshold (default 50%), auto-fade the
                entire canvas with GSAP for a satisfying reveal.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`if (scratched > total * 0.5) {
  gsap.to(canvas, {
    opacity: 0, duration: 0.8
  });
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
            Perfect Use Cases
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
              <Tag className="w-12 h-12 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                E-Commerce Coupons
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Gamify discount code reveals. Increases engagement and makes
                promotions memorable.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <Gift className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-3 text-purple-300">
                Giveaways & Contests
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Let users scratch to see if they won. Creates anticipation and
                excitement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
              <Sparkles className="w-12 h-12 mb-4 text-cyan-400" />
              <h3 className="text-xl font-bold mb-3 text-cyan-300">
                Mystery Rewards
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Surprise users with hidden bonuses, loyalty points, or exclusive
                content.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
              <Gift className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-3 text-green-300">
                Gamification
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Add playful interactions to onboarding, achievements, or
                milestone celebrations.
              </p>
            </div>
          </div>
        </div>

        {/* Customization */}
        <div>
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">
            Customization Options
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                Brush Size & Threshold
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Adjust{" "}
                <code className="px-2 py-1 bg-black/30 rounded">brushSize</code>{" "}
                (default 30px) for larger/smaller eraser. Change{" "}
                <code className="px-2 py-1 bg-black/30 rounded">
                  revealThreshold
                </code>{" "}
                (0-1) to control how much needs to be scratched before
                auto-reveal.
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
                {`<ScratchCard 
  brushSize={50} 
  revealThreshold={0.3} 
/>`}
              </pre>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                Custom Scratch Layers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Use{" "}
                <code className="px-2 py-1 bg-black/30 rounded">
                  scratchColor
                </code>{" "}
                for solid colors or{" "}
                <code className="px-2 py-1 bg-black/30 rounded">
                  scratchTexture
                </code>{" "}
                for image overlays (metallic, glittery, branded patterns). The
                component auto-generates noise texture if neither is provided.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                onReveal Callback
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Hook into the{" "}
                <code className="px-2 py-1 bg-black/30 rounded">onReveal</code>{" "}
                callback to trigger analytics events, show success messages,
                apply coupons, or unlock content when the card is fully revealed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
