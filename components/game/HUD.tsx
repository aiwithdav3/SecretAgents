"use client";
import { useGame } from "./store";

export default function HUD() {
  const mode = useGame((s) => s.cameraMode);
  const hint = useGame((s) => s.hint);
  return (
    <div className="pointer-events-none fixed inset-0 flex flex-col">
      <div className="mx-auto mt-2 rounded bg-black/40 px-3 py-1 text-xs text-neutral-200">
        {mode === "third" ? "Camera Third person" : "Camera Isometric"}  T toggles
      </div>
      <div className="mt-auto p-3 text-center text-sm text-neutral-200">
        {hint ?? "WASD to move, mouse drag to rotate, E to interact"}
      </div>
    </div>
  );
}
