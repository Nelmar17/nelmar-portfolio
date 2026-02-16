'use client';
import { useEffect, useState } from "react";

export default function useNavbarHeight() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (!nav) return;

    const updateHeight = () => {
      setNavHeight(nav.offsetHeight);
    };

    updateHeight();

    // watch for layout changes (responsive, theme change, mobile/desktop switch)
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(nav);

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return navHeight;
}
