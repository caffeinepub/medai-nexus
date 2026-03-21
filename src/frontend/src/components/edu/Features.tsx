import { BadgeCheck, Clock4, GraduationCap, Users2 } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    desc: "Learn from industry leaders and certified educators with years of real-world experience.",
    color: "bg-blue-50 text-edu-blue",
    ring: "ring-blue-100",
  },
  {
    icon: Clock4,
    title: "Flexible Learning",
    desc: "Study at your own pace with lifetime access. Watch on any device, anytime, anywhere.",
    color: "bg-purple-50 text-edu-purple",
    ring: "ring-purple-100",
  },
  {
    icon: BadgeCheck,
    title: "Verified Certificates",
    desc: "Earn recognized certificates upon completion. Showcase your skills to employers worldwide.",
    color: "bg-pink-50 text-pink-600",
    ring: "ring-pink-100",
  },
  {
    icon: Users2,
    title: "Community Support",
    desc: "Join a global community of learners. Discuss, collaborate, and grow together every day.",
    color: "bg-green-50 text-green-600",
    ring: "ring-green-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-[#EAF4FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14 fade-up">
          <span className="section-badge">✨ Why EduSmart</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Designed for modern learners and educators, EduSmart combines
            powerful tools with a human touch.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="fade-up bg-white rounded-2xl p-6 shadow-card card-hover text-center flex flex-col items-center"
              data-ocid={`features.item.${idx + 1}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ring-4 ${f.color} ${f.ring}`}
              >
                <f.icon size={26} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
