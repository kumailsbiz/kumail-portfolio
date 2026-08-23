import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "../lib/motion";

/**
 * Scroll-linked parallax drift for a decorative element. speed > 0 moves
 * slower than the page (background layer); speed < 0 moves faster
 * (foreground layer). Disabled under reduced motion.
 */
export default function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  return ref;
}
