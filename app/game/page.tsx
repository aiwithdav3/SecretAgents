"use client";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/rpg/Scene"), { ssr: false });

export default function GamePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Hardcade RPG</h1>
      <p className="text-neutral-300">Walk to a neon marker and press E to travel. Press T to switch camera.</p>
      <Scene />
      <p className="text-xs text-neutral-500">
        Tip. This is a minimal sandbox. Swap the city boxes for proper glTF kits later.
      </p>
    </section>
  );
}
