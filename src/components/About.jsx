import { about } from "../data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          01 — About
        </Reveal>
        <div className="about-grid" data-two-col>
          <div>
            <Reveal as="h2" className="about-headline">
              {about.headline}
            </Reveal>
            <Reveal as="p" className="about-body" delay={1}>
              {about.body}
            </Reveal>
            <Reveal as="blockquote" className="about-quote">
              “{about.quote}”
            </Reveal>
          </div>
          <div>
            <Reveal as="h3" className="label-heading">
              Career highlights
            </Reveal>
            <ul className="highlight-list">
              {about.highlights.map((h, i) => (
                <Reveal as="li" key={h} className="highlight-item">
                  <span className="highlight-index">{String(i + 1).padStart(2, "0")}</span>
                  <span>{h}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal as="h3" className="label-heading">
              Strengths
            </Reveal>
            <div className="tag-row">
              {about.strengths.map((s) => (
                <Reveal as="span" key={s} className="tag tag-outline">
                  {s}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
