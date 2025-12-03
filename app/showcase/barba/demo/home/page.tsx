"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BarbaHome() {
  useEffect(() => {
    // Reinitialize Barba on route change
    if (typeof window !== "undefined" && (window as any).barba) {
      (window as any).barba.force(window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <nav className="p-8 flex justify-center gap-4">
        <Link 
          href="/showcase/barba/demo/home"
          className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium"
        >
          Home
        </Link>
        <Link 
          href="/showcase/barba/demo/about"
          className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30"
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

      <div className="max-w-4xl mx-auto px-8 py-16 text-white" data-barba="container" data-barba-namespace="home">
        <h1 className="text-6xl font-bold mb-6">Home Page</h1>
        <p className="text-2xl opacity-90 mb-8">
          Welcome! This is a real multi-page setup with Barba.js page transitions.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Features:</h2>
          <ul className="space-y-2">
            <li>✓ Real URL changes</li>
            <li>✓ Browser history support</li>
            <li>✓ Smooth fade transitions</li>
            <li>✓ No page reload</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
