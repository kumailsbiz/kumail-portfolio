import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import useMagnetic from "../hooks/useMagnetic";
import useTilt from "../hooks/useTilt";
import useParallax from "../hooks/useParallax";

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.05 10.05 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05A4.2 4.2 0 0 1 17.6 8.7c3.1 0 3.9 1.9 3.9 5V21h-4v-5.9c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V21h-4V9Z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const portraitRef = useRef(null);
  const [parallax, setParallax] = useState(0);
  const workRef = useMagnetic();
  const resumeRef = useMagnetic();
  const portraitTiltRef = useTilt({ max: 6, scale: 1.015 });
  const shapeFarRef = useParallax(0.35);
  const shapeNearRef = useParallax(-0.2);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    const compute = () => {
      raf = null;
      const el = portraitRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = 1 - (r.top + r.height) / (vh + r.height);
      setParallax((Math.max(0, Math.min(1, progress)) - 0.5) * -14);
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

  const fadeStyle = (delayMs) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <section id="top" className="hero">
      <div className="hero-decor" aria-hidden="true">
        <span className="hero-shape hero-shape-far" ref={shapeFarRef} />
        <span className="hero-shape hero-shape-near" ref={shapeNearRef} />
      </div>
      <div className="hero-inner" data-hero-grid>
        <div>
          <p className="hero-eyebrow" style={{ ...fadeStyle(0), transitionDuration: "0.55s" }}>
            <span className="hero-pulse-dot" />
            <span>Dubai, UAE — Open to roles &amp; projects</span>
          </p>
          <h1>
            <span className="hero-line-mask">
              <span className={`hero-line ${ready ? "is-in" : ""}`}>Kumail</span>
            </span>
            <span className="hero-line-mask">
              <span className={`hero-line ${ready ? "is-in" : ""}`} style={{ transitionDelay: "80ms" }}>
                Raza
              </span>
            </span>
          </h1>
          <div className="hero-subhead-block">
            <h2 style={fadeStyle(180)}>{profile.title}</h2>
            <p style={fadeStyle(220)}>{profile.heroSubhead}</p>
          </div>
          <div className="hero-actions" style={fadeStyle(260)}>
            <a ref={workRef} className="btn btn-primary" href="#work">
              View my work <IconArrow />
            </a>
            <a ref={resumeRef} className="btn btn-secondary" href={profile.resumeUrl} download>
              Download resume <IconDownload />
            </a>
            <a className="btn btn-ghost" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <IconGitHub /> GitHub
            </a>
          </div>
          <div className="hero-contact-row" style={fadeStyle(300)}>
            <a href={`mailto:${profile.email}`}>
              <IconMail /> {profile.email}
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <IconLinkedIn /> {profile.linkedin}
            </a>
            <a href={profile.phoneHref}>
              <IconPhone /> {profile.phone}
            </a>
          </div>
        </div>
        <div
          className="hero-portrait"
          data-hero-portrait
          ref={portraitRef}
          style={{
            ...fadeStyle(160),
            transitionDuration: "0.9s",
            transform: ready
              ? `translateY(${parallax}px)`
              : "translateY(28px)",
          }}
        >
          <div className="hero-portrait-frame grayscale" ref={portraitTiltRef}>
            <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} />
          </div>
          <div className="hero-portrait-badge">4+ years</div>
        </div>
      </div>
    </section>
  );
}
