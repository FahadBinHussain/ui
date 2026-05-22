import React from 'react';

interface UIOverlayProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({ isOpen, onOpen }) => {
  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-12 transition-opacity duration-700 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      } pointer-events-auto`}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tighter text-white">
          ASTRO<span className="text-cyan-400">LAB</span>
        </h1>
        <nav className="space-x-8 text-sm uppercase tracking-widest text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Observations</a>
          <a href="#" className="hover:text-white transition-colors">Data</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      <main className="max-w-2xl">
        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 mb-6">
          EVENT HORIZON
        </h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
          Explore the boundaries of spacetime. Data visualization from the accretion disk
          of Sgr A* indicates massive temporal distortions.
        </p>
        <button
          onClick={onOpen}
          className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden hover:bg-cyan-400 transition-colors duration-300"
        >
          <span className="relative z-10">Initialize Singularity</span>
        </button>
      </main>

      <footer className="flex gap-4 text-xs text-gray-600 uppercase tracking-wider">
        <span>Lat: 45.92</span>
        <span>Long: -12.04</span>
        <span>Status: Stable</span>
      </footer>
    </div>
  );
};
