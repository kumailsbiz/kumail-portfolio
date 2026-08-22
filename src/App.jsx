import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  profile,
  stats,
  competencies,
  experience,
  platforms,
  education,
  certifications,
} from "./data";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import "./App.css";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function Nav({ ready }) {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav ${ready ? "is-ready" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand interactive">
          Kumail Raza
        </a>
        <button
          className="nav-toggle interactive"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`interactive ${active === s.id ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta interactive"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

function SplitLines({ text, className }) {
  return (
    <span className={`split-lines ${className || ""}`}>
      <span className="split-lines-inner">{text}</span>
    </span>
  );
}

function Hero({ ready }) {
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const taglineRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    if (!root) return;

    const statEls = statsRef.current
      ? Array.from(statsRef.current.querySelectorAll(".stat"))
      : [];
    const lineEls = [line1Ref.current, line2Ref.current].filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(lineEls, { yPercent: 110 });
      gsap.set([eyebrowRef.current, taglineRef.current, actionsRef.current], {
        autoAlpha: 0,
        y: 14,
      });
      gsap.set(statEls, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(
          lineEls,
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.3"
        )
        .to(
          [taglineRef.current, actionsRef.current],
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.6"
        )
        .to(
          statEls,
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        );

      // animated count-up for numeric stats
      statEls.forEach((stat) => {
        const el = stat.querySelector(".stat-value[data-target]");
        if (!el) return;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.3,
          delay: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="top" className="hero" ref={rootRef}>
      <div className="hero-inner">
        <p className="hero-eyebrow eyebrow" ref={eyebrowRef}>
          {profile.location}
        </p>
        <h1>
          <span className="split-lines">
            <span className="split-lines-inner" ref={line1Ref}>
              {profile.name}
            </span>
          </span>
        </h1>
        <h2>
          <span className="split-lines">
            <span className="split-lines-inner" ref={line2Ref}>
              {profile.title}
            </span>
          </span>
        </h2>
        <p className="hero-tagline" ref={taglineRef}>
          {profile.tagline}
        </p>
        <div className="hero-actions" ref={actionsRef}>
          <a className="btn btn-primary interactive" href="#contact">
            Let's talk
          </a>
          <a className="btn btn-ghost interactive" href="#experience">
            See experience
          </a>
        </div>
      </div>
      <div className="stat-strip" ref={statsRef}>
        {stats.map((s) => {
          const match = s.value.match(/^([\d,]+)(\+?)$/);
          return (
            <div className="stat" key={s.label}>
              {match ? (
                <span
                  className="stat-value"
                  data-target={match[1].replace(/,/g, "")}
                  data-suffix={match[2]}
                >
                  0
                </span>
              ) : (
                <span className="stat-value">{s.value}</span>
              )}
              <span className="stat-label">{s.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <Reveal as="p" className="section-kicker">
          About
        </Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          {profile.summary}
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-inner">
        <Reveal as="p" className="section-kicker">
          Experience
        </Reveal>
        <Reveal as="h3" className="section-title" delay={0.05}>
          Professional Experience
        </Reveal>
        <div className="timeline">
          {experience.map((job) => (
            <Reveal
              as="div"
              className="timeline-item"
              key={job.role + job.period}
              y={26}
            >
              <div className="timeline-marker" />
              <div className="timeline-content">
                <div className="timeline-head">
                  <h4>{job.role}</h4>
                  <span className="timeline-period">{job.period}</span>
                </div>
                <p className="timeline-company">{job.company}</p>
                <ul>
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <Reveal as="p" className="section-kicker">
          Core Competencies
        </Reveal>
        <Reveal as="h3" className="section-title" delay={0.05}>
          Skills & Tools
        </Reveal>
        <Reveal as="div" className="competency-grid" stagger={0.06}>
          {competencies.map((c) => (
            <div className="competency-card interactive" key={c.title}>
              <h4>{c.title}</h4>
              <p>{c.items}</p>
            </div>
          ))}
        </Reveal>
      </div>
      <div className="marquee-wrap">
        <Marquee items={platforms} speed={32} />
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section section-alt">
      <div className="section-inner">
        <Reveal as="p" className="section-kicker">
          Background
        </Reveal>
        <Reveal as="h3" className="section-title" delay={0.05}>
          Education & Certifications
        </Reveal>
        <div className="two-col">
          <Reveal as="div" y={24}>
            <h4 className="col-title">Education</h4>
            {education.map((e) => (
              <div className="record" key={e.degree}>
                <p className="record-title">{e.degree}</p>
                <p className="record-sub">{e.school}</p>
                <p className="record-period">{e.period}</p>
              </div>
            ))}
          </Reveal>
          <Reveal as="div" y={24} delay={0.1}>
            <h4 className="col-title">Certifications</h4>
            {certifications.map((c) => (
              <div className="record" key={c.name}>
                <p className="record-title">{c.name}</p>
                <p className="record-sub">{c.issuer}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <Reveal as="p" className="section-kicker">
          Contact
        </Reveal>
        <Reveal as="h3" className="section-title" delay={0.05}>
          Let's work together
        </Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          Open to e-commerce, performance marketing, and web development
          roles and projects across the UAE, KSA, and remote.
        </Reveal>
        <Reveal as="div" className="contact-grid" stagger={0.06} delay={0.1}>
          <a
            className="contact-card interactive"
            href={`mailto:${profile.email}`}
          >
            <span className="contact-label">Email</span>
            <span className="contact-value">{profile.email}</span>
          </a>
          <a
            className="contact-card interactive"
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
          >
            <span className="contact-label">Phone</span>
            <span className="contact-value">{profile.phone}</span>
          </a>
          <a
            className="contact-card interactive"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-label">LinkedIn</span>
            <span className="contact-value">{profile.linkedin}</span>
          </a>
          <div className="contact-card contact-card-static">
            <span className="contact-label">Location</span>
            <span className="contact-value">{profile.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React & GSAP.
      </p>
    </footer>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  return (
    <>
      <Loader onDone={markReady} />
      <Cursor />
      <Nav ready={ready} />
      <main className={ready ? "is-ready" : ""}>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
