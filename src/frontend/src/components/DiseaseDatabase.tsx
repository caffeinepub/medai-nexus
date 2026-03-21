import { useMemo, useState } from "react";
import type { Disease } from "../data/diseases";

interface Props {
  diseases: Disease[];
}

const severityColors: Record<string, string> = {
  low: "#28E3A3",
  medium: "#facc15",
  high: "#f97316",
  critical: "#ef4444",
};

export default function DiseaseDatabase({ diseases }: Props) {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return diseases.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchSev =
        severityFilter === "all" || d.severity === severityFilter;
      return matchSearch && matchSev;
    });
  }, [diseases, search, severityFilter]);

  return (
    <section className="database-section" id="database">
      <div className="section-header">
        <h2 className="section-title">DISEASE DATABASE</h2>
        <div className="section-line" />
      </div>
      <div className="database-controls">
        <input
          className="search-input db-search"
          placeholder="Search diseases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="severity-filters">
          {["all", "low", "medium", "high", "critical"].map((sev) => (
            <button
              type="button"
              key={sev}
              className={`sev-filter${severityFilter === sev ? " active" : ""}`}
              style={
                severityFilter === sev && sev !== "all"
                  ? {
                      background: `${severityColors[sev]}22`,
                      borderColor: severityColors[sev],
                      color: severityColors[sev],
                    }
                  : {}
              }
              onClick={() => setSeverityFilter(sev)}
            >
              {sev.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="disease-grid">
        {filtered.map((d) => (
          <div key={d.id} className="disease-card glass-card">
            <div className="disease-card-header">
              <h3 className="disease-name">{d.name}</h3>
              <span
                className="severity-badge"
                style={{
                  color: severityColors[d.severity],
                  borderColor: severityColors[d.severity],
                  background: `${severityColors[d.severity]}22`,
                }}
              >
                {d.severity.toUpperCase()}
              </span>
            </div>
            <p className="disease-desc">{d.description}</p>
            <div className="disease-symptoms">
              {d.symptoms.slice(0, 4).map((s) => (
                <span key={s} className="disease-sym-tag">
                  {s}
                </span>
              ))}
              {d.symptoms.length > 4 && (
                <span className="disease-sym-more">{`+${d.symptoms.length - 4}`}</span>
              )}
            </div>
            <div className="disease-info">
              <div className="disease-info-row">
                <span className="info-label">🥗 DIET</span>
                <span className="info-text">{d.diet}</span>
              </div>
              <div className="disease-info-row">
                <span className="info-label">🛡 PRECAUTIONS</span>
                <span className="info-text">{d.precautions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
