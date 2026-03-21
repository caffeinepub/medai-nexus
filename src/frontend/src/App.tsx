import { useState } from "react";
import ActivationScreen from "./components/ActivationScreen";
import DiseaseDatabase from "./components/DiseaseDatabase";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ParticleCanvas from "./components/ParticleCanvas";
import ResultDashboard from "./components/ResultDashboard";
import SymptomPanel from "./components/SymptomPanel";
import { diseases } from "./data/diseases";
import { symptoms } from "./data/symptoms";
import { analyzeWithAI } from "./utils/apiCall";
import { type MatchResult, matchDiseases } from "./utils/matchDisease";

type Theme = "dark" | "light";

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const handleActivate = (key: string) => {
    setApiKey(key);
    setIsActivated(true);
    setShowActivation(false);
  };

  const handleSelectSymptom = (name: string) => {
    if (!selectedSymptoms.includes(name)) {
      setSelectedSymptoms((prev) => [...prev, name]);
    }
  };

  const handleRemoveSymptom = (name: string) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== name));
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    setResults([]);
    setAiResponse(null);

    // Scroll to results
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Run local matching
    const matched = matchDiseases(selectedSymptoms, diseases);

    // Try AI if key is set
    let ai: string | null = null;
    if (apiKey) {
      ai = await analyzeWithAI(selectedSymptoms, apiKey);
    }

    setResults(matched);
    setAiResponse(ai);
    setIsAnalyzing(false);
  };

  if (!isActivated) {
    return (
      <div className={`app-root theme-${theme}`}>
        <ParticleCanvas />
        <ActivationScreen onActivate={handleActivate} />
      </div>
    );
  }

  return (
    <div className={`app-root theme-${theme}`}>
      <ParticleCanvas />
      {showActivation && <ActivationScreen onActivate={handleActivate} />}
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        isActivated={isActivated}
      />
      <main className="main-content">
        <Hero />
        <SymptomPanel
          symptoms={symptoms}
          selectedSymptoms={selectedSymptoms}
          onSelect={handleSelectSymptom}
          onRemove={handleRemoveSymptom}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          apiKeyActive={!!apiKey}
          onChangeKey={() => setShowActivation(true)}
        />
        <ResultDashboard
          results={results}
          aiResponse={aiResponse}
          isLoading={isAnalyzing}
        />
        <DiseaseDatabase diseases={diseases} />
      </main>
      <footer className="app-footer">
        <span className="footer-brand">MEDAI NEXUS © 2026</span>
        <span className="footer-status">● SYSTEM ONLINE</span>
        <span className="footer-disclaimer">
          For informational purposes only. Consult a medical professional.
        </span>
      </footer>
    </div>
  );
}
