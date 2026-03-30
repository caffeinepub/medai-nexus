import { useEffect, useState } from "react";
import type { FeedbackEntry } from "../backend.d";
import { useActor } from "../hooks/useActor";

const ADMIN_PASSWORD = "dickyaddu@admin2026";

interface Props {
  alreadyAuthenticated?: boolean;
  onClose?: () => void;
}

export default function AdminPage({
  alreadyAuthenticated = false,
  onClose,
}: Props) {
  const { actor } = useActor();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(alreadyAuthenticated);
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      // Read from localStorage first (reliable local storage)
      try {
        const stored = JSON.parse(
          localStorage.getItem("medai_feedback") || "[]",
        );
        const localEntries: FeedbackEntry[] = stored.map(
          (item: {
            rating: number;
            description: string;
            disease: string;
            age: number;
            gender: string;
            timestamp: number;
            name?: string;
          }) => ({
            rating: BigInt(item.rating || 0),
            description: item.description || "",
            disease: item.disease || "",
            age: BigInt(item.age || 0),
            gender: item.gender || "",
            timestamp: BigInt(item.timestamp || Date.now()) * 1_000_000n,
          }),
        );
        if (localEntries.length > 0) {
          setFeedbacks(localEntries);
          setLoading(false);
          return;
        }
      } catch {
        // fall through to actor
      }
      // Fallback: try backend actor
      if (!actor) {
        setLoading(false);
        return;
      }
      actor
        .getFeedbacks()
        .then((data) => setFeedbacks(data))
        .catch(() => setFeedbacks([]))
        .finally(() => setLoading(false));
    }
  }, [authenticated, actor]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Access denied. Invalid password.");
    }
  };

  const avgRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, f) => sum + Number(f.rating), 0) /
          feedbacks.length
        ).toFixed(1)
      : null;

  const formatTimestamp = (ts: bigint) =>
    new Date(Number(ts / 1_000_000n)).toLocaleString();

  const renderStars = (rating: bigint) => {
    const n = Number(rating);
    return (
      <span>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{
              color: i <= n ? "#4E7AB1" : "rgba(78,122,177,0.2)",
              fontSize: "1rem",
            }}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .admin-input:focus { outline: none; border-color: #4E7AB1 !important; box-shadow: 0 0 0 3px rgba(78,122,177,0.12); }
        .admin-row:hover td { background: rgba(78,122,177,0.04) !important; }
        @media (max-width: 768px) {
          .admin-table-wrap { overflow-x: auto; }
          .admin-table { min-width: 700px; }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f8f9ff 0%, #eef3ff 50%, #f0f8f8 100%)",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        {/* Back / Close button */}
        <div style={{ width: "100%", maxWidth: 1000, marginBottom: 24 }}>
          <button
            type="button"
            data-ocid="admin.link"
            onClick={
              onClose ??
              (() => {
                window.location.hash = "";
              })
            }
            style={{
              background: "rgba(78,122,177,0.1)",
              border: "1px solid rgba(78,122,177,0.25)",
              borderRadius: 8,
              color: "#4E7AB1",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "8px 16px",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.2s",
            }}
          >
            ← {onClose ? "Back to Login" : "Back to App"}
          </button>
        </div>

        {/* Header */}
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(78,122,177,0.08)",
              border: "1px solid rgba(78,122,177,0.2)",
              borderRadius: 999,
              padding: "8px 20px",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                color: "#4E7AB1",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              🔐 Admin Panel
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: 900,
              background: "linear-gradient(135deg, #102853, #4E7AB1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MedAI Nexus — Feedback Dashboard
          </h1>
        </div>

        {!authenticated ? (
          /* Login card */
          <div
            data-ocid="admin.modal"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(78,122,177,0.2)",
              borderRadius: 20,
              padding: "40px 36px",
              maxWidth: 420,
              width: "100%",
              boxShadow:
                "0 8px 40px rgba(16,40,83,0.1), 0 2px 12px rgba(78,122,177,0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🛡️</div>
              <h2
                style={{
                  margin: 0,
                  color: "#102853",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                }}
              >
                Owner Access Required
              </h2>
              <p
                style={{ color: "#506980", fontSize: "0.85rem", marginTop: 8 }}
              >
                Enter admin password to view feedback
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="admin-password-input"
                style={{
                  display: "block",
                  color: "#506980",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginBottom: 8,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="admin-password-input"
                data-ocid="admin.input"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 12,
                  background: "rgba(78,122,177,0.05)",
                  border: "1px solid rgba(78,122,177,0.25)",
                  color: "#102853",
                  fontSize: "0.95rem",
                  fontFamily: "Poppins, sans-serif",
                  transition: "border-color 0.2s",
                }}
              />
            </div>
            {error && (
              <div
                data-ocid="admin.error_state"
                style={{
                  background: "rgba(176,48,48,0.07)",
                  border: "1px solid rgba(176,48,48,0.25)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "#b03030",
                  fontSize: "0.85rem",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}
            <button
              type="button"
              data-ocid="admin.submit_button"
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                color: "#fff",
                border: "none",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(78,122,177,0.3)",
                fontFamily: "Poppins, sans-serif",
                transition: "opacity 0.2s",
              }}
            >
              Unlock Dashboard
            </button>
          </div>
        ) : (
          /* Dashboard */
          <div style={{ width: "100%", maxWidth: 1000 }}>
            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
                marginBottom: 28,
              }}
            >
              {[
                {
                  label: "Total Feedback",
                  value: feedbacks.length,
                  icon: "📊",
                },
                {
                  label: "Average Rating",
                  value: avgRating ? `${avgRating} / 5` : "—",
                  icon: "⭐",
                },
                {
                  label: "Positive Reviews",
                  value: feedbacks.filter((f) => Number(f.rating) >= 4).length,
                  icon: "👍",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(78,122,177,0.18)",
                    borderRadius: 16,
                    padding: "20px 24px",
                    textAlign: "center",
                    boxShadow: "0 2px 12px rgba(16,40,83,0.06)",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      color: "#4E7AB1",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: "#506980",
                      fontSize: "0.78rem",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Table card */}
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(78,122,177,0.15)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(16,40,83,0.07)",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid rgba(78,122,177,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(215,182,212,0.08)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#102853",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  All Feedback Submissions
                </h3>
                <span
                  style={{
                    background: "rgba(78,122,177,0.12)",
                    color: "#4E7AB1",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  {feedbacks.length} entries
                </span>
              </div>

              {loading ? (
                <div
                  data-ocid="admin.loading_state"
                  style={{ padding: 40, textAlign: "center", color: "#506980" }}
                >
                  Loading feedback...
                </div>
              ) : feedbacks.length === 0 ? (
                <div
                  data-ocid="admin.empty_state"
                  style={{ padding: 60, textAlign: "center" }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 12 }}>📭</div>
                  <p
                    style={{ color: "#7a95aa", margin: 0, fontSize: "0.95rem" }}
                  >
                    No feedback yet.
                  </p>
                </div>
              ) : (
                <div className="admin-table-wrap">
                  <table
                    className="admin-table"
                    data-ocid="admin.table"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "0.85rem",
                    }}
                  >
                    <thead>
                      <tr style={{ background: "rgba(215,182,212,0.1)" }}>
                        {[
                          "#",
                          "Date / Time",
                          "Stars",
                          "Disease",
                          "Age",
                          "Gender",
                          "Description",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "12px 16px",
                              textAlign: "left",
                              color: "#506980",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              borderBottom: "1px solid rgba(78,122,177,0.12)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((entry, idx) => (
                        <tr
                          key={String(entry.timestamp)}
                          className="admin-row"
                          data-ocid={`admin.row.${idx + 1}`}
                          style={{
                            borderBottom: "1px solid rgba(78,122,177,0.07)",
                          }}
                        >
                          <td
                            style={{
                              padding: "14px 16px",
                              color: "#7a95aa",
                              fontWeight: 600,
                            }}
                          >
                            {idx + 1}
                          </td>
                          <td
                            style={{
                              padding: "14px 16px",
                              color: "#506980",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatTimestamp(entry.timestamp)}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            {renderStars(entry.rating)}
                          </td>
                          <td
                            style={{
                              padding: "14px 16px",
                              color: "#4E7AB1",
                              fontWeight: 600,
                            }}
                          >
                            {entry.disease || "—"}
                          </td>
                          <td
                            style={{ padding: "14px 16px", color: "#506980" }}
                          >
                            {String(entry.age)}
                          </td>
                          <td
                            style={{ padding: "14px 16px", color: "#506980" }}
                          >
                            {entry.gender || "—"}
                          </td>
                          <td
                            style={{
                              padding: "14px 16px",
                              color: "#7a95aa",
                              maxWidth: 280,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={entry.description}
                          >
                            {entry.description || (
                              <em style={{ opacity: 0.5 }}>No description</em>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 40,
            color: "#7a95aa",
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          MedAI Nexus Admin — Restricted Access Only
        </div>
      </div>
    </>
  );
}
