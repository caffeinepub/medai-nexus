import { useGetStats } from "@/hooks/useQueries";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

function setupReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) e.target.classList.add("visible");
    },
    { threshold: 0.1 },
  );
  for (const el of document.querySelectorAll(".reveal")) obs.observe(el);
  return obs;
}

/* Gyroscope rings config */
const RINGS = [
  {
    size: 340,
    border: "rgba(102,126,234,0.55)",
    anim: "rotateRing",
    dur: "8s",
    tiltStyle: {},
  },
  {
    size: 290,
    border: "rgba(118,75,162,0.45)",
    anim: "rotateRingXR",
    dur: "11s",
    tiltStyle: {},
  },
  {
    size: 240,
    border: "rgba(102,126,234,0.38)",
    anim: "rotateRingY",
    dur: "9s",
    tiltStyle: {},
  },
  {
    size: 200,
    border: "rgba(165,180,252,0.35)",
    anim: "rotateRingD",
    dur: "14s",
    tiltStyle: {},
  },
  {
    size: 160,
    border: "rgba(79,209,255,0.30)",
    anim: "rotateRingRev",
    dur: "7s",
    tiltStyle: {},
  },
  {
    size: 120,
    border: "rgba(118,75,162,0.50)",
    anim: "rotateRingX",
    dur: "6s",
    tiltStyle: {},
  },
];

/* Floating holographic chips */
const CHIPS = [
  {
    label: "Brain MRI",
    top: "4%",
    left: "52%",
    delay: "0s",
    anim: "float-chip",
  },
  {
    label: "Chest X-Ray",
    top: "18%",
    right: "2%",
    delay: "0.4s",
    anim: "float-chip-r",
  },
  {
    label: "98.7% Match",
    top: "44%",
    right: "-1%",
    delay: "0.9s",
    anim: "float-chip",
  },
  {
    label: "CT Scan",
    bottom: "20%",
    right: "3%",
    delay: "0.6s",
    anim: "float-chip-r",
  },
  {
    label: "Neural Net",
    bottom: "5%",
    left: "48%",
    delay: "1.1s",
    anim: "float-chip",
  },
  {
    label: "< 3s Analysis",
    bottom: "20%",
    left: "1%",
    delay: "0.2s",
    anim: "float-chip-r",
  },
  {
    label: "MRI Detected",
    top: "44%",
    left: "-2%",
    delay: "0.7s",
    anim: "float-chip",
  },
  {
    label: "Confidence 94%",
    top: "18%",
    left: "2%",
    delay: "1.3s",
    anim: "float-chip-r",
  },
];

