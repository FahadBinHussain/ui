"use client";

import Link from "next/link";

export default function BarbaAbout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600">
      <nav className="p-8 flex justify-center gap-4">
        <Link 
          href="/showcase/barba/demo/home"
          className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30"
        >
          Home
        </Link>
        <Link 
          href="/showcase/barba/demo/about"
          className="px-6 py-2 bg-white text-green-600 rounded-lg font-medium"
        >
          About
        </Link>
        <Link 
          href="/showcase/barba/demo/contact"
          className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30"
        >
          Contact
        </Link>
        <Link 
          href="/showcase/barba/demo/services"
          className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30"
        >
          Services
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16 text-white" data-barba="container" data-barba-namespace="about">
        <h1 className="text-6xl font-bold mb-6">About Page</h1>
        <p className="text-2xl opacity-90 mb-8">
          Learn more about us! Notice the smooth transition when you navigated here.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Transition Details:</h2>
          <ul className="space-y-2">
            <li>✓ URL changed to /about</li>
            <li>✓ Fade transition applied</li>
            <li>✓ New namespace: "about"</li>
            <li>✓ Navigate to Contact for slide effect!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
