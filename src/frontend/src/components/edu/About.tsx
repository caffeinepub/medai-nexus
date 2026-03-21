import { Award, BookMarked, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500K+",
    label: "Active Students",
    color: "text-edu-blue bg-blue-50",
  },
  {
    icon: BookMarked,
    value: "1,200+",
    label: "Online Courses",
    color: "text-edu-purple bg-purple-50",
  },
  {
    icon: Award,
    value: "200+",
    label: "Expert Instructors",
    color: "text-pink-600 bg-pink-50",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Satisfaction Rate",
    color: "text-green-600 bg-green-50",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left: text */}
          <div className="flex-1 slide-left">
            <span className="section-badge">🌍 About EduSmart</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Empowering{" "}
              <span className="gradient-text">500,000+ Learners</span> Worldwide
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              EduSmart was founded with a single mission: to make high-quality
              education accessible to everyone, everywhere. We partner with
              expert instructors and leading institutions to deliver courses
              that are practical, engaging, and career-transforming.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Whether you're a student stepping into the professional world, or
              a teacher looking to scale your impact — EduSmart gives you the
              tools, community, and confidence to succeed.
            </p>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 stagger">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="fade-up flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:shadow-card transition-shadow"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}
                  >
                    <s.icon size={18} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: decorative visual */}
          <div className="flex-1 flex justify-center slide-right">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="hero-gradient rounded-3xl p-8 text-white shadow-hero">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-white/85 leading-relaxed">
                  We believe every person deserves access to world-class
                  education. EduSmart breaks down barriers of location, cost,
                  and time — so you can learn anything, from anywhere.
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold">6+</div>
                    <div className="text-white/70 text-xs">Years Online</div>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div className="text-center">
                    <div className="text-3xl font-extrabold">50+</div>
                    <div className="text-white/70 text-xs">Countries</div>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div className="text-center">
                    <div className="text-3xl font-extrabold">15+</div>
                    <div className="text-white/70 text-xs">Categories</div>
                  </div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card p-4 text-center float-anim">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-sm font-bold text-gray-900">4.9/5</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card p-4 text-center"
                style={{
                  animation: "float-up-down 4s ease-in-out 1s infinite",
                }}
              >
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-sm font-bold text-gray-900">
                  #1 Platform
                </div>
                <div className="text-xs text-gray-500">In Education</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
