import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-ocid="nav.panel"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: "1rem 1.5rem",
      }}
    >
      <nav
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 1.25rem",
          borderRadius: "9999px",
          background: scrolled
            ? "rgba(11,31,74,0.92)"
            : "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.16)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.40)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "9px",
              background: "linear-gradient(135deg, #667EEA, #764BA2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 14px rgba(102,126,234,0.55)",
            }}
          >
            <Activity size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            MedAI <span style={{ color: "#a5b4fc" }}>Vision</span>
          </span>
        </div>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "0.15rem" }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              data-ocid={`nav.${l.label.toLowerCase().replace(/ /g, "_")}.link`}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.70)",
                fontSize: "0.855rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: "0.4rem 0.8rem",
                borderRadius: "999px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.70)";
                e.currentTarget.style.background = "none";
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right: HUD status + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {/* HUD indicator */}
          <div
            className="hidden sm:flex"
            style={{ alignItems: "center", gap: "0.4rem" }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
                animation: "hud-blink 2.4s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "rgba(74,222,128,0.70)",
                textTransform: "uppercase",
              }}
            >
              SYS·ONLINE
            </span>
          </div>

          <button
            type="button"
            data-ocid="nav.check_now.button"
            className="btn-cta hidden sm:inline-flex"
            style={{ padding: "0.48rem 1.2rem", fontSize: "0.845rem" }}
            onClick={() => scrollTo("#upload")}
          >
            Check Now
          </button>

          <button
            type="button"
            className="flex md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#fff",
              borderRadius: "8px",
              padding: "0.35rem 0.5rem",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            left: "1.5rem",
            right: "1.5rem",
            background: "rgba(11,31,74,0.97)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "16px",
            backdropFilter: "blur(18px)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.95rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: "0.65rem 1rem",
                borderRadius: "10px",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            className="btn-cta justify-center mt-2"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => scrollTo("#upload")}
          >
            Check Now
          </button>
        </div>
      )}
    </header>
  );
}
