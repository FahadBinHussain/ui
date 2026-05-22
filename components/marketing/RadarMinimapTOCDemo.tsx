"use client";

import React from "react";
import { RadarMinimapTOC } from "@/components/ui/radar-minimap-toc";

export default function RadarMinimapTOCDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Radar TOC Component */}
      <RadarMinimapTOC
        containerSelector="main"
        position="right"
        width={280}
        height={500}
        primaryColor="#00ffff"
        secondaryColor="#ff00ff"
        scanlineEffect={true}
        glitchEffect={true}
        scrollOffset={100}
      />

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="mb-32">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Radar Mini-Map TOC
          </h1>
          <p className="text-2xl text-gray-400 leading-relaxed">
            A cyberpunk-inspired table of contents that visualizes your article
            structure as an interactive radar display. Hover to reveal headings,
            click to warp instantly with hyperspace effects.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">
            Introduction to Radar Navigation
          </h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Traditional table of contents are boring lists of text. This radar
            mini-map transforms your document structure into a living,
            breathing navigation system inspired by sci-fi interfaces and
            military HUDs.
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Look to the right side of your screen. You'll see the radar
            mini-map floating there, visualizing every heading in this
            document as horizontal bars. The longer and brighter the bar, the
            more important the heading (H1 vs H3).
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            The cyan rectangle shows your current viewport position. As you
            scroll, watch it move down the radar. The scanline sweeps
            continuously, giving that authentic radar feel.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">
            How the Radar System Works
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            1. Document Scanning
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            On mount, the component scans the document for all H1, H2, H3, and
            H4 elements. Each heading is mapped to a data structure containing
            its text, level, and position in the document. This data drives the
            radar visualization.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            2. Canvas Rendering
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Using HTML5 Canvas, we draw horizontal bars for each heading. The
            bar length, height, and opacity are calculated based on the heading
            level. H1 headings get long, bright cyan bars. H2 get slightly
            shorter purple bars. H3 and H4 get progressively smaller yellow and
            orange bars.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            3. Viewport Tracking
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            A scroll listener tracks your position in the document and converts
            it to a percentage (0-100%). This percentage determines where the
            viewport rectangle appears on the radar. The rectangle moves
            smoothly as you scroll, with corner brackets for that tactical UI
            aesthetic.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            4. Scanline Animation
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Using requestAnimationFrame, a horizontal line sweeps down the
            canvas continuously. This creates the signature radar scanline
            effect. The line is semi-transparent cyan with a subtle glow,
            reinforcing the high-tech surveillance aesthetic.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            5. Interactive Hover
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Mouse movement is tracked on the canvas. When your cursor gets
            close to a bar (within 12px), that bar expands and glows. A text
            overlay slides in from the right, revealing the actual heading text
            with a glitch animation effect. The text jitters horizontally to
            simulate digital interference.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            6. Hyperspace Warp
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Click any bar to instantly warp to that section. A radial flash
            effect fills the screen, followed by motion blur lines radiating
            from the center. The scroll happens instantly (no smooth scroll),
            creating a teleportation effect. After the warp, the effects fade
            out smoothly using GSAP animations.
          </p>
        </section>

        {/* Technical Deep Dive */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">
            Technical Implementation
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Canvas Drawing Loop
          </h3>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            The radar is redrawn every frame using requestAnimationFrame. This
            allows the scanline to animate smoothly and the viewport rectangle
            to track scroll position in real-time. Each frame:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 mb-6 space-y-2 ml-4">
            <li>Clear the canvas with a dark background</li>
            <li>Draw a grid pattern (horizontal lines every 20px)</li>
            <li>Render each heading bar with appropriate styling</li>
            <li>Draw the viewport rectangle at the scroll position</li>
            <li>Animate the scanline moving down</li>
            <li>Apply glow effects to hovered bars</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Color Coding System
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Different heading levels get different colors to create visual
            hierarchy: Cyan for H1, Purple for H2, Yellow for H3, Orange for
            H4. Each bar also has level indicator dots on the left side (1-4
            dots depending on heading level). This creates a multi-layered
            information display that's easy to parse at a glance.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Performance Considerations
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Despite running at 60fps, the component is highly optimized. Canvas
            drawing is faster than DOM manipulation. The scroll listener is
            passive (doesn't block scrolling). Heading scanning only happens on
            mount and resize. The glitch effect uses a short-lived interval
            that's cleaned up properly. Memory leaks are prevented by canceling
            animation frames and removing event listeners on unmount.
          </p>
        </section>

        {/* Use Cases */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">
            Perfect Use Cases
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Long-Form Articles
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Technical documentation, blog posts, and tutorials benefit from
            visual navigation. Readers can see the document structure at a
            glance and jump to sections instantly without scrolling.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Gaming Websites
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The cyberpunk aesthetic fits perfectly with gaming content. Game
            guides, patch notes, and esports articles become more engaging with
            this sci-fi navigation system.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Developer Portfolios
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Showcase your technical skills with an innovative navigation
            system. The radar mini-map demonstrates your ability to work with
            Canvas, animations, and creative UI patterns.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            SaaS Product Pages
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Modern SaaS products targeting developers or tech-savvy users can
            use this to make their landing pages stand out. It's functional,
            memorable, and reinforces a cutting-edge brand identity.
          </p>
        </section>

        {/* Customization */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">
            Customization Options
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Colors & Theme
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The primary and secondary colors can be customized to match your
            brand. Pass hex colors via props. The component automatically
            converts them to RGB for canvas rendering with proper opacity
            handling.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Position & Size
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Choose left or right positioning. Adjust width and height to fit
            your layout. The component is responsive and fixed-position, so it
            stays visible while scrolling.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Effects Toggle
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Disable the scanline effect for better performance on low-end
            devices. Toggle the glitch effect if you prefer a cleaner hover
            animation. Both props default to true but can be set to false.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Scroll Offset
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Adjust the scroll offset to account for fixed headers. The default
            is 100px, but you can set it to any value to ensure sections land
            at the perfect scroll position when warping.
          </p>
        </section>

        {/* Advanced Features */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">
            Advanced Features
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Auto-Generated IDs
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            If your headings don't have IDs, the component automatically
            generates them based on the heading text. This ensures every
            heading is clickable and warpable, even if you forget to add IDs
            manually.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Dynamic Content Support
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The component rescans headings on window resize. This ensures the
            radar stays accurate even if content is added or removed
            dynamically. Perfect for SPAs and dynamic content management
            systems.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Shadow DOM Compatibility
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Uses querySelector with a configurable container selector. This
            means you can scope the heading scan to a specific section of your
            page, avoiding conflicts with headers, footers, or sidebars.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            GSAP Integration
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            The hyperspace warp effect uses GSAP for smooth, GPU-accelerated
            animations. The motion blur lines and radial flash are timed
            perfectly to create a cohesive teleportation experience that feels
            instant yet cinematic.
          </p>
        </section>

        {/* Best Practices */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">
            Best Practices
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Use Semantic Headings
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Follow proper heading hierarchy (H1 → H2 → H3). Don't skip levels.
            The radar visualization works best when headings represent a clear
            document outline. Each H1 should have related H2s, each H2 should
            have related H3s, etc.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Keep Heading Text Concise
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The text overlay appears on hover, but it's designed for short
            headings (5-10 words). Longer headings will work but may overflow
            the screen on narrow viewports. Use CSS text-overflow if needed.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Test Scroll Performance
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            On very long documents (100+ headings), consider reducing the
            canvas height or filtering to show only H1 and H2. The component
            will work with any number of headings, but readability decreases if
            bars become too small.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Mobile Considerations
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            The radar is fixed-position and takes up screen space. On mobile,
            consider hiding it or positioning it at the bottom. You can use
            media queries to conditionally render the component based on screen
            width.
          </p>
        </section>

        {/* Accessibility */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">
            Accessibility Notes
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Keyboard Navigation
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Currently, the radar requires mouse interaction. To improve
            accessibility, consider adding keyboard focus states and
            arrow-key navigation. Tab should cycle through heading bars, Enter
            should trigger the warp.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Screen Readers
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Canvas content is invisible to screen readers. Include an
            aria-label on the canvas element describing its purpose. Optionally
            render a hidden &lt;nav&gt; with actual links for screen reader
            users.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Motion Sensitivity
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            The scanline and hyperspace warp effects involve motion. Respect
            prefers-reduced-motion by disabling animations for users who have
            this setting enabled. The warp can use smooth scroll instead of the
            flash effect.
          </p>
        </section>

        {/* Performance */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">
            Performance Optimization
          </h2>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Canvas vs SVG vs DOM
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Canvas was chosen over SVG or DOM because it's faster for
            continuous animations (60fps scanline). Canvas rendering is
            GPU-accelerated and doesn't trigger layout recalculations. For
            static visualizations, SVG might be better, but for this real-time
            radar effect, Canvas is ideal.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Request Animation Frame
          </h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Using RAF ensures animations sync with the browser's refresh rate.
            This prevents tearing and judder. The animation callback only runs
            when the tab is visible, saving battery on mobile devices.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Passive Event Listeners
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            The scroll listener uses {'{ passive: true }'} to tell the browser
            it won't call preventDefault(). This allows the browser to optimize
            scrolling performance, especially on mobile where touch scrolling
            needs to be buttery smooth.
          </p>
        </section>

        {/* Conclusion */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">
            Conclusion
          </h2>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            The Radar Mini-Map TOC reimagines document navigation as an
            interactive, visual experience. It's functional, performant, and
            memorable. Users don't just navigate your content—they feel like
            they're piloting through a digital space.
          </p>
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            By combining Canvas rendering, smooth animations, and sci-fi
            aesthetics, this component turns mundane table of contents into
            something users actually want to interact with. It's perfect for
            tech-forward brands that want to stand out.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Try scrolling back up and experimenting with the radar on the
            right. Hover over bars to reveal headings, click to warp instantly.
            Notice how the viewport rectangle tracks your position. This is
            navigation as it should be—intuitive, visual, and delightfully
            futuristic.
          </p>
        </section>
      </main>
    </div>
  );
}
