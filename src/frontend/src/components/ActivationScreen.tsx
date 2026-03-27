import { useEffect, useRef, useState } from "react";

interface Props {
  onActivate: (key: string) => void;
}

const VALID_KEY = "AIzaSyAeYSZuSR6wbSApVmDEMX7AOvFlRJ774tU";
const TAGLINE = "AI-Powered Precision Diagnostics";

export default function ActivationScreen({ onActivate }: Props) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= TAGLINE.length) {
        setTypedText(TAGLINE.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  // Subtle particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const YELLOW = ["rgba(245,197,24,", "rgba(255,215,0,", "rgba(212,160,23,"];
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      colorIdx: number;
    }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        colorIdx: Math.floor(Math.random() * YELLOW.length),
      });
    }

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
        ctx.fillStyle = `${YELLOW[p.colorIdx]}0.5)`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `${YELLOW[p.colorIdx]}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `${YELLOW[p.colorIdx]}${0.08 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleActivate = async () => {
    if (!key.trim()) {
      setError("API Key Required to Initialize System");
      return;
    }
    if (key.trim() !== VALID_KEY) {
      setError("Invalid API Key — Access Denied");
      return;
    }
    setLoading(true);
    setError("");
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise((r) => setTimeout(r, 25));
    }
    onActivate(key.trim());
  };

  return (
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
      }}
    >
      {/* Full-screen video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source
          src="/assets/uploads/probamo-019d2d13-2cca-778c-bff9-7af651d351ef-1.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 1,
        }}
      />

      {/* Subtle yellow grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245,197,24,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 3 }}
      />

      {/* Cinematic scanline sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,197,24,0.0) 20%, rgba(245,197,24,0.8) 50%, rgba(245,197,24,0.0) 80%, transparent 100%)",
          animation: "scanLine 4s linear infinite",
          zIndex: 4,
          boxShadow:
            "0 0 20px rgba(245,197,24,0.6), 0 0 40px rgba(245,197,24,0.3)",
        }}
      />

      {/* Corner brackets */}
      {(
        [
          ["top", "left"],
          ["top", "right"],
          ["bottom", "left"],
          ["bottom", "right"],
        ] as const
      ).map(([v, h]) => (
        <div
          key={`${v}-${h}`}
          style={{
            position: "absolute",
            [v]: 24,
            [h]: 24,
            width: 36,
            height: 36,
            borderTop: v === "top" ? "2px solid rgba(245,197,24,0.6)" : "none",
            borderBottom:
              v === "bottom" ? "2px solid rgba(245,197,24,0.6)" : "none",
            borderLeft:
              h === "left" ? "2px solid rgba(245,197,24,0.6)" : "none",
            borderRight:
              h === "right" ? "2px solid rgba(245,197,24,0.6)" : "none",
            zIndex: 5,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 6px rgba(245,197,24,0.5))",
          }}
        />
      ))}

      {/* HUD top label */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.6rem",
          color: "rgba(245,197,24,0.55)",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontWeight: 700,
          zIndex: 5,
          pointerEvents: "none",
          textShadow: "0 0 10px rgba(245,197,24,0.4)",
        }}
      >
        ◈ SECURE ACCESS TERMINAL ◈
      </div>

      {/* Main card */}
      <div
        style={{
          position: "relative",
          zIndex: 6,
          width: "100%",
          maxWidth: "520px",
          margin: "20px",
          padding: "50px 44px 40px",
          textAlign: "center",
          animation: "fadeInUp 0.9s ease",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(245,197,24,0.45)",
          borderRadius: "24px",
          boxShadow:
            "0 0 80px rgba(245,197,24,0.15), 0 0 160px rgba(245,197,24,0.06), inset 0 0 60px rgba(245,197,24,0.03)",
        }}
      >
        {/* Pulse rings */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(245,197,24,0.1)",
            animation: "radarPulse 2.5s ease-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(245,197,24,0.06)",
            animation: "radarPulse 2.5s ease-out 0.8s infinite",
            pointerEvents: "none",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            width: 80,
            height: 80,
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f5c518, #d4a017)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "float 3.5s ease-in-out infinite",
            boxShadow:
              "0 0 40px rgba(245,197,24,0.7), 0 0 80px rgba(245,197,24,0.35)",
            position: "relative",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Brain icon"
          >
            <title>Brain icon</title>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: 900,
            color: "#f5c518",
            marginBottom: "10px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textShadow:
              "0 0 40px rgba(245,197,24,0.8), 0 0 80px rgba(245,197,24,0.4)",
          }}
        >
          MedAI Nexus
        </h1>

        {/* Typewriter tagline */}
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            marginBottom: "4px",
            fontSize: "0.95rem",
            letterSpacing: "0.08em",
            fontWeight: 500,
            minHeight: "1.5em",
          }}
        >
          {typedText}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "#f5c518",
              marginLeft: "2px",
              verticalAlign: "text-bottom",
              animation: "blink 0.8s step-end infinite",
              boxShadow: "0 0 6px rgba(245,197,24,0.8)",
            }}
          />
        </p>

        {/* Divider */}
        <div
          style={{
            width: 100,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(245,197,24,0.8), transparent)",
            margin: "22px auto 26px",
            boxShadow: "0 0 12px rgba(245,197,24,0.5)",
          }}
        />

        {/* System status — horizontal pill row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "28px",
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
                gap: "7px",
                padding: "6px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 8px ${color}`,
                  animation: "glowPulse 1.8s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.65)",
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

        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            marginBottom: "18px",
            fontSize: "0.85rem",
          }}
        >
          Enter your API key to initialize the system
        </p>

        {/* Input wrapper */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <input
            data-ocid="activation.input"
            type={showKey ? "text" : "password"}
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleActivate()}
            placeholder="Paste your API key here"
            style={{
              width: "100%",
              padding: "14px 52px 14px 18px",
              borderRadius: "14px",
              background: "rgba(245,197,24,0.05)",
              border: "1px solid rgba(245,197,24,0.3)",
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
              e.target.style.boxShadow = "0 0 25px rgba(245,197,24,0.2)";
              e.target.style.background = "rgba(245,197,24,0.09)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(245,197,24,0.3)";
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
              marginBottom: "14px",
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
            marginTop: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            background: loading
              ? "rgba(245,197,24,0.3)"
              : "linear-gradient(135deg, #f5c518, #d4a017)",
            color: loading ? "rgba(245,197,24,0.7)" : "#0a0a0a",
            border: "none",
            borderRadius: "14px",
            fontFamily: "Poppins, sans-serif",
            transition: "all 0.3s",
            boxShadow: loading ? "none" : "0 0 30px rgba(245,197,24,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.boxShadow = "0 0 50px rgba(245,197,24,0.7)";
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
              Activate System
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

        {/* Progress bar */}
        {loading && (
          <div
            style={{
              marginTop: "14px",
              height: "3px",
              background: "rgba(245,197,24,0.1)",
              borderRadius: "2px",
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
                borderRadius: "2px",
              }}
            />
          </div>
        )}

        <p
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.68rem",
            marginTop: "20px",
          }}
        >
          Stored in browser memory only — never transmitted
        </p>
      </div>
    </div>
  );
}
