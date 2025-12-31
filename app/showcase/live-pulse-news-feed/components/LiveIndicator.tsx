import React from 'react';
import UFO from './UFO';

interface LiveIndicatorProps {
  isAbducted: boolean;
  isReturning: boolean;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isAbducted, isReturning }) => {
  return (
    <div className="relative flex items-center justify-center h-6 w-6">
      {/* UFO only appears during abduction cycle */}
      {isAbducted && <UFO />}

      <div className={`relative flex items-center justify-center h-full w-full ${isAbducted ? 'abduct-animation' : ''} ${isReturning ? 'return-animation' : ''}`}>
        {/* Radiating Waves - Center using top/left 50% and translate */}
        <span className="absolute top-1/2 left-1/2 h-full w-full rounded-full bg-red-400 opacity-0 animate-sonar-wave"></span>
        <span className="absolute top-1/2 left-1/2 h-full w-full rounded-full bg-red-400 opacity-0 animate-sonar-wave-delayed"></span>
        
        {/* Secondary tight pulse ring */}
        <span className="absolute top-1/2 left-1/2 h-4 w-4 rounded-full bg-red-500 opacity-75 animate-pulse-ring"></span>
        
        {/* Inner solid dot (relative to provide size to the flex container) */}
        <span className="relative z-10 block rounded-full h-2.5 w-2.5 bg-red-600 animate-pulse-dot shadow-[0_0_10px_rgba(220,38,38,0.6)]"></span>
      </div>
    </div>
  );
};

export default LiveIndicator;
