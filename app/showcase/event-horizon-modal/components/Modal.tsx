import React, { useEffect, useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay appearance slightly to match the black hole growing
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative w-[90vw] max-w-lg bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'
      }`}
    >
      {/* Glow effects around modal */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-lg animate-pulse" />
      
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/10">
            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Singularity Reached</h3>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          You have crossed the event horizon. The surrounding data is now trapped in a gravitational well. 
          Normal spacetime geometry no longer applies here.
        </p>

        <div className="space-y-3">
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-colors">
                Download Telemetry
            </button>
            <button 
                onClick={onClose}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
                Escape Gravity Well
            </button>
        </div>
      </div>
    </div>
  );
};
