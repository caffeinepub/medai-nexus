export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ padding: "60px 24px", background: "var(--bg-primary)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <span className="gradient-text">About MedAI Nexus</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            An advanced AI-powered diagnostic assistant designed to help
            identify potential conditions based on symptoms.
          </p>
        </div>

        <div
          className="glass-card"
          style={{ padding: "32px", marginBottom: "24px" }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            MedAI Nexus uses a comprehensive database of{" "}
            <strong style={{ color: "var(--accent)" }}>70+ diseases</strong> and{" "}
            <strong style={{ color: "var(--accent)" }}>220+ symptoms</strong> to
            provide intelligent diagnostic suggestions. Our AI matching
            algorithm analyzes symptom patterns and calculates confidence scores
            to surface the most likely conditions.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "1rem",
              marginTop: "16px",
            }}
          >
            When an API key is provided, the system connects to advanced AI
            models for deeper analysis and natural language explanations.
            Without an API connection, our built-in algorithm still provides
            accurate pattern-matching results.
          </p>
        </div>
      </div>
    </section>
  );
}
