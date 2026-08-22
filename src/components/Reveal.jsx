import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 36,
  delay = 0,
  stagger,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const targets = stagger ? el.children : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger || 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
