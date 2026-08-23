import { useEffect } from "react";
import { getGsap, prefersReducedMotion } from "../lib/motion";

/**
 * One-time page-level scroll setup: keeps ScrollTrigger's measurements in
 * sync with async content (images, fonts, the GitHub panel's live data),
 * and adds a very subtle depth/zoom pass to each top-level section so
 * the page feels layered as it scrolls rather than a flat stack.
 */
export default function useScrollSetup() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const imgs = Array.from(document.images);
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});

    let ctx = null;
    if (!prefersReducedMotion()) {
      ctx = gsap.context(() => {
        // #skills is excluded: it contains a pinned horizontal-scroll track,
        // and a transform on an ancestor of a pinned element breaks GSAP's
        // fixed-position pin (it becomes fixed relative to the transformed
        // ancestor instead of the viewport).
        const sections = document.querySelectorAll(
          "main > section:not(#skills), main > .section-contact, .site-footer"
        );
        sections.forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.985 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "top 55%",
                scrub: true,
              },
            }
          );
        });
      });
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, []);
}
