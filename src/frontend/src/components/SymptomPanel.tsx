import { useMemo, useState } from "react";
import { SYMPTOMS, SYMPTOM_CATEGORIES } from "../data/symptoms";

interface Props {
  onAnalyze: (symptoms: string[]) => void;
  isAnalyzing: boolean;
}

const CATEGORY_COLORS = {
  general: {
    bg: "rgba(102,126,234,0.2)",
    border: "rgba(102,126,234,0.5)",
    text: "#a5b4fc",
  },
  critical: {
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.4)",
    text: "#fca5a5",
  },
  rare: {
    bg: "rgba(118,75,162,0.2)",
    border: "rgba(167,139,250,0.5)",
    text: "#c4b5fd",
  },
};

export default function SymptomPanel({ onAnalyze, isAnalyzing }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "general" | "critical" | "rare"
  >("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const allSymptoms = useMemo(() => {
    if (activeCategory === "all")
      return [...SYMPTOMS.general, ...SYMPTOMS.critical, ...SYMPTOMS.rare];
    return SYMPTOMS[activeCategory];
  }, [activeCategory]);

  const filtered = useMemo(() => {
    if (!search) return allSymptoms;
    return allSymptoms.filter((s) =>
      s.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, allSymptoms]);

  const autocompleteItems = useMemo(() => {
    if (!search || search.length < 2) return [];
    const all = [...SYMPTOMS.general, ...SYMPTOMS.critical, ...SYMPTOMS.rare];
    return all
      .filter((s) => s.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 8);
  }, [search]);

  const toggleSymptom = (s: string) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const totalAll =
    SYMPTOMS.general.length + SYMPTOMS.critical.length + SYMPTOMS.rare.length;

  const CATEGORY_LABELS: Record<string, string> = {
    all: "All",
    general: "General",
    critical: "Critical",
    rare: "Rare",
  };

  return (
    <section id="symptoms" style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            <span className="gradient-text">Symptom Selection</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>
            Select all symptoms you are experiencing for AI analysis
          </p>
        </div>

        <div className="glass-card" style={{ padding: "32px" }}>
          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {(["all", "general", "critical", "rare"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`symptoms.${cat}.tab`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  background:
                    activeCategory === cat
                      ? "linear-gradient(135deg, #667eea, #764ba2)"
                      : "rgba(255,255,255,0.1)",
                  color: "white",
                  transition: "all 0.2s",
                  boxShadow:
                    activeCategory === cat
                      ? "0 0 15px rgba(102,126,234,0.5)"
                      : "none",
                }}
              >
                {CATEGORY_LABELS[cat]}
                <span
                  style={{
                    marginLeft: "6px",
                    opacity: 0.7,
                    fontSize: "0.75rem",
                  }}
                >
                  ({cat === "all" ? totalAll : SYMPTOMS[cat].length})
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Search"
                >
                  <title>Search</title>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
              <input
                data-ocid="symptoms.search_input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowAutocomplete(true);
                }}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                placeholder="Search symptoms..."
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "0.95rem",
                  fontFamily: "Poppins, sans-serif",
                  outline: "none",
                  transition: "all 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(167,139,250,0.7)";
                  e.target.style.boxShadow = "0 0 15px rgba(102,126,234,0.3)";
                }}
              />
            </div>
            {showAutocomplete && autocompleteItems.length > 0 && (
              <div
                className="glass-card"
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  right: 0,
                  zIndex: 50,
                  maxHeight: "200px",
                  overflowY: "auto",
                  animation: "slideDown 0.2s ease",
                }}
              >
                {autocompleteItems.map((item) => (
                  <div
                    key={item}
                    onMouseDown={() => {
                      toggleSymptom(item);
                      setSearch("");
                      setShowAutocomplete(false);
                    }}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background:
                          CATEGORY_COLORS[SYMPTOM_CATEGORIES[item]]?.bg ||
                          "rgba(255,255,255,0.1)",
                        color:
                          CATEGORY_COLORS[SYMPTOM_CATEGORIES[item]]?.text ||
                          "white",
                        border: `1px solid ${
                          CATEGORY_COLORS[SYMPTOM_CATEGORIES[item]]?.border ||
                          "rgba(255,255,255,0.2)"
                        }`,
                      }}
                    >
                      {SYMPTOM_CATEGORIES[item]}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Symptom Grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              maxHeight: "340px",
              overflowY: "auto",
              padding: "4px 0",
            }}
          >
            {filtered.map((symptom) => {
              const cat = SYMPTOM_CATEGORIES[symptom] || "general";
              const colors = CATEGORY_COLORS[cat];
              const isSelected = selected.includes(symptom);
              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    background: isSelected
                      ? "linear-gradient(135deg, #667eea, #764ba2)"
                      : colors.bg,
                    border: `1px solid ${
                      isSelected ? "rgba(167,139,250,0.8)" : colors.border
                    }`,
                    color: isSelected ? "white" : colors.text,
                    transition: "all 0.2s",
                    boxShadow: isSelected
                      ? "0 0 12px rgba(102,126,234,0.5)"
                      : "none",
                    transform: isSelected ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  {symptom}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
                padding: "24px",
              }}
            >
              No symptoms found for &quot;{search}&quot;
            </p>
          )}
        </div>

        {/* Selected Symptoms Bar */}
        {selected.length > 0 && (
          <div
            className="glass-card"
            style={{ marginTop: "20px", padding: "20px 24px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span style={{ fontWeight: 600 }}>
                Selected:{" "}
                <span style={{ color: "var(--accent-light)" }}>
                  {selected.length} symptoms
                </span>
              </span>
              <button
                type="button"
                data-ocid="symptoms.delete_button"
                onClick={() => setSelected([])}
                style={{
                  background: "rgba(239,68,68,0.2)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  color: "#fca5a5",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.82rem",
                }}
              >
                Clear All
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {selected.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))",
                    border: "1px solid rgba(167,139,250,0.5)",
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => toggleSymptom(s)}
                    style={{
                      cursor: "pointer",
                      opacity: 0.7,
                      fontSize: "0.9rem",
                      background: "none",
                      border: "none",
                      color: "white",
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            type="button"
            data-ocid="symptoms.submit_button"
            onClick={() => onAnalyze(selected)}
            disabled={selected.length === 0 || isAnalyzing}
            className="btn-gradient"
            style={{
              padding: "16px 48px",
              fontSize: "1.05rem",
              borderRadius: "14px",
              minWidth: "200px",
            }}
          >
            {isAnalyzing
              ? "Analyzing..."
              : `Analyze ${selected.length > 0 ? `(${selected.length})` : ""} Symptoms`}
          </button>
        </div>
      </div>
    </section>
  );
}
