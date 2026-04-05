import { useState } from "react";
import { useActor } from "../hooks/useActor";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  disease?: string;
  age?: number;
  gender?: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  disease = "",
  age = 0,
  gender: diagnosisGender = "",
}: FeedbackModalProps) {
  const [slide, setSlide] = useState(0);
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const { actor } = useActor();

  if (!isOpen) return null;

  const handleClose = () => {
    setSlide(0);
    setName("");
    setSelectedGender("");
    setRating(0);
    setHoverRating(0);
    setDescription("");
    onClose();
  };

  const handleSubmit = async () => {
    const finalGender = selectedGender || diagnosisGender;
    try {
      if (actor)
        await actor.submitFeedback(
          BigInt(rating),
          description,
          disease,
          BigInt(age),
          finalGender,
        );
    } catch {
      // Silent fail
    }
    try {
      const stored = JSON.parse(localStorage.getItem("medai_feedback") || "[]");
      stored.push({
        name,
        rating,
        description,
        disease,
        age,
        gender: finalGender,
        timestamp: Date.now(),
      });
      localStorage.setItem("medai_feedback", JSON.stringify(stored));
    } catch {
      // ignore
    }
    setSlide(3);
  };

  const isPositive = rating >= 4;
  const genderOptions = ["Male", "Female", "Other"];

  const primaryBtn = (label: string, onClick: () => void, disabled = false) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "13px 40px",
        borderRadius: 999,
        background: disabled
          ? "rgba(78,122,177,0.1)"
          : "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
        color: disabled ? "rgba(78,122,177,0.4)" : "#fff",
        border: "none",
        fontSize: "0.95rem",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 0 20px rgba(78,122,177,0.35)",
        transition: "all 0.25s",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <style>{`
        @keyframes fbFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes starBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @keyframes fbSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fb-star { cursor: pointer; transition: transform 0.15s ease; font-size: 2.4rem; line-height: 1; }
        .fb-star:hover { transform: scale(1.2); }
        .fb-star.selected { animation: starBounce 0.3s ease; }
        .fb-slide { animation: fbSlideIn 0.4s cubic-bezier(0.23, 1, 0.32, 1) both; }
        .fb-textarea:focus { outline: none; border-color: rgba(78,122,177,0.7) !important; box-shadow: 0 0 16px rgba(78,122,177,0.15); }
        .fb-name-input:focus { outline: none; border-color: rgba(78,122,177,0.7) !important; box-shadow: 0 0 16px rgba(78,122,177,0.15); }
        .fb-gender-btn { transition: all 0.2s ease; }
        .fb-gender-btn:hover { transform: scale(1.04); }
      `}</style>
      <div
        data-ocid="feedback.modal"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "rgba(16,40,83, 0.45)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(78,122,177, 0.2)",
            borderRadius: 24,
            padding: "40px 36px",
            maxWidth: 480,
            width: "100%",
            boxShadow:
              "0 0 60px rgba(78,122,177,0.2), 0 20px 60px rgba(16,40,83,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
            animation: "fbFadeIn 0.35s cubic-bezier(0.23, 1, 0.32, 1) both",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* Progress dots — 4 slides total */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 28,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: i === slide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i <= slide ? "#4E7AB1" : "rgba(78,122,177,0.15)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Close X */}
          <button
            type="button"
            data-ocid="feedback.close_button"
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(78,122,177, 0.08)",
              border: "1px solid rgba(78,122,177, 0.2)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              color: "#4E7AB1",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* SLIDE 0: Name + Gender */}
          {slide === 0 && (
            <div className="fb-slide" key="slide0">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: "0 0 24px rgba(78,122,177,0.35)",
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  role="img"
                >
                  <title>User profile</title>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2
                style={{
                  color: "#102853",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                Who are you?
              </h2>
              <p
                style={{
                  color: "#506980",
                  fontSize: "0.9rem",
                  marginBottom: 24,
                }}
              >
                Tell us a little about yourself before leaving a review
              </p>

              {/* Name input */}
              <div style={{ textAlign: "left", marginBottom: 20 }}>
                <label
                  htmlFor="fb-name"
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#102853",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Your Name
                </label>
                <input
                  id="fb-name"
                  className="fb-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "rgba(78,122,177,0.06)",
                    border: "1.5px solid rgba(78,122,177,0.25)",
                    color: "#102853",
                    fontSize: "0.95rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                />
              </div>

              {/* Gender selection */}
              <div style={{ textAlign: "left", marginBottom: 28 }}>
                <p
                  style={{
                    display: "block",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#102853",
                    marginBottom: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 10px 0",
                  }}
                >
                  Gender
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {genderOptions.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className="fb-gender-btn"
                      onClick={() => setSelectedGender(g)}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        borderRadius: 10,
                        border:
                          selectedGender === g
                            ? "2px solid #4E7AB1"
                            : "1.5px solid rgba(78,122,177,0.25)",
                        background:
                          selectedGender === g
                            ? "linear-gradient(135deg, #4E7AB1, #7DBFC0)"
                            : "rgba(78,122,177,0.05)",
                        color: selectedGender === g ? "#fff" : "#506980",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow:
                          selectedGender === g
                            ? "0 0 12px rgba(78,122,177,0.3)"
                            : "none",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {primaryBtn(
                "Next →",
                () => setSlide(1),
                !name.trim() || !selectedGender,
              )}
            </div>
          )}

          {/* SLIDE 1: Star Rating */}
          {slide === 1 && (
            <div className="fb-slide" key="slide1">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: "0 0 24px rgba(78,122,177,0.35)",
                  fontSize: "1.5rem",
                }}
              >
                ⭐
              </div>
              <h2
                style={{
                  color: "#102853",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                Hi {name}! Rate your experience
              </h2>
              <p
                style={{
                  color: "#506980",
                  fontSize: "0.9rem",
                  marginBottom: 28,
                }}
              >
                How was your MedAI Nexus analysis session?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 32,
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`fb-star${rating >= star ? " selected" : ""}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                    style={{
                      color:
                        (hoverRating || rating) >= star
                          ? "#4E7AB1"
                          : "rgba(78,122,177,0.2)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {primaryBtn("Next →", () => setSlide(2), rating === 0)}
            </div>
          )}

          {/* SLIDE 2: Description */}
          {slide === 2 && (
            <div className="fb-slide" key="slide2">
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: "0 0 24px rgba(78,122,177,0.35)",
                  fontSize: "1.5rem",
                }}
              >
                💬
              </div>
              <h2
                style={{
                  color: "#102853",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                Tell us more
              </h2>
              <p
                style={{
                  color: "#506980",
                  fontSize: "0.9rem",
                  marginBottom: 24,
                }}
              >
                What did you think? (optional)
              </p>
              <textarea
                data-ocid="feedback.textarea"
                className="fb-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your thoughts about the analysis..."
                rows={4}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: "rgba(78,122,177,0.06)",
                  border: "1.5px solid rgba(78,122,177,0.25)",
                  color: "#102853",
                  fontSize: "0.9rem",
                  fontFamily: "Poppins, sans-serif",
                  resize: "vertical",
                  marginBottom: 24,
                  display: "block",
                }}
              />
              {primaryBtn("Submit →", handleSubmit)}
            </div>
          )}

          {/* SLIDE 3: Final message */}
          {slide === 3 && (
            <div className="fb-slide" key="slide3">
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>
                {isPositive ? "🎉" : "💪"}
              </div>
              <h2
                style={{
                  color: isPositive ? "#4E7AB1" : "#506980",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  marginBottom: 12,
                }}
              >
                {isPositive ? "Thanks for your feedback!" : "We will improve"}
              </h2>
              {description ? (
                <div
                  style={{
                    background: "rgba(78,122,177,0.07)",
                    border: "1px solid rgba(78,122,177,0.2)",
                    borderRadius: 14,
                    padding: "14px 18px",
                    color: "#102853",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    marginBottom: 24,
                    textAlign: "left",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{description}&rdquo;
                </div>
              ) : (
                <p
                  style={{
                    color: "#506980",
                    marginBottom: 24,
                    fontSize: "0.9rem",
                  }}
                >
                  {isPositive
                    ? "We're glad you enjoyed MedAI Nexus!"
                    : "Your feedback helps us build better diagnostics."}
                </p>
              )}
              {primaryBtn("Done ✓", handleClose)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
