"use client";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGame } from "./store";

export default function CameraRig() {
  const { camera } = useThree();
  const mode = useGame((s) => s.cameraMode);
  const playerPos = useGame((s) => s.playerPos);
  const target = useRef(new THREE.Vector3());

  useEffect(() => {
    const handler = () => {
      const now = mode === "third" ? "iso" : "third";
      useGame.getState().setCameraMode(now);
    };
    window.addEventListener("toggle-camera", handler);
    return () => window.removeEventListener("toggle-camera", handler);
  }, [mode]);

  useFrame((_, dt) => {
    target.current.set(playerPos[0], playerPos[1], playerPos[2]);

    if (mode === "third") {
      const desired = new THREE.Vector3(
        target.current.x - 2.5,
        target.current.y + 2.0,
        target.current.z + 3.5
      );
      camera.position.lerp(desired, 1 - Math.pow(0.001, dt));
      camera.lookAt(target.current);
    } else {
      // isometric angle
      const desired = new THREE.Vector3(
        target.current.x + 6,
        target.current.y + 8,
        target.current.z + 6
      );
      camera.position.lerp(desired, 1 - Math.pow(0.001, dt));
      camera.lookAt(target.current);
    }
  });

  return null;
}
