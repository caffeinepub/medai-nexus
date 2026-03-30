import { useGetStats } from "@/hooks/useQueries";
import { ArrowRight, Shield, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

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

const RINGS = [
  {
    size: 340,
    border: "rgba(112, 191, 192, 0.45)",
    glow: "rgba(112, 191, 192, 0.2)",
    anim: "rotateRing",
    dur: "8s",
  },
  {
    size: 290,
    border: "rgba(76, 122, 177, 0.35)",
    glow: "rgba(76, 122, 177, 0.18)",
    anim: "rotateRingXR",
    dur: "11s",
  },
  {
    size: 240,
    border: "rgba(247, 180, 212, 0.3)",
    glow: "rgba(247, 180, 212, 0.15)",
    anim: "rotateRingY",
    dur: "9s",
  },
  {
    size: 200,
    border: "rgba(112, 191, 192, 0.32)",
    glow: "rgba(112, 191, 192, 0.15)",
    anim: "rotateRingD",
    dur: "14s",
  },
  {
    size: 160,
    border: "rgba(76, 122, 177, 0.42)",
    glow: "rgba(76, 122, 177, 0.2)",
    anim: "rotateRingRev",
    dur: "7s",
  },
  {
    size: 120,
    border: "rgba(112, 191, 192, 0.5)",
    glow: "rgba(112, 191, 192, 0.28)",
    anim: "rotateRingX",
    dur: "6s",
  },
];

interface ChipInfo {
  label: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: string;
  anim: string;
  image: string;
  title: string;
  description: string;
  specs: { key: string; val: string }[];
}

const CHIPS: ChipInfo[] = [
  {
    label: "Brain MRI",
    top: "4%",
    left: "52%",
    delay: "0s",
    anim: "float-chip",
    image: "/assets/generated/brain-mri-icon.dim_120x120.png",
    title: "Brain MRI Analysis",
    description:
      "Magnetic Resonance Imaging of the brain uses powerful magnetic fields and radio waves to produce detailed 3D images of brain tissue. Our AI model detects anomalies including tumors, lesions, and structural abnormalities.",
    specs: [
      { key: "Resolution", val: "1mm isotropic" },
      { key: "Scan Time", val: "< 45 minutes" },
      { key: "AI Model", val: "NeuroNet v3.2" },
      { key: "Accuracy", val: "97.4%" },
    ],
  },
  {
    label: "Chest X-Ray",
    top: "18%",
    right: "2%",
    delay: "0.4s",
    anim: "float-chip-r",
    image: "/assets/generated/chest-xray-icon.dim_120x120.png",
    title: "Chest X-Ray Diagnostics",
    description:
      "Digital chest radiography provides rapid imaging of the lungs, heart, and chest wall. AI-assisted analysis detects pneumonia, lung nodules, cardiomegaly, and pleural effusions in seconds.",
    specs: [
      { key: "Processing", val: "< 2 seconds" },
      { key: "Conditions", val: "14 pathologies" },
      { key: "AI Model", val: "ChestVision AI" },
      { key: "Sensitivity", val: "94.2%" },
    ],
  },
  {
    label: "98.7% Match",
    top: "44%",
    right: "-1%",
    delay: "0.9s",
    anim: "float-chip",
    image: "/assets/generated/neural-net-icon.dim_120x120.png",
    title: "Pattern Match Confidence",
    description:
      "Our AI scoring engine computes symptom-disease correlation using a multi-layer pattern matching algorithm. A 98.7% match score indicates near-perfect alignment between presented symptoms and a known disease profile.",
    specs: [
      { key: "Algorithm", val: "Bayesian + Neural" },
      { key: "Dataset", val: "2M+ patient records" },
      { key: "Update Cycle", val: "Monthly" },
      { key: "Validation", val: "FDA-cleared" },
    ],
  },
  {
    label: "CT Scan",
    bottom: "20%",
    right: "3%",
    delay: "0.6s",
    anim: "float-chip-r",
    image: "/assets/generated/ct-scan-icon.dim_120x120.png",
    title: "CT Scan Interpretation",
    description:
      "Computed Tomography creates cross-sectional images by combining X-ray measurements from different angles. Our AI model analyzes abdominal, thoracic, and cranial CT scans to identify tumors, bleeding, and organ abnormalities.",
    specs: [
      { key: "Slice Thickness", val: "0.5 – 3 mm" },
      { key: "Scan Regions", val: "Head, Chest, Abdomen" },
      { key: "AI Model", val: "ScanAI Pro" },
      { key: "Accuracy", val: "96.8%" },
    ],
  },
  {
    label: "Neural Net",
    bottom: "5%",
    left: "48%",
    delay: "1.1s",
    anim: "float-chip",
    image: "/assets/generated/neural-net-icon.dim_120x120.png",
    title: "Deep Neural Network",
    description:
      "A deep convolutional neural network (CNN) trained on millions of annotated medical images. The model learns hierarchical features — from edges to complex pathological patterns — enabling superhuman diagnostic accuracy.",
    specs: [
      { key: "Architecture", val: "ResNet-152 + Transformer" },
      { key: "Parameters", val: "152 million" },
      { key: "Training Data", val: "5M+ medical images" },
      { key: "Inference", val: "< 500ms" },
    ],
  },
  {
    label: "< 3s Analysis",
    bottom: "20%",
    left: "1%",
    delay: "0.2s",
    anim: "float-chip-r",
    image: "/assets/generated/neural-net-icon.dim_120x120.png",
    title: "Real-Time AI Analysis",
    description:
      "Leveraging GPU-accelerated inference engines and optimized model quantization, MedAI Nexus delivers full diagnostic analysis in under 3 seconds — faster than any traditional diagnostic workflow.",
    specs: [
      { key: "Avg Response", val: "2.1 seconds" },
      { key: "Hardware", val: "NVIDIA A100" },
      { key: "Throughput", val: "500+ analyses/min" },
      { key: "Uptime", val: "99.97%" },
    ],
  },
  {
    label: "MRI Detected",
    top: "44%",
    left: "-2%",
    delay: "0.7s",
    anim: "float-chip",
    image: "/assets/generated/mri-detected-icon.dim_120x120.png",
    title: "MRI Detection Engine",
    description:
      "The MRI Detection Engine processes raw DICOM MRI data through specialized preprocessing pipelines before feeding into AI classifiers. Detects structural anomalies, tissue density variations, and lesion boundaries.",
    specs: [
      { key: "Input Format", val: "DICOM / NIfTI" },
      { key: "Sequences", val: "T1, T2, FLAIR, DWI" },
      { key: "Detection Rate", val: "98.1%" },
      { key: "False Positive", val: "< 2.3%" },
    ],
  },
  {
    label: "Confidence 94%",
    top: "18%",
    left: "2%",
    delay: "1.3s",
    anim: "float-chip-r",
    image: "/assets/generated/neural-net-icon.dim_120x120.png",
    title: "AI Confidence Score",
    description:
      "The confidence score reflects the AI's certainty in its diagnosis, calculated from symptom-match depth, disease prevalence priors, and ensemble model agreement. Scores above 90% indicate high diagnostic reliability.",
    specs: [
      { key: "Score Range", val: "0 – 100%" },
      { key: "High Confidence", val: "> 90%" },
      { key: "Model Ensemble", val: "7 models" },
      { key: "Calibration", val: "Isotonic regression" },
    ],
  },
];

export default function Hero() {
  const { data: stats } = useGetStats();
  const [activeChip, setActiveChip] = useState<ChipInfo | null>(null);

  useEffect(() => {
    const o = setupReveal();
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveChip(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const totalAnalyses = stats?.totalAnalyses
    ? Number(stats.totalAnalyses).toLocaleString()
    : "50,000+";
  const accuracy = stats?.accuracy ? `${stats.accuracy.toFixed(1)}%` : "98.7%";

  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "7rem",
          paddingBottom: "4rem",
          position: "relative",
          zIndex: 1,
          background: "var(--bg-primary)",
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
          {/* Left: text */}
          <div>
            <div
              className="reveal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--accent-dim)",
                border: "1px solid var(--border-color)",
                borderRadius: "999px",
                padding: "0.35rem 1rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.04em",
                marginBottom: "1.25rem",
              }}
            >
              ✦ AI-Powered Medical Intelligence
            </div>

            <h1
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(3.5rem, 6vw, 5.2rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              <span className="gradient-text">AI-Powered</span> Disease
              Detection
              <br />
              <span
                style={{
                  fontSize: "0.6em",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "-0.01em",
                }}
              >
                for a healthier tomorrow
              </span>
            </h1>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 440,
                marginBottom: "2rem",
              }}
            >
              Analyze 220+ symptoms across 70+ diseases using advanced AI. Get
              instant insights, diet recommendations, and step-by-step action
              plans.
            </p>

            {/* CTA Buttons */}
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
                onClick={() => scrollTo("#symptoms")}
                className="btn-gradient btn-cta-blink"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.85rem 1.75rem",
                  fontSize: "1rem",
                }}
              >
                Start Analysis <span className="btn-cta-chevron">↓</span>
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() => scrollTo("#about")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--accent)",
                  fontWeight: 600,
                  padding: "0.85rem 1.75rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "all 0.3s",
                  fontFamily: "Poppins, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-dim)";
                  e.currentTarget.style.boxShadow = "var(--glow-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Learn More
              </button>
            </div>

            {/* Stats row */}
            <div
              className="reveal"
              style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}
            >
              {[
                {
                  value: "220+",
                  label: "Symptoms",
                  icon: <Zap size={14} color="var(--accent)" />,
                },
                {
                  value: totalAnalyses,
                  label: "Analyses Done",
                  icon: <Shield size={14} color="var(--accent)" />,
                },
                {
                  value: accuracy,
                  label: "AI Accuracy",
                  icon: <Shield size={14} color="var(--accent)" />,
                },
                {
                  value: "< 3s",
                  label: "Detection Time",
                  icon: <Zap size={14} color="var(--accent)" />,
                },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "1.65rem",
                      fontWeight: 800,
                      color: "var(--accent)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {s.icon}
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "var(--text-muted)",
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

          {/* Right: gyroscope scanner */}
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
                    boxShadow: `0 0 12px ${r.glow}, 0 0 24px ${r.glow}`,
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
                    "conic-gradient(from 0deg, transparent 0deg, rgba(112,191,192,0.22) 45deg, transparent 70deg)",
                  animation: "radar 3.5s linear infinite",
                }}
              />

              {/* Radar sweep 2 */}
              <div
                style={{
                  position: "absolute",
                  width: 110,
                  height: 110,
                  top: "50%",
                  left: "50%",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 180deg, transparent 0deg, rgba(76,122,177,0.18) 40deg, transparent 60deg)",
                  animation: "radar2 5s linear infinite",
                }}
              />

              {/* Orbital dot 1 */}
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
                      background: "#70BFC0",
                      boxShadow:
                        "0 0 12px #70BFC0, 0 0 24px rgba(112,191,192,0.6)",
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
                      background: "#4C7AB1",
                      boxShadow:
                        "0 0 10px #4C7AB1, 0 0 20px rgba(76,122,177,0.5)",
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
                  background: "linear-gradient(135deg, #70BFC0, #4C7AB1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "core-pulse 2.5s ease-in-out infinite",
                  boxShadow:
                    "0 0 25px rgba(112,191,192,0.7), 0 0 50px rgba(112,191,192,0.4)",
                }}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="2.5"
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
                  border: "1px solid rgba(112,191,192,0.12)",
                  animation: "pulse-ring 3.5s ease-in-out infinite",
                }}
              />

              {/* Floating interactive chips */}
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setActiveChip(chip)}
                  style={{
                    position: "absolute",
                    top: chip.top,
                    left: chip.left,
                    right: chip.right,
                    bottom: chip.bottom,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "0.3rem 0.65rem 0.3rem 0.4rem",
                    fontSize: "0.64rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    whiteSpace: "nowrap",
                    backdropFilter: "blur(10px)",
                    animation: `${chip.anim} 3.5s ease-in-out ${chip.delay} infinite`,
                    boxShadow: "var(--glow-soft)",
                    zIndex: 5,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontFamily: "Poppins, sans-serif",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--glow)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "var(--glow-soft)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={chip.image}
                    alt={chip.label}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Glass info card below rings */}
            <div
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
                background: "var(--accent-dim)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(12px)",
                boxShadow: "var(--glow-soft)",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  marginBottom: "0.15rem",
                }}
              >
                AI Diagnostic Engine
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
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

      {/* Modal overlay */}
      {activeChip && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          {/* Backdrop click area */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setActiveChip(null)}
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              border: "none",
              cursor: "default",
            }}
          />
          <dialog
            aria-label={activeChip.title}
            open
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: 20,
              maxWidth: 500,
              width: "100%",
              padding: "2rem",
              animation: "modalIn 0.25s ease",
              boxShadow: "var(--glow), 0 40px 80px rgba(0,0,0,0.5)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveChip(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "var(--accent-dim)",
                border: "1px solid var(--border-color)",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--accent)",
              }}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <img
                src={activeChip.image}
                alt={activeChip.title}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  objectFit: "cover",
                  border: "2px solid var(--border-color)",
                  boxShadow: "var(--glow-soft)",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "0.3rem",
                  }}
                >
                  ◈ AI Diagnostic Module
                </div>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {activeChip.title}
                </h2>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              {activeChip.description}
            </p>

            {/* Specs grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {activeChip.specs.map((spec) => (
                <div
                  key={spec.key}
                  style={{
                    background: "var(--accent-dim)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 10,
                    padding: "0.6rem 0.85rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-muted)",
                      fontWeight: 500,
                      marginBottom: "0.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {spec.key}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {spec.val}
                  </div>
                </div>
              ))}
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
