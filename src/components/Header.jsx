import { useEffect, useState } from "react";
import { profile } from "../data";

const NAV = [
  { href: "#results", label: "Results" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#github", label: "GitHub" },
  { href: "#education", label: "Education" },
];

export default function Header({ dark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = null;
    const check = () => {
      raf = null;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a href="#top" className="header-brand">
          {profile.name}
        </a>
        <nav className="header-nav" data-nav>
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle colour theme"
            onClick={onToggleTheme}
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <a className="btn btn-primary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
