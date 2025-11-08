import { useEffect, useRef } from "react";

export type Keys = {
  forward: boolean; back: boolean; left: boolean; right: boolean;
  interact: boolean;
  mouseDown: boolean; dx: number;
};

export function useInput() {
  const state = useRef<Keys>({
    forward: false, back: false, left: false, right: false,
    interact: false, mouseDown: false, dx: 0
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (e.key === "w") state.current.forward = down;
      if (e.key === "s") state.current.back = down;
      if (e.key === "a") state.current.left = down;
      if (e.key === "d") state.current.right = down;
      if (e.key === "e") state.current.interact = down;
      if (e.key === "t" && down) {
        const ev = new CustomEvent("toggle-camera");
        window.dispatchEvent(ev);
      }
    };
    const onMouseDown = () => state.current.mouseDown = true;
    const onMouseUp = () => { state.current.mouseDown = false; state.current.dx = 0; };
    const onMouseMove = (e: MouseEvent) => { if (state.current.mouseDown) state.current.dx += e.movementX; };

    window.addEventListener("keydown", (e) => onKey(e, true));
    window.addEventListener("keyup", (e) => onKey(e, false));
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("keydown", (e) => onKey(e, true));
      window.removeEventListener("keyup", (e) => onKey(e, false));
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return state;
}
