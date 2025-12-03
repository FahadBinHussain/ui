"use client";

import Link from "next/link";

export default function BarbaServices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600">
      <nav className="p-8 flex justify-center gap-4">
        <Link 
          href="/showcase/barba/demo/home"
          className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30"
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
          className="px-6 py-2 bg-white text-orange-600 rounded-lg font-medium"
        >
          Services
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16 text-white" data-barba="container" data-barba-namespace="services">
        <h1 className="text-6xl font-bold mb-6">Services Page</h1>
        <p className="text-2xl opacity-90 mb-8">
          Our services with scale transition effect when leaving this page!
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Web Development</h3>
            <p className="opacity-90">Custom websites with smooth transitions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
            <p className="opacity-90">Beautiful user experiences</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Consulting</h3>
            <p className="opacity-90">Expert advice and guidance</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="opacity-90">24/7 customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
