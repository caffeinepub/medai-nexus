import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: Props) {
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

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "var(--glass-bg)" : "rgba(255,255,255,0.0)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--glass-border)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
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
          <span style={{ fontSize: "1.6rem" }}>🧠</span>
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
                color: "var(--text-secondary)",
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
                  "var(--accent-dim)";
                (e.target as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "none";
                (e.target as HTMLElement).style.color = "var(--text-secondary)";
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
                background: "#800020",
                boxShadow: "0 0 8px rgba(128,0,32,0.8)",
                animation: "blink 1.5s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontWeight: 500,
                letterSpacing: "1px",
              }}
            >
              SYS ONLINE
            </span>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            data-ocid="nav.toggle"
            onClick={onToggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "var(--accent-dim)",
              border: "1px solid var(--border-color)",
              color: "var(--accent)",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent-dim)";
              e.currentTarget.style.color = "var(--accent)";
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
