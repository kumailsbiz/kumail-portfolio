import { profile, contactLinks } from "../data";
import Reveal from "./Reveal";
import useMagnetic from "../hooks/useMagnetic";

export default function Contact() {
  const emailRef = useMagnetic();

  return (
    <section id="contact" className="section-contact">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow eyebrow-on-accent">
          07 — Contact
        </Reveal>
        <Reveal as="h2" variant="tilt" className="contact-headline">
          Let's work together
        </Reveal>
        <Reveal as="p" className="contact-lead">
          Open to e-commerce, performance marketing, and web development roles and projects
          across the UAE, KSA, and remote.
        </Reveal>
        <div className="contact-grid">
          {contactLinks.map((c) =>
            c.href ? (
              <Reveal
                as="a"
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="contact-cell contact-cell-link"
              >
                <span className="contact-cell-label">{c.label}</span>
                <span className="contact-cell-value">{c.value}</span>
              </Reveal>
            ) : (
              <Reveal as="div" key={c.label} className="contact-cell">
                <span className="contact-cell-label">{c.label}</span>
                <span className="contact-cell-value">{c.value}</span>
              </Reveal>
            )
          )}
        </div>
        <div className="contact-cta-row">
          <a ref={emailRef} className="btn btn-contact-dark" href={`mailto:${profile.email}`}>
            Send an email
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a className="btn btn-contact-outline" href={profile.resumeUrl} download>
            Download resume
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
