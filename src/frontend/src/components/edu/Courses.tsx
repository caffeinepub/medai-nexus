import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, User } from "lucide-react";
import { useRef } from "react";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    category: "Development",
    rating: 4.9,
    reviews: 2847,
    duration: "42 hours",
    image: "/assets/generated/course-webdev.dim_400x240.jpg",
    badgeColor: "bg-blue-100 text-blue-700",
    price: "Free",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    instructor: "Dr. Michael Chen",
    category: "Data Science",
    rating: 4.8,
    reviews: 1943,
    duration: "58 hours",
    image: "/assets/generated/course-datascience.dim_400x240.jpg",
    badgeColor: "bg-purple-100 text-purple-700",
    price: "Free",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emma Williams",
    category: "Design",
    rating: 4.9,
    reviews: 1621,
    duration: "36 hours",
    image: "/assets/generated/course-uiux.dim_400x240.jpg",
    badgeColor: "bg-pink-100 text-pink-700",
    price: "Free",
  },
  {
    id: 4,
    title: "Digital Marketing & SEO Strategy",
    instructor: "James Martinez",
    category: "Marketing",
    rating: 4.7,
    reviews: 1289,
    duration: "28 hours",
    image: "/assets/generated/course-marketing.dim_400x240.jpg",
    badgeColor: "bg-green-100 text-green-700",
    price: "Free",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= Math.round(rating)
              ? "fill-edu-star text-edu-star"
              : "text-gray-300"
          }
        />
      ))}
      <span className="text-xs font-semibold text-gray-700 ml-1">{rating}</span>
    </div>
  );
}

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="courses" ref={sectionRef} className="py-20 bg-[#EAF4FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 fade-up">
          <span className="section-badge">📚 Featured Courses</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Top Courses
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Handpicked courses taught by world-class instructors to help you
            master in-demand skills.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {courses.map((course, idx) => (
            <article
              key={course.id}
              className="fade-up bg-white rounded-2xl overflow-hidden shadow-card card-hover flex flex-col"
              data-ocid={`courses.item.${idx + 1}`}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
                />
                <span
                  className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${course.badgeColor}`}
                >
                  {course.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <User size={12} />
                  <span>{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={course.rating} />
                  <span className="text-xs text-gray-400">
                    ({course.reviews.toLocaleString()})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                  <Clock size={12} />
                  <span>{course.duration}</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-edu-blue bg-blue-50 font-semibold"
                  >
                    {course.price}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-edu-blue text-edu-blue hover:bg-blue-50 text-xs px-4 font-semibold"
                    data-ocid={`courses.item.${idx + 1}`}
                  >
                    View Course
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 fade-up">
          <Button
            size="lg"
            className="rounded-full bg-edu-blue hover:bg-edu-blue-hover text-white px-8 font-semibold shadow-sm"
            data-ocid="courses.primary_button"
          >
            Browse All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
