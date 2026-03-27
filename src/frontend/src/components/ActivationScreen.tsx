import { useEffect, useRef, useState } from "react";

interface Props {
  onActivate: (key: string) => void;
}

const VALID_KEY = "AIzaSyAeYSZuSR6wbSApVmDEMX7AOvFlRJ774tU";
const AUTO_ADVANCE_MS = 5000;

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
        stroke="#cc0000"
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
        stroke="#cc0000"
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
        stroke="#cc0000"
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
        stroke="#cc0000"
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isLastSlide = slide === SLIDES.length;

  // Particle canvas — dark-blue bg with red + gold particles
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
      "rgba(204,0,0,",
      "rgba(245,197,24,",
      "rgba(184,134,11,",
      "rgba(204,0,0,",
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
        ctx.fillStyle = `${COLORS[p.colorIdx]}0.65)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${COLORS[p.colorIdx]}0.9)`;
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
            ctx.strokeStyle = `${COLORS[a.colorIdx]}${0.08 * (1 - dist / 90)})`;
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
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [slide, isLastSlide]);

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

  // 3D slide transition styles
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
        @keyframes slideTimer {
          from { width: 0% }
          to { width: 100% }
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
          0% { transform: scale(1); opacity: 0.7; }
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
          0%, 100% { box-shadow: 0 0 14px rgba(245,197,24,0.4), 0 0 30px rgba(245,197,24,0.15); }
          50% { box-shadow: 0 0 28px rgba(245,197,24,0.75), 0 0 55px rgba(204,0,0,0.3); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dotLight {
          0%, 100% { background: rgba(184,134,11,0.2); box-shadow: none; }
          50% { background: #f5c518; box-shadow: 0 0 8px rgba(245,197,24,0.9); }
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
          0%, 100% { filter: drop-shadow(0 0 8px rgba(204,0,0,0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(245,197,24,0.8)) drop-shadow(0 0 35px rgba(204,0,0,0.5)); }
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
        .draw-line {
          animation: drawLine 0.7s cubic-bezier(0.4,0,0.2,1) 0.28s both;
        }
        .creator-left {
          animation: cardSlideLeft 0.65s cubic-bezier(0.23,1,0.32,1) 0.15s both;
        }
        .creator-right {
          animation: cardSlideRight 0.65s cubic-bezier(0.23,1,0.32,1) 0.3s both;
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
          background: "#0a0f2e",
        }}
      >
        {/* Dark-blue grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(184,134,11,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(184,134,11,0.05) 1px, transparent 1px)",
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
              "radial-gradient(circle, rgba(204,0,0,0.07) 0%, rgba(184,134,11,0.04) 40%, transparent 70%)",
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
              "linear-gradient(90deg, transparent 0%, rgba(245,197,24,0.0) 15%, rgba(245,197,24,0.85) 50%, rgba(245,197,24,0.0) 85%, transparent 100%)",
            animation: "scanLine 5.5s linear infinite",
            zIndex: 3,
            boxShadow: "0 0 22px rgba(245,197,24,0.5)",
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
                  v === "top" ? "2px solid rgba(184,134,11,0.6)" : "none",
                borderBottom:
                  v === "bottom" ? "2px solid rgba(184,134,11,0.6)" : "none",
                borderLeft:
                  h === "left" ? "2px solid rgba(184,134,11,0.6)" : "none",
                borderRight:
                  h === "right" ? "2px solid rgba(184,134,11,0.6)" : "none",
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
            color: "rgba(245,197,24,0.65)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            zIndex: 5,
            pointerEvents: "none",
            textShadow: "0 0 12px rgba(245,197,24,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          ◈ MEDAI NEXUS — SECURE ACCESS ◈
        </div>

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
                    ? "#f5c518"
                    : "rgba(245,197,24,0.2)",
                transition: "all 0.3s ease",
                boxShadow:
                  i === slide && !isLastSlide
                    ? "0 0 10px rgba(245,197,24,0.9)"
                    : "none",
              }}
            />
          ))}
          <div
            style={{
              width: isLastSlide ? 22 : 7,
              height: 7,
              borderRadius: 4,
              background: isLastSlide ? "#cc0000" : "rgba(204,0,0,0.25)",
              transition: "all 0.3s ease",
              boxShadow: isLastSlide ? "0 0 10px rgba(204,0,0,0.9)" : "none",
            }}
          />
        </div>

        {/* Main card */}
        <div
          style={{
            position: "relative",
            zIndex: 6,
            width: "100%",
            maxWidth: 560,
            margin: "20px",
            textAlign: "center",
            background: "rgba(8,12,36,0.78)",
            backdropFilter: "blur(36px)",
            WebkitBackdropFilter: "blur(36px)",
            border: "1px solid rgba(184,134,11,0.45)",
            borderRadius: 24,
            boxShadow:
              "0 0 80px rgba(204,0,0,0.1), 0 0 40px rgba(184,134,11,0.08), inset 0 0 50px rgba(10,15,46,0.5)",
            overflow: "hidden",
            perspective: "1200px",
            transformStyle: "preserve-3d",
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
                height: 3,
                background: "rgba(184,134,11,0.12)",
                zIndex: 10,
              }}
            >
              <div
                key={slide}
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #cc0000, #f5c518, #b8860b)",
                  boxShadow:
                    "0 0 10px rgba(245,197,24,0.8), 0 0 20px rgba(204,0,0,0.4)",
                  borderRadius: 2,
                  animation: `slideTimer ${AUTO_ADVANCE_MS}ms linear forwards`,
                }}
              />
            </div>
          )}

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
                    color: "rgba(184,134,11,0.04)",
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
                        "radial-gradient(circle, rgba(204,0,0,0.1) 0%, rgba(184,134,11,0.08) 60%, transparent 100%)",
                      border: "1.5px solid rgba(204,0,0,0.55)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 0 35px rgba(204,0,0,0.3), 0 0 18px rgba(245,197,24,0.15), inset 0 0 20px rgba(204,0,0,0.06)",
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
                        border: "1px solid rgba(245,197,24,0.3)",
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
                        border: "1px solid rgba(204,0,0,0.15)",
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
                        "linear-gradient(90deg, transparent, #cc0000 40%, #f5c518 60%, transparent)",
                      borderRadius: 2,
                      marginBottom: 20,
                      boxShadow:
                        "0 0 12px rgba(204,0,0,0.6), 0 0 6px rgba(245,197,24,0.4)",
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
                        stroke="#cc0000"
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
                        color: "rgba(245,197,24,0.7)",
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
                          color: "#f5c518",
                          textShadow: "0 0 20px rgba(245,197,24,0.8)",
                          marginRight: 6,
                        }}
                      >
                        264
                      </span>
                      Symptoms Analyzed
                    </p>
                  )}

                  {/* Slide 01: text reveal */}
                  <h1
                    className="slide-title"
                    key={`title-${slide}`}
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "#cc0000",
                      marginBottom: 8,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      textShadow:
                        "0 0 40px rgba(204,0,0,0.7), 0 0 80px rgba(204,0,0,0.3)",
                    }}
                  >
                    {currentSlideData.title}
                  </h1>
                  <p
                    className="slide-sub"
                    key={`sub-${slide}`}
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(245,197,24,0.8)",
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
                          background: "rgba(204,0,0,0.08)",
                          border: "1px solid rgba(204,0,0,0.45)",
                          borderRadius: 14,
                          boxShadow: "0 0 20px rgba(204,0,0,0.2)",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #cc0000, #8b0000)",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 15px rgba(204,0,0,0.5)",
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
                            color: "#fff",
                            marginBottom: 4,
                          }}
                        >
                          Deekshith Kumar
                        </div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            color: "rgba(245,197,24,0.7)",
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
                          background: "rgba(245,197,24,0.06)",
                          border: "1px solid rgba(245,197,24,0.4)",
                          borderRadius: 14,
                          boxShadow: "0 0 20px rgba(245,197,24,0.15)",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #f5c518, #b8860b)",
                            margin: "0 auto 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 15px rgba(245,197,24,0.5)",
                            fontSize: "1rem",
                            fontWeight: 800,
                            color: "#0a0f2e",
                          }}
                        >
                          A
                        </div>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                          }}
                        >
                          Advaith Sreejith
                        </div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            color: "rgba(245,197,24,0.7)",
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
                        color: "rgba(255,255,255,0.72)",
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
                      background: "rgba(245,197,24,0.07)",
                      border: "1px solid rgba(245,197,24,0.35)",
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
                        background: "#f5c518",
                        boxShadow: "0 0 10px #f5c518",
                        animation: isActive
                          ? "glowBlink 1.6s ease-in-out infinite"
                          : "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(245,197,24,0.9)",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {currentSlideData.stat}
                    </span>
                  </div>
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
                    background: "linear-gradient(135deg, #cc0000, #8b0000)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation:
                      "floatIcon 3.5s ease-in-out infinite, shieldPulse 2.5s ease-in-out infinite",
                    boxShadow:
                      "0 0 40px rgba(204,0,0,0.6), 0 0 80px rgba(204,0,0,0.3)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -12,
                      borderRadius: "50%",
                      border: "1px solid rgba(245,197,24,0.35)",
                      animation: "pulseRing 2.4s ease-out infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: -24,
                      borderRadius: "50%",
                      border: "1px solid rgba(204,0,0,0.2)",
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
                      "linear-gradient(90deg, transparent, #cc0000 40%, #f5c518 60%, transparent)",
                    borderRadius: 2,
                    marginBottom: 18,
                    boxShadow:
                      "0 0 12px rgba(204,0,0,0.6), 0 0 6px rgba(245,197,24,0.4)",
                  }}
                />

                {/* Typewriter SYSTEM INITIALIZATION */}
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
                      color: "rgba(245,197,24,0.7)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      display: "inline-block",
                      overflow: "hidden",
                      borderRight: "2px solid rgba(245,197,24,0.7)",
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
                    color: "#cc0000",
                    marginBottom: 6,
                    letterSpacing: "-0.02em",
                    textShadow: "0 0 40px rgba(204,0,0,0.8)",
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
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(184,134,11,0.2)",
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
                      background: "rgba(184,134,11,0.06)",
                      border: "1px solid rgba(184,134,11,0.4)",
                      color: "#f5f5f5",
                      fontSize: "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                      transition: "all 0.3s",
                      boxSizing: "border-box",
                      letterSpacing: showKey ? "0.02em" : "0.1em",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(245,197,24,0.8)";
                      e.target.style.boxShadow =
                        "0 0 25px rgba(245,197,24,0.2), 0 0 8px rgba(204,0,0,0.15)";
                      e.target.style.background = "rgba(184,134,11,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(184,134,11,0.4)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(184,134,11,0.06)";
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
                      color: "rgba(245,197,24,0.6)",
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
                      ? "rgba(204,0,0,0.3)"
                      : "linear-gradient(135deg, #cc0000 0%, #e10600 50%, #8b0000 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    fontFamily: "Poppins, sans-serif",
                    transition: "all 0.3s",
                    boxShadow: loading
                      ? "none"
                      : "0 0 30px rgba(204,0,0,0.5), 0 4px 20px rgba(204,0,0,0.3)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow =
                        "0 0 50px rgba(204,0,0,0.75), 0 0 20px rgba(245,197,24,0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = loading
                      ? "none"
                      : "0 0 30px rgba(204,0,0,0.5)";
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
                      background: "rgba(184,134,11,0.12)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background:
                          "linear-gradient(90deg, #cc0000, #f5c518, #b8860b)",
                        boxShadow:
                          "0 0 10px rgba(245,197,24,0.8), 0 0 5px rgba(204,0,0,0.6)",
                        transition: "width 0.05s linear",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                )}

                <p
                  style={{
                    color: "rgba(255,255,255,0.18)",
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
