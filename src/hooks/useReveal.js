import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "../lib/motion";

/**
 * Scroll-triggered entrance: fade + slide, with optional scale and 3D
 * rotation for a subtler depth effect. Runs once per element by default.
 * Falls back to a static, fully-visible element under reduced motion.
 */
export default function useReveal({
  y = 24,
  x = 0,
  scale = 1,
  rotateX = 0,
  delay = 0,
  duration = 0.9,
  once = true,
} = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          x,
          scale,
          rotateX,
          transformPerspective: rotateX ? 800 : undefined,
          transformOrigin: "50% 100%",
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateX: 0,
          duration,
          delay: delay ? delay * 0.06 : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref };
}
