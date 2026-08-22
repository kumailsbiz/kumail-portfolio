import { useEffect, useState } from "react";
import {
  profile,
  stats,
  competencies,
  experience,
  platforms,
  education,
  certifications,
} from "./data";
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

function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          Kumail Raza
        </a>
        <button
          className="nav-toggle"
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
              className={active === s.id ? "is-active" : ""}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <p className="eyebrow">{profile.location}</p>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">
            Let's talk
          </a>
          <a className="btn btn-ghost" href="#experience">
            See experience
          </a>
        </div>
      </div>
      <div className="stat-strip">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <p className="section-kicker">About</p>
        <p className="lead">{profile.summary}</p>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-inner">
        <p className="section-kicker">Experience</p>
        <h3 className="section-title">Professional Experience</h3>
        <div className="timeline">
          {experience.map((job) => (
            <div className="timeline-item" key={job.role + job.period}>
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
            </div>
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
        <p className="section-kicker">Core Competencies</p>
        <h3 className="section-title">Skills & Tools</h3>
        <div className="competency-grid">
          {competencies.map((c) => (
            <div className="competency-card" key={c.title}>
              <h4>{c.title}</h4>
              <p>{c.items}</p>
            </div>
          ))}
        </div>
        <div className="platform-cloud">
          {platforms.map((p) => (
            <span className="pill" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section section-alt">
      <div className="section-inner">
        <p className="section-kicker">Background</p>
        <h3 className="section-title">Education & Certifications</h3>
        <div className="two-col">
          <div>
            <h4 className="col-title">Education</h4>
            {education.map((e) => (
              <div className="record" key={e.degree}>
                <p className="record-title">{e.degree}</p>
                <p className="record-sub">{e.school}</p>
                <p className="record-period">{e.period}</p>
              </div>
            ))}
          </div>
          <div>
            <h4 className="col-title">Certifications</h4>
            {certifications.map((c) => (
              <div className="record" key={c.name}>
                <p className="record-title">{c.name}</p>
                <p className="record-sub">{c.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <p className="section-kicker">Contact</p>
        <h3 className="section-title">Let's work together</h3>
        <p className="lead">
          Open to e-commerce, performance marketing, and web development
          roles and projects across the UAE, KSA, and remote.
        </p>
        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${profile.email}`}>
            <span className="contact-label">Email</span>
            <span className="contact-value">{profile.email}</span>
          </a>
          <a className="contact-card" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <span className="contact-label">Phone</span>
            <span className="contact-value">{profile.phone}</span>
          </a>
          <a
            className="contact-card"
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
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
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
