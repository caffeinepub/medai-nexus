import { useEffect, useRef, useState } from "react";

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

function getSeverityStyle(severity: string) {
  const s = severity.toLowerCase();
  const vars: Record<string, { color: string; bg: string; border: string }> = {
    mild: {
      color: "var(--severity-mild-color)",
      bg: "var(--severity-mild-bg)",
      border: "var(--severity-mild-border)",
    },
    moderate: {
      color: "var(--severity-moderate-color)",
      bg: "var(--severity-moderate-bg)",
      border: "var(--severity-moderate-border)",
    },
    severe: {
      color: "var(--severity-severe-color)",
      bg: "var(--severity-severe-bg)",
      border: "var(--severity-severe-border)",
    },
    critical: {
      color: "var(--severity-critical-color)",
      bg: "var(--severity-critical-bg)",
      border: "var(--severity-critical-border)",
    },
  };
  return vars[s] || vars.moderate;
}

const STEP_COLORS = ["#800020", "#2d8a55", "#b07d20", "#2060a0", "#800020"];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1000;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [target, active]);

  return value;
}

export default function ResultDashboard({
  results,
  selectedSymptoms,
  isAnalyzing,
}: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showDb, setShowDb] = useState(false);
  const hasResults = results.length > 0 && !isAnalyzing;
  const confidenceDisplay = useCountUp(results[0]?.confidence ?? 0, hasResults);

  // Auto-scroll to results
  useEffect(() => {
    if (!hasResults) return;
    const timer = setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(timer);
  }, [hasResults]);

  if (isAnalyzing) {
    return (
      <section
        id="results"
        style={{
          padding: "60px 24px",
          background: "var(--section-bg)",
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
              border: "3px solid var(--spinner-border)",
              borderTopColor: "var(--spinner-top)",
              borderRightColor: "var(--accent-hover)",
              borderRadius: "50%",
              animation: "spinSlow 1s linear infinite",
              boxShadow: "var(--glow)",
            }}
          />
          <p
            style={{
              color: "var(--accent)",
              fontSize: "1.1rem",
              fontWeight: 600,
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
  const topSev = getSeverityStyle(top.severity);

  const downloadPlan = () => {
    const severityColor =
      top.severity.toLowerCase() === "mild"
        ? "#22c55e"
        : top.severity.toLowerCase() === "moderate"
          ? "#f59e0b"
          : "#ef4444";

    const symptomsHtml = selectedSymptoms
      .map(
        (s) =>
          `<span style="display:inline-block;background:#1a1400;color:#f5c518;border:1px solid #b8860b;border-radius:20px;padding:4px 12px;margin:3px;font-size:12px;">${s}</span>`,
      )
      .join("");

    const steps = [
      {
        num: "01",
        title: "Stay Calm & Assess",
        icon: "🧠",
        content: `Take a deep breath. Avoid self-diagnosis panic. Your symptoms suggest <strong>${top.name}</strong>.`,
      },
      {
        num: "02",
        title: "Recommended Diet",
        icon: "🥗",
        content:
          top.diet || "Follow a balanced, nutritious diet. Stay hydrated.",
      },
      {
        num: "03",
        title: "Precautions",
        icon: "🛡️",
        content:
          top.precautions ||
          "Rest well, avoid exertion, monitor your symptoms closely.",
      },
      {
        num: "04",
        title: "Medicines",
        icon: "💊",
        content: `${top.medicines || "Do not self-medicate. Consult a healthcare professional."}<br/><em style="color:#f59e0b;font-size:11px;">⚠ Consult a doctor before taking any medication.</em>`,
      },
      {
        num: "05",
        title: "When to See a Doctor",
        icon: "🏥",
        content:
          top.whenToSeeDoctor ||
          "Seek immediate medical care if symptoms worsen.",
      },
    ];

    const stepsHtml = steps
      .map(
        (step) => `
      <div style="display:flex;gap:16px;margin-bottom:20px;background:linear-gradient(135deg,#0d1535,#111827);border:1px solid #b8860b44;border-radius:12px;padding:20px;page-break-inside:avoid;box-shadow:0 4px 20px #00000044;">
        <div style="flex-shrink:0;width:48px;height:48px;background:linear-gradient(135deg,#cc0000,#b8860b);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 12px #cc000055;">
          ${step.icon}
        </div>
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <span style="color:#f5c518;font-size:11px;font-weight:700;letter-spacing:2px;">STEP ${step.num}</span>
            <span style="color:#ffffff;font-weight:700;font-size:15px;">${step.title}</span>
          </div>
          <p style="color:#d1d5db;font-size:13px;line-height:1.7;margin:0;">${step.content}</p>
        </div>
      </div>
    `,
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>MedAI Nexus — Action Plan</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #0a0f2e;
      background-image: linear-gradient(rgba(184,134,11,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,134,11,0.06) 1px, transparent 1px);
      background-size: 40px 40px;
      color: #ffffff;
      padding: 48px 44px;
      min-height: 100vh;
    }
    @media print { body { padding: 28px; } .no-print { display: none !important; } }
  </style>
</head>
<body>

  <!-- Print Button -->
  <div class="no-print" style="position:fixed;top:20px;right:20px;z-index:999;">
    <button onclick="window.print()" style="background:linear-gradient(135deg,#cc0000,#b8860b);color:white;border:none;padding:11px 22px;border-radius:8px;cursor:pointer;font-family:Poppins,sans-serif;font-weight:700;font-size:13px;box-shadow:0 0 20px #cc000066;letter-spacing:0.5px;">🖨 Print / Save PDF</button>
  </div>

  <!-- Top accent bar -->
  <div style="height:3px;background:linear-gradient(90deg,#cc0000,#f5c518,#b8860b);border-radius:2px;margin-bottom:36px;box-shadow:0 0 12px #f5c51844;"></div>

  <!-- Header -->
  <div style="text-align:center;margin-bottom:36px;padding-bottom:28px;border-bottom:1px solid #b8860b33;position:relative;">
    <div style="position:absolute;top:0;left:0;width:20px;height:20px;border-top:2px solid #b8860b;border-left:2px solid #b8860b;"></div>
    <div style="position:absolute;top:0;right:0;width:20px;height:20px;border-top:2px solid #b8860b;border-right:2px solid #b8860b;"></div>
    <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:14px;">
      <div style="width:52px;height:52px;background:linear-gradient(135deg,#cc0000,#b8860b);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 0 20px #cc000066,0 0 40px #b8860b44;">⚕</div>
      <span style="font-size:30px;font-weight:800;background:linear-gradient(90deg,#cc0000,#f5c518);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">MedAI Nexus</span>
    </div>
    <p style="color:#b8860b;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">AI-Powered Step-by-Step Action Plan</p>
    <p style="color:#4b5563;font-size:11px;margin-top:8px;">Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>

  <!-- Diagnosis Card -->
  <div style="background:linear-gradient(135deg,#1a0a00,#0d1535);border:2px solid #b8860b;border-radius:16px;padding:28px;margin-bottom:28px;box-shadow:0 0 30px #b8860b22,inset 0 0 20px #cc000011;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
      <div>
        <p style="color:#b8860b;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Primary Diagnosis</p>
        <h1 style="font-size:28px;font-weight:800;"><span style="background:linear-gradient(90deg,#cc0000,#f5c518);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${top.name}</span></h1>
      </div>
      <div style="text-align:right;">
        <div style="background:${severityColor}22;border:1px solid ${severityColor};border-radius:8px;padding:8px 18px;display:inline-block;margin-bottom:10px;">
          <p style="color:${severityColor};font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;">${top.severity} Severity</p>
        </div>
        <p style="color:#f5c518;font-size:26px;font-weight:800;">${top.confidence}% <span style="font-size:13px;color:#9ca3af;font-weight:400;">Confidence</span></p>
        <div style="height:6px;background:#1a1a2e;border-radius:3px;margin-top:8px;overflow:hidden;">
          <div style="height:100%;width:${top.confidence}%;background:linear-gradient(90deg,#cc0000,#f5c518);border-radius:3px;box-shadow:0 0 8px #f5c51866;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Symptoms -->
  <div style="margin-bottom:28px;">
    <p style="color:#b8860b;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin-bottom:12px;">Symptoms Analyzed (${selectedSymptoms.length})</p>
    <div style="line-height:2;">${symptomsHtml}</div>
  </div>

  <!-- Steps -->
  <div style="margin-bottom:28px;">
    <p style="color:#b8860b;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin-bottom:18px;">Step-by-Step Action Plan</p>
    ${stepsHtml}
  </div>

  <!-- Disclaimer -->
  <div style="background:#1a0808;border:1px solid #cc000055;border-radius:10px;padding:18px;text-align:center;box-shadow:0 0 15px #cc000022;margin-bottom:24px;">
    <p style="color:#ef4444;font-size:12px;font-weight:700;margin-bottom:6px;letter-spacing:1px;">⚠ MEDICAL DISCLAIMER</p>
    <p style="color:#9ca3af;font-size:11px;line-height:1.7;">This report is generated by an AI system for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making any health decisions.</p>
  </div>

  <!-- Footer -->
  <div style="text-align:center;padding-top:16px;border-top:1px solid #b8860b33;">
    <p style="color:#b8860b;font-size:10px;letter-spacing:1px;">MedAI Nexus &nbsp;|&nbsp; Designed by Deekshith Kumar &nbsp;|&nbsp; Developed by Advaith Sreejith</p>
  </div>

</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWin = window.open(url, "_blank", "width=900,height=700");
    if (!printWin) {
      // fallback if popup blocked
      const a = document.createElement("a");
      a.href = url;
      a.download = `MedAI-ActionPlan-${top.name.replace(/\s+/g, "-")}.html`;
      a.click();
    }
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  return (
    <section
      id="results"
      style={{ padding: "60px 24px", background: "var(--section-bg)" }}
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
          <p style={{ color: "var(--text-muted)" }}>
            Based on {selectedSymptoms.length} symptoms analyzed
          </p>
        </div>

        {/* Top Result Card — animated entrance */}
        <div
          data-ocid="results.card"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "var(--glow-soft)",
            animation: "fadeSlideUp 0.5s ease forwards",
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
                  color: "var(--text-muted)",
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
                  color: "var(--accent)",
                }}
              >
                {top.name}
              </h3>
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                background: topSev.bg,
                border: `1px solid ${topSev.border}`,
                color: topSev.color,
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "capitalize",
              }}
            >
              {top.severity}
            </div>
          </div>

          {/* Confidence bar with animated count-up */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
              }}
            >
              <span>Confidence Level</span>
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                {confidenceDisplay}%
              </span>
            </div>
            <div
              style={{
                height: "8px",
                background: "var(--accent-dim)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${top.confidence}%`,
                  background: "linear-gradient(90deg, #800020, #a00028)",
                  borderRadius: "4px",
                  boxShadow: "0 0 10px rgba(128,0,32,0.5)",
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
                color: "var(--severity-mild-color)",
              },
              {
                label: "Precautions",
                icon: "⚠️",
                content: top.precautions,
                color: "var(--severity-moderate-color)",
              },
              {
                label: "Medicines",
                icon: "💊",
                content: top.medicines,
                color: "var(--accent)",
              },
              {
                label: "When to See Doctor",
                icon: "🏥",
                content: top.whenToSeeDoctor,
                color: "var(--severity-severe-color)",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-color)",
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
                    color: "var(--text-secondary)",
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
              background: "var(--accent-dim)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--accent)",
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
                  color: STEP_COLORS[0],
                },
                {
                  step: 2,
                  title: "Follow Recommended Diet",
                  desc:
                    top.diet ||
                    "Follow a balanced, nutritious diet and stay well hydrated.",
                  color: STEP_COLORS[1],
                },
                {
                  step: 3,
                  title: "Take Precautions",
                  desc:
                    top.precautions ||
                    "Rest adequately, avoid physical exertion, monitor symptoms closely.",
                  color: STEP_COLORS[2],
                },
                {
                  step: 4,
                  title: "Consider Medicines (Doctor Advised)",
                  desc:
                    top.medicines ||
                    "Do not self-medicate. Consult a licensed healthcare professional.",
                  color: STEP_COLORS[3],
                },
                {
                  step: 5,
                  title: "When to See a Doctor",
                  desc:
                    top.whenToSeeDoctor ||
                    "If symptoms persist or worsen after 48 hours, seek immediate medical care.",
                  color: STEP_COLORS[4],
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
                      background: `${item.color}18`,
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
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
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
            className="btn-gradient"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "13px",
              fontSize: "0.95rem",
            }}
          >
            ⬇ Download Action Plan
          </button>

          <p
            style={{
              color: "var(--text-muted)",
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

        {/* Other possible conditions — staggered entrance */}
        {results.length > 1 && (
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-secondary)",
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
                const sev = getSeverityStyle(r.severity);
                const isExpanded = expandedIdx === i;
                return (
                  <div
                    key={r.name}
                    data-ocid={`results.item.${i + 2}`}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "all 0.3s",
                      animation: `fadeSlideUp 0.5s ease ${0.1 * (i + 1)}s both`,
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
                          color: "var(--text-primary)",
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
                        }}
                      >
                        {r.severity}
                      </span>
                      <span
                        style={{
                          color: "var(--accent)",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {r.confidence}%
                      </span>
                      <span
                        style={{
                          color: "var(--text-muted)",
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
                          background: "var(--accent-dim)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${r.confidence}%`,
                            background:
                              "linear-gradient(90deg, #800020, #a00028)",
                          }}
                        />
                      </div>
                    </div>

                    {isExpanded && (
                      <div
                        style={{
                          padding: "16px 20px",
                          borderTop: "1px solid var(--border-color)",
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "12px",
                          animation: "fadeSlideUp 0.3s ease forwards",
                        }}
                      >
                        {[
                          {
                            label: "Diet",
                            content: r.diet,
                            color: "var(--severity-mild-color)",
                          },
                          {
                            label: "Precautions",
                            content: r.precautions,
                            color: "var(--severity-moderate-color)",
                          },
                          {
                            label: "Medicines",
                            content: r.medicines,
                            color: "var(--accent)",
                          },
                          {
                            label: "See Doctor If",
                            content: r.whenToSeeDoctor,
                            color: "var(--severity-severe-color)",
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
                                marginBottom: "4px",
                              }}
                            >
                              {detail.label}
                            </div>
                            <p
                              style={{
                                fontSize: "0.82rem",
                                color: "var(--text-secondary)",
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
              background: "var(--accent-dim)",
              border: "1px solid var(--border-color)",
              borderRadius: "999px",
              padding: "10px 28px",
              color: "var(--accent)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(128,0,32,0.2)";
              e.currentTarget.style.boxShadow = "var(--glow-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent-dim)";
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
