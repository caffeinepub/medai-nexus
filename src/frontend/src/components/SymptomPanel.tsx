import { useMemo, useState } from "react";
import { SYMPTOMS, SYMPTOM_CATEGORIES, SYMPTOM_PACKS } from "../data/symptoms";

interface Props {
  onAnalyze: (symptoms: string[], age: number, gender: string) => void;
  isAnalyzing: boolean;
}

export default function SymptomPanel({ onAnalyze, isAnalyzing }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "general" | "critical" | "rare"
  >("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [justSelected, setJustSelected] = useState<Set<string>>(new Set());

  // New fields
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [attempted, setAttempted] = useState(false);

  const ageNum = Number.parseInt(age, 10);
  const ageValid =
    age !== "" && !Number.isNaN(ageNum) && ageNum >= 1 && ageNum <= 120;
  const genderValid = gender !== "";
  const canSubmit =
    ageValid && genderValid && selected.length > 0 && !isAnalyzing;

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
    setSelected((prev) => {
      if (prev.includes(s)) return prev.filter((x) => x !== s);
      setJustSelected((js) => {
        const next = new Set(js);
        next.add(s);
        setTimeout(
          () =>
            setJustSelected((cur) => {
              const n2 = new Set(cur);
              n2.delete(s);
              return n2;
            }),
          400,
        );
        return next;
      });
      return [...prev, s];
    });
  };

  const addPack = (packSymptoms: string[]) => {
    setSelected((prev) => {
      const added: string[] = [];
      for (const s of packSymptoms) {
        if (!prev.includes(s)) added.push(s);
      }
      if (added.length > 0) {
        setJustSelected((js) => {
          const next = new Set(js);
          for (const s of added) {
            next.add(s);
            setTimeout(
              () =>
                setJustSelected((cur) => {
                  const n2 = new Set(cur);
                  n2.delete(s);
                  return n2;
                }),
              400,
            );
          }
          return next;
        });
      }
      return [...prev, ...added];
    });
  };

  const severityCounts = useMemo(() => {
    let general = 0;
    let critical = 0;
    let rare = 0;
    for (const s of selected) {
      const cat = SYMPTOM_CATEGORIES[s] || "general";
      if (cat === "general") general++;
      else if (cat === "critical") critical++;
      else rare++;
    }
    return { general, critical, rare };
  }, [selected]);

  const totalAll =
    SYMPTOMS.general.length + SYMPTOMS.critical.length + SYMPTOMS.rare.length;

  const handleSubmit = () => {
    setAttempted(true);
    if (!canSubmit) return;
    onAnalyze(selected, ageNum, gender);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    transition: "all 0.3s",
    boxSizing: "border-box" as const,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.78rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "1.5px",
    color: "var(--text-muted)",
    marginBottom: "10px",
    display: "block",
  };

  const errorStyle: React.CSSProperties = {
    marginTop: "6px",
    fontSize: "0.78rem",
    color: "#f97316",
    fontWeight: 500,
  };

  return (
    <section
      id="symptoms"
      style={{ padding: "60px 24px", background: "var(--bg-primary)" }}
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
          <p style={{ color: "var(--text-muted)" }}>
            Enter your details and select all symptoms you are experiencing for
            AI analysis
          </p>
        </div>

        <div className="glass-card" style={{ padding: "32px" }}>
          {/* ── Age & Gender Row ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Age */}
            <div>
              <label htmlFor="age-input" style={labelStyle}>
                Age
              </label>
              <input
                id="age-input"
                data-ocid="symptoms.input"
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 28"
                style={{
                  ...inputBase,
                  borderColor:
                    attempted && !ageValid ? "#f97316" : "var(--border-color)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent)";
                  e.target.style.boxShadow = "var(--glow-soft)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    attempted && !ageValid ? "#f97316" : "var(--border-color)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {attempted && !ageValid && (
                <p data-ocid="symptoms.error_state" style={errorStyle}>
                  Please enter a valid age (1–120)
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <div style={labelStyle} aria-hidden="true">
                Gender
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {(["Male", "Female", "Other"] as const).map((g) => {
                  const isActive = gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      data-ocid={`symptoms.${g.toLowerCase()}.toggle`}
                      onClick={() => setGender(g)}
                      style={{
                        padding: "10px 22px",
                        borderRadius: "999px",
                        cursor: "pointer",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                        background: isActive
                          ? "linear-gradient(135deg, rgba(78,122,177,0.18), rgba(125,191,192,0.12))"
                          : "transparent",
                        border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border-color)"}`,
                        color: isActive ? "var(--accent)" : "var(--text-muted)",
                        boxShadow: isActive ? "var(--glow-soft)" : "none",
                        transform: isActive ? "scale(1.04)" : "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.color = "var(--accent-hover)";
                          e.currentTarget.style.transform = "scale(1.03)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor =
                            "var(--border-color)";
                          e.currentTarget.style.color = "var(--text-muted)";
                          e.currentTarget.style.transform = "scale(1)";
                        }
                      }}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
              {attempted && !genderValid && (
                <p data-ocid="symptoms.gender.error_state" style={errorStyle}>
                  Please select a gender
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, var(--border-color), transparent)",
              marginBottom: "28px",
            }}
          />

          {/* Quick Packs */}
          <div style={{ marginBottom: "20px" }}>
            <div style={labelStyle}>Quick Packs</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {Object.entries(SYMPTOM_PACKS).map(([packName, packSymptoms]) => (
                <button
                  key={packName}
                  type="button"
                  className="glossy-pill"
                  data-ocid={`symptoms.${packName.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.button`}
                  onClick={() => addPack(packSymptoms)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    background: "transparent",
                    border: "1.5px solid var(--accent)",
                    color: "var(--accent)",
                    transition: "all 0.22s",
                    letterSpacing: "0.2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent-dim)";
                    e.currentTarget.style.boxShadow = "var(--glow-soft)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {packName}
                </button>
              ))}
            </div>
          </div>

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
                      ? "linear-gradient(135deg, rgba(78,122,177,0.12), rgba(125,191,192,0.08))"
                      : "transparent",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--border-color)"}`,
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    boxShadow: isActive ? "var(--glow-soft)" : "none",
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                  stroke="rgba(78,122,177,0.5)"
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
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                  fontFamily: "Poppins, sans-serif",
                  outline: "none",
                  transition: "all 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent)";
                  e.target.style.boxShadow = "var(--glow-soft)";
                }}
                onBlur={(e) => {
                  setTimeout(() => setShowAutocomplete(false), 200);
                  e.target.style.borderColor = "var(--border-color)";
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
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
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
                      borderBottom: "1px solid var(--border-color)",
                      transition: "background 0.2s",
                      color: "var(--text-primary)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--accent-dim)";
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
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                        border: "1px solid var(--border-color)",
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
              const isSelected = selected.includes(symptom);
              const isPopping = justSelected.has(symptom);
              return (
                <button
                  key={symptom}
                  type="button"
                  className="glossy-chip"
                  title={`Category: ${SYMPTOM_CATEGORIES[symptom] || "general"}`}
                  onClick={() => toggleSymptom(symptom)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(78,122,177,0.12), rgba(215,182,212,0.15), rgba(125,191,192,0.08))"
                      : "var(--accent-dim)",
                    border: `${isSelected ? "1.5px" : "1px"} solid ${isSelected ? "var(--accent)" : "var(--border-color)"}`,
                    color: isSelected ? "var(--accent)" : "var(--text-muted)",
                    transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                    boxShadow: isSelected ? "var(--glow-soft)" : "none",
                    transform: isSelected ? "scale(1.04)" : "scale(1)",
                    animation: isPopping
                      ? "chipPop 0.3s ease forwards"
                      : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.color = "var(--accent-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "var(--border-color)";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }
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
                color: "var(--text-muted)",
                padding: "24px",
              }}
            >
              No symptoms found for &quot;{search}&quot;
            </p>
          )}

          {/* Severity Distribution Bar */}
          {selected.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <div style={{ ...labelStyle, marginBottom: "8px" }}>
                Symptom Distribution
              </div>
              <div
                style={{
                  height: "10px",
                  borderRadius: "5px",
                  overflow: "hidden",
                  display: "flex",
                  gap: "2px",
                }}
              >
                {severityCounts.general > 0 && (
                  <div
                    style={{
                      flex: severityCounts.general,
                      background: "#2d8a55",
                      borderRadius: "5px 0 0 5px",
                      transition: "flex 0.4s ease",
                      minWidth: "4px",
                    }}
                  />
                )}
                {severityCounts.critical > 0 && (
                  <div
                    style={{
                      flex: severityCounts.critical,
                      background: "#c97a20",
                      transition: "flex 0.4s ease",
                      minWidth: "4px",
                    }}
                  />
                )}
                {severityCounts.rare > 0 && (
                  <div
                    style={{
                      flex: severityCounts.rare,
                      background: "#c0304a",
                      borderRadius: "0 5px 5px 0",
                      transition: "flex 0.4s ease",
                      minWidth: "4px",
                    }}
                  />
                )}
              </div>
              <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
                {[
                  {
                    label: "General",
                    count: severityCounts.general,
                    color: "#2d8a55",
                  },
                  {
                    label: "Critical",
                    count: severityCounts.critical,
                    color: "#c97a20",
                  },
                  {
                    label: "Rare",
                    count: severityCounts.rare,
                    color: "#c0304a",
                  },
                ]
                  .filter((d) => d.count > 0)
                  .map((d) => (
                    <span
                      key={d.label}
                      style={{
                        fontSize: "0.72rem",
                        color: d.color,
                        fontWeight: 600,
                      }}
                    >
                      {d.label}: {d.count}
                    </span>
                  ))}
              </div>
            </div>
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
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                Selected:{" "}
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                  {selected.length} symptoms
                </span>
              </span>
              <button
                type="button"
                data-ocid="symptoms.delete_button"
                onClick={() => setSelected([])}
                style={{
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-color)",
                  color: "var(--accent)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontFamily: "Poppins, sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(78,122,177,0.15)";
                  e.currentTarget.style.boxShadow = "var(--glow-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent-dim)";
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
              {selected.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    background: "var(--accent-dim)",
                    border: "1px solid var(--border-color)",
                    color: "var(--accent)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <button
              type="button"
              data-ocid="symptoms.submit_button"
              disabled={isAnalyzing}
              onClick={handleSubmit}
              className={`btn-gradient${canSubmit && !isAnalyzing ? " btn-cta-blink" : ""}`}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "1rem",
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? "pointer" : "not-allowed",
                transition: "opacity 0.2s",
              }}
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
                    data-ocid="symptoms.loading_state"
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#ffffff",
                      borderRadius: "50%",
                      animation: "spinSlow 0.8s linear infinite",
                      display: "inline-block",
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

      {/* Floating sticky pill */}
      {selected.length > 0 && (
        <button
          type="button"
          data-ocid="symptoms.primary_button"
          onClick={handleSubmit}
          disabled={isAnalyzing}
          title={
            !ageValid || !genderValid
              ? "Please fill in Age and Gender first"
              : undefined
          }
          className={canSubmit && !isAnalyzing ? "floating-pill-cta" : ""}
          style={{
            position: "fixed",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            background: canSubmit ? undefined : "rgba(78,122,177,0.2)",
            color: canSubmit ? "#ffffff" : "var(--text-muted)",
            border: "none",
            borderRadius: "999px",
            padding: "14px 32px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: canSubmit ? "pointer" : "not-allowed",
            boxShadow: canSubmit ? undefined : "none",
            animation:
              !canSubmit || isAnalyzing
                ? "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards"
                : undefined,
            whiteSpace: "nowrap",
            letterSpacing: "0.2px",
            transition: "all 0.25s",
            opacity: canSubmit ? 1 : 0.6,
          }}
        >
          {isAnalyzing
            ? "Analyzing..."
            : canSubmit
              ? `${selected.length} symptoms — Analyze Now →`
              : `${selected.length} selected · Fill age & gender`}
        </button>
      )}
    </section>
  );
}
