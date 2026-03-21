import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const handleScroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="pt-16 md:pt-[70px] px-4 sm:px-6 pb-8 bg-[#EAF4FF]"
    >
      <div className="max-w-6xl mx-auto py-10 md:py-14">
        {/* Hero rounded card with gradient */}
        <div
          className="hero-gradient rounded-3xl overflow-hidden px-8 md:px-14 py-14 md:py-16 relative"
          style={{ boxShadow: "0 32px 80px rgba(47,128,237,0.25)" }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <div
            className="absolute bottom-0 -left-10 w-48 h-48 rounded-full opacity-15"
            style={{ background: "rgba(255,255,255,0.25)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left: text */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm tracking-wide">
                  🎓 Trusted by 500,000+ learners
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
                  Learn Smart,
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.9)" }}>
                    Achieve More
                  </span>
                </h1>

                <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                  Unlock your potential with world-class courses from expert
                  instructors. Learn at your own pace, earn certificates, and
                  advance your career — all in one place.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button
                    size="lg"
                    className="rounded-full bg-white text-edu-blue hover:bg-blue-50 font-semibold px-7 shadow-lg"
                    onClick={() => handleScroll("#courses")}
                    data-ocid="hero.primary_button"
                  >
                    <Play size={16} className="mr-2 fill-edu-blue" />
                    Start Learning
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-white text-white bg-transparent hover:bg-white/15 font-semibold px-7"
                    onClick={() => handleScroll("#courses")}
                    data-ocid="hero.secondary_button"
                  >
                    Explore Courses
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-10 flex flex-wrap justify-center md:justify-start gap-6"
              >
                {[
                  { value: "500K+", label: "Students" },
                  { value: "1,200+", label: "Courses" },
                  { value: "200+", label: "Instructors" },
                  { value: "98%", label: "Satisfaction" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {s.value}
                    </div>
                    <div className="text-white/70 text-xs font-medium">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: illustration */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden md:flex flex-col items-center flex-shrink-0"
            >
              <div className="float-anim">
                <img
                  src="/assets/generated/hero-education-illustration-transparent.dim_600x500.png"
                  alt="Students learning online"
                  className="w-[340px] lg:w-[400px] drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