export default function Hero() {
  const { data: stats } = useGetStats();
  useEffect(() => {
    const o = setupReveal();
    return () => o.disconnect();
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const totalAnalyses = stats?.totalAnalyses
    ? Number(stats.totalAnalyses).toLocaleString()
    : "50,000+";
  const accuracy = stats?.accuracy ? `${stats.accuracy.toFixed(1)}%` : "98.7%";

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "7rem",
        paddingBottom: "4rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* ── Left: text ── */}
        <div>
          <div className="badge-pill reveal">
            ✦ AI-Powered Medical Intelligence
          </div>

          <h1
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "clamp(3.5rem, 6vw, 5.2rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            <span className="grad-text">AI-Powered</span> Disease{"\n"}Detection
            <br />
            <span
              style={{
                fontSize: "0.6em",
                fontWeight: 700,
                color: "#C9D2E3",
                letterSpacing: "-0.01em",
              }}
            >
              for a Healthier Future
            </span>
          </h1>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontSize: "1.05rem",
              color: "#C9D2E3",
              lineHeight: 1.72,
              marginBottom: "2.25rem",
              maxWidth: 480,
            }}
          >
            Upload your medical scans and get instant, accurate AI-driven
            diagnostic insights in seconds. Fast, reliable, and accessible
            anywhere.
          </p>

          <div
            className="reveal reveal-delay-3"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              className="btn-cta"
              onClick={() => scrollTo("#symptoms")}
            >
              Check Now <ArrowRight size={16} />
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              className="btn-outline"
              onClick={() => scrollTo("#how-it-works")}
            >
              Learn More
            </button>
          </div>

          <div
            className="reveal reveal-delay-4"
            style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}
          >
            {[
              {
                value: totalAnalyses,
                label: "Analyses Done",
                icon: <Zap size={14} color="#a5b4fc" />,
              },
              {
                value: accuracy,
                label: "AI Accuracy",
                icon: <Shield size={14} color="#a5b4fc" />,
              },
              {
                value: "< 3s",
                label: "Detection Time",
                icon: <Zap size={14} color="#a5b4fc" />,
              },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "1.65rem",
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: "0.2rem",
                  }}
                >
                  {s.icon}
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: "#9AA7C2",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: gyroscope scanner ── */}
        <div
          className="reveal reveal-delay-2 hero-visual-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: 420,
          }}
        >
          {/* Scanner frame */}
          <div
            style={{
              position: "relative",
              width: 380,
              height: 380,
              flexShrink: 0,
            }}
          >
            {/* Gyroscope rings */}
            {RINGS.map((r) => (
              <div
                key={r.size}
                style={{
                  position: "absolute",
                  width: r.size,
                  height: r.size,
                  top: "50%",
                  left: "50%",
                  borderRadius: "50%",
                  border: `1.5px solid ${r.border}`,
                  animation: `${r.anim} ${r.dur} linear infinite`,
                  boxShadow: `0 0 8px ${r.border}`,
                }}
              />
            ))}

            {/* Radar sweep 1 */}
            <div
              style={{
                position: "absolute",
                width: 160,
                height: 160,
                top: "50%",
                left: "50%",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(102,126,234,0.30) 45deg, transparent 70deg)",
                animation: "radar 3.5s linear infinite",
              }}
            />

            {/* Radar sweep 2 — opposite */}
            <div
              style={{
                position: "absolute",
                width: 110,
                height: 110,
                top: "50%",
                left: "50%",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 180deg, transparent 0deg, rgba(118,75,162,0.22) 40deg, transparent 60deg)",
                animation: "radar2 5s linear infinite",
              }}
            />

            {/* Orbital dot */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 8,
                height: 8,
                marginTop: -4,
                marginLeft: -4,
              }}
            >
              <div
                style={
                  {
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#a5b4fc",
                    boxShadow:
                      "0 0 10px #a5b4fc, 0 0 20px rgba(102,126,234,0.6)",
                    "--orbit-r": "130px",
                    animation: "orbit-dot 4s linear infinite",
                  } as React.CSSProperties
                }
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 6,
                height: 6,
                marginTop: -3,
                marginLeft: -3,
              }}
            >
              <div
                style={
                  {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#c4b5fd",
                    boxShadow: "0 0 8px #c4b5fd",
                    "--orbit-r": "100px",
                    animation: "orbit-dot 6.5s linear infinite reverse",
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Core */}
            <div
              style={{
                position: "absolute",
                width: 80,
                height: 80,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 4,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667EEA, #764BA2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "core-pulse 2.5s ease-in-out infinite",
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Heartbeat waveform"
              >
                <title>Heartbeat waveform</title>
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>

            {/* Outer pulse ring */}
            <div
              style={{
                position: "absolute",
                width: 380,
                height: 380,
                top: "50%",
                left: "50%",
                borderRadius: "50%",
                border: "1px solid rgba(102,126,234,0.18)",
                animation: "pulse-ring 3.5s ease-in-out infinite",
              }}
            />

            {/* Floating holographic chips */}
            {CHIPS.map((chip) => (
              <div
                key={chip.label}
                style={{
                  position: "absolute",
                  top: chip.top,
                  left: (chip as { left?: string }).left,
                  right: (chip as { right?: string }).right,
                  bottom: (chip as { bottom?: string }).bottom,
                  background: "rgba(11,31,74,0.88)",
                  border: "1px solid rgba(102,126,234,0.45)",
                  borderRadius: "8px",
                  padding: "0.28rem 0.6rem",
                  fontSize: "0.66rem",
                  fontWeight: 600,
                  color: "#a5b4fc",
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(10px)",
                  animation: `${chip.anim} 3.5s ease-in-out ${chip.delay} infinite`,
                  boxShadow: "0 0 12px rgba(102,126,234,0.20)",
                  zIndex: 5,
                }}
              >
                <span
                  style={{
                    color: "rgba(79,209,255,0.7)",
                    marginRight: 4,
                    fontSize: "0.55rem",
                  }}
                >
                  ◈
                </span>
                {chip.label}
              </div>
            ))}
          </div>

          {/* Glass info card below rings */}
          <div
            className="glass"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.75rem 1.5rem",
              textAlign: "center",
              zIndex: 6,
              borderRadius: 12,
              whiteSpace: "nowrap",
              minWidth: 200,
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.15rem",
                fontFamily: "Bricolage Grotesque, sans-serif",
              }}
            >
              AI Diagnostic Engine
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "#9AA7C2",
                letterSpacing: "0.04em",
              }}
            >
              Real-time neural analysis
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual-wrap { min-height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
