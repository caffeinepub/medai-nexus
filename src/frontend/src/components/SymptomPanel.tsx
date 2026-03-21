import { useMemo, useState } from "react";
import type { Symptom } from "../data/symptoms";

interface Props {
  symptoms: Symptom[];
  selectedSymptoms: string[];
  onSelect: (name: string) => void;
  onRemove: (name: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  apiKeyActive: boolean;
  onChangeKey: () => void;
}

type Category = "all" | "general" | "critical" | "rare";

export default function SymptomPanel({
  symptoms,
  selectedSymptoms,
  onSelect,
  onRemove,
  onAnalyze,
  isAnalyzing,
  apiKeyActive,
  onChangeKey,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = useMemo(() => {
    return symptoms.filter((s) => {
      const matchCat = category === "all" || s.category === category;
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch && !selectedSymptoms.includes(s.name);
    });
  }, [symptoms, category, search, selectedSymptoms]);

  const autocomplete = useMemo(() => {
    if (!search.trim()) return [];
    return symptoms
      .filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) &&
          !selectedSymptoms.includes(s.name),
      )
      .slice(0, 8);
  }, [symptoms, search, selectedSymptoms]);

  const categoryColors: Record<Category, string> = {
    all: "#19D7FF",
    general: "#22C8FF",
    critical: "#f97316",
    rare: "#A855F7",
  };

  return (
    <section className="symptom-section" id="scan">
      <div className="section-header">
        <h2 className="section-title">DIAGNOSTIC CONSOLE</h2>
        <div className="section-line" />
      </div>
      <div className="symptom-grid">
        {/* API Status Card */}
        <div className="glass-card card-cyan">
          <div className="card-number">01</div>
          <h3 className="card-title">API STATUS</h3>
          <div className="api-status-display">
            <div
              className={`api-status-dot ${apiKeyActive ? "active" : "inactive"}`}
            />
            <span className={apiKeyActive ? "text-green" : "text-muted"}>
              {apiKeyActive ? "KEY ACTIVE — READY" : "NO KEY"}
            </span>
          </div>
          <p className="api-status-desc">
            {apiKeyActive
              ? "AI analysis enabled via OpenAI API. Local pattern matching also active."
              : "Local pattern matching active. Add API key for AI-enhanced analysis."}
          </p>
          <button type="button" className="btn-secondary" onClick={onChangeKey}>
            {apiKeyActive ? "CHANGE API KEY" : "ACTIVATE API KEY"}
          </button>
          <div className="api-scan-visual">
            <div className="scan-bar" />
            <div className="scan-bar" style={{ animationDelay: "0.4s" }} />
            <div className="scan-bar" style={{ animationDelay: "0.8s" }} />
          </div>
        </div>

        {/* Symptom Input Card */}
        <div className="glass-card card-purple">
          <div className="card-number">02</div>
          <h3 className="card-title">SYMPTOM ANALYSIS</h3>

          {/* Search */}
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search symptoms..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && autocomplete.length > 0 && (
              <div className="autocomplete-dropdown">
                {autocomplete.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    className="autocomplete-item"
                    onMouseDown={() => {
                      onSelect(s.name);
                      setSearch("");
                    }}
                  >
                    <span className={`cat-badge cat-${s.category}`}>
                      {s.category}
                    </span>
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="category-pills">
            {(["all", "general", "critical", "rare"] as Category[]).map(
              (cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`cat-pill${category === cat ? " active" : ""}`}
                  style={
                    category === cat
                      ? {
                          borderColor: categoryColors[cat],
                          color: categoryColors[cat],
                        }
                      : {}
                  }
                  onClick={() => setCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ),
            )}
          </div>

          {/* Symptom chips */}
          <div className="symptom-chips-container">
            {filtered.slice(0, 24).map((s) => (
              <button
                type="button"
                key={s.id}
                className={`symptom-chip chip-${s.category}`}
                onClick={() => onSelect(s.name)}
              >
                + {s.name}
              </button>
            ))}
            {filtered.length > 24 && (
              <span className="chips-more">{`+${filtered.length - 24} more — use search`}</span>
            )}
          </div>

          {/* Selected symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="selected-symptoms">
              <p className="selected-label">{`SELECTED SYMPTOMS (${selectedSymptoms.length})`}</p>
              <div className="selected-tags">
                {selectedSymptoms.map((s) => (
                  <span key={s} className="selected-tag">
                    {s}
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={() => onRemove(s)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="btn-analyze"
            onClick={onAnalyze}
            disabled={selectedSymptoms.length === 0 || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="spinner" /> ANALYZING...
              </>
            ) : (
              "BEGIN AI ANALYSIS"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
