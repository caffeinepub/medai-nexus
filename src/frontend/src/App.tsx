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
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleToggleTheme = () => setIsDark((prev) => !prev);

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
    setTimeout(() => setShowFeedback(true), 1200);
  };

  if (!activated) {
    return (
      <div data-theme={isDark ? "dark" : "light"}>
        <ActivationScreen onActivate={handleActivate} />
      </div>
    );
  }

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <ParticleBackground isDark={isDark} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar isDark={isDark} onToggle={handleToggleTheme} />
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
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </div>
  );
}
