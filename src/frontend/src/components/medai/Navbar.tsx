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
          background: scrolled ? "rgba(3,7,18,0.95)" : "rgba(0,245,255,0.04)",
          border: "1px solid rgba(0,245,255,0.15)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,245,255,0.1)"
            : "none",
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
              background: "linear-gradient(135deg, #0080ff, #bf00ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 14px rgba(0,128,255,0.7), 0 0 28px rgba(191,0,255,0.4)",
            }}
          >
            <Activity size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "Bricolage Grotesque, Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              color: "#00f5ff",
              textShadow: "0 0 10px rgba(0,245,255,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            MedAI{" "}
            <span
              style={{
                color: "#bf00ff",
                textShadow: "0 0 10px rgba(191,0,255,0.5)",
              }}
            >
              Vision
            </span>
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
                color: "rgba(224,247,255,0.65)",
                fontSize: "0.855rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: "0.4rem 0.8rem",
                borderRadius: "999px",
                transition: "color 0.2s, background 0.2s, text-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00f5ff";
                e.currentTarget.style.background = "rgba(0,245,255,0.08)";
                e.currentTarget.style.textShadow =
                  "0 0 8px rgba(0,245,255,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(224,247,255,0.65)";
                e.currentTarget.style.background = "none";
                e.currentTarget.style.textShadow = "none";
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
                background: "#00ff88",
                boxShadow: "0 0 8px #00ff88, 0 0 16px rgba(0,255,136,0.5)",
                animation: "blink 2.4s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "rgba(0,255,136,0.8)",
                textTransform: "uppercase",
                textShadow: "0 0 6px rgba(0,255,136,0.5)",
              }}
            >
              SYS·ONLINE
            </span>
          </div>

          <button
            type="button"
            data-ocid="nav.check_now.button"
            className="hidden sm:inline-flex"
            style={{
              padding: "0.48rem 1.2rem",
              fontSize: "0.845rem",
              background: "linear-gradient(135deg, #0080ff, #bf00ff)",
              border: "none",
              borderRadius: "999px",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow:
                "0 0 16px rgba(0,128,255,0.5), 0 0 30px rgba(191,0,255,0.3)",
              transition: "all 0.2s",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => scrollTo("#upload")}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0,245,255,0.7), 0 0 50px rgba(0,128,255,0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 16px rgba(0,128,255,0.5), 0 0 30px rgba(191,0,255,0.3)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Check Now
          </button>

          <button
            type="button"
            className="flex md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "1px solid rgba(0,245,255,0.25)",
              color: "#00f5ff",
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
            background: "rgba(3,7,18,0.97)",
            border: "1px solid rgba(0,245,255,0.2)",
            borderRadius: "16px",
            backdropFilter: "blur(18px)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            boxShadow: "0 0 30px rgba(0,245,255,0.1)",
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
                color: "rgba(224,247,255,0.85)",
                fontSize: "0.95rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: "0.65rem 1rem",
                borderRadius: "10px",
                textAlign: "left",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,245,255,0.08)";
                e.currentTarget.style.color = "#00f5ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "rgba(224,247,255,0.85)";
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            data-ocid="nav.mobile.check_now.button"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "linear-gradient(135deg, #0080ff, #bf00ff)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: 600,
              padding: "0.7rem 1rem",
              cursor: "pointer",
              marginTop: "0.5rem",
              boxShadow: "0 0 16px rgba(0,128,255,0.4)",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
            }}
            onClick={() => scrollTo("#upload")}
          >
            Check Now
          </button>
        </div>
      )}
    </header>
  );
}
