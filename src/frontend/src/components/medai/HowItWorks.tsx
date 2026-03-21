import { Brain, FileText, Upload } from "lucide-react";
import { useEffect } from "react";

const STEPS = [
  {
    icon: <Upload size={24} color="#a5b4fc" />,
    step: "01",
    title: "Upload Your Scan",
    desc: "Drag and drop your medical image — X-ray, MRI, CT scan — or click to select a file from your device.",
  },
  {
    icon: <Brain size={24} color="#a5b4fc" />,
    step: "02",
    title: "AI Analysis",
    desc: "Our deep learning neural network analyzes the scan against millions of labeled medical images in under 3 seconds.",
  },
  {
    icon: <FileText size={24} color="#a5b4fc" />,
    step: "03",
    title: "Instant Results",
    desc: "Receive a detailed diagnostic report with confidence scores, detected patterns, and recommended next steps.",
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) e.target.classList.add("visible");
      },
      { threshold: 0.12 },
    );
    for (const el of document.querySelectorAll(".reveal")) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Glowing divider */}
      <div className="section-divider" />

      <section
        id="how-it-works"
        style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="section-num reveal">01 — Process</span>
          <div
            className="badge-pill reveal"
            style={{ display: "block", textAlign: "center" }}
          >
            How It Works
          </div>
          <h2
            className="section-title reveal reveal-delay-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Three Steps to Insight
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Our streamlined process makes AI-powered disease detection fast,
            simple, and accessible for everyone.
          </p>

          <div
            className="how-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                data-ocid={`how_it_works.item.${i + 1}`}
                className={`glass reveal reveal-delay-${i + 1}`}
                style={{ padding: "2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div className="icon-tile">{s.icon}</div>
                  <span
                    style={{
                      fontFamily: "Bricolage Grotesque, sans-serif",
                      fontSize: "2.2rem",
                      fontWeight: 800,
                      color: "rgba(165,180,252,0.18)",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {s.step}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.6rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#9AA7C2",
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px)  { .how-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 1024px) and (min-width: 769px) { .how-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </>
  );
}
