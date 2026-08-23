import { education, certifications } from "../data";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          06 — Background
        </Reveal>
        <Reveal as="h2" variant="tilt" className="section-title">
          Education &amp; certifications
        </Reveal>
        <div className="edu-grid">
          <div>
            <Reveal as="h3" className="col-label">
              Education
            </Reveal>
            {education.map((e, i) => (
              <Reveal
                as="div"
                key={e.degree}
                className={`edu-entry ${i === 0 ? "edu-entry-first" : ""}`}
              >
                <p className="edu-degree">{e.degree}</p>
                <p className="edu-school">{e.school}</p>
                <p className="edu-period">{e.period}</p>
              </Reveal>
            ))}
          </div>
          <div>
            <Reveal as="h3" className="col-label">
              Certifications
            </Reveal>
            {certifications.map((c) => (
              <Reveal as="div" key={c.name} className="edu-entry edu-entry-first">
                <p className="edu-degree">{c.name}</p>
                <p className="edu-school">{c.issuer}</p>
              </Reveal>
            ))}
            <Reveal as="p" className="edu-note">
              Additional certificates, awards and courses can be added here as they are supplied.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
