import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[70px]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 group"
          onClick={() => handleNav("#home")}
          data-ocid="nav.link"
          aria-label="EduSmart home"
        >
          <div className="w-8 h-8 rounded-lg bg-edu-blue flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="text-white" size={18} />
          </div>
          <span className="text-[1.15rem] font-bold text-gray-900 tracking-tight">
            Edu<span className="text-edu-blue">Smart</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-edu-blue transition-colors rounded-md hover:bg-blue-50"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="text-sm font-medium text-gray-600 hover:text-edu-blue transition-colors"
            data-ocid="nav.link"
          >
            Login
          </button>
          <Button
            type="button"
            className="rounded-full bg-edu-blue hover:bg-edu-blue-hover text-white px-5 font-semibold shadow-sm"
            onClick={() => handleNav("#courses")}
            data-ocid="nav.primary_button"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-edu-blue hover:bg-blue-50 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-edu-blue hover:bg-blue-50 rounded-lg transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100 flex gap-2">
            <button
              type="button"
              className="flex-1 py-2 text-sm font-medium text-gray-600 hover:text-edu-blue transition-colors"
            >
              Login
            </button>
            <Button
              type="button"
              className="flex-1 rounded-full bg-edu-blue hover:bg-edu-blue-hover text-white font-semibold"
              onClick={() => handleNav("#courses")}
              data-ocid="nav.primary_button"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
