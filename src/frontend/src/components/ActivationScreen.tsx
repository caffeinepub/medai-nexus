import { useEffect, useRef, useState } from "react";
import AdminPage from "./AdminPage";

interface Props {
  onActivate: (key: string) => void;
}

const SYMPTOM_DOTS = Array.from({ length: 18 }, (_, i) => ({
  id: `sdot-${i}`,
  delay: i * 0.1,
}));
const SLIDES = [
  {
    num: "01",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4E7AB1"
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
    num: "02",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4E7AB1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
    title: "Built By",
    subtitle: "The Minds Behind MedAI Nexus",
    description:
      "Deekshith Kumar — Design & Prompt Engineering. Advaith Sreejith — Prototype & Main Project Development. Two innovators building the future of AI-driven diagnostics.",
    stat: "Deekshith Kumar · Advaith Sreejith",
  },
  {
    num: "03",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4E7AB1"
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
    num: "04",
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4E7AB1"
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

type SlideState = "idle" | "exiting" | "entering";

export default function ActivationScreen({ onActivate }: Props) {
  const [slide, setSlide] = useState(0);
  const [slideState, setSlideState] = useState<SlideState>("idle");
  const transitioning = useRef(false);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showKey, setShowKey] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isLastSlide = slide === SLIDES.length;

  // Live feedback stats from localStorage
  const feedbackStats = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem("medai_feedback") || "[]");
      if (!Array.isArray(stored) || stored.length === 0) return null;
      const avg =
        stored.reduce((s: number, f: { rating: number }) => s + f.rating, 0) /
        stored.length;
      return { count: stored.length, avg: avg.toFixed(1) };
    } catch {
      return null;
    }
  })();

  // Particle canvas — light with soft Cyan Azure particles
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

    const COLORS = [
      "rgba(131,135,195,",
      "rgba(149,187,181,",
      "rgba(131,135,195,",
      "rgba(131,135,195,",
    ];
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 0.4,
      colorIdx: Math.floor(Math.random() * COLORS.length),
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
        ctx.fillStyle = `${COLORS[p.colorIdx]}0.5)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `${COLORS[p.colorIdx]}0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${COLORS[a.colorIdx]}${0.06 * (1 - dist / 90)})`;
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

  const skipToEnd = () => {
    if (isLastSlide) return;
    transitioning.current = false;
    setSlide(SLIDES.length);
    setSlideState("idle");
  };

  const handleActivate = async () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setError("API Key Required to Initialize System");
      return;
    }
    // Admin PIN check
    if (trimmed === "dickyaddu@admin2026") {
      setShowAdmin(true);
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("API Key must contain only letters, numbers, and underscores");
      return;
    }
    if (trimmed.length > 40) {
      setError("API Key must be 40 characters or less");
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

  const getSlideStyle = (): React.CSSProperties => {
    if (slideState === "exiting") {
      return {
        animation: "slide3dOut 0.62s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      };
    }
    if (slideState === "entering") {
      return {
        animation: "slide3dIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      };
    }
    return { opacity: 1, transform: "translateX(0) rotateY(0deg)" };
  };

  const isActive = slideState === "idle";

  if (showAdmin) {
    return (
      <AdminPage alreadyAuthenticated onClose={() => setShowAdmin(false)} />
    );
  }

  return (
    <>
      <style>{`
        @keyframes slide3dOut {
          from { opacity: 1; transform: translateX(0) rotateY(0deg); }
          to   { opacity: 0; transform: translateX(-90px) rotateY(-38deg) scale(0.94); }
        }
        @keyframes slide3dIn {
          from { opacity: 0; transform: translateX(90px) rotateY(38deg) scale(0.94); }
          to   { opacity: 1; transform: translateX(0) rotateY(0deg) scale(1); }
        }
        @keyframes scanLine {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @keyframes glowBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes drawLine {
          from { width: 0%; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        @keyframes bgNumFloat {
          0%, 100% { transform: translateY(0px) skewX(-2deg); }
          50% { transform: translateY(-14px) skewX(2deg); }
        }
        @keyframes statPulse {
          0%, 100% { box-shadow: 0 0 14px rgba(131,135,195,0.25), 0 0 30px rgba(131,135,195,0.1); }
          50% { box-shadow: 0 0 28px rgba(131,135,195,0.45), 0 0 55px rgba(149,187,181,0.2); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dotLight {
          0%, 100% { background: rgba(131,135,195,0.18); box-shadow: none; }
          50% { background: #4E7AB1; box-shadow: 0 0 8px rgba(78,122,177,0.5); }
        }
        @keyframes cardSlideLeft {
          from { opacity: 0; transform: translateX(-40px) rotateY(15deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0); }
        }
        @keyframes cardSlideRight {
          from { opacity: 0; transform: translateX(40px) rotateY(-15deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes shieldPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(131,135,195,0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(131,135,195,0.8)) drop-shadow(0 0 35px rgba(149,187,181,0.4)); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideTextIn1 {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideTextIn2 {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideTextIn3 {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-title { animation: slideTextIn1 0.55s cubic-bezier(0.4,0,0.2,1) 0.08s both; }
        .slide-sub { animation: slideTextIn2 0.55s cubic-bezier(0.4,0,0.2,1) 0.2s both; }
        .slide-desc { animation: slideTextIn3 0.55s cubic-bezier(0.4,0,0.2,1) 0.34s both; }
        .slide-stat { animation: slideTextIn3 0.55s cubic-bezier(0.4,0,0.2,1) 0.46s both; }
        .draw-line { animation: drawLine 0.7s cubic-bezier(0.4,0,0.2,1) 0.28s both; }
        .creator-left { animation: cardSlideLeft 0.65s cubic-bezier(0.23,1,0.32,1) 0.15s both; }
        .creator-right { animation: cardSlideRight 0.65s cubic-bezier(0.23,1,0.32,1) 0.3s both; }
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
          background:
            "linear-gradient(135deg, #f8f9ff 0%, #eef3ff 60%, #f0f8f8 100%)",
        }}
      >
        {/* Light grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(78,122,177,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(78,122,177,0.05) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Radial glow center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vmax",
            height: "60vmax",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(78,122,177,0.1) 0%, rgba(78,122,177,0.07) 40%, transparent 70%)",
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
              "linear-gradient(90deg, transparent 0%, rgba(78,122,177,0.0) 15%, rgba(78,122,177,0.5) 50%, rgba(78,122,177,0.0) 85%, transparent 100%)",
            animation: "scanLine 5.5s linear infinite",
            zIndex: 3,
            boxShadow: "0 0 22px rgba(78,122,177,0.2)",
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
                width: 38,
                height: 38,
                borderTop:
                  v === "top" ? "2px solid rgba(78,122,177,0.3)" : "none",
                borderBottom:
                  v === "bottom" ? "2px solid rgba(78,122,177,0.3)" : "none",
                borderLeft:
                  h === "left" ? "2px solid rgba(78,122,177,0.3)" : "none",
                borderRight:
                  h === "right" ? "2px solid rgba(78,122,177,0.3)" : "none",
                zIndex: 4,
                pointerEvents: "none",
                filter: "drop-shadow(0 0 6px rgba(78,122,177,0.15))",
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
            color: "rgba(78,122,177,0.7)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            zIndex: 5,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          ◈ MEDAI NEXUS — SECURE ACCESS ◈
        </div>

        {/* Skip credits button */}
        {!isLastSlide && (
          <button
            type="button"
            onClick={skipToEnd}
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              zIndex: 10,
              background: "rgba(78,122,177,0.08)",
              border: "1px solid rgba(78,122,177,0.22)",
              borderRadius: 20,
              color: "#4E7AB1",
              fontSize: 12,
              fontFamily: "Poppins, Inter, sans-serif",
              letterSpacing: "0.08em",
              padding: "5px 14px",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
              opacity: 0.75,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(78,122,177,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.75";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(78,122,177,0.08)";
            }}
          >
            Skip ›
          </button>
        )}

        {/* Step dots */}
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
                width: i === slide && !isLastSlide ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background:
                  i === slide && !isLastSlide
                    ? "#8387C3"
                    : "rgba(78,122,177,0.18)",
                transition: "all 0.3s ease",
                boxShadow:
                  i === slide && !isLastSlide
                    ? "0 0 10px rgba(78,122,177,0.4)"
                    : "none",
              }}
            />
          ))}
          <div
            style={{
              width: isLastSlide ? 22 : 7,
              height: 7,
              borderRadius: 4,
              background: isLastSlide ? "#95BBB5" : "rgba(149,187,181,0.25)",
              transition: "all 0.3s ease",
              boxShadow: isLastSlide
                ? "0 0 10px rgba(149,187,181,0.8)"
                : "none",
            }}
          />
        </div>

        {/* Main card */}
        <div
          className="slide-card-glossy"
          style={{
            position: "relative",
            zIndex: 6,
            width: "100%",
            maxWidth: 560,
            margin: "20px",
            textAlign: "center",
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
            border: "1px solid rgba(78,122,177,0.18)",
            borderRadius: 24,
            boxShadow:
              "0 8px 48px rgba(16,40,83,0.1), 0 2px 16px rgba(78,122,177,0.1), inset 0 1px 0 rgba(215,182,212,0.2)",
            overflow: "hidden",
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          <div style={{ padding: "48px 44px 40px" }}>
            {!isLastSlide ? (
              /* ── Feature slide ── */
              <div
                style={{
                  ...getSlideStyle(),
                  transformStyle: "preserve-3d",
                }}
                key={`slide-wrapper-${slide}`}
              >
                {/* Big decorative bg number */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "22rem",
                    fontWeight: 900,
                    color: "rgba(78,122,177,0.04)",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    animation: "bgNumFloat 8s ease-in-out infinite",
                    fontFamily: "Poppins, sans-serif",
                    zIndex: 0,
                  }}
                >
                  {currentSlideData.num}
                </div>

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Icon ring */}
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      margin: "0 auto 32px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(78,122,177,0.07) 0%, rgba(78,122,177,0.12) 60%, transparent 100%)",
                      border: "1.5px solid rgba(78,122,177,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 0 24px rgba(78,122,177,0.1), 0 0 12px rgba(125,191,192,0.08)",
                      animation: isActive
                        ? "floatIcon 3.8s ease-in-out infinite"
                        : "none",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: -14,
                        borderRadius: "50%",
                        border: "1px solid rgba(78,122,177,0.18)",
                        animation: isActive
                          ? "pulseRing 2.6s ease-out infinite"
                          : "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: -28,
                        borderRadius: "50%",
                        border: "1px solid rgba(78,122,177,0.12)",
                        animation: isActive
                          ? "pulseRing 2.6s ease-out 0.9s infinite"
                          : "none",
                      }}
                    />
                    {currentSlideData.icon}
                  </div>

                  {/* Draw line */}
                  <div
                    className="draw-line"
                    key={`line-${slide}`}
                    style={{
                      height: 2,
                      background:
                        "linear-gradient(90deg, transparent, #4E7AB1 40%, #7DBFC0 60%, transparent)",
                      borderRadius: 2,
                      marginBottom: 20,
                      boxShadow:
                        "0 0 12px rgba(78,122,177,0.2), 0 0 6px rgba(125,191,192,0.15)",
                    }}
                  />

                  {/* Slide 01: Symptom dots grid animation */}
                  {slide === 0 && isActive && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 5,
                        marginBottom: 16,
                        flexWrap: "wrap",
                        maxWidth: 220,
                        margin: "0 auto 18px",
                      }}
                    >
                      {SYMPTOM_DOTS.map((dot) => (
                        <div
                          key={dot.id}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            animation: `dotLight 1.8s ease-in-out ${dot.delay}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Slide 01: Pulsing cross */}
                  {slide === 0 && isActive && (
                    <div
                      style={{
                        display: "inline-block",
                        marginBottom: 14,
                        animation: "shieldPulse 2.2s ease-in-out infinite",
                      }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4E7AB1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2z" />
                      </svg>
                    </div>
                  )}

                  {/* Slide 01: symptom counter */}
                  {slide === 0 && (
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(78,122,177,0.6)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: 8,
                        animation:
                          "countUp 0.7s cubic-bezier(0.23,1,0.32,1) 0.6s both",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 900,
                          color: "#4E7AB1",
                          textShadow: "0 0 20px rgba(131,135,195,0.5)",
                          marginRight: 6,
                        }}
                      >
                        264
                      </span>
                      Symptoms Analyzed
                    </p>
                  )}

                  {/* Title */}
                  <h1
                    className="slide-title"
                    key={`title-${slide}`}
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "#102853",
                      marginBottom: 8,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    {currentSlideData.title}
                  </h1>
                  <p
                    className="slide-sub"
                    key={`sub-${slide}`}
                    style={{
                      fontSize: "0.78rem",
                      color: "#506980",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 22,
                    }}
                  >
                    {currentSlideData.subtitle}
                  </p>

                  {/* Slide 02: Creator cards */}
                  {slide === 1 ? (
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        marginBottom: 28,
                        perspective: "600px",
                      }}
                    >
                      <div
                        className="creator-left"
                        style={{
                          flex: 1,
                          padding: "18px 14px",
                          background: "rgba(78,122,177,0.06)",
                          border: "1px solid rgba(78,122,177,0.18)",
                          borderRadius: 14,
                          boxShadow: "0 0 12px rgba(78,122,177,0.08)",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 12px rgba(78,122,177,0.2)",
                            fontSize: "1rem",
                            fontWeight: 800,
                            color: "#fff",
                          }}
                        >
                          D
                        </div>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "#102853",
                            marginBottom: 4,
                          }}
                        >
                          Deekshith Kumar
                        </div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            color: "rgba(78,122,177,0.6)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          Design & Prompt Engineering
                        </div>
                      </div>
                      <div
                        className="creator-right"
                        style={{
                          flex: 1,
                          padding: "18px 14px",
                          background: "rgba(125,191,192,0.08)",
                          border: "1px solid rgba(78,122,177,0.18)",
                          borderRadius: 14,
                          boxShadow: "0 0 12px rgba(125,191,192,0.1)",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #7DBFC0, #4E7AB1)",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 12px rgba(125,191,192,0.25)",
                            fontSize: "1rem",
                            fontWeight: 800,
                            color: "#fff",
                          }}
                        >
                          A
                        </div>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "#102853",
                            marginBottom: 4,
                          }}
                        >
                          Advaith Sreejith
                        </div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            color: "#506980",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          Prototype & Main Development
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="slide-desc"
                      key={`desc-${slide}`}
                      style={{
                        color: "#7a95aa",
                        fontSize: "0.96rem",
                        lineHeight: 1.8,
                        marginBottom: 28,
                        fontWeight: 400,
                      }}
                    >
                      {currentSlideData.description}
                    </p>
                  )}

                  {/* Stat badge */}
                  <div
                    className="slide-stat"
                    key={`stat-${slide}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 20px",
                      background: "rgba(78,122,177,0.07)",
                      border: "1px solid rgba(78,122,177,0.18)",
                      borderRadius: 999,
                      marginBottom: 32,
                      animation: isActive
                        ? "statPulse 2.2s ease-in-out infinite"
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#4E7AB1",
                        boxShadow: "0 0 10px rgba(78,122,177,0.4)",
                        animation: isActive
                          ? "glowBlink 1.6s ease-in-out infinite"
                          : "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#4E7AB1",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {currentSlideData.stat}
                    </span>
                  </div>

                  {/* Feedback stats badge - shown on slide 0 when feedback exists */}
                  {slide === 0 && feedbackStats && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "7px 16px",
                        background: "rgba(78,122,177,0.08)",
                        border: "1px solid rgba(78,122,177,0.18)",
                        borderRadius: 999,
                        marginBottom: 16,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#7DBFC0",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <span style={{ color: "#D7B6D4", fontSize: "0.85rem" }}>
                        ★
                      </span>
                      {feedbackStats.avg}/5 from {feedbackStats.count} user
                      {feedbackStats.count !== 1 ? "s" : ""}
                    </div>
                  )}

                  {/* Next button */}
                  <button
                    type="button"
                    data-ocid="activation.next_button"
                    onClick={() => {
                      if (transitioning.current) return;
                      const next = slide < SLIDES.length ? slide + 1 : slide;
                      transitioning.current = true;
                      setSlideState("exiting");
                      setTimeout(() => {
                        setSlide(next);
                        setSlideState("entering");
                        setTimeout(() => {
                          setSlideState("idle");
                          transitioning.current = false;
                        }, 700);
                      }, 620);
                    }}
                    style={{
                      marginTop: 16,
                      padding: "12px 36px",
                      background: "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.06em",
                      boxShadow: "0 4px 16px rgba(78,122,177,0.25)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              /* ── API Key slide ── */
              <div
                style={{
                  ...getSlideStyle(),
                  transformStyle: "preserve-3d",
                }}
                key="api-slide"
              >
                {/* Shield icon with pulse */}
                <div
                  style={{
                    width: 76,
                    height: 76,
                    margin: "0 auto 22px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4E7AB1, #7DBFC0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation:
                      "floatIcon 3.5s ease-in-out infinite, shieldPulse 2.5s ease-in-out infinite",
                    boxShadow:
                      "0 0 32px rgba(78,122,177,0.25), 0 0 60px rgba(78,122,177,0.12)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -12,
                      borderRadius: "50%",
                      border: "1px solid rgba(78,122,177,0.18)",
                      animation: "pulseRing 2.4s ease-out infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: -24,
                      borderRadius: "50%",
                      border: "1px solid rgba(78,122,177,0.1)",
                      animation: "pulseRing 2.4s ease-out 0.8s infinite",
                    }}
                  />
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>

                {/* Draw line */}
                <div
                  className="draw-line"
                  key="api-line"
                  style={{
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, #4E7AB1 40%, #7DBFC0 60%, transparent)",
                    borderRadius: 2,
                    marginBottom: 18,
                    boxShadow:
                      "0 0 12px rgba(78,122,177,0.2), 0 0 6px rgba(125,191,192,0.15)",
                  }}
                />

                {/* Typewriter */}
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    margin: "0 auto 10px",
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      color: "rgba(131,135,195,0.65)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      display: "inline-block",
                      overflow: "hidden",
                      borderRight: "2px solid rgba(131,135,195,0.6)",
                      whiteSpace: "nowrap",
                      animation:
                        "typewriter 1.8s steps(22) 0.2s both, glowBlink 0.8s step-end infinite",
                      width: 0,
                    }}
                  >
                    SYSTEM INITIALIZATION
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: "#102853",
                    marginBottom: 6,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Activate System
                </h2>
                <p
                  style={{
                    color: "rgba(200,216,232,0.8)",
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
                    { label: "Neural Core", color: "#2d8a55" },
                    { label: "Diagnostic DB", color: "#4E7AB1" },
                    { label: "AI Engine", color: "#2d8a55" },
                  ].map(({ label, color }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "5px 12px",
                        background: "rgba(78,122,177,0.05)",
                        border: "1px solid rgba(131,135,195,0.18)",
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
                          animation: "glowBlink 1.8s ease-in-out infinite",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.62rem",
                          color: "#7a95aa",
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
                      background: "rgba(125,191,192,0.07)",
                      border: "1px solid rgba(78,122,177,0.18)",
                      color: "#102853",
                      fontSize: "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                      transition: "all 0.3s",
                      boxSizing: "border-box",
                      letterSpacing: showKey ? "0.02em" : "0.1em",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(78,122,177,0.6)";
                      e.target.style.boxShadow =
                        "0 0 20px rgba(78,122,177,0.1), 0 0 6px rgba(78,122,177,0.08)";
                      e.target.style.background = "rgba(78,122,177,0.07)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(78,122,177,0.18)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(78,122,177,0.04)";
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
                      color: "rgba(78,122,177,0.4)",
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
                      color: "#b03030",
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
                      ? "rgba(78,122,177,0.15)"
                      : "linear-gradient(135deg, #4E7AB1 0%, #7DBFC0 50%, #3a6090 100%)",
                    color: loading ? "#7a95aa" : "#fff",
                    border: "none",
                    borderRadius: 14,
                    fontFamily: "Poppins, sans-serif",
                    transition: "all 0.3s",
                    boxShadow: loading
                      ? "none"
                      : "0 4px 20px rgba(78,122,177,0.3), 0 2px 10px rgba(78,122,177,0.18)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow =
                        "0 6px 28px rgba(78,122,177,0.4), 0 2px 12px rgba(125,191,192,0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = loading
                      ? "none"
                      : "0 4px 16px rgba(78,122,177,0.25)";
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
                      background: "rgba(78,122,177,0.1)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background:
                          "linear-gradient(90deg, #4E7AB1, #7DBFC0, #3a6090)",
                        boxShadow:
                          "0 0 10px rgba(78,122,177,0.4), 0 0 5px rgba(125,191,192,0.25)",
                        transition: "width 0.05s linear",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                )}

                <p
                  style={{
                    color: "#7a95aa",
                    fontSize: "0.65rem",
                    marginTop: 14,
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
