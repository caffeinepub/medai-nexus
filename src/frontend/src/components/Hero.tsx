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
              { value: "220+", label: "Symptoms" },
              { value: "75", label: "Diseases" },
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
      <div className="hero-visual">
        <div className="holo-ring ring-outer" />
        <div className="holo-ring ring-mid" />
        <div className="holo-ring ring-inner" />
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
              stroke="#19D7FF"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx="30"
              cy="30"
              r="12"
              stroke="#A855F7"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle cx="30" cy="30" r="5" fill="#19D7FF" />
            {ringAngles.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={`spoke-${deg}`}
                  x1={30 + 12 * Math.cos(rad)}
                  y1={30 + 12 * Math.sin(rad)}
                  x2={30 + 20 * Math.cos(rad)}
                  y2={30 + 20 * Math.sin(rad)}
                  stroke="#19D7FF"
                  strokeWidth="1"
                  opacity="0.6"
                />
              );
            })}
          </svg>
        </div>
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
