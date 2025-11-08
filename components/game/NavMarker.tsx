"use client";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useGame } from "./store";
import { useRouter } from "next/navigation";

type Props = {
  position: [number, number, number];
  label: string;
  href: string;
  color?: string;
};

export default function NavMarker({ position, label, href, color = "#7C3AED" }: Props) {
  const router = useRouter();
  const playerPos = useGame((s) => s.playerPos);
  const setHint = useGame((s) => s.setHint);
  const [within, setWithin] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const d = Math.hypot(
      playerPos[0] - position[0],
      playerPos[2] - position[2]
    );
    const near = d < 1.6;
    if (near !== within) {
      setWithin(near);
      setHint(near ? `Press E to enter ${label}` : null);
    }
  });

  // handle E key press on proximity
  useFrame(() => {
    if (!within) return;
    const eDown = (window as any)._hc_e_pressed === true;
    if (eDown) {
      (window as any)._hc_e_pressed = false;
      router.push(href);
    }
  });

  // low tech E capture
  if (typeof window !== "undefined") {
    window.onkeydown = (e) => { if (e.key === "e") (window as any)._hc_e_pressed = true; };
    window.onkeyup = (e) => { if (e.key === "e") (window as any)._hc_e_pressed = false; };
  }

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <Html distanceFactor={12} position={[0, 1.1, 0]}>
        <div style={{ color: "#e5e7eb", fontSize: 12, textShadow: "0 0 8px rgba(124,58,237,.8)" }}>{label}</div>
      </Html>
    </group>
  );
}
