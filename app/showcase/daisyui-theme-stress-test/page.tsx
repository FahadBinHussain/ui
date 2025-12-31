"use client";

import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ComponentSpec from './components/ComponentSpec';
import { useTheme } from './hooks/useTheme';

export default function DaisyUIThemeStressTestPage() {
  const { theme, changeTheme, mounted } = useTheme();

  useEffect(() => {
    // Load DaisyUI and Tailwind CSS from CDN
    const daisyLink = document.createElement('link');
    daisyLink.href = 'https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css';
    daisyLink.rel = 'stylesheet';
    daisyLink.type = 'text/css';
    daisyLink.id = 'daisyui-cdn';
    
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.id = 'tailwind-cdn';
    
    document.head.appendChild(daisyLink);
    document.head.appendChild(tailwindScript);

    return () => {
      // Cleanup on unmount
      const existingLink = document.getElementById('daisyui-cdn');
      const existingScript = document.getElementById('tailwind-cdn');
      if (existingLink) existingLink.remove();
      if (existingScript) existingScript.remove();
    };
  }, []);

  // Prevent hydration mismatch or flash by waiting for mount
  if (!mounted) {
    return <div className="min-h-screen bg-base-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100 text-base-content pb-20 transition-colors duration-200 ease-in-out">
      <Navbar currentTheme={theme} onThemeChange={changeTheme} />
      
      <main className="container mx-auto px-4" style={{ maxWidth: '1400px' }}>
        <Hero />
        
        <div className="divider">FEATURES</div>
        <FeatureGrid />
        
        <div className="divider">COMPONENT SPEC</div>
        <ComponentSpec />
      </main>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10">
        <div>
          <p>Copyright © {new Date().getFullYear()} - Theme Stress Test App</p>
        </div>
      </footer>
    </div>
  );
}
