import { useEffect, useRef } from "react";

/**
 * Translates an element toward the cursor while hovered, snapping back
 * with an elastic ease on release. Pointer devices only.
 */
export default function useMagnetic() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
      el.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.5,1.6,0.4,1)";
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return ref;
}
