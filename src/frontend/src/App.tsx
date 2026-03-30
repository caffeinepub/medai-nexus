import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import ActivationScreen from "./components/ActivationScreen";
import FeedbackModal from "./components/FeedbackModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import ResultDashboard from "./components/ResultDashboard";
import SymptomPanel from "./components/SymptomPanel";
import Hero from "./components/medai/Hero";
import "./index.css";

interface AnalysisResult {
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

export default function App() {
  const [apiKey, setApiKey] = useState<string>("");
  const [activated, setActivated] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [userAge, setUserAge] = useState<number>(0);
  const [userGender, setUserGender] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [reviewHover, setReviewHover] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const handleActivate = (key: string) => {
    setApiKey(key);
    setActivated(true);
  };

  const handleAnalyze = async (
    symptoms: string[],
    age: number,
    gender: string,
  ) => {
    setSelectedSymptoms(symptoms);
    setUserAge(age);
    setUserGender(gender);
    setIsAnalyzing(true);
    setAnalysisResults([]);
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    await new Promise((r) => setTimeout(r, 2200));

    const { DISEASES } = await import("./data/diseases");
    const ranked = DISEASES.map((disease) => {
      const matches = disease.symptoms.filter((s) =>
        symptoms.some(
          (sel) =>
            sel.toLowerCase().includes(s.toLowerCase()) ||
            s.toLowerCase().includes(sel.toLowerCase()),
        ),
      );
      const confidence = Math.round(
        (matches.length / disease.symptoms.length) * 100,
      );
      return { ...disease, matches: matches.length, confidence };
    })
      .filter((d) => d.confidence > 0)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);

    try {
      await fetch("https://api.example.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ symptoms, age, gender }),
        signal: AbortSignal.timeout(3000),
      });
    } catch {
      // Use local results
    }

    setAnalysisResults(ranked);
    setIsAnalyzing(false);
    // No auto-popup — user clicks the floating button to leave a review
  };

  if (!activated) {
    return (
      <div data-theme="light">
        <ActivationScreen onActivate={handleActivate} />
      </div>
    );
  }

  const reviewBtnTransform = reviewHover
    ? "translateY(-50%) translateX(-4px)"
    : "translateY(-50%) translateX(0)";

  return (
    <div
      data-theme="light"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <ParticleBackground isDark={false} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <SymptomPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        <ResultDashboard
          results={analysisResults}
          isAnalyzing={isAnalyzing}
          selectedSymptoms={selectedSymptoms}
          age={userAge}
          gender={userGender}
        />
        <AboutSection />
        <Footer />
      </div>

      {/* Floating Give Review Button */}
      <button
        type="button"
        onClick={() => setShowFeedback(true)}
        onMouseEnter={() => setReviewHover(true)}
        onMouseLeave={() => setReviewHover(false)}
        aria-label="Give us a review"
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: reviewBtnTransform,
          zIndex: 99990,
          background: reviewHover
            ? "linear-gradient(135deg, #8387C3, #4E7AB1)"
            : "linear-gradient(135deg, #4E7AB1, #506980)",
          color: "#fff",
          border: "none",
          borderRadius: "12px 0 0 12px",
          padding: "14px 10px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          boxShadow: reviewHover
            ? "-4px 0 24px rgba(131,135,195,0.5), -2px 0 8px rgba(0,0,0,0.2)"
            : "-2px 0 12px rgba(78,122,177,0.35)",
          transition: "all 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
          fontFamily: "Poppins, sans-serif",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
        }}
      >
        <svg
          role="img"
          aria-label="Review icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, rotate: "90deg" }}
        >
          <title>Review icon</title>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Review</span>
      </button>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        disease={analysisResults[0]?.name ?? ""}
        age={userAge}
        gender={userGender}
      />
    </div>
  );
}
