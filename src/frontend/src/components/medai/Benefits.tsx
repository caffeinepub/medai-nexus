import { Clock, Globe, Stethoscope } from "lucide-react";
import { useEffect } from "react";

const BENEFITS = [
  {
    icon: <Stethoscope size={24} color="#a5b4fc" />,
    title: "Early Diagnosis",
    desc: "Catch diseases in their earliest stages when treatment is most effective. Our AI detects subtle patterns invisible to the human eye.",
    stat: "3× Earlier",
    statLabel: "than traditional methods",
  },
  {
    icon: <Clock size={24} color="#a5b4fc" />,
    title: "Saves Time",
    desc: "Get diagnostic insights in seconds instead of days. No waiting rooms, no scheduling delays — immediate answers when you need them.",
    stat: "< 3 Seconds",
    statLabel: "average analysis time",
  },
  {
    icon: <Globe size={24} color="#a5b4fc" />,
    title: "Accessible Anywhere",
    desc: "Available 24/7 on any device with an internet connection. Bringing world-class diagnostic capability to underserved communities.",
    stat: "190+ Countries",
    statLabel: "worldwide availability",
  },
];

export default function Benefits() {
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

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="benefits"
      style={{
        padding: "6rem 1.5rem",
        position: "relative",
        zIndex: 1,
        background: "rgba(11,31,74,0.3)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="badge-pill reveal"
          style={{ display: "block", textAlign: "center" }}
        >
          Benefits
        </div>
        <h2 className="section-title reveal reveal-delay-1">
          Impact That Matters
        </h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Transforming healthcare outcomes through AI-driven early detection and
          accessible diagnostics.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
          className="benefits-grid"
        >
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              data-ocid={`benefits.item.${i + 1}`}
              className={`glass reveal reveal-delay-${i + 1}`}
              style={{ padding: "2rem" }}
            >
              <div className="icon-tile">{b.icon}</div>
              <div
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "0.15rem",
                }}
              >
                {b.stat}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#9AA7C2",
                  marginBottom: "1rem",
                }}
              >
                {b.statLabel}
              </div>
              <h3
                style={{
                  fontFamily: "Bricolage Grotesque, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.6rem",
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#9AA7C2",
                  lineHeight: 1.65,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="glass reveal"
          style={{
            padding: "2.5rem",
            textAlign: "center",
            background: "rgba(102,126,234,0.08)",
            borderColor: "rgba(102,126,234,0.3)",
          }}
        >
          <h3
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Ready to experience AI diagnostics?
          </h3>
          <p
            style={{
              color: "#9AA7C2",
              marginBottom: "1.5rem",
              fontSize: "0.95rem",
            }}
          >
            Join thousands of users who rely on MedAI Vision for fast, accurate
            medical insights.
          </p>
          <button
            type="button"
            data-ocid="benefits.cta.button"
            className="btn-cta"
            onClick={() => scrollTo("#upload")}
          >
            Get Started Free
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .benefits-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 1024px) and (min-width: 769px) { .benefits-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
