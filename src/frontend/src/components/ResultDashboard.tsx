import { useState } from "react";

interface DiagnosisResult {
  name: string;
  symptoms: string[];
  severity: string;
  diet: string;
  precautions: string;
  medicines: string;
  whenToSeeDoctor: string;
  confidence: number;
  matches: number;
}

interface Props {
  results: DiagnosisResult[];
  selectedSymptoms: string[];
  isAnalyzing: boolean;
}

const SEVERITY_NEON: Record<
  string,
  { color: string; glow: string; bg: string; border: string }
> = {
  mild: {
    color: "#00ff88",
    glow: "rgba(0,255,136,0.6)",
    bg: "rgba(0,255,136,0.1)",
    border: "rgba(0,255,136,0.4)",
  },
  moderate: {
    color: "#facc15",
    glow: "rgba(250,204,21,0.6)",
    bg: "rgba(250,204,21,0.1)",
    border: "rgba(250,204,21,0.4)",
  },
  severe: {
    color: "#ff6b00",
    glow: "rgba(255,107,0,0.6)",
    bg: "rgba(255,107,0,0.1)",
    border: "rgba(255,107,0,0.4)",
  },
  critical: {
    color: "#ff00ff",
    glow: "rgba(255,0,255,0.6)",
    bg: "rgba(255,0,255,0.1)",
    border: "rgba(255,0,255,0.5)",
  },
};

function getSeverityNeon(severity: string) {
  return SEVERITY_NEON[severity.toLowerCase()] || SEVERITY_NEON.moderate;
}

