import { Lock, MousePointer, Target, Zap } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: <Zap size={22} color="#a5b4fc" />,
    title: "Fast Detection",
    desc: "Results delivered in under 3 seconds using edge-optimized neural inference with GPU acceleration.",
    accent: "rgba(102,126,234,0.35)",
  },
  {
    icon: <Target size={22} color="#a5b4fc" />,
    title: "98%+ Accuracy",
    desc: "Validated against 2.5 million clinical images with peer-reviewed benchmarks across 120+ disease categories.",
    accent: "rgba(118,75,162,0.35)",
  },
  {
    icon: <MousePointer size={22} color="#a5b4fc" />,
    title: "Easy to Use",
    desc: "Simple drag-and-drop interface. No medical training required — designed for patients and professionals alike.",
    accent: "rgba(79,209,255,0.22)",
  },
  {
    icon: <Lock size={22} color="#a5b4fc" />,
    title: "Secure & Private",
    desc: "End-to-end encrypted processing. Your images are never stored or shared. Full HIPAA compliance.",
    accent: "rgba(183,148,246,0.28)",
  },
];

export default function FeaturesSection() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) e.target.classList.add("visible");
      },
      { threshold: 0.1 },
    );
    for (const el of document.querySelectorAll(".reveal")) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="section-divider" />

      <section
        id="features"
        style={{
          padding: "6rem 1.5rem",
          position: "relative",
          zIndex: 1,
          background: "rgba(11,31,74,0.25)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="section-num reveal">02 — Capabilities</span>
          <div
            className="badge-pill reveal"
            style={{ display: "block", textAlign: "center" }}
          >
            Features
          </div>
          <h2
            className="section-title reveal reveal-delay-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Why Choose MedAI Vision
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Built with the most advanced AI models and designed with patients in
            mind.
          </p>

          <div
            className="feat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                data-ocid={`features.item.${i + 1}`}
                className={`glass reveal reveal-delay-${i + 1}`}
                style={{
                  padding: "1.75rem",
                  borderColor: f.accent,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="icon-tile"
                  style={{ borderColor: f.accent, background: f.accent }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.6rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "#9AA7C2",
                    lineHeight: 1.65,
                  }}
                >
                  {f.desc}
                </p>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .feat-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px)  { .feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
