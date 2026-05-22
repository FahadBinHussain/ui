import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, createPortal } from '@react-three/fiber';
import { useFBO, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingContent } from './FloatingContent';
import { DistortionPass } from './DistortionPass';

interface BlackHoleSceneProps {
  isOpen: boolean;
}

export const BlackHoleScene: React.FC<BlackHoleSceneProps> = ({ isOpen }) => {
  const { gl, scene, size, viewport } = useThree();
  
  // Create a separate scene for the content that will be distorted
  const virtualScene = useMemo(() => new THREE.Scene(), []);
  virtualScene.background = new THREE.Color('#050505');

  // Create an off-screen buffer (FBO)
  const fbo = useFBO(size.width, size.height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
  });

  // Reference for the virtual camera
  const camRef = useRef<THREE.PerspectiveCamera>(null!);

  useFrame((state) => {
    if (!camRef.current) return;

    // 1. Render the virtual scene into the FBO
    gl.setRenderTarget(fbo);
    gl.render(virtualScene, camRef.current);
    
    // 2. Render the post-processing quad to the screen (null target)
    gl.setRenderTarget(null);
    // The DistortionPass component handles the actual rendering of the quad
  });

  return (
    <>
      {/* Portal moves the content into the virtual scene so it's not rendered directly */}
      {createPortal(
        <>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <FloatingContent />
        </>,
        virtualScene
      )}

      {/* Virtual Camera used to capture the scene */}
      <PerspectiveCamera ref={camRef} position={[0, 0, 5]} fov={45} />

      {/* The Quad that displays the distorted FBO texture */}
      <DistortionPass texture={fbo.texture} isOpen={isOpen} />
    </>
  );
};
