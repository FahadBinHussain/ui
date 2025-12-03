"use client";

import Link from "next/link";

export default function BarbaContact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-rose-600">
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
          className="px-6 py-2 bg-white text-pink-600 rounded-lg font-medium"
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

      <div className="max-w-4xl mx-auto px-8 py-16 text-white" data-barba="container" data-barba-namespace="contact">
        <h1 className="text-6xl font-bold mb-6">Contact Page</h1>
        <p className="text-2xl opacity-90 mb-8">
          Get in touch! If you came from About, you saw a slide transition.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Contact Information:</h2>
          <ul className="space-y-2">
            <li>✉️ Email: hello@example.com</li>
            <li>📞 Phone: +1 (555) 123-4567</li>
            <li>📍 Location: San Francisco, CA</li>
            <li>🌐 Social: @barbajs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
