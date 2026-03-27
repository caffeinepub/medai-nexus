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
        background: scrolled
          ? "rgba(10, 15, 46, 0.92)"
          : "rgba(10, 15, 46, 0.0)",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(184,134,11,0.45)"
          : "1px solid transparent",
        transition: "all 0.35s ease",
        boxShadow: scrolled
          ? "0 4px 30px rgba(10,15,46,0.6), 0 1px 0 rgba(245,197,24,0.1)"
          : "none",
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
            stroke="#cc0000"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ filter: "drop-shadow(0 0 6px rgba(204,0,0,0.8))" }}
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
                color: "rgba(255,255,255,0.7)",
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
                  "rgba(245,197,24,0.1)";
                (e.target as HTMLElement).style.color = "#f5c518";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "none";
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)";
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
                background: "#cc0000",
                boxShadow: "0 0 8px rgba(204,0,0,0.9)",
                animation: "blink 1.5s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(245,197,24,0.7)",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
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
              background: "rgba(245,197,24,0.1)",
              border: "1px solid rgba(245,197,24,0.35)",
              color: "#f5c518",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245,197,24,0.2)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(245,197,24,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(245,197,24,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
