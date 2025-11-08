import { create } from "zustand";

type CameraMode = "third" | "iso";

type GameState = {
  cameraMode: CameraMode;
  setCameraMode: (m: CameraMode) => void;
  playerPos: [number, number, number];
  setPlayerPos: (p: [number, number, number]) => void;
  hint: string | null;
  setHint: (t: string | null) => void;
};

export const useGame = create<GameState>((set) => ({
  cameraMode: "third",
  setCameraMode: (m) => set({ cameraMode: m }),
  playerPos: [0, 0, 0],
  setPlayerPos: (p) => set({ playerPos: p }),
  hint: null,
  setHint: (t) => set({ hint: t })
}));
