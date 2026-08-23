import { stats } from "../data";
import useCountUp from "../hooks/useCountUp";

function Stat({ stat }) {
  const { ref, text } = useCountUp(stat.value, { suffix: stat.suffix });
  return (
    <div className="stat-cell" ref={ref}>
      <p className="stat-value">{text}</p>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section aria-label="Career figures" className="stats-bar">
      <div className="stats-inner">
        {stats.map((s) => (
          <Stat stat={s} key={s.label} />
        ))}
      </div>
    </section>
  );
}
