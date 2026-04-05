export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);
  return (
    <footer
      style={{
        padding: "48px 24px",
        borderTop: "1px solid rgba(78,122,177,0.15)",
        background: "rgba(16,40,83,0.97)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cyan Azure gradient glow at top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #4E7AB1 30%, #7DBFC0 50%, #4E7AB1 70%, transparent)",
          boxShadow:
            "0 0 20px rgba(78,122,177,0.5), 0 0 8px rgba(125,191,192,0.4)",
        }}
      />
      <div
        style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7DBFC0"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(125,191,192,0.7))" }}
            aria-hidden="true"
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <span
            className="gradient-text"
            style={{ fontSize: "1.3rem", fontWeight: 700 }}
          >
            MedAI Nexus
          </span>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.85rem",
            maxWidth: "500px",
            margin: "0 auto 20px",
            lineHeight: 1.6,
          }}
        >
          AI-powered disease detection for educational purposes. Always consult
          a qualified healthcare professional for medical advice.
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.8rem",
            marginBottom: "8px",
          }}
        >
          © {year}. Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#7DBFC0",
              textDecoration: "none",
              fontWeight: 600,
              transition: "opacity 0.2s",
              textShadow: "0 0 8px rgba(125,191,192,0.5)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "1";
            }}
          >
            caffeine.ai
          </a>
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.75rem",
          }}
        >
          For educational use only. Not a medical device.
        </p>
      </div>
    </footer>
  );
}
