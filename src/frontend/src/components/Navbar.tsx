import { useEffect, useState } from "react";

interface NavbarProps {
  theme: string;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
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

  const isDark = theme === "dark";

  const navBg = isDark
    ? scrolled
      ? "rgba(3,12,26,0.97)"
      : "rgba(3,12,26,0.88)"
    : scrolled
      ? "rgba(240,246,255,0.97)"
      : "rgba(240,246,255,0.88)";

  const navBorderColor = isDark
    ? "rgba(0,229,255,0.15)"
    : "rgba(0,102,204,0.12)";

  const navShadow = isDark
    ? scrolled
      ? "0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(0,229,255,0.12), 0 0 40px rgba(0,229,255,0.04)"
      : "0 2px 8px rgba(0,0,0,0.4)"
    : scrolled
      ? "0 4px 24px rgba(0,102,204,0.1)"
      : "0 2px 8px rgba(0,0,0,0.06)";

  const textColor = isDark ? "#7eb8d4" : "#3a5a78";
  const textHoverColor = isDark ? "#00e5ff" : "#0066cc";
  const textHoverBg = isDark ? "rgba(0,229,255,0.08)" : "rgba(0,102,204,0.07)";
  const logoGradient = isDark
    ? "linear-gradient(135deg, #00e5ff, #06ffa5)"
    : "linear-gradient(135deg, #0066cc, #7c3aed)";
  const logoIconColor = isDark ? "#00e5ff" : "#0066cc";
  const logoIconGlow = isDark
    ? "drop-shadow(0 0 6px rgba(0,229,255,0.7))"
    : "drop-shadow(0 0 4px rgba(0,102,204,0.4))";
  const sysColor = isDark ? "#06ffa5" : "#15803d";
  const sysGlow = isDark
    ? "0 0 10px rgba(6,255,165,0.8)"
    : "0 0 6px rgba(21,128,61,0.5)";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: navBg,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${navBorderColor}`,
        transition: "all 0.35s ease",
        boxShadow: navShadow,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
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
            flexShrink: 0,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={logoIconColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ filter: logoIconGlow }}
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <span
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              background: logoGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Plus Jakarta Sans, Poppins, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            MedAI Nexus
          </span>
        </button>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
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
                color: textColor,
                cursor: "pointer",
                padding: "7px 13px",
                borderRadius: "8px",
                fontFamily: "Plus Jakarta Sans, Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                transition: "all 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = textHoverBg;
                (e.target as HTMLElement).style.color = textHoverColor;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "none";
                (e.target as HTMLElement).style.color = textColor;
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side: toggle + SYS ONLINE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0,
          }}
        >
          {/* Theme toggle pill */}
          <button
            type="button"
            data-ocid="nav.toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="theme-toggle-pill"
          >
            <span className={`theme-toggle-option${isDark ? " active" : ""}`}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill={isDark ? "#030c1a" : "currentColor"}
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              DARK
            </span>
            <span className={`theme-toggle-option${!isDark ? " active" : ""}`}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill={!isDark ? "#ffffff" : "currentColor"}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              LIGHT
            </span>
          </button>

          {/* SYS ONLINE indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: sysColor,
                boxShadow: sysGlow,
                animation: "blink 1.5s ease-in-out infinite",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                color: sysColor,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              SYS ONLINE
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
