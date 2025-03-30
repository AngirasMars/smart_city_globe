import React from 'react';
import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Marker = ({ position, textureUrl }) => {
  const texture = useLoader(TextureLoader, textureUrl);
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const Markers = () => {
  return (
    <>
      <Marker position={[1, 1, 2]} textureUrl="/marker.png" />
      <Marker position={[-2, 0, -2]} textureUrl="/marker.png" />
    </>
  );
};

export default Markers;
