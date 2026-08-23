import { useState } from "react";
import { roles } from "../data";
import Reveal from "./Reveal";
import useScrollFill from "../hooks/useScrollFill";

function PlusMinus({ open }) {
  return (
    <span className="plus-minus">
      <span className="bar-h" />
      {!open && <span className="bar-v" />}
    </span>
  );
}

function renderBullet(text) {
  const match = text.match(/^\*\*(.+?)\*\*(.*)$/);
  if (match) {
    return (
      <>
        <strong>{match[1]}</strong>
        {match[2]}
      </>
    );
  }
  return text;
}

export default function ExperienceAccordion() {
  const [open, setOpen] = useState(0);
  const { trackRef, pct } = useScrollFill();

  return (
    <section id="experience" className="section section-surface">
      <div className="section-inner">
        <div className="row-between">
          <div>
            <Reveal as="p" className="eyebrow">
              02 — Experience
            </Reveal>
            <Reveal as="h2" variant="tilt" className="section-title">
              Professional experience
            </Reveal>
          </div>
          <Reveal as="p" className="helper-text">
            Select a role to read the detail
          </Reveal>
        </div>

        <div className="timeline" ref={trackRef}>
          <div className="timeline-track" />
          <div className="timeline-fill" style={{ height: `${pct}%` }} />

          {roles.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="article" className="timeline-item" key={job.title + job.period}>
                <span className="timeline-node" />
                <button
                  type="button"
                  className="accordion-row"
                  aria-expanded={isOpen}
                  onClick={() => setOpen((o) => (o === i ? null : i))}
                >
                  <span>
                    <span className="job-title">{job.title}</span>
                    <span className="job-company">{job.company}</span>
                  </span>
                  <span className="accordion-meta">
                    <span className="job-period">{job.period}</span>
                    <PlusMinus open={isOpen} />
                  </span>
                </button>
                {isOpen && (
                  <div className="accordion-body">
                    <ul className="dash-list">
                      {job.bullets.map((b, bi) => (
                        <li key={bi}>
                          <span className="dash">—</span>
                          <span>{renderBullet(b)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
