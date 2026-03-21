import { useEffect, useState } from "react";

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  isActivated: boolean;
}

export default function Navbar({ theme, onToggleTheme, isActivated }: Props) {
  const [scanPos, setScanPos] = useState(-100);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    let pos = -100;
    const id = setInterval(() => {
      pos += 4;
      if (pos > 110) pos = -100;
      setScanPos(pos);
    }, 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar" style={{ overflow: "hidden" }}>
      {/* Sweep scan-line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${scanPos}%`,
          width: "60px",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.1), transparent)",
          pointerEvents: "none",
          transform: "skewX(-15deg)",
        }}
      />

      <div className="navbar-logo">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          role="img"
          aria-label="MedAI Nexus icon"
        >
          <circle
            cx="14"
            cy="14"
            r="12"
            stroke="#8B5CF6"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <circle cx="14" cy="14" r="5" fill="#A78BFA" opacity="0.8" />
          <line
            x1="14"
            y1="2"
            x2="14"
            y2="7"
            stroke="#8B5CF6"
            strokeWidth="1.2"
          />
          <line
            x1="14"
            y1="21"
            x2="14"
            y2="26"
            stroke="#8B5CF6"
            strokeWidth="1.2"
          />
          <line
            x1="2"
            y1="14"
            x2="7"
            y2="14"
            stroke="#8B5CF6"
            strokeWidth="1.2"
          />
          <line
            x1="21"
            y1="14"
            x2="26"
            y2="14"
            stroke="#8B5CF6"
            strokeWidth="1.2"
          />
        </svg>
        <span className="navbar-brand">MEDAI NEXUS</span>
      </div>

      <div className="navbar-links">
        {["scan", "results", "about"].map((id, i) => (
          <button
            type="button"
            key={id}
            className="nav-link"
            onClick={() => scrollTo(id)}
            data-ocid={`nav.${id}.link`}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#8B5CF6",
                marginRight: 6,
                opacity: blink && i % 2 === 0 ? 1 : 0.3,
                boxShadow: "0 0 6px rgba(139,92,246,0.7)",
                verticalAlign: "middle",
                transition: "opacity 0.3s",
              }}
            />
            {id.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="navbar-right">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            color: "#A78BFA",
            textShadow:
              "0 0 10px rgba(167,139,250,0.7), 0 0 20px rgba(167,139,250,0.3)",
            letterSpacing: "0.08em",
          }}
        >
          SYS://ONLINE
        </span>
        {isActivated && (
          <span className="status-pill active">● SYSTEM ACTIVE</span>
        )}
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          title="Toggle theme"
          data-ocid="navbar.toggle"
        >
          {theme === "dark" ? "\u2600" : "\u25d1"}
        </button>
      </div>
    </nav>
  );
}
