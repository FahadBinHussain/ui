"use client";

import React from "react";
import {
  VideoTextMasking,
  SVGVideoTextMask,
  CanvasVideoTextMask,
  HeroVideoText,
} from "@/components/ui/video-text-masking";

export default function VideoTextMaskingDemo() {
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section with Video Text */}
      <HeroVideoText
        text="IMPACT"
        videoSrc={videoUrl}
        subtitle="High-impact hero sections with video-filled typography"
      />

      {/* Intro Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">Video Text Masking</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Big, bold typography where the "ink" of the text is actually a{" "}
              <span className="text-purple-400">playing video</span>. Perfect for high-impact hero sections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-purple-500/30 p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">
                Canvas Compositing
              </h3>
              <p className="text-slate-400 text-sm">
                Uses Canvas API with <code className="bg-slate-950 px-2 py-1 rounded">destination-in</code> for pixel-perfect video text rendering
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-pink-500/30 p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-pink-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                SVG Masking
              </h3>
              <p className="text-slate-400 text-sm">
                SVG <code className="bg-slate-950 px-2 py-1 rounded">{'<mask>'}</code> with foreignObject for best browser support and precise control
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-cyan-500/30 p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">
                Hero Component
              </h3>
              <p className="text-slate-400 text-sm">
                Full hero section with video text and background effects for maximum impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Background Clip Method */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Canvas Compositing Method</h3>
            <p className="text-slate-400 text-lg">
              Pixel-perfect control with real-time video rendering
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-12">
            <div className="flex justify-center mb-8">
              <VideoTextMasking
                text="INNOVATE"
                videoSrc={videoUrl}
                fontSize="10rem"
                fontWeight="900"
              />
            </div>

            <div className="mt-12 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">
                Implementation
              </h4>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`const canvas = useRef<HTMLCanvasElement>(null);
const video = useRef<HTMLVideoElement>(null);

// Render loop
requestAnimationFrame(() => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.font = 'bold 200px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
});
`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Masking Method */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">SVG Masking Method</h3>
            <p className="text-slate-400 text-lg">
              Best cross-browser support
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-12">
            <div className="flex justify-center mb-8">
              <SVGVideoTextMask
                text="EXPLORE"
                videoSrc={videoUrl}
              />
            </div>

            <div className="mt-12 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-pink-400">
                Implementation
              </h4>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`<svg>
  <defs>
    <mask id="textMask">
      <rect width="100%" height="100%" fill="black" />
      <text fill="white" fontSize="120" fontWeight="900">
        EXPLORE
      </text>
    </mask>
  </defs>
  
  <foreignObject width="100%" height="100%" mask="url(#textMask)">
    <video src="video.mp4" autoPlay loop muted />
  </foreignObject>
</svg>
`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Canvas Method */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Canvas Compositing Method</h3>
            <p className="text-slate-400 text-lg">
              Pixel-perfect control with JavaScript
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-3xl border border-slate-700/50 p-12">
            <CanvasVideoTextMask
              text="CREATE"
              videoSrc={videoUrl}
            />

            <div className="mt-12 bg-slate-950 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">
                Implementation
              </h4>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{`ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// Use destination-in composite operation
ctx.globalCompositeOperation = "destination-in";

// Draw text as mask
ctx.font = "900 120px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "white";
ctx.fillText("CREATE", canvas.width / 2, canvas.height / 2);
`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Method Comparison</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-purple-400">Method</th>
                  <th className="px-6 py-4 text-left text-purple-400">Browser Support</th>
                  <th className="px-6 py-4 text-left text-purple-400">Performance</th>
                  <th className="px-6 py-4 text-left text-purple-400">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-400">CSS Background Clip</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className="text-green-400">✓</span> Modern browsers<br />
                    <span className="text-yellow-400">⚠</span> Prefix required
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className="text-green-400">Excellent</span> - GPU accelerated
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Hero sections, landing pages
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-pink-400">SVG Masking</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className="text-green-400">✓</span> All modern browsers<br />
                    <span className="text-green-400">✓</span> Best support
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className="text-green-400">Very Good</span> - Native SVG
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Production apps, wide compatibility
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-cyan-400">Canvas Compositing</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className="text-green-400">✓</span> Universal support<br />
                    <span className="text-green-400">✓</span> No prefix needed
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <span className="text-yellow-400">Good</span> - Requires JS loop
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    Custom effects, precise control
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Usage Example */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Usage Example</h2>
          </div>

          <div className="bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`import { VideoTextMasking, SVGVideoTextMask } from "@/components/ui/video-text-masking";

// CSS Background Clip Method
<VideoTextMasking
  text="IMPACT"
  videoSrc="/hero-video.mp4"
  fontSize="10rem"
  fontWeight="900"
/>

// SVG Masking Method (Best compatibility)
<SVGVideoTextMask
  text="EXPLORE"
  videoSrc="/background.mp4"
/>

// Hero Section
<HeroVideoText
  text="INNOVATE"
  videoSrc="/hero.mp4"
  subtitle="High-impact hero with video-filled typography"
/>
`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold mb-3">Product Launches</h3>
              <p className="text-slate-400">
                Grab attention with dynamic video-filled headlines showing product features.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl border border-pink-500/30 p-8">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold mb-3">Creative Portfolios</h3>
              <p className="text-slate-400">
                Showcase work with video-filled typography that plays your reel or highlights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30 p-8">
              <div className="text-4xl mb-4">🎪</div>
              <h3 className="text-2xl font-semibold mb-3">Event Promotions</h3>
              <p className="text-slate-400">
                High-energy event pages with video clips of past shows inside the title.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-3">
              <span>⚡</span>
              Performance Tips
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Optimize Video:</strong> Use short loops (5-10s), compress to H.264/VP9, aim for {"<"}5MB</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Lazy Load:</strong> Only load video when viewport is visible to save bandwidth</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Fallback Image:</strong> Show poster image while video loads for instant visual</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Mobile Alternatives:</strong> Use static images or GIFs on mobile to save data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span><strong>Mute & Autoplay:</strong> Always mute and autoplay for better UX and browser support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
