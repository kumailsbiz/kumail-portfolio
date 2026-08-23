import { useEffect, useRef } from "react";
import { getGsap, isCoarsePointer, prefersReducedMotion } from "../lib/motion";

/**
 * Subtle 3D tilt that follows the cursor, with a spring-like snap back
 * on release. Skipped on touch devices and under reduced motion.
 */
export default function useTilt({ max = 7, scale = 1.015 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isCoarsePointer() || prefersReducedMotion()) return;

    const { gsap } = getGsap();
    gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
    el.style.willChange = "transform";

    const setRotX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });
    const setRotY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });
    const setScale = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3.out" });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setRotY(px * max * 2);
      setRotX(py * -max * 2);
      setScale(scale);
    };
    const reset = () => {
      setRotX(0);
      setRotY(0);
      setScale(1);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [max, scale]);

  return ref;
}
