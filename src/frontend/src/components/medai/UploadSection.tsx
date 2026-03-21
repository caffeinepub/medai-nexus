import { useAddImageUpload } from "@/hooks/useQueries";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type UploadState = "idle" | "loading" | "done" | "error";

const MOCK_RESULTS = [
  {
    id: "no-pathology",
    label: "No significant pathology detected",
    confidence: 94,
  },
  { id: "opacity", label: "Mild opacity in lower right lobe", confidence: 12 },
  { id: "cardiac", label: "Cardiac silhouette normal", confidence: 97 },
];

const SCAN_BARS = [
  { h: 40, id: "s1" },
  { h: 65, id: "s2" },
  { h: 100, id: "s3" },
  { h: 75, id: "s4" },
  { h: 50, id: "s5" },
  { h: 80, id: "s6" },
  { h: 45, id: "s7" },
];

export default function UploadSection() {
  const [state, setState] = useState<UploadState>("idle");
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: addUpload } = useAddImageUpload();

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

  const processFile = useCallback(
    async (file: File) => {
      setFileName(file.name);
      setState("loading");
      try {
        await addUpload({ filename: file.name, status: "processing" });
      } catch {
        /* non-blocking */
      }
      await new Promise((r) => setTimeout(r, 2500));
      setState("done");
      try {
        await addUpload({ filename: file.name, status: "completed" });
      } catch {
        /* non-blocking */
      }
    },
    [addUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setState("idle");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <div className="section-divider" />

      <section
        id="upload"
        style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="section-num reveal">03 — Detection</span>
          <div
            className="badge-pill reveal"
            style={{ display: "block", textAlign: "center" }}
          >
            Get Started
          </div>
          <h2
            className="section-title reveal reveal-delay-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Submit Your Medical Scan
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Upload any medical image and let our AI provide instant, detailed
            diagnostic insights.
          </p>

          <div className="reveal reveal-delay-3">
            {state === "idle" && (
              <div
                data-ocid="upload.dropzone"
                className={`dropzone${isDragOver ? " active" : ""}`}
                style={{ padding: "3.5rem 2rem", textAlign: "center" }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) =>
                  e.key === "Enter" && inputRef.current?.click()
                }
              >
                {/* Rotating border */}
                <div className="dropzone-border">
                  <div className="dropzone-border-glow" />
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  data-ocid="upload.input"
                />

                {/* Glowing upload icon */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(102,126,234,0.22), rgba(118,75,162,0.22))",
                    border: "1.5px solid rgba(102,126,234,0.50)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    boxShadow:
                      "0 0 24px rgba(102,126,234,0.35), 0 0 48px rgba(118,75,162,0.20)",
                    animation: "core-pulse 3s ease-in-out infinite",
                  }}
                >
                  <Upload size={30} color="#a5b4fc" />
                </div>

                <p
                  style={{
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Drag &amp; drop your medical scan
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#9AA7C2",
                    marginBottom: "1.75rem",
                  }}
                >
                  Supports JPEG, PNG, DICOM &mdash; up to 50MB
                </p>
                <button
                  type="button"
                  data-ocid="upload.upload_button"
                  className="btn-cta"
                >
                  <Upload size={16} /> Upload and Analyze
                </button>
              </div>
            )}

            {state === "loading" && (
              <div
                data-ocid="upload.loading_state"
                className="glass"
                style={{ padding: "0", overflow: "hidden" }}
              >
                {/* HUD scan image mock */}
                <div
                  style={{
                    position: "relative",
                    height: 180,
                    background:
                      "linear-gradient(180deg, rgba(11,31,74,0.9) 0%, rgba(27,44,122,0.8) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "16px 16px 0 0",
                  }}
                >
                  {/* Faux scan grid */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "linear-gradient(rgba(102,126,234,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(102,126,234,0.08) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Scan-line sweep */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: 3,
                      background:
                        "linear-gradient(90deg, transparent, rgba(102,126,234,0.9), rgba(118,75,162,0.9), transparent)",
                      boxShadow:
                        "0 0 16px rgba(102,126,234,0.7), 0 0 32px rgba(118,75,162,0.4)",
                      animation: "scan-sweep 1.8s linear infinite",
                    }}
                  />
                  {/* Corner brackets */}
                  {[
                    [0, 0],
                    [0, 1],
                    [1, 0],
                    [1, 1],
                  ].map(([r, c]) => (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        position: "absolute",
                        top: r ? undefined : 12,
                        bottom: r ? 12 : undefined,
                        left: c ? undefined : 12,
                        right: c ? 12 : undefined,
                        width: 20,
                        height: 20,
                        borderTop: r
                          ? "none"
                          : "2px solid rgba(102,126,234,0.7)",
                        borderBottom: r
                          ? "2px solid rgba(102,126,234,0.7)"
                          : "none",
                        borderLeft: c
                          ? "none"
                          : "2px solid rgba(102,126,234,0.7)",
                        borderRight: c
                          ? "2px solid rgba(102,126,234,0.7)"
                          : "none",
                      }}
                    />
                  ))}
                  <div
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.65rem",
                      color: "rgba(102,126,234,0.5)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    SCANNING...
                  </div>
                </div>

                {/* Bottom info */}
                <div style={{ padding: "1.5rem 2rem", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 5,
                      alignItems: "flex-end",
                      height: 28,
                      marginBottom: "1rem",
                    }}
                  >
                    {SCAN_BARS.map((bar) => (
                      <div
                        key={bar.id}
                        style={{
                          width: 5,
                          height: `${bar.h}%`,
                          borderRadius: 3,
                          background:
                            "linear-gradient(180deg, #667EEA, #764BA2)",
                          animation: "blink 0.9s ease-in-out infinite",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      fontFamily: "Bricolage Grotesque, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "0.4rem",
                    }}
                  >
                    AI is analyzing your scan&hellip;
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#9AA7C2" }}>
                    Processing:{" "}
                    <span style={{ color: "#a5b4fc" }}>{fileName}</span>
                  </div>
                </div>
              </div>
            )}

            {state === "done" && (
              <div
                data-ocid="upload.success_state"
                className="glass"
                style={{ padding: "2rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <CheckCircle size={24} color="#86efac" />
                  <div>
                    <div
                      style={{
                        fontFamily: "Bricolage Grotesque, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      Analysis Complete
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#9AA7C2" }}>
                      {fileName}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {MOCK_RESULTS.map((r, i) => (
                    <div
                      key={r.id}
                      data-ocid={`upload.result.item.${i + 1}`}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: 10,
                        padding: "0.85rem 1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span style={{ fontSize: "0.88rem", color: "#C9D2E3" }}>
                          {r.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: r.confidence > 50 ? "#86efac" : "#fca5a5",
                          }}
                        >
                          {r.confidence}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${r.confidence}%`,
                            background:
                              r.confidence > 50
                                ? "linear-gradient(90deg, #667EEA, #86efac)"
                                : "linear-gradient(90deg, #667EEA, #f87171)",
                            borderRadius: 2,
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.25)",
                    borderRadius: 10,
                    padding: "0.75rem 1rem",
                    fontSize: "0.78rem",
                    color: "rgba(252,165,165,0.9)",
                    lineHeight: 1.6,
                    marginBottom: "1.25rem",
                  }}
                >
                  ⚠️ This tool is for educational purposes only and not a
                  substitute for professional medical advice.
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    data-ocid="upload.cancel_button"
                    className="btn-outline"
                    style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
                    onClick={reset}
                  >
                    Upload Another
                  </button>
                </div>
              </div>
            )}

            {state === "error" && (
              <div
                data-ocid="upload.error_state"
                className="glass"
                style={{ padding: "2rem", textAlign: "center" }}
              >
                <AlertCircle
                  size={40}
                  color="#f87171"
                  style={{ margin: "0 auto 1rem" }}
                />
                <p style={{ color: "#fff", marginBottom: "1rem" }}>
                  Analysis failed. Please try again.
                </p>
                <button type="button" className="btn-cta" onClick={reset}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
