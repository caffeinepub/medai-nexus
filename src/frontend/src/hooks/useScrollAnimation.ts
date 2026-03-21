import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(
      ".fade-up, .fade-in, .slide-left, .slide-right",
    );
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  });
}
