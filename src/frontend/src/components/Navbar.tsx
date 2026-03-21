interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  isActivated: boolean;
}

export default function Navbar({ theme, onToggleTheme, isActivated }: Props) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
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
            stroke="#19D7FF"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <circle cx="14" cy="14" r="5" fill="#19D7FF" opacity="0.8" />
          <line
            x1="14"
            y1="2"
            x2="14"
            y2="7"
            stroke="#19D7FF"
            strokeWidth="1.2"
          />
          <line
            x1="14"
            y1="21"
            x2="14"
            y2="26"
            stroke="#19D7FF"
            strokeWidth="1.2"
          />
          <line
            x1="2"
            y1="14"
            x2="7"
            y2="14"
            stroke="#19D7FF"
            strokeWidth="1.2"
          />
          <line
            x1="21"
            y1="14"
            x2="26"
            y2="14"
            stroke="#19D7FF"
            strokeWidth="1.2"
          />
        </svg>
        <span className="navbar-brand">MEDAI NEXUS</span>
      </div>
      <div className="navbar-links">
        {["scan", "results", "database"].map((id) => (
          <button
            type="button"
            key={id}
            className="nav-link"
            onClick={() => scrollTo(id)}
          >
            {id.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="navbar-right">
        {isActivated && (
          <span className="status-pill active">● SYSTEM ACTIVE</span>
        )}
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀" : "◑"}
        </button>
      </div>
    </nav>
  );
}
