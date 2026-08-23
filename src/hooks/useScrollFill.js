import { useEffect, useRef, useState } from "react";

/**
 * Returns a 0-100 fill percentage tracking scroll progress of `trackRef`
 * from "top 70% of viewport" to "bottom 65% of viewport" — mirrors the
 * design spec's timeline progress rail (scrub 0.6).
 */
export default function useScrollFill() {
  const trackRef = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = null;
    const compute = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.7;
      const end = vh * 0.35;
      const total = r.height + start - end;
      const traveled = start - r.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      setPct(p * 100);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { trackRef, pct };
}
