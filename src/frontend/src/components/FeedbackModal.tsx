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
  gender = "",
}: FeedbackModalProps) {
  const [slide, setSlide] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const { actor } = useActor();

  if (!isOpen) return null;

  const handleClose = () => {
    setSlide(0);
    setRating(0);
    setHoverRating(0);
    setDescription("");
    onClose();
  };

  const handleSubmit = async () => {
    try {
      if (actor)
        await actor.submitFeedback(
          BigInt(rating),
          description,
          disease,
          BigInt(age),
          gender,
        );
    } catch {
      // Silent fail — don't block UX
    }
    // Save to localStorage for intro slide stats
    try {
      const stored = JSON.parse(localStorage.getItem("medai_feedback") || "[]");
      stored.push({
        rating,
        description,
        disease,
        age,
        gender,
        timestamp: Date.now(),
      });
      localStorage.setItem("medai_feedback", JSON.stringify(stored));
    } catch {
      // ignore
    }
    setSlide(2);
  };

  const isPositive = rating >= 4;

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
        .fb-textarea:focus { outline: none; border-color: rgba(131,135,195,0.7) !important; box-shadow: 0 0 16px rgba(131,135,195,0.15); }
      `}</style>
      <div
        data-ocid="feedback.modal"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "rgba(10,17,35, 0.55)",
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
            background: "rgba(10,17,35,0.96)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(131,135,195, 0.25)",
            borderRadius: 24,
            padding: "40px 36px",
            maxWidth: 480,
            width: "100%",
            boxShadow:
              "0 0 80px rgba(131,135,195,0.25), 0 20px 60px rgba(10,17,35,0.5), inset 0 1px 0 rgba(131,135,195,0.1)",
            animation: "fbFadeIn 0.35s cubic-bezier(0.23, 1, 0.32, 1) both",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* Progress dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 28,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === slide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i <= slide ? "#8387C3" : "rgba(131,135,195,0.15)",
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
              background: "rgba(131,135,195, 0.08)",
              border: "1px solid rgba(131,135,195, 0.2)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              color: "#8387C3",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* SLIDE 0: Star Rating */}
          {slide === 0 && (
            <div className="fb-slide" key="slide0">
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⭐</div>
              <h2
                style={{
                  color: "#8387C3",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                How was your experience?
              </h2>
              <p
                style={{
                  color: "rgba(131,135,195,0.7)",
                  fontSize: "0.9rem",
                  marginBottom: 28,
                }}
              >
                Rate your MedAI Nexus analysis session
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
                          ? "#8387C3"
                          : "rgba(58,62,108,0.25)",
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
              <button
                type="button"
                data-ocid="feedback.primary_button"
                onClick={() => rating > 0 && setSlide(1)}
                disabled={rating === 0}
                style={{
                  padding: "13px 40px",
                  borderRadius: 999,
                  background:
                    rating > 0
                      ? "linear-gradient(135deg, #8387C3, #95BBB5)"
                      : "rgba(131,135,195, 0.1)",
                  color: rating > 0 ? "#fff" : "rgba(58,62,108,0.4)",
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: rating > 0 ? "pointer" : "not-allowed",
                  boxShadow:
                    rating > 0 ? "0 0 20px rgba(131,135,195, 0.3)" : "none",
                  transition: "all 0.25s",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Next →
              </button>
            </div>
          )}

          {/* SLIDE 1: Description */}
          {slide === 1 && (
            <div className="fb-slide" key="slide1">
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>💬</div>
              <h2
                style={{
                  color: "#8387C3",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                Tell us more
              </h2>
              <p
                style={{
                  color: "rgba(131,135,195,0.7)",
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
                  background: "rgba(58,62,108,0.4)",
                  border: "1px solid rgba(131,135,195, 0.25)",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontFamily: "Poppins, sans-serif",
                  resize: "vertical",
                  marginBottom: 24,
                  display: "block",
                }}
              />
              <button
                type="button"
                data-ocid="feedback.submit_button"
                onClick={handleSubmit}
                style={{
                  padding: "13px 40px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #8387C3, #95BBB5)",
                  color: "#fff",
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(131,135,195, 0.3)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Submit →
              </button>
            </div>
          )}

          {/* SLIDE 2: Final message */}
          {slide === 2 && (
            <div className="fb-slide" key="slide2">
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>
                {isPositive ? "🎉" : "💪"}
              </div>
              <h2
                style={{
                  color: isPositive ? "#8387C3" : "#95BBB5",
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
                    background: "rgba(58,62,108,0.4)",
                    border: "1px solid rgba(131,135,195,0.2)",
                    borderRadius: 14,
                    padding: "14px 18px",
                    color: "rgba(255,255,255,0.8)",
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
                    color: "#8C8CAC",
                    marginBottom: 24,
                    fontSize: "0.9rem",
                  }}
                >
                  {isPositive
                    ? "We're glad you enjoyed MedAI Nexus!"
                    : "Your feedback helps us build better diagnostics."}
                </p>
              )}
              <button
                type="button"
                data-ocid="feedback.confirm_button"
                onClick={handleClose}
                style={{
                  padding: "13px 40px",
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #8387C3, #95BBB5)",
                  color: "#fff",
                  border: "none",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(131,135,195, 0.3)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Done ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
