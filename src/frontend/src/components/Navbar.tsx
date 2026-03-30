import { useEffect, useState } from "react";

interface NavbarProps {
  isDark?: boolean;
  onToggle?: () => void;
}

export default function Navbar({ isDark = false, onToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navLinks: [string, string][] = [
    ["Home", ""],
    ["Symptoms", "symptoms"],
    ["Results", "results"],
    ["About", "about"],
  ];

  // Dark: Space Cadet bg. Light: Space Cadet → UCLA Blue gradient bg.
  const scrolledBg = isDark
    ? "rgba(16,40,83,0.97)"
    : "linear-gradient(135deg, rgba(16,40,83,0.95) 0%, rgba(80,105,128,0.9) 100%)";

  const navLinkColor = "#e8f0ff";
  const navLinkHoverColor = "#cf9bd4";

  return (
    <nav
      className="navbar-glossy"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled
          ? scrolledBg
          : isDark
            ? "rgba(16,40,83,0.0)"
            : "linear-gradient(135deg, rgba(16,40,83,0.88) 0%, rgba(80,105,128,0.78) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(125,191,192,0.25)",
        transition: "all 0.35s ease",
        boxShadow: scrolled
          ? "0 4px 30px rgba(16,40,83,0.4), 0 1px 0 rgba(125,191,192,0.15)"
          : "0 2px 12px rgba(16,40,83,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          data-ocid="nav.link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#cf9bd4"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ filter: "drop-shadow(0 0 6px rgba(207,155,212,0.7))" }}
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <span
            className="gradient-text"
            style={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            MedAI Nexus
          </span>
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {navLinks.map(([label, id]) => (
            <button
              key={label}
              type="button"
              data-ocid={`nav.${label.toLowerCase()}.link`}
              onClick={() =>
                id
                  ? scrollTo(id)
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
              style={{
                background: "none",
                border: "none",
                color: navLinkColor,
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: "8px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background =
                  "rgba(207,155,212,0.15)";
                (e.target as HTMLElement).style.color = navLinkHoverColor;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "none";
                (e.target as HTMLElement).style.color = navLinkColor;
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#7DBFC0",
                boxShadow: "0 0 8px rgba(125,191,192,0.8)",
                animation: "blink 1.5s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: "#cf9bd4",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              SYS ONLINE
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            data-ocid="nav.toggle"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={onToggle}
            className={`theme-toggle ${isDark ? "dark" : "light"}`}
          >
            <span className="theme-toggle-thumb">{isDark ? "🌙" : "☀️"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
