"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollPercent(progress);

      // Level scales smoothly from Level 1 up to Level 19 (or beyond) based on scroll
      const calculatedLevel = 1 + Math.floor((progress / 100) * 18);
      setLevel(calculatedLevel);

      // Section detection
      const sections = ["hero", "about", "skills", "projects", "timeline", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollPercent, level, currentSection };
}
