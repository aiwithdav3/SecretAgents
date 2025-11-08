import { create } from "zustand";

type CameraMode = "third" | "iso";

type GameState = {
  cam: CameraMode;
  setCam: (m: CameraMode) => void;
  hint: string | null;
  setHint: (t: string | null) => void;
};

export const useGame = create<GameState>((set) => ({
  cam: "third",
  setCam: (m) => set({ cam: m }),
  hint: null,
  setHint: (t) => set({ hint: t })
}));
