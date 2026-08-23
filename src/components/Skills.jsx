import { useLayoutEffect, useRef } from "react";
import { skills, tools } from "../data";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import { getGsap } from "../lib/motion";

function SkillCell({ s }) {
  const tiltRef = useTilt({ max: 5, scale: 1.02 });
  return (
    <div className="skill-cell" ref={tiltRef}>
      <h3>{s.title}</h3>
      <p>{s.body}</p>
    </div>
  );
}

export default function Skills() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
      pin.classList.add("skill-pin-active");
      const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top+=72",
          end: () => "+=" + distance(),
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        pin.classList.remove("skill-pin-active");
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "x" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section id="skills" className="section section-skills">
        <div className="section-inner">
          <Reveal as="p" className="eyebrow">
            03 — Capability
          </Reveal>
          <Reveal as="h2" variant="tilt" className="section-title">
            Core competencies
          </Reveal>
          <Reveal as="p" className="section-lead" style={{ marginBottom: 20 }}>
            Ten areas, scroll to browse the full set.
          </Reveal>
          <div className="skill-pin" ref={pinRef}>
            <div className="skill-track" ref={trackRef}>
              {skills.map((s) => (
                <SkillCell s={s} key={s.title} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="marquee" aria-hidden="false">
        <div className="marquee-track">
          {[...tools, ...tools].map((t, i) => (
            <span className="marquee-item" key={i} aria-hidden={i >= tools.length}>
              {t}
              <span className="marquee-diamond">◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
