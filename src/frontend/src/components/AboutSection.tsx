export default function AboutSection() {
  const steps = [
    {
      num: "01",
      title: "Activate System",
      desc: "Enter any key on the activation screen to unlock the app. Use your OpenAI API key for AI-enhanced diagnostic explanations powered by GPT-3.5.",
    },
    {
      num: "02",
      title: "Select Symptoms",
      desc: "Search for symptoms you're experiencing or browse by category (General, Critical, Rare). Click each symptom to add it to your analysis list.",
    },
    {
      num: "03",
      title: "Get Your Analysis",
      desc: "Click 'Analyze' to see AI-matched diseases ranked by confidence, with personalised diet advice, when-to-see-a-doctor guidance, and common medicines.",
    },
  ];

  return (
    <section className="about-section" id="about" data-ocid="about.section">
      <div className="about-inner">
        {/* Header */}
        <div className="about-header">
          <span className="about-tag">MISSION</span>
          <h2 className="about-title">ABOUT MEDAI NEXUS</h2>
          <div className="about-divider" />
          <p className="about-desc">
            MedAI Nexus was built to give everyone access to intelligent,
            data-driven health insights. By combining{" "}
            <strong>270+ symptoms</strong> and <strong>122 diseases</strong> in
            a powerful matching engine, it helps you understand potential health
            conditions quickly — from the comfort of your home.
          </p>
        </div>

        {/* How-to steps */}
        <div className="about-steps-label">HOW TO USE</div>
        <div className="about-steps">
          {steps.map((step) => (
            <div key={step.num} className="about-step-card glass-card">
              <div className="about-step-num">{step.num}</div>
              <h3 className="about-step-title">{step.title}</h3>
              <p className="about-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="about-disclaimer">
          ⚕️ MedAI Nexus provides informational insights only. Always consult a
          qualified medical professional for diagnosis and treatment.
        </p>
      </div>
    </section>
  );
}
