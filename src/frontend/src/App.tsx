import { useState } from "react";
import AboutSection from "./components/AboutSection";
import ActivationScreen from "./components/ActivationScreen";
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

  const handleActivate = (key: string) => {
    setApiKey(key);
    setActivated(true);
  };

  const handleAnalyze = async (symptoms: string[]) => {
    setSelectedSymptoms(symptoms);
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
        body: JSON.stringify({ symptoms }),
        signal: AbortSignal.timeout(3000),
      });
    } catch {
      // Use local results
    }

    setAnalysisResults(ranked);
    setIsAnalyzing(false);
  };

  if (!activated) {
    return <ActivationScreen onActivate={handleActivate} />;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <ParticleBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <SymptomPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        <ResultDashboard
          results={analysisResults}
          isAnalyzing={isAnalyzing}
          selectedSymptoms={selectedSymptoms}
        />
        <AboutSection />
        <Footer />
      </div>
    </div>
  );
}
