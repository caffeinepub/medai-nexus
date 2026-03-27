import { useEffect, useRef, useState } from "react";

interface Props {
  onActivate: (key: string) => void;
}

const VALID_KEY = "AIzaSyAeYSZuSR6wbSApVmDEMX7AOvFlRJ774tU";
const AUTO_ADVANCE_MS = 3500;

const SLIDES = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5c518"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
    title: "MedAI Nexus",
    subtitle: "AI-Powered Precision Diagnostics",
    description:
      "An advanced medical intelligence platform that analyzes your symptoms and delivers AI-driven diagnostic insights in seconds.",
    stat: "70+ Diseases Detected",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5c518"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 12h6" />
        <path d="M11 10v4" />
        <path d="M4 6h16" />
        <path d="M4 10h4" />
        <path d="M4 14h4" />
        <path d="M4 18h16" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
    title: "264 Symptoms Analyzed",
    subtitle: "Comprehensive Symptom Database",
    description:
      "Select from 264 symptoms across General, Critical, and Rare categories. Our AI engine matches your profile against 70 known conditions with precision scoring.",
    stat: "264 Symptoms · 3 Categories",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5c518"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
    title: "AI Result Dashboard",
    subtitle: "Ranked Diagnoses with Confidence Scores",
    description:
      "Get top-5 ranked diagnoses with confidence percentages, recommended diet, medicines, precautions, and a step-by-step action plan tailored to your symptoms.",
    stat: "Step-by-Step Action Plan",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f5c518"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Access",
    subtitle: "API Key Protected Platform",
    description:
      "Your diagnostic session is powered by a personal API key. It stays in browser memory only — never stored or transmitted to external servers.",
    stat: "Zero Data Retention",
  },
];

