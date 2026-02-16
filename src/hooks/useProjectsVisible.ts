"use client";

import { useEffect, useState } from "react";

export default function useProjectsVisible() {
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("projects-section");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsProjectsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return isProjectsVisible;
}
