import { useState } from "react";

interface Props {
  onActivate: (key: string) => void;
}

export default function ActivationScreen({ onActivate }: Props) {
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);

  const handleActivate = () => {
    if (!key.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onActivate(key.trim());
  };

  return (
    <div className="activation-overlay">
      <div className="activation-card">
        <div className="scan-line" />
        <div className="activation-logo">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            role="img"
            aria-label="MedAI Nexus logo"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#19D7FF"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <circle
              cx="24"
              cy="24"
              r="15"
              stroke="#19D7FF"
              strokeWidth="1"
              opacity="0.6"
            />
            <circle cx="24" cy="24" r="4" fill="#19D7FF" />
            <line
              x1="24"
              y1="2"
              x2="24"
              y2="10"
              stroke="#19D7FF"
              strokeWidth="1.5"
            />
            <line
              x1="24"
              y1="38"
              x2="24"
              y2="46"
              stroke="#19D7FF"
              strokeWidth="1.5"
            />
            <line
              x1="2"
              y1="24"
              x2="10"
              y2="24"
              stroke="#19D7FF"
              strokeWidth="1.5"
            />
            <line
              x1="38"
              y1="24"
              x2="46"
              y2="24"
              stroke="#19D7FF"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <h1 className="activation-title">MEDAI NEXUS</h1>
        <p className="activation-subtitle">SYSTEM INITIALIZATION REQUIRED</p>
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
