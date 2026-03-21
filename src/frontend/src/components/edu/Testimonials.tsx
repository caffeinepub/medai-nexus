import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    initials: "AM",
    name: "Amelia Morgan",
    role: "Software Engineering Student",
    quote:
      "EduSmart completely changed my career path. The Web Development course was so comprehensive and practical — I landed my first dev job within 3 months of completing it!",
    rating: 5,
    bg: "bg-blue-500",
  },
  {
    initials: "DK",
    name: "David Kim",
    role: "High School Teacher",
    quote:
      "As a teacher, I love how EduSmart helps me create engaging content for my students. The community support is incredible. My students are more motivated than ever.",
    rating: 5,
    bg: "bg-purple-500",
  },
  {
    initials: "PR",
    name: "Priya Raj",
    role: "Data Science Enthusiast",
    quote:
      "The Data Science course on EduSmart is world-class. The instructor explanations are crystal clear, and the hands-on projects really cemented my understanding.",
    rating: 5,
    bg: "bg-pink-500",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 testimonials-band">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 fade-up">
          <span className="section-badge">💬 Student Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Learners Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real stories from real students who transformed their futures with
            EduSmart.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {testimonials.map((t, idx) => (
            <button
              type="button"
              key={t.name}
              className={`fade-up bg-white rounded-2xl p-6 shadow-card card-hover transition-all text-left w-full ${
                idx === current ? "ring-2 ring-edu-blue ring-offset-2" : ""
              }`}
              data-ocid={`testimonials.item.${idx + 1}`}
              onClick={() => setCurrent(idx)}
            >
              {/* Stars */}
              <div
                className="flex gap-1 mb-4"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star
                    key={`${t.name}-star-${i}`}
                    size={14}
                    className="fill-edu-star text-edu-star"
                  />
                ))}
              </div>
              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${t.bg}`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-8 fade-up">
          <button
            type="button"
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-edu-blue hover:border-edu-blue hover:shadow-card transition-all"
            aria-label="Previous testimonial"
            data-ocid="testimonials.pagination_prev"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                type="button"
                key={t.name}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-edu-blue w-6"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Testimonial ${i + 1}`}
                data-ocid="testimonials.toggle"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-edu-blue hover:border-edu-blue hover:shadow-card transition-all"
            aria-label="Next testimonial"
            data-ocid="testimonials.pagination_next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
