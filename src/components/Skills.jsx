import { useLayoutEffect, useRef } from "react";
import { skills, tools } from "../data";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import { getGsap } from "../lib/motion";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ICONS = {
  "E-Commerce Management": (
    <svg {...ICON_PROPS}>
      <path d="M4 7h16l-1.5 10a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 7Z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </svg>
  ),
  "Paid Search & PPC": (
    <svg {...ICON_PROPS}>
      <circle cx="11" cy="11" r="7" />
      <circle cx="11" cy="11" r="3" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  ),
  "Marketplace & Channel Strategy": (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  "Paid Social": (
    <svg {...ICON_PROPS}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l3 4v-4h8a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9L6 2v3H5a2 2 0 0 0-2 2v1" />
      <path d="M9 9v6" />
    </svg>
  ),
  "Retail Operations & Supply Chain": (
    <svg {...ICON_PROPS}>
      <rect x="2" y="7" width="13" height="10" />
      <path d="M15 10h3.5l3 3.5V17h-6.5" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </svg>
  ),
  "SEO & Organic Growth": (
    <svg {...ICON_PROPS}>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M15 6h6v6" />
    </svg>
  ),
  "Analytics & Tracking": (
    <svg {...ICON_PROPS}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
      <path d="M2 20h20" />
    </svg>
  ),
  "CRO & Front-End": (
    <svg {...ICON_PROPS}>
      <path d="m8 6-5 6 5 6M16 6l5 6-5 6M13 4l-2 16" />
    </svg>
  ),
  Platforms: (
    <svg {...ICON_PROPS}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </svg>
  ),
  "Process & Enablement": (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.65 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.65a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 15 4.65a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.35 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 0 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  ),
};

function SkillCell({ s, i }) {
  const tiltRef = useTilt({ max: 5, scale: 1.02 });
  return (
    <div className="skill-cell" ref={tiltRef}>
      <div className="skill-cell-top">
        <span className="skill-icon">{ICONS[s.title]}</span>
        <span className="skill-index">{String(i + 1).padStart(2, "0")}</span>
      </div>
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
              {skills.map((s, i) => (
                <SkillCell s={s} i={i} key={s.title} />
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
