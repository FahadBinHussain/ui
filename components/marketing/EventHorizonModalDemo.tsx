'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BlackHoleScene } from './event-horizon-modal/BlackHoleScene';
import { Modal } from './event-horizon-modal/Modal';
import { UIOverlay } from './event-horizon-modal/UIOverlay';

const EventHorizonModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* The 3D Layer - Acts as the background and the distortion effect */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <BlackHoleScene isOpen={isOpen} />
        </Canvas>
      </div>

      {/* The DOM Layer - Interactive UI elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <UIOverlay isOpen={isOpen} onOpen={() => setIsOpen(true)} />
      </div>

      {/* The Event Horizon Modal */}
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <Modal onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default EventHorizonModalDemo;
