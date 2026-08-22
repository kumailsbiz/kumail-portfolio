import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onDone }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const numRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 0.15,
          onComplete: () => {
            setHidden(true);
            onDone?.();
          },
        });
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = Math.floor(counter.val)
            .toString()
            .padStart(3, "0");
        }
      },
    }).to(
      barRef.current,
      { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
      "<"
    );

    return () => tl.kill();
  }, [onDone]);

  if (hidden) return null;

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-inner">
        <span className="loader-name">Kumail Raza</span>
        <div className="loader-bar-track">
          <div className="loader-bar" ref={barRef} />
        </div>
        <span className="loader-num" ref={numRef}>
          000
        </span>
      </div>
    </div>
  );
}
