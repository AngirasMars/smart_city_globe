// src/Globe/index.js
import React, { useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import cities from '../data/cities';

import earthTextureImg from '../assets/textures/Earth1.JPEG';
import spaceTextureImg from '../assets/textures/Stars.JPEG';

const RADIUS = 2;

const latLonToXYZ = (lat, lon, radius = RADIUS) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
};

const Marker = ({ position, name, onClick, cameraZoom }) => {
  const scale = Math.max(0.05, 0.25 / cameraZoom); // scales with zoom

  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color="yellow" emissive="gold" emissiveIntensity={0.6} />
      <Html
        position={[0, 0.15, 0]}
        distanceFactor={10}
        style={{
          color: 'white',
          fontSize: `${Math.max(0.125, 0.3 / cameraZoom)}rem`, // Reduced further
          background: 'rgba(0,0,0,0.5)',
          padding: '1px 3px',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {name}
      </Html>
    </mesh>
  );
};

const Earth = () => {
  const earthTexture = useLoader(THREE.TextureLoader, earthTextureImg);
  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

const CameraTracker = ({ onZoomChange }) => {
  useFrame(({ camera }) => {
    onZoomChange(camera.position.length());
  });
  return null;
};

const Globe = ({ onCityClick }) => {
  const [cameraZoom, setCameraZoom] = useState(5);
  const spaceTexture = useLoader(THREE.TextureLoader, spaceTextureImg);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ height: '100vh', width: '100vw' }}
      onCreated={({ scene }) => {
        scene.background = spaceTexture;
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1} castShadow />

      <CameraTracker onZoomChange={setCameraZoom} />

      <Earth />
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={latLonToXYZ(city.lat, city.lon)}
          name={city.name}
          onClick={() => onCityClick?.(city)}
          cameraZoom={cameraZoom}
        />
      ))}

      <OrbitControls enableZoom enableRotate />
    </Canvas>
  );
};

export default Globe;