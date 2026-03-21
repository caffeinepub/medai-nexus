import { useEffect, useState } from "react";
import type { MatchResult } from "../utils/matchDisease";

interface Props {
  results: MatchResult[];
  aiResponse: string | null;
  isLoading: boolean;
}

const severityColors: Record<string, string> = {
  low: "#A78BFA",
  medium: "#facc15",
  high: "#f97316",
  critical: "#ef4444",
};

function getDoctorVisitAdvice(severity: string): string {
  switch (severity) {
    case "low":
      return "If symptoms persist beyond 7 days or worsen, visit a general physician.";
    case "medium":
      return "Visit a doctor within 2–3 days if there is no improvement or symptoms worsen.";
    case "high":
      return "Consult a doctor within 24–48 hours. Do not delay.";
    case "critical":
      return "Seek emergency medical care immediately.";
    default:
      return "Consult a licensed medical professional as soon as possible.";
  }
}

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  );
}

export default function ResultDashboard({
  results,
  aiResponse,
  isLoading,
}: Props) {
  if (!isLoading && results.length === 0) return null;

  const barKeys = ["b1", "b2", "b3", "b4", "b5", "b6"];

  return (
    <section className="result-section" id="results">
      <div className="section-header">
        <h2 className="section-title">AI DIAGNOSTIC RESULTS</h2>
        <div className="section-line" />
      </div>

      {isLoading ? (
        <div className="loading-panel">
          <div className="loading-scan-bars">
            {barKeys.map((k, i) => (
              <div
                key={k}
                className="loading-bar"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="loading-text">INITIALIZING AI ANALYSIS...</p>
          <p className="loading-sub">Processing neural pattern recognition</p>
        </div>
      ) : (
        <div className="results-grid">
          <div className="glass-card card-cyan result-top">
            <div className="result-badge">PRIMARY DIAGNOSIS</div>
            <h3 className="result-disease-name">{results[0].disease.name}</h3>
            <div className="result-confidence-big">
              <span style={{ color: "#A78BFA" }}>{results[0].confidence}%</span>
              <span className="result-confidence-label">MATCH</span>
            </div>
            <span
              className="severity-badge"
              style={{
                background: `${severityColors[results[0].disease.severity]}22`,
                color: severityColors[results[0].disease.severity],
                borderColor: severityColors[results[0].disease.severity],
              }}
            >
              {results[0].disease.severity.toUpperCase()}
            </span>
            <p className="result-desc">{results[0].disease.description}</p>
            <div className="matched-symptoms">
              <p className="matched-label">MATCHED SYMPTOMS</p>
              <div className="matched-tags">
                {results[0].matchedSymptoms.map((s) => (
                  <span key={s} className="matched-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="care-panels-grid">
              <div className="care-panel care-panel--diet">
                <div className="care-panel-header">
                  <span className="care-panel-icon">🥗</span>
                  <span className="care-panel-title">RECOMMENDED DIET</span>
                </div>
                <p className="care-panel-content">{results[0].disease.diet}</p>
              </div>
              <div className="care-panel care-panel--doctor">
                <div className="care-panel-header">
                  <span className="care-panel-icon">🏥</span>
                  <span className="care-panel-title">WHEN TO SEE A DOCTOR</span>
                </div>
                <p className="care-panel-content">
                  {getDoctorVisitAdvice(results[0].disease.severity)}
                </p>
              </div>
              <div className="care-panel care-panel--medicine">
                <div className="care-panel-header">
                  <span className="care-panel-icon">💊</span>
                  <span className="care-panel-title">COMMON MEDICINES</span>
                </div>
                <p className="care-panel-content">
                  {results[0].disease.medicines}
                </p>
              </div>
            </div>

            <div className="care-disclaimer">
              ⚠️ This is for informational purposes only. Always consult a
              licensed medical professional before taking any medication.
            </div>
          </div>

          <div className="results-list-col">
            {results.map((r, i) => (
              <div key={r.disease.id} className="glass-card result-card">
                <div className="result-rank">{`#${i + 1}`}</div>
                <div className="result-info">
                  <h4 className="result-name">{r.disease.name}</h4>
                  <div className="confidence-bar-container">
                    <div
                      className="confidence-bar-fill"
                      style={{
                        width: `${r.confidence}%`,
                        background: i === 0 ? "#8B5CF6" : "#6D28D9",
                      }}
                    />
                  </div>
                </div>
                <span
                  className="severity-badge small"
                  style={{
                    color: severityColors[r.disease.severity],
                    borderColor: severityColors[r.disease.severity],
                  }}
                >{`${r.confidence}%`}</span>
              </div>
            ))}

            {aiResponse && (
              <div className="glass-card ai-response-card">
                <div className="ai-badge">🤖 AI ANALYSIS</div>
                <p className="ai-response-text">
                  <TypingText text={aiResponse} />
                </p>
              </div>
            )}
            {!aiResponse && (
              <div className="glass-card ai-response-card">
                <div className="ai-badge">🤖 LOCAL ANALYSIS</div>
                <p className="ai-response-text">
                  <TypingText
                    text={`Based on your symptoms, the system identified ${results.length} possible conditions. Highest match: ${results[0].disease.name} at ${results[0].confidence}% confidence. Precaution: ${results[0].disease.precautions} This is for informational purposes only — please consult a qualified medical professional for a proper diagnosis.`}
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
