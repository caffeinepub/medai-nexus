import { useEffect, useState } from "react";
import type { Disease } from "../data/diseases";

interface Result extends Disease {
  confidence: number;
  matches: number;
  medicines: string;
  whenToSeeDoctor: string;
}

interface Props {
  results: Result[];
  isAnalyzing: boolean;
  selectedSymptoms: string[];
}

const SEVERITY_COLORS: Record<string, string> = {
  Mild: "#4ade80",
  Moderate: "#facc15",
  Severe: "#f97316",
  Critical: "#ef4444",
  Chronic: "#67e8f9",
  "Moderate-Severe": "#fb923c",
};

function TypingText({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span
      style={{
        borderRight:
          displayed.length < text.length
            ? "2px solid var(--accent-light)"
            : "none",
        paddingRight: "2px",
        animation:
          displayed.length < text.length
            ? "typing-cursor 0.5s infinite"
            : "none",
      }}
    >
      {displayed}
    </span>
  );
}

function ConfidenceBar({
  confidence,
  color,
}: { confidence: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setTimeout(() => setWidth(confidence), 100);
  }, [confidence]);
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: "4px",
        height: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.5))`,
          transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
}

interface ActionStep {
  step: number;
  title: string;
  description: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
}

function downloadPlan(result: Result, selectedSymptoms: string[]) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>MedAI Action Plan - ${result.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; padding: 32px; border-radius: 12px; margin-bottom: 28px; }
    .header h1 { font-size: 1.8rem; font-weight: 800; margin-bottom: 6px; }
    .header p { opacity: 0.85; font-size: 0.9rem; }
    .meta { display: flex; gap: 24px; margin-top: 16px; flex-wrap: wrap; }
    .meta-item { background: rgba(255,255,255,0.15); padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; }
    .section-title { font-size: 1.1rem; font-weight: 700; color: #667eea; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #667eea22; padding-bottom: 6px; }
    .symptoms-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
    .symptom-tag { background: #667eea15; border: 1px solid #667eea44; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: #4a4a8a; }
    .step { display: flex; gap: 16px; align-items: flex-start; padding: 16px 18px; border-radius: 10px; margin-bottom: 12px; }
    .step-1 { background: #667eea10; border: 1px solid #667eea33; }
    .step-2 { background: #4ade8010; border: 1px solid #4ade8033; }
    .step-3 { background: #a78bfa10; border: 1px solid #a78bfa33; }
    .step-4 { background: #fb923c10; border: 1px solid #fb923c33; }
    .step-5 { background: #ef444410; border: 1px solid #ef444433; }
    .step-num { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; color: #fff; flex-shrink: 0; }
    .step-1 .step-num { background: #667eea; }
    .step-2 .step-num { background: #4ade80; }
    .step-3 .step-num { background: #a78bfa; }
    .step-4 .step-num { background: #fb923c; }
    .step-5 .step-num { background: #ef4444; }
    .step-content h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; color: #1a1a2e; }
    .step-content p { font-size: 0.85rem; color: #444; line-height: 1.6; }
    .disclaimer { margin-top: 28px; padding: 14px 18px; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #764ba2; font-size: 0.8rem; color: #666; line-height: 1.5; }
    .footer { margin-top: 24px; text-align: center; font-size: 0.75rem; color: #999; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>MedAI Step-by-Step Action Plan</h1>
    <p>AI-Powered Disease Detection Analysis</p>
    <div class="meta">
      <span class="meta-item">Diagnosis: ${result.name}</span>
      <span class="meta-item">Confidence: ${result.confidence}%</span>
      <span class="meta-item">Severity: ${result.severity}</span>
      <span class="meta-item">Date: ${date}</span>
    </div>
  </div>

  <div class="section-title">Symptoms Analyzed (${selectedSymptoms.length})</div>
  <div class="symptoms-list">
    ${selectedSymptoms.map((s) => `<span class="symptom-tag">${s}</span>`).join("")}
  </div>

  <div class="section-title">Action Protocol</div>

  <div class="step step-1">
    <div class="step-num">1</div>
    <div class="step-content">
      <h3>Don't Panic — Stay Calm</h3>
      <p>This is an AI-assisted analysis, not a final diagnosis. Take a deep breath and proceed with the next steps rationally.</p>
    </div>
  </div>

  <div class="step step-2">
    <div class="step-num">2</div>
    <div class="step-content">
      <h3>Follow Recommended Diet</h3>
      <p>${result.diet}</p>
    </div>
  </div>

  <div class="step step-3">
    <div class="step-num">3</div>
    <div class="step-content">
      <h3>Take These Precautions</h3>
      <p>${result.precautions}</p>
    </div>
  </div>

  <div class="step step-4">
    <div class="step-num">4</div>
    <div class="step-content">
      <h3>Consider These Medicines</h3>
      <p>${result.medicines}. Always consult a pharmacist or doctor before taking any medication.</p>
    </div>
  </div>

  <div class="step step-5">
    <div class="step-num">5</div>
    <div class="step-content">
      <h3>When to See a Doctor</h3>
      <p>${result.whenToSeeDoctor}</p>
    </div>
  </div>

  <div class="disclaimer">
    <strong>Disclaimer:</strong> This tool is for educational purposes only and not a substitute for professional medical advice. Always consult a qualified healthcare provider for proper diagnosis and treatment.
  </div>

  <div class="footer">Generated by MedAI Nexus &mdash; ${date}</div>

  <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, "_blank");
  if (w) {
    w.onafterprint = () => URL.revokeObjectURL(url);
  }
}

function StepByStepPlan({
  result,
  selectedSymptoms,
}: { result: Result; selectedSymptoms: string[] }) {
  const steps: ActionStep[] = [
    {
      step: 1,
      title: "Don't Panic — Stay Calm",
      description:
        "This is an AI-assisted analysis, not a final diagnosis. Take a deep breath and proceed with the next steps rationally.",
      color: "rgba(102,126,234,0.15)",
      borderColor: "rgba(102,126,234,0.4)",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Calm icon"
        >
          <title>Calm</title>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      step: 2,
      title: "Follow Recommended Diet",
      description: result.diet,
      color: "rgba(74,222,128,0.1)",
      borderColor: "rgba(74,222,128,0.35)",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Diet icon"
        >
          <title>Diet</title>
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
    },
    {
      step: 3,
      title: "Take These Precautions",
      description: result.precautions,
      color: "rgba(167,139,250,0.1)",
      borderColor: "rgba(167,139,250,0.35)",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Precautions icon"
        >
          <title>Precautions</title>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      step: 4,
      title: "Consider These Medicines",
      description: `${result.medicines}. Always consult a pharmacist or doctor before taking any medication.`,
      color: "rgba(251,146,60,0.1)",
      borderColor: "rgba(251,146,60,0.35)",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Medicine icon"
        >
          <title>Medicine</title>
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
        </svg>
      ),
    },
    {
      step: 5,
      title: "When to See a Doctor",
      description: result.whenToSeeDoctor,
      color: "rgba(239,68,68,0.1)",
      borderColor: "rgba(239,68,68,0.35)",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f87171"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Doctor icon"
        >
          <title>Doctor</title>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="M10 16h4" />
          <path d="M12 14v4" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        marginTop: "32px",
        padding: "28px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(167,139,250,0.2)",
        animation: "fadeInUp 0.8s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--accent-light)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            Action Protocol
          </div>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              background: "linear-gradient(90deg, #a78bfa, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Step-by-Step Action Plan
          </h3>
        </div>

        {/* Download Plan Button */}
        <button
          type="button"
          onClick={() => downloadPlan(result, selectedSymptoms)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))",
            border: "1px solid rgba(167,139,250,0.5)",
            color: "#c4b5fd",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.5px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, rgba(102,126,234,0.4), rgba(118,75,162,0.4))";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 18px rgba(167,139,250,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Download icon"
          >
            <title>Download</title>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Plan
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {steps.map((s, idx) => (
          <div
            key={s.step}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              padding: "16px 18px",
              borderRadius: "12px",
              background: s.color,
              border: `1px solid ${s.borderColor}`,
              animation: `fadeInUp ${0.4 + idx * 0.1}s ease`,
            }}
          >
            <div
              style={{
                minWidth: "36px",
                height: "36px",
                borderRadius: "50%",
                background: s.borderColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {s.step}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                {s.icon}
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  {s.title}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResultDashboard({
  results,
  isAnalyzing,
  selectedSymptoms,
}: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isAnalyzing && results.length === 0) return null;

  return (
    <section id="results" style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <span className="gradient-text">AI Analysis Results</span>
          </h2>
          {selectedSymptoms.length > 0 && (
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              Analyzed {selectedSymptoms.length} symptoms
            </p>
          )}
        </div>

        {isAnalyzing && (
          <div
            data-ocid="results.loading_state"
            className="glass-card"
            style={{
              padding: "60px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                border: "3px solid rgba(167,139,250,0.3)",
                borderTop: "3px solid #a78bfa",
                animation: "spinSlow 2s linear infinite",
                display: "inline-block",
              }}
            />
            <h3 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>
              <TypingText text="Initializing AI System..." />
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Processing symptom data and running diagnostic algorithms
            </p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              {["d0", "d1", "d2"].map((d, i) => (
                <div
                  key={d}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    animation: `blink 1s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {!isAnalyzing && results.length > 0 && (
          <>
            <div
              data-ocid="results.card"
              className="glass-card"
              style={{
                padding: "32px",
                marginBottom: "20px",
                border: "1px solid rgba(167,139,250,0.4)",
                boxShadow: "0 0 30px rgba(102,126,234,0.3)",
                animation: "fadeInUp 0.6s ease",
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
                      color: "var(--accent-light)",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    PRIMARY DIAGNOSIS
                  </div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 700 }}>
                    <TypingText text={results[0].name} />
                  </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 800,
                      color: "var(--accent-light)",
                    }}
                  >
                    {results[0].confidence}%
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Confidence
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      background: `${SEVERITY_COLORS[results[0].severity] || "#facc15"}22`,
                      border: `1px solid ${SEVERITY_COLORS[results[0].severity] || "#facc15"}`,
                      color: SEVERITY_COLORS[results[0].severity] || "#facc15",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {results[0].severity}
                  </div>
                </div>
              </div>

              <ConfidenceBar
                confidence={results[0].confidence}
                color={SEVERITY_COLORS[results[0].severity] || "#a78bfa"}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: "24px",
                }}
              >
                <div
                  style={{
                    background: "rgba(102,126,234,0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(102,126,234,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--accent-light)",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Recommended Diet
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {results[0].diet}
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(118,75,162,0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(118,75,162,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#c4b5fd",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Precautions
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {results[0].precautions}
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(251,146,60,0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(251,146,60,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#fed7aa",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Medicines
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {results[0].medicines}
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#fca5a5",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    When to See a Doctor
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.5,
                    }}
                  >
                    {results[0].whenToSeeDoctor}
                  </p>
                </div>
              </div>

              {results[0].severity === "Critical" ||
              results[0].severity === "Severe" ? (
                <div
                  data-ocid="results.error_state"
                  style={{
                    marginTop: "16px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#fca5a5", fontSize: "0.88rem" }}>
                    High severity detected. Please consult a medical
                    professional urgently.
                  </span>
                </div>
              ) : (
                <div
                  data-ocid="results.success_state"
                  style={{
                    marginTop: "16px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#86efac", fontSize: "0.88rem" }}>
                    Consult a doctor for proper diagnosis and treatment.
                  </span>
                </div>
              )}

              {/* Step-by-Step Action Plan */}
              <StepByStepPlan
                result={results[0]}
                selectedSymptoms={selectedSymptoms}
              />
            </div>

            {results.slice(1).length > 0 && (
              <>
                <h3
                  style={{
                    marginBottom: "16px",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Other Possible Conditions
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {results.slice(1).map((r, i) => (
                    <button
                      type="button"
                      key={r.name}
                      data-ocid={`results.item.${i + 1}`}
                      className="glass-card"
                      style={{
                        padding: "20px",
                        cursor: "pointer",
                        animation: `fadeInUp ${0.3 + i * 0.1}s ease`,
                        border:
                          expanded === r.name
                            ? "1px solid rgba(167,139,250,0.5)"
                            : "1px solid rgba(255,255,255,0.1)",
                      }}
                      onClick={() =>
                        setExpanded(expanded === r.name ? null : r.name)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setExpanded(expanded === r.name ? null : r.name);
                        }
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "12px",
                        }}
                      >
                        <h4 style={{ fontWeight: 600 }}>{r.name}</h4>
                        <span
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--accent-light)",
                          }}
                        >
                          {r.confidence}%
                        </span>
                      </div>
                      <ConfidenceBar
                        confidence={r.confidence}
                        color={SEVERITY_COLORS[r.severity] || "#a78bfa"}
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "3px 10px",
                            borderRadius: "12px",
                            background: `${SEVERITY_COLORS[r.severity] || "#facc15"}22`,
                            color: SEVERITY_COLORS[r.severity] || "#facc15",
                            border: `1px solid ${SEVERITY_COLORS[r.severity] || "#facc15"}44`,
                          }}
                        >
                          {r.severity}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          {expanded === r.name ? "Less" : "More"}
                        </span>
                      </div>
                      {expanded === r.name && (
                        <div
                          style={{
                            marginTop: "12px",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            paddingTop: "12px",
                            animation: "slideDown 0.3s ease",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "0.82rem",
                              color: "rgba(255,255,255,0.7)",
                              marginBottom: "8px",
                            }}
                          >
                            <strong style={{ color: "var(--accent-light)" }}>
                              Diet:
                            </strong>{" "}
                            {r.diet}
                          </p>
                          <p
                            style={{
                              fontSize: "0.82rem",
                              color: "rgba(255,255,255,0.7)",
                              marginBottom: "8px",
                            }}
                          >
                            <strong style={{ color: "#c4b5fd" }}>
                              Precautions:
                            </strong>{" "}
                            {r.precautions}
                          </p>
                          <p
                            style={{
                              fontSize: "0.82rem",
                              color: "rgba(255,255,255,0.7)",
                              marginBottom: "8px",
                            }}
                          >
                            <strong style={{ color: "#fed7aa" }}>
                              Medicines:
                            </strong>{" "}
                            {r.medicines}
                          </p>
                          <p
                            style={{
                              fontSize: "0.82rem",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            <strong style={{ color: "#fca5a5" }}>
                              When to See Doctor:
                            </strong>{" "}
                            {r.whenToSeeDoctor}
                          </p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div
              style={{
                marginTop: "32px",
                padding: "16px 20px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
              }}
            >
              <p
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}
              >
                <strong>Disclaimer:</strong> This tool is for educational
                purposes only and not a substitute for professional medical
                advice. Always consult a qualified healthcare provider.
              </p>
            </div>
          </>
        )}

        {!isAnalyzing &&
          results.length === 0 &&
          selectedSymptoms.length > 0 && (
            <div
              data-ocid="results.empty_state"
              className="glass-card"
              style={{ padding: "40px", textAlign: "center" }}
            >
              <div style={{ marginBottom: "16px" }}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(167,139,250,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Search icon"
                >
                  <title>Search icon</title>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 style={{ marginBottom: "8px" }}>No Matches Found</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>
                Try selecting more specific symptoms for better results.
              </p>
            </div>
          )}
      </div>
    </section>
  );
}
