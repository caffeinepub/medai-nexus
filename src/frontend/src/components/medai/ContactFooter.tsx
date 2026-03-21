import { useAddContactSubmission } from "@/hooks/useQueries";
import { Github, Heart, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactFooter() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const { mutateAsync: submit } = useAddContactSubmission();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );
    for (const el of document.querySelectorAll(".reveal")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitState("loading");
    try {
      await submit(form);
      setSubmitState("done");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSubmitState("error");
    }
  };

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <>
      {/* Contact section */}
      <section
        id="contact"
        style={{
          padding: "6rem 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="badge-pill reveal"
            style={{ display: "block", textAlign: "center" }}
          >
            Contact
          </div>
          <h2 className="section-title reveal reveal-delay-1">Get in Touch</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Have questions about MedAI Vision? We&apos;d love to hear from you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Info */}
            <div className="reveal reveal-delay-1">
              <div
                className="glass"
                style={{ padding: "2rem", marginBottom: "1.25rem" }}
              >
                <h3
                  style={{
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "1.25rem",
                  }}
                >
                  Contact Information
                </h3>
                {[
                  {
                    icon: <Mail size={16} color="#a5b4fc" />,
                    text: "hello@medaivision.ai",
                  },
                  {
                    icon: <MapPin size={16} color="#a5b4fc" />,
                    text: "San Francisco, CA — Available Worldwide",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(102,126,234,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <span style={{ fontSize: "0.88rem", color: "#C9D2E3" }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div
                style={{
                  background: "rgba(248,113,113,0.07)",
                  border: "1px solid rgba(248,113,113,0.22)",
                  borderRadius: 14,
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "rgba(252,165,165,0.9)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.4rem",
                  }}
                >
                  ⚠️ Medical Disclaimer
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(252,165,165,0.75)",
                    lineHeight: 1.6,
                  }}
                >
                  This tool is for educational purposes only and not a
                  substitute for professional medical advice. Always consult a
                  qualified healthcare provider for medical diagnosis and
                  treatment.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="reveal reveal-delay-2">
              <form
                data-ocid="contact.form"
                className="glass"
                style={{ padding: "2rem" }}
                onSubmit={handleSubmit}
              >
                <h3
                  style={{
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "1.25rem",
                  }}
                >
                  Send a Message
                </h3>

                {(
                  [
                    { key: "name", placeholder: "Your name", type: "text" },
                    {
                      key: "email",
                      placeholder: "your@email.com",
                      type: "email",
                    },
                  ] as const
                ).map(({ key, placeholder, type }) => (
                  <div key={key} style={{ marginBottom: "1rem" }}>
                    <input
                      data-ocid={`contact.${key}.input`}
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [key]: e.target.value }))
                      }
                      required
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 10,
                        padding: "0.75rem 1rem",
                        color: "#fff",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(102,126,234,0.6)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: "1.25rem" }}>
                  <textarea
                    data-ocid="contact.message.textarea"
                    placeholder="Your message…"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 10,
                      padding: "0.75rem 1rem",
                      color: "#fff",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(102,126,234,0.6)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                  />
                </div>

                {submitState === "done" ? (
                  <div
                    data-ocid="contact.success_state"
                    style={{
                      padding: "0.85rem",
                      background: "rgba(134,239,172,0.1)",
                      border: "1px solid rgba(134,239,172,0.3)",
                      borderRadius: 10,
                      color: "#86efac",
                      textAlign: "center",
                      fontSize: "0.88rem",
                    }}
                  >
                    ✓ Message sent! We&apos;ll get back to you soon.
                  </div>
                ) : (
                  <button
                    data-ocid="contact.submit_button"
                    type="submit"
                    className="btn-cta"
                    style={{ width: "100%", justifyContent: "center" }}
                    disabled={submitState === "loading"}
                  >
                    {submitState === "loading" ? (
                      <>
                        <span
                          className="spinner"
                          style={{ width: 16, height: 16, borderWidth: 2 }}
                        />{" "}
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail size={16} /> Send Message
                      </>
                    )}
                  </button>
                )}

                {submitState === "error" && (
                  <p
                    data-ocid="contact.error_state"
                    style={{
                      color: "#f87171",
                      fontSize: "0.82rem",
                      marginTop: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    Failed to send. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "3rem 1.5rem 2rem",
          background: "rgba(11,31,74,0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "2rem",
              marginBottom: "2.5rem",
            }}
            className="footer-grid"
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  color: "#fff",
                  marginBottom: "0.75rem",
                }}
              >
                MedAI <span style={{ color: "#a5b4fc" }}>Vision</span>
              </div>
              <p
                style={{
                  fontSize: "0.84rem",
                  color: "#9AA7C2",
                  lineHeight: 1.65,
                  maxWidth: 240,
                }}
              >
                AI-powered disease detection for a healthier, more equitable
                future.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "1.25rem",
                }}
              >
                {[
                  { icon: <Twitter size={16} />, label: "Twitter" },
                  { icon: <Github size={16} />, label: "GitHub" },
                  { icon: <Linkedin size={16} />, label: "LinkedIn" },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    aria-label={s.label}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9AA7C2",
                      cursor: "pointer",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(102,126,234,0.6)";
                      e.currentTarget.style.color = "#a5b4fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.18)";
                      e.currentTarget.style.color = "#9AA7C2";
                    }}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                heading: "Quick Links",
                links: ["How It Works", "Features", "Benefits", "Contact"],
              },
              {
                heading: "Resources",
                links: [
                  "Documentation",
                  "API Reference",
                  "Research Papers",
                  "Blog",
                ],
              },
              {
                heading: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "HIPAA Compliance",
                  "Cookie Policy",
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <div
                  style={{
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.85rem",
                  }}
                >
                  {col.heading}
                </div>
                {col.links.map((link) => (
                  <button
                    key={link}
                    type="button"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      fontSize: "0.83rem",
                      color: "#9AA7C2",
                      cursor: "pointer",
                      padding: "0.25rem 0",
                      marginBottom: "0.25rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C9D2E3";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#9AA7C2";
                    }}
                  >
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Divider + legal */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.3)",
                textAlign: "center",
                marginBottom: "0.5rem",
                lineHeight: 1.6,
              }}
            >
              ⚠️ This tool is for educational purposes only and not a substitute
              for professional medical advice. Always consult a qualified
              healthcare provider.
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.25)",
                textAlign: "center",
              }}
            >
              © {year}. Built with{" "}
              <Heart
                size={12}
                style={{ display: "inline", color: "#f472b6" }}
              />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                style={{ color: "#a5b4fc", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 480px)  { .footer-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </footer>
    </>
  );
}
