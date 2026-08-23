import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides an element in once it scrolls into view.
 * Mirrors the design spec's [data-reveal]: y:24 -> 0, 0.7s, trigger once.
 */
export default function useReveal({ y = 24, once = true, delay = 0 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const d = delay ? `${delay * 60}ms` : "0ms";
  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${d}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${d}`,
  };

  return { ref, style, visible };
}
