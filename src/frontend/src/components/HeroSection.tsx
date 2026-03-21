export default function HeroSection() {
  const scrollToSymptoms = () =>
    document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" });

  const stats: [string, string][] = [
    ["220+", "Symptoms"],
    ["70+", "Diseases"],
    ["AI-Powered", "Analysis"],
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "800px", animation: "fadeInUp 1s ease" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            marginBottom: "24px",
            fontSize: "0.85rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          AI-Powered Medical Analysis
        </div>

        <div
          style={{
            position: "relative",
            width: "200px",
            height: "200px",
            margin: "0 auto 40px",
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(167,139,250,0.5)",
              animation: "spinSlow 8s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "20px",
              borderRadius: "50%",
              border: "2px solid rgba(103,232,249,0.4)",
              animation: "spinReverse 6s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              animation: "spinSlow 4s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(167,139,250,0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Microscope icon"
            >
              <title>Microscope icon</title>
              <path d="M6 18h8" />
              <path d="M3 22h18" />
              <path d="M14 22a7 7 0 1 0 0-14h-1" />
              <path d="M9 14h2" />
              <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
              <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
            </svg>
          </div>
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          <span className="gradient-text">AI-Powered</span>
          <br />
          Disease Detection
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Select your symptoms and let our advanced AI analyze potential
          conditions with precision. Powered by a database of 70+ diseases and
          220+ symptoms.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={scrollToSymptoms}
            className="btn-gradient"
            style={{
              padding: "16px 36px",
              fontSize: "1.05rem",
              borderRadius: "14px",
            }}
          >
            Start Analysis
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "16px 36px",
              fontSize: "1.05rem",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background =
                "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background =
                "rgba(255,255,255,0.1)";
            }}
          >
            Learn More
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {stats.map(([val, label]) => (
            <div
              key={label}
              className="glass-card"
              style={{ padding: "16px 24px", minWidth: "120px" }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--accent-light)",
                }}
              >
                {val}
              </div>
              <div
                style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
