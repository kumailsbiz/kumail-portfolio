export default function Marquee({ items, speed = 28 }) {
  return (
    <div className="marquee" style={{ "--marquee-duration": `${speed}s` }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
