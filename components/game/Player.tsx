"use client";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useInput } from "./useInput";
import { useGame } from "./store";

export default function Player() {
  const ref = useRef<THREE.Group>(null);
  const input = useInput();
  const setPlayerPos = useGame((s) => s.setPlayerPos);
  const [yaw, setYaw] = useState(0);

  useFrame((_, dt) => {
    if (!ref.current) return;

    // update yaw from mouse drag
    const rotSpeed = 0.003;
    setYaw((y) => y - input.current.dx * rotSpeed);
    input.current.dx = 0;

    // movement in local forward space
    const speed = 5; // meters per second
    const dir = new THREE.Vector3(
      (input.current.right ? 1 : 0) - (input.current.left ? 1 : 0),
      0,
      (input.current.back ? 1 : 0) - (input.current.forward ? 1 : 0)
    );
    if (dir.lengthSq() > 0) {
      dir.normalize();
      // rotate by yaw
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      dir.applyQuaternion(q);
      ref.current.position.addScaledVector(dir, speed * dt);
    }

    // keep on ground
    ref.current.position.y = 0.9;

    // update facing
    ref.current.rotation.y = yaw;

    // publish position
    setPlayerPos([ref.current.position.x, ref.current.position.y, ref.current.position.z]);
  });

  return (
    <group ref={ref} position={[0, 0.9, 4]}>
      {/* body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#005b66" emissiveIntensity={0.4} />
      </mesh>
      {/* visor */}
      <mesh position={[0, 0.45, 0.35]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.15, 0.1]} />
        <meshStandardMaterial color="#FF00E5" emissive="#3b002f" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}
