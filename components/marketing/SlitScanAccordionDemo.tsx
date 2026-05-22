"use client";

import React from "react";
import { SlitScanAccordion } from "@/components/ui/slit-scan-accordion";

const faqItems = [
  {
    question: "What is a slit-scan effect?",
    answer:
      "Slit-scan is a technique where image scanning occurs at a different rate than film transport, creating stretched or compressed imagery. Originally used in 2001: A Space Odyssey for the stargate sequence, we've adapted this concept for digital UI. When you open an accordion item, the content materializes from infinitely stretched vertical lines, gradually normalizing into readable text. This creates a unique digital materialization effect.",
  },
  {
    question: "How does the WebGL shader work?",
    answer:
      "The shader manipulates texture coordinates (UVs) based on an animation progress value. At progress 0, UVs are stretched vertically by a factor of 50x, compressing the content into single-pixel horizontal lines. As progress approaches 1, the stretch factor decreases to 0, allowing the content to appear normally. We also add scanline glitches and chromatic aberration for that authentic digital-glitch aesthetic.",
  },
  {
    question: "Why combine WebGL with GSAP height animation?",
    answer:
      "The WebGL canvas handles the visual slit-scan effect, but it doesn't affect DOM layout. By animating the container height with GSAP simultaneously, we ensure the page content flows naturally—elements below the accordion push down smoothly. After the shader animation completes, we swap the canvas for the actual HTML content, maintaining accessibility and allowing users to select text and click links.",
  },
  {
    question: "What are the performance implications?",
    answer:
      "WebGL is GPU-accelerated, so the shader runs efficiently even on mobile devices. The main cost is texture creation from HTML content. We use an offscreen canvas to rasterize text, which is faster than html2canvas but means we can't capture complex CSS styling. For production use with rich content, consider pre-rendering content images or using simplified HTML. Each accordion item creates its own WebGL context, so limit to 5-10 items max.",
  },
  {
    question: "Can I customize the effect?",
    answer:
      "Absolutely! The stretch factor (currently 50x), animation duration (0.6s), and easing function are all configurable. You can modify the shader to add different glitch patterns, color shifts, or distortions. The chromatic aberration amount, scanline frequency, and fade curves are exposed as shader uniforms. You can even swap the slit-scan for other effects like pixelation, mosaic, or wave distortions by changing the UV manipulation logic.",
  },
  {
    question: "Is this accessible?",
    answer:
      "Yes! After the animation completes, the actual HTML content is displayed, which is fully accessible to screen readers and keyboard navigation. During the animation, screen readers will announce the accordion state change immediately. The visual effect is purely cosmetic and doesn't interfere with semantic HTML structure. Users with reduced motion preferences should see instant transitions without the shader effect (implement via prefers-reduced-motion).",
  },
];

export default function SlitScanAccordionDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Slit-Scan Accordion
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            FAQ sections that unfold with a pixel-stretch glitch effect inspired
            by 2001: A Space Odyssey's stargate sequence
          </p>
        </div>

        {/* Demo */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">
            Interactive FAQ Demo
          </h2>
          <SlitScanAccordion
            items={faqItems}
            primaryColor="#00ffff"
            secondaryColor="#ff00ff"
          />
        </div>

        {/* Technical Breakdown */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-purple-400">
            Technical Breakdown
          </h2>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                1. WebGL Context Initialization
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Each accordion item creates its own WebGL rendering context. We
                compile vertex and fragment shaders, create a full-screen quad
                (two triangles covering the canvas), and prepare texture buffers.
                The vertex shader is trivial—it just passes through positions and
                texture coordinates. All the magic happens in the fragment shader.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                2. Content Texture Capture
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                When an item opens, we need to convert HTML content into a WebGL
                texture. We temporarily render the content to an offscreen canvas,
                drawing text with word wrapping. This rasterized image is uploaded
                to the GPU as a texture using <code className="px-2 py-1 bg-black/30 rounded">texImage2D</code>.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                For complex HTML with images, styles, and layout, you'd need a more
                robust solution like html2canvas or dom-to-image. Our simplified
                approach works great for text-only content.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                3. Fragment Shader UV Manipulation
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                The slit-scan effect is achieved by distorting texture coordinates:
              </p>
              <pre className="bg-black/50 p-4 rounded-lg text-sm overflow-x-auto text-green-400 mb-4">
{`float stretch = 1.0 - u_progress;
float stretchFactor = 1.0 + stretch * 50.0;
float centerY = 0.5;
float offsetY = (uv.y - centerY) * stretchFactor;
float newY = centerY + offsetY;`}
              </pre>
              <p className="text-lg text-gray-300 leading-relaxed">
                At <code className="px-2 py-1 bg-black/30 rounded">progress = 0</code>, <code className="px-2 py-1 bg-black/30 rounded">stretchFactor = 51</code>, compressing content into
                lines. At <code className="px-2 py-1 bg-black/30 rounded">progress = 1</code>, <code className="px-2 py-1 bg-black/30 rounded">stretchFactor = 1</code>, showing normal UVs.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                4. Glitch Enhancements
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                We layer additional effects for that digital aesthetic:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 ml-4">
                <li>
                  <strong>Scanlines:</strong> Sine wave perturbations based on Y
                  coordinate and time
                </li>
                <li>
                  <strong>Chromatic aberration:</strong> Sample R, G, B channels at
                  slightly offset UVs during stretch
                </li>
                <li>
                  <strong>Alpha fade:</strong> Content opacity tied to progress for
                  smooth materialization
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                5. GSAP Height Animation
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                While the canvas displays the shader effect, GSAP animates the
                container's height from 0 to the content's measured height. This
                ensures smooth layout reflow. Once the animation completes, we hide
                the canvas and show the actual HTML content, allowing text
                selection and interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400">
            Perfect Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-3 text-cyan-300">
                🎮 Tech & Gaming Sites
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The sci-fi glitch aesthetic fits perfectly with gaming, esports,
                and tech product pages. Makes FAQ sections feel cutting-edge.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold mb-3 text-purple-300">
                💼 SaaS Products
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Developer tools and API documentation can use this to stand out.
                Shows technical sophistication and attention to detail.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold mb-3 text-green-300">
                🎨 Creative Portfolios
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Designers and developers can showcase their skills with this
                unique interaction pattern that demonstrates WebGL mastery.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold mb-3 text-yellow-300">
                🚀 Product Launches
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Create memorable launch pages where product details unfold with
                cinematic flair. Perfect for building hype and anticipation.
              </p>
            </div>
          </div>
        </div>

        {/* Customization */}
        <div>
          <h2 className="text-4xl font-bold mb-8 text-purple-400">
            Customization Options
          </h2>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Shader Modifications
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Edit the fragment shader to create different effects: mosaic
                pixelation, wave distortions, or kaleidoscope patterns. The UV
                manipulation approach works for any coordinate transformation.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Animation Timing
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Adjust duration and easing in the GSAP tweens. Try <code className="px-2 py-1 bg-black/30 rounded">expo.out</code>{" "}
                for snappier reveals or <code className="px-2 py-1 bg-black/30 rounded">elastic.out</code> for bouncy effects. The
                canvas and height animations can have different timings for
                creative stagger effects.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">
                Color Schemes
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Pass custom <code className="px-2 py-1 bg-black/30 rounded">primaryColor</code> and <code className="px-2 py-1 bg-black/30 rounded">secondaryColor</code> props to
                match your brand. These control the border highlights and chevron
                icon colors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