export default function ActivationScreen({ onActivate }: Props) {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const animatingRef = useRef(false);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showKey, setShowKey] = useState(false);
  const [slideDir, setSlideDir] = useState<"in" | "out">("in");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isLastSlide = slide === SLIDES.length;

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const YELLOW = ["rgba(245,197,24,", "rgba(255,215,0,", "rgba(212,160,23,"];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.8 + 0.3,
      colorIdx: Math.floor(Math.random() * YELLOW.length),
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${YELLOW[p.colorIdx]}0.55)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `${YELLOW[p.colorIdx]}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${YELLOW[a.colorIdx]}${0.09 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isLastSlide) return;
    const t = setTimeout(() => {
      const nextSlide = slide + 1;
      if (nextSlide <= SLIDES.length - 1 && !animatingRef.current) {
        goToSlide(nextSlide);
      }
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
    // goToSlide is stable (defined in render, uses ref for guard)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, isLastSlide]);

  const goToSlide = (next: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setAnimating(true);
    setSlideDir("out");
    setTimeout(() => {
      setSlide(next);
      setSlideDir("in");
      setTimeout(() => {
        animatingRef.current = false;
        setAnimating(false);
      }, 50);
    }, 500);
  };

  const handleActivate = async () => {
    if (!apiKey.trim()) {
      setError("API Key Required to Initialize System");
      return;
    }
    if (apiKey.trim() !== VALID_KEY) {
      setError("Invalid API Key — Access Denied");
      return;
    }
    setLoading(true);
    setError("");
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 22));
    }
    onActivate(apiKey.trim());
  };

  const currentSlideData = SLIDES[slide];

  const cardAnim: React.CSSProperties = {
    opacity: animating ? 0 : 1,
    transform: animating
      ? slideDir === "out"
        ? "translateX(-40px) scale(0.96)"
        : "translateX(40px) scale(0.96)"
      : "translateX(0) scale(1)",
    transition:
      "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <>
      <style>{`
        @keyframes slideTimer {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes scanLine {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes radarPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        data-ocid="activation.panel"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
          background: "#050505",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,197,24,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.04) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Particles */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, zIndex: 2 }}
        />

        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(245,197,24,0.0) 15%, rgba(245,197,24,0.9) 50%, rgba(245,197,24,0.0) 85%, transparent 100%)",
            animation: "scanLine 5s linear infinite",
            zIndex: 3,
            boxShadow: "0 0 20px rgba(245,197,24,0.5)",
          }}
        />

        {/* Corner brackets */}
        {(["top", "bottom"] as const).flatMap((v) =>
          (["left", "right"] as const).map((h) => (
            <div
              key={`${v}-${h}`}
              style={{
                position: "absolute",
                [v]: 20,
                [h]: 20,
                width: 32,
                height: 32,
                borderTop:
                  v === "top" ? "2px solid rgba(245,197,24,0.5)" : "none",
                borderBottom:
                  v === "bottom" ? "2px solid rgba(245,197,24,0.5)" : "none",
                borderLeft:
                  h === "left" ? "2px solid rgba(245,197,24,0.5)" : "none",
                borderRight:
                  h === "right" ? "2px solid rgba(245,197,24,0.5)" : "none",
                zIndex: 4,
                pointerEvents: "none",
                filter: "drop-shadow(0 0 6px rgba(245,197,24,0.4))",
              }}
            />
          )),
        )}

        {/* HUD label */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.58rem",
            color: "rgba(245,197,24,0.5)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            zIndex: 5,
            pointerEvents: "none",
            textShadow: "0 0 10px rgba(245,197,24,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          ◈ MEDAI NEXUS — SECURE ACCESS ◈
        </div>

        {/* Step dots top-right */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 56,
            display: "flex",
            gap: 7,
            zIndex: 5,
            alignItems: "center",
          }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.title}
              style={{
                width: i === slide ? 20 : 7,
                height: 7,
                borderRadius: 4,
                background: i === slide ? "#f5c518" : "rgba(245,197,24,0.25)",
                transition: "all 0.3s ease",
                boxShadow:
                  i === slide ? "0 0 8px rgba(245,197,24,0.7)" : "none",
              }}
            />
          ))}
          <div
            style={{
              width: isLastSlide ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: isLastSlide ? "#f5c518" : "rgba(245,197,24,0.25)",
              transition: "all 0.3s ease",
              boxShadow: isLastSlide ? "0 0 8px rgba(245,197,24,0.7)" : "none",
            }}
          />
        </div>

        {/* Main card */}
        <div
          style={{
            position: "relative",
            zIndex: 6,
            width: "100%",
            maxWidth: 520,
            margin: "20px",
            textAlign: "center",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(245,197,24,0.4)",
            borderRadius: 24,
            boxShadow:
              "0 0 80px rgba(245,197,24,0.12), 0 0 160px rgba(245,197,24,0.05), inset 0 0 50px rgba(245,197,24,0.03)",
            overflow: "hidden",
          }}
        >
          {/* Per-slide progress bar */}
          {!isLastSlide && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "rgba(245,197,24,0.12)",
                zIndex: 10,
              }}
            >
              <div
                key={slide}
                style={{
                  height: "100%",
                  background: "#f5c518",
                  boxShadow:
                    "0 0 8px rgba(245,197,24,0.9), 0 0 16px rgba(245,197,24,0.4)",
                  borderRadius: 2,
                  animation: `slideTimer ${AUTO_ADVANCE_MS}ms linear forwards`,
                }}
              />
            </div>
          )}

          <div style={{ padding: "48px 44px 40px" }}>
            {!isLastSlide ? (
              /* ── Feature slide ── */
              <div style={cardAnim}>
                {/* Glowing icon ring */}
                <div
                  style={{
                    width: 96,
                    height: 96,
                    margin: "0 auto 28px",
                    borderRadius: "50%",
                    background: "rgba(245,197,24,0.07)",
                    border: "1.5px solid rgba(245,197,24,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 0 30px rgba(245,197,24,0.3), inset 0 0 20px rgba(245,197,24,0.05)",
                    animation: "float 3.5s ease-in-out infinite",
                    position: "relative",
                  }}
                >
                  {/* outer pulse ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: -12,
                      borderRadius: "50%",
                      border: "1px solid rgba(245,197,24,0.2)",
                      animation: "radarPulse 2.8s ease-out infinite",
                    }}
                  />
                  {currentSlideData.icon}
                </div>

                <h1
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 900,
                    color: "#f5c518",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    textShadow:
                      "0 0 40px rgba(245,197,24,0.7), 0 0 80px rgba(245,197,24,0.3)",
                  }}
                >
                  {currentSlideData.title}
                </h1>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(245,197,24,0.7)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 20,
                  }}
                >
                  {currentSlideData.subtitle}
                </p>

                <div
                  style={{
                    width: 80,
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, rgba(245,197,24,0.7), transparent)",
                    margin: "0 auto 22px",
                  }}
                />

                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "0.96rem",
                    lineHeight: 1.75,
                    marginBottom: 28,
                    fontWeight: 400,
                  }}
                >
                  {currentSlideData.description}
                </p>

                {/* Stat badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 18px",
                    background: "rgba(245,197,24,0.08)",
                    border: "1px solid rgba(245,197,24,0.3)",
                    borderRadius: 999,
                    marginBottom: 36,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#f5c518",
                      boxShadow: "0 0 8px #f5c518",
                      animation: "glowPulse 1.8s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(245,197,24,0.85)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {currentSlideData.stat}
                  </span>
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {slide > 0 && (
                    <button
                      type="button"
                      onClick={() => goToSlide(slide - 1)}
                      style={{
                        flex: 1,
                        padding: "13px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        background: "transparent",
                        color: "rgba(245,197,24,0.7)",
                        border: "1px solid rgba(245,197,24,0.3)",
                        borderRadius: 12,
                        fontFamily: "Poppins, sans-serif",
                        transition: "all 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(245,197,24,0.7)";
                        e.currentTarget.style.color = "#f5c518";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(245,197,24,0.3)";
                        e.currentTarget.style.color = "rgba(245,197,24,0.7)";
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => goToSlide(slide + 1)}
                    style={{
                      flex: 2,
                      padding: "13px",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      background: "linear-gradient(135deg, #f5c518, #d4a017)",
                      color: "#0a0a0a",
                      border: "none",
                      borderRadius: 12,
                      fontFamily: "Poppins, sans-serif",
                      transition: "all 0.25s",
                      boxShadow: "0 0 25px rgba(245,197,24,0.45)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 45px rgba(245,197,24,0.7)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(245,197,24,0.45)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {slide === SLIDES.length - 1 ? "Get Started →" : "Next →"}
                  </button>
                </div>

                {/* Skip to API */}
                {slide < SLIDES.length - 1 && (
                  <button
                    type="button"
                    onClick={() => goToSlide(SLIDES.length)}
                    style={{
                      marginTop: 16,
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.28)",
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.06em",
                      textDecoration: "underline",
                      textDecorationColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    skip intro
                  </button>
                )}
              </div>
            ) : (
              /* ── API Key slide ── */
              <div style={cardAnim}>
                {/* Logo */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    margin: "0 auto 22px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f5c518, #d4a017)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "float 3.5s ease-in-out infinite",
                    boxShadow:
                      "0 0 40px rgba(245,197,24,0.7), 0 0 80px rgba(245,197,24,0.3)",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0a0a0a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                  </svg>
                </div>

                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 900,
                    color: "#f5c518",
                    marginBottom: 6,
                    letterSpacing: "-0.02em",
                    textShadow: "0 0 40px rgba(245,197,24,0.8)",
                  }}
                >
                  Activate System
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.85rem",
                    marginBottom: 24,
                    lineHeight: 1.6,
                  }}
                >
                  Paste your API key below to unlock MedAI Nexus
                </p>

                {/* System status row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 24,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "Neural Core", color: "#4ade80" },
                    { label: "Diagnostic DB", color: "#f5c518" },
                    { label: "AI Engine", color: "#4ade80" },
                  ].map(({ label, color }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 999,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: color,
                          boxShadow: `0 0 7px ${color}`,
                          animation: "glowPulse 1.8s ease-in-out infinite",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.62rem",
                          color: "rgba(255,255,255,0.6)",
                          letterSpacing: "0.06em",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* API input */}
                <div style={{ position: "relative", marginBottom: 10 }}>
                  <input
                    data-ocid="activation.input"
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleActivate()}
                    placeholder="Paste your API key here"
                    style={{
                      width: "100%",
                      padding: "15px 52px 15px 18px",
                      borderRadius: 14,
                      background: "rgba(245,197,24,0.05)",
                      border: "1px solid rgba(245,197,24,0.35)",
                      color: "#f5f5f5",
                      fontSize: "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                      transition: "all 0.3s",
                      boxSizing: "border-box",
                      letterSpacing: showKey ? "0.02em" : "0.1em",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(245,197,24,0.85)";
                      e.target.style.boxShadow =
                        "0 0 25px rgba(245,197,24,0.2)";
                      e.target.style.background = "rgba(245,197,24,0.09)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(245,197,24,0.35)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(245,197,24,0.05)";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(245,197,24,0.55)",
                      padding: 4,
                      lineHeight: 1,
                    }}
                    aria-label={showKey ? "Hide API key" : "Show API key"}
                  >
                    {showKey ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {error && (
                  <p
                    data-ocid="activation.error_state"
                    style={{
                      color: "#ff6b6b",
                      fontSize: "0.82rem",
                      marginBottom: 12,
                      animation: "fadeIn 0.3s ease",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span>⚠</span> {error}
                  </p>
                )}

                {/* Activate button */}
                <button
                  type="button"
                  data-ocid="activation.primary_button"
                  onClick={handleActivate}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 8,
                    cursor: loading ? "not-allowed" : "pointer",
                    background: loading
                      ? "rgba(245,197,24,0.3)"
                      : "linear-gradient(135deg, #f5c518, #d4a017)",
                    color: loading ? "rgba(245,197,24,0.7)" : "#0a0a0a",
                    border: "none",
                    borderRadius: 14,
                    fontFamily: "Poppins, sans-serif",
                    transition: "all 0.3s",
                    boxShadow: loading
                      ? "none"
                      : "0 0 30px rgba(245,197,24,0.5)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow =
                        "0 0 50px rgba(245,197,24,0.7)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = loading
                      ? "none"
                      : "0 0 30px rgba(245,197,24,0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.6rem",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                        style={{ animation: "spinSlow 1s linear infinite" }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Initializing... {progress}%
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Launch MedAI Nexus
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </button>

                {loading && (
                  <div
                    style={{
                      marginTop: 14,
                      height: 3,
                      background: "rgba(245,197,24,0.1)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #d4a017, #f5c518)",
                        boxShadow: "0 0 10px rgba(245,197,24,0.9)",
                        transition: "width 0.05s linear",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                )}

                {/* Back link */}
                <button
                  type="button"
                  onClick={() => goToSlide(SLIDES.length - 1)}
                  style={{
                    marginTop: 16,
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "0.06em",
                    textDecoration: "underline",
                    textDecorationColor: "rgba(255,255,255,0.12)",
                  }}
                >
                  ← back to overview
                </button>

                <p
                  style={{
                    color: "rgba(255,255,255,0.18)",
                    fontSize: "0.65rem",
                    marginTop: 12,
                  }}
                >
                  Stored in browser memory only — never transmitted
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
