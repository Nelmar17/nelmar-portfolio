"use client";

import Blogs from "./components/Blogs";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import Projects from "./components/Projects";
import useHeroVisible from "@/hooks/useHeroVisible";
import useProjectsVisible from "@/hooks/useProjectsVisible";
import Contact from "./contact/page";

export default function Home() {
  const isHeroVisible = useHeroVisible();
  const isProjectsVisible = useProjectsVisible();

  return (
    <main>

      <Hero />

      {/* PROJECTS — hide while hero visible */}
      <div
        className={`
          transition-all duration-700
          ${isHeroVisible ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100"}
        `}
      >
        <Projects />
      </div>

      {/* BLOGS — hide while Hero OR Projects visible */}
      <div
        className={`
          transition-all duration-700
          ${
            isHeroVisible || isProjectsVisible
              ? "opacity-0 translate-y-10 pointer-events-none"
              : "opacity-100"
          }
        `}
      >
        <Blogs />
      </div>



     <div
        className={`
          transition-all duration-700
          ${
            isHeroVisible || isProjectsVisible
              ? "opacity-0 translate-y-10 pointer-events-none"
              : "opacity-100"
          }
        `}
      >
        <Contact />
      </div>


      {/* NEWSLETTER — same as Blogs */}
      <div
        className={`
          transition-all duration-700
          ${
            isHeroVisible || isProjectsVisible
              ? "opacity-0 translate-y-10 pointer-events-none"
              : "opacity-100"
          }
        `}
      >
        <Newsletter />
      </div>
      

    </main>
  );
}
