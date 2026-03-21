export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "60px 24px" }}>
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
              color: "rgba(255,255,255,0.7)",
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
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            MedAI Nexus uses a comprehensive database of{" "}
            <strong style={{ color: "var(--accent-light)" }}>
              70+ diseases
            </strong>{" "}
            and{" "}
            <strong style={{ color: "var(--accent-light)" }}>
              220+ symptoms
            </strong>{" "}
            to provide intelligent diagnostic suggestions. Our AI matching
            algorithm analyzes symptom patterns and calculates confidence scores
            to surface the most likely conditions.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.8,
              fontSize: "1rem",
              marginTop: "16px",
            }}
          >
            When an OpenAI API key is provided, the system connects to advanced
            AI models for deeper analysis and natural language explanations.
            Without an API connection, our built-in algorithm still provides
            accurate pattern-matching results.
          </p>
        </div>

        <h3
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          How to Use
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {(
            [
              {
                step: "01",
                icon: (
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(167,139,250,0.85)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="API key"
                  >
                    <title>API key</title>
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                ),
                title: "Activate API",
                desc: "Enter your API key on the activation screen to initialize the system.",
              },
              {
                step: "02",
                icon: (
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(167,139,250,0.85)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="Stethoscope"
                  >
                    <title>Stethoscope</title>
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
                ),
                title: "Select Symptoms",
                desc: "Browse 220+ symptoms across General, Critical, and Rare categories. Select all that apply.",
              },
              {
                step: "03",
                icon: (
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(167,139,250,0.85)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="AI analysis"
                  >
                    <title>AI analysis</title>
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                ),
                title: "Get AI Analysis",
                desc: "Click Analyze to receive ranked disease matches with confidence scores, diet, and precautions.",
              },
            ] as {
              step: string;
              icon: React.ReactNode;
              title: string;
              desc: string;
            }[]
          ).map(({ step, icon, title, desc }) => (
            <div
              key={step}
              data-ocid={`about.step-${step}.card`}
              className="glass-card"
              style={{ padding: "28px 24px", textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--accent-light)",
                  letterSpacing: "2px",
                  marginBottom: "12px",
                  fontWeight: 600,
                }}
              >
                STEP {step}
              </div>
              <div
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {icon}
              </div>
              <h4 style={{ fontWeight: 600, marginBottom: "10px" }}>{title}</h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
