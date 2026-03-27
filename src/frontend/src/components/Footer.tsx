export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);
  return (
    <footer
      style={{
        padding: "40px 24px",
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-card)",
      }}
    >
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
            stroke="var(--accent)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Brain"
          >
            <title>Brain</title>
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
            color: "var(--text-muted)",
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
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            marginBottom: "8px",
          }}
        >
          © {year}. Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 600,
              transition: "opacity 0.2s",
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
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            opacity: 0.6,
          }}
        >
          For educational use only. Not a medical device.
        </p>
      </div>
    </footer>
  );
}
