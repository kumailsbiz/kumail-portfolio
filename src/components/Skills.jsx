import { skills, tools } from "../data";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <>
      <section id="skills" className="section section-skills">
        <div className="section-inner">
          <Reveal as="p" className="eyebrow">
            03 — Capability
          </Reveal>
          <Reveal as="h2" className="section-title">
            Core competencies
          </Reveal>
          <div className="skill-grid">
            {skills.map((s) => (
              <Reveal as="div" key={s.title} className="skill-cell">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
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
