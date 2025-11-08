"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Player from "./Player";
import CameraRig from "./CameraRig";
import NavMarker from "./NavMarker";
import HUD from "./HUD";
import { useEffect } from "react";

export default function GameCanvas() {
  useEffect(() => {
    // simple neon body class
    document.body.classList.add("grid-on");
    return () => document.body.classList.remove("grid-on");
  }, []);

  return (
    <div className="relative h-[calc(100vh-160px)] w-full rounded-xl border border-neutral-800">
      <Canvas
        shadows
        camera={{ position: [0, 3, 6], fov: 55 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0a0a0b"), 1);
        }}
      >
        {/* sky and lights */}
        <Stars radius={80} depth={12} factor={4} saturation={0} speed={0.6} />
        <hemisphereLight intensity={0.3} color={"#88ccff"} groundColor={"#441144"} />
        <directionalLight position={[6, 10, 6]} castShadow intensity={1.2} color={"#00e5ff"} />

        {/* ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#111218" />
        </mesh>

        {/* simple city blocks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 8, 1.5, Math.cos(i) * 8]} castShadow>
            <boxGeometry args={[2, 3 + (i % 3), 2]} />
            <meshStandardMaterial color="#151a23" emissive="#27123a" emissiveIntensity={0.2} />
          </mesh>
        ))}

        {/* player and camera */}
        <Player />
        <CameraRig />

        {/* nav markers for site destinations */}
        <NavMarker position={[0, 0, -2]} label="Main" href="/" color="#00E5FF" />
        <NavMarker position={[4, 0, -1]} label="About" href="/about" color="#FF00E5" />
        <NavMarker position={[-4, 0, -1]} label="Gallery" href="/gallery" color="#A3F635" />
        <NavMarker position={[2, 0, 4]} label="Dashboard" href="/dashboard" color="#7C3AED" />
        <NavMarker position={[-2, 0, 4]} label="Contact" href="/contact" color="#FFA500" />

        {/* optional dev control for inspection */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
      <HUD />
    </div>
  );
}
