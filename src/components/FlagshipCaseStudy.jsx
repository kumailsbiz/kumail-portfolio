import { flagshipCase } from "../data";
import Reveal from "./Reveal";
import useCountUp from "../hooks/useCountUp";
import useScrollFill from "../hooks/useScrollFill";
import useTilt from "../hooks/useTilt";

function Kpi({ k, i }) {
  const { ref, text } = useCountUp(k.value, {
    prefix: k.prefix,
    suffix: k.suffix,
    decimals: k.decimals || 0,
  });
  return (
    <Reveal as="div" variant="scale" delay={i} className="flagship-kpi">
      <p className="flagship-kpi-value" ref={ref}>
        {text}
      </p>
      <p className="flagship-kpi-label">{k.label}</p>
    </Reveal>
  );
}

function MarketTile({ m, i }) {
  const tiltRef = useTilt({ max: 6, scale: 1.02 });
  return (
    <Reveal as="div" variant="scale" delay={i} className="market-tile" ref={tiltRef}>
      <span className="market-flag">{m.flag}</span>
      <span className="market-code">{m.code}</span>
      <span className="market-name">{m.name}</span>
    </Reveal>
  );
}

export default function FlagshipCaseStudy() {
  const { trackRef, pct } = useScrollFill();
  const fc = flagshipCase;

  return (
    <section id="results" className="section section-surface section-flagship">
      <div className="section-inner">
        <Reveal as="p" className="eyebrow">
          ★ {fc.eyebrow}
        </Reveal>
        <Reveal as="h2" variant="tilt" className="section-title" style={{ marginBottom: 14 }}>
          {fc.title}
        </Reveal>
        <Reveal as="p" className="section-lead flagship-subhead">
          {fc.subhead}
        </Reveal>

        <Reveal as="div" className="flagship-meta-row">
          <span className="tag tag-outline">Channel: {fc.channel}</span>
          <span className="tag tag-outline">Period: {fc.period}</span>
          <span className="tag tag-outline">Markets: UAE 🇦🇪 + KSA 🇸🇦</span>
        </Reveal>

        {/* Equation chain */}
        <div className="flagship-chain">
          {fc.chain.map((node, i) => (
            <span className="flagship-chain-node-wrap" key={node}>
              <Reveal as="span" variant="scale" delay={i} className="flagship-chain-node">
                {node}
              </Reveal>
              {i < fc.chain.length - 1 && <span className="flagship-chain-arrow">→</span>}
            </span>
          ))}
        </div>

        {/* Headline */}
        <Reveal as="p" className="flagship-headline">
          {fc.headline}
        </Reveal>

        {/* KPI grid */}
        <div className="flagship-kpi-grid">
          {fc.kpis.map((k, i) => (
            <Kpi k={k} i={i} key={k.label} />
          ))}
        </div>

        {/* Net callout */}
        <Reveal as="div" className="flagship-net">
          <span className="flagship-net-value">{fc.net.value}</span>
          <span className="flagship-net-label">Net after ad spend</span>
          <span className="flagship-net-note">{fc.net.note}</span>
        </Reveal>

        {/* Markets panel */}
        <div className="market-panel">
          <MarketTile m={fc.markets[0]} i={0} />
          <div className="market-connector" aria-hidden="true">
            <span className="market-connector-line" />
            <span className="market-connector-dot" />
          </div>
          <MarketTile m={fc.markets[1]} i={1} />
        </div>

        {/* Timeline */}
        <Reveal as="p" className="flagship-timeline-label">
          The 1+ year journey
        </Reveal>
        <div className="timeline flagship-timeline" ref={trackRef}>
          <div className="timeline-track" />
          <div className="timeline-fill" style={{ height: `${pct}%` }} />
          {fc.timeline.map((m, i) => (
            <Reveal as="article" className="timeline-item flagship-timeline-item" key={m.phase} delay={i}>
              <span className="timeline-node" />
              <span className="flagship-phase-tag">{String(i + 1).padStart(2, "0")} — {m.phase}</span>
              <h4 className="flagship-milestone-title">{m.title}</h4>
              <p className="flagship-milestone-body">{m.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="flagship-disclaimer">
          {fc.disclaimer}
        </Reveal>
      </div>
    </section>
  );
}
