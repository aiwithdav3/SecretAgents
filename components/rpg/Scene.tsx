"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "./store";
import { getRandomQuote, type Quote } from "./quotes";

// simple player blob
function Player() {
  const ref = useRef<THREE.Group>(null);
  const [yaw, setYaw] = useState(0);
  const keys = useRef<{[k: string]: boolean}>({});
  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => { if (e.buttons === 1) setYaw((y) => y - e.movementX * 0.003); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const dir = new THREE.Vector3(
      (keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0),
      0,
      (keys.current.s ? 1 : 0) - (keys.current.w ? 1 : 0)
    );
    if (dir.lengthSq() > 0) {
      dir.normalize();
      dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      ref.current.position.addScaledVector(dir, dt * 5);
    }
    ref.current.rotation.y = yaw;
    ref.current.position.y = 0.9;
  });

  return (
    <group ref={ref} position={[0, 0.9, 4]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#005b66" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.45, 0.35]}>
        <boxGeometry args={[0.35, 0.15, 0.1]} />
        <meshStandardMaterial color="#FF00E5" emissive="#3b002f" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// camera rig
function Rig() {
  const cam = useGame((s) => s.cam);
  const camRef = useRef<THREE.PerspectiveCamera | null>(null);
  useFrame(({ camera, scene }, dt) => {
    const player = scene.children.find((o) => o.type === "Group") as THREE.Group | undefined;
    if (!player) return;
    const target = player.position.clone();
    const desired = cam === "third"
      ? new THREE.Vector3(target.x - 2.5, target.y + 2.0, target.z + 3.5)
      : new THREE.Vector3(target.x + 6, target.y + 8, target.z + 6);
    camera.position.lerp(desired, 1 - Math.pow(0.001, dt));
    camera.lookAt(target);
    camRef.current = camera as THREE.PerspectiveCamera;
  });
  useEffect(() => {
    const onT = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t") {
        const next = useGame.getState().cam === "third" ? "iso" : "third";
        useGame.getState().setCam(next);
      }
    };
    window.addEventListener("keydown", onT);
    return () => window.removeEventListener("keydown", onT);
  }, []);
  return null;
}

// nav beacon
function Beacon(props: { pos: [number, number, number]; label: string; href: string; color: string }) {
  const router = useRouter();
  const [near, setNear] = useState(false);
  const playerPos = useRef<THREE.Vector3>(new THREE.Vector3());
  useFrame(({ scene }) => {
    const p = scene.children.find((o) => o.type === "Group") as THREE.Group | undefined;
    if (!p) return;
    playerPos.current.copy(p.position);
    const d = Math.hypot(playerPos.current.x - props.pos[0], playerPos.current.z - props.pos[2]);
    const nowNear = d < 1.6;
    if (nowNear !== near) {
      setNear(nowNear);
      useGame.getState().setHint(nowNear ? `Press E to enter ${props.label}` : null);
    }
  });
  useEffect(() => {
    const onE = (e: KeyboardEvent) => {
      if (near && e.key.toLowerCase() === "e") router.push(props.href);
    };
    window.addEventListener("keydown", onE);
    return () => window.removeEventListener("keydown", onE);
  }, [near, props.href, router]);
  return (
    <group position={props.pos}>
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={props.color} emissive={props.color} emissiveIntensity={1.2} />
      </mesh>
      <Html distanceFactor={12} position={[0, 1.1, 0]}>
        <div style={{ color: "#e5e7eb", fontSize: 12, textShadow: "0 0 8px rgba(124,58,237,.8)" }}>{props.label}</div>
      </Html>
    </group>
  );
}

function World() {
  return (
    <>
      <Stars radius={80} depth={12} factor={4} saturation={0} speed={0.6} />
      <hemisphereLight intensity={0.3} color={"#88ccff"} groundColor={"#441144"} />
      <directionalLight position={[6, 10, 6]} castShadow intensity={1.2} color={"#00e5ff"} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#111218" />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 8, 1.5, Math.cos(i) * 8]} castShadow>
          <boxGeometry args={[2, 3 + (i % 3), 2]} />
          <meshStandardMaterial color="#151a23" emissive="#27123a" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </>
  );
}

// Dictum-inspired quote display
function QuoteHUD() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setQuote(getRandomQuote());
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFade(false);
      }, 500);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  if (!quote) return null;

  return (
    <div className={`mb-2 transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
      <p className="text-xs italic text-cyan-200/70">&quot;{quote.text}&quot;</p>
      <p className="mt-1 text-[10px] text-purple-300/50">— {quote.author}</p>
    </div>
  );
}

export default function Scene() {
  const hint = useGame((s) => s.hint);
  const cam = useGame((s) => s.cam);
  useEffect(() => {
    document.body.classList.add("grid-on");
    return () => document.body.classList.remove("grid-on");
  }, []);
  return (
    <div className="relative h-[calc(100vh-160px)] w-full rounded-xl border border-neutral-800">
      <Canvas shadows camera={{ position: [0, 3, 6], fov: 55 }}>
        <World />
        <Player />
        <Rig />
        <Beacon pos={[0, 0, -2]} label="Main" href="/" color="#00E5FF" />
        <Beacon pos={[4, 0, -1]} label="About" href="/about" color="#FF00E5" />
        <Beacon pos={[-4, 0, -1]} label="Gallery" href="/gallery" color="#A3F635" />
        <Beacon pos={[2, 0, 4]} label="Dashboard" href="/dashboard" color="#7C3AED" />
        <Beacon pos={[-2, 0, 4]} label="Contact" href="/contact" color="#FFA500" />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <div className="mx-auto mt-2 rounded bg-black/40 px-3 py-1 text-xs text-neutral-200">
          {cam === "third" ? "Third person" : "Isometric"} · WASD move · drag rotate · E interact · T toggle
        </div>
        <div className="mt-auto flex flex-col items-center p-3">
          <QuoteHUD />
          {hint && <div className="text-center text-sm text-neutral-200">{hint}</div>}
        </div>
      </div>
    </div>
  );
}
