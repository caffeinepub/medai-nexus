import { useState } from "react";
import AboutSection from "./components/AboutSection";
import ActivationScreen from "./components/ActivationScreen";
import HUDOverlay from "./components/HUDOverlay";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ParticleCanvas from "./components/ParticleCanvas";
import ResultDashboard from "./components/ResultDashboard";
import SymptomPanel from "./components/SymptomPanel";
import { diseases } from "./data/diseases";
import { symptoms as SYMPTOMS } from "./data/symptoms";
import { analyzeWithAI } from "./utils/apiCall";
import { matchDiseases } from "./utils/matchDisease";
import type { MatchResult } from "./utils/matchDisease";

export default function App() {
  const [activated, setActivated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyActive, setApiKeyActive] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showActivation, setShowActivation] = useState(false);

  const handleActivate = (key: string) => {
    setApiKey(key);
    const looksLikeOpenAI = key.startsWith("sk-") && key.length > 20;
    setApiKeyActive(looksLikeOpenAI);
    setActivated(true);
    setShowActivation(false);
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    setAiResponse(null);
    const matched = matchDiseases(selectedSymptoms, diseases);
    setResults(matched);
    if (apiKeyActive && matched.length > 0) {
      try {
        const resp = await analyzeWithAI(selectedSymptoms, apiKey);
        setAiResponse(resp);
      } catch {
        setAiResponse(null);
      }
    }
    setIsAnalyzing(false);
    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!activated) {
    return <ActivationScreen onActivate={handleActivate} />;
  }

  return (
    <div className={`app-root${theme === "light" ? " theme-light" : ""}`}>
      <ParticleCanvas />
      <HUDOverlay />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        isActivated={activated}
      />
      <main className="main-content">
        <Hero />
        <SymptomPanel
          symptoms={SYMPTOMS}
          selectedSymptoms={selectedSymptoms}
          onSelect={(s) => setSelectedSymptoms((p) => [...p, s])}
          onRemove={(s) => setSelectedSymptoms((p) => p.filter((x) => x !== s))}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          apiKeyActive={apiKeyActive}
          onChangeKey={() => {
            setShowActivation(true);
            setActivated(false);
          }}
        />
        <ResultDashboard
          results={results}
          aiResponse={aiResponse}
          isLoading={isAnalyzing}
        />
        <AboutSection />
      </main>
      {showActivation && <ActivationScreen onActivate={handleActivate} />}
    </div>
  );
}
