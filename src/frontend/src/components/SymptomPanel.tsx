import { useMemo, useState } from "react";
import { SYMPTOMS, SYMPTOM_CATEGORIES } from "../data/symptoms";

interface Props {
  onAnalyze: (symptoms: string[]) => void;
  isAnalyzing: boolean;
}

const CATEGORY_COLORS = {
  general: {
    bg: "rgba(0,128,255,0.12)",
    border: "rgba(0,128,255,0.4)",
    text: "#60b3ff",
  },
  critical: {
    bg: "rgba(255,0,255,0.10)",
    border: "rgba(255,0,255,0.4)",
    text: "#ff80ff",
  },
  rare: {
    bg: "rgba(191,0,255,0.10)",
    border: "rgba(191,0,255,0.4)",
    text: "#d966ff",
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

  const CATEGORY_TAB_COLORS: Record<
    string,
    { active: string; inactive: string }
  > = {
    all: { active: "#00f5ff", inactive: "rgba(0,245,255,0.4)" },
    general: { active: "#60b3ff", inactive: "rgba(96,179,255,0.4)" },
    critical: { active: "#ff80ff", inactive: "rgba(255,128,255,0.4)" },
    rare: { active: "#d966ff", inactive: "rgba(217,102,255,0.4)" },
  };

  return (
    <section
      id="symptoms"
      style={{ padding: "60px 24px", background: "#030712" }}
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
            <span className="gradient-text">Symptom Selection</span>
          </h2>
          <p style={{ color: "rgba(224,247,255,0.6)" }}>
            Select all symptoms you are experiencing for AI analysis
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "32px",
            background: "rgba(0,245,255,0.03)",
            border: "1px solid rgba(0,245,255,0.15)",
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {(["all", "general", "critical", "rare"] as const).map((cat) => {
              const isActive = activeCategory === cat;
              const colors = CATEGORY_TAB_COLORS[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  data-ocid={`symptoms.${cat}.tab`}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    transition: "all 0.25s",
                    background: isActive
                      ? `linear-gradient(135deg, ${colors.active}33, ${colors.active}22)`
                      : "transparent",
                    border: `1px solid ${isActive ? colors.active : "rgba(0,245,255,0.15)"}`,
                    color: isActive ? colors.active : "rgba(224,247,255,0.5)",
                    boxShadow: isActive
                      ? `0 0 12px ${colors.active}44`
                      : "none",
                    textShadow: isActive
                      ? `0 0 8px ${colors.active}88`
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
              );
            })}
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
                  stroke="rgba(0,245,255,0.5)"
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
                placeholder="Search symptoms..."
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: "10px",
                  background: "rgba(0,245,255,0.05)",
                  border: "1px solid rgba(0,245,255,0.2)",
                  color: "#e0f7ff",
                  fontSize: "0.95rem",
                  fontFamily: "Poppins, sans-serif",
                  outline: "none",
                  transition: "all 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(0,245,255,0.6)";
                  e.target.style.boxShadow = "0 0 15px rgba(0,245,255,0.2)";
                }}
                onBlur={(e) => {
                  setTimeout(() => setShowAutocomplete(false), 200);
                  e.target.style.borderColor = "rgba(0,245,255,0.2)";
                  e.target.style.boxShadow = "none";
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
                  background: "rgba(3,7,18,0.97)",
                  border: "1px solid rgba(0,245,255,0.2)",
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
                      borderBottom: "1px solid rgba(0,245,255,0.06)",
                      transition: "background 0.2s",
                      color: "#e0f7ff",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(0,245,255,0.08)";
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
                          "rgba(0,245,255,0.08)",
                        color:
                          CATEGORY_COLORS[SYMPTOM_CATEGORIES[item]]?.text ||
                          "#00f5ff",
                        border: `1px solid ${
                          CATEGORY_COLORS[SYMPTOM_CATEGORIES[item]]?.border ||
                          "rgba(0,245,255,0.2)"
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
              const isCritical = cat === "critical";
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
                      ? isCritical
                        ? "linear-gradient(135deg, rgba(255,0,255,0.3), rgba(191,0,255,0.3))"
                        : "linear-gradient(135deg, rgba(0,128,255,0.35), rgba(191,0,255,0.35))"
                      : colors.bg,
                    border: `1px solid ${
                      isSelected
                        ? isCritical
                          ? "rgba(255,0,255,0.8)"
                          : "rgba(0,245,255,0.7)"
                        : colors.border
                    }`,
                    color: isSelected
                      ? isCritical
                        ? "#ff80ff"
                        : "#00f5ff"
                      : colors.text,
                    transition: "all 0.2s",
                    boxShadow: isSelected
                      ? isCritical
                        ? "0 0 12px rgba(255,0,255,0.5)"
                        : "0 0 12px rgba(0,245,255,0.4)"
                      : "none",
                    textShadow: isSelected
                      ? isCritical
                        ? "0 0 6px rgba(255,0,255,0.6)"
                        : "0 0 6px rgba(0,245,255,0.5)"
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
                color: "rgba(224,247,255,0.4)",
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
            style={{
              marginTop: "20px",
              padding: "20px 24px",
              background: "rgba(0,245,255,0.03)",
              border: "1px solid rgba(0,245,255,0.15)",
            }}
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
              <span style={{ fontWeight: 600, color: "#e0f7ff" }}>
                Selected:{" "}
                <span
                  style={{
                    color: "#00f5ff",
                    textShadow: "0 0 8px rgba(0,245,255,0.6)",
                  }}
                >
                  {selected.length} symptoms
                </span>
              </span>
              <button
                type="button"
                data-ocid="symptoms.delete_button"
                onClick={() => setSelected([])}
                style={{
                  background: "rgba(255,0,255,0.1)",
                  border: "1px solid rgba(255,0,255,0.35)",
                  color: "#ff80ff",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontFamily: "Poppins, sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,0,255,0.2)";
                  e.currentTarget.style.boxShadow =
                    "0 0 12px rgba(255,0,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,0,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Clear All
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {selected.map((s) => {
                const cat = SYMPTOM_CATEGORIES[s] || "general";
                const isCritical = cat === "critical";
                return (
                  <span
                    key={s}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      background: isCritical
                        ? "rgba(255,0,255,0.15)"
                        : "rgba(0,245,255,0.1)",
                      border: `1px solid ${isCritical ? "rgba(255,0,255,0.5)" : "rgba(0,245,255,0.4)"}`,
                      color: isCritical ? "#ff80ff" : "#00f5ff",
                      textShadow: `0 0 6px ${isCritical ? "rgba(255,0,255,0.5)" : "rgba(0,245,255,0.4)"}`,
                    }}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              data-ocid="symptoms.submit_button"
              disabled={isAnalyzing || selected.length === 0}
              onClick={() => onAnalyze(selected)}
              className="btn-gradient"
              style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
            >
              {isAnalyzing ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(0,245,255,0.3)",
                      borderTopColor: "#00f5ff",
                      borderRadius: "50%",
                      animation: "spinSlow 0.8s linear infinite",
                      display: "inline-block",
                      boxShadow: "0 0 8px rgba(0,245,255,0.5)",
                    }}
                  />
                  Analyzing...
                </span>
              ) : (
                `Analyze ${selected.length} Symptom${selected.length !== 1 ? "s" : ""}`
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
