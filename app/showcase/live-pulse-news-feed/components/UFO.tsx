import React from 'react';

const UFO: React.FC = () => {
  return (
    <div className="absolute pointer-events-none z-50 ufo-animation flex flex-col items-center" style={{ left: '50%' }}>
      {/* UFO Body - 80px wide container for SVG */}
      <div className="w-20 h-10 flex items-center justify-center">
        <svg width="80" height="40" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          <ellipse cx="30" cy="18" rx="28" ry="8" fill="#94A3B8" stroke="#334155" strokeWidth="0.5"/>
          <path d="M15 15C15 8.37258 21.7157 3 30 3C38.2843 3 45 8.37258 45 15" fill="#E2E8F0" stroke="#334155" strokeWidth="0.5"/>
          {/* Blinking lights */}
          <circle cx="12" cy="18" r="1.5" fill="#EF4444" className="animate-pulse"/>
          <circle cx="21" cy="21" r="1.5" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: '0.1s' }}/>
          <circle cx="30" cy="22" r="1.5" fill="#10B981" className="animate-pulse" style={{ animationDelay: '0.2s' }}/>
          <circle cx="39" cy="21" r="1.5" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: '0.3s' }}/>
          <circle cx="48" cy="18" r="1.5" fill="#EF4444" className="animate-pulse" style={{ animationDelay: '0.4s' }}/>
          
          {/* Cockpit glow */}
          <ellipse cx="30" cy="10" rx="8" ry="4" fill="#67E8F9" fillOpacity="0.3"/>
        </svg>
      </div>
      
      {/* Tractor Beam - Center aligned within parent flex container */}
      <div className="w-16 h-32 bg-gradient-to-b from-emerald-400/40 via-emerald-400/20 to-transparent beam-animation" 
           style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', marginTop: '-8px', filter: 'blur(2px)' }}>
      </div>
    </div>
  );
};

export default UFO;
