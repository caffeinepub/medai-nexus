import { useEffect, useRef, useState } from "react";

interface Props {
  onActivate: (key: string) => void;
}

export default function ActivationScreen({ onActivate }: Props) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const NEON_COLORS = [
      "rgba(0,245,255,",
      "rgba(255,0,255,",
      "rgba(0,255,136,",
      "rgba(0,128,255,",
      "rgba(191,0,255,",
    ];

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      colorIdx: number;
    }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        colorIdx: Math.floor(Math.random() * NEON_COLORS.length),
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
        ctx.fillStyle = `${NEON_COLORS[p.colorIdx]}0.8)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `${NEON_COLORS[p.colorIdx]}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `${NEON_COLORS[p.colorIdx]}${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
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
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1500));
    onActivate(key.trim());
  };

  return (
    <div
      data-ocid="activation.panel"
      style={{
        position: "fixed",
        inset: 0,
        background: "#030712",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      {/* Neon scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.9), transparent)",
          animation: "scanLine 3s linear infinite",
          zIndex: 1,
          boxShadow: "0 0 10px rgba(0,245,255,0.7)",
        }}
      />

      <div
        className="glass-card"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "20px",
          padding: "48px 40px",
          textAlign: "center",
          animation: "fadeInUp 0.8s ease",
          boxShadow:
            "0 0 40px rgba(0,245,255,0.25), 0 0 80px rgba(191,0,255,0.15), inset 0 0 40px rgba(0,245,255,0.03)",
          border: "1px solid rgba(0,245,255,0.2)",
        }}
      >
        {/* Radar pulse rings */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "1px solid rgba(0,245,255,0.25)",
            animation: "radarPulse 2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "1px solid rgba(255,0,255,0.2)",
            animation: "radarPulse 2s ease-out 0.6s infinite",
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 16px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0080ff, #bf00ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "float 3s ease-in-out infinite",
            boxShadow:
              "0 0 25px rgba(0,128,255,0.6), 0 0 50px rgba(191,0,255,0.3)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label="Brain scan icon"
          >
            <title>Brain scan icon</title>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
        </div>

        <h1
          className="gradient-text"
          style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "8px" }}
        >
          MedAI Nexus
        </h1>
        <p
          style={{
            color: "rgba(0,245,255,0.6)",
            marginBottom: "8px",
            fontSize: "0.9rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Advanced AI Disease Detection
        </p>
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, #00f5ff, #bf00ff, #ff00ff)",
            margin: "20px auto 32px",
            boxShadow: "0 0 10px rgba(0,245,255,0.5)",
          }}
        />

        <p
          style={{
            color: "rgba(224,247,255,0.75)",
            marginBottom: "24px",
            fontSize: "0.95rem",
          }}
        >
          Enter your API key to initialize the system
        </p>

        <input
          data-ocid="activation.input"
          type="password"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleActivate()}
          placeholder="API Key"
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            marginBottom: "8px",
            background: "rgba(0,245,255,0.05)",
            border: "1px solid rgba(0,245,255,0.25)",
            color: "#e0f7ff",
            fontSize: "1rem",
            fontFamily: "Poppins, sans-serif",
            outline: "none",
            transition: "all 0.3s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(0,245,255,0.8)";
            e.target.style.boxShadow =
              "0 0 20px rgba(0,245,255,0.35), inset 0 0 10px rgba(0,245,255,0.05)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(0,245,255,0.25)";
            e.target.style.boxShadow = "none";
          }}
        />

        {error && (
          <p
            data-ocid="activation.error_state"
            style={{
              color: "#ff4d6d",
              fontSize: "0.85rem",
              marginBottom: "16px",
              textShadow: "0 0 10px rgba(255,77,109,0.6)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          data-ocid="activation.primary_button"
          onClick={handleActivate}
          disabled={loading}
          className="btn-gradient"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "1rem",
            letterSpacing: "1px",
            marginTop: "8px",
          }}
        >
          {loading ? "Initializing System..." : "Activate System"}
        </button>

        <p
          style={{
            color: "rgba(0,245,255,0.3)",
            fontSize: "0.75rem",
            marginTop: "24px",
          }}
        >
          Your API key is stored only in browser memory
        </p>
      </div>
    </div>
  );
}
