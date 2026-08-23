import { useState } from "react";
import { caseStudies } from "../data";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import { getGsap } from "../lib/motion";

function PlusMinus({ open }) {
  return (
    <span className="plus-minus plus-minus-lg">
      <span className="bar-h" />
      {!open && <span className="bar-v" />}
    </span>
  );
}

function CaseImage({ c }) {
  const tiltRef = useTilt({ max: 5, scale: 1.015 });
  return (
    <div className="case-image-slot case-image-slot-filled" ref={tiltRef}>
      <img src={c.image} alt={`${c.title} — storefront screenshot`} loading="lazy" />
    </div>
  );
}

export default function CaseStudies() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen((o) => (o === i ? null : i));
    // Row heights change on expand/collapse — let ScrollTrigger re-measure
    // everything below so later reveals still fire at the right scroll spot.
    requestAnimationFrame(() => {
      const { ScrollTrigger } = getGsap();
      ScrollTrigger.refresh();
    });
  };

  return (
    <section id="work" className="section">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          04 — Selected work
        </Reveal>
        <Reveal as="h2" variant="tilt" className="section-title" style={{ marginBottom: 18 }}>
          Technical &amp; platform work
        </Reveal>
        <Reveal as="p" className="section-lead">
          Seven bodies of work drawn from the roles above — three of them live brand storefronts.
          Each expands into the brief, what was built, and the stack. Where a result is not
          published, the scope is stated instead — no numbers are claimed that are not in the
          record.
        </Reveal>

        <div className="case-list">
          {caseStudies.map((c, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="article" key={c.id}>
                <button
                  type="button"
                  className="case-row"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                >
                  <span className="case-id">{c.id}</span>
                  <span>
                    <span className="case-title">{c.title}</span>
                    <span className="case-meta">{c.meta}</span>
                  </span>
                  <PlusMinus open={isOpen} />
                </button>
                {isOpen && (
                  <div className="case-body" data-two-col>
                    <div className="case-prose">
                      <div>
                        <h4 className="sub-label">Role</h4>
                        <p>{c.role}</p>
                      </div>
                      <div>
                        <h4 className="sub-label">Challenge</h4>
                        <p>{c.challenge}</p>
                      </div>
                      <div>
                        <h4 className="sub-label">{c.approachLabel || "Approach"}</h4>
                        <ul className="dash-list dash-list-tight">
                          {c.approach.map((a, ai) => (
                            <li key={ai}>
                              <span className="dash">—</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {c.scope && (
                        <div>
                          <h4 className="sub-label">Scope</h4>
                          <div className="scope-row">
                            {c.scope.map((s) => (
                              <div className="scope-cell" key={s.label}>
                                <span className="scope-value">{s.value}</span>
                                <span className="scope-label">{s.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {c.result && (
                        <div>
                          <h4 className="sub-label">Result</h4>
                          <p>{c.result}</p>
                        </div>
                      )}
                      <div className="tag-row">
                        {c.tags.map((t) => (
                          <span className="tag tag-neutral" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                      {c.cta && (
                        <a
                          className="btn btn-secondary"
                          href={c.cta.href}
                          target="_blank"
                          rel="noreferrer"
                          style={{ width: "fit-content" }}
                        >
                          {c.cta.label}
                        </a>
                      )}
                    </div>
                    <div>
                      {c.image ? (
                        <CaseImage c={c} />
                      ) : (
                        <div className="case-image-slot grayscale">
                          <span>{c.imagePlaceholder}</span>
                        </div>
                      )}
                      <p className="case-image-caption">
                        {c.image ? "Live storefront" : "Placeholder — awaiting screenshot"}
                      </p>
                    </div>
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
