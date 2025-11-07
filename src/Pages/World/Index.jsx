import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import WorldContext from "../../components/sections/WorldContext";
import RosterSection from "../../components/sections/RosterSection";

const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {  
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, []);
};

const WorldIndex = () => {
  useIntersectionObserver();

  return (
    <>
      <Navbar />

      <main className="bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100 overflow-hidden">
        <section className="fade-in-section">
          <WorldContext />
        </section>

        <section className="py-20 border-t border-slate-700/60 fade-in-section">
          <RosterSection />
        </section>
      </main>
    </>
  );
};

export default WorldIndex;