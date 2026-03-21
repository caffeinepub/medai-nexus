import { useEffect, useState } from "react";

export default function HUDOverlay() {
  const [time, setTime] = useState("");
  const [bars, setBars] = useState([1, 1, 1, 1, 1]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${now.toISOString().replace("T", " ").slice(0, 19)} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((_, i) =>
          Math.random() > 0.3 ? i + 1 : Math.ceil(Math.random() * (i + 1)),
        ),
      );
    }, 800);
    return () => clearInterval(id);
  }, []);

  const hudColor = "rgba(167, 139, 250, 0.6)";
  const hudDim = "rgba(167, 139, 250, 0.3)";
  const cornerStroke = "rgba(139, 92, 246, 0.65)";

  return (
    <div
      className="hud-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9990,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.6rem",
        color: hudColor,
        letterSpacing: "0.08em",
      }}
    >
      {/* Top-left */}
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M0 10 L0 0 L10 0"
            stroke={cornerStroke}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        <div style={{ marginTop: 4 }}>
          <div>LAT: 40.7128 | LON: -74.0060</div>
          <div style={{ marginTop: 2, color: hudDim }}>
            GRID REF: NY-SEC-7714
          </div>
        </div>
      </div>

      {/* Top-right */}
      <div
        style={{ position: "absolute", top: 16, right: 16, textAlign: "right" }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M20 10 L20 0 L10 0"
              stroke={cornerStroke}
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        <div style={{ marginTop: 4 }}>
          <div style={{ marginBottom: 4 }}>SIGNAL STRENGTH</div>
          <div
            style={{
              display: "flex",
              gap: 3,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              height: 16,
            }}
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                style={{
                  width: 4,
                  height: `${level * 3}px`,
                  background:
                    bars[level - 1] >= level
                      ? "rgba(139, 92, 246, 0.9)"
                      : "rgba(139, 92, 246, 0.15)",
                  borderRadius: 1,
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-left */}
      <div style={{ position: "absolute", bottom: 16, left: 16 }}>
        <div style={{ marginBottom: 4 }}>
          MedAI NEXUS v3.0 | BUILD 2026.03.21
        </div>
        <div style={{ color: hudDim }}>NEURAL ENGINE: ACTIVE</div>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{ marginTop: 4 }}
        >
          <path
            d="M0 10 L0 20 L10 20"
            stroke={cornerStroke}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          textAlign: "right",
        }}
      >
        <div style={{ marginBottom: 4 }}>TIMESTAMP: {time}</div>
        <div style={{ color: hudDim }}>SESSION: ENCRYPTED</div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M20 10 L20 20 L10 20"
              stroke={cornerStroke}
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
