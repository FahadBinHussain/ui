import Link from "next/link";
import BarbaDemo from "@/components/marketing/BarbaDemo";

export default function BarbaShowcase() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Barba.js Page Transitions
          </h1>
          <p className="text-xl text-gray-600">
            Create fluid and smooth transitions between pages with this powerful library
          </p>
        </div>

        {/* Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Live Demo</h2>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg overflow-hidden">
            <BarbaDemo />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Click the navigation buttons above to see the smooth page transitions in action!
          </p>
        </section>

        {/* What is Barba.js */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">What is Barba.js?</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Barba.js is a small (7kb minified and compressed) and easy-to-use library that helps you create fluid and smooth transitions
              between your website's pages. It makes your website run like a <strong>SPA (Single Page Application)</strong> and helps reduce
              the delay between your pages, minimize browser HTTP requests, and enhance your user's web experience.
            </p>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Installation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Step 1: Install Barba.js</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>pnpm add @barba/core</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Step 2: Create Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`"use client";

import { useEffect } from "react";
// @ts-ignore
import barba from "@barba/core";

export function BarbaTransition({ children }) {
  useEffect(() => {
    barba.init({
      transitions: [{
        name: "fade",
        leave(data) {
          return new Promise((resolve) => {
            data.current.container.style.opacity = "0";
            setTimeout(resolve, 500);
          });
        },
        enter(data) {
          data.next.container.style.opacity = "1";
          return Promise.resolve();
        },
      }],
    });
  }, []);

  return (
    <div data-barba="wrapper">
      <div data-barba="container">{children}</div>
    </div>
  );
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Step 3: Wrap Your Pages</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`import { BarbaTransition } from "@/components/ui/barba-transition";

export default function Layout({ children }) {
  return (
    <BarbaTransition>
      {children}
    </BarbaTransition>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Ultra Lightweight</h3>
              <p className="text-gray-600">
                Only 7kb minified and compressed - minimal impact on your bundle size
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Smooth Transitions</h3>
              <p className="text-gray-600">
                Create fluid page-to-page animations that enhance user experience
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-600">SPA Experience</h3>
              <p className="text-gray-600">
                Make your multi-page website feel like a Single Page Application
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600">Highly Customizable</h3>
              <p className="text-gray-600">
                Create custom transitions with hooks and lifecycle methods
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Perfect For</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <span className="text-gray-700"><strong>Portfolio websites</strong> - Showcase your work with elegant page transitions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <span className="text-gray-700"><strong>Marketing sites</strong> - Create engaging experiences that keep users browsing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <span className="text-gray-700"><strong>E-commerce</strong> - Reduce friction and improve the shopping experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✓</span>
              <span className="text-gray-700"><strong>Blogs</strong> - Make article-to-article navigation feel seamless</span>
            </li>
          </ul>
        </section>

        {/* Files Location */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Files Location</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
            <p className="mb-2">📁 Component:</p>
            <code className="text-blue-400">components/ui/barba-transition.tsx</code>
            <p className="mt-4 mb-2">📁 Demo:</p>
            <code className="text-purple-400">components/marketing/BarbaDemo.tsx</code>
          </div>
        </section>

        {/* Source Attribution */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-black">Source</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-2">This example is based on Barba.js official documentation</p>
            <a
              href="https://barba.js.org/docs/getstarted/intro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View Barba.js Documentation →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
