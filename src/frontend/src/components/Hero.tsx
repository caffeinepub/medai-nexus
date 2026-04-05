export default function Hero() {
  const ringAngles = [0, 60, 120, 180, 240, 300];
  const dotKeys = [
    "dot-top",
    "dot-tr",
    "dot-br",
    "dot-bot",
    "dot-bl",
    "dot-tl",
    "dot-ml",
    "dot-tl2",
  ];

  // Cyan Azure / Air Superiority Blue rings
  const rings = [
    {
      size: 320,
      cls: "ring-1",
      dur: "18s",
      rev: false,
      style: "dashed",
      color: "rgba(78,122,177,0.15)",
    },
    {
      size: 280,
      cls: "ring-2",
      dur: "12s",
      rev: false,
      style: "dashed",
      color: "rgba(125,191,192,0.25)",
    },
    {
      size: 230,
      cls: "ring-3",
      dur: "9s",
      rev: true,
      style: "solid",
      color: "rgba(78,122,177,0.35)",
    },
    {
      size: 185,
      cls: "ring-4",
      dur: "14s",
      rev: false,
      style: "dashed",
      color: "rgba(215,182,212,0.35)",
    },
    {
      size: 145,
      cls: "ring-5",
      dur: "7s",
      rev: true,
      style: "solid",
      color: "rgba(215,182,212,0.5)",
    },
    {
      size: 105,
      cls: "ring-6",
      dur: "5s",
      rev: false,
      style: "solid",
      color: "rgba(125,191,192,0.6)",
    },
    {
      size: 68,
      cls: "ring-7",
      dur: "3.5s",
      rev: true,
      style: "solid",
      color: "rgba(78,122,177,0.7)",
    },
  ];

  const dataLabels = [
    { text: "NEURAL PATHWAY", top: "8%", left: "62%" },
    { text: "SYNAPTIC LINK", top: "25%", right: "2%", left: undefined },
    {
      text: "BIOMARKER",
      bottom: "18%",
      right: "5%",
      top: undefined,
      left: undefined,
    },
    { text: "DNA SEQUENCE", bottom: "5%", left: "60%", top: undefined },
    { text: "CORTEX SCAN", top: "50%", left: "2%" },
    { text: "QUANTUM AI", top: "12%", left: "12%" },
  ];

  const tickCount = 24;
  const outerR = 160;

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-accent-bar" />
        <div className="hero-text">
          <h1 className="hero-title">
            <span>NEURAL</span>
            <span className="hero-title-highlight">DISEASE</span>
            <span>DETECTION</span>
          </h1>
          <p className="hero-subtitle">
            Advanced AI-powered diagnostic analysis using pattern recognition
            and machine learning to identify potential health conditions.
          </p>
          <div className="hero-stats">
            {[
              { value: "264+", label: "Symptoms" },
              { value: "70", label: "Diseases" },
              { value: "AI", label: "Powered" },
              { value: "Live", label: "Analysis" },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-visual hero-visual-enhanced">
        {rings.map((ring) => (
          <div
            key={ring.cls}
            className="holo-ring"
            style={{
              width: ring.size,
              height: ring.size,
              borderColor: ring.color,
              borderStyle: ring.style as React.CSSProperties["borderStyle"],
              animation: `${
                ring.rev ? "rotate-ring-rev" : "rotate-ring"
              } ${ring.dur} linear infinite`,
              boxShadow: ring.size < 150 ? `0 0 14px ${ring.color}` : undefined,
            }}
          />
        ))}

        {/* Dual radar sweeps: Cyan Azure + Air Superiority Blue */}
        <div className="radar-sweep" />
        <div
          className="radar-sweep"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 70%, rgba(125,191,192,0.2) 85%, rgba(78,122,177,0.3) 95%, rgba(125,191,192,0.08) 100%)",
            animation: "radar2 4.5s linear infinite",
          }}
        />

        <svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
          viewBox="0 0 340 340"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: tickCount }, (_, i) => {
            const angle = (i / tickCount) * Math.PI * 2 - Math.PI / 2;
            const innerR = outerR - (i % 6 === 0 ? 10 : 5);
            const tickAngleDeg = Math.round((i / tickCount) * 360);
            return (
              <line
                key={`tick-${tickAngleDeg}`}
                x1={170 + innerR * Math.cos(angle)}
                y1={170 + innerR * Math.sin(angle)}
                x2={170 + outerR * Math.cos(angle)}
                y2={170 + outerR * Math.sin(angle)}
                stroke={
                  i % 2 === 0
                    ? "rgba(78,122,177,0.45)"
                    : "rgba(215,182,212,0.4)"
                }
                strokeWidth={i % 6 === 0 ? 1.5 : 0.8}
              />
            );
          })}
          {ringAngles.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={`spoke-${deg}`}
                x1={170 + 34 * Math.cos(rad)}
                y1={170 + 34 * Math.sin(rad)}
                x2={170 + 52 * Math.cos(rad)}
                y2={170 + 52 * Math.sin(rad)}
                stroke="#4E7AB1"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          })}
        </svg>

        <div className="holo-core">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            role="img"
            aria-label="Neural network visualization"
          >
            <circle
              cx="30"
              cy="30"
              r="20"
              stroke="rgba(215,182,212,0.5)"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx="30"
              cy="30"
              r="12"
              stroke="#7DBFC0"
              strokeWidth="1.5"
              opacity="0.75"
            />
            <circle cx="30" cy="30" r="5" fill="#4E7AB1" />
            {ringAngles.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={`core-${deg}`}
                  x1={30 + 12 * Math.cos(rad)}
                  y1={30 + 12 * Math.sin(rad)}
                  x2={30 + 20 * Math.cos(rad)}
                  y2={30 + 20 * Math.sin(rad)}
                  stroke="#4E7AB1"
                  strokeWidth="1"
                  opacity="0.7"
                />
              );
            })}
          </svg>
        </div>

        {dataLabels.map((label) => (
          <span
            key={label.text}
            className="data-label"
            style={{
              top: label.top,
              left: label.left,
              right: (label as { right?: string }).right,
              bottom: (label as { bottom?: string }).bottom,
            }}
          >
            {label.text}
          </span>
        ))}

        <div className="holo-dots">
          {dotKeys.map((k, i) => (
            <div
              key={k}
              className="holo-dot"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
