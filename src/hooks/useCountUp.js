import { useEffect, useRef, useState } from "react";

function easeOutQuad(t) {
  return t * (2 - t);
}

/**
 * Counts 0 -> target once the element scrolls into view. Mirrors the
 * design spec's [data-count]: 1.4s power2.out, trigger once, en-US format.
 */
export default function useCountUp(target, { suffix = "", duration = 1400 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(target * easeOutQuad(p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, text: value.toLocaleString("en-US") + suffix };
}