export default function ResultDashboard({
  results,
  selectedSymptoms,
  isAnalyzing,
}: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showDb, setShowDb] = useState(false);

  if (isAnalyzing) {
    return (
      <section
        id="results"
        style={{
          padding: "60px 24px",
          background: "#030712",
          textAlign: "center",
        }}
      >
        <div
          data-ocid="results.loading_state"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "3px solid rgba(0,245,255,0.15)",
              borderTopColor: "#00f5ff",
              borderRightColor: "#bf00ff",
              borderRadius: "50%",
              animation: "spinSlow 1s linear infinite",
              boxShadow:
                "0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(191,0,255,0.2)",
            }}
          />
          <p
            style={{
              color: "#00f5ff",
              fontSize: "1.1rem",
              fontWeight: 600,
              textShadow: "0 0 12px rgba(0,245,255,0.6)",
            }}
          >
            Initializing AI System...
          </p>
        </div>
      </section>
    );
  }

  if (!results.length) return null;

  const top = results[0];
  const sevNeon = getSeverityNeon(top.severity);

  const downloadPlan = () => {
    const content = `
MedAI Nexus — Step-by-Step Action Plan
======================================
Diagnosis: ${top.name}
Severity: ${top.severity}
Confidence: ${top.confidence}%

Symptoms Analyzed:
${selectedSymptoms.map((s) => `  • ${s}`).join("\n")}

Step 1 — Stay Calm & Assess
Take a deep breath. Avoid self-diagnosis panic. Your symptoms suggest ${top.name}.

Step 2 — Recommended Diet
${top.diet || "Follow a balanced, nutritious diet. Stay hydrated."}

Step 3 — Precautions
${top.precautions || "Rest well, avoid exertion, monitor your symptoms closely."}

Step 4 — Medicines (Consult doctor before taking)
${top.medicines || "Do not self-medicate. Consult a healthcare professional."}

Step 5 — When to See a Doctor
${top.whenToSeeDoctor || "Seek immediate medical care if symptoms worsen."}

---
DISCLAIMER: This is for educational purposes only.
Always consult a qualified healthcare professional.
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MedAI-ActionPlan-${top.name.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="results"
      style={{ padding: "60px 24px", background: "#030712" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <span className="gradient-text">AI Diagnosis Results</span>
          </h2>
          <p style={{ color: "rgba(224,247,255,0.55)" }}>
            Based on {selectedSymptoms.length} symptoms analyzed
          </p>
        </div>

        {/* Top Result Card */}
        <div
          data-ocid="results.card"
          style={{
            background: "rgba(0,245,255,0.04)",
            border: "1px solid rgba(0,245,255,0.2)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "0 0 30px rgba(0,245,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(0,245,255,0.6)",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              >
                Primary Diagnosis
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color: "#00f5ff",
                  textShadow:
                    "0 0 15px rgba(0,245,255,0.6), 0 0 30px rgba(0,245,255,0.3)",
                }}
              >
                {top.name}
              </h3>
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                background: sevNeon.bg,
                border: `1px solid ${sevNeon.border}`,
                color: sevNeon.color,
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "capitalize",
                boxShadow: `0 0 10px ${sevNeon.glow}`,
                textShadow: `0 0 8px ${sevNeon.glow}`,
              }}
            >
              {top.severity}
            </div>
          </div>

          {/* Confidence bar */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "0.85rem",
                color: "rgba(224,247,255,0.6)",
              }}
            >
              <span>Confidence Level</span>
              <span
                style={{
                  color: "#00f5ff",
                  fontWeight: 700,
                  textShadow: "0 0 8px rgba(0,245,255,0.6)",
                }}
              >
                {top.confidence}%
              </span>
            </div>
            <div
              style={{
                height: "8px",
                background: "rgba(0,245,255,0.1)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${top.confidence}%`,
                  background: "linear-gradient(90deg, #0080ff, #00f5ff)",
                  borderRadius: "4px",
                  boxShadow:
                    "0 0 10px rgba(0,245,255,0.7), 0 0 20px rgba(0,128,255,0.4)",
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>

          {/* Info grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            {[
              {
                label: "Recommended Diet",
                icon: "🥗",
                content: top.diet,
                color: "#00ff88",
              },
              {
                label: "Precautions",
                icon: "⚠️",
                content: top.precautions,
                color: "#facc15",
              },
              {
                label: "Medicines",
                icon: "💊",
                content: top.medicines,
                color: "#60b3ff",
              },
              {
                label: "When to See Doctor",
                icon: "🏥",
                content: top.whenToSeeDoctor,
                color: "#ff80ff",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(0,245,255,0.03)",
                  border: "1px solid rgba(0,245,255,0.12)",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: item.color,
                    textShadow: `0 0 6px ${item.color}88`,
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {item.icon} {item.label}
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(224,247,255,0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.content ||
                    "Consult a healthcare professional for personalized advice."}
                </p>
              </div>
            ))}
          </div>

          {/* Step-by-Step Action Plan */}
          <div
            style={{
              background: "rgba(0,128,255,0.05)",
              border: "1px solid rgba(0,128,255,0.25)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#00f5ff",
                textShadow: "0 0 10px rgba(0,245,255,0.5)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>⚡</span>
              Step-by-Step Action Plan
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  step: 1,
                  title: "Stay Calm & Assess",
                  desc: `Take a deep breath. Your symptoms suggest ${top.name}. Do not panic.`,
                  color: "#00f5ff",
                },
                {
                  step: 2,
                  title: "Follow Recommended Diet",
                  desc:
                    top.diet ||
                    "Follow a balanced, nutritious diet and stay well hydrated.",
                  color: "#00ff88",
                },
                {
                  step: 3,
                  title: "Take Precautions",
                  desc:
                    top.precautions ||
                    "Rest adequately, avoid physical exertion, monitor symptoms closely.",
                  color: "#facc15",
                },
                {
                  step: 4,
                  title: "Consider Medicines (Doctor Advised)",
                  desc:
                    top.medicines ||
                    "Do not self-medicate. Consult a licensed healthcare professional.",
                  color: "#60b3ff",
                },
                {
                  step: 5,
                  title: "When to See a Doctor",
                  desc:
                    top.whenToSeeDoctor ||
                    "If symptoms persist or worsen after 48 hours, seek immediate medical care.",
                  color: "#ff00ff",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  data-ocid={`results.item.${item.step}`}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: `2px solid ${item.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      color: item.color,
                      flexShrink: 0,
                      boxShadow: `0 0 10px ${item.color}66, 0 0 20px ${item.color}33`,
                      textShadow: `0 0 6px ${item.color}`,
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: item.color,
                        textShadow: `0 0 6px ${item.color}66`,
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "rgba(224,247,255,0.65)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download button */}
          <button
            type="button"
            data-ocid="results.download_button"
            onClick={downloadPlan}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ff00ff, #bf00ff)",
              border: "none",
              color: "white",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow:
                "0 0 20px rgba(255,0,255,0.4), 0 0 40px rgba(191,0,255,0.3)",
              transition: "all 0.3s",
              fontFamily: "Poppins, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(255,0,255,0.6), 0 0 60px rgba(191,0,255,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(255,0,255,0.4), 0 0 40px rgba(191,0,255,0.3)";
              e.currentTarget.style.transform = "none";
            }}
          >
            ⬇ Download Action Plan
          </button>

          <p
            style={{
              color: "rgba(224,247,255,0.35)",
              fontSize: "0.75rem",
              textAlign: "center",
              marginTop: "16px",
              lineHeight: 1.5,
            }}
          >
            ⚠ This tool is for educational purposes only and not a substitute
            for professional medical advice.
          </p>
        </div>

        {/* Other possible conditions */}
        {results.length > 1 && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "rgba(224,247,255,0.7)",
                marginBottom: "16px",
                paddingLeft: "4px",
              }}
            >
              Other Possible Conditions
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {results.slice(1).map((r, i) => {
                const sev = getSeverityNeon(r.severity);
                const isExpanded = expandedIdx === i;
                return (
                  <div
                    key={r.name}
                    data-ocid={`results.item.${i + 2}`}
                    style={{
                      background: "rgba(0,245,255,0.03)",
                      border: "1px solid rgba(0,245,255,0.12)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "all 0.3s",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedIdx(isExpanded ? null : i)}
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#e0f7ff",
                          flex: 1,
                          fontSize: "0.95rem",
                        }}
                      >
                        {r.name}
                      </span>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "999px",
                          background: sev.bg,
                          border: `1px solid ${sev.border}`,
                          color: sev.color,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          textTransform: "capitalize",
                          boxShadow: `0 0 6px ${sev.glow}`,
                        }}
                      >
                        {r.severity}
                      </span>
                      <span
                        style={{
                          color: "#00f5ff",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          textShadow: "0 0 6px rgba(0,245,255,0.5)",
                        }}
                      >
                        {r.confidence}%
                      </span>
                      <span
                        style={{
                          color: "rgba(0,245,255,0.5)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Confidence bar */}
                    <div style={{ padding: "0 20px 4px" }}>
                      <div
                        style={{
                          height: "3px",
                          background: "rgba(0,245,255,0.1)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${r.confidence}%`,
                            background:
                              "linear-gradient(90deg, #0080ff, #00f5ff)",
                            boxShadow: "0 0 6px rgba(0,245,255,0.5)",
                          }}
                        />
                      </div>
                    </div>

                    {isExpanded && (
                      <div
                        style={{
                          padding: "16px 20px",
                          borderTop: "1px solid rgba(0,245,255,0.1)",
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "12px",
                        }}
                      >
                        {[
                          { label: "Diet", content: r.diet, color: "#00ff88" },
                          {
                            label: "Precautions",
                            content: r.precautions,
                            color: "#facc15",
                          },
                          {
                            label: "Medicines",
                            content: r.medicines,
                            color: "#60b3ff",
                          },
                          {
                            label: "See Doctor If",
                            content: r.whenToSeeDoctor,
                            color: "#ff80ff",
                          },
                        ].map((detail) => (
                          <div key={detail.label}>
                            <div
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                color: detail.color,
                                textShadow: `0 0 6px ${detail.color}66`,
                                marginBottom: "4px",
                              }}
                            >
                              {detail.label}
                            </div>
                            <p
                              style={{
                                fontSize: "0.82rem",
                                color: "rgba(224,247,255,0.6)",
                                lineHeight: 1.5,
                              }}
                            >
                              {detail.content || "N/A"}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Disease DB toggle */}
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            data-ocid="results.toggle"
            onClick={() => setShowDb((v) => !v)}
            style={{
              background: "rgba(0,245,255,0.05)",
              border: "1px solid rgba(0,245,255,0.2)",
              borderRadius: "999px",
              padding: "10px 28px",
              color: "#00f5ff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.2s",
              textShadow: "0 0 8px rgba(0,245,255,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,245,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.05)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {showDb ? "▲ Hide Disease Database" : "▼ View Disease Database"}
          </button>
        </div>
      </div>
    </section>
  );
}
