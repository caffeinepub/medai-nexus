import { BookOpen } from "lucide-react";

const footerLinks = {
  About: [
    { label: "Our Story", href: "#about" },
    { label: "Team", href: "" },
    { label: "Careers", href: "" },
    { label: "Press", href: "" },
  ],
  Explore: [
    { label: "Courses", href: "#courses" },
    { label: "Programs", href: "" },
    { label: "Certificates", href: "" },
    { label: "Blog", href: "" },
  ],
  Support: [
    { label: "Help Center", href: "" },
    { label: "Contact Us", href: "#contact" },
    { label: "Privacy Policy", href: "" },
    { label: "Terms of Service", href: "" },
  ],
};

function SiFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <title>Facebook</title>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function SiX() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <title>X (Twitter)</title>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SiLinkedin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <title>LinkedIn</title>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function SiInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <title>Instagram</title>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const handleNav = (href: string) => {
    if (!href) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{ backgroundColor: "#0B1D33" }}
      className="text-white pt-14 pb-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-edu-blue flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Edu<span className="text-edu-cyan">Smart</span>
              </span>
            </div>
            <p
              style={{ color: "#C7D2E3" }}
              className="text-sm leading-relaxed mb-6"
            >
              Empowering learners worldwide with world-class education, expert
              instructors, and flexible online courses.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: SiFacebook, label: "Facebook" },
                { Icon: SiX, label: "X (Twitter)" },
                { Icon: SiLinkedin, label: "LinkedIn" },
                { Icon: SiInstagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-edu-blue flex items-center justify-center transition-colors"
                  style={{ color: "#C7D2E3" }}
                  data-ocid="footer.link"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      style={{ color: "#C7D2E3" }}
                      className="text-sm hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "#C7D2E3",
          }}
        >
          <span>
            &copy; {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span>All rights reserved. EduSmart {year}</span>
        </div>
      </div>
    </footer>
  );
}
