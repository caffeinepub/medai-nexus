import { useEffect, useRef, useState } from "react";

interface Props {
  onActivate: (key: string) => void;
}

const HEX_CHARS = "0123456789ABCDEF";
function randomHex(len: number) {
  return Array.from(
    { length: len },
    () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
  ).join("");
}

export default function ActivationScreen({ onActivate }: Props) {
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [hexStream, setHexStream] = useState<{ id: number; text: string }[]>(
    [],
  );
  const [bioDots, setBioDots] = useState(0);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const initial = Array.from({ length: 8 }, () => ({
      id: idRef.current++,
      text: randomHex(32),
    }));
    setHexStream(initial);
    streamRef.current = setInterval(() => {
      setHexStream((prev) => [
        { id: idRef.current++, text: randomHex(32) },
        ...prev.slice(0, 7),
      ]);
    }, 120);
    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setBioDots((prev) => (prev + 1) % 4), 500);
    return () => clearInterval(id);
  }, []);

  const handleActivate = () => {
    if (!key.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onActivate(key.trim());
  };

  const accentColor = "rgba(139, 92, 246, 0.7)";

  return (
    <div className="activation-overlay">
      <div className="activation-card">
        {/* Hex stream background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: 20,
            opacity: 0.07,
            pointerEvents: "none",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.55rem",
            color: "#8B5CF6",
            padding: "0.5rem",
            lineHeight: 1.6,
            letterSpacing: "0.05em",
            userSelect: "none",
          }}
        >
          {hexStream.map((line) => (
            <div key={line.id}>{line.text}</div>
          ))}
        </div>

        {/* HUD corners */}
        {(
          [
            { top: 12, left: 12, d: "M0 12 L0 0 L12 0" },
            { top: 12, right: 12, d: "M22 12 L22 0 L10 0" },
            { bottom: 12, left: 12, d: "M0 10 L0 22 L12 22" },
            { bottom: 12, right: 12, d: "M22 10 L22 22 L10 22" },
          ] as {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
            d: string;
          }[]
        ).map((c, _i) => (
          <svg
            key={c.d}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right,
            }}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path d={c.d} stroke={accentColor} strokeWidth="1.5" fill="none" />
          </svg>
        ))}

        <div className="scan-line" />
        <div
          className="scan-line"
          style={{ animationDelay: "1.5s", opacity: 0.5 }}
        />

        <div className="activation-logo" style={{ position: "relative" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={`radar-${i}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${48 + i * 28}px`,
                height: `${48 + i * 28}px`,
                borderRadius: "50%",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                animation: `radar-pulse 2s ease-out ${i * 0.5}s infinite`,
                pointerEvents: "none",
              }}
            />
          ))}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            role="img"
            aria-label="MedAI Nexus logo"
            style={{ position: "relative", zIndex: 1 }}
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <circle
              cx="24"
              cy="24"
              r="15"
              stroke="#8B5CF6"
              strokeWidth="1"
              opacity="0.6"
            />
            <circle cx="24" cy="24" r="4" fill="#A78BFA" />
            <line
              x1="24"
              y1="2"
              x2="24"
              y2="10"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
            <line
              x1="24"
              y1="38"
              x2="24"
              y2="46"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
            <line
              x1="2"
              y1="24"
              x2="10"
              y2="24"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
            <line
              x1="38"
              y1="24"
              x2="46"
              y2="24"
              stroke="#8B5CF6"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <h1 className="activation-title">MEDAI NEXUS</h1>
        <p className="activation-subtitle">SYSTEM INITIALIZATION REQUIRED</p>

        <div
          style={{
            textAlign: "center",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(167, 139, 250, 0.7)",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
          }}
        >
          {`BIOMETRIC SCAN INITIATED${".".repeat(bioDots)}`}
        </div>

        <div className="activation-divider" />
        <label className="activation-label" htmlFor="api-key-input">
          ENTER API KEY
        </label>
        <input
          id="api-key-input"
          type="password"
          className={`activation-input${error ? " error" : ""}`}
          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleActivate()}
        />
        {error && (
          <p className="activation-error">
            ⚠ API Key Required to Initialize System
          </p>
        )}
        <button
          type="button"
          className="activation-btn"
          onClick={handleActivate}
          data-ocid="activation.submit_button"
        >
          <span className="btn-glow" />
          ACTIVATE SYSTEM
        </button>
        <p className="activation-footer-note">
          Enter your OpenAI API key to enable AI analysis, or any key to use
          local detection.
        </p>
      </div>
    </div>
  );
}
