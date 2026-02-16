"use client";

import { useEffect, useState } from "react";

export default function useHeroVisible() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsHeroVisible(entries[0].isIntersecting);
      },
      { threshold: 0.6 } // 0.6 means 60% of hero must be visible
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return isHeroVisible;
}
