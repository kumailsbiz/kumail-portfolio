import { useEffect, useRef, useState } from "react";

function easeOutQuad(t) {
  return t * (2 - t);
}

/**
 * Counts 0 -> target once the element scrolls into view. Mirrors the
 * design spec's [data-count]: 1.4s power2.out, trigger once, en-US format.
 * Supports decimals (e.g. 33.33) and a currency-style prefix (e.g. "AED ").
 */
export default function useCountUp(
  target,
  { prefix = "", suffix = "", decimals = 0, duration = 1400 } = {}
) {
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
        const raw = target * easeOutQuad(p);
        setValue(decimals ? Math.round(raw * 10 ** decimals) / 10 ** decimals : Math.round(raw));
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
  }, [target, duration, decimals]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, text: prefix + formatted + suffix };
}
